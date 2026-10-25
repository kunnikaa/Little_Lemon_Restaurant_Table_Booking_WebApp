import React from 'react';
import { formatDateForDisplay } from '../utils/bookingUtils';

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
        A confirmation receipt has been simulated and saved to local state.
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

        <a
          href="#home"
          className="btn btn-outline"
          onClick={(e) => {
            e.preventDefault();
            const home = document.getElementById('home');
            if (home) home.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
