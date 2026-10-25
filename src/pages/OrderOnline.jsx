import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export default function OrderOnline() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, tax, total, taxRate } = useCart();

  const [orderType, setOrderType] = useState('takeout'); // 'takeout' or 'dine-in'
  const [scheduledTime, setScheduledTime] = useState('asap');
  const [kitchenNotes, setKitchenNotes] = useState('');

  const handleProceedToCheckout = () => {
    // Save order preferences to sessionStorage for Checkout page
    sessionStorage.setItem(
      'little_lemon_order_prefs',
      JSON.stringify({
        orderType,
        scheduledTime,
        kitchenNotes,
      })
    );
    navigate('/checkout');
  };

  return (
    <div className="order-online-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="order-page-heading">
        <div className="container">
          <span className="editorial-subtitle">ONLINE PRE-ORDERS & TAKEOUT</span>
          <h1 id="order-page-heading" className="page-title">
            Your Mediterranean Food Order
          </h1>
          <p className="page-description">
            Pre-order your favorite Mediterranean dishes for kitchen pickup or to enjoy at your table
            during your reservation.
          </p>
        </div>
      </section>

      {/* Cart Content Section */}
      <section className="order-content-section">
        <div className="container">
          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="empty-cart-card">
              <span className="empty-cart-icon" aria-hidden="true">🛒</span>
              <h2>Your Pre-Order Cart is Empty</h2>
              <p>
                Discover our wood-fired pita, freshly cut pastas, grilled lamb chops, and authentic Amalfi
                lemon desserts.
              </p>
              <Link to="/menu" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Explore Menu & Add Dishes →
              </Link>
            </div>
          ) : (
            /* Active Cart & Order Layout */
            <div className="order-layout-grid">
              {/* Left Column: Cart Items Table */}
              <div className="order-items-column">
                <div className="order-card-header">
                  <h2>Selected Dishes ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)</h2>
                  <button
                    type="button"
                    className="clear-cart-text-btn"
                    onClick={clearCart}
                    aria-label="Remove all items from cart"
                  >
                    Clear All Items
                  </button>
                </div>

                <div className="cart-items-list">
                  {cart.map(({ id, dish, quantity }) => (
                    <div key={id} className="cart-item-row">
                      <img
                        src={dish.image}
                        alt={dish.alt}
                        className="cart-item-img"
                        width="100"
                        height="75"
                      />

                      <div className="cart-item-details">
                        <span className="cart-item-category">{dish.category}</span>
                        <h3 className="cart-item-name">{dish.name}</h3>
                        <span className="cart-item-unit-price">{dish.price} each</span>
                      </div>

                      <div className="cart-item-qty-actions">
                        <div className="quantity-controls mini">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(id, quantity - 1)}
                            aria-label={`Decrease quantity of ${dish.name}`}
                          >
                            −
                          </button>
                          <span className="qty-display">{quantity}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(id, quantity + 1)}
                            aria-label={`Increase quantity of ${dish.name}`}
                          >
                            +
                          </button>
                        </div>

                        <span className="cart-item-row-total">
                          {formatCurrency(dish.priceNumber * quantity)}
                        </span>

                        <button
                          type="button"
                          className="cart-item-delete-btn"
                          onClick={() => removeFromCart(id)}
                          aria-label={`Remove ${dish.name} from cart`}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Menu Link */}
                <div style={{ marginTop: '1.5rem' }}>
                  <Link to="/menu" className="btn btn-outline" style={{ fontSize: '0.95rem' }}>
                    + Add More Dishes from Menu
                  </Link>
                </div>
              </div>

              {/* Right Column: Dining Options & Order Summary */}
              <div className="order-summary-column">
                <div className="order-preferences-box">
                  <h3>Dining & Pickup Preference</h3>

                  {/* Order Type Toggle */}
                  <div className="order-type-toggle">
                    <label className={`toggle-option ${orderType === 'takeout' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="orderType"
                        value="takeout"
                        checked={orderType === 'takeout'}
                        onChange={(e) => setOrderType(e.target.value)}
                      />
                      <span className="toggle-icon" aria-hidden="true">🛍️</span>
                      <strong>Counter Takeout</strong>
                      <small>Pick up packaged to go</small>
                    </label>

                    <label className={`toggle-option ${orderType === 'dine-in' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="orderType"
                        value="dine-in"
                        checked={orderType === 'dine-in'}
                        onChange={(e) => setOrderType(e.target.value)}
                      />
                      <span className="toggle-icon" aria-hidden="true">🍽️</span>
                      <strong>Table Dine-In</strong>
                      <small>Serve at your reserved table</small>
                    </label>
                  </div>

                  {/* Scheduled Time */}
                  <div className="form-group" style={{ marginTop: '1.25rem' }}>
                    <label htmlFor="order-time-select" className="form-label">
                      Estimated Preparation Time:
                    </label>
                    <select
                      id="order-time-select"
                      className="form-control"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    >
                      <option value="asap">As Soon as Ready (approx. 20–30 mins)</option>
                      <option value="today-1800">Today at 6:00 PM</option>
                      <option value="today-1830">Today at 6:30 PM</option>
                      <option value="today-1900">Today at 7:00 PM</option>
                      <option value="today-1930">Today at 7:30 PM</option>
                      <option value="today-2000">Today at 8:00 PM</option>
                      <option value="today-2030">Today at 8:30 PM</option>
                    </select>
                  </div>

                  {/* Kitchen Special Requests */}
                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label htmlFor="kitchen-notes" className="form-label">
                      Special Kitchen Instructions <small>(Optional)</small>:
                    </label>
                    <textarea
                      id="kitchen-notes"
                      className="form-control"
                      rows="2"
                      placeholder="e.g. dressing on the side, extra lemons, gluten alert..."
                      value={kitchenNotes}
                      onChange={(e) => setKitchenNotes(e.target.value)}
                      maxLength={200}
                    />
                  </div>
                </div>

                {/* Price Summary Breakdown */}
                <div className="order-cost-breakdown-box">
                  <h3>Order Summary</h3>
                  <div className="cost-row">
                    <span>Items Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="cost-row">
                    <span>Estimated Tax ({(taxRate * 100).toFixed(2)}% Chicago):</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="cost-row total-row">
                    <strong>Total Amount:</strong>
                    <strong>{formatCurrency(total)}</strong>
                  </div>

                  <p className="demo-tax-note">
                    * Prices and sales tax are calculated for demonstration capstone preview.
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary proceed-checkout-btn"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout • {formatCurrency(total)}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
