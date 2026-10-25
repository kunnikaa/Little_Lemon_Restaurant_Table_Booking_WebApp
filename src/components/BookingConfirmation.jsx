import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateForDisplay } from '../utils/bookingUtils';
import { formatCurrency } from '../utils/currency';

export default function BookingConfirmation({ bookingDetails, onReset }) {
  if (!bookingDetails) {
    return null;
  }

  const {
    id = 'LL-DEMO-2026',
    fullName = 'Guest',
    email = '',
    phone = '',
    date = '',
    time = '',
    guests = 2,
    occasion = 'Casual Dining',
    seating = 'indoor',
    specialRequests = '',
  } = bookingDetails;

  const seatingLabels = {
    indoor: 'Main Dining Room (Indoor)',
    outdoor: 'Garden Patio (Outdoor)',
    bar: "Chef's Counter / Bar",
  };

  return (
    <div
      className="confirmation-card"
      role="region"
      aria-labelledby="confirmation-heading"
      aria-live="polite"
    >
      {/* Success Badge Icon */}
      <div className="confirmation-badge-success" aria-hidden="true">
        ✓
      </div>

      <h2 id="confirmation-heading" className="confirmation-title">
        Reservation Confirmed!
      </h2>
      <p className="confirmation-subtitle">
        Thank you, <strong>{fullName}</strong>. We look forward to welcoming you to Little Lemon Chicago.
      </p>

      {/* Confirmation Summary Box */}
      <div className="confirmation-details-box">
        <h4>Reservation Summary</h4>
        <div className="confirmation-details-grid">
          <div className="confirmation-item">
            <span className="confirmation-item-label">Booking Reference</span>
            <span className="confirmation-item-value" style={{ color: 'var(--color-primary-green)' }}>
              {id}
            </span>
          </div>

          <div className="confirmation-item">
            <span className="confirmation-item-label">Guest Name</span>
            <span className="confirmation-item-value">{fullName}</span>
          </div>

          <div className="confirmation-item">
            <span className="confirmation-item-label">Date</span>
            <span className="confirmation-item-value">{formatDateForDisplay(date)}</span>
          </div>

          <div className="confirmation-item">
            <span className="confirmation-item-label">Time</span>
            <span className="confirmation-item-value">{time}</span>
          </div>

          <div className="confirmation-item">
            <span className="confirmation-item-label">Number of Guests</span>
            <span className="confirmation-item-value">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>

          <div className="confirmation-item">
            <span className="confirmation-item-label">Occasion</span>
            <span className="confirmation-item-value">{occasion}</span>
          </div>

          <div className="confirmation-item">
            <span className="confirmation-item-label">Seating Area</span>
            <span className="confirmation-item-value">{seatingLabels[seating] || seating}</span>
          </div>

          <div className="confirmation-item">
            <span className="confirmation-item-label">Contact Email</span>
            <span className="confirmation-item-value">{email}</span>
          </div>

          {phone && (
            <div className="confirmation-item">
              <span className="confirmation-item-label">Phone</span>
              <span className="confirmation-item-value">{phone}</span>
            </div>
          )}

          {specialRequests && (
            <div className="confirmation-item" style={{ gridColumn: '1 / -1' }}>
              <span className="confirmation-item-label">Special Requests</span>
              <span className="confirmation-item-value" style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
                "{specialRequests}"
              </span>
            </div>
          )}

          {bookingDetails.preOrderedDishes && bookingDetails.preOrderedDishes.length > 0 && (
            <div className="confirmation-item confirmation-preorder-section" style={{ gridColumn: '1 / -1', borderTop: '1px dashed var(--color-muted-sage)', paddingTop: '1rem', marginTop: '0.75rem' }}>
              <span className="confirmation-item-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                Pre-Ordered Dishes (Dine-in Kitchen Order)
              </span>
              <div className="confirmation-preorder-list">
                {bookingDetails.preOrderedDishes.map((dish, i) => (
                  <div key={dish.id || i} className="confirmation-preorder-row">
                    {dish.image && (
                      <img src={dish.image} alt={dish.name} className="confirmation-dish-thumb" />
                    )}
                    <div className="confirmation-dish-info">
                      <strong>{dish.name}</strong>
                      <small>{dish.category ? `${dish.category} · ` : ''}{formatCurrency(dish.price)} each</small>
                    </div>
                    <span className="confirmation-dish-qty">Qty: {dish.quantity}</span>
                    <span className="confirmation-dish-subtotal">
                      {formatCurrency(dish.subtotal || dish.price * dish.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="confirmation-preorder-summary">
                <div className="preorder-payment-clarification">
                  <span aria-hidden="true">💡</span>
                  <span><strong>Payment Note:</strong> Food pre-orders are billed directly on your table check at the restaurant. No upfront charges were made.</span>
                </div>
                <div className="preorder-total-badge">
                  <span>Pre-Order Subtotal:</span>
                  <strong>
                    {formatCurrency(
                      bookingDetails.preOrderSubtotal ||
                      bookingDetails.preOrderedDishes.reduce(
                        (sum, d) => sum + (d.subtotal || d.price * d.quantity),
                        0
                      )
                    )}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demonstration Notice */}
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--color-neutral-gray)',
          marginBottom: '2rem',
          maxWidth: '620px',
          margin: '0 auto 2rem auto',
          lineHeight: '1.5',
        }}
      >
        ℹ <em>Capstone Demonstration Notice:</em> This is a frontend simulation created for the Coursera Meta Front-End Capstone.
        Your reservation has been saved to your local session history.
      </p>

      {/* Action Buttons */}
      <div className="confirmation-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onReset}
          id="book-another-btn"
        >
          Book Another Table
        </button>

        <Link to="/my-reservations" className="btn btn-secondary">
          View My Reservations →
        </Link>

        <Link to="/" className="btn btn-outline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
