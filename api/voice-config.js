// /api/voice-config.js
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Only ONE voiceId declaration
    const voiceId =
      process.env.ELEVENLABS_VOICE_ID ||
      process.env.VOICE_ID ||
      '21m00Tcm4TlvDq8ikWAM';   // fixed typo

    // Correctly check if key exists
    const hasKey = Boolean(process.env.ELEVENLABS_API_KEY);

    // Only ONE response object with unique keys
    return res.status(200).json({
      voiceId,
      hasKey,
      engine: hasKey ? 'ElevenLabs' : 'Web Speech',
      status: voiceId ? 'active' : 'inactive',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Voice config error:', error);
    return res.status(500).json({
      error: 'Voice config error',
      voiceId: '21m00Tcm4TlvDq8ikWAM',
      hasKey: false,
      engine: 'Web Speech',
    });
  }
}
