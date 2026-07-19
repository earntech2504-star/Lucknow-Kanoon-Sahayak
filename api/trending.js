// ============================================================
// TRENDING.JS - Trending Topics
// ============================================================

// ============================================================
// Trending Data
// ============================================================
const trendingTopics = [
    { tag: 'BNS 318', count: 1250, category: 'bns' },
    { tag: 'BNSS 173', count: 980, category: 'bnss' },
    { tag: 'IPC vs BNS', count: 870, category: 'bns' },
    { tag: 'Anticipatory Bail', count: 760, category: 'bnss' },
    { tag: 'Cyber Crime 1930', count: 650, category: 'cyber' },
    { tag: 'Maintenance BNSS 144', count: 540, category: 'women' },
    { tag: 'BSA 63 Evidence', count: 430, category: 'bsa' },
    { tag: 'Women Safety Laws', count: 380, category: 'women' },
    { tag: 'Property Dispute', count: 320, category: 'property' },
    { tag: 'Consumer Forum', count: 280, category: 'civil' }
];

// ============================================================
// Load Trending Topics (Main Tab)
// ============================================================
function loadTrendingTopics() {
    const container = document.getElementById('trending-container');
    if (!container) return;
    
    container.innerHTML = '';
    trendingTopics.forEach(topic => {
        const div = document.createElement('div');
        div.className = 'glass-card p-3 rounded-xl';
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-bold text-sm text-white">#${topic.tag}</div>
                    <div class="text-xs text-slate-400">${topic.count} discussions</div>
                </div>
                <span class="text-xs status-badge ${topic.category}">${topic.category}</span>
            </div>
        `;
        container.appendChild(div);
    });
    
    updateLastUpdate('trending-last-update');
}

// ============================================================
// Load Trending Tags (Sidebar)
// ============================================================
function loadTrendingTags() {
    const container = document.getElementById('trending-tags-container');
    if (!container) return;
    
    container.innerHTML = '';
    trendingTopics.slice(0, 10).forEach(topic => {
        const tag = document.createElement('span');
        tag.className = 'quick-action-btn text-xs';
        tag.textContent = `#${topic.tag}`;
        tag.onclick = () => {
            document.getElementById('problem-input').value = topic.tag;
            solveProblemBNS();
        };
        container.appendChild(tag);
    });
}

// ============================================================
// Refresh Trending
// ============================================================
function refreshTrending() {
    loadTrendingTopics();
    updateLastUpdate('trending-last-update');
}

// ============================================================
// Update Last Update Timestamp
// ============================================================
function updateLastUpdate(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        const now = new Date();
        el.textContent = `🔄 ${now.toLocaleTimeString()}`;
    }
}
