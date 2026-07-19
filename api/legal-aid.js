// ============================================================
// LEGAL-AID.JS - Legal Aid Camps
// ============================================================

// Legal Aid Camps Data
const legalCamps = [
    { date: '25 Feb 2026', loc: 'Ward 12, Alambagh', topic: 'BNS Awareness', contact: '15100' },
    { date: '02 Mar 2026', loc: 'Ward 45, Gomti Nagar', topic: 'Women Rights', contact: '181' },
    { date: '10 Mar 2026', loc: 'Ward 78, Indira Nagar', topic: 'Cyber Safety', contact: '1930' },
    { date: '18 Mar 2026', loc: 'Ward 34, Hazratganj', topic: 'Property Law', contact: '15100' },
    { date: '25 Mar 2026', loc: 'Ward 56, Chowk', topic: 'Consumer Rights', contact: '1915' },
    { date: '01 Apr 2026', loc: 'Ward 12, Alambagh', topic: 'Family Law', contact: '15100' },
    { date: '08 Apr 2026', loc: 'Ward 45, Gomti Nagar', topic: 'Criminal Law', contact: '100' },
    { date: '15 Apr 2026', loc: 'Ward 78, Indira Nagar', topic: 'RTI Workshop', contact: '15100' }
];

// Load camps
function loadCamps() {
    const list = document.getElementById('camps-list');
    if (!list) return;
    list.innerHTML = '';
    legalCamps.forEach(c => {
        list.innerHTML += `
            <div class="camp-row text-sm">
                <span>📅 ${c.date}</span>
                <span>📍 ${c.loc}</span>
                <span>${c.topic} <span class="text-green-400">(${c.contact})</span></span>
            </div>
        `;
    });
}

// Get upcoming camps
function getUpcomingCamps() {
    const today = new Date();
    return legalCamps.filter(c => new Date(c.date) >= today);
}

// Register for camp
function registerForCamp(campDate, campLoc) {
    alert('✅ Registration successful for camp on ' + campDate + ' at ' + campLoc);
}
