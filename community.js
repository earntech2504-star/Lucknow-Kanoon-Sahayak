// ============================================================
// COMMUNITY.JS - Complete Community Complaint System
// ============================================================

// ============================================================
// DEPARTMENT MAPPING
// ============================================================
const DEPARTMENT_MAPPING = {
    'Pani': { 
        dept: 'Jal Sansthan', 
        level1: 'Ward Officer', 
        level2: 'Zonal Officer', 
        level3: 'Chief Engineer',
        contact: '1912',
        email: 'jalsansthan@lucknow.gov.in'
    },
    'Sadak': { 
        dept: 'PWD / Nagar Nigam', 
        level1: 'Junior Engineer', 
        level2: 'Executive Engineer', 
        level3: 'Superintending Engineer',
        contact: '1073',
        email: 'pwd@lucknow.gov.in'
    },
    'Safai': { 
        dept: 'Swachh Bharat Mission', 
        level1: 'Sanitary Inspector', 
        level2: 'Health Officer', 
        level3: 'Municipal Commissioner',
        contact: '1533',
        email: 'swachh@lucknow.gov.in'
    },
    'Bijli': { 
        dept: 'Electricity Department', 
        level1: 'Lineman', 
        level2: 'Junior Engineer', 
        level3: 'Chief Engineer',
        contact: '1912',
        email: 'electricity@lucknow.gov.in'
    },
    'Other': { 
        dept: 'General Administration', 
        level1: 'Ward Officer', 
        level2: 'Zonal Officer', 
        level3: 'District Magistrate',
        contact: '15100',
        email: 'dm@lucknow.gov.in'
    }
};

// ============================================================
// LOAD ALL 110 WARDS
// ============================================================
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

// ============================================================
// CATEGORY SELECT - SHOW DEPARTMENT PREVIEW
// ============================================================
function updateDepartmentPreview() {
    const category = document.getElementById('community-category');
    const preview = document.getElementById('dept-preview');
    if (!category || !preview) return;
    
    const cat = category.value;
    if (cat && DEPARTMENT_MAPPING[cat]) {
        preview.textContent = DEPARTMENT_MAPPING[cat].dept + ' → ' + DEPARTMENT_MAPPING[cat].level1;
        preview.className = 'text-green-400';
    } else {
        preview.textContent = 'Select category to see department';
        preview.className = 'text-blue-400';
    }
}

// ============================================================
// SUBMIT COMMUNITY COMPLAINT WITH PHOTO/VIDEO
// ============================================================
function submitCommunityComplaint() {
    const name = document.getElementById('community-name');
    const phone = document.getElementById('community-phone');
    const ward = document.getElementById('community-ward');
    const category = document.getElementById('community-category');
    const desc = document.getElementById('community-description');
    const photoInput = document.getElementById('community-photo');
    const videoInput = document.getElementById('community-video');
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
    
    // Process photo
    let photoData = null;
    let videoData = null;
    
    if (photoInput && photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoData = e.target.result;
            createComplaint(nameVal, phoneVal, wardVal, categoryVal, descVal, photoData, null);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        createComplaint(nameVal, phoneVal, wardVal, categoryVal, descVal, null, null);
    }
    
    // Process video
    if (videoInput && videoInput.files && videoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            videoData = e.target.result;
            // Video will be stored
        };
        reader.readAsDataURL(videoInput.files[0]);
    }
}

// ============================================================
// CREATE COMPLAINT
// ============================================================
function createComplaint(name, phone, ward, category, description, photo, video) {
    const deptInfo = DEPARTMENT_MAPPING[category] || DEPARTMENT_MAPPING['Other'];
    
    const complaint = {
        id: 'CMP-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
        name: name,
        phone: phone,
        ward: ward,
        category: category,
        description: description,
        photo: photo,
        video: video,
        status: 'pending',
        level: 1,
        department: deptInfo.dept,
        level1Officer: deptInfo.level1,
        level2Officer: deptInfo.level2,
        level3Officer: deptInfo.level3,
        contact: deptInfo.contact,
        email: deptInfo.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        escalatedAt: null,
        resolvedAt: null,
        timeline: [
            { 
                time: new Date().toISOString(), 
                status: 'pending', 
                level: 1,
                message: '📤 Complaint submitted to ' + deptInfo.level1 + ' (' + deptInfo.dept + ')'
            }
        ]
    };
    
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    complaints.unshift(complaint);
    localStorage.setItem('communityComplaints', JSON.stringify(complaints));
    
    const status = document.getElementById('community-submit-status');
    if (status) {
        status.className = 'text-green-400 text-sm mt-1 p-2 rounded-xl';
        status.style.background = 'rgba(34,197,94,0.1)';
        status.innerHTML = `
            ✅ Complaint submitted! ID: ${complaint.id}
            <br><span class="text-xs">📤 Sent to: ${complaint.department} - ${complaint.level1Officer}</span>
            <br><button onclick="trackComplaintById('${complaint.id}')" class="text-blue-400 underline mt-1">🔍 Track</button>
        `;
        status.classList.remove('hidden');
    }
    
    // Clear form
    const nameInput = document.getElementById('community-name');
    const phoneInput = document.getElementById('community-phone');
    const descInput = document.getElementById('community-description');
    const photoInput = document.getElementById('community-photo');
    const videoInput = document.getElementById('community-video');
    
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (descInput) descInput.value = '';
    if (photoInput) photoInput.value = '';
    if (videoInput) videoInput.value = '';
    
    loadCommunityStats();
    renderComplaintList();
    
    // Check auto-escalation
    checkAutoEscalation();
}

// ============================================================
// TRACK COMPLAINT BY ID (FULL DETAILS)
// ============================================================
function trackComplaintById(id) {
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    const c = complaints.find(c => c.id === id);
    if (!c) {
        const resultDiv = document.getElementById('track-result');
        if (resultDiv) {
            resultDiv.innerHTML = '<div class="text-red-400 text-sm">❌ Complaint not found</div>';
            resultDiv.classList.remove('hidden');
        } else {
            alert('❌ Complaint not found');
        }
        return;
    }
    
    const hours = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60);
    const isEscalated = hours > 24 && c.status !== 'resolved';
    const statusText = isEscalated ? 'ESCALATED' : c.status.toUpperCase();
    const statusClass = isEscalated ? 'escalated' : c.status;
    
    // Get level officer name
    const levelOfficers = ['', c.level1Officer, c.level2Officer, c.level3Officer];
    const currentOfficer = levelOfficers[c.level] || c.level1Officer;
    
    let html = `
        <div class="glass-card p-4 rounded-xl">
            <div class="flex justify-between items-start">
                <div>
                    <div class="text-lg font-bold">📋 ${c.id}</div>
                    <div class="text-xs text-slate-400">${new Date(c.createdAt).toLocaleString()}</div>
                </div>
                <div class="status-badge ${statusClass}">${statusText}</div>
            </div>
            <div class="grid grid-cols-2 gap-1 mt-2 text-sm">
                <div><span class="text-slate-400">Name:</span> ${c.name}</div>
                <div><span class="text-slate-400">Phone:</span> ${c.phone}</div>
                <div><span class="text-slate-400">Ward:</span> ${c.ward}</div>
                <div><span class="text-slate-400">Category:</span> ${c.category}</div>
            </div>
            <div class="mt-2 text-sm">
                <div><span class="text-slate-400">Description:</span> ${c.description}</div>
                <div><span class="text-slate-400">Department:</span> <b class="text-orange-400">${c.department}</b></div>
                <div><span class="text-slate-400">Current Officer:</span> <b class="text-green-400">${currentOfficer}</b></div>
                <div><span class="text-slate-400">Contact:</span> ${c.contact}</div>
                <div><span class="text-slate-400">Email:</span> ${c.email}</div>
            </div>
            <div class="mt-2 text-sm">
                <div><span class="text-slate-400">Level:</span> ${c.level}/3</div>
                <div><span class="text-slate-400">Hours:</span> ${Math.round(hours)} hours</div>
                ${isEscalated ? '<div class="text-red-400 font-bold animate-pulse">⚠️ ESCALATED - 24hrs exceeded</div>' : ''}
                ${c.status === 'resolved' ? '<div class="text-green-400 font-bold">✅ Resolved</div>' : ''}
            </div>
            ${c.photo ? `<div class="mt-2"><img src="${c.photo}" class="max-h-32 rounded-lg" alt="Photo"></div>` : ''}
            ${c.video ? `<div class="mt-2"><video controls class="max-h-32 rounded-lg"><source src="${c.video}"></video></div>` : ''}
            
            <div class="mt-3">
                <div class="text-sm font-bold text-slate-300">⏳ Timeline</div>
                <div class="space-y-0.5 mt-1 max-h-32 overflow-y-auto text-xs">
                    ${c.timeline && c.timeline.length > 0 ? c.timeline.map(t => `
                        <div class="flex justify-between border-b border-slate-700 py-0.5">
                            <span>${new Date(t.time).toLocaleString()}</span>
                            <span class="${t.status === 'resolved' ? 'text-green-400' : t.status === 'escalated' ? 'text-red-400' : 'text-yellow-400'}">${t.message}</span>
                        </div>
                    `).join('') : `
                        <div class="flex justify-between border-b border-slate-700 py-0.5">
                            <span>${new Date(c.createdAt).toLocaleString()}</span>
                            <span class="text-yellow-400">📤 Submitted</span>
                        </div>
                    `}
                </div>
            </div>
            
            <div class="mt-3 flex gap-2 flex-wrap">
                ${c.status !== 'resolved' ? `<button onclick="resolveComplaint('${c.id}')" class="btn-primary text-xs px-3 py-1">✅ Resolve</button>` : ''}
                ${c.status !== 'resolved' && c.level < 3 ? `<button onclick="escalateComplaint('${c.id}')" class="btn-primary text-xs px-3 py-1" style="background:linear-gradient(135deg,#dc2626,#ef4444)!important;">⬆️ Escalate</button>` : ''}
                <button onclick="refreshComplaintStatus('${c.id}')" class="btn-primary text-xs px-3 py-1" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)!important;">🔄 Refresh</button>
                <button onclick="deleteComplaint('${c.id}')" class="btn-primary text-xs px-3 py-1" style="background:linear-gradient(135deg,#dc2626,#ef4444)!important;">🗑️ Delete</button>
            </div>
        </div>
    `;
    
    const resultDiv = document.getElementById('track-result');
    if (resultDiv) {
        resultDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
    }
}

// ============================================================
// RESOLVE COMPLAINT
// ============================================================
function resolveComplaint(id) {
    if (!confirm('✅ Confirm resolution of this complaint?')) return;
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    const c = complaints.find(c => c.id === id);
    if (c) {
        c.status = 'resolved';
        c.resolvedAt = new Date().toISOString();
        c.updatedAt = new Date().toISOString();
        if (!c.timeline) c.timeline = [];
        c.timeline.push({
            time: new Date().toISOString(),
            status: 'resolved',
            level: c.level,
            message: `✅ Complaint resolved by ${c.level1Officer} (Level ${c.level})`
        });
        localStorage.setItem('communityComplaints', JSON.stringify(complaints));
        trackComplaintById(id);
        loadCommunityStats();
        renderComplaintList();
    }
}

// ============================================================
// ESCALATE COMPLAINT
// ============================================================
function escalateComplaint(id) {
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    const c = complaints.find(c => c.id === id);
    if (!c) return;
    
    const nextLevel = c.level + 1;
    if (nextLevel > 3) {
        alert('⚠️ Already at highest level (Level 3)');
        return;
    }
    
    if (!confirm(`⚠️ Escalate this complaint to Level ${nextLevel}?`)) return;
    
    const levelOfficers = ['', c.level1Officer, c.level2Officer, c.level3Officer];
    c.level = nextLevel;
    c.status = 'escalated';
    c.escalatedAt = new Date().toISOString();
    c.updatedAt = new Date().toISOString();
    if (!c.timeline) c.timeline = [];
    c.timeline.push({
        time: new Date().toISOString(),
        status: 'escalated',
        level: nextLevel,
        message: `⚠️ Escalated to ${levelOfficers[nextLevel]} (Level ${nextLevel}) - 24hrs exceeded`
    });
    localStorage.setItem('communityComplaints', JSON.stringify(complaints));
    trackComplaintById(id);
    loadCommunityStats();
    renderComplaintList();
}

// ============================================================
// REFRESH COMPLAINT STATUS
// ============================================================
function refreshComplaintStatus(id) {
    trackComplaintById(id);
}

// ============================================================
// DELETE COMPLAINT
// ============================================================
function deleteComplaint(id) {
    if (!confirm(`🗑️ Delete complaint ${id}? This cannot be undone.`)) return;
    let complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    complaints = complaints.filter(c => c.id !== id);
    localStorage.setItem('communityComplaints', JSON.stringify(complaints));
    const resultDiv = document.getElementById('track-result');
    if (resultDiv) {
        resultDiv.innerHTML = '<div class="text-green-400 text-sm">✅ Complaint deleted</div>';
        resultDiv.classList.remove('hidden');
    }
    loadCommunityStats();
    renderComplaintList();
}

// ============================================================
// AUTO-ESCALATION - 24 HOURS
// ============================================================
function checkAutoEscalation() {
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    let escalated = false;
    const levelOfficers = ['', 'Ward Officer', 'Zonal Officer', 'District Magistrate'];
    
    complaints.forEach(c => {
        if (c.status === 'resolved' || c.status === 'escalated' && c.level >= 3) return;
        const hours = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60);
        
        // Check if 24hrs passed and not resolved
        if (hours > 24 && c.status !== 'resolved' && c.level < 3) {
            const nextLevel = c.level + 1;
            c.level = nextLevel;
            c.status = 'escalated';
            c.escalatedAt = new Date().toISOString();
            c.updatedAt = new Date().toISOString();
            if (!c.timeline) c.timeline = [];
            c.timeline.push({
                time: new Date().toISOString(),
                status: 'escalated',
                level: nextLevel,
                message: `⚠️ AUTO-ESCALATED to ${levelOfficers[nextLevel] || 'Higher Authority'} (Level ${nextLevel}) - 24hrs exceeded`
            });
            escalated = true;
        }
    });
    
    if (escalated) {
        localStorage.setItem('communityComplaints', JSON.stringify(complaints));
        loadCommunityStats();
        renderComplaintList();
        // Show notification
        const notification = document.getElementById('escalation-notification');
        if (notification) {
            notification.classList.remove('hidden');
            setTimeout(() => notification.classList.add('hidden'), 5000);
        }
    }
}

// ============================================================
// RENDER COMPLAINT LIST
// ============================================================
function renderComplaintList() {
    const container = document.getElementById('complaint-list');
    if (!container) return;
    
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    if (complaints.length === 0) {
        container.innerHTML = '<div class="text-slate-400 text-sm text-center py-4">No complaints yet</div>';
        return;
    }
    
    container.innerHTML = '';
    complaints.slice(0, 10).forEach(c => {
        const hours = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60);
        const isEscalated = hours > 24 && c.status !== 'resolved';
        const div = document.createElement('div');
        div.className = 'glass-card p-2 rounded-xl flex justify-between items-center text-sm hover:border-orange-400 transition-all cursor-pointer';
        div.onclick = () => trackComplaintById(c.id);
        div.innerHTML = `
            <div>
                <div class="font-bold">${c.id}</div>
                <div class="text-xs text-slate-400">${c.category} · Ward ${c.ward}</div>
                <div class="text-xs ${isEscalated ? 'text-red-400' : 'text-slate-400'}">${Math.round(hours)} hrs · Level ${c.level}/3</div>
            </div>
            <div class="text-right">
                <div class="status-badge ${c.status === 'resolved' ? 'resolved' : isEscalated ? 'escalated' : 'pending'}">${isEscalated ? '🚨 ESCALATED' : c.status.toUpperCase()}</div>
                <button onclick="event.stopPropagation();trackComplaintById('${c.id}')" class="text-blue-400 text-xs underline mt-1 block">🔍 Track</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// ============================================================
// LOAD COMMUNITY STATS
// ============================================================
function loadCommunityStats() {
    const complaints = JSON.parse(localStorage.getItem('communityComplaints') || '[]');
    const total = document.getElementById('stat-total');
    const pending = document.getElementById('stat-pending');
    const resolved = document.getElementById('stat-resolved');
    const escalated = document.getElementById('stat-escalated');
    const rate = document.getElementById('stat-rate');
    
    const pendingCount = complaints.filter(c => c.status === 'pending').length;
    const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
    const escalatedCount = complaints.filter(c => c.status === 'escalated').length;
    
    if (total) total.textContent = complaints.length;
    if (pending) pending.textContent = pendingCount;
    if (resolved) resolved.textContent = resolvedCount;
    if (escalated) escalated.textContent = escalatedCount;
    if (rate) {
        rate.textContent = complaints.length > 0 ? 
            Math.round((resolvedCount / complaints.length) * 100) + '%' : 
            '0%';
    }
}

// ============================================================
// INIT - RUN AUTO-ESCALATION CHECK EVERY MINUTE
// ============================================================
function initCommunity() {
    loadAllWards();
    loadCommunityStats();
    renderComplaintList();
    
    // Auto-escalation check every 60 seconds
    setInterval(checkAutoEscalation, 60000);
    checkAutoEscalation();
    
    // Category change listener
    const categorySelect = document.getElementById('community-category');
    if (categorySelect) {
        categorySelect.addEventListener('change', updateDepartmentPreview);
    }
}

// Run on DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCommunity);
    } else {
        initCommunity();
    }
}

// ============================================================
// EXPORT (for Node.js)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DEPARTMENT_MAPPING,
        loadAllWards,
        submitCommunityComplaint,
        trackComplaintById,
        resolveComplaint,
        escalateComplaint,
        deleteComplaint,
        checkAutoEscalation,
        loadCommunityStats,
        renderComplaintList,
        updateDepartmentPreview
    };
}
