import React, { useState } from 'react';

export default function Header({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header" role="banner">
      <div className="container header-container">
        {/* Brand Logo & Wordmark */}
        <a
          href="#home"
          className="brand-logo"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="Little Lemon Restaurant - Return to Homepage"
        >
          <div className="brand-logo-icon" aria-hidden="true">
            🍋
          </div>
          <div className="brand-logo-text">
            <span className="brand-title">LITTLE LEMON</span>
            <span className="brand-subtitle">MEDITERRANEAN • CHICAGO</span>
          </div>
        </a>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Primary Navigation */}
        <nav id="primary-navigation" aria-label="Main Navigation">
          <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <li>
              <a
                href="#home"
                className="nav-link active"
                onClick={(e) => handleLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link"
                onClick={(e) => handleLinkClick(e, 'about')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#featured"
                className="nav-link"
                onClick={(e) => handleLinkClick(e, 'featured')}
              >
                Specials
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className="nav-link"
                onClick={(e) => handleLinkClick(e, 'menu')}
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#reservations"
                className="nav-link"
                onClick={(e) => handleLinkClick(e, 'reservations')}
              >
                Reservations
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className="nav-link"
                onClick={(e) => handleLinkClick(e, 'menu')}
              >
                Order Online
              </a>
            </li>
            <li>
              <a
                href="#reservations"
                className="nav-cta btn btn-primary"
                onClick={(e) => handleLinkClick(e, 'reservations')}
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem' }}
              >
                Book a Table
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
