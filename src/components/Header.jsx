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
        {/* Left: Brand Logo & Wordmark */}
        <div className="header-brand-left">
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
              width="205"
              height="62"
            />
          </Link>
        </div>

        {/* Center: Main Multi-Page Navigation */}
        <nav
          id="primary-navigation"
          className={`header-nav-center ${isMobileMenuOpen ? 'open' : ''}`}
          aria-label="Main Navigation"
        >
          <ul className="nav-menu">
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
          </ul>

          {/* Mobile Drawer Actions (Shown only in mobile menu drawer) */}
          <div className="mobile-drawer-footer">
            <Link
              to="/reservations"
              className="btn btn-primary mobile-drawer-book-btn"
              onClick={closeMenu}
            >
              Book a Table
            </Link>

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
          </div>
        </nav>

        {/* Right: Desktop Actions (Cart, Profile Dropdown, Book a Table Button) */}
        <div className="header-actions-right">
          {/* Cart Icon Link */}
          <NavLink
            to="/order"
            className="nav-cart-btn"
            onClick={closeMenu}
            aria-label={`Pre-Order Cart with ${cartCount} items`}
          >
            <span className="cart-icon" aria-hidden="true">🛒</span>
            <span className="cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Compact Profile Dropdown Menu */}
          <div className="nav-profile-desktop">
            <ProfileDropdown onNavigate={closeMenu} />
          </div>

          {/* Prominent Book a Table CTA */}
          <Link
            to="/reservations"
            className="btn btn-primary nav-cta-btn"
            onClick={closeMenu}
          >
            Book a Table
          </Link>
        </div>

        {/* Mobile Actions: Cart & Menu Hamburger */}
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
      </div>
    </header>
  );
}
