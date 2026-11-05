# AARAMBH 2K26 - Certificate Generator & Automated Gmail Dispatcher

An automated system designed to generate, align, batch print, and dispatch official **Certificates of Participation** for **AARAMBH 2K26 (Inter-Collegiate PU Fest)** hosted by **Seshadripuram First Grade College, Bengaluru**.

---

## 🎯 Key Features

### 1. 👥 Multi-Name Team Split (2 to 4 Names per Row)
- Many competition registrations (e.g., Free Fire / Battle Front) contain teams in a single spreadsheet row (e.g., *"S Sudhir | Tyuu | Rgghb | Rvhn"* or *"RUFUS KINGSLEY | 1)NITYAM | 2)VIKAS GIRI | 3)NIRMAL"*).
- The system automatically detects comma, pipe (`|`), and semicolon-separated names and **splits them into individual certificates** so that **every student gets their own personalized certificate** aligned precisely on the official template line.
- The 61 team registrations automatically produce all **244 individual certificates**.

### 2. 🔍 Smart Column Recognition
The system automatically identifies the following columns from your Excel (`.xlsx`, `.xls`) or CSV (`.csv`) file:
- **Participant Name / Members Column**: `members`, `name`, `Participant Name`, `Student Name`, `Candidate`, `Full Name`, etc.
- **Event Column**: `event`, `Event Name`, `Competition`, `Category`, `Option`, etc.
- **Gmail / Email Column**: `email`, `Gmail ID`, `Email ID`, `Mail`, etc.
*(Dropdown selectors let you change or override any column mapping with 1 click).*

### 3. ✉️ Gmail Integration & How Attachments Work
In web browsers, security restrictions prevent any website URL (`mail.google.com/mail/?...`) from attaching local hard drive files automatically without user consent. To provide the fastest, smoothest experience, the application offers **4 convenient ways to dispatch certificates with attachments**:

#### 💡 Method 1: Instant In-Browser Paste (Ctrl + V)
1. Click the **✉️** button next to any participant (or **✉️ Send via Gmail** in Manual mode).
2. The web page immediately **copies the high-resolution certificate image directly to your system clipboard** and **downloads the file** to your computer.
3. Gmail opens in a new tab with recipient, subject, and congratulatory message pre-filled.
4. **Simply press `Ctrl + V` inside the email body** — the certificate image pastes directly into your message!

#### 💡 Method 2: Drag & Drop Downloaded File
1. When you click **✉️**, the certificate image (`Certificate_Name_Event.png`) is downloaded automatically to your browser's download shelf.
2. Drag that file from the bottom of your browser window right into the Gmail compose box, or click Gmail's 📎 paperclip icon and select it from your Downloads folder.

#### 💡 Method 3: Download .EML Draft (File Pre-Attached)
1. Click the **📄** button next to any participant.
2. A standard `.eml` email draft file downloads instantly with the recipient, subject, body, and **the certificate image already attached as a MIME file**.
3. Double-click the `.eml` file to open it in Outlook or Windows Mail with the file attached, ready to send!

#### 💡 Method 4: 1-Click Automated Batch Email Dispatcher (Send to ALL at once!)
If you want to send certificates to all students / teams automatically in one click:
1. Double-click **`Start_Auto_Sender_Server.bat`** (or let the web page prompt you).
2. Click **`✉️ Send All Emails`** in the top navigation bar or **`✉️ Send All Certificates via Email`** in the Batch Actions panel.
3. If this is your first time, a setup dialog will let you enter your **16-character Google App Password**.
4. A live progress window will display real-time delivery status, progress percentage, delivery counters, and an activity log!
- You can also run the terminal batch script **`Send_All_Emails_Batch.bat`** directly.

### 4. 🖨️ Multi-Page A4 Landscape Batch Printing
- **Print All Certificates (Multi-Page A4)**:
  - Formatted for borderless A4 landscape printing (`page-break-after: always`).
  - Print the entire batch directly to your printer or export to a single consolidated multi-page PDF using "Save as PDF".
- **Download All as ZIP**:
  - Packs all $3120 \times 2206\text{ px}$ (300 DPI) certificates into a single `.zip` file.

### 5. 🎯 Official Fest Event Options
- ⚔️ **Option 1: Battle Front**
- 💻 **Option 2: Code Craft**
- 🧠 **Option 3: Mythos AI**
- ⚡ **Option 4: Mind of Memes**

---

## 🚀 How to Run

1. Open File Explorer and navigate to **`C:\Certificate\`**.
2. Double-click **`Start_Auto_Sender_Server.bat`** to enable background automated emailing.
3. Double-click **`Open_Certificate_Generator.bat`** (or open **`index.html`** in your browser).
4. Drop your Excel or CSV file onto the upload box (or click **⚡ Load Battle Front Fest Sample**).
5. Click **✉️ Send All Emails** to automatically email personalized certificates to all students!

---

## 📂 Files in this Project

- `index.html` - Web application interface with responsive layout and live preview.
- `style.css` - UI theme and multi-page A4 landscape print stylesheets.
- `script.js` - Spreadsheet parser, multi-member team splitter, clipboard engine, and Gmail dispatcher.
- `send_all_gmail_smtp.py` - Automated Python batch sender that renders certificates and sends emails with attachments via Gmail SMTP.
- `email_server.py` - Local background bridge server for 1-click automated sending from the web UI.
- `email_config.json` - Configuration file for Gmail SMTP credentials.
- `Start_Auto_Sender_Server.bat` - 1-click launcher for the local auto-sender server.
- `Send_All_Emails_Batch.bat` - 1-click launcher for the automated batch sender script.
- `Open_Certificate_Generator.bat` - 1-click web application launcher.
- `xlsx.full.min.js` - SheetJS library for offline Excel/CSV parsing.
- `jszip.min.js` - JSZip library for offline ZIP packaging.
- `template_data.js` - Pre-encoded Base64 template data URI.
- `certificate_template.png` - Official $3120 \times 2206\text{ px}$ master template.
- `sample_participants.csv` - The real 61-team Battle Front dataset from the fest registrations.
- `sample_participants.xlsx` - Excel version of the sample registrations.
