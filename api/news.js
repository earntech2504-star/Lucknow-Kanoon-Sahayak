// ===== src/api/news.js - Fixed with Fallback =====

// Fallback legal news data
const FALLBACK_NEWS = [
    { 
        id: 1,
        title: '⚖️ नए कानून 2024: BNS, BNSS, BSA 1 जुलाई से लागू',
        desc: 'भारत के नए आपराधिक कानून BNS (Bharatiya Nyaya Sanhita), BNSS (Bharatiya Nagarik Suraksha Sanhita) और BSA (Bharatiya Sakshya Adhiniyam) 1 जुलाई 2024 से पूरे देश में लागू हो गए हैं।',
        link: '#',
        date: '1 July 2024'
    },
    { 
        id: 2,
        title: '📜 SC: FIR में BNSS 173 का पालन अनिवार्य',
        desc: 'सुप्रीम कोर्ट ने कहा कि सभी cognizable offences के लिए FIR BNSS 173 के तहत अनिवार्य है। Police FIR नहीं तो Magistrate को आदेश देने का अधिकार है।',
        link: '#',
        date: '15 July 2024'
    },
    { 
        id: 3,
        title: '⚖️ Lucknow HC: Bail BNSS 480 के तहत जारी',
        desc: 'लखनऊ हाई कोर्ट ने एक मामले में BNSS 480 के तहत regular bail जारी किया। कोर्ट ने कहा कि "Bail is rule, jail is exception"।',
        link: '#',
        date: '18 July 2024'
    },
    { 
        id: 4,
        title: '📢 DLSA: Free Legal Aid Camp 20 July को',
        desc: 'District Legal Services Authority (DLSA) 20 July को free legal aid camp का आयोजन कर रही है। सभी नागरिक मुफ्त कानूनी सलाह ले सकते हैं।',
        link: '#',
        date: '19 July 2024'
    },
    { 
        id: 5,
        title: '🛡️ Women Helpline 181: 24x7 सेवा',
        desc: 'महिला हेल्पलाइन 181 24x7 उपलब्ध है। किसी भी प्रकार की harassment, domestic violence या अन्य समस्या पर तुरंत कॉल करें।',
        link: '#',
        date: '20 July 2024'
    },
    { 
        id: 6,
        title: '💻 Cyber Crime Helpline 1930: Online Fraud से बचाव',
        desc: 'साइबर क्राइम हेल्पलाइन 1930 पर किसी भी online fraud, hacking या cyber harassment की शिकायत करें।',
        link: '#',
        date: '20 July 2024'
    },
    { 
        id: 7,
        title: '⚖️ BNSS 482: Anticipatory Bail की नई गाइडलाइन',
        desc: 'सुप्रीम कोर्ट ने BNSS 482 के तहत anticipatory bail के लिए नई गाइडलाइन जारी की है। Arrest से पहले bail ले सकते हैं।',
        link: '#',
        date: '17 July 2024'
    },
    { 
        id: 8,
        title: '📖 BSA 63: Electronic Evidence का नियम',
        desc: 'BSA 63 के तहत electronic evidence (emails, messages, CCTV) को court में सबूत के रूप में पेश किया जा सकता है। Certificate अनिवार्य है।',
        link: '#',
        date: '16 July 2024'
    }
];

// ===== LOAD LIVE NEWS =====
function loadLiveNews() {
    const container = document.getElementById('live-container');
    if (!container) return;
    
    // Show loading state
    container.innerHTML = '<div class="text-slate-400 text-sm text-center py-4">⏳ Loading news...</div>';
    
    // Try to fetch from IndianKanoon
    fetchIndianKanoonNews(container);
}

async function fetchIndianKanoonNews(container) {
    try {
        // Try with proxy first
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = 'https://indiankanoon.org/feeds/updates';
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 5000
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        
        const text = await response.text();
        
        // Parse RSS/XML
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');
        
        if (items.length === 0) {
            throw new Error('No items found');
        }
        
        let html = '';
        let count = 0;
        items.forEach(item => {
            if (count >= 8) return;
            const title = item.querySelector('title')?.textContent || 'Legal Update';
            const link = item.querySelector('link')?.textContent || '#';
            const desc = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            
            html += `
                <div class="glass-card p-2 rounded-lg text-sm hover:border-orange-400 transition-all cursor-pointer">
                    <a href="${link}" target="_blank" class="text-blue-400 hover:text-blue-300 block">
                        <span class="font-medium">${title}</span>
                        ${desc ? `<p class="text-slate-400 text-xs mt-1">${desc.substring(0, 100)}${desc.length > 100 ? '...' : ''}</p>` : ''}
                        ${pubDate ? `<span class="text-slate-500 text-[10px] block mt-1">${new Date(pubDate).toLocaleDateString()}</span>` : ''}
                    </a>
                </div>
            `;
            count++;
        });
        
        if (html) {
            container.innerHTML = html;
        } else {
            throw new Error('No valid news items');
        }
        
    } catch (error) {
        console.log('⚠️ IndianKanoon feed error, using fallback:', error.message);
        loadFallbackNews(container);
    }
}

function loadFallbackNews(container) {
    // Shuffle and show 8 news items
    const shuffled = [...FALLBACK_NEWS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 8);
    
    container.innerHTML = selected.map(item => `
        <div class="glass-card p-2 rounded-lg text-sm hover:border-orange-400 transition-all cursor-pointer">
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
        { title: '👩 Nirbhaya Fund: ₹1000 करोड़ मंजूर', date: '20 Jul 2024' },
        { title: '⚖️ SC: DV Act में live-in भी शामिल', date: '19 Jul 2024' },
        { title: '📢 181 Helpline: 24x7 महिलाओं के लिए', date: '18 Jul 2024' },
        { title: '🛡️ BNS 85: Cruelty के लिए नया प्रावधान', date: '17 Jul 2024' },
        { title: '⚖️ Fast Track Court: रेप केस में त्वरित सुनवाई', date: '16 Jul 2024' }
    ];
    
    container.innerHTML = womenNews.map(item => `
        <div class="flex justify-between items-center py-1 border-b border-slate-700/30 text-xs">
            <span class="text-pink-300">${item.title}</span>
            <span class="text-slate-500">${item.date}</span>
        </div>
    `).join('');
}

// ===== LOAD QUICK READS =====
function loadQuickReads() {
    const container = document.getElementById('quick-reads-container');
    if (!container) return;
    
    const reads = [
        { title: 'BNS 318 = IPC 420 (Cheating)', desc: '7 years punishment' },
        { title: 'BNSS 173 = CrPC 154 (FIR)', desc: 'Mandatory for cognizable offences' },
        { title: 'BNSS 480 = CrPC 437 (Bail)', desc: 'Regular bail by Magistrate' },
        { title: 'BNSS 482 = CrPC 438 (Anticipatory Bail)', desc: 'Pre-arrest bail' },
        { title: 'BSA 63 = Evidence Act 65B', desc: 'Electronic evidence' }
    ];
    
    container.innerHTML = reads.map(item => `
        <div class="glass-card p-1.5 rounded-lg text-xs hover:border-orange-400 transition-all">
            <span class="font-medium text-blue-300">${item.title}</span>
            <span class="text-slate-400 block">${item.desc}</span>
        </div>
    `).join('');
}

// ===== LOAD TRENDING TAGS =====
function loadTrendingTags() {
    const container = document.getElementById('trending-tags-container');
    if (!container) return;
    
    const tags = ['#BNS', '#BNSS', '#BSA', '#FIR', '#Bail', '#SupremeCourt', '#LegalAid', '#WomenRights', '#CyberCrime', '#Maintenance', '#PropertyLaw', '#RTI'];
    
    container.innerHTML = tags.map(tag => `
        <span class="filter-pill active text-xs">${tag}</span>
    `).join('');
}

// ===== EXPOSE FUNCTIONS =====
window.loadLiveNews = loadLiveNews;
window.loadWomenNews = loadWomenNews;
window.loadQuickReads = loadQuickReads;
window.loadTrendingTags = loadTrendingTags;

console.log('✅ news.js loaded with fallback support');
