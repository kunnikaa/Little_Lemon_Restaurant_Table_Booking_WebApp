import React, { useState, useEffect } from 'react';
import { getTodayDateString, validateBookingForm } from '../utils/bookingUtils';

export default function BookingForm({
  availableTimes = [],
  dispatchTimes,
  onSubmitBooking,
  isSubmitting = false,
  submissionError = null,
}) {
  const today = getTodayDateString();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: today,
    time: availableTimes.length > 0 ? availableTimes[0] : '',
    guests: 2,
    occasion: 'Casual Dining',
    seating: 'indoor',
    specialRequests: '',
  });

  // Validation Errors State & Touched Fields
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // When availableTimes update (e.g. after date change), adjust time if needed
  useEffect(() => {
    if (availableTimes && availableTimes.length > 0) {
      if (!availableTimes.includes(formData.time)) {
        setFormData((prev) => ({ ...prev, time: availableTimes[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, time: '' }));
    }
  }, [availableTimes]);

  // Handle generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation for already touched field
    if (touched[name]) {
      const validation = validateBookingForm({ ...formData, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: validation.errors[name] || undefined,
      }));
    }
  };

  // Handle date change specifically to trigger reducer update
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFormData((prev) => ({ ...prev, date: newDate }));
    setTouched((prev) => ({ ...prev, date: true }));

    // Dispatch action to update available times in parent state / reducer
    if (dispatchTimes) {
      dispatchTimes({ type: 'UPDATE_TIMES', payload: newDate });
    }

    // Validate date immediately
    const validation = validateBookingForm({ ...formData, date: newDate });
    setErrors((prev) => ({
      ...prev,
      date: validation.errors.date || undefined,
    }));
  };

  // Mark field touched on blur and run field validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validation = validateBookingForm(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: validation.errors[name] || undefined,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      date: true,
      time: true,
      guests: true,
      occasion: true,
    });

    const validation = validateBookingForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      // Focus the first invalid field for keyboard & screen reader accessibility
      const firstInvalidKey = Object.keys(validation.errors)[0];
      const element = document.querySelector(`[name="${firstInvalidKey}"]`);
      if (element) {
        element.focus();
      }
      return;
    }

    // Call submit handler with verified form data
    if (onSubmitBooking) {
      onSubmitBooking(formData);
    }
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table Reservation Form"
    >
      {/* Error alert banner if submission failed */}
      {submissionError && (
        <div
          role="alert"
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-error-bg)',
            color: 'var(--color-error)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid var(--color-error-border)',
            fontWeight: '600',
          }}
        >
          ⚠ {submissionError}
        </div>
      )}

      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="full-name" className="form-label">
            Full Name <span className="form-required" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="full-name"
            name="fullName"
            className={`form-control ${errors.fullName && touched.fullName ? 'has-error' : ''}`}
            placeholder="e.g. Jane Doe"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            minLength={2}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!(errors.fullName && touched.fullName)}
            aria-describedby={errors.fullName && touched.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && touched.fullName && (
            <p id="fullName-error" className="error-message" role="alert">
              <span>⚠</span> {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="form-required" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email && touched.email ? 'has-error' : ''}`}
            placeholder="e.g. jane@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!(errors.email && touched.email)}
            aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
          />
          {errors.email && touched.email && (
            <p id="email-error" className="error-message" role="alert">
              <span>⚠</span> {errors.email}
            </p>
          )}
        </div>

        {/* Phone Number (Optional) */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-gray)', fontWeight: 'normal' }}>(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-control ${errors.phone && touched.phone ? 'has-error' : ''}`}
            placeholder="e.g. (312) 555-0143"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="tel"
            aria-invalid={!!(errors.phone && touched.phone)}
            aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
          />
          {errors.phone && touched.phone && (
            <p id="phone-error" className="error-message" role="alert">
              <span>⚠</span> {errors.phone}
            </p>
          )}
        </div>

        {/* Reservation Date (id="res-date" required by Coursera rubric) */}
        <div className="form-group">
          <label htmlFor="res-date" className="form-label">
            Choose Date <span className="form-required" aria-hidden="true">*</span>
          </label>
          <input
            type="date"
            id="res-date"
            name="date"
            className={`form-control ${errors.date && touched.date ? 'has-error' : ''}`}
            min={today}
            value={formData.date}
            onChange={handleDateChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={!!(errors.date && touched.date)}
            aria-describedby={errors.date && touched.date ? 'date-error' : undefined}
          />
          {errors.date && touched.date && (
            <p id="date-error" className="error-message" role="alert">
              <span>⚠</span> {errors.date}
            </p>
          )}
        </div>

        {/* Reservation Time (id="res-time" required by Coursera rubric) */}
        <div className="form-group">
          <label htmlFor="res-time" className="form-label">
            Choose Time <span className="form-required" aria-hidden="true">*</span>
          </label>
          <select
            id="res-time"
            name="time"
            className={`form-control ${errors.time && touched.time ? 'has-error' : ''}`}
            value={formData.time}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={!!(errors.time && touched.time)}
            aria-describedby={errors.time && touched.time ? 'time-error' : undefined}
          >
            {availableTimes && availableTimes.length > 0 ? (
              availableTimes.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No tables available for this date
              </option>
            )}
          </select>
          {errors.time && touched.time && (
            <p id="time-error" className="error-message" role="alert">
              <span>⚠</span> {errors.time}
            </p>
          )}
          <span className="form-helper-text">
            Times update dynamically based on chef kitchen availability.
          </span>
        </div>

        {/* Number of Guests (id="guests" required by Coursera rubric) */}
        <div className="form-group">
          <label htmlFor="guests" className="form-label">
            Number of Guests <span className="form-required" aria-hidden="true">*</span>
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            className={`form-control ${errors.guests && touched.guests ? 'has-error' : ''}`}
            placeholder="2"
            min={1}
            max={10}
            value={formData.guests}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={!!(errors.guests && touched.guests)}
            aria-describedby={errors.guests && touched.guests ? 'guests-error' : 'guests-helper'}
          />
          <span id="guests-helper" className="form-helper-text">
            Online booking supports 1 to 10 guests.
          </span>
          {errors.guests && touched.guests && (
            <p id="guests-error" className="error-message" role="alert">
              <span>⚠</span> {errors.guests}
            </p>
          )}
        </div>

        {/* Occasion (id="occasion" required by Coursera rubric) */}
        <div className="form-group">
          <label htmlFor="occasion" className="form-label">
            Occasion <span className="form-required" aria-hidden="true">*</span>
          </label>
          <select
            id="occasion"
            name="occasion"
            className={`form-control ${errors.occasion && touched.occasion ? 'has-error' : ''}`}
            value={formData.occasion}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={!!(errors.occasion && touched.occasion)}
            aria-describedby={errors.occasion && touched.occasion ? 'occasion-error' : undefined}
          >
            <option value="Casual Dining">Casual Dining</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Engagement">Engagement</option>
            <option value="Business Meal">Business Meal</option>
          </select>
          {errors.occasion && touched.occasion && (
            <p id="occasion-error" className="error-message" role="alert">
              <span>⚠</span> {errors.occasion}
            </p>
          )}
        </div>

        {/* Seating Preference */}
        <div className="form-group full-width">
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend className="form-label">Seating Preference</legend>
            <div className="seating-options-grid">
              <label className={`seating-card-label ${formData.seating === 'indoor' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="seating"
                  value="indoor"
                  checked={formData.seating === 'indoor'}
                  onChange={handleChange}
                />
                <span className="seating-card-icon" aria-hidden="true">🏛️</span>
                <span>Main Dining Room (Indoor)</span>
              </label>

              <label className={`seating-card-label ${formData.seating === 'outdoor' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="seating"
                  value="outdoor"
                  checked={formData.seating === 'outdoor'}
                  onChange={handleChange}
                />
                <span className="seating-card-icon" aria-hidden="true">🌿</span>
                <span>Garden Patio (Outdoor)</span>
              </label>

              <label className={`seating-card-label ${formData.seating === 'bar' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="seating"
                  value="bar"
                  checked={formData.seating === 'bar'}
                  onChange={handleChange}
                />
                <span className="seating-card-icon" aria-hidden="true">🍸</span>
                <span>Chef's Counter / Bar</span>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Special Requests (Optional) */}
        <div className="form-group full-width">
          <label htmlFor="special-requests" className="form-label">
            Special Requests <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-gray)', fontWeight: 'normal' }}>(Optional)</span>
          </label>
          <textarea
            id="special-requests"
            name="specialRequests"
            className="form-control"
            rows="3"
            placeholder="Dietary requirements, high chairs, anniversary notes, or quiet corner preference..."
            value={formData.specialRequests}
            onChange={handleChange}
            maxLength={300}
          />
        </div>
      </div>

      {/* Submit Button & Disclaimer */}
      <div className="form-submit-wrapper">
        <button
          type="submit"
          className="btn btn-primary booking-submit-btn"
          disabled={isSubmitting}
          id="submit-booking-btn"
        >
          {isSubmitting ? 'Processing Reservation...' : 'Reserve Your Table'}
        </button>

        <p className="booking-demo-disclaimer">
          * Instant table confirmation. Submissions are processed locally for demonstration as part of the
          Coursera Meta Front-End Capstone project. No real restaurant charges or payment info requested.
        </p>
      </div>
    </form>
  );
}
