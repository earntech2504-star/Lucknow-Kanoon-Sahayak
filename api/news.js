// api/news.js - RSS Feed Aggregator
import axios from 'axios';
import { parseString } from 'xml2js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, limit = 20 } = req.query;

  try {
    const sources = [
      { url: 'https://www.livelaw.in/rss', defaultCategory: 'breaking' },
      { url: 'https://www.barandbench.com/rss', defaultCategory: 'sc' },
      { url: 'https://www.scconline.com/blog/feed', defaultCategory: 'sc' },
      { url: 'https://indiankanoon.org/feeds/updates', defaultCategory: 'breaking' },
      { url: 'https://www.hindustantimes.com/rss/india-news/legal/rssfeed.xml', defaultCategory: 'breaking' }
    ];

    let allItems = [];

    for (const source of sources) {
      try {
        const response = await axios.get(source.url, { timeout: 8000 });
        if (response.data) {
          const items = await parseRSS(response.data, source.defaultCategory);
          allItems = allItems.concat(items);
        }
      } catch (e) {
        console.log(`Error fetching ${source.url}:`, e.message);
      }
    }

    // Sort by date (newest first)
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Filter by category if provided
    if (category && category !== 'all') {
      allItems = allItems.filter(item => item.category === category);
    }

    // Limit results
    const limitedItems = allItems.slice(0, parseInt(limit));

    res.status(200).json({
      items: limitedItems,
      total: allItems.length,
      lastUpdate: new Date().toISOString(),
      status: 'success'
    });

  } catch (error) {
    console.error('News API error:', error);
    // Return fallback data
    res.status(200).json({
      items: [
        { title: '🔴 SC to hear BNS 318 challenge tomorrow', category: 'breaking', source: 'LiveLaw', pubDate: new Date().toISOString(), link: '#' },
        { title: '👩 Women Helpline 181 receives 5000+ calls this month', category: 'women', source: 'News18', pubDate: new Date().toISOString(), link: '#' },
        { title: '⚖️ Supreme Court issues guidelines on bail', category: 'sc', source: 'Bar & Bench', pubDate: new Date().toISOString(), link: '#' }
      ],
      status: 'fallback'
    });
  }
}

async function parseRSS(xml, defaultCategory) {
  return new Promise((resolve) => {
    parseString(xml, (err, result) => {
      if (err || !result) {
        resolve([]);
        return;
      }

      try {
        const items = result.rss?.channel?.[0]?.item || [];
        const parsed = items.map(item => ({
          title: item.title?.[0] || 'No Title',
          link: item.link?.[0] || '#',
          description: item.description?.[0] || '',
          pubDate: item.pubDate?.[0] || new Date().toISOString(),
          category: detectCategory(item.title?.[0] || '', defaultCategory),
          source: item.source?.[0]?._ || item['dc:creator']?.[0] || 'Legal News'
        }));
        resolve(parsed);
      } catch (e) {
        resolve([]);
      }
    });
  });
}

function detectCategory(title, defaultCategory) {
  const t = title.toLowerCase();
  if (t.includes('breaking') || t.includes('urgent') || t.includes('न्याय')) return 'breaking';
  if (t.includes('women') || t.includes('woman') || t.includes('महिला')) return 'women';
  if (t.includes('supreme court') || t.includes('sc') || t.includes('सुप्रीम')) return 'sc';
  if (t.includes('cyber') || t.includes('online') || t.includes('fraud') || t.includes('साइबर')) return 'cyber';
  if (t.includes('viral') || t.includes('वायरल')) return 'viral';
  if (t.includes('funny') || t.includes('humour') || t.includes('मजाक')) return 'funny';
  if (t.includes('entertainment') || t.includes('bollywood') || t.includes('मनोरंजन')) return 'entertainment';
  if (t.includes('political') || t.includes('election') || t.includes('राजनीति')) return 'political';
  if (t.includes('bns') || t.includes('bnss') || t.includes('bsa')) return 'bns';
  return defaultCategory || 'breaking';
}
