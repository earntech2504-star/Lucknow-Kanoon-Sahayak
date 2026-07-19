// ============================================================
// EXAM-PREP.JS - Exam Preparation
// ============================================================

// Exam topics
const examTopics = [
    { title: 'BNS Important Sections', items: [
        'BNS 318 - Cheating (Replaces IPC 420) - 7 years',
        'BNS 103 - Murder (Replaces IPC 302) - Death/Life',
        'BNS 64 - Rape (Replaces IPC 375) - 10 years to Life',
        'BNS 85 - Cruelty (Replaces IPC 498A) - 3 years',
        'BNS 303 - Theft (Replaces IPC 379) - 3 years',
        'BNS 356 - Defamation (Replaces IPC 499) - 2 years'
    ]},
    { title: 'BNSS Important Sections', items: [
        'BNSS 173 - FIR (Replaces CrPC 154)',
        'BNSS 480 - Regular Bail (Replaces CrPC 437)',
        'BNSS 482 - Anticipatory Bail (Replaces CrPC 438)',
        'BNSS 144 - Maintenance (Replaces CrPC 125)',
        'BNSS 193 - Charge Sheet (Replaces CrPC 173)'
    ]},
    { title: 'BSA Important Sections', items: [
        'BSA 63 - Electronic Evidence (Replaces Evidence 65B)'
    ]},
    { title: 'Important Dates', items: [
        '1 July 2024 - New criminal laws came into effect',
        '11 August 2023 - BNS/BNSS/BSA passed in Parliament',
        '25 December 2023 - President\'s assent'
    ]},
    { title: 'Memory Tricks', items: [
        'BNS 318 = 3+1+8=12 → 7 years (Cheating)',
        'BNSS 173 = 1+7+3=11 → FIR',
        'BNSS 480 = 4+8+0=12 → Regular Bail',
        'BNSS 482 = 4+8+2=14 → Anticipatory Bail',
        'BNS 103 = 1+0+3=4 → Murder (Death/Life)',
        'BNS 85 = 8+5=13 → 3 years (Cruelty)',
        'BNSS 144 = 1+4+4=9 → Maintenance'
    ]}
];

// Load exam prep
function loadExamPrep() {
    const container = document.getElementById('exam-prep-container');
    if (!container) return;
    container.innerHTML = '';
    examTopics.forEach(topic => {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl';
        div.style.background = 'rgba(255,255,255,0.05)';
        div.innerHTML = `
            <h4 class="font-bold text-base text-orange-400">📚 ${topic.title}</h4>
            <ul class="text-xs space-y-1 list-disc pl-4 mt-1">${topic.items.map(item => `<li>${item}</li>`).join('')}</ul>
        `;
        container.appendChild(div);
    });
}

// Get exam notes
function getExamNotes() {
    return examTopics;
}
