// ============================================================
// BARE-ACT.JS - Bare Act
// ============================================================

// Filter and load bare act
function filterBareAct(type) {
    const pills = document.querySelectorAll('#bare-act .filter-pill');
    pills.forEach(p => p.classList.toggle('active', p.dataset.filter === type));
    loadBareAct(type);
}

// Load bare act
function loadBareAct(type = 'all') {
    const container = document.getElementById('bare-act-container');
    if (!container) return;
    
    let data = [];
    if (typeof sections !== 'undefined') {
        data = sections;
        if (type !== 'all') data = sections.filter(s => s.act === type);
    }
    
    container.innerHTML = '';
    data.forEach(s => {
        const div = document.createElement('div');
        div.className = 'section-card p-2';
        div.innerHTML = `
            <span class="section-number">${s.num}</span> 
            <span class="section-title">${s.title}</span>
            <div class="section-desc text-xs">${s.desc}</div>
            <div class="section-trick text-xs">🧠 ${s.mem}</div>
        `;
        container.appendChild(div);
    });
}
