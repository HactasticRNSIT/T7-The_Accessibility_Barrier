// ============================================================
//  src/components/pages/SchemesPage.jsx
// ============================================================

import React from 'react';
import { nationalSchemes, stateSchemes, intlSchemes } from '../../data/index.js';

function SchemeList({ schemes, showToast }) {
  return schemes.map((s) => (
    <div key={s.name} className="scheme-card">
      <div className="scheme-name">{s.name}</div>
      <div style={{ margin: '4px 0' }}>
        {(s.tags || []).map((tag) => (
          <span key={tag} className="tag" style={{ background: 'rgba(26,107,58,0.1)', color: 'var(--primary)' }}>
            {tag}
          </span>
        ))}
      </div>
      <div className="scheme-desc">{s.desc}</div>
      <span
        className="scheme-link"
        onClick={() => showToast(`Opening ${s.link}...`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && showToast(`Opening ${s.link}...`)}
        aria-label={`Visit ${s.link}`}
      >
        <i className="ti ti-external-link" /> {s.link}
      </span>
    </div>
  ));
}

export default function SchemesPage({ showToast }) {
  return (
    <div>
      <div className="card">
        <div className="card-title"><i className="ti ti-flag" /> National Government Schemes</div>
        <SchemeList schemes={nationalSchemes} showToast={showToast} />
      </div>

      <div className="card">
        <div className="card-title"><i className="ti ti-map-pin" /> Karnataka State Schemes</div>
        <SchemeList schemes={stateSchemes} showToast={showToast} />
      </div>

      <div className="card">
        <div className="card-title"><i className="ti ti-world" /> International / WHO Programs</div>
        <SchemeList schemes={intlSchemes} showToast={showToast} />
      </div>
    </div>
  );
}
