// ============================================================
// api/ask.js - Zeenat AI Assistant with Court Info & Voice Support
// ============================================================

// ===== COMPLETE FALLBACK with ALL Sections & Court Info =====
function getFallbackAnswer(query, voiceMode = false) {
  const q = query.toLowerCase().trim();

  // ============================================================
  // 1. COMPLETE COURT INFORMATION (All Lucknow Courts)
  // ============================================================
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
    'hc lucknow': {
      name: 'Allahabad High Court – Lucknow Bench',
      location: 'Rana Pratap Marg, Lucknow, Uttar Pradesh - 226001',
      jurisdiction: 'Lucknow, Hardoi, Sitapur, Barabanki, Rae Bareli, Sultanpur, Faizabad, Gonda, Bahraich, Shravasti, Balrampur, Lakhimpur Kheri',
      head: 'Chief Justice of Allahabad HC',
      powers: 'Appellate, writ (Article 226), supervisory jurisdiction over subordinate courts.',
      website: 'https://www.allahabadhighcourt.in',
      contact: '0522-2237001'
    },
    'sessions court': {
      name: 'Sessions Court / District & Sessions Judge',
      location: 'District Headquarters',
      jurisdiction: 'Within the district (criminal trials)',
      head: 'Sessions Judge',
      powers: 'Trial of serious offences (murder, rape, etc.), appeals from Magistrates.',
      website: 'https://ecourts.gov.in',
      contact: '0522-2238001'
    },
    'cjm': {
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
      contact: '0522-2238001'
    },
    'sdm': {
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
    if (q.includes(key) || key.split(' ').some(word => q.includes(word))) {
      if (voiceMode) {
        return `${info.name}. Location: ${info.location}. Contact: ${info.contact}. More details available.`;
      }
      return `🏛️ **${info.name}**\n\n📍 **स्थान:** ${info.location}\n📌 **अधिकार क्षेत्र:** ${info.jurisdiction}\n👨‍⚖️ **प्रमुख:** ${info.head}\n⚖️ **शक्तियाँ:** ${info.powers}\n🌐 **वेबसाइट:** ${info.website}\n📞 **संपर्क:** ${info.contact}\n\n💡 **पूरी जानकारी के लिए Zeenat AI से पूछें या Official Website पर जाएँ।**`;
    }
  }

  // ============================================================
  // 2. BNS/BNSS/BSA SECTION LOOKUP
  // ============================================================
  const sectionLookup = {
    'bns 318': { act: 'BNS', number: '318', title: 'Cheating', text: '7 years imprisonment. IPC 420 replaced.', mnemonic: '🧠 3+1+8=12 → 7 years' },
    'bns 103': { act: 'BNS', number: '103', title: 'Murder', text: 'Death or Life imprisonment. IPC 302 replaced.', mnemonic: '🧠 1+0+3=4 → Death or Life' },
    'bns 303': { act: 'BNS', number: '303', title: 'Theft', text: '3 years imprisonment. IPC 379 replaced.', mnemonic: '🧠 3+0+3=6 → 3 years' },
    'bns 85': { act: 'BNS', number: '85', title: 'Cruelty', text: '3 years imprisonment. IPC 498A replaced.', mnemonic: '🧠 8+5=13 → 3 years' },
    'bns 64': { act: 'BNS', number: '64', title: 'Rape', text: '10 years minimum. IPC 375 replaced.', mnemonic: '🧠 6+4=10 → 10 years minimum' },
    'bns 65': { act: 'BNS', number: '65', title: 'Gang Rape', text: '20 years minimum. IPC 376 replaced.', mnemonic: '🧠 6+5=11 → 20 years minimum' },
    'bnss 173': { act: 'BNSS', number: '173', title: 'FIR', text: 'CrPC 154 replaced. FIR mandatory for cognizable offences.', mnemonic: '🧠 1+7+3=11 → FIR' },
    'bnss 480': { act: 'BNSS', number: '480', title: 'Regular Bail', text: 'CrPC 437 replaced. Magistrate can grant bail.', mnemonic: '🧠 4+8+0=12 → Bail' },
    'bnss 482': { act: 'BNSS', number: '482', title: 'Anticipatory Bail', text: 'CrPC 438 replaced. Pre-arrest bail from Sessions or HC.', mnemonic: '🧠 4+8+2=14 → Anticipatory Bail' },
    'bnss 144': { act: 'BNSS', number: '144', title: 'Maintenance', text: 'CrPC 125 replaced. Maintenance for wife, children, parents.', mnemonic: '🧠 1+4+4=9 → 9 months' },
    'bsa 63': { act: 'BSA', number: '63', title: 'Electronic Evidence', text: 'Evidence Act 65B replaced. Certificate mandatory.', mnemonic: '🧠 6+3=9 → Evidence' }
  };

  // Check if query contains a section number
  for (const [key, info] of Object.entries(sectionLookup)) {
    if (q.includes(key) || q.includes(key.replace(' ', ''))) {
      if (voiceMode) {
        return `${info.act} ${info.number}: ${info.title}. ${info.text}`;
      }
      return `📜 **${info.act} ${info.number} – ${info.title}**\n\n${info.text}\n${info.mnemonic || ''}\n\n⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
    }
  }

  // ============================================================
  // 3. TOPIC-BASED RESPONSES
  // ============================================================
  const responses = {
    'fir': {
      voice: "FIR के लिए BNSS 173 लागू है। पुलिस FIR दर्ज करना अनिवार्य है। Lalita Kumari case के अनुसार cognizable offence में FIR mandatory है।",
      full: `🔍 **Problem:** FIR दर्ज कराना

⚖️ **Legal Position:** BNSS 173 के तहत FIR दर्ज करना पुलिस का अनिवार्य कर्तव्य है। Cognizable offence में FIR mandatory है।

📋 **Steps:**
  ① SHO को लिखित शिकायत दें।
  ② SHO न करे → SP को complaint (BNSS 173(3))।
  ③ SP भी न करे → Magistrate (BNSS 175(3)) के पास जाएँ।

📜 **Sections:** BNSS 173, 175(3)
⚖️ **Case Law:** Lalita Kumari v. UOI (2014) – FIR mandatory
💡 **Tips:** सबूत सुरक्षित रखें, 24 घंटे में FIR copy लें
📞 **Helplines:** 100 – Police, 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`
    },
    'bail': {
      voice: "BNSS 480 Magistrate bail, BNSS 482 Anticipatory bail. Bail is rule, jail is exception. Satender Kumar Antil case guidelines.",
      full: `🔍 **Problem:** जमानत / Bail

⚖️ **Legal Position:** BNSS 480 (Magistrate bail), BNSS 482 (Anticipatory bail), BNSS 483 (Sessions/HC bail)

📋 **Steps:**
  ① अगर गिरफ्तारी का डर → BNSS 482 (Anticipatory) लें।
  ② अगर गिरफ्तार हैं और सज़ा 7 साल तक → BNSS 480 से bail।
  ③ गंभीर अपराध → BNSS 483 (Sessions/HC) में apply करें।

📜 **Sections:** BNSS 480, 482, 483
⚖️ **Case Law:** Satender Kumar Antil v. CBI (2022) – "Bail is rule, jail is exception"
💡 **Tips:** Surety + Bond तैयार रखें
📞 **Helplines:** 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`
    },
    'cheating': {
      voice: "BNS 318 Cheating – 7 साल तक सज़ा। Intent to deceive साबित करना ज़रूरी है। IPC 420 की जगह BNS 318।",
      full: `🔍 **Problem:** Cheating / धोखाधड़ी

⚖️ **Legal Position:** BNS 318 – Cheating (धोखाधड़ी)

📋 **Steps:**
  ① सबूत इकट्ठा करें (documents, messages, witnesses)
  ② FIR दर्ज कराएँ (BNSS 173)
  ③ Bail लें (BNSS 480)

📜 **Sections:** BNS 318 (7 years), BNSS 173 (FIR), BNSS 480 (Bail)
⚖️ **Case Law:** Satender Kumar Antil v. CBI (2022)
💡 **Tips:** Intent to deceive साबित करना ज़रूरी है
📞 **Helplines:** 100 – Police, 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`
    },
    'cyber': {
      voice: "Cyber fraud BNS 318 + IT Act के तहत। BSA 63 electronic evidence certificate mandatory। 1930 पर कॉल करें तुरंत।",
      full: `🔍 **Problem:** Cyber Crime / साइबर अपराध

⚖️ **Legal Position:** BNS 318 (Cheating) + IT Act 2000

📋 **Steps:**
  ① तुरंत 1930 पर कॉल करें (Cyber Crime Helpline)
  ② अपनी bank branch को inform करें
  ③ Cyber cell में complaint दर्ज कराएँ

📜 **Sections:** BNS 318, IT Act 2000, BSA 63 (Electronic Evidence)
⚖️ **Case Law:** Arjun Panditrao Khotkar v. State (2020)
💡 **Tips:** Screenshots लें, transaction details save करें
📞 **Helplines:** 1930 – Cyber Crime, 100 – Police

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`
    },
    'maintenance': {
      voice: "BNSS 144 Maintenance – पत्नी, बच्चे, माता-पिता हकदार। Rajnesh v. Neha guidelines apply।",
      full: `🔍 **Problem:** Maintenance / भरण-पोषण

⚖️ **Legal Position:** BNSS 144 – Maintenance (पत्नी, बच्चे, माता-पिता)

📋 **Steps:**
  ① Family Court में application दायर करें
  ② Income proof + expenses details जमा करें
  ③ Interim maintenance ले सकते हैं

📜 **Sections:** BNSS 144 (पुराना CrPC 125)
⚖️ **Case Law:** Rajnesh v. Neha (2021) – Maintenance guidelines
💡 **Tips:** Income, needs, lifestyle को ध्यान में रखा जाता है
📞 **Helplines:** 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`
    },
    'property': {
      voice: "Property dispute – Civil suit + criminal FIR यदि कब्ज़ा हो। SDM से stay ले सकते हैं।",
      full: `🔍 **Problem:** Property Dispute / संपत्ति विवाद

⚖️ **Legal Position:** Civil suit (title suit) + Criminal FIR (BNSS 173) यदि कब्ज़ा हो

📋 **Steps:**
  ① SDM से stay order लें (Revenue court)
  ② Civil court में title suit दायर करें
  ③ Criminal FIR दर्ज कराएँ (BNSS 173)

📜 **Sections:** BNSS 173, Specific Relief Act
⚖️ **Case Law:** A. Jayachandran v. State (2023)
💡 **Tips:** All documents (sale deed, mutation) सुरक्षित रखें
📞 **Helplines:** 100 – Police, 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`
    }
  };

  // Check topic matches
  for (const [key, response] of Object.entries(responses)) {
    if (q.includes(key)) {
      return voiceMode ? response.voice : response.full;
    }
  }

  // ============================================================
  // 4. DEFAULT RESPONSE
  // ============================================================
  if (voiceMode) {
    return `आपके प्रश्न "${query}" के लिए हमारे पास जानकारी है। कृपया Zeenat AI से पूछें या हमारे Legal Dictionary का उपयोग करें।`;
  }
  
  return `🔍 **आपका प्रश्न:** "${query}"

🌹 **Zeenat:** मैंने आपकी बात समझ ली है। इस विषय पर विस्तृत जानकारी के लिए कृपया:

📌 **अगले Steps:**
  ① Zeenat AI Voice tab पर जाएँ
  ② Smart Search का उपयोग करें
  ③ Legal Dictionary देखें
  ④ यदि तुरंत मदद चाहिए → 15100 पर कॉल करें

📞 **Emergency Helplines:**
  🚔 100 – Police
  👩 181 – Women Helpline
  💻 1930 – Cyber Crime
  ⚖️ 15100 – Legal Helpline

⚠️ **Disclaimer:** यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
}

// ===== API HANDLER =====
export default async function handler(req, res) {
  console.log('📨 /api/ask called');
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, date, tab, lang, voiceMode } = req.body || {};

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: 'Query is required' });
  }

  console.log('🔍 Query:', query);
  console.log('🎤 Voice Mode:', voiceMode);

  // Try to use Gemini if key is available
  const geminiKey = process.env.GEMINI_API_KEY;
  let answer = '';
  let sources = [];

  if (geminiKey) {
    try {
      console.log('🤖 Using Gemini API...');
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
                    text: `You are Zeenat, a legal assistant for Indian law (BNS/BNSS/BSA). 
                    
                    **IMPORTANT:** Keep responses CONCISE and POINT-WISE. Use this structure:
                    
                    🔍 Problem: [summarize the issue]
                    ⚖️ Legal Position: [key legal provision]
                    📋 Steps: [numbered list of practical steps]
                    📜 Sections: [relevant sections]
                    ⚖️ Case Law: [relevant case law]
                    💡 Tips: [practical tips]
                    📞 Helplines: [emergency numbers]
                    
                    ⚠️ Always add disclaimer: "यह सामान्य जानकारी है, कानूनी सलाह नहीं।"
                    
                    User query: ${query}
                    Context: date=${date || 'today'}, tab=${tab || 'general'}, lang=${lang || 'hi'}
                    
                    ${voiceMode ? 'Keep response very short and clear for voice output (max 100 words).' : ''}
                    
                    Respond in ${lang === 'hi' ? 'Hindi' : 'English/Hindi mix'}.`
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
        console.log('✅ Gemini response received');
      } else {
        throw new Error('No response from Gemini');
      }
    } catch (err) {
      console.error('❌ Gemini error:', err.message);
      answer = getFallbackAnswer(query, voiceMode);
      sources = ['Static Knowledge Base'];
    }
  } else {
    // No API key – use fallback
    console.log('ℹ️ No GEMINI_API_KEY, using fallback');
    answer = getFallbackAnswer(query, voiceMode);
    sources = ['Static Knowledge Base'];
  }

  // Ensure answer is never empty
  if (!answer || answer.trim().length === 0) {
    answer = 'क्षमा करें, मैं इस समय उत्तर नहीं दे पा रही हूँ। कृपया पुनः प्रयास करें।';
  }

  // If voice mode, return shorter version
  if (voiceMode) {
    const shortAnswer = answer.split('\n').slice(0, 4).join('\n');
    return res.status(200).json({ 
      success: true,
      answer: shortAnswer, 
      fullAnswer: answer,
      sources,
      voiceMode: true,
      timestamp: new Date().toISOString()
    });
  }

  return res.status(200).json({ 
    success: true,
    answer, 
    sources,
    timestamp: new Date().toISOString()
  });
}
