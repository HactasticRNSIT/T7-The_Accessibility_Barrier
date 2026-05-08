// ============================================================
//  src/components/pages/HomePage.jsx
// ============================================================

import React from 'react';

export default function HomePage({ t, onNavigate, onShowGroup, showToast, processInput, chatHistory }) {
  const [chatInput, setChatInput] = React.useState('');

  function sendChat() {
    const txt = chatInput.trim();
    if (!txt) return;
    setChatInput('');
    processInput(txt);
    onNavigate('voice');
  }

  function quickAsk(q) {
    processInput(q);
    onNavigate('voice');
  }

  function setGroup(g) {
    const msgs = {
      elderly:   'Elderly care services loaded. Showing geriatric programs, Rashtriya Vayoshri, and nearby senior centres.',
      disabled:  'Disability services loaded. Showing ADIP scheme, assistive devices, and rehabilitation centres.',
      rural:     'Rural health services loaded. Showing mobile vans, ASHA workers, and CHC locations.',
      caregiver: 'Caregiver resources loaded. Showing support helplines, respite care, and caregiver training.',
      women:     'Women & children services loaded. Showing maternal health, ICDS, and Anganwadi contacts.',
    };
    showToast(msgs[g] || 'Profile set!');
  }

  return (
    <div>
      {/* Welcome card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>
              {t('welcomeText')}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>
              {t('welcomeSub')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="vact-btn" onClick={() => setGroup('elderly')}>
              <i className="ti ti-user-check" /> Elderly
            </button>
            <button className="vact-btn outline" onClick={() => setGroup('disabled')}>
              <i className="ti ti-wheelchair" /> Disabled
            </button>
            <button className="vact-btn outline" onClick={() => setGroup('rural')}>
              <i className="ti ti-map" /> Rural
            </button>
            <button className="vact-btn outline" onClick={() => setGroup('caregiver')}>
              <i className="ti ti-heart-handshake" /> Caregiver
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid3" style={{ marginBottom: 14 }}>
        <div className="stat-card">
          <div className="stat-num">31</div>
          <div className="stat-label">Districts Covered</div>
        </div>
        <div className="stat-card warn">
          <div className="stat-num">8</div>
          <div className="stat-label">High-Risk Zones</div>
        </div>
        <div className="stat-card danger">
          <div className="stat-num">14%</div>
          <div className="stat-label">Elderly Unserved</div>
        </div>
        <div className="stat-card info">
          <div className="stat-num">247</div>
          <div className="stat-label">NGO Partners</div>
        </div>
      </div>

      {/* Quick services grid */}
      <div className="sec-head">
        <i className="ti ti-apps" /> <span>{t('quickTitle')}</span>
      </div>
      <div className="quick-grid">
        <div className="quick-btn" onClick={() => onNavigate('voice')}>
          <i className="ti ti-microphone" /><span>{t('qs1')}</span>
        </div>
        <div className="quick-btn" onClick={() => { onNavigate('services'); showToast('📍 Finding nearest hospitals in Karnataka...'); }}>
          <i className="ti ti-building-hospital" /><span>{t('qs2')}</span>
        </div>
        <div className="quick-btn" onClick={() => onNavigate('services')}>
          <i className="ti ti-nurse" /><span>{t('qs3')}</span>
        </div>
        <div className="quick-btn" onClick={() => onNavigate('schemes')}>
          <i className="ti ti-file-certificate" /><span>{t('qs4')}</span>
        </div>
        <div className="quick-btn" onClick={() => onNavigate('risk')}>
          <i className="ti ti-shield-check" /><span>{t('qs5')}</span>
        </div>
        <div className="quick-btn" onClick={() => onNavigate('dashboard')}>
          <i className="ti ti-chart-dots" /><span>{t('qs6')}</span>
        </div>
        <div className="quick-btn" onClick={() => onNavigate('services')}>
          <i className="ti ti-heart-handshake" /><span>{t('qs7')}</span>
        </div>
        <div className="quick-btn" onClick={() => showToast('🔊 Reading aloud...')}>
          <i className="ti ti-volume" /><span>{t('qs8')}</span>
        </div>
      </div>

      {/* Vulnerable group service cards */}
      <div className="sec-head">
        <i className="ti ti-users-group" /> Vulnerable Group Services
      </div>
      <div className="grid2">
        <div className="card" style={{ marginBottom: 0, borderLeft: '4px solid #1a6b3a' }}>
          <div className="card-title"><i className="ti ti-user-check" /> Elderly Care</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Geriatric screening, home visits, medicine delivery, pension-linked health cards, dementia support helpline.
          </div>
          <button className="vact-btn" style={{ marginTop: 12, fontSize: 13 }} onClick={() => onShowGroup('elderly')}>
            <i className="ti ti-arrow-right" /> Explore
          </button>
        </div>

        <div className="card" style={{ marginBottom: 0, borderLeft: '4px solid #1a5fb4' }}>
          <div className="card-title"><i className="ti ti-wheelchair" /> Disability Support</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Assistive devices, rehabilitation centres, UDID card help, sign-language teleconsult, adaptive wellness programs.
          </div>
          <button className="vact-btn" style={{ marginTop: 12, fontSize: 13, background: 'var(--info)' }} onClick={() => onShowGroup('disabled')}>
            <i className="ti ti-arrow-right" /> Explore
          </button>
        </div>

        <div className="card" style={{ marginBottom: 0, borderLeft: '4px solid #e67e22' }}>
          <div className="card-title"><i className="ti ti-map" /> Rural & Tribal</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Mobile health vans, ASHA workers, community health centres, offline-first services, local language support.
          </div>
          <button className="vact-btn" style={{ marginTop: 12, fontSize: 13, background: '#e67e22' }} onClick={() => onShowGroup('rural')}>
            <i className="ti ti-arrow-right" /> Explore
          </button>
        </div>

        <div className="card" style={{ marginBottom: 0, borderLeft: '4px solid #8e44ad' }}>
          <div className="card-title"><i className="ti ti-heart" /> Women & Children</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Maternal health, immunisation tracking, Anganwadi connect, domestic support services, nutrition programs.
          </div>
          <button className="vact-btn" style={{ marginTop: 12, fontSize: 13, background: '#8e44ad' }} onClick={() => onShowGroup('women')}>
            <i className="ti ti-arrow-right" /> Explore
          </button>
        </div>
      </div>

      {/* Dr. Aarogya chatbox */}
      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-title"><i className="ti ti-message-chatbot" /> Ask Dr. Aarogya</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={chatInput}
            placeholder="Type your health question..."
            style={{
              flex: 1, padding: '10px 14px',
              border: '1.5px solid var(--border)',
              borderRadius: 10, fontSize: 15, outline: 'none',
            }}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendChat()}
            aria-label="Ask a health question"
          />
          <button className="vact-btn" onClick={sendChat} style={{ padding: '10px 16px' }} aria-label="Send question">
            <i className="ti ti-send" />
          </button>
        </div>
        <div style={{ marginTop: 12, maxHeight: 260, overflowY: 'auto' }}>
          {chatHistory.slice(-10).map((msg, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: msg.role === 'bot' ? 'var(--primary)' : 'var(--text-muted)', marginBottom: 3 }}>
                {msg.role === 'bot' ? 'Dr. Aarogya' : 'You'}
              </div>
              <div style={{
                background: msg.role === 'bot' ? 'var(--primary-light)' : '#f5f5f5',
                borderRadius: 10, padding: '10px 12px',
                fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common questions */}
      <div className="card">
        <div className="card-title"><i className="ti ti-list" /> Common Questions</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            ['what is ayushman bharat', 'Ayushman Bharat?'],
            ['diabetes prevention tips', 'Diabetes Tips'],
            ['nearest phc bengaluru', 'Nearest PHC'],
            ['assistive devices disability', 'Assistive Devices'],
            ['mobile health van schedule', 'Mobile Van Schedule'],
            ['caregiver support helpline', 'Caregiver Helpline'],
            ['mental health support', 'Mental Health'],
            ['immunization schedule child', 'Child Immunization'],
          ].map(([query, label]) => (
            <button key={query} className="vlang-btn" onClick={() => quickAsk(query)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
