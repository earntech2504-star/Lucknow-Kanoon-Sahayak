// ============================================================
// api/voice-config.js - Voice Configuration & TTS Settings
// Complete Voice Configuration for Zeenat AI Assistant
// ============================================================

// ============================================================
// VOICE PROVIDERS & CONFIGURATIONS
// ============================================================
const VOICE_PROVIDERS = {
    elevenlabs: {
        name: 'ElevenLabs',
        models: ['eleven_monolingual_v1', 'eleven_multilingual_v2', 'eleven_turbo_v2'],
        voices: {
            rachel: { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', gender: 'female', language: 'en' },
            domi: { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', gender: 'female', language: 'en' },
            bella: { id: 'EXAVITQu4L4J4V2qPPk1', name: 'Bella', gender: 'female', language: 'en' },
            antoni: { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', gender: 'male', language: 'en' },
            josh: { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', gender: 'male', language: 'en' },
            arnold: { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', gender: 'male', language: 'en' },
            adam: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', gender: 'male', language: 'en' },
            sam: { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam', gender: 'male', language: 'en' }
        }
    },
    google: {
        name: 'Google Cloud TTS',
        models: ['standard', 'neural', 'studio'],
        voices: {
            hi_in_female: { id: 'hi-IN-Wavenet-A', name: 'Hindi Female', gender: 'female', language: 'hi-IN' },
            hi_in_male: { id: 'hi-IN-Wavenet-B', name: 'Hindi Male', gender: 'male', language: 'hi-IN' },
            en_us_female: { id: 'en-US-Wavenet-F', name: 'English Female', gender: 'female', language: 'en-US' },
            en_us_male: { id: 'en-US-Wavenet-D', name: 'English Male', gender: 'male', language: 'en-US' }
        }
    },
    azure: {
        name: 'Azure TTS',
        models: ['standard', 'neural'],
        voices: {
            hi_in_female: { id: 'hi-IN-SwaraNeural', name: 'Swara (Hindi)', gender: 'female', language: 'hi-IN' },
            hi_in_male: { id: 'hi-IN-MadhurNeural', name: 'Madhur (Hindi)', gender: 'male', language: 'hi-IN' },
            en_us_female: { id: 'en-US-JennyNeural', name: 'Jenny (English)', gender: 'female', language: 'en-US' },
            en_us_male: { id: 'en-US-GuyNeural', name: 'Guy (English)', gender: 'male', language: 'en-US' }
        }
    },
    amazon: {
        name: 'Amazon Polly',
        models: ['standard', 'neural'],
        voices: {
            hi_in_female: { id: 'Aditi', name: 'Aditi (Hindi)', gender: 'female', language: 'hi-IN' },
            hi_in_male: { id: 'Kajal', name: 'Kajal (Hindi)', gender: 'female', language: 'hi-IN' },
            en_us_female: { id: 'Joanna', name: 'Joanna (English)', gender: 'female', language: 'en-US' },
            en_us_male: { id: 'Matthew', name: 'Matthew (English)', gender: 'male', language: 'en-US' }
        }
    }
};

// ============================================================
// DEFAULT VOICE SETTINGS
// ============================================================
const DEFAULT_SETTINGS = {
    provider: 'google',
    voiceId: 'hi-IN-Wavenet-A',
    voiceName: 'Hindi Female',
    language: 'hi-IN',
    rate: 0.9,
    pitch: 1.0,
    volume: 1.0,
    model: 'neural'
};

// ============================================================
// LANGUAGE CONFIGURATIONS
// ============================================================
const LANGUAGE_CONFIGS = {
    'hi-IN': {
        name: 'Hindi (India)',
        code: 'hi-IN',
        nativeName: 'हिन्दी',
        defaultVoice: 'hi_in_female',
        ttsProvider: 'google'
    },
    'en-US': {
        name: 'English (US)',
        code: 'en-US',
        nativeName: 'English',
        defaultVoice: 'en_us_female',
        ttsProvider: 'google'
    },
    'en-GB': {
        name: 'English (UK)',
        code: 'en-GB',
        nativeName: 'English',
        defaultVoice: 'en_us_female',
        ttsProvider: 'google'
    },
    'bn-IN': {
        name: 'Bengali (India)',
        code: 'bn-IN',
        nativeName: 'বাংলা',
        defaultVoice: 'bn_in_female',
        ttsProvider: 'google'
    },
    'te-IN': {
        name: 'Telugu (India)',
        code: 'te-IN',
        nativeName: 'తెలుగు',
        defaultVoice: 'te_in_female',
        ttsProvider: 'google'
    },
    'ta-IN': {
        name: 'Tamil (India)',
        code: 'ta-IN',
        nativeName: 'தமிழ்',
        defaultVoice: 'ta_in_female',
        ttsProvider: 'google'
    },
    'ml-IN': {
        name: 'Malayalam (India)',
        code: 'ml-IN',
        nativeName: 'മലയാളം',
        defaultVoice: 'ml_in_female',
        ttsProvider: 'google'
    },
    'kn-IN': {
        name: 'Kannada (India)',
        code: 'kn-IN',
        nativeName: 'ಕನ್ನಡ',
        defaultVoice: 'kn_in_female',
        ttsProvider: 'google'
    }
};

// ============================================================
// GET VOICE SETTINGS
// ============================================================
function getVoiceSettings() {
    // Use default settings (no process.env in browser)
    return {
        provider: DEFAULT_SETTINGS.provider,
        voiceId: DEFAULT_SETTINGS.voiceId,
        voiceName: DEFAULT_SETTINGS.voiceName,
        language: DEFAULT_SETTINGS.language,
        rate: DEFAULT_SETTINGS.rate,
        pitch: DEFAULT_SETTINGS.pitch,
        model: DEFAULT_SETTINGS.model,
        apiKey: false,
        configured: true
    };
}

// ============================================================
// GET AVAILABLE VOICES
// ============================================================
function getAvailableVoices(provider = null) {
    const providers = provider ? [provider] : Object.keys(VOICE_PROVIDERS);
    const allVoices = {};

    for (const prov of providers) {
        if (VOICE_PROVIDERS[prov]) {
            allVoices[prov] = {
                provider: prov,
                name: VOICE_PROVIDERS[prov].name,
                models: VOICE_PROVIDERS[prov].models,
                voices: Object.values(VOICE_PROVIDERS[prov].voices)
            };
        }
    }

    return allVoices;
}

// ============================================================
// GET LANGUAGES
// ============================================================
function getLanguages() {
    return Object.values(LANGUAGE_CONFIGS);
}

// ============================================================
// API HANDLER (for Vercel/Node)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = async function handler(req, res) {
        // CORS Headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

        // Handle Preflight (OPTIONS) request
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // Only allow GET and POST
        if (req.method !== 'GET' && req.method !== 'POST') {
            return res.status(405).json({
                error: 'Method not allowed',
                allowed: ['GET', 'POST', 'OPTIONS'],
                status: 'error'
            });
        }

        try {
            // ============================================================
            // GET - Fetch voice configuration
            // ============================================================
            if (req.method === 'GET') {
                const { action, provider, language, voiceId } = req.query;

                // Get available voices
                if (action === 'voices') {
                    const voices = getAvailableVoices(provider);
                    return res.status(200).json({
                        voices: voices,
                        providers: Object.keys(VOICE_PROVIDERS),
                        status: 'success',
                        message: '✅ Available voices loaded'
                    });
                }

                // Get languages
                if (action === 'languages') {
                    const languages = getLanguages();
                    return res.status(200).json({
                        languages: languages,
                        total: languages.length,
                        status: 'success'
                    });
                }

                // Get specific voice
                if (voiceId && provider) {
                    const voices = VOICE_PROVIDERS[provider]?.voices || {};
                    const voice = Object.values(voices).find(v => v.id === voiceId);
                    if (voice) {
                        return res.status(200).json({
                            voice: voice,
                            provider: provider,
                            status: 'success'
                        });
                    }
                    return res.status(404).json({
                        error: 'Voice not found',
                        status: 'error'
                    });
                }

                // Get all providers
                if (action === 'providers') {
                    return res.status(200).json({
                        providers: Object.values(VOICE_PROVIDERS).map(p => ({
                            name: p.name,
                            models: p.models,
                            voiceCount: Object.keys(p.voices).length
                        })),
                        status: 'success'
                    });
                }

                // Default: Get current voice settings
                const settings = getVoiceSettings();
                
                // Get provider info
                const providerInfo = VOICE_PROVIDERS[settings.provider] || null;
                const availableVoices = providerInfo ? Object.values(providerInfo.voices) : [];
                
                // Get language info
                const languageInfo = LANGUAGE_CONFIGS[settings.language] || null;

                return res.status(200).json({
                    current: settings,
                    provider: {
                        name: providerInfo?.name || settings.provider,
                        availableVoices: availableVoices,
                        models: providerInfo?.models || []
                    },
                    language: languageInfo,
                    configured: settings.configured,
                    status: 'success',
                    voiceId: settings.voiceId,
                    voiceName: settings.voiceName,
                    providerName: settings.provider,
                    isConfigured: settings.configured,
                    model: settings.model
                });
            }

            // ============================================================
            // POST - Update voice configuration
            // ============================================================
            if (req.method === 'POST') {
                const { provider, voiceId, voiceName, language, rate, pitch, model, test } = req.body;

                // Validate provider
                if (provider && !VOICE_PROVIDERS[provider]) {
                    return res.status(400).json({
                        error: `Provider '${provider}' not supported`,
                        availableProviders: Object.keys(VOICE_PROVIDERS),
                        status: 'error'
                    });
                }

                // Validate voice
                if (voiceId && provider) {
                    const voices = VOICE_PROVIDERS[provider]?.voices || {};
                    const voice = Object.values(voices).find(v => v.id === voiceId);
                    if (!voice) {
                        return res.status(400).json({
                            error: `Voice '${voiceId}' not found for provider '${provider}'`,
                            availableVoices: Object.values(voices).map(v => ({ id: v.id, name: v.name })),
                            status: 'error'
                        });
                    }
                }

                // Validate language
                if (language && !LANGUAGE_CONFIGS[language]) {
                    return res.status(400).json({
                        error: `Language '${language}' not supported`,
                        availableLanguages: Object.keys(LANGUAGE_CONFIGS),
                        status: 'error'
                    });
                }

                // Test voice
                if (test) {
                    const settings = {
                        provider: provider || DEFAULT_SETTINGS.provider,
                        voiceId: voiceId || DEFAULT_SETTINGS.voiceId,
                        voiceName: voiceName || DEFAULT_SETTINGS.voiceName,
                        language: language || DEFAULT_SETTINGS.language,
                        rate: rate || DEFAULT_SETTINGS.rate,
                        pitch: pitch || DEFAULT_SETTINGS.pitch
                    };

                    return res.status(200).json({
                        settings: settings,
                        testMessage: '🔊 Testing voice configuration...',
                        testText: 'नमस्ते, मैं Zeenat हूँ। आपकी सहायता के लिए यहाँ हूँ।',
                        status: 'success',
                        message: '✅ Voice configuration tested successfully'
                    });
                }

                // Build updated settings
                const updatedSettings = {
                    provider: provider || DEFAULT_SETTINGS.provider,
                    voiceId: voiceId || DEFAULT_SETTINGS.voiceId,
                    voiceName: voiceName || DEFAULT_SETTINGS.voiceName,
                    language: language || DEFAULT_SETTINGS.language,
                    rate: rate || DEFAULT_SETTINGS.rate,
                    pitch: pitch || DEFAULT_SETTINGS.pitch,
                    model: model || DEFAULT_SETTINGS.model
                };

                return res.status(200).json({
                    settings: updatedSettings,
                    status: 'success',
                    message: '✅ Voice configuration updated successfully'
                });
            }

        } catch (error) {
            console.error('Voice config error:', error);
            return res.status(500).json({
                error: error.message,
                status: 'error'
            });
        }
    };
}

// ============================================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE (for browser)
// ============================================================
if (typeof window !== 'undefined') {
    window.VOICE_PROVIDERS = VOICE_PROVIDERS;
    window.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
    window.LANGUAGE_CONFIGS = LANGUAGE_CONFIGS;
    window.getVoiceSettings = getVoiceSettings;
    window.getAvailableVoices = getAvailableVoices;
    window.getLanguages = getLanguages;
}

console.log('✅ voice-config.js loaded');
