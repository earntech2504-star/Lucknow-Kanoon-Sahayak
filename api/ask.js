// ============================================================
// ask.js - Zeenat AI Assistant with Court Info & Voice Support
// ============================================================

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, date, tab, lang, voiceMode } = req.body || {};

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
      } else {
        throw new Error('No response from Gemini');
      }
    } catch (err) {
      console.error('Gemini error:', err.message);
      answer = getFallbackAnswer(query, voiceMode);
      sources = ['Static Knowledge Base'];
    }
  } else {
    // No API key – use fallback
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
      answer: shortAnswer, 
      fullAnswer: answer,
      sources,
      voiceMode: true
    });
  }

  return res.status(200).json({ answer, sources });
}

// ---------- ENHANCED FALLBACK with Court Details ----------
function getFallbackAnswer(query, voiceMode = false) {
  const q = query.toLowerCase().trim();

  // ============================================
  // 1. DETAILED COURT INFORMATION
  // ============================================
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
    },
    'high court': {
      name: 'Allahabad High Court – Lucknow Bench',
      location: 'Lucknow, Uttar Pradesh',
      jurisdiction: 'Entire state of Uttar Pradesh',
      head: 'Chief Justice',
      powers: 'Appellate jurisdiction, writ jurisdiction, supervisory jurisdiction.',
      website: 'https://www.allahabadhighcourt.in',
      contact: '0522-2238001'
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

  // ============================================
  // 2. EXISTING LEGAL QUERY HANDLERS (Enhanced)
  // ============================================
  
  // FIR related queries
  if (q.includes('fir') || q.includes('प्राथमिकी') || q.includes('report') || q.includes('दर्ज')) {
    if (voiceMode) {
      return "FIR के लिए BNSS 173 लागू है। पुलिस FIR दर्ज करना अनिवार्य है। Lalita Kumari case के अनुसार cognizable offence में FIR mandatory है।";
    }
    return `🔍 **Problem:** FIR दर्ज कराना

⚖️ **Legal Position:** BNSS 173 के तहत FIR दर्ज करना पुलिस का अनिवार्य कर्तव्य है। Cognizable offence में FIR mandatory है।

📋 **Steps:**
  ① SHO को लिखित शिकायत दें।
  ② SHO न करे → SP को complaint (BNSS 173(3))।
  ③ SP भी न करे → Magistrate (BNSS 175(3)) के पास जाएँ।

📜 **Sections:** BNSS 173, 175(3)
⚖️ **Case Law:** Lalita Kumari v. UOI (2014) – FIR mandatory
💡 **Tips:** सबूत सुरक्षित रखें, 24 घंटे में FIR copy लें
📞 **Helplines:** 100 – Police, 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // Bail related queries
  if (q.includes('bail') || q.includes('जमानत') || q.includes('release') || q.includes('रिहाई')) {
    if (voiceMode) {
      return "BNSS 480 Magistrate bail, BNSS 482 Anticipatory bail. Bail is rule, jail is exception. Satender Kumar Antil case guidelines.";
    }
    return `🔍 **Problem:** जमानत / Bail

⚖️ **Legal Position:** BNSS 480 (Magistrate bail), BNSS 482 (Anticipatory bail), BNSS 483 (Sessions/HC bail)

📋 **Steps:**
  ① अगर गिरफ्तारी का डर → BNSS 482 (Anticipatory) लें।
  ② अगर गिरफ्तार हैं और सज़ा 7 साल तक → BNSS 480 से bail।
  ③ गंभीर अपराध → BNSS 483 (Sessions/HC) में apply करें।

📜 **Sections:** BNSS 480, 482, 483
⚖️ **Case Law:** Satender Kumar Antil v. CBI (2022) – "Bail is rule, jail is exception"
💡 **Tips:** Surety + Bond तैयार रखें, Grounds: निर्दोषता, जाँच में सहयोग
📞 **Helplines:** 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // Cheating related queries
  if (q.includes('cheating') || q.includes('धोखा') || q.includes('fraud') || q.includes('धोखाधड़ी') || q.includes('318')) {
    if (voiceMode) {
      return "BNS 318 Cheating – 7 साल तक सज़ा। Intent to deceive साबित करना ज़रूरी है। IPC 420 की जगह BNS 318।";
    }
    return `🔍 **Problem:** Cheating / धोखाधड़ी

⚖️ **Legal Position:** BNS 318 – Cheating (धोखाधड़ी)

📋 **Steps:**
  ① सबूत इकट्ठा करें (documents, messages, witnesses)
  ② FIR दर्ज कराएँ (BNSS 173)
  ③ Bail लें (BNSS 480)

📜 **Sections:** BNS 318 (7 years), BNSS 173 (FIR), BNSS 480 (Bail)
⚖️ **Case Law:** Satender Kumar Antil v. CBI (2022)
💡 **Tips:** Intent to deceive साबित करना ज़रूरी है
📞 **Helplines:** 100 – Police, 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // Cyber crime related queries
  if (q.includes('cyber') || q.includes('online') || q.includes('साइबर') || q.includes('hack') || q.includes('फ्रॉड') || q.includes('1930')) {
    if (voiceMode) {
      return "Cyber fraud BNS 318 + IT Act के तहत। BSA 63 electronic evidence certificate mandatory। 1930 पर कॉल करें तुरंत।";
    }
    return `🔍 **Problem:** Cyber Crime / साइबर अपराध

⚖️ **Legal Position:** BNS 318 (Cheating) + IT Act 2000

📋 **Steps:**
  ① तुरंत 1930 पर कॉल करें (Cyber Crime Helpline)
  ② अपनी bank branch को inform करें
  ③ Cyber cell में complaint दर्ज कराएँ

📜 **Sections:** BNS 318, IT Act 2000, BSA 63 (Electronic Evidence)
⚖️ **Case Law:** Arjun Panditrao Khotkar v. State (2020)
💡 **Tips:** Screenshots लें, transaction details save करें
📞 **Helplines:** 1930 – Cyber Crime, 100 – Police

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // Maintenance related queries
  if (q.includes('maintenance') || q.includes('भरण') || q.includes('पोषण') || q.includes('144') || q.includes('crpc 125')) {
    if (voiceMode) {
      return "BNSS 144 Maintenance – पत्नी, बच्चे, माता-पिता हकदार। Rajnesh v. Neha guidelines apply।";
    }
    return `🔍 **Problem:** Maintenance / भरण-पोषण

⚖️ **Legal Position:** BNSS 144 – Maintenance (पत्नी, बच्चे, माता-पिता)

📋 **Steps:**
  ① Family Court में application दायर करें
  ② Income proof + expenses details जमा करें
  ③ Interim maintenance ले सकते हैं

📜 **Sections:** BNSS 144 (पुराना CrPC 125)
⚖️ **Case Law:** Rajnesh v. Neha (2021) – Maintenance guidelines
💡 **Tips:** Income, needs, lifestyle को ध्यान में रखा जाता है
📞 **Helplines:** 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // Property related queries
  if (q.includes('property') || q.includes('जमीन') || q.includes('जमीन') || q.includes('land') || q.includes('संपत्ति')) {
    if (voiceMode) {
      return "Property dispute – Civil suit + criminal FIR यदि कब्ज़ा हो। SDM से stay ले सकते हैं।";
    }
    return `🔍 **Problem:** Property Dispute / संपत्ति विवाद

⚖️ **Legal Position:** Civil suit (title suit) + Criminal FIR (BNSS 173) यदि कब्ज़ा हो

📋 **Steps:**
  ① SDM से stay order लें (Revenue court)
  ② Civil court में title suit दायर करें
  ③ Criminal FIR दर्ज कराएँ (BNSS 173)

📜 **Sections:** BNSS 173, Specific Relief Act
⚖️ **Case Law:** A. Jayachandran v. State (2023)
💡 **Tips:** All documents (sale deed, mutation) सुरक्षित रखें
📞 **Helplines:** 100 – Police, 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // Women rights related queries
  if (q.includes('women') || q.includes('महिला') || q.includes('wife') || q.includes('पत्नी') || q.includes('181')) {
    if (voiceMode) {
      return "महिला अधिकार: BNS 85 cruelty, Domestic Violence Act, POSH Act, BNSS 144 maintenance, Maternity Benefit Act। 181 helpline 24x7।";
    }
    return `🔍 **Problem:** महिला अधिकार / Women Rights

⚖️ **Legal Position:** BNS 85 (Cruelty), Domestic Violence Act 2005, POSH Act 2013, BNSS 144 (Maintenance)

📋 **Steps:**
  ① घरेलू हिंसा → 181 (Women Helpline) या Police (100) को call करें।
  ② कार्यस्थल पर उत्पीड़न → POSH Act के तहत ICC में complain करें।
  ③ दहेज उत्पीड़न → BNS 85 के तहत FIR दर्ज कराएँ।

📜 **Sections:** BNS 85, DV Act, POSH Act, BNSS 144, Hindu Succession Act
⚖️ **Case Law:** Vishakha v. State (1997) – workplace harassment
💡 **Tips:** 181 – 24x7 Women Helpline, DLSA से free legal aid लें
📞 **Helplines:** 181 – Women Helpline, 100 – Police, 15100 – Legal Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // Consumer related queries
  if (q.includes('consumer') || q.includes('उपभोक्ता') || q.includes('customer') || q.includes('शिकायत')) {
    if (voiceMode) {
      return "Consumer Protection Act 2019 – District/State/National Consumer Commission में शिकायत करें। Helpline 1800-11-4000।";
    }
    return `🔍 **Problem:** Consumer Complaint / उपभोक्ता शिकायत

⚖️ **Legal Position:** Consumer Protection Act 2019

📋 **Steps:**
  ① सबूत इकट्ठा करें (bills, receipts, communication)
  ② District Consumer Commission में complaint दायर करें
  ③ Amount: ₹50 lakh तक District, ₹1 करोड़ तक State, ₹1 करोड़ से अधिक National

📜 **Sections:** Consumer Protection Act 2019
⚖️ **Case Law:** Spring Meadows Hospital v. Harjol (1998)
💡 **Tips:** 6 अधिकार: Safety, Choice, Information, Heard, Redressal, Education
📞 **Helplines:** 1800-11-4000 – Consumer Helpline

⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं।`;
  }

  // RTO related queries
  if (q.includes('rto') || q.includes('vehicle') || q.includes('गाड़ी') || q.includes('car') || q.includes('bike') || q.includes('traffic')) {
    if (voiceMode) {
      return "RTO office – Vehicle registration, driving license, challan। Motor Vehicles Act 1988। Transport Department में जाएँ।";
    }
    return `🚗 **RTO / Traffic Information**

📍 **RTO Office:** Transport Department, Lucknow
📋 **Services:** Vehicle Registration, Driving License, Challan, Fitness Certificate
📜 **Law:** Motor Vehicles Act 1988
🌐 **Website:** https://parivahan.gov.in
📞 **Contact:** 0522-2238001

💡 **Tips:**
  - All documents (RC, DL, Insurance) always carry
  - Challan pay online
  - Driving test की तैयारी करें

⚠️ यह सामान्य जानकारी है। RTO office contact करें।`;
  }

  // RTI related queries
  if (q.includes('rti') || q.includes('information') || q.includes('जानकारी') || q.includes('right to information')) {
    if (voiceMode) {
      return "RTI Act 2005 – सरकारी विभागों से जानकारी माँगने का अधिकार। First Appeal, Second Appeal process।";
    }
    return `📋 **RTI – Right to Information Act 2005**

⚖️ **Law:** Right to Information Act 2005

📋 **Steps:**
  ① RTI application online/offline दायर करें
  ② 30 दिन में जवाब मिलना चाहिए
  ③ जवाब न मिले → First Appeal (30 दिन)
  ④ Second Appeal → State Information Commission (90 दिन)

📞 **Helplines:** 15100 – Legal Helpline
🌐 **Website:** https://rti.gov.in

⚠️ यह सामान्य जानकारी है।`;
  }

  // ============================================
  // 3. DEFAULT RESPONSE
  // ============================================
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