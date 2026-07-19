// ============================================================
// trending.js - Trending Topics API with Categories & Auto-Refresh
// ============================================================

// In-memory cache
let trendingCache = null;
let lastFetch = null;
const CACHE_DURATION = 300000; // 5 minutes

// Base trending topics (will be mixed with real data)
const BASE_TOPICS = [
    { topic: 'BNS 318 vs IPC 420 — Cheating', views: '12.5K', category: 'bns', icon: '⚖️', link: '#bns-318' },
    { topic: 'BNSS 173 — FIR process explained', views: '8.7K', category: 'bnss', icon: '📋', link: '#bnss-173' },
    { topic: 'Women Helpline 181 — Know your rights', views: '6.3K', category: 'women', icon: '👩', link: '#women-181' },
    { topic: 'Cyber fraud — How to report 1930', views: '5.1K', category: 'cyber', icon: '💻', link: '#cyber-1930' },
    { topic: 'SC landmark — Bail is rule', views: '4.8K', category: 'landmark', icon: '🏛️', link: '#bail' },
    { topic: 'Maintenance under BNSS 144', views: '3.9K', category: 'bnss', icon: '🏠', link: '#bnss-144' },
    { topic: 'BNS 103 — Murder punishment explained', views: '3.5K', category: 'bns', icon: '⚖️', link: '#bns-103' },
    { topic: 'BSA 63 — Electronic evidence rules', views: '3.2K', category: 'bsa', icon: '📄', link: '#bsa-63' },
    { topic: 'BNS 85 — Cruelty by husband', views: '2.9K', category: 'bns', icon: '💔', link: '#bns-85' },
    { topic: 'Supreme Court — Latest judgments', views: '2.7K', category: 'sc', icon: '🏛️', link: '#sc' },
    { topic: 'CERT-In — Cyber fraud advisory', views: '2.4K', category: 'cyber', icon: '🛡️', link: '#cert-in' },
    { topic: 'Property Dispute — Legal remedies', views: '2.1K', category: 'property', icon: '🏠', link: '#property' },
    { topic: 'BNSS 482 — Anticipatory bail guide', views: '1.9K', category: 'bnss', icon: '⛓️', link: '#bnss-482' },
    { topic: 'RTI Act — How to file application', views: '1.7K', category: 'rti', icon: '📋', link: '#rti' },
    { topic: 'Consumer Protection — File complaint', views: '1.5K', category: 'consumer', icon: '🛒', link: '#consumer' }
];

// Extended topics for different categories
const CATEGORY_TOPICS = {
    bns: [
        { topic: 'BNS 318 — Cheating punishment', views: '12.5K' },
        { topic: 'BNS 103 — Murder penalty', views: '8.7K' },
        { topic: 'BNS 303 — Theft laws', views: '6.3K' },
        { topic: 'BNS 85 — Cruelty by husband', views: '5.1K' },
        { topic: 'BNS 64 — Rape punishment', views: '4.8K' }
    ],
    bnss: [
        { topic: 'BNSS 173 — FIR registration', views: '8.7K' },
        { topic: 'BNSS 480 — Magistrate bail', views: '6.3K' },
        { topic: 'BNSS 482 — Anticipatory bail', views: '5.1K' },
        { topic: 'BNSS 144 — Maintenance', views: '3.9K' }
    ],
    bsa: [
        { topic: 'BSA 63 — Electronic evidence', views: '3.2K' },
        { topic: 'BSA 65 — Evidence admissibility', views: '2.1K' },
        { topic: 'BSA 27 — Confession to police', views: '1.8K' }
    ],
    women: [
        { topic: 'Women Helpline 181 — 24x7 support', views: '6.3K' },
        { topic: 'Domestic Violence Act — Protection', views: '5.1K' },
        { topic: 'POSH Act — Workplace safety', views: '4.2K' }
    ],
    cyber: [
        { topic: 'Cyber fraud — Report 1930', views: '5.1K' },
        { topic: 'IT Act 2000 — Cyber crimes', views: '3.8K' },
        { topic: 'CERT-In — Security advisory', views: '2.4K' }
    ]
};

// Get trending topics
function getTrendingTopics(category, limit = 10) {
    let topics = [...BASE_TOPICS];
    
    // If category specified, filter
    if (category && category !== 'all') {
        const catTopics = CATEGORY_TOPICS[category] || [];
        topics = topics.filter(t => t.category === category);
        // Add category specific topics
        catTopics.forEach(t => {
            if (!topics.some(existing => existing.topic === t.topic)) {
                topics.push({ ...t, category, icon: getCategoryIcon(category) });
            }
        });
    }
    
    // Shuffle and return
    const shuffled = topics.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, parseInt(limit));
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        bns: '⚖️',
        bnss: '📋',
        bsa: '📄',
        women: '👩',
        cyber: '💻',
        landmark: '🏛️',
        property: '🏠',
        rti: '📋',
        consumer: '🛒',
        sc: '🏛️'
    };
    return icons[category] || '📌';
}

// Main handler
export default async function handler(req, res) {
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { category, limit = 10, refresh } = req.query;

    try {
        // Check cache
        const now = Date.now();
        if (!trendingCache || (now - lastFetch) > CACHE_DURATION || refresh === 'true') {
            trendingCache = getTrendingTopics(category, limit);
            lastFetch = now;
        }

        // If category filter applied after cache
        let results = trendingCache;
        if (category && category !== 'all') {
            results = results.filter(t => t.category === category);
            if (results.length === 0) {
                results = getTrendingTopics(category, limit);
            }
        }

        // Sort by views (descending)
        results.sort((a, b) => {
            const viewsA = parseInt(a.views) || 0;
            const viewsB = parseInt(b.views) || 0;
            return viewsB - viewsA;
        });

        return res.status(200).json({
            items: results.slice(0, parseInt(limit)),
            total: results.length,
            lastUpdated: new Date(lastFetch).toISOString(),
            categories: Object.keys(CATEGORY_TOPICS),
            source: 'cache'
        });

    } catch (error) {
        console.error('Trending error:', error);
        // Emergency fallback
        return res.status(200).json({
            items: BASE_TOPICS.slice(0, 10),
            total: 10,
            lastUpdated: new Date().toISOString(),
            source: 'fallback'
        });
    }
}