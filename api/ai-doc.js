// ============================================================
// AI-DOC.JS - AI Document Generator
// ============================================================

// Generate document
function generateDocumentFromUI() {
    const type = document.getElementById('doc-type');
    const details = document.getElementById('doc-details');
    const output = document.getElementById('doc-output');
    const preview = document.getElementById('doc-preview');
    
    if (!type || !details || !output || !preview) return;
    
    const typeVal = type.value;
    const detailsVal = details.value.trim();
    
    if (!detailsVal) {
        alert('⚠️ कृपया Case Details भरें।');
        return;
    }
    
    const doc = generateDocument(typeVal, detailsVal);
    output.classList.remove('hidden');
    preview.textContent = doc;
}

// Generate document based on type
function generateDocument(type, details) {
    const templates = {
        fir: `FIR APPLICATION
═══════════════════════════════════════════════════
IN THE COURT OF LUCKNOW
FIR No: _______________
Date: ${new Date().toLocaleDateString()}

COMPLAINANT DETAILS:
${details}

═══════════════════════════════════════════════════
OFFENCE DETAILS:
Under Section: BNS / BNSS

═══════════════════════════════════════════════════
STATEMENT OF COMPLAINANT:
I, the above-named complainant, state that...

═══════════════════════════════════════════════════
DATE: ${new Date().toLocaleDateString()}
SIGNATURE: _______________

⚠️ This is a draft. Consult a lawyer before filing.`,

        bail: `BAIL APPLICATION
═══════════════════════════════════════════════════
IN THE COURT OF LUCKNOW
Case No: _______________
Date: ${new Date().toLocaleDateString()}

APPLICANT DETAILS:
${details}

═══════════════════════════════════════════════════
UNDER SECTION:
BNSS 480 (Regular Bail) / BNSS 482 (Anticipatory Bail)

═══════════════════════════════════════════════════
GROUNDS FOR BAIL:
1. The applicant has not committed any offence.
2. The applicant is ready to furnish surety.
3. The applicant will not tamper with evidence.

═══════════════════════════════════════════════════
DATE: ${new Date().toLocaleDateString()}
ADVOCATE: _______________

⚠️ This is a draft. Consult a lawyer before filing.`,

        maintenance: `MAINTENANCE APPLICATION
═══════════════════════════════════════════════════
IN THE FAMILY COURT, LUCKNOW
Case No: _______________
Date: ${new Date().toLocaleDateString()}

APPLICANT DETAILS:
${details}

═══════════════════════════════════════════════════
UNDER SECTION:
BNSS 144 (Maintenance)

═══════════════════════════════════════════════════
RELIEF SOUGHT:
1. Monthly maintenance amount
2. Litigation expenses
3. Any other relief deemed fit

═══════════════════════════════════════════════════
DATE: ${new Date().toLocaleDateString()}
APPLICANT: _______________

⚠️ This is a draft. Consult a lawyer before filing.`,

        'legal-notice': `LEGAL NOTICE
═══════════════════════════════════════════════════
DATE: ${new Date().toLocaleDateString()}
FROM: _______________
TO: _______________

SUBJECT: Legal Notice

${details}

═══════════════════════════════════════════════════
YOU ARE HEREBY REQUIRED TO:
1. Respond within 15 days
2. Comply with the demands
3. Failing which legal action will be taken

═══════════════════════════════════════════════════
DATE: ${new Date().toLocaleDateString()}
ADVOCATE: _______________

⚠️ This is a draft. Consult a lawyer before sending.`
    };
    
    return templates[type] || templates['fir'];
}
