// ============================================================
//  src/App.jsx
//  Root component — assembles layout + pages
// ============================================================

import React from 'react';
import { useAppState } from './hooks/useAppState.js';

import Topbar         from './components/layout/Topbar.jsx';
import EmergencyBar   from './components/layout/EmergencyBar.jsx';
import NavTabs        from './components/layout/NavTabs.jsx';
import Toast          from './components/ui/Toast.jsx';
import ReadAloudFab   from './components/ui/ReadAloudFab.jsx';

import HomePage       from './components/pages/HomePage.jsx';
import VoicePage      from './components/pages/VoicePage.jsx';
import DashboardPage  from './components/pages/DashboardPage.jsx';
import ServicesPage   from './components/pages/ServicesPage.jsx';
import SchemesPage    from './components/pages/SchemesPage.jsx';
import RiskPage       from './components/pages/RiskPage.jsx';

export default function App() {
  const state = useAppState();

  // Navigate + optional side-effect
  function navigate(page) {
    state.setActivePage(page);
  }

  // Show group detail (sets toast + navigates to services)
  function showGroup(g) {
    const msgs = {
      elderly:   'Elderly care services loaded.',
      disabled:  'Disability services loaded.',
      rural:     'Rural health services loaded.',
      caregiver: 'Caregiver resources loaded.',
      women:     'Women & children services loaded.',
    };
    state.showToast(msgs[g] || 'Profile set!');
    navigate('services');
  }

  // Read aloud current page
  function readPageAloud() {
    const active = document.querySelector('.page-content.active');
    const text   = active ? active.innerText.substring(0, 600) : 'Welcome to Arogya Dwaar healthcare portal.';
    state.speak(text);
  }

  return (
    <>
      <Toast message={state.toastMsg} visible={state.toastVisible} />

      <Topbar
        currentLang={state.currentLang}
        onChangeLang={(lang) => { state.setCurrentLang(lang); state.showToast(`Language changed to ${lang.toUpperCase()}`); }}
        isHighContrast={state.isHighContrast}
        isLargeText={state.isLargeText}
        isOffline={state.isOffline}
        onToggleContrast={state.toggleContrast}
        onToggleTextSize={state.toggleTextSize}
        onToggleOffline={state.toggleOffline}
      />

      <EmergencyBar
        t={state.t}
        onCallEmergency={state.callEmergency}
        onShareLocation={state.shareLocation}
      />

      <NavTabs activePage={state.activePage} onNavigate={navigate} t={state.t} />

      <main className="main" role="main">
        {/* Offline banner */}
        {state.isOffline && (
          <div className="offline-banner" role="alert">
            <i className="ti ti-wifi-off" style={{ fontSize: 20, color: '#e67e22' }} />
            <span>{state.t('offlineText')}</span>
          </div>
        )}

        {/* Pages */}
        <div className={`page-content${state.activePage === 'home' ? ' active' : ''}`}
          style={{ display: state.activePage === 'home' ? 'block' : 'none' }}>
          <HomePage
            t={state.t}
            onNavigate={navigate}
            onShowGroup={showGroup}
            showToast={state.showToast}
            processInput={state.processInput}
            chatHistory={state.chatHistory}
          />
        </div>

        <div className={`page-content${state.activePage === 'voice' ? ' active' : ''}`}
          style={{ display: state.activePage === 'voice' ? 'block' : 'none' }}>
          <VoicePage
            voiceLang={state.voiceLang}
            setVoiceLang={state.setVoiceLang}
            isListening={state.isListening}
            setIsListening={state.setIsListening}
            voiceStatus={state.voiceStatus}
            setVoiceStatus={state.setVoiceStatus}
            voiceResponse={state.voiceResponse}
            processInput={state.processInput}
            speak={state.speak}
            showToast={state.showToast}
            onNavigate={navigate}
          />
        </div>

        <div className={`page-content${state.activePage === 'dashboard' ? ' active' : ''}`}
          style={{ display: state.activePage === 'dashboard' ? 'block' : 'none' }}>
          <DashboardPage showToast={state.showToast} />
        </div>

        <div className={`page-content${state.activePage === 'services' ? ' active' : ''}`}
          style={{ display: state.activePage === 'services' ? 'block' : 'none' }}>
          <ServicesPage showToast={state.showToast} />
        </div>

        <div className={`page-content${state.activePage === 'schemes' ? ' active' : ''}`}
          style={{ display: state.activePage === 'schemes' ? 'block' : 'none' }}>
          <SchemesPage showToast={state.showToast} />
        </div>

        <div className={`page-content${state.activePage === 'risk' ? ' active' : ''}`}
          style={{ display: state.activePage === 'risk' ? 'block' : 'none' }}>
          <RiskPage showToast={state.showToast} speak={state.speak} />
        </div>
      </main>

      <ReadAloudFab onPress={readPageAloud} />
    </>
  );
}
