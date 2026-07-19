// ============================================================
// RESOURCES.JS - Resources
// ============================================================

// Resources data
const resourcesData = [
    { id: 1, title: 'BNS Full Text', desc: 'Bharatiya Nyaya Sanhita 2023 - Complete Bare Act', type: 'pdf', link: '#', icon: '📜' },
    { id: 2, title: 'BNSS Full Text', desc: 'Bharatiya Nagarik Suraksha Sanhita 2023 - Complete Bare Act', type: 'pdf', link: '#', icon: '📜' },
    { id: 3, title: 'BSA Full Text', desc: 'Bharatiya Sakshya Adhiniyam 2023 - Complete Bare Act', type: 'pdf', link: '#', icon: '📜' },
    { id: 4, title: 'Comparison Chart', desc: 'IPC/CrPC vs BNS/BNSS/BSA - Complete Comparison', type: 'chart', link: '#', icon: '📊' },
    { id: 5, title: 'Supreme Court Website', desc: 'Official Supreme Court of India - www.sci.gov.in', type: 'link', link: 'https://www.sci.gov.in', icon: '🏛️' },
    { id: 6, title: 'Allahabad HC Website', desc: 'Official Allahabad High Court - www.allahabadhighcourt.in', type: 'link', link: 'https://www.allahabadhighcourt.in', icon: '⚖️' },
    { id: 7, title: 'eCourts Portal', desc: 'Check case status online - ecourts.gov.in', type: 'link', link: 'https://ecourts.gov.in', icon: '💻' },
    { id: 8, title: 'NALSA Website', desc: 'National Legal Services Authority - nalsa.gov.in', type: 'link', link: 'https://nalsa.gov.in', icon: '🆓' },
    { id: 9, title: 'Sample FIR Format', desc: 'Download sample FIR application format', type: 'doc', link: '#', icon: '📋' },
    { id: 10, title: 'Bail Application Template', desc: 'Download standard bail application format', type: 'doc', link: '#', icon: '⛓️' }
];

// Load resources
function loadResources() {
    const container = document.getElementById('resources-container');
    if (!container) return;
    container.innerHTML = '';
    resourcesData.forEach(r => {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl';
        div.style.background = 'rgba(255,255,255,0.05)';
        div.innerHTML = `
            <h4 class="font-bold text-base">${r.icon} ${r.title}</h4>
            <div class="text-xs text-slate-400 mt-1">${r.desc}</div>
            <a href="${r.link}" target="_blank" class="text-blue-400 text-xs hover:underline">Access →</a>
        `;
        container.appendChild(div);
    });
}

// Search resources
function searchResources(query) {
    const container = document.getElementById('resources-container');
    if (!container) return;
    const q = query.toLowerCase().trim();
    const results = q ? resourcesData.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.desc.toLowerCase().includes(q)
    ) : resourcesData;
    container.innerHTML = '';
    results.forEach(r => {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl';
        div.style.background = 'rgba(255,255,255,0.05)';
        div.innerHTML = `
            <h4 class="font-bold text-base">${r.icon} ${r.title}</h4>
            <div class="text-xs text-slate-400 mt-1">${r.desc}</div>
            <a href="${r.link}" target="_blank" class="text-blue-400 text-xs hover:underline">Access →</a>
        `;
        container.appendChild(div);
    });
}
