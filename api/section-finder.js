// ============================================================
// SECTION-FINDER.JS - Section Finder
// ============================================================

// Sections data (using global sections from sections.js)
function findSections() {
    const input = document.getElementById('section-finder-input');
    const result = document.getElementById('section-finder-result');
    const list = document.getElementById('section-finder-list');
    
    if (!input || !result || !list) return;
    
    const query = input.value.trim().toLowerCase();
    if (!query) {
        result.classList.add('hidden');
        return;
    }
    
    // Use global sections data if available
    let found = [];
    if (typeof sections !== 'undefined') {
        found = sections.filter(s => 
            s.title.toLowerCase().includes(query) || 
            s.desc.toLowerCase().includes(query) || 
            s.num.toLowerCase().includes(query)
        );
    }
    
    result.classList.remove('hidden');
    if (found.length === 0) {
        list.innerHTML = '<div class="text-slate-400">⚠️ कोई section नहीं मिला।</div>';
        return;
    }
    
    list.innerHTML = '';
    found.forEach(s => {
        const div = document.createElement('div');
        div.className = 'section-card p-2';
        div.innerHTML = `
            <span class="section-number">${s.num}</span> - 
            <span class="section-title">${s.title}</span>
            <div class="section-desc text-sm">${s.desc}</div>
            <div class="section-trick text-xs">🧠 ${s.mem}</div>
        `;
        list.appendChild(div);
    });
}

// Filter sections by act
function filterBNSSections(type) {
    const pills = document.querySelectorAll('#section-finder .filter-pill');
    pills.forEach(p => p.classList.toggle('active', p.dataset.filter === type));
    renderSectionsFull(type);
}

// Render full sections
function renderSectionsFull(type) {
    const grid = document.getElementById('bns-sections-grid-full');
    if (!grid) return;
    
    let data = [];
    if (typeof sections !== 'undefined') {
        data = sections;
        if (type !== 'all') data = sections.filter(s => s.act === type);
    }
    
    grid.innerHTML = '';
    data.forEach(s => {
        const card = document.createElement('div');
        card.className = 'section-card';
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <span class="section-number">${s.num}</span> 
                    <span class="section-title">${s.title}</span>
                </div>
                <span class="status-badge ${s.cat}">${s.act.toUpperCase()}</span>
            </div>
            <div class="section-desc">${s.desc}</div>
            <div class="section-trick">🧠 ${s.mem}</div>
        `;
        grid.appendChild(card);
    });
}
