// api/feed.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get feed parameter (e.g., ?feed=livelaw)
  const feedParam = req.query.feed || 'all';

  // RSS Feed URLs
  const RSS_FEEDS = {
    livelaw: 'https://www.livelaw.in/rss',
    barandbench: 'https://www.barandbench.com/rss',
    scconline: 'https://www.scconline.com/rss/feed',
    legalservice: 'https://www.legalserviceindia.com/rss',
    hindustan: 'https://www.hindustantimes.com/rss/legal'
  };

  // Function to fetch and parse RSS
  async function fetchRSS(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) return [];
      const text = await response.text();
      
      // Parse XML
      const items = [];
      const titleMatch = text.match(/<title>(.*?)<\/title>/g);
      const linkMatch = text.match(/<link>(.*?)<\/link>/g);
      const pubMatch = text.match(/<pubDate>(.*?)<\/pubDate>/g);
      
      if (titleMatch && titleMatch.length > 1) {
        for (let i = 1; i < Math.min(titleMatch.length, 6); i++) {
          const title = titleMatch[i].replace(/<[^>]*>/g, '').trim();
          const link = linkMatch && linkMatch[i] ? linkMatch[i].replace(/<[^>]*>/g, '').trim() : '#';
          const pub = pubMatch && pubMatch[i] ? new Date(pubMatch[i].replace(/<[^>]*>/g, '').trim()).toLocaleTimeString() : new Date().toLocaleTimeString();
          items.push({ title, link, pub });
        }
      }
      return items;
    } catch (e) {
      return [];
    }
  }

  let allItems = [];

  if (feedParam === 'all') {
    // Fetch all feeds
    for (const [name, url] of Object.entries(RSS_FEEDS)) {
      const items = await fetchRSS(url);
      allItems.push(...items.map(item => ({ ...item, source: name })));
    }
  } else if (RSS_FEEDS[feedParam]) {
    // Fetch specific feed
    const items = await fetchRSS(RSS_FEEDS[feedParam]);
    allItems = items.map(item => ({ ...item, source: feedParam }));
  }

  // If no items, return fallback
  if (allItems.length === 0) {
    const fallback = [
      '⚖️ SC: BNS 318 interpretation pending',
      '📰 Breaking: New BNSS guidelines for bail',
      '🔴 Live: Lucknow HC hearing today',
      '📢 CERT-In: New cyber fraud advisory'
    ];
    return res.status(200).json({
      items: fallback.map((text, i) => ({
        title: text,
        source: 'Live Feed',
        link: '#',
        pub: new Date().toLocaleTimeString()
      })),
      source: 'fallback'
    });
  }

  return res.status(200).json({
    items: allItems.slice(0, 10),
    source: 'rss',
    timestamp: new Date().toISOString()
  });
}