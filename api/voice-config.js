// api/voice-config.js
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle Preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Default ElevenLabs voice (Rachel) if not set in env
  const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
  const DEFAULT_VOICE_NAME = 'Rachel';

  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const voiceName = process.env.ELEVENLABS_VOICE_NAME || DEFAULT_VOICE_NAME;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  return res.status(200).json({
    voiceId: voiceId,
    voiceName: voiceName,
    provider: 'elevenlabs',
    configured: !!apiKey, // true if API key exists, false otherwise
    model: 'eleven_monolingual_v1', // optional: model info
  });
}
