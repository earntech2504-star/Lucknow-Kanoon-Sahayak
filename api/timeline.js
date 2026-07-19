// ============================================================
// TIMELINE.JS - Timeline
// ============================================================

// Generate timeline
function generateTimeline() {
    const incident = document.getElementById('tl-incident');
    const fir = document.getElementById('tl-fir');
    const container = document.getElementById('timeline-container');
    
    if (!incident || !fir || !container) return;
    
    const incidentVal = incident.value;
    const firVal = fir.value;
    
    container.innerHTML = '';
    
    if (incidentVal) {
        const div = document.createElement('div');
        div.className = 'glass-card p-2 rounded-xl flex items-center gap-2';
        div.innerHTML = '📅 Incident: ' + new Date(incidentVal).toLocaleDateString();
        container.appendChild(div);
    }
    
    if (firVal) {
        const div = document.createElement('div');
        div.className = 'glass-card p-2 rounded-xl flex items-center gap-2';
        div.innerHTML = '📋 FIR: ' + new Date(firVal).toLocaleDateString();
        container.appendChild(div);
    }
    
    // Calculate timeline
    if (incidentVal && firVal) {
        const incidentDate = new Date(incidentVal);
        const firDate = new Date(firVal);
        const diffDays = Math.round((firDate - incidentDate) / (1000 * 60 * 60 * 24));
        const div = document.createElement('div');
        div.className = 'glass-card p-2 rounded-xl flex items-center gap-2 bg-amber-900/20 border border-amber-700/30';
        div.innerHTML = `⏳ Difference: ${diffDays} days between incident and FIR`;
        container.appendChild(div);
    }
    
    if (container.children.length === 0) {
        container.innerHTML = '<div class="text-slate-400">⚠️ कृपया तारीख डालें।</div>';
    }
}

// Get days between dates
function getDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}
