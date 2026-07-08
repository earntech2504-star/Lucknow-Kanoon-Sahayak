// api/feed.js
export default async function handler(req, res) {
  // Allow GET only
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Function to fetch and parse RSS
  async function fetchRSS(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) return [];
      const text = await response.text();
      
      // Parse XML
      const items = [];
      const titleMatches = text.match(/<title>(.*?)<\/title>/g);
      const linkMatches = text.match(/<link>(.*?)<\/link>/g);
      const pubMatches = text.match(/<pubDate>(.*?)<\/pubDate>/g);
      
      if (titleMatches && titleMatches.length > 1) {
        for (let i = 1; i < Math.min(titleMatches.length, 6); i++) {
          const title = titleMatches[i].replace(/<[^>]*>/g, '').trim();
          const link = linkMatches && linkMatches[i] ? linkMatches[i].replace(/<[^>]*>/g, '').trim() : '#';
          const pub = pubMatches && pubMatches[i] ? new Date(pubMatches[i].replace(/<[^>]*>/g, '').trim()).toLocaleTimeString() : new Date().toLocaleTimeString();
          if (title) {
            items.push({ title, link, pub });
          }
        }
      }
      return items;
    } catch (e) {
      console.error('RSS fetch error:', e);
      return [];
    }
  }

  try {
    // Try to fetch real RSS
    const RSS_URLS = [
      'https://www.livelaw.in/rss',
      'https://www.barandbench.com/rss',
      'https://www.scconline.com/rss/feed'
    ];

    let allItems = [];
    
    for (const url of RSS_URLS) {
      const items = await fetchRSS(url);
      if (items.length > 0) {
        allItems = allItems.concat(items);
        break; // Stop after first successful feed
      }
    }

    // If we got items, return them
    if (allItems.length > 0) {
      // Limit to 10 items
      const items = allItems.slice(0, 10).map(item => ({
        title: item.title || 'No Title',
        source: 'RSS',
        link: item.link || '#',
        pub: item.pub || new Date().toLocaleTimeString()
      }));

      return res.status(200).json({
        items: items,
        source: 'rss',
        timestamp: new Date().toISOString()
      });
    }

    // If no RSS items, return fallback
    const fallbackFeeds = [
      '⚖️ SC: BNS 318 hearing today at 10:30 AM',
      '📰 Breaking: New BNSS guidelines for bail applications',
      '🔴 Live: Lucknow HC hearing on Sonam Raja Raghuvanshi case',
      '📢 CERT-In issues advisory on new cyber fraud modus operandi',
      '⚖️ Supreme Court: BSA 63 certificate mandatory for electronic evidence',
      '📜 BNSS 480 – Magistrate bail powers expanded',
      '👩 महिला हेल्पलाइन 181 – 24x7 उपलब्ध',
      '🛒 Consumer Helpline 1800-11-4000 – ऑनलाइन शिकायत'
    ];

    const fallbackItems = fallbackFeeds.map(title => ({
      title: title,
      source: 'Live Feed',
      link: '#',
      pub: new Date().toLocaleTimeString()
    }));

    return res.status(200).json({
      items: fallbackItems.slice(0, 6),
      source: 'fallback',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // If anything fails, return fallback
    const fallbackFeeds = [
      '⚖️ SC: BNS 318 hearing today at 10:30 AM',
      '📰 Breaking: New BNSS guidelines for bail applications',
      '🔴 Live: Lucknow HC hearing on Sonam Raja Raghuvanshi case',
      '📢 CERT-In issues advisory on new cyber fraud modus operandi',
      '⚖️ Supreme Court: BSA 63 certificate mandatory for electronic evidence',
      '📜 BNSS 480 – Magistrate bail powers expanded'
    ];

    const fallbackItems = fallbackFeeds.map(title => ({
      title: title,
      source: 'Live Feed',
      link: '#',
      pub: new Date().toLocaleTimeString()
    }));

    return res.status(200).json({
      items: fallbackItems,
      source: 'fallback',
      timestamp: new Date().toISOString()
    });
  }
}