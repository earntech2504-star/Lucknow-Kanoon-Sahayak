// ============================================================
// src/api/news.js - Complete Fixed with Fallback
// ============================================================

// ===== FALLBACK LEGAL NEWS DATA (Always Available) =====
const LEGAL_NEWS = [
    {
        id: 1,
        title: '⚖️ BNS, BNSS, BSA 1 July 2024 से लागू',
        desc: 'भारत के नए आपराधिक कानून - Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, Bharatiya Sakshya Adhiniyam पूरे देश में लागू',
        link: '#',
        date: '1 July 2024'
    },
    {
        id: 2,
        title: '📜 Supreme Court: FIR में BNSS 173 का पालन करें',
        desc: 'सुप्रीम कोर्ट ने कहा - सभी cognizable offences के लिए FIR BNSS 173 के तहत अनिवार्य है',
        link: '#',
        date: '15 July 2024'
    },
    {
        id: 3,
        title: '⚖️ Lucknow HC: Bail BNSS 480 के तहत जारी',
        desc: '"Bail is rule, jail is exception" - लखनऊ हाई कोर्ट ने regular bail की प्रक्रिया स्पष्ट की',
        link: '#',
        date: '18 July 2024'
    },
    {
        id: 4,
        title: '📢 DLSA: Free Legal Aid Camp 20 July को Lucknow में',
        desc: 'District Legal Services Authority free legal aid camp का आयोजन कर रही है - सभी नागरिक मुफ्त कानूनी सलाह ले सकते हैं',
        link: '#',
        date: '19 July 2024'
    },
    {
        id: 5,
        title: '🛡️ Women Helpline 181: 24x7 सेवा उपलब्ध',
        desc: 'महिला हेल्पलाइन 181 पर किसी भी प्रकार की harassment, domestic violence की शिकायत करें',
        link: '#',
        date: '20 July 2024'
    },
    {
        id: 6,
        title: '💻 Cyber Crime Helpline 1930: Online Fraud से बचाव',
        desc: 'साइबर क्राइम हेल्पलाइन 1930 - online fraud, hacking, cyber harassment की शिकायत करें',
        link: '#',
        date: '20 July 2024'
    },
    {
        id: 7,
        title: '⚖️ BNSS 482: Anticipatory Bail की नई गाइडलाइन',
        desc: 'सुप्रीम कोर्ट ने anticipatory bail के लिए नई guidelines जारी की - arrest से पहले bail ले सकते हैं',
        link: '#',
        date: '17 July 2024'
    },
    {
        id: 8,
        title: '📖 BSA 63: Electronic Evidence का नियम',
        desc: 'BSA 63 के तहत electronic evidence (emails, messages, CCTV) को court में सबूत के रूप में पेश करें',
        link: '#',
        date: '16 July 2024'
    },
    {
        id: 9,
        title: '🏠 Property Dispute: SDM Court में Stay Application',
        desc: 'Property dispute में तुरंत Revenue Court (SDM) में stay application file करें - dispossession रोकें',
        link: '#',
        date: '15 July 2024'
    },
    {
        id: 10,
        title: '👩 Domestic Violence Act 2005: Protection Order लें',
        desc: 'DV Act 2005 के तहत Protection Order, Residence Order, और Maintenance claim करें',
        link: '#',
        date: '14 July 2024'
    }
];

// ===== CACHE FOR NEWS =====
let newsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour

// ===== LOAD LIVE NEWS =====
function loadLiveNews() {
    const container = document.getElementById('live-container');
    if (!container) return;
    
    // Check cache first
    const now = Date.now();
    if (newsCache && (now - lastFetchTime) < CACHE_DURATION) {
        renderNews(container, newsCache);
        return;
    }
    
    // Show loading
    container.innerHTML = '<div class="text-slate-400 text-sm text-center py-4">⏳ Loading news...</div>';
    
    // Try to fetch from IndianKanoon
    fetchIndianKanoonNews(container);
}

// ===== FETCH FROM INDIANKANOON =====
async function fetchIndianKanoonNews(container) {
    try {
        // Multiple proxy attempts
        const proxies = [
            'https://api.allorigins.win/raw?url=',
            'https://corsproxy.io/?',
            'https://api.rss2json.com/v1/api.json?rss_url='
        ];
        
        const targetUrl = 'https://indiankanoon.org/feeds/updates';
        let success = false;
        
        for (const proxy of proxies) {
            try {
                const url = proxy + encodeURIComponent(targetUrl);
                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'application/rss+xml, application/xml, text/xml',
                        'Accept-Language': 'en-US,en;q=0.9'
                    },
                    signal: AbortSignal.timeout(5000)
                });
                
                if (response.ok) {
                    const text = await response.text();
                    if (text && text.includes('item')) {
                        parseRSS(text, container);
                        success = true;
                        break;
                    }
                }
            } catch (e) {
                console.log('Proxy failed:', proxy);
                continue;
            }
        }
        
        if (!success) {
            throw new Error('All proxies failed');
        }
        
    } catch (error) {
        console.log('⚠️ IndianKanoon fetch failed, using fallback:', error.message);
        // Use fallback data
        newsCache = LEGAL_NEWS;
        lastFetchTime = Date.now();
        renderNews(container, LEGAL_NEWS);
    }
}

// ===== PARSE RSS/XML =====
function parseRSS(xmlText, container) {
    try {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');
        const items = xml.querySelectorAll('item');
        
        if (items.length === 0) {
            throw new Error('No items in RSS');
        }
        
        const newsItems = [];
        let count = 0;
        
        items.forEach(item => {
            if (count >= 10) return;
            const title = item.querySelector('title')?.textContent || 'Legal Update';
            const link = item.querySelector('link')?.textContent || '#';
            const desc = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            
            newsItems.push({
                id: count + 1,
                title: title.replace(/<[^>]*>/g, '').trim(),
                desc: desc.replace(/<[^>]*>/g, '').substring(0, 150),
                link: link,
                date: pubDate ? new Date(pubDate).toLocaleDateString() : new Date().toLocaleDateString()
            });
            count++;
        });
        
        if (newsItems.length > 0) {
            newsCache = newsItems;
            lastFetchTime = Date.now();
            renderNews(container, newsItems);
        } else {
            throw new Error('No valid news items');
        }
        
    } catch (error) {
        console.log('RSS parse error:', error);
        newsCache = LEGAL_NEWS;
        lastFetchTime = Date.now();
        renderNews(container, LEGAL_NEWS);
    }
}

// ===== RENDER NEWS =====
function renderNews(container, items) {
    if (!items || items.length === 0) {
        items = LEGAL_NEWS;
    }
    
    // Shuffle and show 8 items
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 8);
    
    container.innerHTML = selected.map(item => `
        <div class="glass-card p-2 rounded-lg text-sm hover:border-orange-400 transition-all cursor-pointer mb-2">
            <div class="text-blue-400 font-medium">${item.title}</div>
            <p class="text-slate-400 text-xs mt-1">${item.desc}</p>
            <span class="text-slate-500 text-[10px] block mt-1">📅 ${item.date}</span>
        </div>
    `).join('');
}

// ===== LOAD WOMEN NEWS =====
function loadWomenNews() {
    const container = document.getElementById('women-news-container');
    if (!container) return;
    
    const womenNews = [
        { title: '👩 Nirbhaya Fund: ₹1000 करोड़ मंजूर', date: '20 Jul 2024', desc: 'महिला सुरक्षा के लिए नया फंड' },
        { title: '⚖️ SC: DV Act में live-in भी शामिल', date: '19 Jul 2024', desc: 'Indra Sarma v. V.K. Sarma (2013)' },
        { title: '📢 181 Helpline: 24x7 महिलाओं के लिए', date: '18 Jul 2024', desc: 'तुरंत सहायता के लिए कॉल करें' },
        { title: '🛡️ BNS 85: Cruelty का नया प्रावधान', date: '17 Jul 2024', desc: '3 years punishment' },
        { title: '⚖️ Fast Track Court: रेप केस में त्वरित सुनवाई', date: '16 Jul 2024', desc: 'BNS 64 के तहत' }
    ];
    
    container.innerHTML = womenNews.map(item => `
        <div class="flex flex-col py-1 border-b border-slate-700/30 text-xs">
            <span class="text-pink-300 font-medium">${item.title}</span>
            <span class="text-slate-400 text-[10px]">${item.desc}</span>
            <span class="text-slate-500 text-[9px]">${item.date}</span>
        </div>
    `).join('');
}

// ===== LOAD QUICK READS =====
function loadQuickReads() {
    const container = document.getElementById('quick-reads-container');
    if (!container) return;
    
    const reads = [
        { title: 'BNS 318 = IPC 420', desc: 'Cheating - 7 years' },
        { title: 'BNS 103 = IPC 302', desc: 'Murder - Death/Life' },
        { title: 'BNS 64 = IPC 375', desc: 'Rape - 10 years to Life' },
        { title: 'BNS 85 = IPC 498A', desc: 'Cruelty - 3 years' },
        { title: 'BNSS 173 = CrPC 154', desc: 'FIR - Mandatory' },
        { title: 'BNSS 480 = CrPC 437', desc: 'Regular Bail' },
        { title: 'BNSS 482 = CrPC 438', desc: 'Anticipatory Bail' },
        { title: 'BNSS 144 = CrPC 125', desc: 'Maintenance' },
        { title: 'BSA 63 = Evidence 65B', desc: 'Electronic Evidence' }
    ];
    
    container.innerHTML = reads.map(item => `
        <div class="glass-card p-1.5 rounded-lg text-xs hover:border-orange-400 transition-all mb-1">
            <span class="font-medium text-blue-300">${item.title}</span>
            <span class="text-slate-400 block text-[10px]">${item.desc}</span>
        </div>
    `).join('');
}

// ===== LOAD TRENDING TAGS =====
function loadTrendingTags() {
    const container = document.getElementById('trending-tags-container');
    if (!container) return;
    
    const tags = [
        'BNS', 'BNSS', 'BSA', 'FIR', 'Bail', 'Supreme Court',
        'Legal Aid', 'Women Rights', 'Cyber Crime', 'Maintenance',
        'Property Law', 'RTI', 'Dowry', 'DV Act', 'Nirbhaya'
    ];
    
    container.innerHTML = tags.map(tag => `
        <span class="filter-pill active text-xs px-2 py-1">#${tag}</span>
    `).join('');
}

// ===== EXPOSE FUNCTIONS =====
window.loadLiveNews = loadLiveNews;
window.loadWomenNews = loadWomenNews;
window.loadQuickReads = loadQuickReads;
window.loadTrendingTags = loadTrendingTags;

console.log('✅ news.js loaded with complete fallback');
