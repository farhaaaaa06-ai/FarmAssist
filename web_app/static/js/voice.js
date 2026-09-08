/**
 * FarmAssist - Multilingual Voice Interface
 * Features:
 * 1. Voice Command Assistant (STT Speech Recognition) for navigation and actions.
 * Zero organization names or personal details.
 */


// Global Speech Recognition (Voice Commands & Search)
const VoiceAssistant = {
    recognition: null,
    isListening: false,

    init() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
            console.warn("Speech recognition not supported in this browser.");
            return false;
        }

        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.showVoiceModal(true);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.showVoiceModal(false);
        };

        this.recognition.onerror = (event) => {
            console.error("Speech Recognition error:", event.error);
            this.isListening = false;
            this.showVoiceModal(false);
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            console.log("Voice Command Heard:", transcript);
            this.handleCommand(transcript);
        };

        return true;
    },

    start() {
        if (!this.recognition) {
            if (!this.init()) {
                alert("Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
                return;
            }
        }

        const lang = localStorage.getItem('farmassist_lang') || localStorage.getItem('flora_lang') || 'en';
        if (lang === 'kn') this.recognition.lang = 'kn-IN';
        else if (lang === 'hi') this.recognition.lang = 'hi-IN';
        else this.recognition.lang = 'en-US';

        try {
            this.recognition.start();
        } catch (err) {
            console.warn("Speech recognition already running or error:", err);
        }
    },

    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    },

    showVoiceModal(show) {
        let modal = document.getElementById('voice-assistant-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'voice-assistant-modal';
            modal.className = 'voice-modal-overlay';
            modal.innerHTML = `
                <div class="voice-modal-card">
                    <div class="voice-pulse-ring">
                        <i class="fa-solid fa-microphone" style="font-size: 2rem; color: #10b981;"></i>
                    </div>
                    <h4 id="voice-modal-status" style="margin: 1.25rem 0 0.5rem; color: #062b1a;">Listening...</h4>
                    <p id="voice-modal-hint" style="color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem;">Speak a command: "Home", "Scan", "FarmAssist", "Camera", or search</p>
                    <button type="button" class="btn-secondary" style="color: #062b1a; border-color: #cbd5e1;" onclick="VoiceAssistant.stop()">Cancel</button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const lang = localStorage.getItem('farmassist_lang') || localStorage.getItem('flora_lang') || 'en';
        const statusEl = document.getElementById('voice-modal-status');
        const hintEl = document.getElementById('voice-modal-hint');

        if (lang === 'kn') {
            if (statusEl) statusEl.textContent = 'ಆಲಿಸಲಾಗುತ್ತಿದೆ...';
            if (hintEl) hintEl.textContent = 'ಆಜ್ಞೆಗಳನ್ನು ಹೇಳಿ: "ಮುಖಪುಟ", "ಸ್ಕ್ಯಾನ್", "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್", "ಕ್ಯಾಮೆರಾ"';
        } else if (lang === 'hi') {
            if (statusEl) statusEl.textContent = 'सुना जा रहा है...';
            if (hintEl) hintEl.textContent = 'आदेश बोलें: "होम", "स्कैन", "फार्मअसिस्ट", "कैमरा"';
        } else {
            if (statusEl) statusEl.textContent = 'Listening...';
            if (hintEl) hintEl.textContent = 'Speak a command: "Home", "Scan", "FarmAssist", "Camera"';
        }

        modal.style.display = show ? 'flex' : 'none';
    },

    handleCommand(cmd) {
        // Navigation commands
        if (cmd.includes('home') || cmd.includes('ಮುಖಪುಟ') || cmd.includes('ಹೋಮ್') || cmd.includes('होम')) {
            window.location.href = '/';
        } else if (cmd.includes('scan') || cmd.includes('diagnos') || cmd.includes('ಸ್ಕ್ಯಾನ್') || cmd.includes('ಪರೀಕ್ಷೆ') || cmd.includes('स्कैन')) {
            window.location.href = '/index';
        } else if (
            cmd.includes('farmassist') || cmd.includes('farm assist') || cmd.includes('remedy') || cmd.includes('medicine') ||
            cmd.includes('market') || cmd.includes('supplement') || 
            cmd.includes('ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್') || cmd.includes('ಔಷಧ') || cmd.includes('ಗೊಬ್ಬರ') || cmd.includes('ಮಾರುಕಟ್ಟೆ') || 
            cmd.includes('फार्मअसिस्ट') || cmd.includes('दवा') || cmd.includes('उपचार') || cmd.includes('बाज़ार')
        ) {
            window.location.href = '/farmassist';
        } else if (cmd.includes('help') || cmd.includes('support') || cmd.includes('ಸಹಾಯ') || cmd.includes('ಮಾರ್ಗದರ್ಶಿ') || cmd.includes('मदद')) {
            window.location.href = '/contact';
        } else if (cmd.includes('camera') || cmd.includes('ಕ್ಯಾಮೆರಾ') || cmd.includes('कैमरा')) {
            const camBtn = document.getElementById('open-cam-btn');
            if (camBtn) camBtn.click();
            else window.location.href = '/index';
        } else {
            // If on farmassist page, use as search query
            const searchInput = document.getElementById('farmassist-search-input') || document.getElementById('market-search-input');
            if (searchInput) {
                searchInput.value = cmd;
                searchInput.dispatchEvent(new Event('input'));
            } else {
                alert(`Voice Input: "${cmd}"`);
            }
        }
    }
};

// Bind Voice Triggers on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Navbar voice button
    const navMicBtn = document.getElementById('nav-voice-assistant-btn');
    if (navMicBtn) {
        navMicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            VoiceAssistant.start();
        });
    }

    // Studio voice button if exists
    const studioMicBtn = document.getElementById('studio-voice-btn');
    if (studioMicBtn) {
        studioMicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            VoiceAssistant.start();
        });
    }
});
