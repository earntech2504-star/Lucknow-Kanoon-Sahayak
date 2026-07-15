// api/ask.js – Enhanced with detailed court info (backward compatible)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, date, tab, lang } = req.body || {};

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Try to use Gemini if key is available
  const geminiKey = process.env.GEMINI_API_KEY;
  let answer = '';
  let sources = [];

  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a legal assistant for Indian law (BNS/BNSS/BSA). Answer in Hindi/English mix. 
                    User query: ${query}
                    Context: date=${date || 'today'}, tab=${tab || 'general'}, lang=${lang || 'hi'}
                    Provide a detailed, structured answer with sections, case laws, and practical steps.`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        answer = data.candidates[0].content.parts[0].text;
        sources = ['Gemini AI'];
      } else {
        throw new Error('No response from Gemini');
      }
    } catch (err) {
      console.error('Gemini error:', err.message);
      // fallback to static response
      answer = getFallbackAnswer(query);
      sources = ['Static Knowledge Base'];
    }
  } else {
    // No API key – use fallback
    answer = getFallbackAnswer(query);
    sources = ['Static Knowledge Base'];
  }

  // Ensure answer is never empty
  if (!answer || answer.trim().length === 0) {
    answer = 'क्षमा करें, मैं इस समय उत्तर नहीं दे पा रही हूँ। कृपया पुनः प्रयास करें।';
  }

  return res.status(200).json({ answer, sources });
}

// ---------- Enhanced Fallback with Court Details ----------
function getFallbackAnswer(query) {
  const q = query.toLowerCase().trim();

  // ----- Detailed Court Information (New) -----
  const courtInfo = {
    'supreme court': {
      name: 'Supreme Court of India',
      location: 'New Delhi',
      jurisdiction: 'Whole of India',
      head: 'Chief Justice of India (CJI)',
      powers: 'Final court of appeal, writ jurisdiction (Article 32), review and curative petitions.',
      website: 'https://www.sci.gov.in',
      contact: '011-23388921'
    },
    'hc lucknow bench': {
      name: 'Allahabad High Court – Lucknow Bench',
      location: 'Lucknow, Uttar Pradesh',
      jurisdiction: 'Districts of Uttar Pradesh (Lucknow division)',
      head: 'Chief Justice of Allahabad HC',
      powers: 'Appellate, writ (Article 226), supervisory jurisdiction over subordinate courts.',
      website: 'https://www.allahabadhighcourt.in',
      contact: '0522-2238001'
    },
    'sessions court': {
      name: 'Sessions Court / District & Sessions Judge',
      location: 'District Headquarters',
      jurisdiction: 'Within the district (criminal trials)',
      head: 'Sessions Judge',
      powers: 'Trial of serious offences (murder, rape, etc.), appeals from Magistrates.',
      website: 'https://ecourts.gov.in',
      contact: 'Contact District Court'
    },
    'cjm hazratganj': {
      name: 'Chief Judicial Magistrate (CJM) – Hazratganj, Lucknow',
      location: 'Hazratganj, Lucknow',
      jurisdiction: 'Lucknow district (criminal cases)',
      head: 'CJM',
      powers: 'Trial of minor offences, preliminary hearings, bail (BNSS 480), remand.',
      website: 'https://ecourts.gov.in',
      contact: '0522-2238001'
    },
    'family court': {
      name: 'Family Court, Lucknow',
      location: 'Lucknow, Uttar Pradesh',
      jurisdiction: 'Matrimonial disputes, maintenance, child custody.',
      head: 'Principal Judge, Family Court',
      powers: 'Divorce, maintenance (BNSS 144), custody, guardianship.',
      website: 'https://ecourts.gov.in',
      contact: '0522-2238001'
    },
    'drt': {
      name: 'Debt Recovery Tribunal (DRT)',
      location: 'Lucknow (or nearest DRT)',
      jurisdiction: 'Recovery of debts due to banks and financial institutions (above ₹20 lakh)',
      head: 'Presiding Officer',
      powers: 'Adjudicate recovery applications, issue recovery certificates.',
      website: 'https://drt.gov.in',
      contact: 'Contact DRT Lucknow'
    },
    'sdm sadar': {
      name: 'Sub-Divisional Magistrate (SDM) – Sadar, Lucknow',
      location: 'Sadar, Lucknow',
      jurisdiction: 'Revenue matters, land disputes, maintenance under BNSS 144, public peace.',
      head: 'SDM',
      powers: 'Revenue courts, land acquisition, maintenance orders, preventive detention.',
      website: 'https://upsdc.gov.in',
      contact: '0522-2238001'
    },
    'tehsildar': {
      name: 'Tehsildar Office, Lucknow',
      location: 'Tehsil headquarters',
      jurisdiction: 'Revenue administration, mutation, land records.',
      head: 'Tehsildar',
      powers: 'Land record maintenance, mutation, revenue recovery, rent matters.',
      website: 'https://upbhulekh.gov.in',
      contact: '0522-2238001'
    },
    'consumer forum': {
      name: 'District Consumer Disputes Redressal Commission, Lucknow',
      location: 'Lucknow, Uttar Pradesh',
      jurisdiction: 'Consumer complaints up to ₹50 lakh',
      head: 'President (District Consumer Commission)',
      powers: 'Hear consumer disputes, award compensation, recall orders.',
      website: 'https://consumerhelpline.gov.in',
      contact: '1800-11-4000'
    }
  };

  // Check if query matches any court name
  for (const [key, info] of Object.entries(courtInfo)) {
    if (q.includes(key) || key.includes(q)) {
      return `🏛️ **${info.name}**\n\n📍 **स्थान:** ${info.location}\n📌 **अधिकार क्षेत्र:** ${info.jurisdiction}\n👨‍⚖️ **प्रमुख:** ${info.head}\n⚖️ **शक्तियाँ:** ${info.powers}\n🌐 **वेबसाइट:** ${info.website}\n📞 **संपर्क:** ${info.contact}\n\n💡 **पूरी जानकारी के लिए Zeenat AI से पूछें या Official Website पर जाएँ।**`;
    }
  }

  // ----- All existing fallback responses (unchanged) -----
  if (q.includes('fir')) {
    return `FIR के लिए BNSS 173 लागू है। यदि पुलिस FIR नहीं लिखती तो SP या Magistrate (BNSS 175(3)) के पास जाएँ। SC का Lalita Kumari (2014) का निर्णय महत्वपूर्ण है।`;
  } else if (q.includes('bail') || q.includes('जमानत')) {
    return `BNSS 480 (Magistrate bail), BNSS 482 (Anticipatory bail), BNSS 483 (Sessions/HC bail)। Satender Kumar Antil (2022) के अनुसार "bail is rule, jail is exception"।`;
  } else if (q.includes('cheating') || q.includes('धोखा')) {
    return `BNS 318 (Cheating) – 7 साल तक की सज़ा। Intent to deceive ज़रूरी है।`;
  } else if (q.includes('cyber') || q.includes('online')) {
    return `Cyber fraud BNS 318 + IT Act के तहत। BSA 63 (electronic evidence) के लिए certificate mandatory है। 1930 पर कॉल करें।`;
  } else if (q.includes('maintenance') || q.includes('भरण')) {
    return `BNSS 144 (Maintenance) – पत्नी, बच्चे, माता-पिता हकदार। Rajnesh v. Neha (2021) guidelines।`;
  } else if (q.includes('property') || q.includes('जमीन')) {
    return `Property dispute – Civil suit (title suit) + criminal FIR (BNSS 173) यदि कब्ज़ा हो। SDM से stay ले सकते हैं।`;
  } else if (q.includes('women') || q.includes('महिला')) {
    return `महिला अधिकार: BNS 85 (cruelty), Domestic Violence Act, POSH Act, Equal Remuneration Act, Hindu Succession Act, BNSS 144 (maintenance), Maternity Benefit Act। 181 helpline।`;
  } else if (q.includes('consumer') || q.includes('उपभोक्ता')) {
    return `Consumer Protection Act 2019 – 6 अधिकार। District/State/National Consumer Commission में शिकायत करें।`;
  } else {
    return `आपके प्रश्न "${query}" के लिए हमारे पास जानकारी है। कृपया Zeenat AI से पूछें (Voice AI tab) या हमारे Dictionary/Search का उपयोग करें।`;
  }
}