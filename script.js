// AARAMBH 2K26 - Certificate Generator & Gmail Dispatcher
// Official Template Resolution: 3120 x 2206 px (A4 Landscape, 300 DPI)

document.addEventListener('DOMContentLoaded', () => {
  // --- Canvas Setup ---
  const canvas = document.getElementById('certCanvas');
  const ctx = canvas.getContext('2d');
  const canvasWrapper = document.getElementById('canvasWrapper');
  const previewTitle = document.getElementById('previewTitle');

  // --- Upload & File Elements ---
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const btnLoadDemo = document.getElementById('btnLoadDemo');
  const columnMappingCard = document.getElementById('columnMappingCard');
  const recognitionBadge = document.getElementById('recognitionBadge');
  const selectNameCol = document.getElementById('selectNameCol');
  const selectEventCol = document.getElementById('selectEventCol');
  const selectEmailCol = document.getElementById('selectEmailCol');
  const checkSplitNames = document.getElementById('checkSplitNames');
  const selectDefaultEvent = document.getElementById('selectDefaultEvent');
  const selectSignOff = document.getElementById('selectSignOff');
  const serverStatusBadge = document.getElementById('serverStatusBadge');
  const rowCount = document.getElementById('rowCount');
  const certCount = document.getElementById('certCount');

  // --- Participant List & Navigation ---
  const participantsCard = document.getElementById('participantsCard');
  const participantCount = document.getElementById('participantCount');
  const participantTableBody = document.getElementById('participantTableBody');
  const filterInput = document.getElementById('filterInput');
  const btnNavPrev = document.getElementById('btnNavPrev');
  const btnNavNext = document.getElementById('btnNavNext');
  const navCounter = document.getElementById('navCounter');

  // --- Print & Batch Action Cards ---
  const printActionsCard = document.getElementById('printActionsCard');
  const btnPrintAll = document.getElementById('btnPrintAll');
  const btnPrintCurrent = document.getElementById('btnPrintCurrent');
  const btnPrintAllTop = document.getElementById('btnPrintAllTop');
  const btnPrintCurrentTop = document.getElementById('btnPrintCurrentTop');
  const btnDownloadZip = document.getElementById('btnDownloadZip');
  const btnDownloadSinglePng = document.getElementById('btnDownloadSinglePng');
  const btnDownloadTop = document.getElementById('btnDownloadTop');
  const printBatchContainer = document.getElementById('printBatchContainer');

  // --- Batch Email Sending Buttons ---
  const btnSendAllEmailsTop = document.getElementById('btnSendAllEmailsTop');
  const btnSendAllEmails = document.getElementById('btnSendAllEmails');
  const btnSendAllFromTable = document.getElementById('btnSendAllFromTable');

  // --- Batch Email Progress Modal Elements ---
  const batchEmailModal = document.getElementById('batchEmailModal');
  const btnCloseBatchModal = document.getElementById('btnCloseBatchModal');
  const batchModalSubtitle = document.getElementById('batchModalSubtitle');
  const batchProgressLabel = document.getElementById('batchProgressLabel');
  const batchProgressPercent = document.getElementById('batchProgressPercent');
  const batchProgressBar = document.getElementById('batchProgressBar');
  const batchTotalCount = document.getElementById('batchTotalCount');
  const batchSuccessCount = document.getElementById('batchSuccessCount');
  const batchFailCount = document.getElementById('batchFailCount');
  const batchSkipCount = document.getElementById('batchSkipCount');
  const currentSendingCard = document.getElementById('currentSendingCard');
  const currentSendingName = document.getElementById('currentSendingName');
  const currentSendingSub = document.getElementById('currentSendingSub');
  const batchLogList = document.getElementById('batchLogList');
  const btnClearBatchLog = document.getElementById('btnClearBatchLog');
  const batchFooterStatus = document.getElementById('batchFooterStatus');
  const btnPauseResumeBatch = document.getElementById('btnPauseResumeBatch');
  const btnCancelBatch = document.getElementById('btnCancelBatch');
  const btnCloseBatchDone = document.getElementById('btnCloseBatchDone');

  // --- SMTP Configuration Modal Elements ---
  const smtpConfigModal = document.getElementById('smtpConfigModal');
  const btnCloseSmtpModal = document.getElementById('btnCloseSmtpModal');
  const smtpConfigForm = document.getElementById('smtpConfigForm');
  const smtpSenderEmail = document.getElementById('smtpSenderEmail');
  const smtpAppPassword = document.getElementById('smtpAppPassword');
  const btnToggleAppPw = document.getElementById('btnToggleAppPw');
  const btnSaveSmtpConfig = document.getElementById('btnSaveSmtpConfig');

  // --- Server Offline Modal Elements ---
  const serverOfflineModal = document.getElementById('serverOfflineModal');
  const btnCloseOfflineModal = document.getElementById('btnCloseOfflineModal');
  const btnRetryServerConnection = document.getElementById('btnRetryServerConnection');

  // --- Manual Entry Tab Elements ---
  const inputName = document.getElementById('inputName');
  const btnCaseToggle = document.getElementById('btnCaseToggle');
  const selectEvent = document.getElementById('selectEvent');
  const eventPills = document.querySelectorAll('.event-pill');
  const manualEmail = document.getElementById('manualEmail');
  const btnManualSendGmail = document.getElementById('btnManualSendGmail');
  const btnManualDownloadEml = document.getElementById('btnManualDownloadEml');
  const btnManualDownloadPng = document.getElementById('btnManualDownloadPng');
  const btnManualDownloadPdf = document.getElementById('btnManualDownloadPdf');
  const btnManualPrint = document.getElementById('btnManualPrint');

  // --- Attachment Modal Elements ---
  const attachmentModal = document.getElementById('attachmentModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnModalDone = document.getElementById('btnModalDone');
  const modalParticipantSub = document.getElementById('modalParticipantSub');
  const modalFileName = document.getElementById('modalFileName');
  const btnModalCopyClip = document.getElementById('btnModalCopyClip');
  const btnModalDownloadPng = document.getElementById('btnModalDownloadPng');
  const btnModalDownloadEml = document.getElementById('btnModalDownloadEml');
  const btnModalAutoSend = document.getElementById('btnModalAutoSend');
  const modalServerTip = document.getElementById('modalServerTip');

  // --- Typography & Alignment Controls ---
  const selectFont = document.getElementById('selectFont');
  const sliderNameSize = document.getElementById('sliderNameSize');
  const valNameSize = document.getElementById('valNameSize');
  const sliderNameY = document.getElementById('sliderNameY');
  const valNameY = document.getElementById('valNameY');
  const sliderEventSize = document.getElementById('sliderEventSize');
  const valEventSize = document.getElementById('valEventSize');
  const sliderEventY = document.getElementById('sliderEventY');
  const valEventY = document.getElementById('valEventY');
  const btnResetAlignment = document.getElementById('btnResetAlignment');
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const customColorPicker = document.getElementById('customColorPicker');

  // --- Tabs Navigation ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabUpload = document.getElementById('tabUpload');
  const tabManual = document.getElementById('tabManual');

  // --- Zoom & Fullscreen ---
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnZoomReset = document.getElementById('btnZoomReset');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const toast = document.getElementById('toast');

  // --- State Variables ---
  let activeTab = 'upload';
  let isUpperCase = false;
  let currentColor = '#1c1917';
  let zoomLevel = 1.0;
  
  let rawSheetData = []; 
  let parsedParticipants = [];
  let currentParticipantIndex = 0;

  // Calibrated Base Coordinates for 3120 x 2206 Canvas:
  const NAME_CENTER_X = 1581;
  const NAME_BASE_Y = 1388;

  const EVENT_CENTER_X = 1278;
  const EVENT_BASE_Y = 1674;

  const VALID_EVENTS = ['Battle Front', 'Code Craft', 'Mythos AI', 'Tech Master'];

  // --- Load Template Image ---
  const templateImg = new Image();
  templateImg.src = window.CERTIFICATE_TEMPLATE_DATA_URI || 'certificate_template.png';

  templateImg.onload = () => {
    renderCurrentCertificate();
    showToast('✨ Certificate template ready (3120 × 2206 px)');
  };

  templateImg.onerror = () => {
    console.error('Could not load certificate template image.');
    showToast('⚠️ Error loading certificate template image.');
  };

  // --- Core Canvas Render Function ---
  function drawCertificate(nameText, eventText, targetCanvas = canvas) {
    if (!templateImg.complete || templateImg.naturalWidth === 0) return;
    const targetCtx = targetCanvas.getContext('2d');

    // 1. Draw Template Image
    targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    targetCtx.drawImage(templateImg, 0, 0, targetCanvas.width, targetCanvas.height);

    // 2. Text Preparation
    const rawName = (nameText || 'Participant Name').trim();
    const displayName = isUpperCase ? rawName.toUpperCase() : rawName;
    const displayEvent = (eventText || 'Battle Front').trim();

    // 3. Typography parameters
    const fontFam = selectFont.value;
    const nameSize = parseInt(sliderNameSize.value, 10);
    const nameNudgeY = parseInt(sliderNameY.value, 10);
    const nameY = NAME_BASE_Y + nameNudgeY;

    targetCtx.save();
    targetCtx.textAlign = 'center';
    targetCtx.textBaseline = 'alphabetic';
    targetCtx.fillStyle = currentColor;

    if (fontFam.includes('Great Vibes')) {
      targetCtx.font = `normal ${Math.round(nameSize * 1.35)}px ${fontFam}`;
    } else if (fontFam.includes('Montserrat')) {
      targetCtx.font = `600 ${nameSize}px ${fontFam}`;
    } else {
      targetCtx.font = `bold ${nameSize}px ${fontFam}`;
    }

    targetCtx.fillText(displayName, NAME_CENTER_X, nameY);
    targetCtx.restore();

    // 4. Render Event Name
    const eventSize = parseInt(sliderEventSize.value, 10);
    const eventNudgeY = parseInt(sliderEventY.value, 10);
    const eventY = EVENT_BASE_Y + eventNudgeY;

    targetCtx.save();
    targetCtx.textAlign = 'center';
    targetCtx.textBaseline = 'alphabetic';
    targetCtx.fillStyle = currentColor;
    targetCtx.font = `bold ${eventSize}px ${fontFam.includes('Great Vibes') ? 'Georgia, serif' : fontFam}`;
    targetCtx.fillText(displayEvent, EVENT_CENTER_X, eventY);
    targetCtx.restore();
  }

  function renderCurrentCertificate() {
    if (activeTab === 'upload' && parsedParticipants.length > 0) {
      const p = parsedParticipants[currentParticipantIndex];
      drawCertificate(p.name, p.event);
      previewTitle.textContent = `Certificate: ${p.name} (${p.event})`;
    } else {
      drawCertificate(inputName.value, selectEvent.value);
      previewTitle.textContent = `Certificate: ${inputName.value || 'Preview'}`;
    }
  }

  // --- Dynamic Sign-Off Text Generator ---
  function getSignOffText() {
    const signOffVal = selectSignOff ? selectSignOff.value : 'principal';
    if (signOffVal === 'convenor') {
      return (
        "Warm regards,\n" +
        "Pro. Bhavya KS\n" +
        "Convenor Aarambh 2K26\n" +
        "Seshadripuram First Grade College\n" +
        "Yelahanka New Town, Bengaluru - 560064"
      );
    } else if (signOffVal === 'both') {
      return (
        "Warm regards,\n" +
        "Pro. Bhavya KS (Convenor Aarambh 2K26)\n" +
        "Dr. S. N. Venkatesh (Principal)\n" +
        "Seshadripuram First Grade College\n" +
        "Yelahanka New Town, Bengaluru - 560064"
      );
    } else {
      // Default: 'principal' (Matches official certificate signature & approved screenshot)
      return (
        "Warm regards,\n" +
        "Dr. S. N. Venkatesh\n" +
        "Principal, Seshadripuram First Grade College\n" +
        "Yelahanka New Town, Bengaluru - 560064"
      );
    }
  }

  // --- URL Builder for Gmail ---
  function getGmailUrl(email, name, event) {
    const su = encodeURIComponent(`AARAMBH 2K26 Certificate of Participation - ${name} (${event})`);
    const signOff = getSignOffText();
    const body = encodeURIComponent(
      `Dear ${name},\n\n` +
      `Congratulations on successfully participating in the event '${event}' at AARAMBH 2K26 (Inter-Collegiate PU Fest) organized by Seshadripuram First Grade College, Bengaluru!\n\n` +
      `Please find your official Certificate of Participation.\n\n` +
      `${signOff}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email || '')}&su=${su}&body=${body}`;
  }

  // --- RFC 822 .EML Draft Generator with File Attached ---
  function generateAndDownloadEml(participant) {
    const name = (participant.name || 'Participant').trim();
    const event = (participant.event || 'Battle Front').trim();
    const email = (participant.email || '').trim();
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeEvent = event.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Certificate_${safeName}_${safeEvent}.png`;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    drawCertificate(name, event, tempCanvas);

    const dataUrl = tempCanvas.toDataURL('image/png');
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');

    const boundary = "==_AARAMBH_BOUNDARY_" + Date.now() + "_==";
    const subject = `AARAMBH 2K26 Certificate of Participation - ${name} (${event})`;
    const signOff = getSignOffText();

    const bodyText = 
      `Dear ${name},\r\n\r\n` +
      `Congratulations on successfully participating in the event '${event}' at AARAMBH 2K26 (Inter-Collegiate PU Fest) organized by Seshadripuram First Grade College, Bengaluru!\r\n\r\n` +
      `Please find your official Certificate of Participation attached with this message.\r\n\r\n` +
      `${signOff}\r\n`;

    let emlContent = "";
    emlContent += `To: ${email}\r\n`;
    emlContent += `Subject: ${subject}\r\n`;
    emlContent += `X-Unsent: 1\r\n`; // Tells Outlook & Windows Mail to open as an unsent editable compose draft!
    emlContent += `MIME-Version: 1.0\r\n`;
    emlContent += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;

    // Part 1: Body Text
    emlContent += `--${boundary}\r\n`;
    emlContent += `Content-Type: text/plain; charset="utf-8"\r\n`;
    emlContent += `Content-Transfer-Encoding: 7bit\r\n\r\n`;
    emlContent += bodyText + `\r\n\r\n`;

    // Part 2: Image Attachment
    emlContent += `--${boundary}\r\n`;
    emlContent += `Content-Type: image/png; name="${filename}"\r\n`;
    emlContent += `Content-Disposition: attachment; filename="${filename}"\r\n`;
    emlContent += `Content-Transfer-Encoding: base64\r\n\r\n`;

    const chunks = base64Data.match(/.{1,76}/g) || [];
    emlContent += chunks.join("\r\n") + `\r\n\r\n`;
    emlContent += `--${boundary}--\r\n`;

    const blob = new Blob([emlContent], { type: 'message/rfc822' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `Draft_${safeName}_${safeEvent}.eml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`✅ Downloaded Draft .EML with Certificate Attached!`);
  }

  // --- Helper: Split Comma & Pipe Separated Items ---
  function splitCommaValues(rawStr) {
    if (!rawStr) return [];
    let normalized = String(rawStr)
      .replace(/\|/g, ',')
      .replace(/\r?\n/g, ',')
      .replace(/;/g, ',')
      .replace(/\s+and\s+/gi, ',')
      .replace(/\s+&\s+/g, ',');

    return normalized
      .split(',')
      .map(item => {
        return item.replace(/^\s*\(?\d+[\.\)\-]?\s*/, '').trim();
      })
      .filter(item => item.length > 0);
  }

  // --- Excel & CSV File Parsing Engine ---
  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  });

  function processFile(file) {
    showToast(`Reading ${file.name}...`);
    const reader = new FileReader();
    const isCsv = file.name.endsWith('.csv');

    reader.onload = (e) => {
      try {
        let workbook;
        if (isCsv) {
          const text = e.target.result;
          workbook = XLSX.read(text, { type: 'string' });
        } else {
          const data = new Uint8Array(e.target.result);
          workbook = XLSX.read(data, { type: 'array' });
        }

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!jsonData || jsonData.length === 0) {
          showToast('⚠️ The uploaded spreadsheet appears to be empty.');
          return;
        }

        rawSheetData = jsonData;
        setupColumnRecognition(jsonData);
        showToast(`✅ Loaded ${jsonData.length} rows from ${file.name}`);
      } catch (err) {
        console.error('File parsing error:', err);
        showToast('⚠️ Error parsing file. Please check file format.');
      }
    };

    if (isCsv) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  // Auto-Detect Columns (Name / Members, Event, Email)
  function setupColumnRecognition(data) {
    if (data.length === 0) return;
    const columns = Object.keys(data[0]);

    selectNameCol.innerHTML = '';
    selectEventCol.innerHTML = '';
    selectEmailCol.innerHTML = '<option value="">-- None / Skip --</option>';

    columns.forEach(col => {
      selectNameCol.add(new Option(col, col));
      selectEventCol.add(new Option(col, col));
      selectEmailCol.add(new Option(col, col));
    });

    const memberPattern = /(member|members|team|all_names|participants)/i;
    const namePattern = /(name|participant|student|candidate|attendee|full[_\s]?name|person)/i;
    const eventPattern = /(event|competition|fest|category|event[_\s]?name|track|option)/i;
    const emailPattern = /(email|mail|gmail|email[_\s]?id|contact[_\s]?email)/i;

    let detectedNameCol = columns.find(c => memberPattern.test(c)) || columns.find(c => namePattern.test(c)) || columns[0];
    let detectedEventCol = columns.find(c => eventPattern.test(c)) || (columns.length > 1 ? columns[1] : columns[0]);
    let detectedEmailCol = columns.find(c => emailPattern.test(c)) || '';

    selectNameCol.value = detectedNameCol;
    selectEventCol.value = detectedEventCol;
    if (detectedEmailCol) selectEmailCol.value = detectedEmailCol;

    columnMappingCard.style.display = 'block';
    participantsCard.style.display = 'block';
    printActionsCard.style.display = 'block';

    applyColumnMapping();
  }

  // Parse Rows & Split Comma/Pipe Separated Names
  function applyColumnMapping() {
    const nameCol = selectNameCol.value;
    const eventCol = selectEventCol.value;
    const emailCol = selectEmailCol.value;
    const defaultEv = selectDefaultEvent.value;
    const shouldSplit = checkSplitNames.checked;

    parsedParticipants = [];

    rawSheetData.forEach((row, rowIdx) => {
      const rawNameStr = String(row[nameCol] || '').trim();
      const eventVal = String(row[eventCol] || '').trim();
      const rawEmailStr = emailCol ? String(row[emailCol] || '').trim() : '';

      if (!rawNameStr) return;

      const normalizedEvent = normalizeEvent(eventVal, defaultEv);

      if (shouldSplit) {
        const namesList = splitCommaValues(rawNameStr);
        const emailsList = splitCommaValues(rawEmailStr);
        const count = namesList.length;

        if (count > 0) {
          namesList.forEach((indName, idx) => {
            const indEmail = emailsList[idx] || (emailsList.length === 1 ? emailsList[0] : '');

            parsedParticipants.push({
              name: indName,
              event: normalizedEvent,
              email: indEmail,
              originalRow: rowIdx + 1,
              isTeam: count > 1,
              teamIndex: idx + 1,
              teamTotal: count
            });
          });
        } else {
          parsedParticipants.push({
            name: rawNameStr,
            event: normalizedEvent,
            email: rawEmailStr,
            originalRow: rowIdx + 1,
            isTeam: false,
            teamIndex: 1,
            teamTotal: 1
          });
        }
      } else {
        parsedParticipants.push({
          name: rawNameStr,
          event: normalizedEvent,
          email: rawEmailStr,
          originalRow: rowIdx + 1,
          isTeam: false,
          teamIndex: 1,
          teamTotal: 1
        });
      }
    });

    rowCount.textContent = rawSheetData.length;
    certCount.textContent = parsedParticipants.length;
    participantCount.textContent = parsedParticipants.length;
    currentParticipantIndex = 0;

    renderParticipantTable();
    updateNavigation();
    renderCurrentCertificate();
  }

  // Event Normalizer Function
  function normalizeEvent(val, defaultVal) {
    if (!val) return defaultVal;
    const clean = val.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (clean.includes('battle') || clean === '1' || clean.includes('option1')) {
      return 'Battle Front';
    } else if (clean.includes('code') || clean.includes('craft') || clean === '2' || clean.includes('option2')) {
      return 'Code Craft';
    } else if (clean.includes('mythos') || clean.includes('ai') || clean === '3' || clean.includes('option3')) {
      return 'Mythos AI';
    } else if (clean.includes('tech') || clean.includes('master') || clean === '4' || clean.includes('option4')) {
      return 'Tech Master';
    }

    for (let ve of VALID_EVENTS) {
      if (ve.toLowerCase() === val.toLowerCase()) return ve;
    }

    return val;
  }

  selectNameCol.addEventListener('change', applyColumnMapping);
  selectEventCol.addEventListener('change', applyColumnMapping);
  selectEmailCol.addEventListener('change', applyColumnMapping);
  selectDefaultEvent.addEventListener('change', applyColumnMapping);
  checkSplitNames.addEventListener('change', applyColumnMapping);

  // Render Table Rows with Direct Gmail Action
  function renderParticipantTable(filter = '') {
    participantTableBody.innerHTML = '';
    const q = filter.toLowerCase().trim();

    parsedParticipants.forEach((p, idx) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.event.toLowerCase().includes(q) && !p.email.toLowerCase().includes(q)) {
        return;
      }

      const tr = document.createElement('tr');
      if (idx === currentParticipantIndex) {
        tr.classList.add('active-row');
      }

      let teamBadgeHtml = p.isTeam ? `<div class="team-badge">👥 Team (${p.teamIndex}/${p.teamTotal})</div>` : '';
      let emailHtml = p.email 
        ? `<span class="contact-pill email" title="${escapeHtml(p.email)}">✉️ ${escapeHtml(p.email)}</span>` 
        : `<span class="text-dim" style="font-size:0.7rem;">None</span>`;

      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>
          <strong>${escapeHtml(p.name)}</strong>
          ${teamBadgeHtml}
        </td>
        <td><span class="event-tag">${escapeHtml(p.event)}</span></td>
        <td>${emailHtml}</td>
        <td>
          <div class="action-btn-group">
            <button type="button" class="action-icon-btn gmail" title="Open in Gmail (Copy & Download)" data-idx="${idx}">✉️</button>
            <button type="button" class="action-icon-btn eml" title="Download .EML Draft (File Pre-Attached)" data-idx="${idx}">📄</button>
            <button type="button" class="action-icon-btn preview" title="Preview Certificate" data-idx="${idx}">👁️</button>
            <button type="button" class="action-icon-btn download" title="Download PNG" data-idx="${idx}">📥</button>
          </div>
        </td>
      `;

      tr.addEventListener('click', (e) => {
        if (e.target.closest('.action-icon-btn')) return;
        currentParticipantIndex = idx;
        highlightActiveRow();
        updateNavigation();
        renderCurrentCertificate();
      });

      const btnGmail = tr.querySelector('.action-icon-btn.gmail');
      const btnEml = tr.querySelector('.action-icon-btn.eml');
      const btnPreview = tr.querySelector('.action-icon-btn.preview');
      const btnDownload = tr.querySelector('.action-icon-btn.download');

      btnGmail.addEventListener('click', (e) => {
        e.stopPropagation();
        currentParticipantIndex = idx;
        highlightActiveRow();
        renderCurrentCertificate();
        dispatchGmailWithAttachment(p);
      });

      btnEml.addEventListener('click', (e) => {
        e.stopPropagation();
        generateAndDownloadEml(p);
      });

      btnPreview.addEventListener('click', (e) => {
        e.stopPropagation();
        currentParticipantIndex = idx;
        highlightActiveRow();
        updateNavigation();
        renderCurrentCertificate();
      });

      btnDownload.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadSinglePng(p.name, p.event);
      });

      participantTableBody.appendChild(tr);
    });
  }

  function highlightActiveRow() {
    const rows = participantTableBody.querySelectorAll('tr');
    rows.forEach((r, idx) => {
      r.classList.toggle('active-row', idx === currentParticipantIndex);
    });
  }

  function updateNavigation() {
    const total = parsedParticipants.length;
    if (total === 0) {
      navCounter.textContent = '0 participants';
      btnNavPrev.disabled = true;
      btnNavNext.disabled = true;
    } else {
      navCounter.textContent = `${currentParticipantIndex + 1} of ${total}: ${parsedParticipants[currentParticipantIndex].name}`;
      btnNavPrev.disabled = currentParticipantIndex <= 0;
      btnNavNext.disabled = currentParticipantIndex >= total - 1;
    }
  }

  btnNavPrev.addEventListener('click', () => {
    if (currentParticipantIndex > 0) {
      currentParticipantIndex--;
      highlightActiveRow();
      updateNavigation();
      renderCurrentCertificate();
    }
  });

  btnNavNext.addEventListener('click', () => {
    if (currentParticipantIndex < parsedParticipants.length - 1) {
      currentParticipantIndex++;
      highlightActiveRow();
      updateNavigation();
      renderCurrentCertificate();
    }
  });

  filterInput.addEventListener('input', (e) => {
    renderParticipantTable(e.target.value);
  });

  // --- MODAL & GMAIL DISPATCH WITH ATTACHMENT ---
  let currentModalParticipant = null;

  async function dispatchGmailWithAttachment(participant) {
    const name = (participant.name || 'Participant').trim();
    const event = (participant.event || 'Battle Front').trim();
    let email = participant.email ? participant.email.trim() : '';

    if (!email) {
      email = prompt(`Enter Gmail ID for ${name}:`, '') || '';
      participant.email = email;
    }

    currentModalParticipant = participant;
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeEvent = event.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Certificate_${safeName}_${safeEvent}.png`;

    // 1. Prepare Certificate on Offscreen Canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    drawCertificate(name, event, tempCanvas);

    // 2. Perform Clipboard Copy FIRST while user click gesture has active document focus
    let clipboardOk = false;
    if (navigator.clipboard && navigator.clipboard.write && window.ClipboardItem) {
      try {
        const blobPromise = new Promise(resolve => tempCanvas.toBlob(resolve, 'image/png'));
        const item = new ClipboardItem({ 'image/png': blobPromise });
        await navigator.clipboard.write([item]);
        clipboardOk = true;
      } catch (err) {
        console.warn('Clipboard write note:', err);
      }
    }

    // 3. Simultaneously Trigger File Download to User's computer
    try {
      const dataUrl = tempCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Download trigger note:', err);
    }

    // 4. Open Gmail Compose URL in a new tab
    const gmailUrl = getGmailUrl(email, name, event);
    window.open(gmailUrl, '_blank');

    // 5. Open on-screen Attachment Guide Modal
    openAttachmentModal(participant, filename, clipboardOk);
    showToast(`✉️ Gmail opened! Certificate copied & downloaded. Press Ctrl+V in Gmail to paste.`);
  }

  function openAttachmentModal(participant, filename, copied) {
    if (!attachmentModal) return;
    modalParticipantSub.textContent = `${participant.name} • ${participant.event} (${participant.email || 'No email specified'})`;
    modalFileName.textContent = filename;
    attachmentModal.style.display = 'flex';
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      attachmentModal.style.display = 'none';
    });
  }

  if (btnModalDone) {
    btnModalDone.addEventListener('click', () => {
      attachmentModal.style.display = 'none';
    });
  }

  if (attachmentModal) {
    attachmentModal.addEventListener('click', (e) => {
      if (e.target === attachmentModal) {
        attachmentModal.style.display = 'none';
      }
    });
  }

  if (btnModalCopyClip) {
    btnModalCopyClip.addEventListener('click', async () => {
      if (!currentModalParticipant) return;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      drawCertificate(currentModalParticipant.name, currentModalParticipant.event, tempCanvas);

      if (navigator.clipboard && navigator.clipboard.write && window.ClipboardItem) {
        try {
          const blobPromise = new Promise(resolve => tempCanvas.toBlob(resolve, 'image/png'));
          const item = new ClipboardItem({ 'image/png': blobPromise });
          await navigator.clipboard.write([item]);
          showToast('📋 Re-copied certificate image to clipboard! Press Ctrl+V in Gmail.');
        } catch(e) {
          showToast('⚠️ Could not copy image to clipboard.');
        }
      }
    });
  }

  if (btnModalDownloadPng) {
    btnModalDownloadPng.addEventListener('click', () => {
      if (!currentModalParticipant) return;
      downloadSinglePng(currentModalParticipant.name, currentModalParticipant.event);
    });
  }

  if (btnModalDownloadEml) {
    btnModalDownloadEml.addEventListener('click', () => {
      if (!currentModalParticipant) return;
      generateAndDownloadEml(currentModalParticipant);
    });
  }

  if (btnModalAutoSend) {
    btnModalAutoSend.addEventListener('click', () => {
      if (!currentModalParticipant) return;
      sendViaLocalServer(currentModalParticipant);
    });
  }

  // --- Local Auto-Send Server Client & Batch Dispatch Engine ---
  let serverState = { online: false, configured: false, sender: 'saajand18@gmail.com' };
  let isBatchRunning = false;
  let isBatchPaused = false;
  let batchCancelRequested = false;

  async function checkServerStatus() {
    if (!serverStatusBadge) return serverState;
    try {
      const res = await fetch('http://127.0.0.1:5000/api/status', { mode: 'cors' });
      const data = await res.json();
      if (data.status === 'ready') {
        serverState.online = true;
        serverState.configured = !!data.configured;
        serverState.sender = data.sender || 'saajand18@gmail.com';

        serverStatusBadge.className = 'server-status-pill online';
        serverStatusBadge.innerHTML = '<span class="status-dot"></span> Auto-Sender: Online (1-Click Ready)';
        if (modalServerTip) modalServerTip.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        return serverState;
      }
    } catch (e) {
      serverState.online = false;
      serverState.configured = false;
      serverStatusBadge.className = 'server-status-pill offline';
      serverStatusBadge.innerHTML = '<span class="status-dot"></span> Auto-Sender: Standby (Gmail Web)';
    }
    return serverState;
  }
  setInterval(checkServerStatus, 5000);
  checkServerStatus();

  // Send single certificate via local server
  async function sendViaLocalServer(participant) {
    showToast(`⚡ Sending email with attachment to ${participant.email || participant.name}...`);
    try {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      drawCertificate(participant.name, participant.event, tempCanvas);
      const dataUrl = tempCanvas.toDataURL('image/png');

      const res = await fetch('http://127.0.0.1:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: participant.email,
          name: participant.name,
          event: participant.event,
          signOff: selectSignOff ? selectSignOff.value : 'principal',
          imageData: dataUrl
        })
      });

      const data = await res.json();
      if (data.success && data.smtp_sent) {
        showToast(`✅ ${data.message || 'Email sent with attachment!'}`);
        if (attachmentModal) attachmentModal.style.display = 'none';
      } else if (data.success && !data.smtp_sent) {
        showToast(`📁 Draft created in outbox. Configure App Password to send live.`);
        openSmtpSetupModal();
      } else {
        alert(`Auto-Sender Notice:\n${data.message || 'Could not send automatically. Please ensure SMTP credentials are set.'}`);
      }
    } catch (err) {
      openServerOfflineModal();
    }
  }

  // --- Modal Helpers ---
  function openServerOfflineModal() {
    if (serverOfflineModal) serverOfflineModal.style.display = 'flex';
  }

  function openSmtpSetupModal() {
    if (smtpConfigModal) {
      if (smtpSenderEmail) smtpSenderEmail.value = serverState.sender || 'saajand18@gmail.com';
      smtpConfigModal.style.display = 'flex';
    }
  }

  function appendBatchLog(message, type = 'info') {
    if (!batchLogList) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const div = document.createElement('div');
    div.className = `log-entry ${type}`;
    div.innerHTML = `<span class="log-time">[${timeStr}]</span> <span>${escapeHtml(message)}</span>`;
    batchLogList.appendChild(div);
    batchLogList.scrollTop = batchLogList.scrollHeight;
  }

  // --- 1-Click BATCH EMAIL SENDER FOR ALL PARTICIPANTS ---
  async function startBatchEmailDispatch() {
    if (isBatchRunning) {
      showToast('⚠️ A batch email dispatch is already in progress!');
      if (batchEmailModal) batchEmailModal.style.display = 'flex';
      return;
    }

    // 1. Verify participants are loaded
    if (!parsedParticipants || parsedParticipants.length === 0) {
      showToast('⚠️ No participants loaded! Please upload an Excel/CSV file or load the sample data first.');
      return;
    }

    // 2. Check Auto-Sender server status
    showToast('🔍 Checking Auto-Sender background server...');
    const status = await checkServerStatus();

    if (!status.online) {
      openServerOfflineModal();
      return;
    }

    // 3. Check if Google App Password is configured
    if (!status.configured) {
      openSmtpSetupModal();
      return;
    }

    // 4. Confirm with user
    const totalCount = parsedParticipants.length;
    const withEmailCount = parsedParticipants.filter(p => p.email && p.email.trim() && p.email.includes('@')).length;
    const confirmMsg = `Ready to send official certificates to all participants!\n\n` +
      `• Total Certificates: ${totalCount}\n` +
      `• With Registered Gmail: ${withEmailCount}\n` +
      `• Sender Gmail: ${status.sender}\n\n` +
      `Click OK to start automated email dispatch.`;

    if (!confirm(confirmMsg)) return;

    // 5. Open Batch Modal and initialize UI
    isBatchRunning = true;
    isBatchPaused = false;
    batchCancelRequested = false;

    if (batchEmailModal) batchEmailModal.style.display = 'flex';
    if (batchTotalCount) batchTotalCount.textContent = totalCount;
    if (batchSuccessCount) batchSuccessCount.textContent = '0';
    if (batchFailCount) batchFailCount.textContent = '0';
    if (batchSkipCount) batchSkipCount.textContent = '0';
    if (batchProgressBar) batchProgressBar.style.width = '0%';
    if (batchProgressPercent) batchProgressPercent.textContent = '0%';
    if (batchProgressLabel) batchProgressLabel.textContent = `Preparing dispatch for ${totalCount} participants...`;
    if (batchFooterStatus) batchFooterStatus.textContent = 'Sending in progress...';
    if (batchLogList) batchLogList.innerHTML = '';
    if (btnPauseResumeBatch) {
      btnPauseResumeBatch.style.display = 'inline-block';
      btnPauseResumeBatch.textContent = '⏸️ Pause';
    }
    if (btnCancelBatch) btnCancelBatch.style.display = 'inline-block';
    if (btnCloseBatchDone) btnCloseBatchDone.style.display = 'none';

    appendBatchLog(`🚀 Starting automated batch email dispatch for ${totalCount} certificates...`, 'info');
    appendBatchLog(`Sender: ${status.sender} via Gmail SMTP`, 'info');

    let delivered = 0;
    let failed = 0;
    let skipped = 0;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;

    const signOffChoice = selectSignOff ? selectSignOff.value : 'principal';

    for (let i = 0; i < totalCount; i++) {
      if (batchCancelRequested) {
        appendBatchLog(`⏹️ Dispatch cancelled by user at item ${i} of ${totalCount}.`, 'warning');
        if (batchFooterStatus) batchFooterStatus.textContent = 'Batch stopped by user.';
        break;
      }

      while (isBatchPaused) {
        if (batchCancelRequested) break;
        if (batchFooterStatus) batchFooterStatus.textContent = 'Paused. Click Resume to continue.';
        await new Promise(resolve => setTimeout(resolve, 250));
      }

      if (batchCancelRequested) break;
      if (batchFooterStatus) batchFooterStatus.textContent = `Dispatching [${i + 1} of ${totalCount}]...`;

      const p = parsedParticipants[i];
      const pct = Math.round(((i + 1) / totalCount) * 100);
      if (batchProgressBar) batchProgressBar.style.width = `${pct}%`;
      if (batchProgressPercent) batchProgressPercent.textContent = `${pct}%`;
      if (batchProgressLabel) batchProgressLabel.textContent = `Processing ${i + 1} of ${totalCount} (${pct}%)`;

      if (currentSendingName) currentSendingName.textContent = `${p.name} • ${p.event}`;
      if (currentSendingSub) currentSendingSub.textContent = p.email ? `Recipient: ${p.email}` : 'No email address specified';

      // Validate email
      const targetEmail = (p.email || '').trim();
      if (!targetEmail || !targetEmail.includes('@')) {
        skipped++;
        if (batchSkipCount) batchSkipCount.textContent = skipped;
        appendBatchLog(`⚠️ Skipped ${p.name} (No valid email address)`, 'warning');
        continue;
      }

      // Render high-res certificate on offscreen canvas
      drawCertificate(p.name, p.event, offCanvas);
      const dataUrl = offCanvas.toDataURL('image/jpeg', 0.95);

      appendBatchLog(`⚡ Sending certificate to ${p.name} (${targetEmail})...`, 'info');

      try {
        const res = await fetch('http://127.0.0.1:5000/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: targetEmail,
            name: p.name,
            event: p.event,
            signOff: signOffChoice,
            imageData: dataUrl
          })
        });

        const data = await res.json();
        if (data.success && data.smtp_sent) {
          delivered++;
          if (batchSuccessCount) batchSuccessCount.textContent = delivered;
          appendBatchLog(`✅ Delivered to ${p.name} (${targetEmail})`, 'success');
        } else if (data.success && !data.smtp_sent) {
          failed++;
          if (batchFailCount) batchFailCount.textContent = failed;
          appendBatchLog(`⚠️ Draft created for ${p.name}, but SMTP not sent: ${data.message}`, 'warning');
        } else {
          failed++;
          if (batchFailCount) batchFailCount.textContent = failed;
          appendBatchLog(`❌ Failed for ${p.name}: ${data.message || 'Unknown error'}`, 'error');
        }
      } catch (err) {
        failed++;
        if (batchFailCount) batchFailCount.textContent = failed;
        appendBatchLog(`❌ Network error for ${p.name}: ${err.message}`, 'error');
      }

      // Small pacing delay between emails to protect SMTP socket
      await new Promise(resolve => setTimeout(resolve, 350));
    }

    // Batch Finished
    isBatchRunning = false;
    isBatchPaused = false;
    if (batchProgressBar) batchProgressBar.style.width = '100%';
    if (batchProgressPercent) batchProgressPercent.textContent = '100%';
    if (batchProgressLabel) batchProgressLabel.textContent = `Completed! Delivered: ${delivered}, Failed: ${failed}, Skipped: ${skipped}`;
    if (batchFooterStatus) batchFooterStatus.textContent = '🎉 Batch dispatch complete!';
    if (btnPauseResumeBatch) btnPauseResumeBatch.style.display = 'none';
    if (btnCancelBatch) btnCancelBatch.style.display = 'none';
    if (btnCloseBatchDone) btnCloseBatchDone.style.display = 'inline-block';

    if (currentSendingName) currentSendingName.textContent = '🎉 All Done!';
    if (currentSendingSub) currentSendingSub.textContent = `Successfully processed all ${totalCount} participants.`;

    appendBatchLog(`🏁 Batch finished! Delivered: ${delivered} | Failed: ${failed} | Skipped: ${skipped}`, 'success');
    showToast(`🎉 Batch dispatch complete! Successfully delivered ${delivered} certificates.`);
  }

  // --- Modal Button Event Listeners ---
  if (btnPauseResumeBatch) {
    btnPauseResumeBatch.addEventListener('click', () => {
      isBatchPaused = !isBatchPaused;
      btnPauseResumeBatch.textContent = isBatchPaused ? '▶️ Resume' : '⏸️ Pause';
      if (batchFooterStatus) batchFooterStatus.textContent = isBatchPaused ? 'Paused.' : 'Sending...';
      appendBatchLog(isBatchPaused ? '⏸️ Dispatch paused by user.' : '▶️ Dispatch resumed.', 'info');
    });
  }

  if (btnCancelBatch) {
    btnCancelBatch.addEventListener('click', () => {
      if (confirm('Are you sure you want to stop the remaining emails?')) {
        batchCancelRequested = true;
      }
    });
  }

  if (btnCloseBatchDone) {
    btnCloseBatchDone.addEventListener('click', () => {
      if (batchEmailModal) batchEmailModal.style.display = 'none';
    });
  }

  if (btnCloseBatchModal) {
    btnCloseBatchModal.addEventListener('click', () => {
      if (isBatchRunning) {
        if (confirm('Batch is still sending. Are you sure you want to stop and close?')) {
          batchCancelRequested = true;
          if (batchEmailModal) batchEmailModal.style.display = 'none';
        }
      } else {
        if (batchEmailModal) batchEmailModal.style.display = 'none';
      }
    });
  }

  if (btnClearBatchLog) {
    btnClearBatchLog.addEventListener('click', () => {
      if (batchLogList) batchLogList.innerHTML = '';
    });
  }

  // --- SMTP Configuration Modal Handlers ---
  if (btnCloseSmtpModal) {
    btnCloseSmtpModal.addEventListener('click', () => {
      if (smtpConfigModal) smtpConfigModal.style.display = 'none';
    });
  }

  if (btnToggleAppPw) {
    btnToggleAppPw.addEventListener('click', () => {
      if (smtpAppPassword) {
        smtpAppPassword.type = smtpAppPassword.type === 'password' ? 'text' : 'password';
      }
    });
  }

  if (smtpConfigForm) {
    smtpConfigForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailVal = smtpSenderEmail ? smtpSenderEmail.value.trim() : '';
      const pwVal = smtpAppPassword ? smtpAppPassword.value.trim().replace(/\s+/g, '') : '';

      if (!emailVal || !pwVal) {
        alert('Please enter both your Gmail address and 16-character App Password.');
        return;
      }

      showToast('Saving Gmail SMTP settings...');
      try {
        const res = await fetch('http://127.0.0.1:5000/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender_email: emailVal,
            app_password: pwVal,
            sign_off: selectSignOff ? selectSignOff.value : 'principal'
          })
        });

        const data = await res.json();
        if (data.success) {
          showToast('✅ SMTP Credentials Saved!');
          serverState.configured = true;
          serverState.sender = emailVal;
          if (smtpConfigModal) smtpConfigModal.style.display = 'none';
          checkServerStatus();
          // Start the batch dispatch immediately!
          startBatchEmailDispatch();
        } else {
          alert(`Configuration notice: ${data.message || 'Could not save credentials.'}`);
        }
      } catch (err) {
        alert(`Server error: Could not save SMTP configuration.\nPlease ensure Start_Auto_Sender_Server.bat is running.`);
      }
    });
  }

  // --- Server Offline Modal Handlers ---
  if (btnCloseOfflineModal) {
    btnCloseOfflineModal.addEventListener('click', () => {
      if (serverOfflineModal) serverOfflineModal.style.display = 'none';
    });
  }

  if (btnRetryServerConnection) {
    btnRetryServerConnection.addEventListener('click', async () => {
      showToast('Checking connection to Start_Auto_Sender_Server.bat...');
      const status = await checkServerStatus();
      if (status.online) {
        showToast('🟢 Server is online!');
        if (serverOfflineModal) serverOfflineModal.style.display = 'none';
        startBatchEmailDispatch();
      } else {
        alert('Server is still not detected.\n\nPlease double-click "Start_Auto_Sender_Server.bat" in C:\\Certificate\\ and try again.');
      }
    });
  }

  // --- Attach Send All Emails Handlers ---
  if (btnSendAllEmailsTop) {
    btnSendAllEmailsTop.addEventListener('click', startBatchEmailDispatch);
  }
  if (btnSendAllEmails) {
    btnSendAllEmails.addEventListener('click', startBatchEmailDispatch);
  }
  if (btnSendAllFromTable) {
    btnSendAllFromTable.addEventListener('click', startBatchEmailDispatch);
  }

  // Load Demo Data Button (61 Battle Front Teams from Fest Sample!)
  btnLoadDemo.addEventListener('click', () => {
    rawSheetData = [
      { "event": "Battle Front", "name": "S Sudhir", "email": "o.help@gmail.com", "members": "S Sudhir | Tyuu | Rgghb | Rvhn" },
      { "event": "Battle Front", "name": "Shashank. M", "email": "shashank.m1457890@gmail.com", "members": "Shashank. M | Shobith | Sarman | Ishan" },
      { "event": "Battle Front", "name": "Shoaib Akhtar", "email": "shoaibakhtar9316@gmail.com", "members": "Shoaib Akhtar | Md shoub | Rakesh | Ashwin" },
      { "event": "Battle Front", "name": "Yuvaraj", "email": "yuviiiiiii.ammuu.1407@gmail.com", "members": "Yuvaraj | Pawan | Manish | Sahil" },
      { "event": "Battle Front", "name": "Pradeep", "email": "muniyamma77890@gmail.com", "members": "Pradeep | Ishan | Navadeep | Lalith" },
      { "event": "Battle Front", "name": "Adil khan", "email": "fariyadhussainkhan854@gmail.com", "members": "Adil khan | Krishna Prasad | Sahil | Akshay" },
      { "event": "Battle Front", "name": "Jatin N", "email": "jatinseervi99@gmail.com", "members": "Jatin N | Anuj Singh | Madhusudhan | Risheek" },
      { "event": "Battle Front", "name": "krishna Prasad", "email": "krishnsprasad14@gmail.com", "members": "krishna Prasad | Koushik r | Dushyanth | Manish gowda" },
      { "event": "Battle Front", "name": "Sudarshan N", "email": "nsudarshan138q@gmail.com", "members": "Sudarshan N | CHAITANYA REDDY | VENKATESH | YESHWANTH" },
      { "event": "Battle Front", "name": "Vishnu S", "email": "grvpucollege123@gmail.com", "members": "Vishnu S | Nitesh J | Abdul Zain | Mohammed Zubair" },
      { "event": "Battle Front", "name": "RUFUS KINGSLEY", "email": "rufuskingsley200823@gmail.com", "members": "RUFUS KINGSLEY | 1)NITYAM | 2)VIKAS GIRI | 3)NIRMAL" }
    ];
    setupColumnRecognition(rawSheetData);
    showToast('⚡ Loaded demo fest teams! Generating individual certificates for all members.');
  });

  // Manual Dispatch Buttons
  btnManualSendGmail.addEventListener('click', () => {
    const p = {
      name: inputName.value.trim() || 'Participant',
      event: selectEvent.value,
      email: manualEmail.value.trim()
    };
    dispatchGmailWithAttachment(p);
  });

  if (btnManualDownloadEml) {
    btnManualDownloadEml.addEventListener('click', () => {
      const p = {
        name: inputName.value.trim() || 'Participant',
        event: selectEvent.value,
        email: manualEmail.value.trim()
      };
      generateAndDownloadEml(p);
    });
  }

  // --- PRINTING & BATCH EXPORT ---

  // 1. PRINT ALL CERTIFICATES (Multi-page A4)
  async function printAllCertificates() {
    if (parsedParticipants.length === 0) {
      showToast('Please upload an Excel/CSV file or load demo participants first.');
      return;
    }

    const total = parsedParticipants.length;
    showToast(`Preparing ${total} certificates for printing...`);

    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;

    printBatchContainer.innerHTML = '';

    for (let i = 0; i < total; i++) {
      const p = parsedParticipants[i];
      drawCertificate(p.name, p.event, offCanvas);
      const imgDataUrl = offCanvas.toDataURL('image/jpeg', 0.94);

      const pageDiv = document.createElement('div');
      pageDiv.className = 'print-cert-page';
      const img = document.createElement('img');
      img.src = imgDataUrl;
      pageDiv.appendChild(img);
      printBatchContainer.appendChild(pageDiv);
    }

    document.body.classList.add('batch-printing');

    setTimeout(() => {
      window.print();
    }, 400);
  }

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('batch-printing');
    printBatchContainer.innerHTML = '';
  });

  btnPrintAll.addEventListener('click', printAllCertificates);
  btnPrintAllTop.addEventListener('click', printAllCertificates);

  // 2. PRINT CURRENT CERTIFICATE
  function printCurrentCertificate() {
    document.body.classList.remove('batch-printing');
    renderCurrentCertificate();
    window.print();
  }

  btnPrintCurrent.addEventListener('click', printCurrentCertificate);
  btnPrintCurrentTop.addEventListener('click', printCurrentCertificate);
  btnManualPrint.addEventListener('click', printCurrentCertificate);

  // 3. DOWNLOAD ALL AS ZIP
  async function downloadAllZip() {
    if (parsedParticipants.length === 0) {
      showToast('No participants to download. Please upload a file first.');
      return;
    }

    if (typeof JSZip === 'undefined') {
      showToast('⚠️ JSZip library loading, please wait...');
      return;
    }

    const total = parsedParticipants.length;
    showToast(`Generating ZIP package for ${total} certificates...`);

    const zip = new JSZip();
    const folder = zip.folder("AARAMBH_2K26_Certificates");

    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;

    for (let i = 0; i < total; i++) {
      const p = parsedParticipants[i];
      drawCertificate(p.name, p.event, offCanvas);

      const dataUrl = offCanvas.toDataURL('image/jpeg', 0.95);
      const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');

      const safeName = p.name.replace(/[^a-zA-Z0-9_-]/g, '_');
      const safeEvent = p.event.replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${String(i + 1).padStart(3, '0')}_Certificate_${safeName}_${safeEvent}.jpg`;

      folder.file(filename, base64Data, { base64: true });
    }

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `AARAMBH_2K26_Certificates_Batch_${total}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`🎉 Downloaded ZIP with ${total} certificates!`);
  }

  btnDownloadZip.addEventListener('click', downloadAllZip);

  // 4. DOWNLOAD SINGLE PNG
  function downloadSinglePng(customName, customEvent) {
    let nameVal = customName || (activeTab === 'upload' && parsedParticipants.length > 0 
      ? parsedParticipants[currentParticipantIndex].name 
      : inputName.value);

    let eventVal = customEvent || (activeTab === 'upload' && parsedParticipants.length > 0 
      ? parsedParticipants[currentParticipantIndex].event 
      : selectEvent.value);

    if (customName && customEvent) {
      drawCertificate(customName, customEvent);
    } else {
      renderCurrentCertificate();
    }

    const safeName = (nameVal || 'Participant').replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeEvent = (eventVal || 'Event').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Certificate_${safeName}_${safeEvent}.png`;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`✅ Downloaded: ${filename}`);
    } catch (e) {
      console.error(e);
      showToast('⚠️ Download failed due to browser security restrictions.');
    }
  }

  btnDownloadSinglePng.addEventListener('click', () => downloadSinglePng());
  btnDownloadTop.addEventListener('click', () => downloadSinglePng());
  btnManualDownloadPng.addEventListener('click', () => downloadSinglePng());

  // 5. DOWNLOAD PDF
  function downloadPdf() {
    renderCurrentCertificate();

    let nameVal = activeTab === 'upload' && parsedParticipants.length > 0 
      ? parsedParticipants[currentParticipantIndex].name 
      : inputName.value;

    let eventVal = activeTab === 'upload' && parsedParticipants.length > 0 
      ? parsedParticipants[currentParticipantIndex].event 
      : selectEvent.value;

    const safeName = (nameVal || 'Participant').replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeEvent = (eventVal || 'Event').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Certificate_${safeName}_${safeEvent}.pdf`;

    showToast('Generating high-resolution PDF...');

    canvas.toBlob((blob) => {
      if (!blob) {
        showToast('PDF creation failed');
        return;
      }
      const reader = new FileReader();
      reader.onload = function() {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        const pdfBytes = buildPdf(uint8Array, canvas.width, canvas.height);
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfBlob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`✅ Downloaded: ${filename}`);
      };
      reader.readAsArrayBuffer(blob);
    }, 'image/jpeg', 0.95);
  }

  btnManualDownloadPdf.addEventListener('click', downloadPdf);

  // --- Client-Side Pure PDF Builder ---
  function buildPdf(jpegBytes, width, height) {
    const pdfW = 842;
    const pdfH = 595;

    const header = "%PDF-1.4\n";
    const parts = [];
    const offsets = [];

    function addObj(str) {
      offsets.push(currentOffset);
      const enc = new TextEncoder();
      const b = enc.encode(str);
      parts.push(b);
      currentOffset += b.length;
    }

    let currentOffset = header.length;

    addObj("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
    addObj("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
    addObj("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + pdfW + " " + pdfH + "] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n");

    offsets.push(currentOffset);
    const imgHead = new TextEncoder().encode("4 0 obj\n<< /Type /XObject /Subtype /Image /Width " + width + " /Height " + height + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + jpegBytes.length + " >>\nstream\n");
    const imgFoot = new TextEncoder().encode("\nendstream\nendobj\n");

    parts.push(imgHead);
    parts.push(jpegBytes);
    parts.push(imgFoot);
    currentOffset += imgHead.length + jpegBytes.length + imgFoot.length;

    const contentStream = "q " + pdfW + " 0 0 " + pdfH + " 0 0 cm /Im0 Do Q\n";
    addObj("5 0 obj\n<< /Length " + contentStream.length + " >>\nstream\n" + contentStream + "endstream\nendobj\n");

    const startXref = currentOffset;
    let xref = "xref\n0 6\n0000000000 65535 f \n";
    for (let i = 0; i < offsets.length; i++) {
      xref += String(offsets[i]).padStart(10, '0') + " 00000 n \n";
    }
    xref += "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + startXref + "\n%%EOF\n";
    parts.push(new TextEncoder().encode(xref));

    const totalLen = header.length + parts.reduce((acc, p) => acc + p.length, 0);
    const finalBuf = new Uint8Array(totalLen);
    finalBuf.set(new TextEncoder().encode(header), 0);
    let pos = header.length;
    for (let p of parts) {
      finalBuf.set(p, pos);
      pos += p.length;
    }
    return finalBuf;
  }

  // --- Manual Mode Listeners ---
  inputName.addEventListener('input', renderCurrentCertificate);

  btnCaseToggle.addEventListener('click', () => {
    isUpperCase = !isUpperCase;
    btnCaseToggle.classList.toggle('active', isUpperCase);
    renderCurrentCertificate();
  });

  selectEvent.addEventListener('change', (e) => {
    updatePills(e.target.value);
    renderCurrentCertificate();
  });

  eventPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const selected = pill.getAttribute('data-event');
      selectEvent.value = selected;
      updatePills(selected);
      renderCurrentCertificate();
    });
  });

  function updatePills(activeEvent) {
    eventPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-event') === activeEvent);
    });
  }

  // --- Font & Sliders Listeners ---
  selectFont.addEventListener('change', renderCurrentCertificate);

  sliderNameSize.addEventListener('input', (e) => {
    valNameSize.textContent = `${e.target.value}px`;
    renderCurrentCertificate();
  });

  sliderNameY.addEventListener('input', (e) => {
    valNameY.textContent = `${e.target.value > 0 ? '+' : ''}${e.target.value}px`;
    renderCurrentCertificate();
  });

  sliderEventSize.addEventListener('input', (e) => {
    valEventSize.textContent = `${e.target.value}px`;
    renderCurrentCertificate();
  });

  sliderEventY.addEventListener('input', (e) => {
    valEventY.textContent = `${e.target.value > 0 ? '+' : ''}${e.target.value}px`;
    renderCurrentCertificate();
  });

  btnResetAlignment.addEventListener('click', () => {
    sliderNameSize.value = 64;
    valNameSize.textContent = '64px';
    sliderNameY.value = 0;
    valNameY.textContent = '0px';

    sliderEventSize.value = 46;
    valEventSize.textContent = '46px';
    sliderEventY.value = 0;
    valEventY.textContent = '0px';

    renderCurrentCertificate();
    showToast('Alignment reset to official defaults');
  });

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      currentColor = swatch.getAttribute('data-color');
      customColorPicker.value = currentColor;
      renderCurrentCertificate();
    });
  });

  customColorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    colorSwatches.forEach(s => s.classList.remove('active'));
    renderCurrentCertificate();
  });

  // --- Zoom Controls ---
  btnZoomIn.addEventListener('click', () => {
    zoomLevel = Math.min(zoomLevel + 0.15, 2.0);
    applyZoom();
  });

  btnZoomOut.addEventListener('click', () => {
    zoomLevel = Math.max(zoomLevel - 0.15, 0.5);
    applyZoom();
  });

  btnZoomReset.addEventListener('click', () => {
    zoomLevel = 1.0;
    applyZoom();
  });

  function applyZoom() {
    canvasWrapper.style.transform = `scale(${zoomLevel})`;
  }

  btnFullscreen.addEventListener('click', () => {
    const viewport = document.getElementById('viewport');
    if (!document.fullscreenElement) {
      viewport.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  });

  // --- Tabs Toggle ---
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeTab = btn.getAttribute('data-tab');
      if (activeTab === 'upload') {
        tabUpload.classList.add('active');
        tabManual.classList.remove('active');
      } else {
        tabUpload.classList.remove('active');
        tabManual.classList.add('active');
      }
      renderCurrentCertificate();
    });
  });

  // --- Toast Helper ---
  let toastTimer = null;
  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
