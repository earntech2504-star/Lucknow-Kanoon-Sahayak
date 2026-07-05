// pages/api/ask.js
export default async function handler(req, res) {
  // ✅ CORS headers (allows your frontend to call this API)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight request (browser sends OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // ✅ SAFE: use `req.body || {}` to avoid undefined error
    const { query, date, tab, lang } = req.body || {};

    // Validate that query is present and not empty
    if (!query || query.trim() === '') {
      return res.status(400).json({
        error: 'Query is required',
        answer: 'कृपया अपना प्रश्न लिखें।'
      });
    }

    // 🔑 Read environment variables (may be undefined, but no crash)
    const openaiKey = process.env.OPENAI_API_KEY;
    const elevenlabsKey = process.env.ELEVENLABS_API_KEY; // optional

    // 1️⃣ Try to use OpenAI if API key exists
    if (openaiKey) {
      try {
        const aiResponse = await callOpenAI(query, openaiKey);
        return res.status(200).json({
          answer: aiResponse,
          sources: ['https://openai.com', 'https://indiankanoon.org'],
          status: 'ai'
        });
      } catch (aiErr) {
        console.warn('OpenAI failed, falling back to local knowledge:', aiErr.message);
        // Continue to fallback
      }
    }

    // 2️⃣ Fallback to local knowledge base (no API key required)
    const localAnswer = generateLegalResponse(query, date, tab);
    return res.status(200).json({
      answer: localAnswer,
      sources: ['https://indiankanoon.org', 'https://scconline.com'],
      status: 'local',
      note: openaiKey ? 'OpenAI temporarily unavailable' : 'Using offline knowledge base'
    });

  } catch (error) {
    console.error('Ask API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      answer: 'क्षमा करें, सेवा में कुछ समस्या है। कृपया कुछ देर बाद प्रयास करें। 🌹',
      status: 'error'
    });
  }
}

// ------------------------------------------------------
// 🔹 Helper: Call OpenAI API (with timeout)
// ------------------------------------------------------
async function callOpenAI(query, apiKey) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a legal assistant for Indian law (BNS/BNSS/BSA). Provide accurate, helpful, and safe information. Always mention that this is for educational purposes only.',
          },
          { role: 'user', content: query },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response from AI.';
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

// ------------------------------------------------------
// 🔹 Fallback: Local legal knowledge (works even without API keys)
// ------------------------------------------------------
function generateLegalResponse(query, date, tab) {
  const q = query.toLowerCase().trim();
  let response = '';

  if (q.includes('fir') || q.includes('police') || q.includes('report')) {
    response = `📋 **FIR / Police Complaint (BNSS 173)**

1️⃣ Submit a written complaint at the police station.
2️⃣ If the SHO refuses to register FIR → approach SP under BNSS 173(3).
3️⃣ If still not registered → file an application before CJM/Magistrate under BNSS 175(3).
4️⃣ Supreme Court: *Lalita Kumari v. UOI (2014)* – FIR is mandatory for cognizable offences.

📅 *Crime Date: ${date || 'Not specified'}* – BNSS applies after 1 July 2024.`;
  } 
  else if (q.includes('bail') || q.includes('जमानत')) {
    response = `⛓️ **Bail / ज़मानत (BNSS 480/482/483)**

1️⃣ BNSS 480 – Regular Bail from Magistrate (offences punishable up to 7 years)
2️⃣ BNSS 482 – Anticipatory Bail (before arrest)
3️⃣ BNSS 483 – Bail from Sessions/HC (serious offences)
4️⃣ SC: *Satender Kumar Antil v. CBI (2022)* – "Bail is rule, jail is exception"

📅 *Crime Date: ${date || 'Not specified'}*`;
  } 
  else if (q.includes('cheating') || q.includes('धोखा') || q.includes('fraud')) {
    response = `⛓️ **Cheating / धोखाधड़ी (BNS 318)**

1️⃣ BNS 318 (replaces IPC 420) – section for cheating.
2️⃣ Punishment: up to 7 years + fine.
3️⃣ Intent to deceive must be proved.
4️⃣ Use BNSS 173 to file FIR.

📌 SC: *Satender Kumar Antil v. CBI (2022)* – bail guidelines.`;
  } 
  else if (q.includes('maintenance') || q.includes('पेटी') || q.includes('भरण')) {
    response = `🏠 **Maintenance / भरण-पोषण (BNSS 144)**

1️⃣ BNSS 144 (replaces CrPC 125) – maintenance for wife, children, and parents.
2️⃣ SC: *Rajnesh v. Neha (2021)* – amount based on income, needs, and standard of living.
3️⃣ Interim maintenance can be granted during the pendency of the case.

📅 *Crime Date: ${date || 'Not specified'}*`;
  } 
  else {
    response = `🌹 **Your Query:**

"${query}"

1️⃣ Please provide more details – date, place, and description of the incident.
2️⃣ After 1 July 2024, BNS/BNSS/BSA apply instead of IPC/CrPC/Evidence Act.
3️⃣ Important sections:
   • BNS 318 – Cheating (7 years)
   • BNS 103 – Murder (death/life)
   • BNSS 173 – FIR
   • BNSS 480 – Bail
   • BNSS 482 – Anticipatory Bail
   • BSA 63 – Electronic Evidence

🌹 *Zeenat's Advice:* "Stay calm – the law is with you. Take the right steps."`;
  }

  return `${response}\n\n⚠️ **Disclaimer:** This is for educational purposes only. Always consult a qualified legal professional before taking any action.`;
}
