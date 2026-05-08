// ============================================================
//  src/components/layout/Topbar.jsx
// ============================================================

import React from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English'   },
  { code: 'kn', label: 'ಕನ್ನಡ'     },
  { code: 'hi', label: 'हिंदी'    },
  { code: 'ur', label: 'اردو'      },
  { code: 'ta', label: 'தமிழ்'    },
];

export default function Topbar({
  currentLang,
  onChangeLang,
  isHighContrast,
  isLargeText,
  isOffline,
  onToggleContrast,
  onToggleTextSize,
  onToggleOffline,
}) {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <i className="ti ti-heartbeat" style={{ fontSize: 28 }} />
        <div>
          ಆರೋಗ್ಯ ದ್ವಾರ · Arogya Dwaar
          <span className="tagline">Karnataka Healthcare Accessibility Portal</span>
        </div>
      </div>

      <div className="topbar-controls">
        <select
          className="lang-sel"
          value={currentLang}
          onChange={(e) => onChangeLang(e.target.value)}
          aria-label="Select language"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>

        <button
          className={`ctrl-btn ${isHighContrast ? 'active' : ''}`}
          onClick={onToggleContrast}
          aria-pressed={isHighContrast}
        >
          <i className="ti ti-contrast" /> High Contrast
        </button>

        <button
          className={`ctrl-btn ${isLargeText ? 'active' : ''}`}
          onClick={onToggleTextSize}
          aria-pressed={isLargeText}
        >
          <i className="ti ti-text-size" /> Large Text
        </button>

        <button
          className={`ctrl-btn ${isOffline ? 'active' : ''}`}
          onClick={onToggleOffline}
          aria-pressed={isOffline}
        >
          <i className="ti ti-wifi-off" /> Offline Mode
        </button>
      </div>
    </div>
  );
}
