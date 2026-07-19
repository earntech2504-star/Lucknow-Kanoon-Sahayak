// ============================================================
// LANDMARK.JS - Landmark Judgments
// ============================================================

// Landmark Judgments Data
const landmarkJudgments = [
    { title: 'Kesavananda Bharati v. State of Kerala (1973)', desc: 'Basic Structure Doctrine - Parliament cannot alter fundamental structure of Constitution', year: 1973, court: 'Supreme Court' },
    { title: 'Vishakha v. State of Rajasthan (1997)', desc: 'Sexual Harassment at Workplace - Guidelines for prevention', year: 1997, court: 'Supreme Court' },
    { title: 'Lalita Kumari v. UOI (2014)', desc: 'FIR mandatory for cognizable offences - Police cannot refuse', year: 2014, court: 'Supreme Court' },
    { title: 'Nirbhaya Case (2017)', desc: 'Death penalty for gang rape - Fast track trial precedent', year: 2017, court: 'Supreme Court' },
    { title: 'Satender Kumar Antil v. CBI (2022)', desc: '"Bail is rule, jail is exception" - Guidelines for bail', year: 2022, court: 'Supreme Court' },
    { title: 'Rajnesh v. Neha (2021)', desc: 'Maintenance guidelines for wife - Uniform maintenance formula', year: 2021, court: 'Supreme Court' },
    { title: 'K.M. Nanavati v. State (1962)', desc: 'Landmark murder case - Jury trial precedent', year: 1962, court: 'Supreme Court' },
    { title: 'Bachan Singh v. State (1980)', desc: 'Death penalty guidelines - Rarest of rare cases', year: 1980, court: 'Supreme Court' },
    { title: 'Gurbaksh Singh Sibbia v. State (1980)', desc: 'Anticipatory bail guidelines - BNSS 482', year: 1980, court: 'Supreme Court' },
    { title: 'Arjun Panditrao Khotkar v. State (2020)', desc: 'Electronic evidence - BSA 63 / Evidence 65B guidelines', year: 2020, court: 'Supreme Court' },
    { title: 'Subramanian Swamy v. UOI (2016)', desc: 'Defamation law - BNS 356 / IPC 499 constitutional validity', year: 2016, court: 'Supreme Court' },
    { title: 'State v. Mukesh (2017)', desc: 'Fast track trial - Nirbhaya case conviction', year: 2017, court: 'Supreme Court' }
];

// Load landmark judgments
function loadLandmark() {
    const container = document.getElementById('landmark-container');
    if (!container) return;
    container.innerHTML = '';
    landmarkJudgments.forEach(j => {
        const div = document.createElement('div');
        div.className = 'glass-card p-3 rounded-xl';
        div.innerHTML = `
            <div><b>🏛️ ${j.title}</b></div>
            <div class="text-xs text-slate-300 mt-1">${j.desc}</div>
            <div class="text-xs text-slate-500 mt-1">📅 ${j.year} · ${j.court}</div>
        `;
        container.appendChild(div);
    });
}

// Search landmark judgments
function searchLandmark(query) {
    const container = document.getElementById('landmark-container');
    if (!container) return;
    const q = query.toLowerCase().trim();
    const results = q ? landmarkJudgments.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.desc.toLowerCase().includes(q)
    ) : landmarkJudgments;
    container.innerHTML = '';
    results.forEach(j => {
        const div = document.createElement('div');
        div.className = 'glass-card p-3 rounded-xl';
        div.innerHTML = `
            <div><b>🏛️ ${j.title}</b></div>
            <div class="text-xs text-slate-300 mt-1">${j.desc}</div>
            <div class="text-xs text-slate-500 mt-1">📅 ${j.year} · ${j.court}</div>
        `;
        container.appendChild(div);
    });
}
