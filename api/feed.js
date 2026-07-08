// api/feed.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ============================================
  // 1. RSS SOURCES (12+ with Hindi & Legal Categories)
  // ============================================
  const RSS_SOURCES = [
    // English Legal News
    { name: 'LiveLaw', url: 'https://www.livelaw.in/rss', category: 'legal' },
    { name: 'Bar & Bench', url: 'https://www.barandbench.com/rss', category: 'legal' },
    { name: 'SCC Online', url: 'https://www.scconline.com/rss/feed', category: 'legal' },
    { name: 'Legal Service India', url: 'https://www.legalserviceindia.com/rss', category: 'legal' },
    { name: 'Hindustan Times - Legal', url: 'https://www.hindustantimes.com/rss/legal', category: 'legal' },
    { name: 'The Hindu - Law', url: 'https://www.thehindu.com/news/national/?service=rss', category: 'legal' },
    
    // Hindi News - Legal & General
    { name: 'BBC Hindi', url: 'https://www.bbc.com/hindi/india/rss.xml', category: 'hindi' },
    { name: 'NDTV India', url: 'https://www.ndtv.com/rss/news', category: 'hindi' },
    { name: 'Aaj Tak', url: 'https://www.aajtak.in/rss.xml', category: 'hindi' },
    { name: 'News18 Hindi', url: 'https://hindi.news18.com/rss/latest.xml', category: 'hindi' },
    
    // Women & Entertainment Legal
    { name: 'Women News', url: 'https://www.newindianexpress.com/rss/women', category: 'women' },
    { name: 'Entertainment Legal', url: 'https://www.hollywoodreporter.com/rss', category: 'entertainment' },
    { name: 'CERT-In Cyber', url: 'https://www.cert-in.org.in/rss', category: 'cyber' },
    
    // Supreme Court & Judgments
    { name: 'SC Observer', url: 'https://www.scobserver.in/rss', category: 'sc' }
  ];

  // ============================================
  // 2. SMART FALLBACK DATA (25+ Headlines - Hindi + English)
  // ============================================
  const FALLBACK_DATA = [
    // English Legal
    { title: '⚖️ Supreme Court: BNS 318 interpretation pending - key hearing today', source: 'LiveLaw', category: 'sc' },
    { title: '📰 BNSS 173: New mandatory guidelines for FIR registration issued', source: 'Bar & Bench', category: 'legal' },
    { title: '🔴 Lucknow HC: Sonam Raja Raghuvanshi case - next hearing scheduled', source: 'SCC Online', category: 'legal' },
    { title: '📢 CERT-In: New cyber fraud advisory for UPI and digital payments', source: 'CERT-In', category: 'cyber' },
    { title: '⚖️ SC: BSA 63 certificate now mandatory for electronic evidence', source: 'Supreme Court', category: 'sc' },
    { title: '📜 BNSS 480: Magistrate bail powers expanded - new guidelines', source: 'Legal News', category: 'legal' },
    { title: '📰 BNSS 482: New anticipatory bail guidelines issued', source: 'Bar & Bench', category: 'legal' },
    { title: '⚖️ SC: Right to Privacy upheld in landmark judgment', source: 'Supreme Court', category: 'sc' },
    
    // Women & Entertainment Legal
    { title: '👩 NALSA: Free legal aid for women - helpline 181 24x7', source: 'NALSA', category: 'women' },
    { title: '👩 Domestic Violence Act: New protections for women announced', source: 'Women Rights', category: 'women' },
    { title: '🎬 Entertainment Legal: Actor wins defamation case - landmark judgment', source: 'Entertainment Law', category: 'entertainment' },
    { title: '👩 Women Helpline 181 receives 50% more calls in 2024', source: 'Women News', category: 'women' },
    { title: '🎬 Copyright case: Music industry wins big in SC', source: 'Entertainment Law', category: 'entertainment' },
    
    // Hindi Legal News
    { title: '🇮🇳 सुप्रीम कोर्ट: BNS 318 पर सुनवाई आज - महत्वपूर्ण फैसला आज', source: 'LiveLaw Hindi', category: 'hindi' },
    { title: '📰 BNSS 173: FIR दर्ज करने के नए नियम जारी', source: 'Bar & Bench Hindi', category: 'hindi' },
    { title: '🔴 लखनऊ हाईकोर्ट: सोनम राजा रघुवंशी केस पर आज सुनवाई', source: 'SCC Online Hindi', category: 'hindi' },
    { title: '📢 CERT-In: UPI और डिजिटल पेमेंट पर साइबर फ्रॉड से बचने की सलाह', source: 'CERT-In Hindi', category: 'hindi' },
    { title: '⚖️ SC: BSA 63 के तहत इलेक्ट्रॉनिक साक्ष्य अनिवार्य', source: 'Supreme Court Hindi', category: 'hindi' },
    { title: '📜 BNSS 480: मजिस्ट्रेट की जमानत शक्तियां बढ़ाई गईं', source: 'Legal News Hindi', category: 'hindi' },
    { title: '👩 NALSA: महिलाओं के लिए मुफ्त कानूनी सहायता - 181 हेल्पलाइन 24x7', source: 'NALSA Hindi', category: 'hindi' },
    { title: '🏠 संपत्ति विवाद: SC ने संयुक्त परिवार संपत्ति पर नए दिशानिर्देश जारी किए', source: 'Legal News Hindi', category: 'hindi' },
    { title: '👨‍👩‍👧 परिवार न्यायालय: BNSS 144 के तहत भरण-पोषण के नए नियम', source: 'Family Law Hindi', category: 'hindi' },
    { title: '🚗 RTO: नए वाहन पंजीकरण नियम लागू', source: 'Transport Dept Hindi', category: 'hindi' },
    
    // More Legal Updates
    { title: '📜 BNS 85: पति द्वारा क्रूरता - SC की नई व्याख्या', source: 'Legal Update', category: 'bns' },
    { title: '💻 IT Act 2000: साइबर अपराधों के लिए नए प्रावधान लागू', source: 'Cyber Law', category: 'cyber' },
    { title: '⚖️ SC: शिक्षा के अधिकार पर नए दिशानिर्देश', source: 'Supreme Court', category: 'sc' },
    { title: '📰 RTI Act: सरकारी कार्यों में पारदर्शिता - नए नियम', source: 'Legal Service', category: 'legal' }
  ];

  // ============================================
  // 3. RSS FETCH FUNCTION
  // ============================================
  async function fetchRSS(url, sourceName) {
    try {
      const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        `https://corsproxy.io/?${encodeURIComponent(url)}`,
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
      ];

      for (const proxyUrl of proxies) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          
          const response = await fetch(proxyUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          
          if (!response.ok) continue;
          const text = await response.text();
          
          const items = [];
          const titleMatches = text.match(/<title>(.*?)<\/title>/g);
          const linkMatches = text.match(/<link>(.*?)<\/link>/g);
          const pubMatches = text.match(/<pubDate>(.*?)<\/pubDate>/g);
          const descMatches = text.match(/<description>(.*?)<\/description>/g);
          
          if (titleMatches && titleMatches.length > 1) {
            for (let i = 1; i < Math.min(titleMatches.length, 8); i++) {
              let title = titleMatches[i].replace(/<[^>]*>/g, '').trim();
              title = title.replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim();
              
              if (title && title.length > 5 && !title.includes('DOCTYPE')) {
                const link = linkMatches && linkMatches[i] ? 
                  linkMatches[i].replace(/<[^>]*>/g, '').trim() : '#';
                const pub = pubMatches && pubMatches[i] ? 
                  new Date(pubMatches[i].replace(/<[^>]*>/g, '').trim()).toLocaleTimeString() : 
                  new Date().toLocaleTimeString();
                const desc = descMatches && descMatches[i] ? 
                  descMatches[i].replace(/<[^>]*>/g, '').trim() : '';
                
                const category = detectCategory(title + ' ' + desc);
                
                items.push({ title, link, pub, source: sourceName, category, description: desc.slice(0, 150) });
              }
            }
          }
          
          if (items.length > 0) {
            return items;
          }
        } catch (e) {
          continue;
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // ============================================
  // 4. CATEGORY DETECTION (Enhanced)
  // ============================================
  function detectCategory(text) {
    const t = text.toLowerCase();
    if (t.includes('breaking') || t.includes('alert') || t.includes('urgent') || t.includes('ताजा')) return 'breaking';
    if (t.includes('women') || t.includes('woman') || t.includes('girl') || t.includes('female') || t.includes('महिला') || t.includes('नारी')) return 'women';
    if (t.includes('sc') || t.includes('supreme court') || t.includes('judgment') || t.includes('सुप्रीम') || t.includes('फैसला')) return 'sc';
    if (t.includes('cyber') || t.includes('online') || t.includes('fraud') || t.includes('hacking') || t.includes('साइबर')) return 'cyber';
    if (t.includes('viral') || t.includes('trending') || t.includes('popular') || t.includes('ट्रेंड')) return 'viral';
    if (t.includes('entertainment') || t.includes('actor') || t.includes('movie') || t.includes('film') || t.includes('मनोरंजन')) return 'entertainment';
    if (t.includes('bns') || t.includes('bnss') || t.includes('bsa')) return 'bns';
    if (t.includes('bail') || t.includes('जमानत')) return 'bail';
    if (t.includes('fir') || t.includes('police') || t.includes('पुलिस')) return 'fir';
    if (t.includes('hindi') || t.includes('हिंदी')) return 'hindi';
    return 'general';
  }

  // ============================================
  // 5. FETCH ALL RSS
  // ============================================
  async function fetchAllRSS() {
    const allItems = [];
    const results = await Promise.allSettled(
      RSS_SOURCES.map(async (source) => {
        try {
          const items = await fetchRSS(source.url, source.name);
          if (items.length > 0) {
            return items.map(item => ({
              ...item,
              source: source.name,
              category: item.category || source.category || detectCategory(item.title)
            }));
          }
          return [];
        } catch {
          return [];
        }
      })
    );

    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        allItems.push(...result.value);
      }
    });

    return allItems;
  }

  // ============================================
  // 6. MAIN HANDLER
  // ============================================
  try {
    const rssItems = await fetchAllRSS();

    if (rssItems.length > 0) {
      // Remove duplicates
      const seen = new Set();
      const uniqueItems = rssItems.filter(item => {
        const key = item.title.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Ensure all categories have representation
      const categorized = { breaking: [], women: [], sc: [], cyber: [], entertainment: [], legal: [], hindi: [], general: [] };
      
      uniqueItems.forEach(item => {
        const cat = item.category || 'general';
        if (categorized[cat]) {
          categorized[cat].push(item);
        } else {
          categorized['general'].push(item);
        }
      });

      // Build final list - at least 2 from each category if available
      let finalItems = [];
      for (const cat of ['breaking', 'women', 'sc', 'cyber', 'entertainment', 'legal', 'hindi']) {
        const items = categorized[cat] || [];
        finalItems = finalItems.concat(items.slice(0, 2));
      }
      
      // Add remaining items
      const remaining = uniqueItems.filter(item => !finalItems.includes(item));
      finalItems = finalItems.concat(remaining);

      const items = finalItems.slice(0, 12).map(item => ({
        title: item.title || 'No Title',
        source: item.source || 'RSS Feed',
        link: item.link || '#',
        pub: item.pub || new Date().toLocaleTimeString(),
        category: item.category || detectCategory(item.title || '')
      }));

      return res.status(200).json({
        items: items,
        source: 'rss',
        count: items.length,
        categories: Object.keys(categorized).filter(k => categorized[k].length > 0),
        timestamp: new Date().toISOString(),
        message: `✅ ${items.length} news from multiple RSS sources`
      });
    }

    // ============================================
    // 7. FALLBACK - Smart curated news
    // ============================================
    const shuffled = [...FALLBACK_DATA].sort(() => 0.5 - Math.random());
    const fallbackItems = shuffled.slice(0, 10).map(item => ({
      title: item.title,
      source: item.source,
      link: '#',
      pub: new Date().toLocaleTimeString(),
      category: item.category || detectCategory(item.title)
    }));

    return res.status(200).json({
      items: fallbackItems,
      source: 'fallback',
      count: fallbackItems.length,
      timestamp: new Date().toISOString(),
      message: '📢 Curated legal news (RSS unavailable)'
    });

  } catch (error) {
    // ============================================
    // 8. EMERGENCY FALLBACK
    // ============================================
    const emergencyItems = FALLBACK_DATA.slice(0, 8).map(item => ({
      title: item.title,
      source: item.source,
      link: '#',
      pub: new Date().toLocaleTimeString(),
      category: item.category || detectCategory(item.title)
    }));

    return res.status(200).json({
      items: emergencyItems,
      source: 'emergency',
      count: emergencyItems.length,
      timestamp: new Date().toISOString(),
      message: '⚠️ Emergency fallback'
    });
  }
}