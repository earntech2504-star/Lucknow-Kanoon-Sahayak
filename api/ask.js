// api/ask.js
export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, date, tab, lang } = req.body;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Query is required' });
    }

    // 1️⃣ Try OpenAI if key exists
    const openaiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (openaiKey) {
      try {
        const aiResponse = await callOpenAI(query, openaiKey);
        return res.status(200).json({
          answer: aiResponse,
          sources: ['https://openai.com', 'https://indiankanoon.org'],
          status: 'ai'
        });
      } catch (aiErr) {
        console.warn('OpenAI failed, falling back:', aiErr.message);
      }
    }

    // 2️⃣ Try Gemini if key exists
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const aiResponse = await callGemini(query, geminiKey, tab);
        return res.status(200).json({
          answer: aiResponse,
          sources: ['Gemini AI', 'https://indiankanoon.org'],
          status: 'ai'
        });
      } catch (aiErr) {
        console.warn('Gemini failed, falling back:', aiErr.message);
      }
    }

    // 3️⃣ Fallback to local knowledge
    const fallbackAnswer = generateLocalLegalResponse(query, date, tab);
    return res.status(200).json({
      answer: fallbackAnswer,
      sources: ['https://indiankanoon.org', 'https://scconline.com'],
      status: 'fallback',
      note: 'Using offline knowledge base'
    });

  } catch (error) {
    console.error('Ask API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      answer: 'क्षमा करें, सेवा में कुछ समस्या है। 🌹',
      status: 'error'
    });
  }
}

// ------------------------------------------------------
// HELPER: Call OpenAI
// ------------------------------------------------------
async function callOpenAI(query, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a legal assistant for Indian law (BNS/BNSS/BSA). Provide accurate, helpful, and safe legal information. Always mention that this is for educational purposes only.' },
        { role: 'user', content: query }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response from AI.';
}

// ------------------------------------------------------
// HELPER: Call Gemini
// ------------------------------------------------------
async function callGemini(query, apiKey, tab) {
  const systemPrompt = `You are Zeenat, a Hindi legal assistant for Lucknow Kanoon Sahayak. 
  Always respond in Hinglish. Focus on BNS/BNSS/BSA (new laws from 1 July 2024).
  Give practical, step-by-step solutions with sections and case laws.
  Tab context: ${tab || 'general'}
  
  User Question: ${query}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';
}

// ------------------------------------------------------
// FALLBACK: Local legal knowledge
// ------------------------------------------------------
function generateLocalLegalResponse(query, date, tab) {
  const q = query.toLowerCase().trim();
  let response = '';

  if (q.includes('fir') || q.includes('police') || q.includes('report')) {
    response = `📋 **FIR से संबंधित जानकारी (BNSS 173)**

1️⃣ Police station में लिखित complaint दें।
2️⃣ अगर SHO FIR न लिखे → BNSS 173(3) के तहत SP को शिकायत करें।
3️⃣ फिर भी न हो → BNSS 175(3) के तहत CJM/Magistrate को application दें।
4️⃣ Supreme Court: *Lalita Kumari v. UOI (2014)* — FIR दर्ज करना अनिवार्य है।

📅 *Crime Date: ${date || 'Not specified'}* — 1 July 2024 के बाद BNSS लागू।`;
  } 
  else if (q.includes('bail') || q.includes('जमानत')) {
    response = `⛓️ **Bail / ज़मानत (BNSS 480/482/483)**

1️⃣ BNSS 480 — Magistrate से Regular Bail (सज़ा ≤ 7 साल)
2️⃣ BNSS 482 — Anticipatory Bail (गिरफ्तारी से पहले)
3️⃣ BNSS 483 — Sessions/HC से Bail (गंभीर अपराध)
4️⃣ SC: *Satender Kumar Antil v. CBI (2022)* — "Bail is rule, jail is exception"

📅 *Crime Date: ${date || 'Not specified'}*`;
  } 
  else if (q.includes('cheating') || q.includes('धोखा') || q.includes('fraud')) {
    response = `⛓️ **Cheating / धोखाधड़ी (BNS 318)**

1️⃣ BNS 318 (पहले IPC 420) — Cheating का section है।
2️⃣ सज़ा: अधिकतम 7 साल + जुर्माना।
3️⃣ Intent to deceive (धोखा देने की मंशा) prove करना ज़रूरी है।
4️⃣ FIR के लिए BNSS 173 का उपयोग करें।

📌 SC: *Satender Kumar Antil v. CBI (2022)* — bail guidelines`;
  } 
  else if (q.includes('maintenance') || q.includes('पेटी') || q.includes('भरण')) {
    response = `🏠 **Maintenance / भरण-पोषण (BNSS 144)**

1️⃣ BNSS 144 (पहले CrPC 125) — Maintenance का section है।
2️⃣ पत्नी, बच्चे, और माता-पिता सभी claim कर सकते हैं।
3️⃣ SC: *Rajnesh v. Neha (2021)* — income और ज़रूरतों के हिसाब से राशि तय होती है।
4️⃣ Interim maintenance (अंतरिम) भी मिल सकता है।

📅 *Crime Date: ${date || 'Not specified'}*`;
  } 
  else {
    response = `🌹 **आपके प्रश्न का उत्तर:**

"${query}"

1️⃣ कृपया ज़्यादा जानकारी दें — तारीख, जगह, घटना का विवरण।
2️⃣ 1 July 2024 के बाद BNS/BNSS/BSA लागू है।
3️⃣ पुराने IPC/CrPC/Evidence Act की जगह नए कानून।

📌 **Important Sections:**
• BNS 318 — Cheating (7 years)
• BNS 103 — Murder (Death/Life)
• BNSS 173 — FIR
• BNSS 480 — Bail
• BNSS 482 — Anticipatory Bail
• BSA 63 — Electronic Evidence

🌹 *Zeenat ki Salah:* "कानून आपके साथ है — धैर्य रखें और सही कदम उठाएँ।"`;
  }

  return `${response}\n\n⚠️ **Disclaimer:** यह जानकारी केवल शैक्षणिक उद्देश्य के लिए है। कोई भी कानूनी कार्रवाई करने से पहले योग्य विधिक सलाहकार से परामर्श अवश्य लें।`;
}
