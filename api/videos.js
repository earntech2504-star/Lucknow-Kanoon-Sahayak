// ============================================================
// VIDEOS.JS - Videos
// ============================================================

// Video data
const videoData = [
    { id: 1, title: 'How to File FIR', desc: 'Complete guide on filing FIR under BNSS 173', category: 'fir', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, title: 'Know Your Rights', desc: 'Know your legal rights in India', category: 'rights', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 3, title: 'Bail Process Explained', desc: 'How to get bail under BNSS 480 and 482', category: 'bail', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 4, title: 'Women Safety Tips', desc: 'Safety tips and legal rights for women', category: 'safety', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 5, title: 'How to File RTI', desc: 'Step by step guide for RTI application', category: 'rti', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 6, title: 'Consumer Rights Explained', desc: 'Know your consumer rights in India', category: 'consumer', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
];

// Load videos
function loadVideos() {
    const container = document.getElementById('videos-container');
    if (!container) return;
    container.innerHTML = '';
    videoData.forEach(v => {
        const div = document.createElement('div');
        div.className = 'video-card';
        div.innerHTML = `
            <video controls class="w-full rounded-t-xl">
                <source src="${v.url}" type="video/mp4">
                <div class="video-placeholder">
                    <div class="play-icon">▶</div>
                    <div><strong>${v.title}</strong></div>
                </div>
            </video>
            <div class="p-2">
                <h4 class="font-bold text-sm text-white">${v.title}</h4>
                <div class="text-xs text-slate-400">${v.desc}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Search videos
function searchVideos(query) {
    const container = document.getElementById('videos-container');
    if (!container) return;
    const q = query.toLowerCase().trim();
    const results = q ? videoData.filter(v => 
        v.title.toLowerCase().includes(q) || 
        v.desc.toLowerCase().includes(q) ||
        v.category.includes(q)
    ) : videoData;
    container.innerHTML = '';
    results.forEach(v => {
        const div = document.createElement('div');
        div.className = 'video-card';
        div.innerHTML = `
            <video controls class="w-full rounded-t-xl">
                <source src="${v.url}" type="video/mp4">
                <div class="video-placeholder">
                    <div class="play-icon">▶</div>
                    <div><strong>${v.title}</strong></div>
                </div>
            </video>
            <div class="p-2">
                <h4 class="font-bold text-sm text-white">${v.title}</h4>
                <div class="text-xs text-slate-400">${v.desc}</div>
            </div>
        `;
        container.appendChild(div);
    });
}
