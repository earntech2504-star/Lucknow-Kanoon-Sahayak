// api/news.js – RSS First, then Rich Static Fallback (12 Categories, 50+ Headlines)
import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'Mozilla/5.0' }
});

// ============================================
// RICH STATIC FALLBACK (12 Categories, 50+ Headlines)
// Same as feed.js – used only if RSS fails
// ============================================
const FALLBACK_DATA = {
  breaking: [
    { title: '🔴 BREAKING: Supreme Court issues notice on BNS 318 interpretation', source: 'LiveLaw' },
    { title: '🔴 BREAKING: New BNSS guidelines for bail applications released', source: 'Bar & Bench' },
    { title: '🔴 BREAKING: Lucknow HC hearing on Sonam Raja Raghuvanshi case today', source: 'SCC Online' },
    { title: '🔴 BREAKING: CERT-In issues urgent cyber fraud advisory', source: 'CERT-In' }
  ],
  sc: [
    { title: '⚖️ SC: BSA 63 certificate mandatory for electronic evidence', source: 'Supreme Court' },
    { title: '⚖️ SC: Right to Privacy upheld in landmark judgment', source: 'Supreme Court' },
    { title: '⚖️ SC: Right to Education Act - new guidelines issued', source: 'Supreme Court' },
    { title: '⚖️ SC: Speedy trial is fundamental right - new directions', source: 'Supreme Court' }
  ],
  women: [
    { title: '👩 NALSA: Free legal aid for women - helpline 181 24x7', source: 'NALSA' },
    { title: '👩 Domestic Violence Act: New protections for women announced', source: 'Women Rights' },
    { title: '👩 Women Helpline 181 receives 50% more calls in 2024', source: 'Women News' },
    { title: '👩 SC: Maintenance rights for women expanded under BNSS 144', source: 'Family Law' },
    { title: '👩 POSH Act: New workplace harassment guidelines issued', source: 'Women Rights' }
  ],
  entertainment: [
    { title: '🎬 Actor wins defamation case - landmark judgment', source: 'Entertainment Law' },
    { title: '🎬 Copyright case: Music industry wins big in SC', source: 'Entertainment Law' },
    { title: '🎬 OTT platform regulations: New guidelines issued', source: 'Entertainment Law' },
    { title: '🎬 Celebrity privacy case: SC issues new directions', source: 'Entertainment Law' }
  ],
  cyber: [
    { title: '💻 IT Act 2000: New cyber crime provisions effective', source: 'Cyber Law' },
    { title: '💻 CERT-In: UPI fraud alert - new modus operandi detected', source: 'CERT-In' },
    { title: '💻 Data protection: New rules for social media platforms', source: 'Cyber Law' },
    { title: '💻 Cyber fraud: 1930 helpline gets 50% more calls', source: 'CERT-In' }
  ],
  hindi: [
    { title: '🇮🇳 सुप्रीम कोर्ट: BNS 318 पर सुनवाई आज - महत्वपूर्ण फैसला संभव', source: 'LiveLaw Hindi' },
    { title: '📰 BNSS 173: FIR दर्ज करने के नए नियम जारी - पुलिस को अनिवार्य', source: 'Bar & Bench Hindi' },
    { title: '🔴 लखनऊ हाईकोर्ट: सोनम राजा रघुवंशी केस पर आज सुनवाई', source: 'SCC Online Hindi' },
    { title: '📢 CERT-In: UPI और डिजिटल पेमेंट पर साइबर फ्रॉड से बचने की सलाह', source: 'CERT-In Hindi' },
    { title: '⚖️ SC: BSA 63 के तहत इलेक्ट्रॉनिक साक्ष्य अनिवार्य', source: 'Supreme Court Hindi' },
    { title: '📜 BNSS 480: मजिस्ट्रेट की जमानत शक्तियां बढ़ाई गईं', source: 'Legal News Hindi' },
    { title: '👩 NALSA: महिलाओं के लिए मुफ्त कानूनी सहायता - 181 हेल्पलाइन', source: 'NALSA Hindi' },
    { title: '🏠 संपत्ति विवाद: SC ने संयुक्त परिवार संपत्ति पर नए दिशानिर्देश', source: 'Legal News Hindi' }
  ],
  legal: [
    { title: '📜 BNS 85: Cruelty by husband - new SC interpretation', source: 'Legal Update' },
    { title: '📜 BNSS 482: New anticipatory bail guidelines issued', source: 'Bar & Bench' },
    { title: '📜 BNSS 173: Police must register FIR for cognizable offences', source: 'Legal Update' },
    { title: '📜 BNS 318: Cheating cases - new evidentiary standards', source: 'Legal Update' }
  ],
  bail_fir: [
    { title: '⛓️ BNSS 480: Magistrate bail powers expanded - new guidelines', source: 'Legal News' },
    { title: '⛓️ BNSS 482: Anticipatory bail - new SC guidelines', source: 'Bar & Bench' },
    { title: '📋 BNSS 173: FIR mandatory for cognizable offences - SC reiterates', source: 'LiveLaw' },
    { title: '📋 Zero FIR: New guidelines for inter-state complaints', source: 'Legal News' }
  ],
  property: [
    { title: '🏠 Property Dispute: SC guidelines for joint family property', source: 'Legal News' },
    { title: '🏠 Land Acquisition: New compensation rules issued', source: 'Property Law' },
    { title: '🏠 RERA: New protections for home buyers', source: 'Property Law' },
    { title: '🏠 Succession: Hindu Succession Act - new amendments', source: 'Property Law' }
  ],
  consumer: [
    { title: '🛒 Consumer Helpline 1800-11-4000 now 24x7 available', source: 'Consumer Affairs' },
    { title: '🛒 Consumer Protection Act: New e-commerce guidelines', source: 'Consumer Affairs' },
    { title: '📰 RTI Act: Transparency in government work - new rules', source: 'Legal Service' },
    { title: '📰 RTI: New deadlines for information disclosure', source: 'Legal Service' }
  ],
  rto: [
    { title: '🚗 RTO: New vehicle registration rules effective from today', source: 'Transport Dept' },
    { title: '🚗 Traffic rules: New challan system implemented', source: 'Transport Dept' },
    { title: '🚗 Motor Vehicles Act: New penalties for violations', source: 'Transport Dept' }
  ],
  family: [
    { title: '👨‍👩‍👧 Family Court: Maintenance guidelines under BNSS 144', source: 'Family Law' },
    { title: '👨‍👩‍👧 Hindu Marriage Act: New divorce guidelines issued', source: 'Family Law' },
    { title: '👨‍👩‍👧 Child custody: SC issues new guidelines', source: 'Family Law' }
  ]
};

// ============================================
// GET STATIC FALLBACK NEWS (from 12 categories)
// ============================================
function getStaticNews(categoryFilter) {
  const allItems = [];
  const categories = categoryFilter ? [categoryFilter] : Object.keys(FALLBACK_DATA);
  const validCats = categories.filter(cat => FALLBACK_DATA[cat]);
  const finalCats = validCats.length > 0 ? validCats : Object.keys(FALLBACK_DATA);
  
  finalCats.forEach(cat => {
    const items = FALLBACK_DATA[cat];
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(items.length, 3));
    selected.forEach(item => {
      allItems.push({
        ...item,
        category: cat,
        pubDate: new Date().toISOString(),
        link: '#'
      });
    });
  });
  
  return allItems.sort(() => 0.5 - Math.random());
}

// ============================================
// RSS SOURCES
// ============================================
const RSS_SOURCES = [
  { url: 'https://www.livelaw.in/rss', name: 'LiveLaw' },
  { url: 'https://www.barandbench.com/rss', name: 'Bar & Bench' },
  { url: 'https://www.scobserver.in/rss', name: 'SC Observer' },
  { url: 'https://www.legalserviceindia.com/rss', name: 'Legal Service India' },
  { url: 'https://www.scconline.com/rss', name: 'SCC Online' },
  { url: 'https://indiankanoon.org/rss/', name: 'Indian Kanoon' }
];

// ============================================
// DETECT CATEGORY FROM TITLE
// ============================================
function detectCategory(title) {
  const t = title.toLowerCase();
  if (t.includes('breaking') || t.includes('alert') || t.includes('urgent')) return 'breaking';
  if (t.includes('women') || t.includes('woman') || t.includes('girl') || t.includes('female') || t.includes('महिला')) return 'women';
  if (t.includes('sc') || t.includes('supreme court') || t.includes('सुप्रीम')) return 'sc';
  if (t.includes('cyber') || t.includes('online') || t.includes('fraud') || t.includes('साइबर')) return 'cyber';
  if (t.includes('entertainment') || t.includes('film') || t.includes('actor') || t.includes('movie')) return 'entertainment';
  if (t.includes('property') || t.includes('land') || t.includes('जमीन') || t.includes('संपत्ति')) return 'property';
  if (t.includes('consumer') || t.includes('उपभोक्ता')) return 'consumer';
  if (t.includes('rto') || t.includes('vehicle') || t.includes('traffic') || t.includes('कार')) return 'rto';
  if (t.includes('family') || t.includes('divorce') || t.includes('maintenance') || t.includes('तलाक')) return 'family';
  if (t.includes('bail') || t.includes('fir') || t.includes('जमानत') || t.includes('प्राथमिकी')) return 'bail_fir';
  if (t.includes('legal') || t.includes('law') || t.includes('कानून')) return 'legal';
  return 'general';
}

// ============================================
// MAIN HANDLER
// ============================================
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.query; // Optional category filter

  try {
    const allItems = [];
    let rssSuccess = false;

    // Fetch from all RSS sources
    for (const source of RSS_SOURCES) {
      try {
        const feed = await parser.parseURL(source.url);
        if (feed && feed.items && feed.items.length) {
          rssSuccess = true;
          const items = feed.items.slice(0, 5).map(item => ({
            title: item.title || 'No Title',
            description: (item.contentSnippet || item.content || '').slice(0, 200),
            link: item.link || '#',
            pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
            source: source.name,
            category: detectCategory(item.title || '')
          }));
          allItems.push(...items);
        }
      } catch (e) {
        console.warn(`Failed to fetch ${source.name}:`, e.message);
      }
    }

    // If RSS succeeded, process and return
    if (rssSuccess && allItems.length > 0) {
      // Sort by date
      allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      // Remove duplicates by title
      const seen = new Set();
      const unique = allItems.filter(item => {
        const key = item.title.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Filter by category if requested
      let resultItems = unique.slice(0, 25);
      if (category) {
        resultItems = resultItems.filter(item => item.category === category);
        // If no items in category, return some from fallback
        if (resultItems.length === 0) {
          const fallbackItems = getStaticNews(category);
          return res.status(200).json({
            items: fallbackItems.slice(0, 10),
            source: 'fallback-category',
            category: category,
            count: fallbackItems.length,
            timestamp: new Date().toISOString()
          });
        }
      }

      return res.status(200).json({
        items: resultItems,
        source: 'rss',
        count: resultItems.length,
        timestamp: new Date().toISOString()
      });
    }

    // If RSS failed completely, use rich static fallback
    console.log('RSS failed, using rich static fallback');
    const fallbackItems = getStaticNews(category);
    return res.status(200).json({
      items: fallbackItems.slice(0, 15),
      source: 'fallback-rich',
      count: fallbackItems.length,
      categories: Object.keys(FALLBACK_DATA),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('News fetch error:', error);
    
    // Emergency fallback
    const emergencyItems = getStaticNews(category);
    return res.status(200).json({
      items: emergencyItems.slice(0, 10),
      source: 'emergency',
      count: emergencyItems.length,
      timestamp: new Date().toISOString()
    });
  }
}