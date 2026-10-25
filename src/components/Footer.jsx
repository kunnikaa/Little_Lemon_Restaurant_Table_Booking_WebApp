import React from 'react';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h4>LITTLE LEMON</h4>
            <p>
              Traditional Mediterranean cuisine prepared with love, passion, and heritage.
              Serving Chicago since 2012.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              📍 123 Mediterranean Way, Chicago, IL 60601
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleLinkClick(e, 'menu')}>
                  Menu Highlights
                </a>
              </li>
              <li>
                <a href="#reservations" onClick={(e) => handleLinkClick(e, 'reservations')}>
                  Reservations
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleLinkClick(e, 'menu')}>
                  Order Online
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="footer-col">
            <h5>Opening Hours</h5>
            <ul className="footer-links" style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
              <li>
                <strong>Monday - Friday:</strong>
                <br />
                11:30 AM – 10:30 PM
              </li>
              <li>
                <strong>Saturday - Sunday:</strong>
                <br />
                10:30 AM – 11:00 PM
              </li>
              <li>
                <strong>Kitchen Closes:</strong>
                <br />
                30 mins before closing
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="footer-col">
            <h5>Contact & Social</h5>
            <ul className="footer-links">
              <li>📞 (312) 555-0199</li>
              <li>✉ info@littlelemonrestaurant.com</li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Little Lemon on Facebook (opens in a new window)"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Little Lemon on Instagram (opens in a new window)"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tripadvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Little Lemon on TripAdvisor (opens in a new window)"
                >
                  TripAdvisor
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.
          </p>
          <p>
            Developed for the Coursera Meta Front-End Developer Professional Certificate Capstone Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
