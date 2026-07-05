// pages/api/news.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const API_KEY = process.env.NEWS_API_KEY;
    if (!API_KEY) {
      return res.status(400).json({ error: 'NEWS_API_KEY missing in .env.local' });
    }

    // ✅ Correct URL with backticks and correct domain
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=general&pageSize=10&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ error: data.message || 'News API error' });
    }
  } catch (error) {
    console.error('News API error:', error);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
}
