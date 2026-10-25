import React, { useReducer, useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import MenuSection from './components/MenuSection';
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
      // Simulate realistic network delay
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

    // Scroll to booking section and focus first input
    const section = document.getElementById('reservations');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      const firstInput = section.querySelector('input, select');
      if (firstInput) firstInput.focus();
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

      {/* Slim Top Announcement Bar */}
      <AnnouncementBar />

      {/* Accessible Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Content Landmark */}
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
          onMenuClick={() => handleNavigate('menu')}
        />

        {/* Featured Signature Dishes */}
        <FeaturedDishes onNavigateToMenu={handleNavigate} />

        {/* Comprehensive Culinary Menu (16 Dishes, Categories & Search) */}
        <MenuSection />

        {/* Dedicated Table Booking Section (Core Functional Requirement) */}
        <section
          id="reservations"
          className="booking-section"
          aria-labelledby="booking-section-heading"
        >
          <div className="container">
            <div className="booking-header">
              <span className="editorial-subtitle">ONLINE TABLE RESERVATIONS</span>
              <h2 id="booking-section-heading">Reserve a Table at Little Lemon</h2>
              <p>
                Experience genuine Mediterranean hospitality. Choose your preferred dining room or
                garden patio and receive immediate confirmation.
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

        {/* Story of Founders Mario & Adrian */}
        <About />

        {/* Customer Testimonials & Social Proof */}
        <Testimonials />
      </main>

      {/* Accessible Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
