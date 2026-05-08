// ============================================================
//  src/components/pages/RiskPage.jsx
// ============================================================

import React, { useState, useRef } from 'react';
import { riskQuestions } from '../../data/index.js';

const MAX_SCORE = 18;

function getRiskLevel(pct) {
  if (pct < 30) return { label: 'Low Risk',      color: '#27ae60', icon: 'ti-shield-check' };
  if (pct < 55) return { label: 'Moderate Risk', color: '#e67e22', icon: 'ti-shield-half'  };
  if (pct < 75) return { label: 'High Risk',     color: '#e74c3c', icon: 'ti-shield-x'     };
  return         { label: 'Critical Risk',       color: '#c0392b', icon: 'ti-alert-circle'  };
}

function getRecommendations(pct) {
  const recs = [];
  if (pct > 40) recs.push({ type: 'warn', badge: 'Transport',   text: 'Consider registering for NAMMA (Karnataka transport scheme) or contact HelpAge India (1800-180-1253) for assisted transport to healthcare.' });
  if (pct > 30) recs.push({ type: '',     badge: 'Schemes',     text: 'You likely qualify for Ayushman Bharat PM-JAY and Arogya Karnataka. Check eligibility at pmjay.gov.in or call 14555.' });
  recs.push({               type: '',     badge: 'Nearest Care', text: 'Your nearest PHC or HWC can provide free OPD, BP checks, and medicines. Arogya Dwaar can help you locate the exact address.' });
  if (pct > 50) recs.push({ type: 'warn', badge: 'NGO Support', text: 'Based on your score, connecting you to an NGO partner. HelpAge India and Swasthya Karnataka serve your area.' });
  recs.push({               type: '',     badge: 'Digital Health', text: 'Use eSanjeevani for free teleconsultation — available in Kannada. Call 104 for health helpline in your language.' });
  return recs;
}

export default function RiskPage({ showToast, speak }) {
  const [answers, setAnswers]           = useState({});
  const [result, setResult]             = useState(null);
  const resultRef                       = useRef(null);

  function handleAnswer(qid, score) {
    setAnswers((prev) => ({ ...prev, [qid]: score }));
  }

  function calcRisk() {
    const answered = Object.keys(answers).length;
    if (answered < 3) {
      showToast('Please answer at least 3 questions');
      return;
    }
    const total = Object.values(answers).reduce((s, v) => s + v, 0);
    const pct   = Math.round((total / MAX_SCORE) * 100);
    const level = getRiskLevel(pct);
    const recs  = getRecommendations(pct);
    setResult({ pct, level, recs });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    speak(`Your accessibility risk score is ${pct} out of 100, which indicates ${level.label}`);
  }

  return (
    <div>
      {/* Assessment form */}
      <div className="card">
        <div className="card-title"><i className="ti ti-shield-check" /> Accessibility Risk Assessment</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
          Answer these quick questions to calculate your healthcare accessibility risk score.
        </div>

        {riskQuestions.map((q) => (
          <div key={q.id} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{q.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {q.opts.map((opt, i) => (
                <label
                  key={opt}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    cursor: 'pointer', fontSize: 14,
                    background: answers[q.id] === q.scores[i] ? 'var(--primary-light)' : 'var(--bg)',
                    border: `1.5px solid ${answers[q.id] === q.scores[i] ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 10, padding: '8px 12px',
                    transition: 'all 0.15s',
                  }}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={q.scores[i]}
                    checked={answers[q.id] === q.scores[i]}
                    onChange={() => handleAnswer(q.id, q.scores[i])}
                    style={{ accentColor: 'var(--primary)' }}
                    aria-label={`${q.label}: ${opt}`}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          className="vact-btn"
          style={{ marginTop: 16, width: '100%', justifyContent: 'center', fontSize: 16, padding: 14 }}
          onClick={calcRisk}
        >
          <i className="ti ti-calculator" /> Calculate My Risk Score
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="card" ref={resultRef}>
          <div className="card-title"><i className="ti ti-chart-bar" /> Your Accessibility Risk Score</div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: result.level.color }}>
              {result.pct}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>out of 100</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: result.level.color, margin: '8px 0' }}>
              <i className={`ti ${result.level.icon}`} /> {result.level.label}
            </div>
            <div className="prog" style={{ maxWidth: 300, margin: '10px auto', height: 14 }}>
              <div className="prog-fill" style={{ width: `${result.pct}%`, background: result.level.color }} />
            </div>
          </div>
        </div>
      )}

      {/* Smart recommendations */}
      <div className="card">
        <div className="card-title"><i className="ti ti-bulb" /> Smart Recommendations</div>
        {(result ? result.recs : getRecommendations(0)).map((r, i) => (
          <div key={i} className={`rec-card${r.type === 'warn' ? ' warn' : ''}`}>
            <span className="rec-badge">{r.badge}</span>
            <div className="rec-text">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
