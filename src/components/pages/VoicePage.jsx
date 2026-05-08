// ============================================================
//  src/components/pages/VoicePage.jsx
// ============================================================

import React from 'react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition.js';

const VOICE_LANGS = [
  { code: 'en', bcp: 'en-IN', label: 'English' },
  { code: 'kn', bcp: 'kn-IN', label: 'ಕನ್ನಡ'   },
  { code: 'hi', bcp: 'hi-IN', label: 'हिंदी'   },
  { code: 'ta', bcp: 'ta-IN', label: 'தமிழ்'   },
  { code: 'te', bcp: 'te-IN', label: 'తెలుగు'  },
  { code: 'ur', bcp: 'ur-IN', label: 'اردو'     },
];

export default function VoicePage({
  voiceLang, setVoiceLang,
  isListening, setIsListening,
  voiceStatus, setVoiceStatus,
  voiceResponse,
  processInput, speak, showToast,
  onNavigate,
}) {
  const { start, stop, isSupported } = useVoiceRecognition({
    lang: voiceLang,
    onResult: (transcript) => {
      setVoiceStatus(`You said: "${transcript}"`);
      processInput(transcript);
    },
    onError: () => {
      showToast('Could not hear clearly. Please try again.');
      setVoiceStatus('Tap the microphone to speak');
    },
    onEnd: () => setVoiceStatus('Tap the microphone to speak'),
    setListening: setIsListening,
  });

  function toggleVoice() {
    if (!isSupported()) {
      showToast('Voice recognition not supported in this browser');
      // Simulate for demo
      setVoiceStatus('🔴 Demo mode: Simulating voice...');
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        processInput('nearest hospital');
      }, 1800);
      return;
    }
    if (isListening) {
      stop();
      setVoiceStatus('Tap the microphone to speak');
    } else {
      setVoiceStatus('🔴 Listening... Speak now');
      start();
    }
  }

  return (
    <div>
      <div className="voice-widget">
        <div className="voice-title">
          <i className="ti ti-robot" /> AI Health Assistant — Dr. Aarogya
        </div>
        <div className="voice-status" aria-live="polite">{voiceStatus}</div>

        <div
          className={`voice-icon${isListening ? ' listening' : ''}`}
          onClick={toggleVoice}
          role="button"
          tabIndex={0}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
          onKeyDown={(e) => e.key === 'Enter' && toggleVoice()}
        >
          <i className={`ti ${isListening ? 'ti-microphone-off' : 'ti-microphone'}`} />
        </div>

        {/* Language selector */}
        <div className="voice-lang-row">
          {VOICE_LANGS.map((l) => (
            <button
              key={l.code}
              className={`vlang-btn${voiceLang === l.bcp ? ' active' : ''}`}
              onClick={() => {
                setVoiceLang(l.bcp);
                showToast(`Voice language: ${l.label}`);
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="voice-response" aria-live="polite" aria-label="AI response">
          {voiceResponse}
        </div>

        <div className="voice-actions">
          <button className="vact-btn" onClick={() => speak(voiceResponse)}>
            <i className="ti ti-volume" /> Read Aloud
          </button>
          <button className="vact-btn outline" onClick={() => { processInput('nearest hospital'); }}>
            <i className="ti ti-building-hospital" /> Nearest Hospital
          </button>
          <button className="vact-btn outline" onClick={() => { processInput('government schemes'); }}>
            <i className="ti ti-file-certificate" /> My Schemes
          </button>
          <button className="vact-btn outline" onClick={() => { processInput('risk score'); onNavigate('risk'); }}>
            <i className="ti ti-shield-check" /> Check Risk
          </button>
        </div>
      </div>
    </div>
  );
}
