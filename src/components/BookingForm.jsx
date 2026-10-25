import React, { useState, useEffect } from 'react';
import { getTodayDateString, validateBookingForm } from '../utils/bookingUtils';
import { MENU_ITEMS } from '../data/menuItems';
import { formatCurrency } from '../utils/currency';
import ReservationMenuModal from './ReservationMenuModal';

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

  // Table Reservation vs Table + Pre-Order Food (Journey A)
  const [bookingChoice, setBookingChoice] = useState('table_only'); // 'table_only' or 'table_and_food'
  const [selectedDishes, setSelectedDishes] = useState({});
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const handleUpdateDishQuantity = (dishId, newQty) => {
    setSelectedDishes((prev) => {
      const sanitizedQty = Math.max(0, newQty);
      if (sanitizedQty === 0) {
        const next = { ...prev };
        delete next[dishId];
        return next;
      }
      return { ...prev, [dishId]: sanitizedQty };
    });
  };

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

    // Build pre-ordered dishes list from full menu items if enabled
    const preOrderedDishes =
      bookingChoice === 'table_and_food'
        ? Object.entries(selectedDishes)
            .filter(([_, qty]) => qty > 0)
            .map(([id, qty]) => {
              const dish = MENU_ITEMS.find((d) => String(d.id) === String(id));
              return dish
                ? {
                    id: dish.id,
                    name: dish.name,
                    price: dish.priceNumber,
                    priceFormatted: dish.price,
                    quantity: qty,
                    image: dish.image,
                    category: dish.category,
                    subtotal: dish.priceNumber * qty,
                  }
                : null;
            })
            .filter(Boolean)
        : [];

    const preOrderSubtotal = preOrderedDishes.reduce((sum, item) => sum + item.subtotal, 0);

    // Call submit handler with verified form data and attached pre-orders
    if (onSubmitBooking) {
      onSubmitBooking({
        ...formData,
        bookingChoice,
        preOrderedDishes,
        preOrderSubtotal,
      });
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

        {/* Food Selection Workflow: Dual Choices */}
        <div className="form-group full-width booking-food-workflow">
          <div className="workflow-section-header">
            <h3 className="workflow-title">Pre-order Food for Your Visit (Optional)</h3>
            <p className="workflow-subtitle">
              Choose whether you'd like your Mediterranean dishes prepared fresh upon your arrival or prefer to order at your table.
            </p>
          </div>

          <div className="booking-choice-cards" role="radiogroup" aria-label="Reservation Food Pre-order Option">
            <label
              className={`booking-choice-card ${bookingChoice === 'table_only' ? 'selected' : ''}`}
              htmlFor="choice-table-only"
            >
              <input
                type="radio"
                id="choice-table-only"
                name="bookingChoice"
                value="table_only"
                checked={bookingChoice === 'table_only'}
                onChange={() => setBookingChoice('table_only')}
              />
              <div className="choice-card-content">
                <div className="choice-icon">🍽️</div>
                <div className="choice-text">
                  <div className="choice-title">Reserve a Table Only</div>
                  <div className="choice-desc">No pre-ordering needed. Browse and order from our printed menu when seated at the restaurant.</div>
                </div>
              </div>
            </label>

            <label
              className={`booking-choice-card ${bookingChoice === 'table_and_food' ? 'selected' : ''}`}
              htmlFor="choice-table-food"
            >
              <input
                type="radio"
                id="choice-table-food"
                name="bookingChoice"
                value="table_and_food"
                checked={bookingChoice === 'table_and_food'}
                onChange={() => setBookingChoice('table_and_food')}
              />
              <div className="choice-card-content">
                <div className="choice-icon">🍋</div>
                <div className="choice-text">
                  <div className="choice-title">Reserve a Table + Pre-order Food</div>
                  <div className="choice-desc">Browse our full 20-dish menu now. Chef Adrian &amp; Mario will prepare your selection fresh for your arrival.</div>
                </div>
              </div>
            </label>
          </div>

          {/* When Table + Food is selected */}
          {bookingChoice === 'table_and_food' && (
            <div className="preorder-fullmenu-panel">
              <div className="preorder-action-bar">
                <button
                  type="button"
                  id="browse-full-menu-btn"
                  className="btn btn-primary browse-menu-btn"
                  onClick={() => setIsMenuModalOpen(true)}
                  aria-label="Browse full restaurant menu and add dishes to reservation"
                >
                  <span className="btn-icon" aria-hidden="true">📖</span>
                  <span>Browse Full Menu &amp; Add Dishes</span>
                  {Object.values(selectedDishes).reduce((a, b) => a + b, 0) > 0 && (
                    <span className="btn-badge">
                      {Object.values(selectedDishes).reduce((a, b) => a + b, 0)} items
                    </span>
                  )}
                </button>
                <span className="preorder-menu-hint">
                  {Object.keys(selectedDishes).length === 0
                    ? 'Explore 20 signature dishes across Starters, Mains, Pastas, Seafood &amp; Desserts.'
                    : `${Object.values(selectedDishes).reduce((a, b) => a + b, 0)} dish${
                        Object.values(selectedDishes).reduce((a, b) => a + b, 0) === 1 ? '' : 'es'
                      } selected`}
                </span>
              </div>

              {/* Itemized Selected Dishes List */}
              {Object.keys(selectedDishes).some((id) => selectedDishes[id] > 0) ? (
                <div className="preorder-selected-summary">
                  <div className="selected-summary-header">
                    <h4>Pre-ordered Dishes for Your Table</h4>
                    <button
                      type="button"
                      className="edit-selection-link"
                      onClick={() => setIsMenuModalOpen(true)}
                    >
                      + Add / Modify Dishes
                    </button>
                  </div>

                  <div className="selected-dishes-list">
                    {Object.entries(selectedDishes)
                      .filter(([_, qty]) => qty > 0)
                      .map(([id, qty]) => {
                        const dish = MENU_ITEMS.find((d) => String(d.id) === String(id));
                        if (!dish) return null;
                        return (
                          <div key={dish.id} className="selected-dish-row">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="selected-dish-thumb"
                              loading="lazy"
                            />
                            <div className="selected-dish-info">
                              <span className="selected-dish-name">{dish.name}</span>
                              <span className="selected-dish-unitprice">
                                {dish.price} each · {dish.category}
                              </span>
                            </div>
                            <div className="selected-dish-stepper">
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => handleUpdateDishQuantity(dish.id, qty - 1)}
                                aria-label={`Decrease ${dish.name} quantity`}
                              >
                                −
                              </button>
                              <span className="stepper-count">{qty}</span>
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => handleUpdateDishQuantity(dish.id, qty + 1)}
                                aria-label={`Increase ${dish.name} quantity`}
                              >
                                +
                              </button>
                            </div>
                            <div className="selected-dish-subtotal">
                              {formatCurrency(dish.priceNumber * qty)}
                            </div>
                            <button
                              type="button"
                              className="selected-dish-remove"
                              onClick={() => handleUpdateDishQuantity(dish.id, 0)}
                              aria-label={`Remove ${dish.name}`}
                              title="Remove dish"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                  </div>

                  <div className="selected-summary-footer">
                    <div className="summary-payment-notice">
                      <span className="notice-icon" aria-hidden="true">ℹ️</span>
                      <span>
                        <strong>Payment at Restaurant:</strong> Pre-ordered food is prepared fresh for your arrival. No payment is taken now; charges are added to your final dining check.
                      </span>
                    </div>
                    <div className="selected-summary-total">
                      <span>Food Pre-Order Subtotal:</span>
                      <strong>
                        {formatCurrency(
                          Object.entries(selectedDishes).reduce((sum, [id, qty]) => {
                            const dish = MENU_ITEMS.find((d) => String(d.id) === String(id));
                            return sum + (dish ? dish.priceNumber * qty : 0);
                          }, 0)
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="preorder-empty-prompt">
                  <p>You haven't added any dishes yet. Click <strong>"Browse Full Menu &amp; Add Dishes"</strong> above to select food, or switch to <em>"Reserve a Table Only"</em> if you prefer to order at the restaurant.</p>
                </div>
              )}
            </div>
          )}

          {/* Full Menu Modal Component */}
          <ReservationMenuModal
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
            selectedItems={selectedDishes}
            onUpdateQuantity={handleUpdateDishQuantity}
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
