// ============================================================
// POST-FIR.JS - Post-FIR Guide
// ============================================================

// Post-FIR steps
const postFIRSteps = {
    '0-24': {
        title: '0-24 घंटे',
        steps: [
            'FIR certified copy लें',
            'Details check करें (Section, Date, Time)',
            'गवाहों के नाम नोट करें',
            'सबूत सुरक्षित रखें (Photos, Documents, Messages)',
            'Medical report lein (agar injury ho)',
            'Police से contact details lein (IO Name, Phone)'
        ],
        color: 'green'
    },
    '24-72': {
        title: '24-72 घंटे',
        steps: [
            'IO (Investigating Officer) से contact करें',
            'Statement दें (Written + Oral)',
            'Witness statements लें (Written)',
            'Advocate से बात करें',
            'Bail application file karein (agar needed)',
            'Case diary maintain karein'
        ],
        color: 'blue'
    },
    '72+': {
        title: '72+ घंटे',
        steps: [
            'Charge sheet file hone tak follow-up karein',
            'Court dates track karein',
            'Evidence collection continue karein',
            'Anticipatory bail (agar not arrested yet)',
            'Case status check karein (eCourts)',
            'Next hearing date note karein'
        ],
        color: 'purple'
    }
};

// Load post-FIR guide
function loadPostFIR() {
    const container = document.getElementById('post-fir-container');
    if (!container) return;
    container.innerHTML = '';
    for (const [key, value] of Object.entries(postFIRSteps)) {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl';
        div.style.background = `rgba(${key === '0-24' ? '34,197,94' : key === '24-72' ? '59,130,246' : '139,92,246'}, 0.1)`;
        div.innerHTML = `
            <h4 class="font-bold text-base" style="color: ${key === '0-24' ? '#86efac' : key === '24-72' ? '#93c5fd' : '#a78bfa'}">
                ${value.title}
            </h4>
            <ul class="text-xs list-disc pl-4 mt-1">${value.steps.map(step => `<li>${step}</li>`).join('')}</ul>
        `;
        container.appendChild(div);
    }
}

// Get post-FIR step by time
function getPostFIRStep(hours) {
    if (hours <= 24) return postFIRSteps['0-24'];
    if (hours <= 72) return postFIRSteps['24-72'];
    return postFIRSteps['72+'];
}
