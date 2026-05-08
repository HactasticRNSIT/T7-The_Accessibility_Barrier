// ============================================================
//  src/components/layout/EmergencyBar.jsx
// ============================================================

import React from 'react';

export default function EmergencyBar({ t, onCallEmergency, onShareLocation }) {
  return (
    <div className="emergency-bar" role="alert" aria-live="polite">
      <div className="ebar-title">
        <i className="ti ti-alert-triangle" />
        <span>{t('ebarTitle')}</span>
      </div>

      <button
        className="ebar-btn ambulance"
        onClick={() => onCallEmergency('ambulance')}
        aria-label="Call Ambulance 108"
      >
        <i className="ti ti-ambulance" />
        <span>{t('eCallAmb')}</span>
      </button>

      <button
        className="ebar-btn caregiver"
        onClick={() => onCallEmergency('caregiver')}
        aria-label="Send caregiver alert"
      >
        <i className="ti ti-user-heart" />
        <span>{t('eCallCare')}</span>
      </button>

      <button
        className="ebar-btn location"
        onClick={onShareLocation}
        aria-label="Share your location"
      >
        <i className="ti ti-map-pin" />
        <span>{t('eShareLoc')}</span>
      </button>

      <button
        className="ebar-btn"
        onClick={() => onCallEmergency('police')}
        style={{ background: '#6c63ff', color: '#fff' }}
        aria-label="Call Police 100"
      >
        <i className="ti ti-shield" /> 100
      </button>
    </div>
  );
}
