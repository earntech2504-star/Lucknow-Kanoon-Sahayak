// ============================================================
// FEED.JS - RSS & Blog Feed Management
// ============================================================

// ============================================================
// RSS Feed Data
// ============================================================
const rssFeeds = [
    {
        id: 1,
        title: 'Supreme Court: New Guidelines for Bail in NDPS Cases',
        category: 'breaking',
        source: 'Live Law',
        time: '2 mins ago',
        url: '#'
    },
    {
        id: 2,
        title: 'BNS 318: First Conviction Under New Cheating Law',
        category: 'breaking',
        source: 'Bar & Bench',
        time: '15 mins ago',
        url: '#'
    },
    {
        id: 3,
        title: 'SC: Women Can File Maintenance Under BNSS 144',
        category: 'women',
        source: 'Supreme Court Today',
        time: '1 hour ago',
        url: '#'
    },
    {
        id: 4,
        title: 'Cyber Crime: 1930 Helpline Received 50,000 Calls',
        category: 'cyber',
        source: 'Hindustan Times',
        time: '2 hours ago',
        url: '#'
    },
    {
        id: 5,
        title: 'BNSS 482: Anticipatory Bail in Cheating Cases',
        category: 'bns',
        source: 'Legal News',
        time: '3 hours ago',
        url: '#'
    },
    {
        id: 6,
        title: 'HC: Online Harassment Recognized as Criminal Offence',
        category: 'viral',
        source: 'India Today',
        time: '4 hours ago',
        url: '#'
    },
    {
        id: 7,
        title: 'SC: Landmark Judgment on Property Rights of Women',
        category: 'sc',
        source: 'The Hindu',
        time: '5 hours ago',
        url: '#'
    },
    {
        id: 8,
        title: 'BNS 103: Murder Conviction Reduced to 10 Years',
        category: 'breaking',
        source: 'Times of India',
        time: '6 hours ago',
        url: '#'
    },
    {
        id: 9,
        title: 'BNSS 173: FIR Mandatory for Cognizable Offences',
        category: 'bns',
        source: 'Legal News',
        time: '8 hours ago',
        url: '#'
    },
    {
        id: 10,
        title: 'BSA 63: Electronic Evidence Guidelines Issued',
        category: 'cyber',
        source: 'Tech Law',
        time: '10 hours ago',
        url: '#'
    }
];

// ============================================================
// Load RSS Feeds
// ============================================================
function loadRSSFeeds(filter = 'all') {
    const container = document.getElementById('rss-feed-container');
    if (!container) return;
    
    let feeds = rssFeeds;
    if (filter !== 'all') {
        feeds = rssFeeds.filter(f => f.category === filter);
    }
    
    container.innerHTML = '';
    feeds.forEach(feed => {
        const item = document.createElement('div');
        item.className = 'rss-feed-item';
        const categoryMap = {
            breaking: 'rss-cat-breaking',
            women: 'rss-cat-women',
            sc: 'rss-cat-sc',
            cyber: 'rss-cat-cyber',
            viral: 'rss-cat-viral',
            bns: 'rss-cat-bns'
        };
        const catClass = categoryMap[feed.category] || '';
        
        item.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="font-medium text-sm text-white">${feed.title}</div>
                    <div class="text-xs text-slate-400 mt-1">${feed.source} · ${feed.time}</div>
                </div>
                <span class="rss-category-tag ${catClass}">${feed.category}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// ============================================================
// Filter RSS
// ============================================================
function filterRSS(category) {
    document.querySelectorAll('#blog-rss .filter-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.filter === category);
    });
    loadRSSFeeds(category);
}

// ============================================================
// Refresh All Feeds
// ============================================================
function refreshAllFeeds() {
    loadRSSFeeds();
    loadSubmittedBlogs();
    updateLiveCounter();
}

// ============================================================
// Update Live Counter
// ============================================================
function updateLiveCounter() {
    const counter = document.getElementById('live-feed-counter');
    if (counter) {
        counter.textContent = rssFeeds.length;
    }
}

// ============================================================
// Submit Blog
// ============================================================
function submitBlog() {
    const name = document.getElementById('blog-author-name')?.value?.trim();
    const email = document.getElementById('blog-author-email')?.value?.trim();
    const title = document.getElementById('blog-title')?.value?.trim();
    const category = document.getElementById('blog-category')?.value;
    const content = document.getElementById('blog-content')?.value?.trim();
    const statusDiv = document.getElementById('blog-submit-status');
    
    // Validation
    if (!name || !email || !title || !category || !content) {
        if (statusDiv) {
            statusDiv.className = 'text-red-400 text-sm mt-1';
            statusDiv.textContent = '⚠️ कृपया सभी fields भरें।';
            statusDiv.classList.remove('hidden');
        }
        return;
    }
    
    if (content.split(' ').length < 10) {
        if (statusDiv) {
            statusDiv.className = 'text-red-400 text-sm mt-1';
            statusDiv.textContent = '⚠️ Minimum 10 words required.';
            statusDiv.classList.remove('hidden');
        }
        return;
    }
    
    // Save to localStorage
    const blogs = JSON.parse(localStorage.getItem('submittedBlogs') || '[]');
    const newBlog = {
        id: Date.now(),
        name,
        email,
        title,
        category,
        content,
        date: new Date().toISOString(),
        status: 'pending'
    };
    blogs.unshift(newBlog);
    localStorage.setItem('submittedBlogs', JSON.stringify(blogs));
    
    if (statusDiv) {
        statusDiv.className = 'text-green-400 text-sm mt-1';
        statusDiv.textContent = '✅ Blog submitted successfully!';
        statusDiv.classList.remove('hidden');
    }
    
    // Clear fields
    document.getElementById('blog-author-name').value = '';
    document.getElementById('blog-author-email').value = '';
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-category').value = '';
    document.getElementById('blog-content').value = '';
    
    loadSubmittedBlogs();
    updatePendingCounter();
}

// ============================================================
// Load Submitted Blogs
// ============================================================
function loadSubmittedBlogs() {
    const container = document.getElementById('submitted-blogs-container');
    if (!container) return;
    
    const blogs = JSON.parse(localStorage.getItem('submittedBlogs') || '[]');
    
    if (blogs.length === 0) {
        container.innerHTML = '<div class="text-slate-400 text-sm text-center py-4">📝 No blogs submitted yet.</div>';
        return;
    }
    
    container.innerHTML = '';
    blogs.slice(0, 10).forEach(blog => {
        const div = document.createElement('div');
        div.className = 'submitted-blog-item';
        const date = new Date(blog.date).toLocaleDateString();
        const statusMap = {
            pending: '⏳ Pending',
            approved: '✅ Approved',
            rejected: '❌ Rejected'
        };
        
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <div class="font-medium text-sm text-white">${blog.title}</div>
                    <div class="text-xs text-slate-400">By ${blog.name} · ${date}</div>
                </div>
                <span class="text-xs status-badge ${blog.status}">${statusMap[blog.status] || blog.status}</span>
            </div>
            <div class="text-xs text-slate-300 mt-1 line-clamp-2">${blog.content.substring(0, 100)}${blog.content.length > 100 ? '...' : ''}</div>
        `;
        container.appendChild(div);
    });
}

// ============================================================
// Update Pending Counter
// ============================================================
function updatePendingCounter() {
    const blogs = JSON.parse(localStorage.getItem('submittedBlogs') || '[]');
    const pending = blogs.filter(b => b.status === 'pending').length;
    const counter = document.getElementById('pending-blog-counter');
    if (counter) {
        counter.textContent = `📩 ${pending} Pending`;
    }
}
