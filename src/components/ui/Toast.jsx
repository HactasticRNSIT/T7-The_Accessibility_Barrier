// ============================================================
//  src/components/ui/Toast.jsx
// ============================================================

import React from 'react';

export default function Toast({ message, visible }) {
  return (
    <div
      className={`toast${visible ? ' show' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
