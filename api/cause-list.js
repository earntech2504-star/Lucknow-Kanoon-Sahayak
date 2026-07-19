// ============================================================
// CAUSE-LIST.JS - Cause List
// ============================================================

// Cause list data
const causeListData = [
    { court: 'Allahabad HC - Lucknow', date: '2026-07-20', cases: ['Criminal Appeal No. 45/2026', 'Writ Petition No. 123/2026'] },
    { court: 'Allahabad HC - Lucknow', date: '2026-07-21', cases: ['Misc. Case No. 67/2026', 'Criminal Revision No. 89/2026'] },
    { court: 'Sessions Court - Lucknow', date: '2026-07-20', cases: ['Sessions Trial No. 12/2026', 'Criminal Case No. 34/2026'] },
    { court: 'Family Court - Lucknow', date: '2026-07-20', cases: ['Divorce Petition No. 56/2026', 'Maintenance Case No. 78/2026'] }
];

// Search cause list
function searchCauseList() {
    const search = document.getElementById('cause-search');
    const result = document.getElementById('cause-result');
    if (!search || !result) return;
    
    const query = search.value.trim();
    if (!query) {
        result.innerHTML = '⚠️ कृपया case number या party name डालें।';
        return;
    }
    
    // Search in data
    let found = [];
    causeListData.forEach(court => {
        court.cases.forEach(caseNo => {
            if (caseNo.toLowerCase().includes(query.toLowerCase())) {
                found.push({ court: court.court, date: court.date, case: caseNo });
            }
        });
    });
    
    if (found.length === 0) {
        result.innerHTML = `
            <div class="text-slate-400 text-sm p-3">
                🔍 No results found for "${query}"
                <br><span class="text-xs">💡 Check Allahabad HC website for exact cause list: <a href="https://www.allahabadhighcourt.in/causelist/" target="_blank" class="text-blue-400">Visit →</a></span>
            </div>
        `;
        return;
    }
    
    result.innerHTML = `
        <div class="glass-card p-3 rounded-xl">
            <div class="text-green-400 font-semibold">✅ Found ${found.length} result(s)</div>
            ${found.map(f => `
                <div class="border-b border-slate-700 py-2 text-sm">
                    <div><b>📅 ${f.case}</b></div>
                    <div class="text-xs text-slate-400">🏛️ ${f.court} · ${new Date(f.date).toLocaleDateString()}</div>
                </div>
            `).join('')}
            <div class="text-xs text-slate-500 mt-2">⚠️ Please verify on official court website</div>
        </div>
    `;
}

// Get cause list by court
function getCauseList(court) {
    return causeListData.filter(c => c.court === court);
}
