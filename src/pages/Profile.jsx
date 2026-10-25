import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { getSavedOrders, getSavedReservations } from '../utils/orderStorage';

export default function Profile() {
  const { user, isAuthenticated, logout, addresses, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    street: '',
    city: 'Chicago',
    state: 'IL',
    zip: '',
  });
  const [toastMessage, setToastMessage] = useState('');

  const orders = getSavedOrders();
  const reservations = getSavedReservations();

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
          <h2>Sign In to View Your Profile</h2>
          <p style={{ margin: '1rem 0 2rem 0', color: 'var(--color-warm-gray)' }}>
            Please sign in to access your personal account details, favorites, and history.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-outline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.street.trim() || !newAddress.zip.trim()) {
      return;
    }
    addAddress(newAddress);
    setIsAddingAddress(false);
    setNewAddress({ label: 'Home', street: '', city: 'Chicago', state: 'IL', zip: '' });
    setToastMessage('New delivery address saved successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="profile-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="profile-heading">
        <div className="container">
          <div className="profile-header-banner">
            <div className="profile-avatar-large">
              {user.avatar || 'LL'}
            </div>
            <div>
              <span className="editorial-subtitle">GUEST PROFILE</span>
              <h1 id="profile-heading" className="page-title" style={{ fontSize: '2.75rem', marginBottom: '0.25rem' }}>
                {user.name}
              </h1>
              <p className="page-description">
                {user.email} • {user.phone} • Member since {user.memberSince}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="profile-content" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          {toastMessage && (
            <div role="status" aria-live="polite" className="live-toast-notification">
              ✓ {toastMessage}
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="profile-stats-grid">
            <Link to="/favorites" className="profile-stat-card">
              <span className="stat-icon" aria-hidden="true">❤️</span>
              <div className="stat-meta">
                <span className="stat-number">{favoritesCount}</span>
                <span className="stat-label">Saved Favorites</span>
              </div>
              <span className="stat-link-arrow">View Dishes →</span>
            </Link>

            <Link to="/orders" className="profile-stat-card">
              <span className="stat-icon" aria-hidden="true">📦</span>
              <div className="stat-meta">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-label">Order History</span>
              </div>
              <span className="stat-link-arrow">View Orders →</span>
            </Link>

            <Link to="/my-reservations" className="profile-stat-card">
              <span className="stat-icon" aria-hidden="true">📅</span>
              <div className="stat-meta">
                <span className="stat-number">{reservations.length}</span>
                <span className="stat-label">Table Bookings</span>
              </div>
              <span className="stat-link-arrow">View Tables →</span>
            </Link>
          </div>

          <div className="profile-layout-columns">
            {/* Left Column: Account Details & Delivery Addresses */}
            <div className="profile-main-col">
              {/* Basic Account Information */}
              <div className="profile-section-card">
                <div className="card-header-row">
                  <h2 className="profile-section-title">Account Information</h2>
                  <span className="badge-demo">Frontend Demo Account</span>
                </div>
                <div className="profile-info-grid">
                  <div className="info-field">
                    <span className="field-label">Full Name</span>
                    <strong className="field-value">{user.name}</strong>
                  </div>
                  <div className="info-field">
                    <span className="field-label">Email Address</span>
                    <strong className="field-value">{user.email}</strong>
                  </div>
                  <div className="info-field">
                    <span className="field-label">Phone Number</span>
                    <strong className="field-value">{user.phone}</strong>
                  </div>
                  <div className="info-field">
                    <span className="field-label">Member Since</span>
                    <strong className="field-value">{user.memberSince}</strong>
                  </div>
                </div>
              </div>

              {/* Saved Delivery Addresses */}
              <div className="profile-section-card">
                <div className="card-header-row">
                  <div>
                    <h2 className="profile-section-title">Saved Delivery Addresses</h2>
                    <p className="section-subtext">Manage addresses for fast pre-order checkout.</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.9rem' }}
                    onClick={() => setIsAddingAddress((prev) => !prev)}
                  >
                    {isAddingAddress ? 'Cancel' : '+ Add Address'}
                  </button>
                </div>

                {/* Add Address Form */}
                {isAddingAddress && (
                  <form onSubmit={handleAddressSubmit} className="add-address-form">
                    <h4>Add New Delivery Address</h4>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label htmlFor="addr-label">Label (e.g. Home, Office)</label>
                        <input
                          type="text"
                          id="addr-label"
                          value={newAddress.label}
                          onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ flex: 2 }}>
                        <label htmlFor="addr-street">Street Address</label>
                        <input
                          type="text"
                          id="addr-street"
                          placeholder="123 Mediterranean Way, Apt 2"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label htmlFor="addr-city">City</label>
                        <input
                          type="text"
                          id="addr-city"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ maxWidth: '100px' }}>
                        <label htmlFor="addr-state">State</label>
                        <input
                          type="text"
                          id="addr-state"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ maxWidth: '140px' }}>
                        <label htmlFor="addr-zip">ZIP Code</label>
                        <input
                          type="text"
                          id="addr-zip"
                          placeholder="60601"
                          value={newAddress.zip}
                          onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                      Save Delivery Address
                    </button>
                  </form>
                )}

                {/* Addresses List */}
                <div className="addresses-list">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`address-item-card ${addr.isDefault ? 'is-default' : ''}`}>
                      <div className="address-meta">
                        <div className="address-title-row">
                          <strong>{addr.label}</strong>
                          {addr.isDefault && <span className="default-tag">Default</span>}
                        </div>
                        <p>{addr.street}</p>
                        <small>{addr.city}, {addr.state} {addr.zip}</small>
                      </div>
                      <div className="address-actions">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            className="btn-address-action"
                            onClick={() => setDefaultAddress(addr.id)}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-address-action btn-delete"
                          onClick={() => removeAddress(addr.id)}
                          aria-label={`Remove address ${addr.label}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Account Management & Quick Links */}
            <div className="profile-side-col">
              <div className="profile-section-card side-action-card">
                <h3>Account Navigation</h3>
                <ul className="side-nav-list">
                  <li>
                    <Link to="/favorites" className="side-nav-link">
                      <span>❤️ My Favorites</span>
                      <span className="count-pill">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="side-nav-link">
                      <span>📦 My Orders</span>
                      <span className="count-pill">{orders.length}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-reservations" className="side-nav-link">
                      <span>📅 My Table Reservations</span>
                      <span className="count-pill">{reservations.length}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reservations" className="side-nav-link">
                      <span>🍽️ Reserve a New Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/menu" className="side-nav-link">
                      <span>📖 Explore Full Menu</span>
                    </Link>
                  </li>
                </ul>

                <hr className="profile-divider-line" />

                <button
                  type="button"
                  className="btn btn-outline profile-logout-action-btn"
                  onClick={handleLogout}
                >
                  🚪 Log Out of Account
                </button>
              </div>

              {/* Demonstration Notice Card */}
              <div className="demo-architecture-note">
                <h4>Architecture Note</h4>
                <p>
                  This profile and authentication system operates in local demonstration mode. Profile edits,
                  addresses, favorites, orders, and table bookings are persisted in your local browser storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
