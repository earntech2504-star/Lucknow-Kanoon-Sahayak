// api/feed.js - Live scrolling feed with real news
export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Try to fetch real news from news.js endpoint
    try {
      const newsResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/news`);
      const newsData = await newsResponse.json();
      
      if (newsData.news && newsData.news.length > 0) {
        const randomNews = newsData.news[Math.floor(Math.random() * newsData.news.length)];
        return res.status(200).json({ 
          text: `📰 ${randomNews.title}`,
          source: randomNews.source,
          link: randomNews.link,
          timestamp: new Date().toISOString()
        });
      }
    } catch (fetchErr) {
      console.warn('Failed to fetch from news.js:', fetchErr.message);
    }

    // Fallback to static feeds
    const feeds = [
      '⚖️ SC hearing on BNS 318 today at 10:30 AM',
      '📰 Breaking: New BNSS guidelines issued for bail applications',
      '🔴 Live: Lucknow HC hearing on important case',
      '📢 CERT-In issues advisory on new cyber fraud modus operandi',
      '⚖️ Supreme Court: BSA 63 certificate mandatory for electronic evidence',
      '📢 New BNS 318 interpretation by SC - Intent to deceive required',
      '🔴 BNSS 480 bail guidelines updated by High Court',
      '⚖️ BNS 103: Rarest of rare test revisited by SC',
      '📢 BNSS 173: FIR registration mandatory for cognizable offences',
      '🔴 Women safety: New POCSO guidelines issued'
    ];
    
    res.status(200).json({ 
      text: feeds[Math.floor(Math.random() * feeds.length)],
      source: 'Static Feed',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Feed API error:', error);
    res.status(500).json({ 
      error: error.message,
      text: '⚖️ Legal updates coming soon...',
      timestamp: new Date().toISOString()
    });
  }
}
