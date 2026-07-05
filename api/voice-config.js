// pages/api/voice-config.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get voice ID from environment variables
    const voiceId = process.env.VOICE_ID || process.env.NEXT_PUBLIC_VOICE_ID || '';
    return res.status(200).json({
      voiceId: voiceId || 'default',
      status: voiceId ? 'active' : 'inactive',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ error: 'Voice config error' });
  }
}// pages/api/voice-config.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get voice ID from environment variables
    const voiceId = process.env.VOICE_ID || process.env.NEXT_PUBLIC_VOICE_ID || '';
    return res.status(200).json({
      voiceId: voiceId || 'default',
      status: voiceId ? 'active' : 'inactive',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ error: 'Voice config error' });
  }
}
