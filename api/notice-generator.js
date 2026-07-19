// ============================================================
// NOTICE-GENERATOR.JS - Legal Notice Generator
// ============================================================

// Generate legal notice
function generateNotice() {
    const sender = document.getElementById('notice-sender');
    const receiver = document.getElementById('notice-receiver');
    const subject = document.getElementById('notice-subject');
    const desc = document.getElementById('notice-description');
    const container = document.getElementById('notice-preview-container');
    const preview = document.getElementById('notice-preview');
    
    if (!sender || !receiver || !subject || !desc || !container || !preview) return;
    
    const senderVal = sender.value.trim();
    const receiverVal = receiver.value.trim();
    const subjectVal = subject.value.trim();
    const descVal = desc.value.trim();
    
    if (!senderVal || !receiverVal || !subjectVal || !descVal) {
        alert('⚠️ सभी fields भरें।');
        return;
    }
    
    const notice = `═══════════════════════════════════════════════════
LEGAL NOTICE
═══════════════════════════════════════════════════
DATE: ${new Date().toLocaleDateString()}
FROM: ${senderVal}
TO: ${receiverVal}
SUBJECT: ${subjectVal}

${descVal}

═══════════════════════════════════════════════════
⚠️ Draft - Consult lawyer before sending.
`;
    
    container.classList.remove('hidden');
    preview.textContent = notice;
}

// Save notice
function saveNotice() {
    const preview = document.getElementById('notice-preview');
    if (!preview) return;
    
    const content = preview.textContent;
    if (!content || content.includes('Draft - Consult lawyer')) {
        alert('⚠️ Generate a notice first');
        return;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'legal-notice-' + new Date().toISOString().split('T')[0] + '.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Clear notice
function clearNotice() {
    const sender = document.getElementById('notice-sender');
    const receiver = document.getElementById('notice-receiver');
    const subject = document.getElementById('notice-subject');
    const desc = document.getElementById('notice-description');
    const container = document.getElementById('notice-preview-container');
    const preview = document.getElementById('notice-preview');
    
    if (sender) sender.value = '';
    if (receiver) receiver.value = '';
    if (subject) subject.value = '';
    if (desc) desc.value = '';
    if (container) container.classList.add('hidden');
    if (preview) preview.textContent = '';
}
