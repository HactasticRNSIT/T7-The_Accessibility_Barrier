// ============================================================
//  src/hooks/useVoiceRecognition.js
//  Wrapper around the Web Speech API (SpeechRecognition)
// ============================================================

import { useRef, useCallback } from 'react';

/**
 * useVoiceRecognition
 *
 * @param {object} opts
 * @param {string}   opts.lang          - BCP-47 language tag, e.g. "kn-IN"
 * @param {function} opts.onResult      - called with the transcript string
 * @param {function} opts.onError       - called on error
 * @param {function} opts.onEnd         - called when recognition ends
 * @param {function} opts.setListening  - setter to update listening state
 */
export function useVoiceRecognition({ lang, onResult, onError, onEnd, setListening }) {
  const recognitionRef = useRef(null);

  const isSupported = () =>
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const start = useCallback(() => {
    if (!isSupported()) return false;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang            = lang;
    r.continuous      = false;
    r.interimResults  = false;

    r.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };

    r.onerror = () => {
      onError?.();
      setListening(false);
    };

    r.onend = () => {
      onEnd?.();
      setListening(false);
    };

    recognitionRef.current = r;
    r.start();
    setListening(true);
    return true;
  }, [lang, onResult, onError, onEnd, setListening]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  }, [setListening]);

  return { start, stop, isSupported };
}
