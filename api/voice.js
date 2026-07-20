// ============================================================
// api/voice.js - Zeenat Voice System
// ============================================================

// ===== VOICE SYSTEM =====
let voiceOutputEnabled = true;
let currentUtterance = null;

function speakText(text) {
    if (!voiceOutputEnabled || !window.speechSynthesis) {
        console.log('🔇 Voice disabled or not supported');
        return;
    }
    
    // Clean text
    let cleanText = text
        .replace(/<[^>]*>/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/[#*`~_]/g, '')
        .replace(/[^\w\s\u0900-\u097F\u0600-\u06FF\u0020-\u007E]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    
    if (!cleanText || cleanText.length < 5) return;
    
    // Cancel ongoing speech
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    // Try to find Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang.startsWith('hi'));
    if (hindiVoice) {
        utterance.voice = hindiVoice;
    }
    
    utterance.onerror = function(e) {
        console.warn('🔊 Speech error:', e);
    };
    
    currentUtterance = utterance;
    
    setTimeout(() => {
        if (window.speechSynthesis) {
            window.speechSynthesis.speak(utterance);
        }
    }, 100);
}

function stopSpeaking() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    currentUtterance = null;
}

// ===== VOICE CONFIG FUNCTIONS =====
function getVoiceSettings() {
    return {
        provider: 'webspeech',
        language: 'hi-IN',
        rate: 0.85,
        pitch: 1.1,
        volume: 1,
        configured: true
    };
}

function getAvailableVoices() {
    if (!window.speechSynthesis) return [];
    return window.speechSynthesis.getVoices() || [];
}

function getLanguages() {
    return [
        { code: 'hi-IN', name: 'Hindi (India)', nativeName: 'हिन्दी' },
        { code: 'en-US', name: 'English (US)', nativeName: 'English' }
    ];
}

console.log('✅ voice.js loaded - Zeenat Voice System Active');
