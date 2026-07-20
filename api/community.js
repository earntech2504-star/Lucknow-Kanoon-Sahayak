// ============================================================
// api/community.js - Community Complaint System
// ============================================================

// Submit complaint
function submitComplaint() {
    const name = document.getElementById('community-name');
    const phone = document.getElementById('community-phone');
    const ward = document.getElementById('community-ward');
    const desc = document.getElementById('community-desc');
    const status = document.getElementById('community-status');
    
    if (!name || !phone || !ward || !desc) return;
    const nameVal = name.value.trim();
    const phoneVal = phone.value.trim();
    const wardVal = ward.value;
    const descVal = desc.value.trim();
    
    if (!nameVal || !phoneVal || !wardVal || !descVal) {
        if (status) {
            status.className = 'text-red-400 text-sm mt-1';
            status.textContent = '⚠️ All fields required';
            status.classList.remove('hidden');
        }
        return;
    }
    
    const id = 'CMP-' + Date.now().toString(36).toUpperCase();
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    complaints.unshift({ id, name: nameVal, phone: phoneVal, ward: wardVal, description: descVal, status: 'pending', date: new Date().toISOString() });
    localStorage.setItem('communityComplaints', JSON.stringify(complaints));
    
    if (status) {
        status.className = 'text-green-400 text-sm mt-1 p-2 rounded-xl';
        status.style.background = 'rgba(34,197,94,0.1)';
        status.innerHTML = '✅ Complaint submitted! ID: '+id;
        status.classList.remove('hidden');
    }
}

console.log('✅ community.js loaded');