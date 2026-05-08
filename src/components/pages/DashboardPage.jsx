// ============================================================
//  src/components/pages/DashboardPage.jsx
// ============================================================

import React from 'react';
import {
  districts, barrierData, participationGroups,
  riskZones, trendMonths, trendValues,
} from '../../data/index.js';

function Heatmap({ showToast }) {
  return (
    <div className="card">
      <div className="card-title"><i className="ti ti-map-2" /> Karnataka Healthcare Accessibility Heatmap</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>
        Tap any district to see details. Color = accessibility gap severity.
      </div>
      <div className="heatmap-grid" role="grid" aria-label="District accessibility heatmap">
        {districts.map((d) => (
          <div
            key={d.name}
            className={`hm-cell hm-${d.gap}`}
            title={`${d.name} — Gap: ${d.gap}`}
            onClick={() => showToast(`${d.name}: Accessibility gap — ${d.gap.toUpperCase()}`)}
            role="gridcell"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && showToast(`${d.name}: Accessibility gap — ${d.gap.toUpperCase()}`)}
            aria-label={`${d.name}, gap level: ${d.gap}`}
          >
            {d.name.length > 10 ? d.name.substring(0, 9) + '…' : d.name}
          </div>
        ))}
      </div>
      <div className="hm-legend">
        {[
          { cls: 'hm-low',      label: 'Low gap',  bg: '#c8e6c9' },
          { cls: 'hm-mid',      label: 'Moderate', bg: '#fff9c4' },
          { cls: 'hm-high',     label: 'High gap', bg: '#ffccbc' },
          { cls: 'hm-critical', label: 'Critical', bg: '#ef9a9a' },
        ].map((l) => (
          <div key={l.label} className="hm-leg">
            <div className="hm-dot" style={{ background: l.bg }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ title, data }) {
  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="card-title"><i className="ti ti-chart-bar" /> {title}</div>
      <div className="bar-chart">
        {data.map((b) => (
          <div key={b.label} className="bar-row">
            <div className="bar-label">{b.label || b.name}</div>
            <div className="bar-track" role="progressbar" aria-valuenow={b.pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="bar-fill" style={{ width: `${b.pct}%`, background: b.color }}>
                {b.pct}{b.suffix || '%'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskZones() {
  return (
    <div className="card" style={{ marginTop: 14 }}>
      <div className="card-title"><i className="ti ti-alert-triangle" /> Elderly Risk Zones — Karnataka</div>
      {riskZones.map((z) => (
        <div key={z.d} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 140, fontWeight: 600, fontSize: 14 }}>{z.d}</div>
          <div className="prog" style={{ flex: 1 }}>
            <div
              className="prog-fill"
              style={{
                width: `${z.score}%`,
                background: z.score > 80 ? '#e74c3c' : z.score > 65 ? '#e67e22' : '#f1c40f',
              }}
            />
          </div>
          <span className={`alert-tag ${z.score > 80 ? 'at-high' : z.score > 65 ? 'at-med' : 'at-low'}`}>
            {z.level}
          </span>
        </div>
      ))}
    </div>
  );
}

function TrendChart() {
  const max = Math.max(...trendValues);
  return (
    <div className="card">
      <div className="card-title"><i className="ti ti-trending-up" /> Monthly Healthcare Participation Trend</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100, marginTop: 8 }}>
        {trendValues.map((v, i) => (
          <div
            key={i}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
          >
            <div
              title={`${trendMonths[i]}: ${v}%`}
              style={{
                width: '100%',
                background: 'var(--primary)',
                borderRadius: '4px 4px 0 0',
                height: Math.round((v / max) * 90),
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              tabIndex={0}
              role="img"
              aria-label={`${trendMonths[i]}: ${v}%`}
            />
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
              {trendMonths[i].substring(0, 1)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
        Healthcare participation rate (%) Jan–Dec 2024
      </div>
    </div>
  );
}

export default function DashboardPage({ showToast }) {
  const pieData = participationGroups.map((g) => ({ ...g, suffix: '% excluded' }));

  return (
    <div>
      <Heatmap showToast={showToast} />
      <div className="grid2">
        <BarChart title="Barriers Breakdown" data={barrierData} />
        <BarChart title="Participation by Group (% excluded)" data={pieData} />
      </div>
      <RiskZones />
      <TrendChart />
    </div>
  );
}
