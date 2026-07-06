// api/voice-config.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'default-voice-id';

  return res.status(200).json({
    voiceId: voiceId,
    provider: 'elevenlabs'
  });
}