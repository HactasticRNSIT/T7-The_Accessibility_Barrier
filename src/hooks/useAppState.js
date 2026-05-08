// ============================================================
//  src/hooks/useAppState.js
//  Central application state and shared logic
// ============================================================

import { useState, useCallback, useRef } from 'react';
import { translations, aiResponses } from '../data/index.js';

/**
 * useAppState — single source of truth for all cross-cutting
 * concerns: language, accessibility toggles, voice, toast,
 * active page, and AI chat.
 */
export function useAppState() {
  // ---- Navigation ----
  const [activePage, setActivePage] = useState('home');

  // ---- Accessibility ----
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText]       = useState(false);
  const [isOffline, setIsOffline]           = useState(false);

  // ---- Language ----
  const [currentLang, setCurrentLang] = useState('en');
  const t = (key) => (translations[currentLang] || translations['en'])[key] || key;

  // ---- Toast ----
  const [toastMsg, setToastMsg]     = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2800);
  }, []);

  // ---- Voice assistant state ----
  const [voiceLang, setVoiceLang]         = useState('en-IN');
  const [isListening, setIsListening]     = useState(false);
  const [voiceStatus, setVoiceStatus]     = useState('Tap the microphone to speak in your language');
  const [voiceResponse, setVoiceResponse] = useState(
    '👋 Hello! I am Dr. Aarogya, your health assistant. I can help you find hospitals, understand your health scheme benefits, locate NGOs, or guide you on preventive care. Please tap the microphone and speak!'
  );

  // ---- Chat history ----
  const [chatHistory, setChatHistory] = useState([]);

  // ---- AI response lookup ----
  const processInput = useCallback((text) => {
    const lower = text.toLowerCase();
    let response = aiResponses['default'];
    for (const key of Object.keys(aiResponses)) {
      if (key !== 'default' && lower.includes(key)) {
        response = aiResponses[key];
        break;
      }
    }
    setVoiceResponse(response);
    setVoiceStatus('✅ Response ready. Tap "Read Aloud" to hear it.');
    setChatHistory((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'bot',  text: response },
    ]);
  }, []);

  // ---- Text-to-speech ----
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) {
      showToast('Text-to-speech not supported');
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang  = voiceLang;
    u.rate  = 0.9;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
    showToast('🔊 Reading aloud...');
  }, [voiceLang, showToast]);

  // ---- Toggles ----
  const toggleContrast = useCallback(() => {
    setIsHighContrast((v) => {
      const next = !v;
      document.body.classList.toggle('high-contrast', next);
      return next;
    });
    showToast(isHighContrast ? 'High Contrast OFF' : 'High Contrast ON');
  }, [isHighContrast, showToast]);

  const toggleTextSize = useCallback(() => {
    setIsLargeText((v) => {
      const next = !v;
      document.body.classList.toggle('large-text', next);
      return next;
    });
    showToast(isLargeText ? 'Normal Text' : 'Large Text ON');
  }, [isLargeText, showToast]);

  const toggleOffline = useCallback(() => {
    setIsOffline((v) => {
      const next = !v;
      showToast(next ? 'Offline Mode: Showing cached data' : 'Online Mode: Live data active');
      return next;
    });
  }, [showToast]);

  // ---- Emergency ----
  const callEmergency = useCallback((type) => {
    const msgs = {
      ambulance: 'Dialling 108 Ambulance...',
      caregiver: 'Sending alert to registered caregiver...',
      police:    'Dialling Police 100...',
    };
    showToast('🚨 ' + (msgs[type] || 'Emergency initiated!'));
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance('Emergency assistance requested. ' + (msgs[type] || ''));
      window.speechSynthesis.speak(u);
    }
  }, [showToast]);

  const shareLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => showToast(`📍 Location shared: ${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`),
        ()  => showToast('📍 Location: Bengaluru, Karnataka (default)')
      );
    } else {
      showToast('📍 Location shared with emergency services');
    }
  }, [showToast]);

  return {
    activePage, setActivePage,
    isHighContrast, isLargeText, isOffline,
    toggleContrast, toggleTextSize, toggleOffline,
    currentLang, setCurrentLang, t,
    showToast, toastMsg, toastVisible,
    voiceLang, setVoiceLang,
    isListening, setIsListening,
    voiceStatus, setVoiceStatus,
    voiceResponse, setVoiceResponse,
    chatHistory, setChatHistory,
    processInput, speak,
    callEmergency, shareLocation,
  };
}
