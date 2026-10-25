import React from 'react';

export default function Hero({ onReserveClick }) {
  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onReserveClick) {
      onReserveClick();
    } else {
      const section = document.getElementById('reservations');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        const firstInput = section.querySelector('input, select');
        if (firstInput) firstInput.focus();
      }
    }
  };

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Content */}
          <div className="hero-content">
            <h1 id="hero-heading">Little Lemon</h1>
            <p className="hero-location">Chicago</p>
            <p className="hero-description">
              We are a family-owned Mediterranean restaurant, focused on traditional recipes
              served with a modern twist. Experience vibrant flavors, authentic ingredients,
              and heartfelt hospitality in the heart of downtown Chicago.
            </p>
            <a
              href="#reservations"
              className="btn btn-primary"
              onClick={handleCtaClick}
              id="hero-reserve-btn"
              aria-label="Reserve a Table at Little Lemon"
            >
              Reserve a Table
            </a>
          </div>

          {/* Hero Image */}
          <div className="hero-image-wrapper">
            <img
              src="/images/hero.jpg"
              alt="Mediterranean grilled fish specialty dish with fresh lemon and garden herbs at Little Lemon Chicago"
              className="hero-image"
              width="600"
              height="400"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
