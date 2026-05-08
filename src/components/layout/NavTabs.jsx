// ============================================================
//  src/components/layout/NavTabs.jsx
// ============================================================

import React from 'react';

const TABS = [
  { id: 'home',      icon: 'ti-home',              labelKey: 'home'      },
  { id: 'voice',     icon: 'ti-microphone',         labelKey: 'voice'     },
  { id: 'dashboard', icon: 'ti-chart-bar',          labelKey: 'dashboard' },
  { id: 'services',  icon: 'ti-building-hospital',  labelKey: 'services'  },
  { id: 'schemes',   icon: 'ti-file-certificate',   labelKey: 'schemes'   },
  { id: 'risk',      icon: 'ti-shield-check',       labelKey: 'risk'      },
];

export default function NavTabs({ activePage, onNavigate, t }) {
  return (
    <nav className="nav-tabs" role="tablist" aria-label="Main navigation">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activePage === tab.id}
          className={`nav-tab${activePage === tab.id ? ' active' : ''}`}
          onClick={() => onNavigate(tab.id)}
        >
          <i className={`ti ${tab.icon}`} />
          <span data-key={tab.labelKey}>{t(tab.labelKey)}</span>
        </button>
      ))}
    </nav>
  );
}
