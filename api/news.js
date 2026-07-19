// public/news.js
// ============================================================
// NEWS.JS - Live & Trending News Module
// ============================================================

// ============================================================
// News Data (Hardcoded Fallback + API Ready)
// ============================================================
const newsData = [
    {
        id: 1,
        title: 'Supreme Court: नए कानूनों पर महत्वपूर्ण निर्णय',
        category: 'breaking',
        source: 'Live Law',
        time: 'Just now',
        content: 'SC ने BNS 318 पर अपनी पहली टिप्पणी दी है...',
        url: '#'
    },
    {
        id: 2,
        title: 'BNS 103: Murder की सजा कम हो सकती है',
        category: 'breaking',
        source: 'Bar & Bench',
        time: '5 mins ago',
        content: 'SC ने कहा कि हर मर्डर में मौत की सजा नहीं...',
        url: '#'
    },
    {
        id: 3,
        title: 'BNSS 144: Maintenance के नए नियम',
        category: 'women',
        source: 'The Hindu',
        time: '10 mins ago',
        content: 'पत्नी को गुजारा भत्ता देने के नए नियम...',
        url: '#'
    },
    {
        id: 4,
        title: 'Cyber Crime: 1930 पर रिकॉर्ड कॉल्स',
        category: 'cyber',
        source: 'Times of India',
        time: '15 mins ago',
        content: 'साइबर क्राइम हेल्पलाइन 1930 पर 50,000 कॉल्स...',
        url: '#'
    },
    {
        id: 5,
        title: 'BSA 63: Electronic Evidence Guidelines',
        category: 'bns',
        source: 'Tech Law',
        time: '20 mins ago',
        content: 'इलेक्ट्रॉनिक सबूत की नई गाइडलाइंस जारी...',
        url: '#'
    }
];

// ============================================================
// Load Live News (Main Tab)
// ============================================================
function loadLiveNews() {
    const container = document.getElementById('live-news-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (newsData.length === 0) {
        container.innerHTML = '<div class="text-slate-400 text-center py-4">No news at the moment</div>';
        return;
    }
    
    newsData.forEach(news => {
        const div = document.createElement('div');
        div.className = 'rss-feed-item cursor-pointer hover:bg-white/5 transition-colors';
        div.onclick = () => news.url && window.open(news.url, '_blank');
        div.innerHTML = `
            <div class="flex justify-between items-start gap-2">
                <div class="flex-1 min-w-0">
                    <div class="font-medium text-sm text-white line-clamp-2">${news.title}</div>
                    <div class="text-xs text-slate-400 mt-1">${news.source} · ${news.time}</div>
                    <div class="text-xs text-slate-500 mt-1 line-clamp-2">${news.content}</div>
                </div>
                <span class="rss-category-tag rss-cat-${news.category} flex-shrink-0">${news.category}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

// ============================================================
// Load Women News (Sidebar)
// ============================================================
function loadWomenNews() {
    const container = document.getElementById('women-news-container');
    if (!container) return;
    
    const womenNews = newsData.filter(n => n.category === 'women' || n.category === 'breaking');
    
    if (womenNews.length === 0) {
        container.innerHTML = '<div class="text-slate-400 text-xs text-center py-3">No news at the moment</div>';
        return;
    }
    
    container.innerHTML = '';
    womenNews.slice(0, 5).forEach(news => {
        const div = document.createElement('div');
        div.className = 'border-b border-slate-700/50 py-2 last:border-0 cursor-pointer hover:bg-white/5 transition-colors';
        div.onclick = () => news.url && window.open(news.url, '_blank');
        div.innerHTML = `
            <div class="text-xs text-white line-clamp-2">${news.title}</div>
            <div class="text-[10px] text-slate-400 mt-1">${news.source} · ${news.time}</div>
        `;
        container.appendChild(div);
    });
}

// ============================================================
// Load Trending Tags
// ============================================================
function loadTrendingTags() {
    const container = document.getElementById('trending-tags-container');
    if (!container) return;
    
    const tags = ['BNS 318', 'BNSS 173', 'Anticipatory Bail', 'Cyber Crime', 'Maintenance', 'BNS 103', 'BNS 85', 'RTI'];
    
    container.innerHTML = '';
    tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'quick-action-btn text-xs cursor-pointer';
        span.textContent = '#' + tag;
        span.onclick = () => {
            // Switch to smart-search tab and search
            switchTab('smart-search', document.querySelector('[data-tab="smart-search"]'));
            document.getElementById('problem-input').value = tag;
            solveProblemBNS();
        };
        container.appendChild(span);
    });
}

// ============================================================
// Refresh News (Manual + Auto)
// ============================================================
function refreshNews() {
    loadLiveNews();
    loadWomenNews();
    loadTrendingTags();
}

// Auto-refresh every 5 minutes (optional)
let newsRefreshInterval;
function startNewsAutoRefresh() {
    if (newsRefreshInterval) clearInterval(newsRefreshInterval);
    newsRefreshInterval = setInterval(() => {
        console.log('🔄 Auto-refreshing news...');
        // In future: fetch fresh news from API here
        refreshNews();
    }, 5 * 60 * 1000); // 5 minutes
}

function stopNewsAutoRefresh() {
    if (newsRefreshInterval) {
        clearInterval(newsRefreshInterval);
        newsRefreshInterval = null;
    }
}

// ============================================================
// Future: API Integration (Optional)
// ============================================================
async function fetchNewsFromAPI() {
    try {
        // Example: NewsAPI integration
        const response = await fetch('/api/news'); // Your Vercel API route
        if (!response.ok) throw new Error('API failed');
        const apiNews = await response.json();
        
        // Merge API news with fallback
        const merged = [...apiNews, ...newsData].slice(0, 10);
        return merged;
    } catch (error) {
        console.warn('📰 Using fallback news data:', error);
        return newsData; // Return hardcoded fallback
    }
}
