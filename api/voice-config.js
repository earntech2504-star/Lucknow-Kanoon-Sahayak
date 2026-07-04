// api/voice-config.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const voiceId = process.env.ELEVENLABS_VOICE_ID || '';
  res.status(200).json({ voiceId });
}