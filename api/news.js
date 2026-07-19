// ============================================================
// NEWS.JS - Live & Trending News
// ============================================================

// ============================================================
// News Data
// ============================================================
const newsData = [
    {
        id: 1,
        title: 'Supreme Court: नए कानूनों पर महत्वपूर्ण निर्णय',
        category: 'breaking',
        source: 'Live Law',
        time: 'Just now',
        content: 'SC ने BNS 318 पर अपनी पहली टिप्पणी दी है...'
    },
    {
        id: 2,
        title: 'BNS 103: Murder की सजा कम हो सकती है',
        category: 'breaking',
        source: 'Bar & Bench',
        time: '5 mins ago',
        content: 'SC ने कहा कि हर मर्डर में मौत की सजा नहीं...'
    },
    {
        id: 3,
        title: 'BNSS 144: Maintenance के नए नियम',
        category: 'women',
        source: 'The Hindu',
        time: '10 mins ago',
        content: 'पत्नी को गुजारा भत्ता देने के नए नियम...'
    },
    {
        id: 4,
        title: 'Cyber Crime: 1930 पर रिकॉर्ड कॉल्स',
        category: 'cyber',
        source: 'Times of India',
        time: '15 mins ago',
        content: 'साइबर क्राइम हेल्पलाइन 1930 पर 50,000 कॉल्स...'
    },
    {
        id: 5,
        title: 'BSA 63: Electronic Evidence Guidelines',
        category: 'bns',
        source: 'Tech Law',
        time: '20 mins ago',
        content: 'इलेक्ट्रॉनिक सबूत की नई गाइडलाइंस जारी...'
    }
];

// ============================================================
// Load Live News
// ============================================================
function loadLiveNews() {
    const container = document.getElementById('live-news-container');
    if (!container) return;
    
    container.innerHTML = '';
    newsData.forEach(news => {
        const div = document.createElement('div');
        div.className = 'rss-feed-item';
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <div class="font-medium text-sm text-white">${news.title}</div>
                    <div class="text-xs text-slate-400">${news.source} · ${news.time}</div>
                    <div class="text-xs text-slate-500 mt-1">${news.content}</div>
                </div>
                <span class="rss-category-tag rss-cat-${news.category}">${news.category}</span>
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
    womenNews.forEach(news => {
        const div = document.createElement('div');
        div.className = 'border-b border-slate-700/50 py-1 last:border-0';
        div.innerHTML = `
            <div class="text-xs text-white">${news.title}</div>
            <div class="text-[10px] text-slate-400">${news.source} · ${news.time}</div>
        `;
        container.appendChild(div);
    });
}

// ============================================================
// Refresh News
// ============================================================
function refreshNews() {
    loadLiveNews();
    loadWomenNews();
}
