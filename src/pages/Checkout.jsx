import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, tax, total, clearCart } = useCart();

  // Retrieve saved order preferences from sessionStorage
  const savedPrefs = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('little_lemon_order_prefs') || '{}');
    } catch {
      return {};
    }
  })();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tableNumber: '',
    paymentMethod: 'demo-card', // 'demo-card', 'apple-pay-demo', 'in-person'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Guard against direct URL visits with empty cart
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
          <h2>Your Cart is Empty</h2>
          <p style={{ margin: '1rem 0 2rem 0', color: 'var(--color-warm-gray)' }}>
            Please select your dishes before proceeding to checkout.
          </p>
          <Link to="/menu" className="btn btn-primary">
            Explore Menu →
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    // Simulate realistic payment provider roundtrip
    await new Promise((resolve) => setTimeout(resolve, 800));

    const orderId = `LL-ORD-${Date.now().toString(36).toUpperCase().slice(-5)}`;
    const completedOrder = {
      orderId,
      items: [...cart],
      subtotal,
      tax,
      total,
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        tableNumber: formData.tableNumber,
      },
      preferences: savedPrefs,
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'Demonstration Payment Approved',
      timestamp: new Date().toISOString(),
    };

    // Save to demonstration history in localStorage
    try {
      const history = JSON.parse(localStorage.getItem('little_lemon_order_history') || '[]');
      history.push(completedOrder);
      localStorage.setItem('little_lemon_order_history', JSON.stringify(history));
    } catch {
      // Safe fallback
    }

    // Clear cart and navigate to confirmation page
    clearCart();
    setIsProcessing(false);
    navigate('/order-confirmation', { state: { order: completedOrder } });
  };

  return (
    <div className="checkout-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="checkout-heading">
        <div className="container">
          <span className="editorial-subtitle">SECURE ORDER CHECKOUT</span>
          <h1 id="checkout-heading" className="page-title">
            Review & Finalize Order
          </h1>
          <p className="page-description">
            Complete your guest details below to confirm your Mediterranean dining order.
          </p>
        </div>
      </section>

      {/* Checkout Form & Order Summary Grid */}
      <section className="checkout-content-section">
        <div className="container">
          {/* Important Educational Payment Banner */}
          <div className="demo-payment-alert-banner" role="alert">
            <span className="alert-icon" aria-hidden="true">ℹ️</span>
            <div>
              <strong>Capstone Demonstration Payment Mode</strong>
              <p>
                This application is a demonstration capstone frontend. No real money or credit card
                is charged. Never enter sensitive real payment credentials.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitOrder} noValidate className="checkout-grid">
            {/* Left Column: Guest Details & Payment Method */}
            <div className="checkout-form-column">
              <div className="checkout-box">
                <h2>1. Customer Contact Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="checkout-name" className="form-label">
                      Full Name <span className="form-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-name"
                      name="fullName"
                      className={`form-control ${errors.fullName ? 'has-error' : ''}`}
                      placeholder="e.g. Jane Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && <p className="error-message">⚠ {errors.fullName}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkout-email" className="form-label">
                      Email Address <span className="form-required">*</span>
                    </label>
                    <input
                      type="email"
                      id="checkout-email"
                      name="email"
                      className={`form-control ${errors.email ? 'has-error' : ''}`}
                      placeholder="e.g. jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <p className="error-message">⚠ {errors.email}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkout-phone" className="form-label">
                      Phone Number <span className="form-required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="checkout-phone"
                      name="phone"
                      className={`form-control ${errors.phone ? 'has-error' : ''}`}
                      placeholder="e.g. (312) 555-0143"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && <p className="error-message">⚠ {errors.phone}</p>}
                  </div>

                  {savedPrefs.orderType === 'dine-in' && (
                    <div className="form-group">
                      <label htmlFor="checkout-table" className="form-label">
                        Reserved Table Number <small>(If known)</small>:
                      </label>
                      <input
                        type="text"
                        id="checkout-table"
                        name="tableNumber"
                        className="form-control"
                        placeholder="e.g. Table 12 or Patio"
                        value={formData.tableNumber}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="checkout-box" style={{ marginTop: '2rem' }}>
                <h2>2. Select Demonstration Payment Mode</h2>
                <div className="payment-options-grid">
                  <label className={`payment-option-card ${formData.paymentMethod === 'demo-card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="demo-card"
                      checked={formData.paymentMethod === 'demo-card'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon" aria-hidden="true">💳</span>
                    <strong>Demo Credit Card</strong>
                    <small>Simulated Visa / Mastercard (Demo 4242)</small>
                  </label>

                  <label className={`payment-option-card ${formData.paymentMethod === 'apple-pay-demo' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="apple-pay-demo"
                      checked={formData.paymentMethod === 'apple-pay-demo'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon" aria-hidden="true">📱</span>
                    <strong>Digital Wallet Demo</strong>
                    <small>Simulated Apple Pay / Google Pay</small>
                  </label>

                  <label className={`payment-option-card ${formData.paymentMethod === 'in-person' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="in-person"
                      checked={formData.paymentMethod === 'in-person'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon" aria-hidden="true">🏛️</span>
                    <strong>Pay at Restaurant</strong>
                    <small>Settle bill with server at table or counter</small>
                  </label>
                </div>

                {formData.paymentMethod === 'demo-card' && (
                  <div className="demo-card-inputs-box">
                    <div className="form-group">
                      <label className="form-label">Simulated Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.cardNumber}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="demo-card-row">
                      <div className="form-group">
                        <label className="form-label">Expiry</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.cardExp}
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Security CVC</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.cardCvc}
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Review & Submit */}
            <div className="checkout-summary-column">
              <div className="checkout-summary-card">
                <h3>Order Review</h3>

                <ul className="checkout-items-mini-list">
                  {cart.map(({ id, dish, quantity }) => (
                    <li key={id} className="mini-item-row">
                      <div>
                        <strong>{quantity} × {dish.name}</strong>
                        <span className="mini-item-category">{dish.category}</span>
                      </div>
                      <span className="mini-item-price">
                        {formatCurrency(dish.priceNumber * quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="checkout-price-totals">
                  <div className="cost-row">
                    <span>Items Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="cost-row">
                    <span>Sales Tax (8.25%):</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="cost-row total-row">
                    <strong>Total to Pay:</strong>
                    <strong>{formatCurrency(total)}</strong>
                  </div>
                </div>

                <div className="checkout-prep-summary">
                  <span>Dining Mode: <strong>{savedPrefs.orderType === 'dine-in' ? 'Table Dine-In' : 'Counter Takeout'}</strong></span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary place-order-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing Order...' : `Confirm & Place Order • ${formatCurrency(total)}`}
                </button>

                <p className="checkout-guarantee-note">
                  🔒 Coursera capstone simulation. Instant mock authorization without sensitive financial transactions.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
