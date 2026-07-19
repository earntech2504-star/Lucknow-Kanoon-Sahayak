// ============================================================
// voice-config.js - Voice Configuration API
// ============================================================

const VOICE_CONFIG = {
    // Primary voice settings
    primary: {
        language: 'hi-IN',
        gender: 'female',
        name: 'hi-IN-Wavenet-A',
        provider: 'google',
        rate: 0.9,
        pitch: 1.1,
        volume: 1.0
    },
    
    // Fallback for Web Speech API
    fallback: {
        language: 'hi-IN',
        gender: 'female',
        rate: 0.9,
        pitch: 1.1,
        volume: 1.0
    },
    
    // ElevenLabs settings (if available)
    elevenlabs: {
        voiceId: '21m00Tcm4TlvDq8ikWAM', // Default voice
        model: 'eleven_monolingual_v1',
        stability: 0.5,
        similarityBoost: 0.75,
        style: 0.3,
        useSpeakerBoost: true
    },
    
    // Supported languages
    supportedLanguages: [
        { code: 'hi-IN', name: 'Hindi (India)' },
        { code: 'en-IN', name: 'English (India)' },
        { code: 'en-US', name: 'English (US)' },
        { code: 'bn-IN', name: 'Bengali' },
        { code: 'ta-IN', name: 'Tamil' },
        { code: 'te-IN', name: 'Telugu' },
        { code: 'mr-IN', name: 'Marathi' },
        { code: 'ur-IN', name: 'Urdu' }
    ],
    
    // Voice driving mode settings
    drivingMode: {
        enabled: true,
        autoSubmit: true,
        confirmationPrompt: true,
        speakResults: true
    }
};

// GET /api/voice-config
export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Check which TTS providers are available
    const providers = {
        google: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
        elevenlabs: !!process.env.ELEVENLABS_API_KEY,
        webspeech: true
    };
    
    return res.status(200).json({
        config: VOICE_CONFIG,
        providers: providers,
        activeProvider: providers.google ? 'google' : (providers.elevenlabs ? 'elevenlabs' : 'webspeech')
    });
}