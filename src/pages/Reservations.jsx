import React, { useReducer, useState } from 'react';
import BookingForm from '../components/BookingForm';
import BookingConfirmation from '../components/BookingConfirmation';
import { initializeTimes, updateTimes } from '../utils/bookingUtils';
import { submitAPI } from '../utils/bookingApi';

export default function Reservations() {
  // Reducer for available reservation times (Coursera Capstone requirement)
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, undefined, initializeTimes);

  // Booking state
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Form submission handler (Coursera submitForm requirement)
  const handleSubmitBooking = async (formData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const success = submitAPI(formData);

      if (success) {
        const referenceId = `LL-${Date.now().toString(36).toUpperCase().slice(-5)}`;
        setConfirmedBooking({
          ...formData,
          id: referenceId,
        });

        // Scroll to confirmation box
        const card = document.getElementById('reservations-card-wrapper');
        if (card) {
          card.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setSubmissionError(
          'We were unable to complete your reservation. Please verify your details or select another date/time.'
        );
      }
    } catch {
      setSubmissionError('A network error occurred while submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setSubmissionError(null);
    dispatchTimes({ type: 'RESET_TIMES' });

    const card = document.getElementById('reservations-card-wrapper');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth' });
      const firstInput = card.querySelector('input, select');
      if (firstInput) firstInput.focus();
    }
  };

  return (
    <div className="reservations-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="reservations-page-heading">
        <div className="container">
          <span className="editorial-subtitle">ONLINE TABLE RESERVATIONS</span>
          <h1 id="reservations-page-heading" className="page-title">
            Book Your Table at Little Lemon
          </h1>
          <p className="page-description">
            Join us for an unforgettable Mediterranean dining experience in downtown Chicago.
            Select your preferred dining room, date, and party size below.
          </p>
        </div>
      </section>

      {/* Main Reservation Section */}
      <section className="reservations-content-section">
        <div className="container">
          {/* Reservation Card */}
          <div className="booking-layout-wrapper" id="reservations-card-wrapper">
            <div className="booking-card-banner">
              <h3>{confirmedBooking ? 'Reservation Confirmed' : 'Table Reservation Details'}</h3>
              <span>📍 Downtown Chicago • 123 Mediterranean Way</span>
            </div>

            {confirmedBooking ? (
              <BookingConfirmation
                bookingDetails={confirmedBooking}
                onReset={handleResetBooking}
              />
            ) : (
              <BookingForm
                availableTimes={availableTimes}
                dispatchTimes={dispatchTimes}
                onSubmitBooking={handleSubmitBooking}
                isSubmitting={isSubmitting}
                submissionError={submissionError}
              />
            )}
          </div>

          {/* Dining Information & Policies Strip */}
          <div className="reservation-policies-grid">
            <div className="policy-item">
              <span className="policy-icon" aria-hidden="true">🏛️</span>
              <h4>Seating Options</h4>
              <p>
                Choose between our lively <strong>Main Dining Room</strong>, scenic <strong>Garden Patio</strong>,
                or front-row seats at the <strong>Chef's Counter</strong>.
              </p>
            </div>

            <div className="policy-item">
              <span className="policy-icon" aria-hidden="true">⏱️</span>
              <h4>Flexible Cancellations</h4>
              <p>
                Plans change! We offer complimentary cancellations and modifications up to 2 hours
                prior to your reservation time.
              </p>
            </div>

            <div className="policy-item">
              <span className="policy-icon" aria-hidden="true">👥</span>
              <h4>Large Parties (10+ Guests)</h4>
              <p>
                For private dining, corporate gatherings, or celebrations larger than 10 guests,
                please call us directly at <strong>(312) 555-0199</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
