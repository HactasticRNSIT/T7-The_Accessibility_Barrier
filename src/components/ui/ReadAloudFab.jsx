// ============================================================
//  src/components/ui/ReadAloudFab.jsx
//  Floating Action Button — reads the active page aloud
// ============================================================

import React from 'react';

export default function ReadAloudFab({ onPress }) {
  return (
    <button
      className="fab"
      onClick={onPress}
      title="Read page aloud"
      aria-label="Read current page content aloud"
    >
      <i className="ti ti-volume" />
    </button>
  );
}
