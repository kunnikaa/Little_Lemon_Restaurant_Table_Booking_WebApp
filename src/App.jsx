import React, { useReducer, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuHighlights from './components/MenuHighlights';
import About from './components/About';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Footer from './components/Footer';
import { initializeTimes, updateTimes } from './utils/bookingUtils';
import { submitAPI } from './utils/bookingApi';

export default function App() {
  // Reducer for available reservation times (Coursera rubric requirement)
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, undefined, initializeTimes);

  // Booking state: null when not booked, object containing confirmation details once booked
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Handler for form submission (Coursera rubric requirement submitForm)
  const submitForm = async (formData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Simulate realistic API network response delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const success = submitAPI(formData);

      if (success) {
        const referenceId = `LL-${Date.now().toString(36).toUpperCase().slice(-5)}`;
        setConfirmedBooking({
          ...formData,
          id: referenceId,
        });

        // Smooth scroll to reservation card
        const section = document.getElementById('reservations');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setSubmissionError(
          'We were unable to complete your reservation at this moment. Please verify your details or try again.'
        );
      }
    } catch {
      setSubmissionError('A network error occurred while submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset booking state to allow making another reservation
  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setSubmissionError(null);
    dispatchTimes({ type: 'RESET_TIMES' });

    // Scroll to booking section and focus
    const section = document.getElementById('reservations');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation handler
  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Accessible Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Semantic Landmark */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onReserveClick={() => {
            const el = document.getElementById('reservations');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              const firstInput = el.querySelector('input, select');
              if (firstInput) firstInput.focus();
            }
          }}
        />

        {/* Menu Highlights / Specials */}
        <MenuHighlights />

        {/* Dedicated Table Booking Section */}
        <section
          id="reservations"
          className="booking-section"
          aria-labelledby="booking-section-heading"
        >
          <div className="container">
            <div className="booking-header">
              <h2 id="booking-section-heading">Reserve a Table</h2>
              <p>
                Experience the authentic flavors of the Mediterranean. Book your table in advance
                to secure your spot at Little Lemon Chicago.
              </p>
            </div>

            <div className="booking-layout-wrapper">
              <div className="booking-card-banner">
                <h3>{confirmedBooking ? 'Reservation Confirmed' : 'Table Reservation Details'}</h3>
                <span>📍 Downtown Chicago Location</span>
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
                  onSubmitBooking={submitForm}
                  isSubmitting={isSubmitting}
                  submissionError={submissionError}
                />
              )}
            </div>
          </div>
        </section>

        {/* Testimonials / Reviews */}
        <Testimonials />

        {/* About Restaurant Founders */}
        <About />
      </main>

      {/* Accessible Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
