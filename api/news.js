// api/news.js - Live legal news with News API + RSS fallback
export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    
    // 🆕 1. Try News API first (if key exists)
    if (NEWS_API_KEY) {
      try {
        const query = req.query.q || 'indian law OR supreme court OR high court OR BNS OR BNSS OR legal';
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${NEWS_API_KEY}`;

        const response = await fetch(url, {
          headers: {
            'User-Agent': 'LucknowKanoonSahayak/9.0',
            'Accept': 'application/json'
          }
        });

        const data = await response.json();

        if (data.status === 'ok' && data.articles && data.articles.length > 0) {
          const news = data.articles
            .filter(a => a.title && a.description)
            .slice(0, 15)
            .map(a => ({
              title: a.title,
              description: a.description || '',
              source: a.source?.name || 'News API',
              pubDate: a.publishedAt || new Date().toISOString(),
              link: a.url || '#',
              image: a.urlToImage || null,
              tags: ['Legal', 'India']
            }));

          console.log(`✅ News API: ${news.length} articles fetched`);
          return res.status(200).json({
            news,
            total: news.length,
            source: 'NewsAPI',
            lastUpdated: new Date().toISOString()
          });
        }
      } catch (newsApiErr) {
        console.warn('⚠️ News API failed:', newsApiErr.message);
      }
    }

    // 🆕 2. Try RSS feeds as fallback
    try {
      const rssNews = await fetchFromRSS();
      if (rssNews.length >= 4) {
        console.log(`✅ RSS fallback: ${rssNews.length} articles fetched`);
        return res.status(200).json({
          news: rssNews,
          total: rssNews.length,
          source: 'RSS',
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (rssErr) {
      console.warn('⚠️ RSS fallback failed:', rssErr.message);
    }

    // 🆕 3. Final fallback - static legal news
    const staticNews = [
      { 
        title: "Supreme Court: BNS 318 Cheating Requires Intent to Deceive", 
        description: "SC held that mere failure to repay loan doesn't constitute cheating under BNS 318. Intent to deceive at inception is essential.",
        source: "SCC Online", 
        pubDate: new Date().toISOString(),
        link: "https://www.scconline.com",
        tags: ["SC", "BNS 318", "Cheating"]
      },
      { 
        title: "BNSS 480: Magistrate Can Grant Bail in 7-Year Offences", 
        description: "High Court clarifies BNSS 480 empowers Magistrate to grant bail in offences punishable up to 7 years.",
        source: "LiveLaw", 
        pubDate: new Date().toISOString(),
        link: "https://www.livelaw.in",
        tags: ["BNSS 480", "Bail", "HC"]
      },
      { 
        title: "BSA 63: Certificate Under Section 63(4) Mandatory for Electronic Evidence", 
        description: "SC reiterates that without certificate under BSA 63(4), electronic evidence is inadmissible in court.",
        source: "Bar & Bench", 
        pubDate: new Date().toISOString(),
        link: "https://www.barandbench.com",
        tags: ["BSA 63", "Evidence", "SC"]
      },
      { 
        title: "Lucknow HC: New Guidelines for BNSS 482 Anticipatory Bail", 
        description: "Allahabad High Court (Lucknow Bench) issued comprehensive guidelines for anticipatory bail applications.",
        source: "LiveLaw", 
        pubDate: new Date().toISOString(),
        link: "https://www.livelaw.in",
        tags: ["BNSS 482", "Anticipatory Bail", "Lucknow HC"]
      },
      { 
        title: "CERT-In Advisory: New UPI Fraud Modus Operandi", 
        description: "CERT-In issued advisory about new UPI fraud techniques using fake payment requests.",
        source: "CERT-In", 
        pubDate: new Date().toISOString(),
        link: "https://www.cert-in.org.in",
        tags: ["Cyber", "UPI", "CERT-In"]
      },
      { 
        title: "BNS 103: SC Revisits Rarest of Rare Test for Death Penalty", 
        description: "Supreme Court reconsidering the application of rarest of rare doctrine in murder cases.",
        source: "Supreme Court Observer", 
        pubDate: new Date().toISOString(),
        link: "https://www.scobserver.in",
        tags: ["BNS 103", "Murder", "Death Penalty"]
      },
      { 
        title: "BNSS 173: Mandatory FIR Registration for Cognizable Offences", 
        description: "SC reaffirms Lalita Kumari judgment - police must register FIR for cognizable offences.",
        source: "Indian Kanoon", 
        pubDate: new Date().toISOString(),
        link: "https://indiankanoon.org",
        tags: ["BNSS 173", "FIR", "Police"]
      },
      { 
        title: "Women Safety: New Guidelines for POCSO Cases", 
        description: "High Court issues new guidelines for speedy trial in POCSO cases across India.",
        source: "LiveLaw", 
        pubDate: new Date().toISOString(),
        link: "https://www.livelaw.in",
        tags: ["Women Safety", "POCSO", "HC"]
      },
      { 
        title: "Cyber Crime: ₹500 Crore Fraud Busted by Delhi Police", 
        description: "Delhi Police busted major cyber crime racket involving fake investment apps.",
        source: "Bar & Bench", 
        pubDate: new Date().toISOString(),
        link: "https://www.barandbench.com",
        tags: ["Cyber Crime", "Fraud", "Delhi"]
      },
      { 
        title: "Family Court: Maintenance Guidelines Updated", 
        description: "SC updates guidelines for maintenance calculation under BNSS 144.",
        source: "SCC Online", 
        pubDate: new Date().toISOString(),
        link: "https://www.scconline.com",
        tags: ["Family", "Maintenance", "BNSS 144"]
      }
    ];

    console.log(`⚠️ Using static fallback: ${staticNews.length} articles`);
    return res.status(200).json({
      news: staticNews,
      total: staticNews.length,
      source: 'Static Fallback',
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ News API error:', error);
    res.status(500).json({ 
      error: error.message,
      news: [],
      total: 0
    });
  }
}

// Helper: Fetch from RSS feeds
async function fetchFromRSS() {
  const feeds = [
    { name: 'LiveLaw', url: 'https://www.livelaw.in/rss' },
    { name: 'Bar & Bench', url: 'https://www.barandbench.com/rss' },
    { name: 'SC Observer', url: 'https://www.scobserver.in/rss' }
  ];

  const allArticles = [];

  for (const feed of feeds) {
    try {
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
      const response = await fetch(proxyUrl, {
        headers: { 'Accept': 'application/json' }
      });
      
      const data = await response.json();
      
      if (data.status === 'ok' && data.items) {
        const articles = data.items.slice(0, 5).map(item => ({
          title: item.title || 'No Title',
          description: (item.description || '').replace(/<[^>]*>/g, '').slice(0, 200),
          source: feed.name,
          pubDate: item.pubDate || new Date().toISOString(),
          link: item.link || '#',
          tags: [feed.name]
        }));
        allArticles.push(...articles);
      }
    } catch (err) {
      console.warn(`RSS fetch failed for ${feed.name}:`, err.message);
    }
  }

  return allArticles.slice(0, 15);
}
