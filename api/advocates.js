// ============================================================
// ADVOCATES.JS - Advocate Directory & Pro Bono Requests
// ============================================================

// Advocate Database
const advocates = [
    { name: 'Adv. Rakesh Sharma', ward: 12, spec: 'Criminal', phone: '98765XXXXX', exp: '15 yrs', chambers: 'Alambagh', rating: 4.8 },
    { name: 'Adv. Priya Singh', ward: 45, spec: 'Women', phone: '98765XXXXX', exp: '10 yrs', chambers: 'Gomti Nagar', rating: 4.9 },
    { name: 'Adv. Mohd. Irfan', ward: 78, spec: 'Property', phone: '98765XXXXX', exp: '12 yrs', chambers: 'Indira Nagar', rating: 4.7 },
    { name: 'Adv. Anjali Verma', ward: 22, spec: 'Family', phone: '98765XXXXX', exp: '8 yrs', chambers: 'Hazratganj', rating: 4.6 },
    { name: 'Adv. Suresh Kumar', ward: 91, spec: 'Cyber', phone: '98765XXXXX', exp: '6 yrs', chambers: 'Chowk', rating: 4.5 },
    { name: 'Adv. Neha Gupta', ward: 34, spec: 'Civil', phone: '98765XXXXX', exp: '9 yrs', chambers: 'Gomti Nagar', rating: 4.7 },
    { name: 'Adv. Amit Singh', ward: 56, spec: 'Criminal', phone: '98765XXXXX', exp: '14 yrs', chambers: 'Alambagh', rating: 4.9 },
    { name: 'Adv. Deepa Mishra', ward: 67, spec: 'Family', phone: '98765XXXXX', exp: '11 yrs', chambers: 'Indira Nagar', rating: 4.6 },
    { name: 'Adv. Sanjay Verma', ward: 89, spec: 'Property', phone: '98765XXXXX', exp: '7 yrs', chambers: 'Hazratganj', rating: 4.4 },
    { name: 'Adv. Kavita Srivastava', ward: 23, spec: 'Women', phone: '98765XXXXX', exp: '13 yrs', chambers: 'Gomti Nagar', rating: 4.9 },
    { name: 'Adv. Rajesh Kumar', ward: 15, spec: 'Criminal', phone: '98765XXXXX', exp: '20 yrs', chambers: 'Alambagh', rating: 4.9 },
    { name: 'Adv. Sunita Sharma', ward: 40, spec: 'Family', phone: '98765XXXXX', exp: '16 yrs', chambers: 'Hazratganj', rating: 4.8 },
    { name: 'Adv. Imran Khan', ward: 55, spec: 'Property', phone: '98765XXXXX', exp: '10 yrs', chambers: 'Chowk', rating: 4.5 },
    { name: 'Adv. Pooja Singh', ward: 70, spec: 'Women', phone: '98765XXXXX', exp: '8 yrs', chambers: 'Gomti Nagar', rating: 4.7 },
    { name: 'Adv. Vikram Singh', ward: 85, spec: 'Cyber', phone: '98765XXXXX', exp: '5 yrs', chambers: 'Indira Nagar', rating: 4.3 }
];

// Render advocates
function renderAdvocates() {
    const ward = document.getElementById('adv-ward');
    const spec = document.getElementById('adv-spec');
    const list = document.getElementById('adv-list');
    if (!list) return;
    
    const wardVal = ward ? ward.value : '';
    const specVal = spec ? spec.value : '';
    
    list.innerHTML = '';
    const filtered = advocates.filter(a => {
        const wardMatch = !wardVal || a.ward == parseInt(wardVal.split(' ')[1]);
        const specMatch = !specVal || a.spec === specVal;
        return wardMatch && specMatch;
    });
    
    if (filtered.length === 0) {
        list.innerHTML = '<div class="text-slate-400 text-sm p-3">⚠️ No advocates found. Try different search.</div>';
        return;
    }
    
    filtered.forEach(a => {
        const stars = '⭐'.repeat(Math.round(a.rating || 4));
        list.innerHTML += `
            <div class="adv-card flex justify-between items-center">
                <div>
                    <b>${a.name}</b> 
                    <span class="text-xs opacity-70">Ward ${a.ward} · ${a.spec}</span>
                    <div class="text-xs text-slate-400">${a.exp} experience · ${a.chambers}</div>
                    <div class="text-xs text-yellow-400">${stars}</div>
                </div>
                <span class="text-xs text-green-400">📞 ${a.phone}</span>
            </div>
        `;
    });
}

// Pro Bono Functions
function submitProBono() {
    const name = document.getElementById('pb-name');
    const phone = document.getElementById('pb-phone');
    const ward = document.getElementById('pb-ward');
    const desc = document.getElementById('pb-desc');
    const status = document.getElementById('pb-status');
    
    if (!name || !phone || !ward || !desc) return;
    
    const nameVal = name.value.trim();
    const phoneVal = phone.value.trim();
    const wardVal = ward.value;
    const descVal = desc.value.trim();
    
    if (!nameVal || !phoneVal || !wardVal || !descVal) {
        if (status) {
            status.textContent = '⚠️ All fields required';
            status.className = 'text-red-400 text-sm mt-1';
            status.classList.remove('hidden');
        }
        return;
    }
    
    const reqs = JSON.parse(localStorage.getItem('proBonoReqs') || '[]');
    reqs.unshift({ 
        id: 'PB-' + Date.now().toString(36).toUpperCase(), 
        name: nameVal, 
        phone: phoneVal, 
        ward: wardVal, 
        desc: descVal, 
        status: 'Pending', 
        date: new Date().toISOString() 
    });
    localStorage.setItem('proBonoReqs', JSON.stringify(reqs));
    
    if (status) {
        status.className = 'text-green-400 text-sm mt-1 p-2 rounded-xl';
        status.style.background = 'rgba(34,197,94,0.1)';
        status.innerHTML = '✅ Request submitted! DLSA will contact you within 48 hours.';
        status.classList.remove('hidden');
    }
    
    loadProBonoList();
    if (name) name.value = '';
    if (phone) phone.value = '';
    if (desc) desc.value = '';
}

function loadProBonoList() {
    const list = document.getElementById('pb-list');
    if (!list) return;
    const reqs = JSON.parse(localStorage.getItem('proBonoReqs') || '[]');
    list.innerHTML = '';
    reqs.slice(0, 5).forEach(r => {
        list.innerHTML += `
            <div class="text-xs p-2 border-b border-slate-700">
                <span class="text-orange-400">🆓 ${r.id}</span> - Ward ${r.ward} 
                <span class="status-badge ${r.status === 'Pending' ? 'pending' : 'resolved'}">${r.status}</span>
            </div>
        `;
    });
}
