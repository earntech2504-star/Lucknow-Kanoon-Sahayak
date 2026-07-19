// ============================================================
// PDF-UPLOAD.JS - PDF Upload, OCR & Document Analysis
// ============================================================

let uploadedFiles = [];
let uploadHistory = JSON.parse(localStorage.getItem('uploadHistory') || '[]');

// Handle file selection
function handleFiles(files) {
    const fileList = document.getElementById('fileList');
    const dropZone = document.getElementById('dropZone');
    
    if (!files || files.length === 0) return;
    
    dropZone.querySelector('p').textContent = files.length + ' file(s) selected';
    
    for (let file of files) {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showFileStatus(file.name, 'error', 'File too large (max 10MB)');
            continue;
        }
        
        // Check file type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.jpg') && !file.name.endsWith('.jpeg') && !file.name.endsWith('.png') && !file.name.endsWith('.docx')) {
            showFileStatus(file.name, 'error', 'Unsupported file type');
            continue;
        }
        
        uploadedFiles.push(file);
        showFileStatus(file.name, 'uploaded', 'Uploaded');
        processFile(file);
    }
    
    renderFileList();
}

// Show file status
function showFileStatus(name, status, message) {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    let existingItem = fileList.querySelector(`[data-file="${name}"]`);
    
    if (!existingItem) {
        const item = document.createElement('div');
        item.className = 'file-list-item';
        item.dataset.file = name;
        item.innerHTML = `
            <div>
                <div class="file-name">${name}</div>
                <div class="file-size">${status === 'uploaded' ? '✅ Ready' : '⏳ Processing...'}</div>
            </div>
            <div class="file-status ${status}">${message}</div>
        `;
        fileList.appendChild(item);
    } else {
        const statusDiv = existingItem.querySelector('.file-status');
        statusDiv.className = `file-status ${status}`;
        statusDiv.textContent = message;
        const sizeDiv = existingItem.querySelector('.file-size');
        sizeDiv.textContent = status === 'uploaded' ? '✅ Ready' : '⏳ Processing...';
    }
}

// Render file list
function renderFileList() {
    // Keep existing items
}

// Process file
async function processFile(file) {
    const resultDiv = document.getElementById('analysisResult');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<div class="text-center py-8"><div class="loading-spinner"></div><p class="text-sm text-slate-400 mt-2">🔍 Analyzing document...</p></div>';
    
    try {
        let text = '';
        
        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
            text = await extractPDFText(file);
        } else if (file.type.startsWith('image/') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png')) {
            text = await extractImageText(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) {
            text = await extractDOCXText(file);
        } else {
            text = await file.text();
        }
        
        await analyzeDocumentText(text, file.name);
        addToHistory(file.name, text.substring(0, 200));
        
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="text-red-400 text-sm">
                ❌ Error processing file: ${error.message}
                <br><span class="text-xs text-slate-400">Please try uploading again or paste text manually.</span>
            </div>
        `;
        showFileStatus(file.name, 'error', 'Error');
    }
}

// Extract text from PDF
async function extractPDFText(file) {
    try {
        if (typeof pdfjsLib === 'undefined') {
            return 'PDF.js library not loaded. Please check your internet connection.';
        }
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            text += pageText + '\n';
        }
        return text || 'No text found in PDF. It may be scanned. Try OCR.';
    } catch (e) {
        console.error('PDF extraction error:', e);
        return 'Could not extract text from PDF. The document may be scanned or protected.';
    }
}

// Extract text from Image
async function extractImageText(file) {
    try {
        if (typeof Tesseract === 'undefined') {
            return 'Tesseract.js not loaded. Please check your internet connection.';
        }
        const imageUrl = URL.createObjectURL(file);
        const result = await Tesseract.recognize(imageUrl, 'hin+eng');
        URL.revokeObjectURL(imageUrl);
        return result.data.text || 'No text found in image.';
    } catch (e) {
        console.error('OCR error:', e);
        return 'Could not extract text from image. Please try a clearer image.';
    }
}

// Extract text from DOCX
async function extractDOCXText(file) {
    try {
        const text = await file.text();
        const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        return cleanText || 'Could not extract text from DOCX.';
    } catch (e) {
        console.error('DOCX extraction error:', e);
        return 'Could not extract text from DOCX.';
    }
}

// Analyze document text
async function analyzeDocumentText(text, filename) {
    const resultDiv = document.getElementById('analysisResult');
    if (!resultDiv) return;
    
    if (!text || text.length < 10) {
        resultDiv.innerHTML = `
            <div class="text-yellow-400 text-sm">
                ⚠️ No text could be extracted from this document.
                <br><span class="text-xs text-slate-400">Try uploading a clearer image or PDF with selectable text.</span>
            </div>
        `;
        return;
    }
    
    // Legal keywords detection
    const keywords = {
        fir: ['fir', 'first information report', 'police', 'crime', 'complaint', 'शिकायत', 'एफआईआर', 'पुलिस'],
        bail: ['bail', 'release', 'surety', 'bond', 'जमानत', 'रिहाई', 'जमीन'],
        cheating: ['cheating', 'fraud', 'deception', 'dishonest', 'धोखा', 'छल', 'फर्जी'],
        property: ['property', 'land', 'house', 'owner', 'deed', 'जायदाद', 'जमीन', 'मकान', 'संपत्ति'],
        murder: ['murder', 'kill', 'death', 'homicide', 'हत्या', 'कत्ल', 'मौत'],
        rape: ['rape', 'assault', 'sexual', 'consent', 'बलात्कार', 'यौन', 'हमला'],
        maintenance: ['maintenance', 'support', 'alimony', 'wife', 'children', 'भरण-पोषण', 'गुजारा', 'पत्नी'],
        cyber: ['cyber', 'online', 'fraud', 'hacking', 'data', 'साइबर', 'हैकिंग', 'ऑनलाइन'],
        theft: ['theft', 'stolen', 'robbery', 'property', 'चोरी', 'लूट', 'संपत्ति'],
        defamation: ['defamation', 'character', 'reputation', 'libel', 'मानहानि', 'बदनामी'],
        domestic: ['domestic', 'violence', 'abuse', 'dowry', 'घरेलू', 'हिंसा', 'दहेज']
    };
    
    let foundCategories = [];
    
    for (const [category, words] of Object.entries(keywords)) {
        for (const word of words) {
            if (text.toLowerCase().includes(word.toLowerCase())) {
                foundCategories.push(category);
                break;
            }
        }
    }
    
    const sectionMap = {
        fir: 'BNSS 173 (FIR) - First Information Report',
        bail: 'BNSS 480 (Regular Bail) or BNSS 482 (Anticipatory Bail)',
        cheating: 'BNS 318 (Cheating) - 7 years imprisonment',
        property: 'BNS 303 (Theft) or Property Laws',
        murder: 'BNS 103 (Murder) - Death or Life Imprisonment',
        rape: 'BNS 64 (Rape) - 10 years to Life Imprisonment',
        maintenance: 'BNSS 144 (Maintenance) - Family Court',
        cyber: 'IT Act 2000 + BNS 318 (Fraud)',
        theft: 'BNS 303 (Theft) - 3 years imprisonment',
        defamation: 'BNS 356 (Defamation) - 2 years imprisonment',
        domestic: 'BNS 85 (Cruelty) + DV Act 2005'
    };
    
    const adviceMap = {
        fir: 'FIR BNSS 173 ke tahat darj karein. Police FIR nahi likh rahi toh Magistrate (BNSS 175) ke paas jayein.',
        bail: 'Anticipatory bail (BNSS 482) ya regular bail (BNSS 480) ke liye apply karein. Lawyer se consult karein.',
        cheating: 'BNS 318 ke tahat FIR darj karein. Sabhi transactions aur messages save karein.',
        property: 'Revenue Court mein SDM se stay len. Civil Court mein title suit file karein.',
        murder: 'BNS 103 ke tahat FIR darj karein. Sessions Court mein trial hoga.',
        rape: 'BNS 64 ke tahat FIR darj karein. Medical examination karayein.',
        maintenance: 'BNSS 144 ke tahat Family Court mein application file karein.',
        cyber: '1930 par call karein. Cybercrime.gov.in par complaint file karein.',
        theft: 'BNS 303 ke tahat FIR darj karein. Police investigation ke liye follow-up karein.',
        defamation: 'BNS 356 ke tahat Magistrate Court mein complaint file karein.',
        domestic: '181 par call karein. DV Act 2005 ke tahat complaint file karein.'
    };
    
    let html = `<div class="analysis-result">
        <div class="result-title">📄 Document Analysis: ${filename}</div>
        <div class="result-content">
            <div class="text-sm text-slate-400 mb-2">📊 Extracted Text Preview:</div>
            <div class="text-xs text-slate-400 bg-slate-900/30 p-2 rounded mb-3 max-h-[100px] overflow-y-auto">${text.substring(0, 500)}${text.length > 500 ? '...' : ''}</div>
    `;
    
    if (foundCategories.length > 0) {
        html += `<div class="text-green-400 font-semibold mb-2">✅ Detected Legal Categories:</div>
        <div class="flex flex-wrap gap-1 mb-3">`;
        const emojiMap = {
            fir: '🚨', bail: '⛓️', cheating: '⛓️', property: '🏠',
            murder: '⚖️', rape: '⚠️', maintenance: '🏠', cyber: '💻',
            theft: '🔑', defamation: '📰', domestic: '🛡️'
        };
        foundCategories.forEach(cat => {
            html += `<span class="filter-pill active">${emojiMap[cat] || '📌'} ${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`;
        });
        html += `</div>`;
        
        html += `<div class="text-blue-400 font-semibold mb-2">📜 Relevant Sections:</div>
        <ul class="list-disc pl-4 text-sm space-y-1">`;
        foundCategories.forEach(cat => {
            if (sectionMap[cat]) {
                html += `<li>⚖️ ${sectionMap[cat]}</li>`;
            }
        });
        html += `</ul>`;
        
        html += `<div class="text-amber-400 font-semibold mt-3 mb-2">💡 Legal Advice:</div>
        <div class="text-sm text-slate-300">`;
        foundCategories.forEach(cat => {
            html += `<div class="mb-1">• ${adviceMap[cat] || 'Consult a lawyer for proper legal advice.'}</div>`;
        });
        html += `</div>`;
        
        html += `<div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ Disclaimer: This is AI-generated analysis for educational purposes only. Consult a qualified lawyer for legal advice.</div>`;
    } else {
        html += `<div class="text-yellow-400 text-sm">⚠️ No specific legal categories detected in this document.</div>
        <div class="text-slate-400 text-xs mt-2">Try uploading a legal document like FIR, Bail Application, Court Order, or Legal Notice.</div>
        <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ Disclaimer: This is AI-generated analysis for educational purposes only.</div>`;
    }
    
    html += `</div></div>`;
    resultDiv.innerHTML = html;
    showFileStatus(filename, 'resolved', 'Analyzed ✅');
}

// Quick scan
function quickScan(topic) {
    const text = document.getElementById('manualText');
    if (!text) return;
    const templates = {
        fir: 'Police is not registering my FIR. I want to file a complaint about a crime that happened yesterday.',
        bail: 'I was arrested for cheating. How can I get bail? I have a good character and no previous records.',
        property: 'There is a property dispute in my family. My brother is trying to sell ancestral property without my consent.',
        cyber: 'I lost money in an online fraud. The scammer took ₹50,000 from my bank account.',
        maintenance: 'My husband left me. I have two children. How can I get maintenance from him?'
    };
    if (templates[topic]) {
        text.value = templates[topic];
        analyzeManualText();
    }
}

// Analyze manual text
async function analyzeManualText() {
    const text = document.getElementById('manualText');
    if (!text) return;
    const content = text.value.trim();
    if (!content) {
        const result = document.getElementById('analysisResult');
        if (result) result.innerHTML = '<div class="text-yellow-400 text-sm text-center py-8">⚠️ Please enter some text to analyze.</div>';
        return;
    }
    await analyzeDocumentText(content, 'Manual Text Input');
    addToHistory('Manual Text', content.substring(0, 200));
}

// Add to history
function addToHistory(name, preview) {
    const historyItem = {
        id: Date.now(),
        name: name,
        preview: preview,
        date: new Date().toISOString()
    };
    uploadHistory.unshift(historyItem);
    if (uploadHistory.length > 20) uploadHistory.pop();
    localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
    renderUploadHistory();
}

// Render upload history
function renderUploadHistory() {
    const container = document.getElementById('uploadHistory');
    if (!container) return;
    if (uploadHistory.length === 0) {
        container.innerHTML = '<div class="text-slate-400 text-sm text-center py-4">No uploads yet</div>';
        return;
    }
    container.innerHTML = '';
    uploadHistory.slice(0, 10).forEach(item => {
        const div = document.createElement('div');
        div.className = 'text-xs text-slate-300 p-1 border-b border-slate-700 flex justify-between';
        div.innerHTML = `
            <span>📄 ${item.name}</span>
            <span class="text-slate-500">${new Date(item.date).toLocaleDateString()}</span>
        `;
        div.title = item.preview;
        container.appendChild(div);
    });
}

// Clear analysis
function clearAnalysis() {
    const result = document.getElementById('analysisResult');
    if (result) {
        result.innerHTML = `
            <div class="text-slate-400 text-sm text-center py-8">
                📌 Upload a document or paste text to get AI analysis<br>
                <span class="text-xs">Zeenat will analyze and provide legal solution</span>
            </div>
        `;
    }
    const text = document.getElementById('manualText');
    if (text) text.value = '';
    const fileList = document.getElementById('fileList');
    if (fileList) fileList.innerHTML = '';
    const dropZone = document.getElementById('dropZone');
    if (dropZone) dropZone.querySelector('p').textContent = 'Click or drag & drop to upload';
    uploadedFiles = [];
}

// Initialize PDF upload
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    if (dropZone) {
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        dropZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFiles(files);
            }
        });
    }
    renderUploadHistory();
});
