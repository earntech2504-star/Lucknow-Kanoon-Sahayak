// ============================================================
// CONFIG.JS - Global Configuration
// ============================================================

// Language Configuration
const CONFIG = {
    // Default Language
    defaultLang: 'hi', // hi, en, ur
    
    // Voice Settings
    voice: {
        defaultProvider: 'webspeech',
        providers: ['webspeech', 'elevenlabs', 'googletts', 'azuretts', 'responsivevoice'],
        rate: 0.9,
        pitch: 1,
        volume: 1
    },
    
    // Theme Settings
    theme: {
        darkMode: false,
        elderlyMode: false
    },
    
    // API Keys (for future use)
    apiKeys: {
        elevenLabs: '',
        googleTTS: '',
        azureTTS: '',
        newsAPI: '',
        textlocal: ''
    },
    
    // App Settings
    app: {
        name: 'Lucknow Kanoon Sahayak 9.0',
        version: '9.0',
        year: 2026,
        legalHelpline: '15100',
        policeHelpline: '100',
        womenHelpline: '181',
        cyberHelpline: '1930',
        childHelpline: '1098'
    }
};

// Language Strings
const LANG = {
    hi: {
        appName: 'लखनऊ कानून सहायक 9.0',
        tagline: 'India\'s #1 AI Voice Legal Assistant · BNS/BNSS/BSA Expert',
        voiceOnly: 'Voice Only',
        voiceOnlyTitle: 'Zeenat Voice Mode',
        voiceOnlyDesc: 'बोलें या सुनें। UI बंद है।',
        ready: 'तैयार',
        listening: 'सुन रहा हूँ...',
        processing: 'प्रोसेस हो रहा है...',
        error: 'त्रुटि',
        success: 'सफल',
        disclaimer: '⚠️ यह केवल शैक्षणिक और सूचनात्मक उद्देश्य के लिए है।',
        consult: 'कृपया योग्य वकील से परामर्श लें।'
    },
    en: {
        appName: 'Lucknow Kanoon Sahayak 9.0',
        tagline: 'India\'s #1 AI Voice Legal Assistant · BNS/BNSS/BSA Expert',
        voiceOnly: 'Voice Only',
        voiceOnlyTitle: 'Zeenat Voice Mode',
        voiceOnlyDesc: 'Speak or listen. UI is hidden.',
        ready: 'Ready',
        listening: 'Listening...',
        processing: 'Processing...',
        error: 'Error',
        success: 'Success',
        disclaimer: '⚠️ For educational and informational purposes only.',
        consult: 'Please consult a qualified lawyer.'
    },
    ur: {
        appName: 'لکھنؤ قانون سہایک 9.0',
        tagline: 'India\'s #1 AI Voice Legal Assistant · BNS/BNSS/BSA Expert',
        voiceOnly: 'Voice Only',
        voiceOnlyTitle: 'Zeenat Voice Mode',
        voiceOnlyDesc: 'بولیں یا سنیں۔ UI چھپا ہوا ہے۔',
        ready: 'تیار',
        listening: 'سن رہا ہوں...',
        processing: 'پروسس ہو رہا ہے...',
        error: 'خرابی',
        success: 'کامیاب',
        disclaimer: '⚠️ صرف تعلیمی اور معلوماتی مقاصد کے لیے۔',
        consult: 'براہ کرم کسی مستند وکیل سے مشورہ کریں۔'
    }
};

// Emergency Helplines
const HELPLINES = {
    police: '100',
    women: '181',
    cyber: '1930',
    legal: '15100',
    legalAid: '1800-112-400',
    child: '1098',
    seniorCitizen: '14567',
    mentalHealth: '9820466726',
    disaster: '1070',
    electricity: '1912',
    water: '1533',
    rto: '1073',
    railway: '139',
    ambulance: '108',
    antiCorruption: '1064',
    consumer: '1915',
    gasLeak: '1906',
    aiims: '1800-11-9999'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, LANG, HELPLINES };
}
