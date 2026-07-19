// ============================================================
// DASHBOARD.JS - Case Tareekh
// ============================================================

// Case data
let caseData = JSON.parse(localStorage.getItem('caseData') || '[]');

// Add case
function addCase() {
    const caseNo = document.getElementById('case-input');
    const date = document.getElementById('date-input');
    if (!caseNo || !date) return;
    
    const caseVal = caseNo.value.trim();
    const dateVal = date.value;
    
    if (!caseVal || !dateVal) {
        alert('Case No और Date भरें');
        return;
    }
    
    caseData.push({ id: Date.now(), caseNo: caseVal, date: dateVal, status: 'pending' });
    localStorage.setItem('caseData', JSON.stringify(caseData));
    renderCaseList();
    caseNo.value = '';
    date.value = '';
}

// Render case list
function renderCaseList() {
    const list = document.getElementById('case-list');
    if (!list) return;
    list.innerHTML = '';
    caseData.forEach(c => {
        const div = document.createElement('div');
        div.className = 'glass-card p-2 rounded-xl flex justify-between items-center';
        const statusClass = c.status === 'pending' ? 'pending' : 'resolved';
        div.innerHTML = `
            <div>
                <span class="font-bold">${c.caseNo}</span>
                <span class="text-xs text-slate-400 ml-2">📅 ${c.date}</span>
                <span class="status-badge ${statusClass} ml-2">${c.status}</span>
            </div>
            <div>
                <button onclick="updateCaseStatus('${c.id}')" class="text-blue-400 text-xs mr-2">✓ Update</button>
                <button onclick="deleteCase('${c.id}')" class="text-red-400 text-xs">✕</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// Update case status
function updateCaseStatus(id) {
    const c = caseData.find(c => c.id == id);
    if (c) {
        c.status = c.status === 'pending' ? 'resolved' : 'pending';
        localStorage.setItem('caseData', JSON.stringify(caseData));
        renderCaseList();
    }
}

// Delete case
function deleteCase(id) {
    caseData = caseData.filter(c => c.id != id);
    localStorage.setItem('caseData', JSON.stringify(caseData));
    renderCaseList();
}

// Get upcoming cases
function getUpcomingCases() {
    const today = new Date();
    return caseData.filter(c => new Date(c.date) >= today && c.status === 'pending');
}
