# ಆರೋಗ್ಯ ದ್ವಾರ — Arogya Dwaar

**Karnataka Healthcare Accessibility Portal**

A voice-first, multilingual, accessibility-focused web application connecting elderly, disabled, rural, and marginalised communities in Karnataka to healthcare services, government schemes, and emergency assistance.

---

## Features

| Feature | Description |
|---|---|
| 🎙️ Voice Assistant (Dr. Aarogya) | Keyword-based AI health advisor with speech recognition & text-to-speech |
| 🗺️ Accessibility Heatmap | District-level healthcare gap visualisation for all 31 Karnataka districts |
| 🏥 Hospital & NGO Finder | Curated list of nearest hospitals, PHCs, and NGO partners |
| 📋 Government Schemes | National (PM-JAY, ADIP), State (Arogya Karnataka), and international programs |
| 🛡️ Risk Assessment | 6-question accessibility risk scoring tool with personalised recommendations |
| 🚨 Emergency Bar | One-tap ambulance (108), caregiver alert, police (100), and GPS location share |
| 🌐 Multilingual | English, ಕನ್ನಡ, हिंदी, اردو, தமிழ் |
| ♿ Accessibility | High-contrast mode, large text, screen reader support, keyboard navigation |
| 📴 Offline Mode | Toggle that simulates offline-first behaviour (for future PWA integration) |

---

## Tech Stack

- **Frontend**: React 18, Vite 5
- **Styling**: Pure CSS with CSS custom properties (no Tailwind dependency)
- **Icons**: Tabler Icons (CDN)
- **Voice**: Web Speech API (`SpeechRecognition`, `SpeechSynthesis`)
- **Build tool**: Vite

> **Backend**: This is a **frontend-only** application.  
> See [Backend Notes](#backend-notes) for what would need to be built.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Run development server
npm run dev
# Opens at http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## Project Structure

```
arogya-dwaar/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Topbar.jsx          # Topbar with language + accessibility controls
│   │   │   ├── EmergencyBar.jsx    # Red emergency quick-action bar
│   │   │   └── NavTabs.jsx         # Main tab navigation
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Landing + quick services + Dr. Aarogya chat
│   │   │   ├── VoicePage.jsx       # Full voice assistant UI
│   │   │   ├── DashboardPage.jsx   # Heatmap, charts, risk zones, trend
│   │   │   ├── ServicesPage.jsx    # Hospitals, telemedicine, NGOs, mobile vans
│   │   │   ├── SchemesPage.jsx     # National, state, international schemes
│   │   │   └── RiskPage.jsx        # Risk assessment form + score + recommendations
│   │   └── ui/
│   │       ├── Toast.jsx           # Global toast notification
│   │       └── ReadAloudFab.jsx    # Floating "Read Aloud" button
│   ├── data/
│   │   └── index.js                # All static data (districts, hospitals, schemes, AI responses, translations)
│   ├── hooks/
│   │   ├── useAppState.js          # Central state + accessibility + voice logic
│   │   └── useVoiceRecognition.js  # Web Speech API wrapper
│   ├── styles/
│   │   ├── globals.css             # CSS variables + reset + animations
│   │   ├── layout.css              # Topbar, nav, emergency bar, main wrapper
│   │   └── components.css          # Cards, charts, heatmap, voice widget, etc.
│   ├── App.jsx                     # Root component
│   └── main.jsx                    # React entry point
├── index.html
├── vite.config.js
├── package.json
├── .eslintrc.cjs
├── .env.example
└── README.md
```

---

## Backend Notes

This is a **frontend-only** application. The following backend features are **missing** and would need to be built:

### Can be reconstructed
| Feature | Suggested stack |
|---|---|
| User profiles (elderly/disabled/rural/caregiver) | Node.js + Express + PostgreSQL |
| Real hospital/PHC database with geolocation | PostGIS + REST API |
| PM-JAY / Arogya Karnataka eligibility check | Integration with pmjay.gov.in API |
| Caregiver alert system (SMS) | Twilio / MSG91 SMS gateway |
| Appointment booking | Express REST API + email/SMS notification |
| Push notifications for van schedule reminders | Firebase Cloud Messaging (FCM) |
| Offline PWA with service worker | Vite PWA plugin (`vite-plugin-pwa`) |

### Must be rebuilt manually
- Real-time geolocation-based nearest hospital routing (needs Google Maps / OSRM backend)
- Live government scheme eligibility via official APIs (requires government API access)
- End-to-end Kannada/Hindi STT/TTS beyond browser Web Speech API (consider Azure Cognitive Services or Bhashini API)
- Authenticated caregiver network with secure alerts

---

## Accessibility

- WCAG 2.1 Level AA targeted
- All interactive elements have `aria-label`, `role`, and keyboard handlers
- High-contrast and large-text modes
- Screen reader announcements via `aria-live`
- Tab navigation throughout

---

## Roadmap

- [ ] PWA / Service Worker for true offline support
- [ ] Integration with Karnataka NHM PHC locator API
- [ ] Bhashini API for better Kannada/Telugu/Urdu TTS
- [ ] SMS-based fallback for feature phones
- [ ] Backend with caregiver alert + appointment booking
- [ ] Map view of hospitals and districts

---

## License

MIT — Built for Karnataka healthcare accessibility.
