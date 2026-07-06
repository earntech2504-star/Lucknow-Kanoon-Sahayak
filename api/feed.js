// api/feed.js
export default async function handler(req, res) {
  // Allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const feeds = [
    '⚖️ Live: SC hearing on BNS 318 today at 10:30 AM',
    '📰 Breaking: New BNSS guidelines issued for bail applications',
    '🔴 Live: Lucknow HC hearing on Sonam Raja Raghuvanshi case',
    '📢 CERT-In issues advisory on new cyber fraud modus operandi',
    '⚖️ Supreme Court: BSA 63 certificate mandatory for electronic evidence',
    '📜 BNSS 480 – Magistrate bail powers expanded',
    '👩 महिला हेल्पलाइन 181 – 24x7 उपलब्ध',
    '🛒 Consumer Helpline 1800-11-4000 – ऑनलाइन शिकायत'
  ];

  const random = feeds[Math.floor(Math.random() * feeds.length)];
  const response = {
    text: random,
    source: 'Live Feed',
    timestamp: new Date().toISOString()
  };

  return res.status(200).json(response);
}