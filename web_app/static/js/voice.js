/**
 * FarmAssist - Multilingual Voice Interface & Speech Engine
 * Features:
 * 1. Robust SpeechRecognition lifecycle handling (clean recreate on every session).
 * 2. Live interim speech transcription with visual feedback.
 * 3. Graceful multilingual error recovery (permission denied, silence, network).
 * 4. In-input voice dictation for search bars and form fields.
 * 5. Full command parsing (navigation, camera snap/browse/diagnose, language switching).
 */

const VoiceAssistant = {
    recognition: null,
    isListening: false,
    activeMode: 'command', // 'command' (modal) or 'dictate' (in-input)
    targetInput: null,
    targetBtn: null,
    interimTranscript: '',
    finalTranscript: '',
    hasError: false,
    lastError: null,

    getLanguageCode() {
        let lang = 'en';
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                lang = window.localStorage.getItem('farmassist_lang') || window.localStorage.getItem('flora_lang') || 'en';
            }
        } catch (e) {}
        if (lang === 'kn') return 'kn-IN';
        if (lang === 'hi') return 'hi-IN';
        return 'en-US';
    },

    getTranslation(key, defaultText) {
        let lang = 'en';
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                lang = window.localStorage.getItem('farmassist_lang') || window.localStorage.getItem('flora_lang') || 'en';
            }
        } catch (e) {}
        if (typeof window !== 'undefined' && window.TRANSLATIONS && window.TRANSLATIONS[lang] && window.TRANSLATIONS[lang][key]) {
            return window.TRANSLATIONS[lang][key];
        }
        return defaultText;
    },

    isSupported() {
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    },

    // Cleanly tear down any active session
    cleanup() {
        if (this.recognition) {
            try {
                this.recognition.onstart = null;
                this.recognition.onend = null;
                this.recognition.onerror = null;
                this.recognition.onresult = null;
                this.recognition.abort();
            } catch (err) {
                console.warn("[VoiceAssistant] Cleanup abort error:", err);
            }
            this.recognition = null;
        }
        this.isListening = false;
        this.updateTriggerButtons(false);
    },

    // Update active listening pulse on buttons
    updateTriggerButtons(listening) {
        const buttons = [
            document.getElementById('nav-voice-assistant-btn'),
            document.getElementById('studio-voice-btn'),
            document.getElementById('search-voice-btn'),
            this.targetBtn
        ];
        buttons.forEach(btn => {
            if (btn) {
                if (listening) {
                    btn.classList.add('is-listening');
                } else {
                    btn.classList.remove('is-listening');
                }
            }
        });
    },

    // =========================================================================
    // 1. Global Voice Assistant (Modal Mode)
    // =========================================================================
    start() {
        // Toggle behavior: if already listening in command mode, stop cleanly
        if (this.isListening && this.activeMode === 'command') {
            this.stop();
            return;
        }

        this.cleanup();

        if (!this.isSupported()) {
            alert(this.getTranslation('voice_err_unsupported', "Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari."));
            return;
        }

        this.activeMode = 'command';
        this.targetInput = null;
        this.targetBtn = null;
        this.interimTranscript = '';
        this.finalTranscript = '';
        this.hasError = false;
        this.lastError = null;

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = this.getLanguageCode();

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateTriggerButtons(true);
            this.showVoiceModal(true);
        };

        this.recognition.onresult = (event) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const text = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += text;
                } else {
                    interim += text;
                }
            }

            this.interimTranscript = interim;
            if (final) this.finalTranscript = final;

            const display = final || interim;
            const transcriptEl = document.getElementById('voice-modal-transcript');
            if (transcriptEl && display) {
                transcriptEl.textContent = `"${display.trim()}"`;
                transcriptEl.classList.add('active-heard');
            }
        };

        this.recognition.onerror = (event) => {
            console.error("[VoiceAssistant] Recognition error:", event.error);
            this.hasError = true;
            this.lastError = event.error;
            this.isListening = false;
            this.updateTriggerButtons(false);
            this.handleErrorState(event.error);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateTriggerButtons(false);

            if (!this.hasError) {
                const heard = (this.finalTranscript || this.interimTranscript).trim();
                if (heard) {
                    const transcriptEl = document.getElementById('voice-modal-transcript');
                    if (transcriptEl) {
                        transcriptEl.textContent = `"${heard}"`;
                        transcriptEl.classList.add('active-heard');
                    }
                    const statusEl = document.getElementById('voice-modal-status');
                    if (statusEl) statusEl.textContent = "Processing...";

                    setTimeout(() => {
                        this.showVoiceModal(false);
                        this.handleCommand(heard.toLowerCase());
                    }, 400);
                } else {
                    // Ended with no speech captured
                    this.handleErrorState('no-speech');
                }
            }
        };

        try {
            this.recognition.start();
        } catch (err) {
            console.warn("[VoiceAssistant] Error starting speech recognition:", err);
            this.handleErrorState('start-error');
        }
    },

    stop() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (err) {
                this.cleanup();
            }
        } else {
            this.cleanup();
        }
        this.showVoiceModal(false);
    },

    retry() {
        if (this.activeMode === 'dictate' && this.targetInput) {
            this.dictateToInput(this.targetInput, this.targetBtn);
        } else {
            this.start();
        }
    },

    simulateCommand(cmd) {
        this.stop();
        this.handleCommand(cmd);
    },

    showVoiceModal(show) {
        let modal = document.getElementById('voice-assistant-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'voice-assistant-modal';
            modal.className = 'voice-modal-overlay';
            modal.innerHTML = `
                <div class="voice-modal-card">
                    <div class="voice-pulse-ring" id="voice-modal-ring">
                        <i class="fa-solid fa-microphone" style="font-size: 2rem; color: #10b981;"></i>
                    </div>
                    <h4 id="voice-modal-status" style="margin: 1.25rem 0 0.4rem; color: #062b1a; font-weight: 700;">Listening...</h4>
                    <p id="voice-modal-hint" style="color: #64748b; font-size: 0.88rem; margin-bottom: 0.75rem;">Speak a command or search query</p>
                    
                    <div id="voice-modal-transcript" class="voice-live-transcript" data-placeholder="Listening... speak now"></div>
                    
                    <div id="voice-modal-chips" class="voice-chips">
                        <span class="voice-chip" id="chip-home" onclick="VoiceAssistant.simulateCommand('home')">Home</span>
                        <span class="voice-chip" id="chip-scan" onclick="VoiceAssistant.simulateCommand('scan')">Scan Leaf</span>
                        <span class="voice-chip" id="chip-remedies" onclick="VoiceAssistant.simulateCommand('remedies')">Remedies</span>
                        <span class="voice-chip" id="chip-camera" onclick="VoiceAssistant.simulateCommand('camera')">Camera</span>
                    </div>
                    
                    <div id="voice-modal-error" class="voice-error-box" style="display: none;">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <div id="voice-modal-err-text"></div>
                    </div>
                    
                    <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 1.25rem;">
                        <button type="button" id="voice-modal-retry-btn" class="btn-primary" style="display: none; padding: 0.45rem 1.25rem; font-size: 0.85rem;" onclick="VoiceAssistant.retry()">Try Again</button>
                        <button type="button" id="voice-modal-cancel-btn" class="btn-secondary" style="color: #062b1a; border-color: #cbd5e1; padding: 0.45rem 1.25rem; font-size: 0.85rem;" onclick="VoiceAssistant.stop()">Cancel</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Close on clicking backdrop
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    VoiceAssistant.stop();
                }
            });
        }

        const ringEl = document.getElementById('voice-modal-ring');
        const statusEl = document.getElementById('voice-modal-status');
        const hintEl = document.getElementById('voice-modal-hint');
        const transcriptEl = document.getElementById('voice-modal-transcript');
        const errorEl = document.getElementById('voice-modal-error');
        const retryBtn = document.getElementById('voice-modal-retry-btn');
        const chipsEl = document.getElementById('voice-modal-chips');

        // Reset state elements
        if (ringEl) ringEl.classList.remove('has-error');
        if (errorEl) errorEl.style.display = 'none';
        if (retryBtn) retryBtn.style.display = 'none';
        if (chipsEl) chipsEl.style.display = 'flex';

        if (statusEl) statusEl.textContent = this.getTranslation('voice_listening_title', 'Listening...');
        if (hintEl) hintEl.textContent = this.getTranslation('voice_modal_hint', 'Speak a command: "Home", "Scan", "FarmAssist", "Camera", or search query');
        if (transcriptEl) {
            transcriptEl.textContent = '';
            transcriptEl.classList.remove('active-heard');
            transcriptEl.setAttribute('data-placeholder', this.getTranslation('voice_listening_transcript', 'Listening... speak now'));
        }

        // Localized chip labels
        const chipHome = document.getElementById('chip-home');
        const chipScan = document.getElementById('chip-scan');
        const chipRemedies = document.getElementById('chip-remedies');
        const chipCamera = document.getElementById('chip-camera');
        if (chipHome) chipHome.textContent = this.getTranslation('voice_chip_home', 'Home');
        if (chipScan) chipScan.textContent = this.getTranslation('voice_chip_scan', 'Scan Leaf');
        if (chipRemedies) chipRemedies.textContent = this.getTranslation('voice_chip_remedies', 'Remedies');
        if (chipCamera) chipCamera.textContent = this.getTranslation('voice_chip_camera', 'Camera');

        modal.style.display = show ? 'flex' : 'none';
    },

    handleErrorState(errCode) {
        const modal = document.getElementById('voice-assistant-modal');
        if (!modal || modal.style.display !== 'flex') {
            this.showVoiceModal(true);
        }

        const ringEl = document.getElementById('voice-modal-ring');
        const statusEl = document.getElementById('voice-modal-status');
        const hintEl = document.getElementById('voice-modal-hint');
        const errorEl = document.getElementById('voice-modal-error');
        const errTextEl = document.getElementById('voice-modal-err-text');
        const retryBtn = document.getElementById('voice-modal-retry-btn');
        const chipsEl = document.getElementById('voice-modal-chips');

        if (ringEl) ringEl.classList.add('has-error');
        if (statusEl) statusEl.textContent = "Microphone Alert";
        if (hintEl) hintEl.textContent = "Please check microphone access";
        if (chipsEl) chipsEl.style.display = 'none';

        let msg = "";
        if (errCode === 'not-allowed' || errCode === 'service-not-allowed') {
            msg = this.getTranslation('voice_err_denied', "Microphone permission denied. Please allow microphone access in your browser address bar.");
        } else if (errCode === 'no-speech') {
            msg = this.getTranslation('voice_err_no_speech', "No speech detected. Please speak clearly into your microphone and try again.");
        } else if (errCode === 'network') {
            msg = this.getTranslation('voice_err_network', "Network error: Web speech service unreachable. Check your internet connection.");
        } else {
            msg = this.getTranslation('voice_err_no_speech', "Microphone input was interrupted. Click 'Try Again' to speak.");
        }

        if (errTextEl) errTextEl.textContent = msg;
        if (errorEl) errorEl.style.display = 'flex';
        if (retryBtn) {
            retryBtn.style.display = 'inline-flex';
            retryBtn.textContent = this.getTranslation('voice_btn_try_again', 'Try Again');
        }
    },

    // =========================================================================
    // 2. Direct In-Input Voice Dictation
    // =========================================================================
    dictateToInput(inputEl, triggerBtn) {
        if (!inputEl) return;

        // Toggle off if currently dictating to this field
        if (this.isListening && this.targetInput === inputEl) {
            this.stop();
            return;
        }

        this.cleanup();

        if (!this.isSupported()) {
            alert(this.getTranslation('voice_err_unsupported', "Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari."));
            return;
        }

        this.activeMode = 'dictate';
        this.targetInput = inputEl;
        this.targetBtn = triggerBtn;
        this.interimTranscript = '';
        this.finalTranscript = '';
        this.hasError = false;

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = this.getLanguageCode();

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateTriggerButtons(true);
            inputEl.placeholder = this.getTranslation('voice_listening_transcript', "Listening... speak now");
        };

        this.recognition.onresult = (event) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const text = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += text;
                } else {
                    interim += text;
                }
            }

            const current = final || interim;
            if (current) {
                inputEl.value = current;
                // Dispatch input event so live search & filtering updates immediately
                inputEl.dispatchEvent(new Event('input', { bubbles: true }));
            }
        };

        this.recognition.onerror = (event) => {
            console.error("[VoiceAssistant] Dictation error:", event.error);
            this.isListening = false;
            this.updateTriggerButtons(false);
            if (event.error === 'not-allowed') {
                alert(this.getTranslation('voice_err_denied', "Microphone permission denied. Please allow microphone access in your browser address bar."));
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateTriggerButtons(false);
            inputEl.dispatchEvent(new Event('change', { bubbles: true }));
        };

        try {
            this.recognition.start();
        } catch (err) {
            console.warn("[VoiceAssistant] Dictation start error:", err);
            this.cleanup();
        }
    },

    // =========================================================================
    // 3. Voice Command Parser & Navigation Engine
    // =========================================================================
    handleCommand(cmd) {
        if (!cmd) return;
        console.log("[VoiceAssistant] Processing command:", cmd);

        // Language switching commands
        if (cmd.includes('kannada') || cmd.includes('ಕನ್ನಡ')) {
            if (window.switchLanguage) window.switchLanguage('kn');
            else { localStorage.setItem('farmassist_lang', 'kn'); window.location.reload(); }
            return;
        }
        if (cmd.includes('hindi') || cmd.includes('हिंदी') || cmd.includes('हिन्दी')) {
            if (window.switchLanguage) window.switchLanguage('hi');
            else { localStorage.setItem('farmassist_lang', 'hi'); window.location.reload(); }
            return;
        }
        if (cmd.includes('english') || cmd.includes('ಇಂಗ್ಲಿಷ್') || cmd.includes('अंग्रेजी')) {
            if (window.switchLanguage) window.switchLanguage('en');
            else { localStorage.setItem('farmassist_lang', 'en'); window.location.reload(); }
            return;
        }

        // Navigation: Home
        if (
            cmd.includes('home') || cmd.includes('homepage') || cmd.includes('main page') ||
            cmd.includes('ಮುಖಪುಟ') || cmd.includes('ಹೋಮ್') || cmd.includes('ಮನೆ') ||
            cmd.includes('होम') || cmd.includes('घर') || cmd.includes('मुख्य पृष्ठ')
        ) {
            window.location.href = '/';
            return;
        }

        // Navigation: Scan Leaf / Diagnostic Studio
        if (
            cmd.includes('scan') || cmd.includes('diagnos') || cmd.includes('leaf') || cmd.includes('studio') ||
            cmd.includes('ಸ್ಕ್ಯಾನ್') || cmd.includes('ಪರೀಕ್ಷೆ') || cmd.includes('ತಪಾಸಣೆ') ||
            cmd.includes('स्कैन') || cmd.includes('जांच') || cmd.includes('निदान')
        ) {
            // If already on /index, focus camera or file input
            if (window.location.pathname === '/index') {
                const camBtn = document.getElementById('open-cam-btn');
                if (camBtn) camBtn.click();
            } else {
                window.location.href = '/index';
            }
            return;
        }

        // Navigation: Remedies / FarmAssist Guide
        if (
            cmd.includes('farmassist') || cmd.includes('farm assist') || cmd.includes('remedy') || cmd.includes('remedies') ||
            cmd.includes('medicine') || cmd.includes('market') || cmd.includes('supplement') || cmd.includes('fertilizer') ||
            cmd.includes('ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್') || cmd.includes('ಔಷಧ') || cmd.includes('ಗೊಬ್ಬರ') || cmd.includes('ಮಾರುಕಟ್ಟೆ') || cmd.includes('ಉಪಚಾರ') ||
            cmd.includes('फार्मअसिस्ट') || cmd.includes('दवा') || cmd.includes('उपचार') || cmd.includes('खाद') || cmd.includes('इलाज')
        ) {
            window.location.href = '/farmassist';
            return;
        }

        // Navigation: Help / Support / Guides
        if (
            cmd.includes('help') || cmd.includes('support') || cmd.includes('contact') || cmd.includes('guide') || cmd.includes('faq') ||
            cmd.includes('ಸಹಾಯ') || cmd.includes('ಮಾರ್ಗದರ್ಶಿ') || cmd.includes('ಸಂಪರ್ಕ') ||
            cmd.includes('मदद') || cmd.includes('सहायता') || cmd.includes('संपर्क')
        ) {
            window.location.href = '/contact';
            return;
        }

        // Studio actions: Live camera snap & file browse
        if (cmd.includes('camera') || cmd.includes('ಕ್ಯಾಮೆರಾ') || cmd.includes('कैमरा')) {
            const camBtn = document.getElementById('open-cam-btn');
            if (camBtn) camBtn.click();
            else window.location.href = '/index';
            return;
        }

        if (cmd.includes('snap') || cmd.includes('take photo') || cmd.includes('capture') || cmd.includes('shoot') || cmd.includes('ಚಿತ್ರ ತೆಗೆ') || cmd.includes('ಫೋಟೋ') || cmd.includes('फोटो खींचो')) {
            const captureBtn = document.getElementById('capture-btn');
            if (captureBtn) captureBtn.click();
            return;
        }

        if (cmd.includes('upload') || cmd.includes('browse') || cmd.includes('choose file') || cmd.includes('file') || cmd.includes('ಫೈಲ್') || cmd.includes('ಅಪ್ಲೋಡ್') || cmd.includes('अपलोड') || cmd.includes('फ़ाइल')) {
            const browseBtn = document.getElementById('browse-btn');
            if (browseBtn) browseBtn.click();
            else window.location.href = '/index';
            return;
        }

        if (cmd.includes('submit') || cmd.includes('analyze') || cmd.includes('run diagnosis') || cmd.includes('ವಿಶ್ಲೇಷಿಸು') || cmd.includes('विश्लेषण')) {
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn && !submitBtn.disabled) submitBtn.click();
            return;
        }

        if (cmd.includes('cancel') || cmd.includes('close camera') || cmd.includes('ರದ್ದು') || cmd.includes('बंद करो')) {
            const closeCamBtn = document.getElementById('close-cam-btn');
            if (closeCamBtn) closeCamBtn.click();
            return;
        }

        // Search Queries:
        // Clean query of command prefixes like "search", "find", "ಹುಡುಕು", "खोजें"
        let searchQuery = cmd
            .replace(/^(search for|search|find|look for|ಹುಡುಕು|ಹುಡುಕಿ|खोजें|ढूंढें)\s*/i, '')
            .trim();

        if (!searchQuery) searchQuery = cmd;

        const searchInput = document.getElementById('farmassist-search-input') || document.getElementById('market-search-input');
        if (searchInput) {
            // Already on remedies / market page: filter directly
            searchInput.value = searchQuery;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            // On other pages: route to remedies page with search query parameter
            window.location.href = `/farmassist?search=${encodeURIComponent(searchQuery)}`;
        }
    }
};

// =============================================================================
// DOM Binding & Initialization
// =============================================================================
function initVoiceAssistantBindings() {
    // 1. Top Navbar Voice Assistant Button
    const navMicBtn = document.getElementById('nav-voice-assistant-btn');
    if (navMicBtn && !navMicBtn.getAttribute('data-voice-bound')) {
        navMicBtn.setAttribute('data-voice-bound', 'true');
        navMicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            VoiceAssistant.start();
        });
    }

    // 2. Studio Diagnostic Voice Command Button
    const studioMicBtn = document.getElementById('studio-voice-btn');
    if (studioMicBtn && !studioMicBtn.getAttribute('data-voice-bound')) {
        studioMicBtn.setAttribute('data-voice-bound', 'true');
        studioMicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            VoiceAssistant.start();
        });
    }

    // 3. Search Input Dedicated Microphone Button (FarmAssist / Market page)
    const searchMicBtn = document.getElementById('search-voice-btn');
    const searchInput = document.getElementById('farmassist-search-input') || document.getElementById('market-search-input');
    if (searchMicBtn && searchInput && !searchMicBtn.getAttribute('data-voice-bound')) {
        searchMicBtn.setAttribute('data-voice-bound', 'true');
        searchMicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            VoiceAssistant.dictateToInput(searchInput, searchMicBtn);
        });
    }
}

// Bind immediately if DOM is ready, or on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoiceAssistantBindings);
} else {
    initVoiceAssistantBindings();
}

// Expose globally for inline event handlers and external scripts
window.VoiceAssistant = VoiceAssistant;
