// ============================================================
//  src/components/pages/ServicesPage.jsx
// ============================================================

import React, { useRef, useEffect } from 'react';
import { hospitals, ngos, vanSchedule } from '../../data/index.js';

export default function ServicesPage({ showToast, scrollToNGO }) {
  const ngoRef = useRef(null);

  useEffect(() => {
    if (scrollToNGO && ngoRef.current) {
      ngoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToNGO]);

  return (
    <div>
      {/* Hospitals */}
      <div className="card">
        <div className="card-title">
          <i className="ti ti-building-hospital" /> Nearest Hospitals & PHCs — Karnataka
        </div>
        {hospitals.map((h) => (
          <div key={h.name} className="contact-card">
            <div className="contact-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <i className="ti ti-building-hospital" />
            </div>
            <div className="contact-info">
              <div className="contact-name">{h.name}</div>
              <div className="contact-sub">
                <span className="tag" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  {h.type}
                </span>
                {h.dist} · {h.beds} beds · {h.specialty}
              </div>
            </div>
            <button
              className="contact-call"
              onClick={() => showToast(`Calling ${h.name}...`)}
              aria-label={`Call ${h.name} at ${h.phone}`}
            >
              <i className="ti ti-phone" /> {h.phone}
            </button>
          </div>
        ))}
      </div>

      {/* Telemedicine */}
      <div className="card">
        <div className="card-title">
          <i className="ti ti-device-desktop-analytics" /> Telemedicine Services
        </div>
        <div className="grid2">
          <div style={{ background: 'var(--primary-light)', borderRadius: 12, padding: 14 }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
              <i className="ti ti-video" /> eSanjeevani
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', margin: '6px 0' }}>
              Free teleconsultation by Govt of India. Available in Kannada, Hindi, English.
            </div>
            <button className="vact-btn" style={{ fontSize: 13 }} onClick={() => showToast('Opening eSanjeevani portal...')}>
              <i className="ti ti-external-link" /> Launch
            </button>
          </div>
          <div style={{ background: 'var(--info-light)', borderRadius: 12, padding: 14 }}>
            <div style={{ fontWeight: 700, color: 'var(--info)' }}>
              <i className="ti ti-stethoscope" /> Practo Care
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', margin: '6px 0' }}>
              24/7 doctor on call. Supports voice navigation. Subsidised for Ayushman card holders.
            </div>
            <button className="vact-btn" style={{ fontSize: 13, background: 'var(--info)' }} onClick={() => showToast('Opening Practo Care...')}>
              <i className="ti ti-external-link" /> Launch
            </button>
          </div>
        </div>
      </div>

      {/* NGO partners */}
      <div className="card" ref={ngoRef}>
        <div className="card-title">
          <i className="ti ti-heart-handshake" /> NGO Partners — Karnataka
        </div>
        {ngos.map((n) => (
          <div key={n.name} className="contact-card">
            <div className="contact-icon" style={{ background: '#e8f0ff', color: '#1a5fb4' }}>
              <i className="ti ti-heart-handshake" />
            </div>
            <div className="contact-info">
              <div className="contact-name">{n.name}</div>
              <div className="contact-sub">{n.area} · {n.focus}</div>
            </div>
            <button
              className="contact-call"
              onClick={() => showToast(`Connecting to ${n.name}...`)}
              aria-label={`Connect with ${n.name}`}
            >
              <i className="ti ti-phone" /> Call
            </button>
          </div>
        ))}
      </div>

      {/* Mobile van schedule */}
      <div className="card">
        <div className="card-title">
          <i className="ti ti-truck" /> Mobile Health Van Schedule
        </div>
        {vanSchedule.map((s) => (
          <div
            key={s.d}
            style={{
              display: 'flex', gap: 12, padding: '10px 0',
              borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
            }}
          >
            <div style={{ minWidth: 120, fontWeight: 700 }}>{s.d}</div>
            <div style={{ flex: 1 }}>
              <span className="tag" style={{ background: 'var(--accent-light)', color: '#7a5000' }}>
                {s.days}
              </span>{' '}
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.time}</span>
              <br />
              <span style={{ fontSize: 13 }}>{s.services}</span>
            </div>
            <button
              className="contact-call"
              style={{ fontSize: 12 }}
              onClick={() => showToast(`Van schedule for ${s.d} noted!`)}
            >
              Remind Me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
