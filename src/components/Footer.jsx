import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info with Logo */}
          <div className="footer-brand">
            <img
              src="/images/little-lemon-logo-cropped.png"
              alt="Little Lemon Mediterranean Kitchen"
              className="footer-logo-img"
              width="180"
              height="60"
            />
            <p style={{ marginTop: '1rem' }}>
              Traditional Mediterranean cuisine prepared with love, passion, and heritage.
              Serving Chicago since 2012.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              📍 123 Mediterranean Way, Chicago, IL 60601
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/menu">Full Menu</Link>
              </li>
              <li>
                <Link to="/reservations">Table Reservations</Link>
              </li>
              <li>
                <Link to="/order">Order Online & Pre-Orders</Link>
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
                  aria-label="Little Lemon on Facebook (opens in new tab)"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Little Lemon on Instagram (opens in new tab)"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tripadvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Little Lemon on TripAdvisor (opens in new tab)"
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
            © {new Date().getFullYear()} Little Lemon Mediterranean Kitchen. All rights reserved.
          </p>
          <p>
            Coursera Meta Front-End Developer Professional Certificate Capstone Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
