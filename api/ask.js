// api/ask.js - Main AI Query Handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query, date, tab, lang } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        // Get Gemini API key from environment
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        // Fallback responses if no API key
        if (!GEMINI_API_KEY) {
            console.log('⚠️ No Gemini API key, using fallback responses');
            return res.status(200).json({
                answer: generateFallbackResponse(query, date, tab),
                sources: ['https://indiankanoon.org', 'https://www.scconline.com', 'https://www.livelaw.in']
            });
        }

        // Build prompt based on tab
        let prompt = buildLegalPrompt(query, date, tab, lang);

        // Call Gemini API
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            throw new Error('Gemini API error: ' + response.status);
        }

        const data = await response.json();
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';

        return res.status(200).json({
            answer: answer,
            sources: getSourcesForQuery(query)
        });

    } catch (error) {
        console.error('Error in ask handler:', error);
        return res.status(500).json({
            error: 'Internal server error',
            answer: 'Huzoor, thodi der mein dobara try karein. Network me dikkat hai.'
        });
    }
}

function buildLegalPrompt(query, date, tab, lang) {
    const isNewLaw = date && new Date(date) >= new Date('2024-07-01');
    const lawType = isNewLaw ? 'BNS/BNSS/BSA (New Law - 1 July 2024)' : 'IPC/CrPC/Evidence Act (Old Law - pre 1 July 2024)';
    
    return `You are Zeenat, a legal information assistant for "Lucknow Kanoon Sahayak". 
    Provide detailed legal information in Hinglish (Hindi + English) with proper legal terminology.
    
    USER QUERY: ${query}
    TAB: ${tab || 'General'}
    LAW APPLICABLE: ${lawType}
    DATE REFERENCE: ${date || 'Not specified'}
    
    Please respond with:
    1. Problem Understanding (समस्या समझना)
    2. Legal Position (कानूनी स्थिति) - with BNS/BNSS/BSA sections
    3. Step-by-Step Solution (समाधान)
    4. Relevant Sections (संबंधित धाराएँ)
    5. Important Case Laws (महत्वपूर्ण केस कानून)
    6. Practical Tips (व्यावहारिक सुझाव)
    7. Emergency Helplines if applicable
    
    DISCLAIMER: Always mention this is educational information, not legal advice. Consult a qualified lawyer.
    
    Format: Use proper paragraphs, bold for important terms, and bullet points where needed.`;
}

function generateFallbackResponse(query, date, tab) {
    const isNewLaw = date && new Date(date) >= new Date('2024-07-01');
    const sections = {
        'fir': isNewLaw ? 'BNSS 173' : 'CrPC 154',
        'bail': isNewLaw ? 'BNSS 480/482' : 'CrPC 437/438',
        'cheating': isNewLaw ? 'BNS 318' : 'IPC 420',
        'murder': isNewLaw ? 'BNS 103' : 'IPC 302',
        'maintenance': isNewLaw ? 'BNSS 144' : 'CrPC 125',
        'theft': isNewLaw ? 'BNS 303' : 'IPC 379',
        'defamation': isNewLaw ? 'BNS 356' : 'IPC 499',
        'rape': isNewLaw ? 'BNS 64' : 'IPC 375',
        'cyber': isNewLaw ? 'BNS 318 + BSA 63' : 'IPC 420 + Evidence 65B',
        'evidence': isNewLaw ? 'BSA 63' : 'Evidence Act 65B'
    };
    
    let section = 'BNS/BNSS/BSA';
    let solution = 'कृपया Zeenat AI से जुड़ें और अपनी पूरी समस्या विस्तार से बताएँ।';
    
    for (let [key, value] of Object.entries(sections)) {
        if (query.toLowerCase().includes(key)) {
            section = value;
            solution = `आपकी समस्या ${key} से संबंधित है। इसके लिए ${section} देखें। कृपया Zeenat से जुड़कर विस्तृत जानकारी लें।`;
            break;
        }
    }
    
    return `🌹 **Zeenat की ओर से जवाब:**\n\n` +
           `**🔍 समस्या:** ${query}\n\n` +
           `**⚖️ कानूनी स्थिति:** ${isNewLaw ? '1 July 2024 के बाद BNS/BNSS/BSA लागू है।' : '1 July 2024 से पहले IPC/CrPC/Evidence Act लागू था।'}\n\n` +
           `**📜 संबंधित Section:** ${section}\n\n` +
           `**✅ समाधान:** ${solution}\n\n` +
           `**💡 टिप:** इस मामले में एक योग्य वकील से सलाह लें। Zeenat AI केवल सामान्य जानकारी देता है, कानूनी सलाह नहीं।\n\n` +
           `**📞 हेल्पलाइन:** पुलिस: 100, साइबर क्राइम: 1930, विधिक सहायता: 1800-112-400\n\n` +
           `⚠️ **Disclaimer:** यह जानकारी केवल शैक्षणिक उद्देश्य के लिए है।`;
}

function getSourcesForQuery(query) {
    const sources = ['https://indiankanoon.org'];
    if (query.toLowerCase().includes('sc') || query.toLowerCase().includes('supreme court')) {
        sources.push('https://www.sci.gov.in');
    }
    if (query.toLowerCase().includes('bns') || query.toLowerCase().includes('bnss')) {
        sources.push('https://www.livelaw.in');
        sources.push('https://www.scconline.com');
    }
    return sources;
}
