// api/feed.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ============================================
  // 10+ CATEGORIES FALLBACK DATA (50+ Headlines)
  // ============================================
  const FALLBACK_DATA = {
    // 1. Breaking News
    breaking: [
      { title: '🔴 BREAKING: Supreme Court issues notice on BNS 318 interpretation', source: 'LiveLaw' },
      { title: '🔴 BREAKING: New BNSS guidelines for bail applications released', source: 'Bar & Bench' },
      { title: '🔴 BREAKING: Lucknow HC hearing on Sonam Raja Raghuvanshi case today', source: 'SCC Online' },
      { title: '🔴 BREAKING: CERT-In issues urgent cyber fraud advisory', source: 'CERT-In' }
    ],
    
    // 2. Supreme Court
    sc: [
      { title: '⚖️ SC: BSA 63 certificate mandatory for electronic evidence', source: 'Supreme Court' },
      { title: '⚖️ SC: Right to Privacy upheld in landmark judgment', source: 'Supreme Court' },
      { title: '⚖️ SC: Right to Education Act - new guidelines issued', source: 'Supreme Court' },
      { title: '⚖️ SC: Speedy trial is fundamental right - new directions', source: 'Supreme Court' }
    ],
    
    // 3. Women News
    women: [
      { title: '👩 NALSA: Free legal aid for women - helpline 181 24x7', source: 'NALSA' },
      { title: '👩 Domestic Violence Act: New protections for women announced', source: 'Women Rights' },
      { title: '👩 Women Helpline 181 receives 50% more calls in 2024', source: 'Women News' },
      { title: '👩 SC: Maintenance rights for women expanded under BNSS 144', source: 'Family Law' },
      { title: '👩 POSH Act: New workplace harassment guidelines issued', source: 'Women Rights' }
    ],
    
    // 4. Entertainment Legal
    entertainment: [
      { title: '🎬 Actor wins defamation case - landmark judgment', source: 'Entertainment Law' },
      { title: '🎬 Copyright case: Music industry wins big in SC', source: 'Entertainment Law' },
      { title: '🎬 OTT platform regulations: New guidelines issued', source: 'Entertainment Law' },
      { title: '🎬 Celebrity privacy case: SC issues new directions', source: 'Entertainment Law' }
    ],
    
    // 5. Cyber News
    cyber: [
      { title: '💻 IT Act 2000: New cyber crime provisions effective', source: 'Cyber Law' },
      { title: '💻 CERT-In: UPI fraud alert - new modus operandi detected', source: 'CERT-In' },
      { title: '💻 Data protection: New rules for social media platforms', source: 'Cyber Law' },
      { title: '💻 Cyber fraud: 1930 helpline gets 50% more calls', source: 'CERT-In' }
    ],
    
    // 6. Hindi News
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
    
    // 7. Legal Updates
    legal: [
      { title: '📜 BNS 85: Cruelty by husband - new SC interpretation', source: 'Legal Update' },
      { title: '📜 BNSS 482: New anticipatory bail guidelines issued', source: 'Bar & Bench' },
      { title: '📜 BNSS 173: Police must register FIR for cognizable offences', source: 'Legal Update' },
      { title: '📜 BNS 318: Cheating cases - new evidentiary standards', source: 'Legal Update' }
    ],
    
    // 8. Bail & FIR
    bail_fir: [
      { title: '⛓️ BNSS 480: Magistrate bail powers expanded - new guidelines', source: 'Legal News' },
      { title: '⛓️ BNSS 482: Anticipatory bail - new SC guidelines', source: 'Bar & Bench' },
      { title: '📋 BNSS 173: FIR mandatory for cognizable offences - SC reiterates', source: 'LiveLaw' },
      { title: '📋 Zero FIR: New guidelines for inter-state complaints', source: 'Legal News' }
    ],
    
    // 9. Property & Civil
    property: [
      { title: '🏠 Property Dispute: SC guidelines for joint family property', source: 'Legal News' },
      { title: '🏠 Land Acquisition: New compensation rules issued', source: 'Property Law' },
      { title: '🏠 RERA: New protections for home buyers', source: 'Property Law' },
      { title: '🏠 Succession: Hindu Succession Act - new amendments', source: 'Property Law' }
    ],
    
    // 10. Consumer & RTI
    consumer: [
      { title: '🛒 Consumer Helpline 1800-11-4000 now 24x7 available', source: 'Consumer Affairs' },
      { title: '🛒 Consumer Protection Act: New e-commerce guidelines', source: 'Consumer Affairs' },
      { title: '📰 RTI Act: Transparency in government work - new rules', source: 'Legal Service' },
      { title: '📰 RTI: New deadlines for information disclosure', source: 'Legal Service' }
    ],
    
    // 11. RTO & Transport
    rto: [
      { title: '🚗 RTO: New vehicle registration rules effective from today', source: 'Transport Dept' },
      { title: '🚗 Traffic rules: New challan system implemented', source: 'Transport Dept' },
      { title: '🚗 Motor Vehicles Act: New penalties for violations', source: 'Transport Dept' }
    ],
    
    // 12. Family Law
    family: [
      { title: '👨‍👩‍👧 Family Court: Maintenance guidelines under BNSS 144', source: 'Family Law' },
      { title: '👨‍👩‍👧 Hindu Marriage Act: New divorce guidelines issued', source: 'Family Law' },
      { title: '👨‍👩‍👧 Child custody: SC issues new guidelines', source: 'Family Law' }
    ]
  };

  // ============================================
  // GET NEWS FROM ALL CATEGORIES
  // ============================================
  function getAllNews() {
    const allItems = [];
    const categories = Object.keys(FALLBACK_DATA);
    
    // Take 1-2 from each category
    categories.forEach(cat => {
      const items = FALLBACK_DATA[cat];
      // Randomly select 1-2 from each category
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(items.length, 2));
      selected.forEach(item => {
        allItems.push({
          ...item,
          category: cat
        });
      });
    });
    
    // Shuffle and return
    return allItems.sort(() => 0.5 - Math.random());
  }

  // ============================================
  // MAIN HANDLER
  // ============================================
  try {
    const allNews = getAllNews();
    
    // Get 10-12 items
    const items = allNews.slice(0, 12).map(item => ({
      title: item.title,
      source: item.source || 'Legal News',
      link: '#',
      pub: new Date().toLocaleTimeString(),
      category: item.category || 'general'
    }));

    return res.status(200).json({
      items: items,
      source: 'fallback',
      count: items.length,
      categories: Object.keys(FALLBACK_DATA),
      timestamp: new Date().toISOString(),
      message: '📢 10+ categories of legal news'
    });

  } catch (error) {
    // Emergency fallback
    const emergency = [
      { title: '⚖️ Supreme Court: BNS 318 hearing today', source: 'LiveLaw', category: 'sc' },
      { title: '📰 BNSS 173: New FIR guidelines', source: 'Bar & Bench', category: 'legal' },
      { title: '👩 Women Helpline 181 - 24x7', source: 'NALSA', category: 'women' },
      { title: '💻 CERT-In: Cyber fraud advisory', source: 'CERT-In', category: 'cyber' }
    ].map(item => ({
      ...item,
      link: '#',
      pub: new Date().toLocaleTimeString()
    }));

    return res.status(200).json({
      items: emergency,
      source: 'emergency',
      count: emergency.length,
      timestamp: new Date().toISOString()
    });
  }
}