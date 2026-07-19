// ============================================================
// TTS.JS - Text-to-Speech
// ============================================================

let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let isSpeaking = false;

// ============================================================
// Speak Text
// ============================================================
function speakText(text, language = 'hi-IN') {
    if (!window.speechSynthesis) {
        console.warn('Web Speech API not supported');
        return;
    }
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to find a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.lang === language && v.name.includes('Female'));
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }
    
    utterance.onstart = () => { isSpeaking = true; };
    utterance.onend = () => { isSpeaking = false; };
    utterance.onerror = () => { isSpeaking = false; };
    
    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
}

// ============================================================
// Stop Speaking
// ============================================================
function stopSpeaking() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        currentUtterance = null;
    }
}

// ============================================================
// Toggle Voice Output
// ============================================================
function toggleVoiceOutput() {
    const btn = document.getElementById('voice-toggle-btn');
    if (!btn) return;
    
    btn.classList.toggle('active');
    const icon = document.getElementById('voice-toggle-icon');
    if (icon) {
        icon.textContent = btn.classList.contains('active') ? '🔊' : '🔇';
    }
    
    if (!btn.classList.contains('active')) {
        stopSpeaking();
    }
}

// ============================================================
// Toggle Voice Typing (Speech Recognition)
// ============================================================
function toggleVoiceTyping() {
    const btn = document.getElementById('voice-typing-btn');
    if (!btn) return;
    
    const isRecording = btn.classList.contains('recording');
    if (isRecording) {
        stopVoiceRecognition();
    } else {
        startVoiceRecognition();
    }
}

// ============================================================
// Start Voice Recognition
// ============================================================
function startVoiceRecognition() {
    const btn = document.getElementById('voice-typing-btn');
    if (!btn) return;
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('⚠️ Voice recognition not supported in this browser. Try Chrome.');
        return;
    }
    
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
        btn.classList.add('recording');
        btn.textContent = '⏺️';
    };
    
    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        
        const input = document.getElementById('zeenat-query');
        if (input) {
            input.value = transcript;
        }
        
        if (event.results[0].isFinal) {
            // Auto-submit after voice input
            setTimeout(() => {
                if (input && input.value.trim()) {
                    handleZeenatQuery();
                }
            }, 500);
        }
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        btn.classList.remove('recording');
        btn.textContent = '🎤';
        
        if (event.error === 'not-allowed') {
            alert('⚠️ Please allow microphone access.');
        }
    };
    
    recognition.onend = () => {
        btn.classList.remove('recording');
        btn.textContent = '🎤';
    };
    
    window._recognition = recognition;
    recognition.start();
}

// ============================================================
// Stop Voice Recognition
// ============================================================
function stopVoiceRecognition() {
    if (window._recognition) {
        window._recognition.stop();
        window._recognition = null;
    }
    const btn = document.getElementById('voice-typing-btn');
    if (btn) {
        btn.classList.remove('recording');
        btn.textContent = '🎤';
    }
}
