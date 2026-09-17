/**
 * FarmAssist - Offline Voice Interface & Speech Engine
 * Powered strictly by backend Vosk (/voice-command) to guarantee 100% offline execution.
 */

const VoiceAssistant = {
    isRecording: false,
    audioContext: null,
    audioProcessor: null,
    audioSource: null,
    mediaStream: null,
    audioData: [],
    recordTimeout: null,
    targetInput: null,
    activeMode: 'command',

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

    cleanup() {
        if (this.isRecording) {
            this.stopRecording(false);
        }
    },

    start() {
        if (this.isRecording) {
            this.stopRecording(false);
            return;
        }
        this.activeMode = 'command';
        this.startMicrophone();
    },

    dictateToInput(inputEl, triggerBtn) {
        if (this.isRecording && this.targetInput === inputEl) {
            this.stopRecording(false);
            return;
        }
        this.activeMode = 'dictate';
        this.targetInput = inputEl;
        this.startMicrophone();
    },

    async startMicrophone() {
        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContextClass({ sampleRate: 16000 });
            this.audioSource = this.audioContext.createMediaStreamSource(this.mediaStream);
            
            this.audioProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);
            this.audioData = [];
            
            this.audioProcessor.onaudioprocess = (e) => {
                const input = e.inputBuffer.getChannelData(0);
                for (let i = 0; i < input.length; i++) {
                    const s = Math.max(-1, Math.min(1, input[i]));
                    this.audioData.push(s < 0 ? s * 0x8000 : s * 0x7FFF);
                }
            };

            this.audioSource.connect(this.audioProcessor);
            this.audioProcessor.connect(this.audioContext.destination);

            this.isRecording = true;
            this.showVoiceModal(true);

            // Auto stop and process after 3.5 seconds of listening
            this.recordTimeout = setTimeout(() => {
                if (this.isRecording) this.stopRecording(true);
            }, 3500);

        } catch (err) {
            console.error('Microphone access error:', err);
            alert('Unable to access microphone for offline voice commands.');
        }
    },

    stopRecording(processAudio = true) {
        if (!this.isRecording) return;
        this.isRecording = false;
        clearTimeout(this.recordTimeout);

        if (this.audioProcessor) this.audioProcessor.disconnect();
        if (this.audioSource) this.audioSource.disconnect();
        if (this.audioContext && this.audioContext.state !== 'closed') this.audioContext.close();
        if (this.mediaStream) this.mediaStream.getTracks().forEach(t => t.stop());

        if (processAudio) {
            const statusEl = document.getElementById('voice-modal-status');
            if (statusEl) statusEl.textContent = "Processing Offline...";
            this.sendAudioToBackend();
        } else {
            this.showVoiceModal(false);
        }
    },

    stop() {
        this.stopRecording(false);
    },

    retry() {
        this.start();
    },

    simulateCommand(cmd) {
        this.stop();
        this.handleCommand(cmd);
    },

    sendAudioToBackend() {
        const buffer = new Int16Array(this.audioData);
        
        fetch('/voice-command', {
            method: 'POST',
            body: buffer.buffer,
            headers: { 'Content-Type': 'application/octet-stream' }
        })
        .then(res => res.json())
        .then(data => {
            const command = (data.text || "").toLowerCase().trim();
            console.log("Offline Voice Command Recognized: ", command);
            
            const transcriptEl = document.getElementById('voice-modal-transcript');
            if (transcriptEl && command) {
                transcriptEl.textContent = `"${command}"`;
                transcriptEl.classList.add('active-heard');
            } else if (transcriptEl) {
                transcriptEl.textContent = "No command recognized";
            }

            if (this.activeMode === 'dictate' && this.targetInput && command) {
                this.targetInput.value = command;
                this.targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(() => this.showVoiceModal(false), 600);
            } else {
                setTimeout(() => {
                    this.showVoiceModal(false);
                    if (command) this.handleCommand(command);
                }, 800);
            }
        })
        .catch(err => {
            console.error("Backend STT Error:", err);
            this.showVoiceModal(false);
        });
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
                    <h4 id="voice-modal-status" style="margin: 1.25rem 0 0.4rem; color: #062b1a; font-weight: 700;">Listening (Offline)...</h4>
                    <p id="voice-modal-hint" style="color: #64748b; font-size: 0.88rem; margin-bottom: 0.75rem;">Speak a command or search query</p>
                    
                    <div id="voice-modal-transcript" class="voice-live-transcript" data-placeholder="Listening... speak now"></div>
                    
                    <div id="voice-modal-chips" class="voice-chips">
                        <span class="voice-chip" id="chip-home" onclick="VoiceAssistant.simulateCommand('home')">Home</span>
                        <span class="voice-chip" id="chip-scan" onclick="VoiceAssistant.simulateCommand('scan')">Scan Leaf</span>
                        <span class="voice-chip" id="chip-remedies" onclick="VoiceAssistant.simulateCommand('remedies')">Remedies</span>
                        <span class="voice-chip" id="chip-camera" onclick="VoiceAssistant.simulateCommand('camera')">Camera</span>
                    </div>
                    
                    <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 1.25rem;">
                        <button type="button" id="voice-modal-cancel-btn" class="btn-secondary" style="color: #062b1a; border-color: #cbd5e1; padding: 0.45rem 1.25rem; font-size: 0.85rem;" onclick="VoiceAssistant.stop()">Cancel</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    VoiceAssistant.stop();
                }
            });
        }

        const statusEl = document.getElementById('voice-modal-status');
        const hintEl = document.getElementById('voice-modal-hint');
        const transcriptEl = document.getElementById('voice-modal-transcript');

        if (statusEl) statusEl.textContent = this.getTranslation('voice_listening_title', 'Listening (Offline)...');
        if (hintEl) hintEl.textContent = this.getTranslation('voice_modal_hint', 'Speak a command: "Home", "Scan", "FarmAssist", "Camera", or search query');
        if (transcriptEl) {
            transcriptEl.textContent = '';
            transcriptEl.classList.remove('active-heard');
            transcriptEl.setAttribute('data-placeholder', 'Listening... speak now');
        }

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

    handleCommand(cmd) {
        if (!cmd) return;
        console.log("[VoiceAssistant] Processing offline command:", cmd);

        // Language switching
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
        if (cmd.includes('home') || cmd.includes('homepage') || cmd.includes('main page')) {
            window.location.href = '/';
            return;
        }

        // Navigation: Scan Leaf / Diagnostic Studio
        if (cmd.includes('scan') || cmd.includes('diagnos') || cmd.includes('leaf') || cmd.includes('studio')) {
            if (window.location.pathname === '/index') {
                const camBtn = document.getElementById('open-cam-btn');
                if (camBtn) camBtn.click();
            } else {
                window.location.href = '/index';
            }
            return;
        }

        // Navigation: Remedies / FarmAssist
        if (cmd.includes('farmassist') || cmd.includes('remedy') || cmd.includes('remedies') || cmd.includes('market') || cmd.includes('supplement') || cmd.includes('fertilizer')) {
            window.location.href = '/farmassist';
            return;
        }

        // Navigation: Help / Support
        if (cmd.includes('help') || cmd.includes('support') || cmd.includes('contact') || cmd.includes('guide')) {
            window.location.href = '/contact';
            return;
        }

        // Studio actions
        if (cmd.includes('camera')) {
            const camBtn = document.getElementById('open-cam-btn');
            if (camBtn) camBtn.click();
            else window.location.href = '/index';
            return;
        }

        if (cmd.includes('snap') || cmd.includes('take photo') || cmd.includes('capture')) {
            const captureBtn = document.getElementById('capture-btn');
            if (captureBtn) captureBtn.click();
            return;
        }

        if (cmd.includes('upload') || cmd.includes('browse') || cmd.includes('file')) {
            const browseBtn = document.getElementById('browse-btn');
            if (browseBtn) browseBtn.click();
            else window.location.href = '/index';
            return;
        }

        if (cmd.includes('submit') || cmd.includes('analyze') || cmd.includes('run')) {
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn && !submitBtn.disabled) submitBtn.click();
            return;
        }

        if (cmd.includes('cancel') || cmd.includes('close')) {
            const closeCamBtn = document.getElementById('close-cam-btn');
            if (closeCamBtn) closeCamBtn.click();
            return;
        }

        // Search Queries
        let searchQuery = cmd.replace(/^(search for|search|find|look for)\s*/i, '').trim();
        if (!searchQuery) searchQuery = cmd;

        const searchInput = document.getElementById('farmassist-search-input') || document.getElementById('market-search-input');
        if (searchInput) {
            searchInput.value = searchQuery;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            window.location.href = `/farmassist?search=${encodeURIComponent(searchQuery)}`;
        }
    }
};

function initVoiceAssistantBindings() {
    const navMicBtn = document.getElementById('nav-voice-assistant-btn');
    if (navMicBtn && !navMicBtn.getAttribute('data-voice-bound')) {
        navMicBtn.setAttribute('data-voice-bound', 'true');
        navMicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            VoiceAssistant.start();
        });
    }

    const studioMicBtn = document.getElementById('studio-voice-btn');
    if (studioMicBtn && !studioMicBtn.getAttribute('data-voice-bound')) {
        studioMicBtn.setAttribute('data-voice-bound', 'true');
        studioMicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            VoiceAssistant.start();
        });
    }

    // Bind the global search voice button if exists
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoiceAssistantBindings);
} else {
    initVoiceAssistantBindings();
}

window.VoiceAssistant = VoiceAssistant;
