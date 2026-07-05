// api/voice-config.js - ElevenLabs Voice Configuration
module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const voiceId = process.env.ELEVENLABS_VOICE_ID || 'default';
        const apiKey = process.env.ELEVENLABS_API_KEY;
        
        return res.status(200).json({
            voiceId: voiceId,
            hasApiKey: !!apiKey,
            status: apiKey ? 'configured' : 'fallback'
        });
    } catch (error) {
        console.error('Error in voice-config:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
