// api/news.js
import Parser from 'rss-parser';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sources = [
    'https://www.livelaw.in/rss',
    'https://www.barandbench.com/rss',
    'https://www.scobserver.in/rss',
    'https://www.legalserviceindia.com/rss',
    'https://www.scconline.com/rss',
    'https://indiankanoon.org/rss/'
  ];

  try {
    const parser = new Parser();
    const allItems = [];

    for (const url of sources) {
      try {
        const feed = await parser.parseURL(url);
        if (feed.items && feed.items.length) {
          const items = feed.items.slice(0, 5).map(item => ({
            title: item.title || 'No Title',
            description: (item.contentSnippet || item.content || '').slice(0, 200),
            link: item.link || '#',
            pubDate: item.pubDate || new Date().toISOString(),
            source: feed.title || 'RSS'
          }));
          allItems.push(...items);
        }
      } catch (e) {
        console.warn(`Failed to fetch ${url}:`, e.message);
      }
    }

    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const seen = new Set();
    const unique = allItems.filter(item => {
      const key = item.title.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return res.status(200).json(unique.slice(0, 20));
  } catch (err) {
    console.error('News fetch error:', err);
    const fallback = [
      {
        title: 'Supreme Court: BNS 318 requires intent to deceive',
        description: 'SC held that mere failure to repay loan does not constitute cheating under BNS 318.',
        link: '#',
        pubDate: new Date().toISOString(),
        source: 'SCC Online'
      },
      {
        title: 'BNSS 480: Magistrate can grant bail for 7-year offences',
        description: 'High Court clarifies that BNSS 480 empowers Magistrate to grant bail.',
        link: '#',
        pubDate: new Date().toISOString(),
        source: 'LiveLaw'
      }
    ];
    return res.status(200).json(fallback);
  }
}