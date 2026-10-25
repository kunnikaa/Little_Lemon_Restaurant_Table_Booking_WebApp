import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ onReserveClick }) {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Content */}
          <div className="hero-content">
            <span className="hero-tagline">EST. 2012 • DOWNTOWN CHICAGO</span>
            <h1 id="hero-heading">A Little Taste of the Mediterranean</h1>
            <p className="hero-location">Little Lemon • Chicago</p>
            <p className="hero-description">
              We are a family-owned Mediterranean bistro, focused on traditional coastal recipes
              served with a contemporary twist. Experience cold-pressed olive oils, hand-picked garden
              herbs, and heartfelt Mediterranean hospitality in the heart of Illinois.
            </p>
            
            {/* Multi-Page Navigation Actions */}
            <div className="hero-actions">
              <Link
                to="/reservations"
                className="btn btn-primary"
                onClick={onReserveClick}
                id="hero-reserve-btn"
                aria-label="Reserve a Table at Little Lemon"
              >
                Reserve a Table
              </Link>
              <Link
                to="/menu"
                className="btn btn-outline-hero"
                id="hero-menu-btn"
                aria-label="Explore Our Full Mediterranean Menu"
              >
                Explore Full Menu
              </Link>
            </div>

            {/* Quick Highlights Strip */}
            <div className="hero-features-strip" aria-label="Restaurant Highlights">
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true">🌿</span>
                <span>Fresh Organic Herbs</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true">🍋</span>
                <span>Imported Amalfi Citrus</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true">🏛️</span>
                <span>Outdoor Garden Patio</span>
              </div>
            </div>
          </div>

          {/* Hero Image Presentation */}
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src="/images/hero.jpg"
                alt="Signature Mediterranean grilled fish with fresh herbs and lemon at Little Lemon Chicago"
                className="hero-image"
                width="600"
                height="420"
                loading="eager"
              />
              <div className="hero-image-badge" aria-hidden="true">
                <span>Featured Specialty</span>
                <strong>Wild Catch of the Day</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
