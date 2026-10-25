import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Logo */}
          <div className="footer-brand-col">
            <div className="footer-logo-card">
              <Link to="/" className="footer-logo-link" aria-label="Little Lemon Mediterranean Kitchen - Return to Home">
                <img
                  src="/images/little-lemon-footer-logo.png"
                  alt="Little Lemon Mediterranean Kitchen Logo"
                  className="footer-logo-img"
                  width="260"
                  height="130"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="footer-brand-desc">
              Traditional Mediterranean cuisine prepared with love, passion, and heritage.
              Serving Chicago with authentic Greek, Italian, and Mediterranean specialties since 2012.
            </p>
            <div className="footer-brand-meta">
              <span className="footer-badge">
                <span aria-hidden="true">★</span> Family Owned &amp; Operated
              </span>
              <p className="footer-location-text">
                <span aria-hidden="true">📍</span> 123 Mediterranean Way, Chicago, IL 60601
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-nav-link">
                  <span className="link-arrow" aria-hidden="true">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-nav-link">
                  <span className="link-arrow" aria-hidden="true">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/menu" className="footer-nav-link">
                  <span className="link-arrow" aria-hidden="true">›</span> Full Menu
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="footer-nav-link">
                  <span className="link-arrow" aria-hidden="true">›</span> Table Reservations
                </Link>
              </li>
              <li>
                <Link to="/order" className="footer-nav-link">
                  <span className="link-arrow" aria-hidden="true">›</span> Order Online &amp; Delivery
                </Link>
              </li>
              <li>
                <Link to="/my-reservations" className="footer-nav-link">
                  <span className="link-arrow" aria-hidden="true">›</span> My Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div className="footer-col">
            <h4 className="footer-col-title">Opening Hours</h4>
            <div className="footer-hours-list">
              <div className="hours-row">
                <span className="hours-day">Monday – Friday</span>
                <span className="hours-time">11:30 AM – 10:30 PM</span>
                <small className="hours-service">Lunch &amp; Dinner Service</small>
              </div>
              <div className="hours-row">
                <span className="hours-day">Saturday – Sunday</span>
                <span className="hours-time">10:30 AM – 11:00 PM</span>
                <small className="hours-service">Weekend Brunch &amp; Dinner</small>
              </div>
              <div className="hours-note-box">
                <span aria-hidden="true">ℹ️</span>
                <span>Kitchen accepts last orders 30 minutes prior to closing time.</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact &amp; Connect</h4>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <span className="contact-icon" aria-hidden="true">📞</span>
                <div>
                  <span className="contact-label">Reservations &amp; Enquiries</span>
                  <a href="tel:3125550199" className="contact-link">
                    (312) 555-0199
                  </a>
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon" aria-hidden="true">✉️</span>
                <div>
                  <span className="contact-label">Email Support</span>
                  <a href="mailto:info@littlelemonchicago.com" className="contact-link">
                    info@littlelemonchicago.com
                  </a>
                </div>
              </li>
            </ul>

            <div className="footer-social-section">
              <span className="social-heading">Follow Us</span>
              <div className="footer-social-chips">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                  aria-label="Little Lemon on Facebook (opens in a new tab)"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                  aria-label="Little Lemon on Instagram (opens in a new tab)"
                >
                  Instagram
                </a>
                <a
                  href="https://tripadvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                  aria-label="Little Lemon on TripAdvisor (opens in a new tab)"
                >
                  TripAdvisor
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright-text">
              © {currentYear} Little Lemon Mediterranean Kitchen. All rights reserved.
            </p>
            <p className="capstone-credit">
              Coursera Meta Front-End Developer Capstone Project · Chicago, Illinois
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
