// api/feed.js
export default async function handler(req, res) {
  // Allow GET only
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const feeds = [
    '⚖️ SC: BNS 318 hearing today at 10:30 AM',
    '📰 Breaking: New BNSS guidelines for bail applications',
    '🔴 Live: Lucknow HC hearing on Sonam Raja Raghuvanshi case',
    '📢 CERT-In issues advisory on new cyber fraud modus operandi',
    '⚖️ Supreme Court: BSA 63 certificate mandatory for electronic evidence',
    '📜 BNSS 480 – Magistrate bail powers expanded',
    '👩 महिला हेल्पलाइन 181 – 24x7 उपलब्ध',
    '🛒 Consumer Helpline 1800-11-4000 – ऑनलाइन शिकायत'
  ];

  const random = feeds[Math.floor(Math.random() * feeds.length)];
  
  // Return in the format frontend expects
  const response = {
    items: [
      { title: random, source: 'Live Feed', pub: new Date().toLocaleTimeString() },
      { title: '⚖️ SC: BNS 318 hearing today', source: 'LiveLaw', pub: new Date().toLocaleTimeString() },
      { title: '📰 New BNSS guidelines for bail', source: 'Bar & Bench', pub: new Date().toLocaleTimeString() },
      { title: '🔴 Lucknow HC hearing today', source: 'SCC Online', pub: new Date().toLocaleTimeString() },
      { title: '📢 CERT-In: Cyber fraud advisory', source: 'CERT-In', pub: new Date().toLocaleTimeString() },
      { title: '👩 Women Helpline 181 – 24x7', source: 'NALSA', pub: new Date().toLocaleTimeString() }
    ],
    source: 'live',
    timestamp: new Date().toISOString()
  };

  return res.status(200).json(response);
}