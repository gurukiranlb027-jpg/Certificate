"""
AARAMBH 2K26 - Automated Batch Email Sender & Certificate Generator
Renders high-resolution certificates (3120 x 2206 px) and sends them with attachments directly via Gmail SMTP.
"""

import os
import sys
import re
import csv
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(BASE_DIR, "certificate_template.png")
CERT_DIR = os.path.join(BASE_DIR, "certificates")
CONFIG_FILE = os.path.join(BASE_DIR, "email_config.json")
SAMPLE_CSV = os.path.join(BASE_DIR, "sample_participants.csv")

os.makedirs(CERT_DIR, exist_ok=True)

# Calibrated Base Coordinates (3120 x 2206 px canvas)
NAME_X, NAME_Y = 1581, 1388
EVENT_X, EVENT_Y = 1278, 1674

def load_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "sender_email": "saajand18@gmail.com",
        "app_password": "",
        "smtp_server": "smtp.gmail.com",
        "smtp_port": 587,
        "sign_off": "principal"
    }

def save_config(cfg):
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2)

def get_font(size, bold=False):
    font_file = "georgiab.ttf" if bold else "georgia.ttf"
    font_path = os.path.join(os.environ.get("WINDIR", "C:\\Windows"), "Fonts", font_file)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()

def render_certificate(name, event):
    if not os.path.exists(TEMPLATE_PATH):
        raise FileNotFoundError(f"Template not found at {TEMPLATE_PATH}")

    img = Image.open(TEMPLATE_PATH).copy()
    draw = ImageDraw.Draw(img)

    font_name = get_font(64, bold=True)
    font_event = get_font(46, bold=True)

    text_color = (28, 25, 23) # Deep ink charcoal (#1c1917)

    draw.text((NAME_X, NAME_Y), name.strip(), fill=text_color, font=font_name, anchor="ms")
    draw.text((EVENT_X, EVENT_Y), event.strip(), fill=text_color, font=font_event, anchor="ms")

    safe_name = re.sub(r"[^a-zA-Z0-9_-]", "_", name.strip())
    safe_event = re.sub(r"[^a-zA-Z0-9_-]", "_", event.strip())
    out_path = os.path.join(CERT_DIR, f"Certificate_{safe_name}_{safe_event}.png")
    img.save(out_path, format="PNG")
    return out_path

def split_names(raw_str):
    if not raw_str:
        return []
    cleaned = str(raw_str).replace("|", ",").replace(";", ",")
    parts = cleaned.split(",")
    results = []
    for p in parts:
        clean_p = re.sub(r"^\s*\(?\d+[\.\)\-]?\s*", "", p).strip()
        if clean_p:
            results.append(clean_p)
    return results

def load_participants_from_csv(csv_path):
    participants = []
    if not os.path.exists(csv_path):
        return participants

    with open(csv_path, "r", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            event = row.get("event") or "Battle Front"
            email = row.get("email") or ""
            members_raw = row.get("members") or row.get("name") or ""
            
            names = split_names(members_raw)
            if not names:
                name_single = row.get("name", "").strip()
                if name_single:
                    names = [name_single]

            for n in names:
                participants.append({
                    "name": n,
                    "event": event,
                    "email": email
                })
    return participants

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

def send_email_with_attachment(to_email, name, event, cert_path, config):
    sender_email = config.get("sender_email", "").strip()
    app_pw = config.get("app_password", "").strip().replace(" ", "")

    if not sender_email or not app_pw:
        raise ValueError("Sender email and Google App Password must be configured in email_config.json")

    subject = f"AARAMBH 2K26 Certificate of Participation - {name} ({event})"
    sign_off = get_sign_off_text(config.get("sign_off", "principal"))

    body_text = (
        f"Dear {name},\n\n"
        f"Congratulations on successfully participating in the event '{event}' at "
        f"AARAMBH 2K26 (Inter-Collegiate PU Fest) organized by Seshadripuram First Grade College, Bengaluru!\n\n"
        f"Please find your official Certificate of Participation attached with this email.\n\n"
        f"{sign_off}\n"
    )

    msg = MIMEMultipart("mixed")
    msg["From"] = f"AARAMBH 2K26 SFGC <{sender_email}>"
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body_text, "plain", "utf-8"))

    with open(cert_path, "rb") as f:
        img_bytes = f.read()

    cert_filename = os.path.basename(cert_path)
    img_part = MIMEImage(img_bytes, name=cert_filename)
    img_part.add_header("Content-Disposition", "attachment", filename=cert_filename)
    msg.attach(img_part)

    server = smtplib.SMTP(config.get("smtp_server", "smtp.gmail.com"), config.get("smtp_port", 587))
    server.starttls()
    server.login(sender_email, app_pw)
    server.send_message(msg)
    server.quit()

def main():
    print("=" * 65)
    print("  AARAMBH 2K26 - AUTOMATED EMAIL SENDER & CERTIFICATE GENERATOR")
    print("  Seshadripuram First Grade College • Inter-Collegiate PU Fest")
    print("=" * 65)

    config = load_config()

    while True:
        sender_email = config.get("sender_email", "")
        has_pw = bool(config.get("app_password", "").strip())
        pw_status = "Configured" if has_pw else "NOT CONFIGURED (Required to send)"

        print(f"\nCurrent Sender Gmail: {sender_email}")
        print(f"App Password Status:  {pw_status}")
        print("\nSelect an action:")
        print("  [1] Send 1 Test Email with Attachment (to saajand18@gmail.com)")
        print("  [2] Send Certificates to ALL participants in sample_participants.csv")
        print("  [3] Generate All Certificates as Ultra-HD PNGs (Without sending)")
        print("  [4] Configure Gmail Sender & Google App Password")
        print("  [5] Exit")

        choice = input("\nEnter choice (1-5): ").strip()

        if choice == "1":
            test_recipient = input(f"Enter recipient email [{sender_email}]: ").strip() or sender_email
            test_name = input("Enter student name [Bharath Kumar]: ").strip() or "Bharath Kumar"
            test_event = input("Enter event [Battle Front]: ").strip() or "Battle Front"

            print(f"\n🎨 Rendering certificate for {test_name} ({test_event})...")
            cert_path = render_certificate(test_name, test_event)
            print(f"✅ Certificate saved to: {cert_path}")

            if not has_pw:
                print("\n⚠️ Note: Google App Password is not yet set in email_config.json.")
                print("To send automatically, choose [4] to enter your 16-character Google App Password.")
                print(f"Your certificate image was saved in {CERT_DIR}")
                continue

            print(f"\n✉️ Sending email with attachment to {test_recipient}...")
            try:
                send_email_with_attachment(test_recipient, test_name, test_event, cert_path, config)
                print("🎉 SUCCESS! Email delivered with certificate attached!")
            except Exception as e:
                print(f"❌ Failed to send: {e}")

        elif choice == "2":
            csv_path = SAMPLE_CSV
            participants = load_participants_from_csv(csv_path)
            print(f"\nLoaded {len(participants)} individual participants from {os.path.basename(csv_path)}.")

            if not has_pw:
                print("\n⚠️ Google App Password is not yet set. Choose [4] first to configure it.")
                continue

            confirm = input(f"Are you sure you want to send {len(participants)} emails? (y/n): ").strip().lower()
            if confirm != "y":
                continue

            success_count = 0
            fail_count = 0

            for idx, p in enumerate(participants, 1):
                p_email = p["email"].strip()
                if not p_email:
                    print(f"[{idx}/{len(participants)}] Skipping {p['name']} (No email address)")
                    continue

                print(f"[{idx}/{len(participants)}] Processing {p['name']} ({p['event']}) -> {p_email}...")
                try:
                    cert_path = render_certificate(p["name"], p["event"])
                    send_email_with_attachment(p_email, p["name"], p["event"], cert_path, config)
                    print(f"  ✓ Delivered with attachment!")
                    success_count += 1
                except Exception as e:
                    print(f"  ✗ Error sending to {p['name']}: {e}")
                    fail_count += 1

            print(f"\nBatch dispatch complete! {success_count} sent successfully, {fail_count} failed.")

        elif choice == "3":
            csv_path = SAMPLE_CSV
            participants = load_participants_from_csv(csv_path)
            print(f"\nGenerating {len(participants)} Ultra-HD certificates to {CERT_DIR}...")
            for idx, p in enumerate(participants, 1):
                render_certificate(p["name"], p["event"])
                if idx % 20 == 0 or idx == len(participants):
                    print(f"  Generated {idx}/{len(participants)}...")
            print(f"✅ All {len(participants)} certificates saved to {CERT_DIR}")

        elif choice == "4":
            print("\n--- GMAIL SENDER CONFIGURATION ---")
            print("To send automated emails via Gmail, Google requires a 16-character 'App Password'.")
            print("How to get it (takes 1 minute):")
            print("1. Go to https://myaccount.google.com/security")
            print("2. Ensure '2-Step Verification' is turned ON.")
            print("3. Search 'App Passwords' in the search bar.")
            print("4. Name it 'Aarambh Fest' and copy the 16-character code (e.g., abcd efgh ijkl mnop).\n")

            new_email = input(f"Enter Gmail address [{config.get('sender_email')}]: ").strip()
            if new_email:
                config["sender_email"] = new_email

            new_pw = input("Enter 16-character Google App Password: ").strip().replace(" ", "")
            if new_pw:
                config["app_password"] = new_pw

            save_config(config)
            print("✅ Configuration saved successfully!")

        elif choice == "5":
            print("\nGoodbye!")
            break

if __name__ == "__main__":
    main()
