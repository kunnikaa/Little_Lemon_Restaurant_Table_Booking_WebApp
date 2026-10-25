import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { favoritesCount } = useFavorites();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="header" role="banner">
      <div className="container header-container">
        {/* Brand Logo with 20-30% size increase & vertical centering */}
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
            width="215"
            height="66"
          />
        </Link>

        {/* Mobile Actions: Cart, Profile & Hamburger */}
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

        {/* Primary Navigation & Utility Actions */}
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

            {/* Cart Button */}
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

            {/* Desktop User Profile Dropdown */}
            <li className="nav-profile-desktop">
              <ProfileDropdown onNavigate={closeMenu} />
            </li>

            {/* Primary Table Booking CTA */}
            <li>
              <Link
                to="/reservations"
                className="btn btn-primary nav-cta-btn"
                onClick={closeMenu}
              >
                Book a Table
              </Link>
            </li>

            {/* Mobile-only Account & Favorites Links */}
            <li className="mobile-account-section">
              <div className="mobile-account-divider" />
              {isAuthenticated ? (
                <div className="mobile-user-box">
                  <div className="mobile-user-header">
                    <span className="profile-avatar-circle">{user.avatar || 'LL'}</span>
                    <div className="mobile-user-meta">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                  </div>
                  <div className="mobile-user-links">
                    <Link to="/profile" className="mobile-nav-sublink" onClick={closeMenu}>
                      👤 My Profile
                    </Link>
                    <Link to="/favorites" className="mobile-nav-sublink" onClick={closeMenu}>
                      ❤️ My Favorites ({favoritesCount})
                    </Link>
                    <Link to="/orders" className="mobile-nav-sublink" onClick={closeMenu}>
                      📦 My Orders
                    </Link>
                    <Link to="/my-reservations" className="mobile-nav-sublink" onClick={closeMenu}>
                      📅 My Reservations
                    </Link>
                    <button
                      type="button"
                      className="mobile-nav-sublink mobile-logout-btn"
                      onClick={handleMobileLogout}
                    >
                      🚪 Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mobile-auth-actions">
                  <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                    Create Account
                  </Link>
                  <Link to="/favorites" className="mobile-nav-sublink" onClick={closeMenu}>
                    ❤️ My Favorites ({favoritesCount})
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
