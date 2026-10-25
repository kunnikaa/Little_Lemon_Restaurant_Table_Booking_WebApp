import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

export default function ProfileDropdown({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { favoritesCount } = useFavorites();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    if (onNavigate) onNavigate();
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    if (onNavigate) onNavigate();
    navigate('/');
  };

  return (
    <div className="profile-dropdown-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className={`profile-menu-btn ${isOpen ? 'active' : ''}`}
        aria-label={isAuthenticated ? `User menu for ${user.name}` : 'User account menu'}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        {isAuthenticated ? (
          <span className="profile-avatar-circle" aria-hidden="true">
            {user.avatar || 'LL'}
          </span>
        ) : (
          <span className="profile-icon-generic" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
        )}
        <span className="profile-btn-chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="profile-dropdown-menu" role="menu">
          {isAuthenticated ? (
            <>
              <div className="profile-dropdown-header">
                <span className="profile-user-name">{user.name}</span>
                <span className="profile-user-email">{user.email}</span>
                <span className="profile-demo-tag">Demonstration Account</span>
              </div>
              <ul className="profile-menu-list">
                <li role="none">
                  <Link
                    to="/profile"
                    className="profile-menu-item"
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <span className="menu-icon" aria-hidden="true">👤</span>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/favorites"
                    className="profile-menu-item"
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <span className="menu-icon" aria-hidden="true">❤️</span>
                    <span>My Favorites</span>
                    {favoritesCount > 0 && (
                      <span className="profile-badge">{favoritesCount}</span>
                    )}
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/orders"
                    className="profile-menu-item"
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <span className="menu-icon" aria-hidden="true">📦</span>
                    <span>My Orders</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/my-reservations"
                    className="profile-menu-item"
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <span className="menu-icon" aria-hidden="true">📅</span>
                    <span>My Reservations</span>
                  </Link>
                </li>
                <li className="profile-divider" role="separator" />
                <li role="none">
                  <button
                    type="button"
                    className="profile-menu-item profile-logout-btn"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    <span className="menu-icon" aria-hidden="true">🚪</span>
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="profile-dropdown-header">
                <span className="profile-welcome-title">Welcome to Little Lemon</span>
                <p className="profile-welcome-sub">Sign in to view orders & saved dishes</p>
              </div>
              <ul className="profile-menu-list">
                <li role="none">
                  <Link
                    to="/login"
                    className="profile-menu-item profile-action-primary"
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <span className="menu-icon" aria-hidden="true">🔑</span>
                    <span>Sign In</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/register"
                    className="profile-menu-item"
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <span className="menu-icon" aria-hidden="true">✨</span>
                    <span>Create Account</span>
                  </Link>
                </li>
                <li className="profile-divider" role="separator" />
                <li role="none">
                  <Link
                    to="/favorites"
                    className="profile-menu-item"
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    <span className="menu-icon" aria-hidden="true">❤️</span>
                    <span>View Saved Dishes</span>
                    {favoritesCount > 0 && (
                      <span className="profile-badge">{favoritesCount}</span>
                    )}
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
