import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="container header-container">
        {/* Brand Logo using the user's attached reference image */}
        <Link
          to="/"
          className="brand-logo"
          onClick={closeMenu}
          aria-label="Little Lemon Mediterranean Kitchen - Return to Home"
        >
          <img
            src="/images/little-lemon-logo-cropped.png"
            alt="Little Lemon Mediterranean Kitchen Logo"
            className="brand-logo-img"
            width="170"
            height="58"
          />
        </Link>

        {/* Mobile Navigation Toggle */}
        <div className="header-mobile-actions">
          <Link
            to="/order"
            className="mobile-cart-btn"
            aria-label={`Cart with ${cartCount} items`}
          >
            <span aria-hidden="true">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

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
        </div>

        {/* Primary Multi-Page Navigation */}
        <nav id="primary-navigation" aria-label="Main Navigation">
          <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reservations"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Reservations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Order Online
              </NavLink>
            </li>

            {/* Cart Icon Link */}
            <li className="nav-cart-wrapper">
              <NavLink
                to="/order"
                className="nav-cart-btn"
                onClick={closeMenu}
                aria-label={`Pre-Order Cart with ${cartCount} items`}
              >
                <span className="cart-icon" aria-hidden="true">🛒</span>
                <span className="cart-label">Cart</span>
                <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              </NavLink>
            </li>

            {/* Book a Table Primary CTA */}
            <li>
              <Link
                to="/reservations"
                className="btn btn-primary nav-cta-btn"
                onClick={closeMenu}
              >
                Book a Table
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
