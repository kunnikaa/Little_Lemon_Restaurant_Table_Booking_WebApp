import React from 'react';
import { Link } from 'react-router-dom';
import { getSavedReservations } from '../utils/orderStorage';
import { formatCurrency } from '../utils/currency';

export default function MyReservations() {
  const reservations = getSavedReservations();

  return (
    <div className="reservations-history-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="res-history-heading">
        <div className="container">
          <span className="editorial-subtitle">DINING APPOINTMENTS</span>
          <h1 id="res-history-heading" className="page-title">
            My Table Reservations
          </h1>
          <p className="page-description">
            View all confirmed table bookings at Little Lemon Chicago, including party size, seating area,
            and any pre-selected dining courses.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="res-history-content" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="history-header-bar">
            <div>
              <h2>Upcoming & Past Dining Reservations</h2>
              <p className="history-subtext">
                All table reservations made via our online booking system are recorded below.
              </p>
            </div>
            <Link to="/reservations" className="btn btn-primary">
              + Book Another Table
            </Link>
          </div>

          {reservations.length > 0 ? (
            <div className="reservations-list">
              {reservations.map((res) => (
                <article key={res.referenceId || res.id} className="reservation-card-item">
                  <div className="res-card-top">
                    <div className="res-meta-left">
                      <span className="res-ref-pill">{res.referenceId || 'LL-RES'}</span>
                      <h3 className="res-card-title">
                        {res.displayDate || res.date} at {res.displayTime || res.time}
                      </h3>
                      <span className="res-guests-badge">
                        👥 {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'} • {res.occasion || 'Dining'}
                      </span>
                    </div>
                    <div className="res-meta-right">
                      <span className="res-seating-tag">🪑 {res.seating || 'Standard Dining Room'}</span>
                      <span className="status-pill status-confirmed">● {res.status || 'Confirmed'}</span>
                    </div>
                  </div>

                  <div className="res-card-body">
                    <div className="res-details-columns">
                      <div className="res-info-block">
                        <span className="res-info-label">Primary Guest</span>
                        <strong>{res.fullName || 'Little Lemon Guest'}</strong>
                        <small>{res.email} • {res.phone}</small>
                      </div>

                      {res.specialRequests && (
                        <div className="res-info-block">
                          <span className="res-info-label">Special Requests</span>
                          <p className="res-notes-text">"{res.specialRequests}"</p>
                        </div>
                      )}
                    </div>

                    {/* Attached Pre-Ordered Dishes (Journey A) */}
                    {res.preOrderedDishes && res.preOrderedDishes.length > 0 && (
                      <div className="res-preorder-attachment">
                        <h4 className="preorder-attach-title">
                          🍽️ Pre-Selected Dishes for this Table Visit:
                        </h4>
                        <div className="preorder-attach-list">
                          {res.preOrderedDishes.map((dish, i) => (
                            <div key={i} className="attach-dish-chip">
                              <span className="attach-dish-qty">{dish.quantity}×</span>
                              <span className="attach-dish-name">{dish.name}</span>
                              <span className="attach-dish-price">
                                {formatCurrency(dish.price * dish.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="res-card-footer">
                    <div className="res-guidance-note">
                      <span>📍 123 Mediterranean Way, Chicago, IL 60601</span>
                    </div>
                    <div className="res-actions">
                      <Link to="/reservations" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.45rem 1rem' }}>
                        Modify / Re-Book
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="menu-empty-state" role="status">
              <span className="empty-icon" aria-hidden="true">📅</span>
              <h2>No table reservations found</h2>
              <p>
                You haven't reserved a table yet. Pick a date, choose an available time slot,
                and join us for authentic Mediterranean dining in Chicago!
              </p>
              <Link to="/reservations" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Reserve a Table Now →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
