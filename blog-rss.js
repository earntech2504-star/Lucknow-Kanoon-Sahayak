// ============================================================
// BLOG-RSS.JS - Blog & RSS
// ============================================================

// RSS Feed data
const rssFeeds = [
    { id: 1, title: 'SC: New Guidelines for Bail in NDPS Cases', category: 'breaking', date: '2026-07-19' },
    { id: 2, title: 'BNS 318: First Conviction Under New Cheating Law', category: 'bns', date: '2026-07-18' },
    { id: 3, title: 'Women Can File Maintenance Under BNSS 144', category: 'women', date: '2026-07-17' },
    { id: 4, title: '1930 Helpline Received 50,000 Cyber Crime Calls', category: 'cyber', date: '2026-07-16' },
    { id: 5, title: 'BNSS 482: Anticipatory Bail in Cheating Cases', category: 'bnss', date: '2026-07-15' },
    { id: 6, title: 'Supreme Court Judgment on Property Rights', category: 'sc', date: '2026-07-14' },
    { id: 7, title: 'New Guidelines for Maintenance in Family Court', category: 'women', date: '2026-07-13' },
    { id: 8, title: 'Cyber Fraud Cases Increasing in Lucknow', category: 'cyber', date: '2026-07-12' }
];

// Load RSS feeds
function loadRSSFeeds() {
    const container = document.getElementById('rss-feed-container');
    if (!container) return;
    container.innerHTML = '';
    rssFeeds.forEach(feed => {
        const div = document.createElement('div');
        div.className = 'rss-feed-item';
        const categoryClass = {
            'breaking': 'rss-cat-breaking',
            'bns': 'rss-cat-bns',
            'bnss': 'rss-cat-bnss',
            'bsa': 'rss-cat-bns',
            'women': 'rss-cat-women',
            'cyber': 'rss-cat-cyber',
            'sc': 'rss-cat-sc',
            'viral': 'rss-cat-viral'
        };
        div.innerHTML = `
            <span class="rss-category-tag ${categoryClass[feed.category] || 'rss-cat-breaking'}">${feed.category.toUpperCase()}</span>
            <span class="text-sm">${feed.title}</span>
            <span class="text-xs text-slate-500 ml-2">${new Date(feed.date).toLocaleDateString()}</span>
        `;
        container.appendChild(div);
    });
}

// Submit blog
function submitBlogEnhanced() {
    const title = document.getElementById('blog-title');
    const content = document.getElementById('blog-content');
    const container = document.getElementById('submitted-blogs-container');
    
    if (!title || !content || !container) return;
    
    const titleVal = title.value.trim();
    const contentVal = content.value.trim();
    
    if (!titleVal || !contentVal) {
        alert('⚠️ Title और Content भरें।');
        return;
    }
    
    const blogs = JSON.parse(localStorage.getItem('submittedBlogs') || '[]');
    blogs.unshift({ 
        id: Date.now(), 
        title: titleVal, 
        content: contentVal, 
        date: new Date().toISOString() 
    });
    localStorage.setItem('submittedBlogs', JSON.stringify(blogs));
    loadSubmittedBlogs();
    title.value = '';
    content.value = '';
    alert('✅ Blog submitted!');
}

// Load submitted blogs
function loadSubmittedBlogs() {
    const container = document.getElementById('submitted-blogs-container');
    if (!container) return;
    const blogs = JSON.parse(localStorage.getItem('submittedBlogs') || '[]');
    container.innerHTML = '';
    blogs.slice(0, 10).forEach(b => {
        const div = document.createElement('div');
        div.className = 'text-xs text-slate-300 p-1 border-b border-slate-700';
        div.textContent = '📖 ' + b.title + ' - ' + new Date(b.date).toLocaleDateString();
        container.appendChild(div);
    });
}
