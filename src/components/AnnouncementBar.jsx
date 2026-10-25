import React, { useState } from 'react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      className="announcement-bar"
      role="region"
      aria-label="Restaurant Announcement"
    >
      <div className="container announcement-content">
        <p className="announcement-text">
          <span className="announcement-badge" aria-hidden="true">SPECIAL</span>
          Fresh Mediterranean flavors, made with love. Book your autumn table in advance for priority seating.
        </p>
        <button
          type="button"
          className="announcement-close"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement banner"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
