// api/feed.js - Live feed updates
export default async function handler(req, res) {
    const feeds = [
        '⚖️ SC hearing on BNS 318 today at 10:30 AM',
        '📰 Breaking: New BNSS guidelines issued',
        '🔴 Live: Lucknow HC hearing on Sonam case',
        '📢 CERT-In issues advisory on cyber fraud'
    ];
    res.status(200).json({ 
        text: feeds[Math.floor(Math.random() * feeds.length)] 
    });
}