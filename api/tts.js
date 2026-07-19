// ============================================================
// tts.js - Text to Speech API with Google TTS & ElevenLabs
// ============================================================

// GET /api/tts - Convert text to speech
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { text, voice = 'hi-IN-Wavenet-A', rate = 1.0, pitch = 1.0 } = req.query;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    
    try {
        // Try Google TTS first
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            const textToSpeech = await import('@google-cloud/text-to-speech');
            const client = new textToSpeech.TextToSpeechClient();
            
            const request = {
                input: { text: text.slice(0, 500) },
                voice: { languageCode: 'hi-IN', name: voice, ssmlGender: 'FEMALE' },
                audioConfig: { audioEncoding: 'MP3', speakingRate: rate, pitch: pitch }
            };
            
            const [response] = await client.synthesizeSpeech(request);
            
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Disposition', 'attachment; filename=speech.mp3');
            return res.send(Buffer.from(response.audioContent));
        }
        
        // Try ElevenLabs
        if (process.env.ELEVENLABS_API_KEY) {
            const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': process.env.ELEVENLABS_API_KEY
                },
                body: JSON.stringify({
                    text: text.slice(0, 500),
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                        style: 0.3,
                        use_speaker_boost: true
                    }
                })
            });
            
            const audioBuffer = await response.arrayBuffer();
            
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Disposition', 'attachment; filename=speech.mp3');
            return res.send(Buffer.from(audioBuffer));
        }
        
        // Fallback - return text for Web Speech API
        return res.status(200).json({
            text: text,
            fallback: true,
            message: 'Server TTS not configured. Use Web Speech API in browser.'
        });
        
    } catch (error) {
        console.error('TTS error:', error);
        return res.status(500).json({ error: 'TTS failed', fallback: true });
    }
}
