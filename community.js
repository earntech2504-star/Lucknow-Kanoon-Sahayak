// ============================================================
// COMMUNITY.JS - Community Complaints & 110 Wards
// ============================================================

// Load all 110 wards
function loadAllWards() {
    const wardSelects = document.querySelectorAll('#community-ward, #complaint-ward, #adv-ward, #pb-ward');
    wardSelects.forEach(select => {
        if (!select) return;
        select.innerHTML = '<option value="">Select Ward (1-110)</option>';
        for (let i = 1; i <= 110; i++) {
            const opt = document.createElement('option');
            opt.value = 'Ward ' + i;
            opt.textContent = 'Ward ' + i;
            select.appendChild(opt);
        }
    });
}

// Submit community complaint
function submitCommunityComplaint() {
    const name = document.getElementById('community-name');
    const phone = document.getElementById('community-phone');
    const ward = document.getElementById('community-ward');
    const category = document.getElementById('community-category');
    const desc = document.getElementById('community-description');
    const status = document.getElementById('community-submit-status');
    
    if (!name || !phone || !ward || !category || !desc) return;
    
    const nameVal = name.value.trim();
    const phoneVal = phone.value.trim();
    const wardVal = ward.value;
    const categoryVal = category.value;
    const descVal = desc.value.trim();
    
    if (!nameVal || !phoneVal || !wardVal || !categoryVal || !descVal) {
        if (status) {
            status.className = 'text-red-400 text-sm mt-1';
            status.textContent = '⚠️ सभी fields भरें।';
            status.classList.remove('hidden');
        }
        return;
    }
    
    const id = 'CMP-' + Date.now().toString(36).toUpperCase();
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    complaints.unshift({ 
        id, 
        name: nameVal, 
        phone: phoneVal, 
        ward: wardVal, 
        category: categoryVal, 
        description: descVal, 
        status: 'pending', 
        date: new Date().toISOString() 
    });
    localStorage.setItem('communityComplaints', JSON.stringify(complaints));
    
    if (status) {
        status.className = 'text-green-400 text-sm mt-1 p-2 rounded-xl';
        status.style.background = 'rgba(34,197,94,0.1)';
        status.innerHTML = '✅ Complaint submitted! ID: '+id+'<br><button onclick="trackComplaintById(\''+id+'\')" class="text-blue-400 underline mt-1">🔍 Track</button>';
        status.classList.remove('hidden');
    }
    
    loadCommunityStats();
    if (name) name.value = '';
    if (phone) phone.value = '';
    if (desc) desc.value = '';
}

// Track complaint by ID
function trackComplaintById(id) {
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    const c = complaints.find(c => c.id === id);
    if (!c) {
        alert('Complaint not found');
        return;
    }
    const hours = (Date.now() - new Date(c.date).getTime()) / (1000 * 60 * 60);
    const status = hours > 24 ? 'ESCALATED - 24hrs exceeded' : c.status;
    alert('📋 Complaint: '+c.id+'\nStatus: '+status+'\nCategory: '+c.category+'\nWard: '+c.ward+'\nDescription: '+c.description+'\nSubmitted: '+new Date(c.date).toLocaleString());
}

// Load community stats
function loadCommunityStats() {
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    const total = document.getElementById('stat-total');
    const pending = document.getElementById('stat-pending');
    const resolved = document.getElementById('stat-resolved');
    const rate = document.getElementById('stat-rate');
    
    if (total) total.textContent = complaints.length;
    if (pending) pending.textContent = complaints.filter(c => c.status === 'pending').length;
    if (resolved) resolved.textContent = complaints.filter(c => c.status === 'resolved').length;
    if (rate) {
        rate.textContent = complaints.length > 0 ? 
            Math.round((complaints.filter(c => c.status === 'resolved').length / complaints.length) * 100) + '%' : 
            '0%';
    }
}
