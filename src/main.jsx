// ============================================================
//  src/main.jsx
//  React entry point
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './styles/globals.css';
import './styles/components.css';

// Topbar styles (inlined here for layout-level concerns)
import './styles/layout.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
