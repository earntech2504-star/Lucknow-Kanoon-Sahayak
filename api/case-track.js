// ============================================================
// CASE-TRACK.JS - Case Track
// ============================================================

// Case tracking data
const caseTrackData = [
    { court: 'Supreme Court', url: 'https://www.sci.gov.in', icon: '🏛️' },
    { court: 'Allahabad HC - Lucknow', url: 'https://www.allahabadhighcourt.in', icon: '⚖️' },
    { court: 'eCourts Portal', url: 'https://ecourts.gov.in', icon: '💻' },
    { court: 'District Court', url: 'https://ecourts.gov.in/lucknow', icon: '⚖️' }
];

// Load case track
function loadCaseTrack() {
    const container = document.getElementById('case-track-container');
    if (!container) return;
    container.innerHTML = '';
    caseTrackData.forEach(c => {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl';
        div.style.background = 'rgba(255,255,255,0.05)';
        div.innerHTML = `
            <h4 class="font-bold text-base">${c.icon} ${c.court}</h4>
            <a href="${c.url}" target="_blank" class="text-blue-400 text-xs hover:underline">Visit →</a>
        `;
        container.appendChild(div);
    });
}

// Track case
function trackCase(caseNumber) {
    if (!caseNumber) return null;
    // Simulate case tracking
    return {
        caseNumber: caseNumber,
        status: 'Pending',
        nextDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        court: 'District Court, Lucknow'
    };
}
