// ============================================================
// HELPLINE.JS - Emergency Helplines & Complaint Submit
// ============================================================

// Submit helpline complaint
function submitComplaint(e) {
    if (e) e.preventDefault();
    
    const name = document.getElementById('complaint-name');
    const phone = document.getElementById('complaint-phone');
    const ward = document.getElementById('complaint-ward');
    const category = document.getElementById('complaint-category');
    const desc = document.getElementById('complaint-desc');
    const status = document.getElementById('complaint-status');
    
    if (!name || !phone || !ward || !category || !desc) return;
    
    const nameVal = name.value.trim();
    const phoneVal = phone.value.trim();
    const wardVal = ward.value;
    const categoryVal = category.value;
    const descVal = desc.value.trim();
    
    if (!nameVal || !phoneVal || !wardVal || !categoryVal || !descVal) {
        if (status) {
            status.className = 'text-red-400 text-sm mt-1';
            status.textContent = '⚠️ All fields required';
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
    
    const form = document.getElementById('complaint-form');
    if (form) form.reset();
}

// Get helpline by type
function getHelpline(type) {
    const helplines = {
        police: '100',
        women: '181',
        cyber: '1930',
        legal: '15100',
        legalAid: '1800-112-400',
        child: '1098',
        senior: '14567',
        mental: '9820466726',
        disaster: '1070',
        electricity: '1912',
        water: '1533',
        rto: '1073',
        railway: '139',
        ambulance: '108',
        antiCorruption: '1064',
        consumer: '1915',
        gas: '1906',
        aiims: '1800-11-9999'
    };
    return helplines[type] || '100';
}

// Call helpline
function callHelpline(type) {
    const number = getHelpline(type);
    if (number) {
        window.location.href = 'tel:' + number;
    }
}
