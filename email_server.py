"""
AARAMBH 2K26 - Local Email Auto-Sender Server
Listens on http://127.0.0.1:5000 and automatically sends / saves emails with certificate attachments.
Supports 1-click batch sending with SMTP connection pooling for maximum speed.
"""

import http.server
import socketserver
import json
import base64
import os
import sys
import re
import time
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

try:
    from PIL import Image, ImageDraw, ImageFont
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

PORT = 5000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CERT_DIR = os.path.join(BASE_DIR, "certificates")
OUTBOX_DIR = os.path.join(BASE_DIR, "outbox")
CONFIG_FILE = os.path.join(BASE_DIR, "email_config.json")

# Calibrated coordinates (3120 x 2206 px)
NAME_X, NAME_Y = 1581, 1388
EVENT_X, EVENT_Y = 1278, 1674

os.makedirs(CERT_DIR, exist_ok=True)
os.makedirs(OUTBOX_DIR, exist_ok=True)


def load_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print("Config read error:", e)
    return {
        "sender_email": "saajand34@gmail.com",
        "app_password": "",
        "smtp_server": "smtp.gmail.com",
        "smtp_port": 587,
        "sign_off": "principal"
    }


def get_sign_off_text(choice):
    if choice == "convenor":
        return (
            "Warm regards,\n"
            "Pro. Bhavya KS\n"
            "Convenor Aarambh 2K26\n"
            "Seshadripuram First Grade College\n"
            "Yelahanka New Town, Bengaluru - 560064"
        )
    elif choice == "both":
        return (
            "Warm regards,\n"
            "Pro. Bhavya KS (Convenor Aarambh 2K26)\n"
            "Dr. S. N. Venkatesh (Principal)\n"
            "Seshadripuram First Grade College\n"
            "Yelahanka New Town, Bengaluru - 560064"
        )
    else:
        return (
            "Warm regards,\n"
            "Dr. S. N. Venkatesh\n"
            "Principal, Seshadripuram First Grade College\n"
            "Yelahanka New Town, Bengaluru - 560064"
        )


def get_font(size, bold=False):
    if not HAS_PIL:
        return None
    font_file = "georgiab.ttf" if bold else "georgia.ttf"
    font_path = os.path.join(os.environ.get("WINDIR", "C:\\Windows"), "Fonts", font_file)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()


def render_certificate_pillow(name, event, out_path):
    if not HAS_PIL:
        return b""
    template_path = os.path.join(BASE_DIR, "certificate_template.png")
    if not os.path.exists(template_path):
        template_path = os.path.join(BASE_DIR, "certificate_template.jpg")
    if not os.path.exists(template_path):
        return b""

    img = Image.open(template_path).copy()
    draw = ImageDraw.Draw(img)
    font_name = get_font(64, bold=True)
    font_event = get_font(46, bold=True)
    text_color = (28, 25, 23)

    draw.text((NAME_X, NAME_Y), name.strip(), fill=text_color, font=font_name, anchor="ms")
    draw.text((EVENT_X, EVENT_Y), event.strip(), fill=text_color, font=font_event, anchor="ms")
    img.save(out_path, format="PNG")

    with open(out_path, "rb") as f:
        return f.read()


class SMTPConnectionPool:
    """Caches authenticated SMTP connection for rapid batch sending."""
    def __init__(self):
        self.server = None
        self.last_used = 0
        self.cached_sender = None
        self.cached_pw = None

    def get_connection(self, config):
        sender = config.get("sender_email", "").strip()
        pw = config.get("app_password", "").strip().replace(" ", "")
        host = config.get("smtp_server", "smtp.gmail.com")
        port = int(config.get("smtp_port", 587))

        if not sender or not pw:
            return None

        now = time.time()
        # Reuse active connection if used within last 45 seconds
        if self.server and (now - self.last_used < 45) and self.cached_sender == sender and self.cached_pw == pw:
            try:
                status, _ = self.server.noop()
                if status == 250:
                    self.last_used = now
                    return self.server
            except Exception:
                self.close()

        self.close()
        try:
            server = smtplib.SMTP(host, port, timeout=25)
            server.starttls()
            try:
                server.login(sender, pw)
            except (smtplib.SMTPAuthenticationError, smtplib.SMTPServerDisconnected) as auth_err:
                raise ValueError(
                    f"Gmail rejected your credentials. You entered a normal account password ('{pw[:4]}***'), but Google requires a 16-character 'App Password'. Please visit https://myaccount.google.com/apppasswords to create one."
                ) from auth_err
            self.server = server
            self.last_used = now
            self.cached_sender = sender
            self.cached_pw = pw
            return self.server
        except Exception as e:
            self.close()
            raise e

    def close(self):
        if self.server:
            try:
                self.server.quit()
            except Exception:
                pass
            self.server = None


smtp_pool = SMTPConnectionPool()


class AutoSenderHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        if len(args) > 0 and "/api/status" in str(args[0]):
            return
        super().log_message(format, *args)

    def do_GET(self):
        if self.path.startswith("/api/status"):
            config = load_config()
            has_pw = bool(config.get("app_password", "").strip())
            response_data = {
                "status": "ready",
                "server": "AARAMBH 2K26 Auto-Sender",
                "configured": has_pw,
                "sender": config.get("sender_email", "saajand34@gmail.com"),
                "has_pil": HAS_PIL
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode("utf-8"))
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == "/api/send-email":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            try:
                data = json.loads(body)
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "message": "Invalid JSON"}).encode("utf-8"))
                return

            recipient = data.get("to", "").strip()
            name = data.get("name", "Participant").strip()
            event = data.get("event", "Battle Front").strip()
            sign_off_choice = data.get("signOff", "principal")
            image_data = data.get("imageData", "")

            safe_name = re.sub(r"[^a-zA-Z0-9_-]", "_", name)
            safe_event = re.sub(r"[^a-zA-Z0-9_-]", "_", event)
            cert_filename = f"Certificate_{safe_name}_{safe_event}.png"
            cert_file_path = os.path.join(CERT_DIR, cert_filename)

            # 1. Obtain certificate image bytes
            img_bytes = b""
            if image_data and len(image_data) > 50:
                try:
                    if image_data.startswith("data:image"):
                        header, b64data = image_data.split(",", 1)
                        img_bytes = base64.b64decode(b64data)
                    else:
                        img_bytes = base64.b64decode(image_data)
                    with open(cert_file_path, "wb") as f:
                        f.write(img_bytes)
                except Exception as e:
                    print(f"Base64 decode error for {name}:", e)

            if not img_bytes and HAS_PIL:
                img_bytes = render_certificate_pillow(name, event, cert_file_path)

            subject = f"AARAMBH 2K26 Certificate of Participation - {name} ({event})"
            sign_off = get_sign_off_text(sign_off_choice)
            body_text = (
                f"Dear {name},\n\n"
                f"Congratulations on successfully participating in the event '{event}' at "
                f"AARAMBH 2K26 (Inter-Collegiate PU Fest) organized by Seshadripuram First Grade College, Bengaluru!\n\n"
                f"Please find your official Certificate of Participation attached with this email.\n\n"
                f"{sign_off}\n"
            )

            # 2. Save draft .eml in outbox
            eml_path = os.path.join(OUTBOX_DIR, f"Draft_{safe_name}_{safe_event}.eml")
            msg = MIMEMultipart("mixed")
            msg["To"] = recipient
            msg["Subject"] = subject
            msg["X-Unsent"] = "1"
            msg.attach(MIMEText(body_text, "plain", "utf-8"))

            if img_bytes:
                img_part = MIMEImage(img_bytes, name=cert_filename)
                img_part.add_header("Content-Disposition", "attachment", filename=cert_filename)
                msg.attach(img_part)

            with open(eml_path, "wb") as f:
                f.write(msg.as_bytes())

            # 3. Attempt SMTP dispatch if configured
            config = load_config()
            sender_email = config.get("sender_email", "").strip()
            app_pw = config.get("app_password", "").strip().replace(" ", "")

            smtp_sent = False
            smtp_msg = ""

            if sender_email and app_pw and recipient:
                try:
                    server = smtp_pool.get_connection(config)
                    msg["From"] = f"AARAMBH 2K26 SFGC <{sender_email}>"
                    server.send_message(msg)
                    smtp_sent = True
                    smtp_msg = f"Email sent directly via Gmail to {recipient} with {cert_filename} attached!"
                except Exception as ex:
                    smtp_pool.close()
                    smtp_msg = f"SMTP error: {str(ex)}. Saved draft to outbox."
                    print(f"SMTP error for {recipient}: {ex}")
            else:
                smtp_msg = (
                    f"Saved {cert_filename} and created draft in outbox. "
                    f"To send directly via Gmail SMTP, enter your Google App Password in email_config.json."
                )

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True,
                "smtp_sent": smtp_sent,
                "message": smtp_msg,
                "file": cert_filename,
                "eml": eml_path
            }).encode("utf-8"))

        elif self.path == "/api/config":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            try:
                data = json.loads(body)
                current = load_config()
                if "sender_email" in data and data["sender_email"].strip():
                    current["sender_email"] = data["sender_email"].strip()
                if "app_password" in data and data["app_password"].strip():
                    current["app_password"] = data["app_password"].strip().replace(" ", "")
                if "sign_off" in data and data["sign_off"].strip():
                    current["sign_off"] = data["sign_off"].strip()

                with open(CONFIG_FILE, "w", encoding="utf-8") as f:
                    json.dump(current, f, indent=2)

                smtp_pool.close()

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": True, 
                    "message": "Configuration updated successfully.",
                    "configured": bool(current.get("app_password", "").strip()),
                    "sender": current.get("sender_email", "")
                }).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "message": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def run_server():
    print("=" * 60)
    print("  AARAMBH 2K26 - AUTOMATED EMAIL SENDER BRIDGE")
    print(f"  Server URL: http://127.0.0.1:{PORT}")
    print(f"  Certificates saved to: {CERT_DIR}")
    print(f"  EML drafts saved to:   {OUTBOX_DIR}")
    print("=" * 60)
    print("Ready to receive email dispatches with attachments from the web page.")
    print("Press Ctrl+C to stop.\n")

    handler = AutoSenderHandler
    with ThreadingHTTPServer(("127.0.0.1", PORT), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            smtp_pool.close()
            httpd.shutdown()


if __name__ == "__main__":
    run_server()
