import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  // If directly navigated without an active order, redirect to menu
  if (!order) {
    return <Navigate to="/menu" replace />;
  }

  const {
    orderId,
    items = [],
    subtotal = 0,
    tax = 0,
    total = 0,
    customer = {},
    preferences = {},
    paymentMethod,
    paymentStatus,
    timestamp,
  } = order;

  const paymentLabels = {
    'demo-card': 'Simulated Credit Card (Visa/Mastercard)',
    'apple-pay-demo': 'Simulated Digital Wallet (Apple/Google Pay)',
    'in-person': 'Pay at Restaurant Counter / Table',
  };

  return (
    <div className="order-confirmation-page">
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="order-confirmation-card">
          {/* Success Badge */}
          <div className="confirmation-badge-success" aria-hidden="true">
            ✓
          </div>

          <span className="editorial-subtitle" style={{ textAlign: 'center', display: 'block' }}>
            ORDER RECEIVED
          </span>
          <h1 className="confirmation-title">Thank You, {customer.fullName}!</h1>
          <p className="confirmation-subtitle">
            Your demonstration Mediterranean order has been placed successfully.
          </p>

          {/* Reference & Status Header */}
          <div className="order-receipt-header">
            <div>
              <span className="receipt-label">Order Reference</span>
              <strong className="receipt-ref-id">{orderId}</strong>
            </div>
            <div>
              <span className="receipt-label">Status</span>
              <span className="receipt-status-badge">✓ {paymentStatus}</span>
            </div>
            <div>
              <span className="receipt-label">Order Date & Time</span>
              <span>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(timestamp).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Itemized Order Table */}
          <div className="order-receipt-body">
            <h3>Ordered Items</h3>
            <div className="receipt-items-table">
              {items.map(({ id, dish, quantity }) => (
                <div key={id} className="receipt-item-row">
                  <div className="receipt-item-info">
                    <strong>{quantity} × {dish.name}</strong>
                    <span className="receipt-item-cat">{dish.category} • {dish.price} each</span>
                  </div>
                  <span className="receipt-item-subtotal">
                    {formatCurrency(dish.priceNumber * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="receipt-totals-box">
              <div className="receipt-cost-line">
                <span>Items Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="receipt-cost-line">
                <span>Sales Tax (8.25%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="receipt-cost-line final-total">
                <strong>Grand Total:</strong>
                <strong>{formatCurrency(total)}</strong>
              </div>
            </div>

            {/* Guest & Pickup Details */}
            <div className="receipt-customer-details-grid">
              <div>
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> {customer.fullName}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                {customer.tableNumber && <p><strong>Table:</strong> {customer.tableNumber}</p>}
              </div>

              <div>
                <h4>Dining & Fulfillment</h4>
                <p>
                  <strong>Service Type:</strong>{' '}
                  {preferences.orderType === 'dine-in' ? 'Table Dine-In' : 'Counter Takeout'}
                </p>
                <p>
                  <strong>Preparation:</strong>{' '}
                  {preferences.scheduledTime === 'asap'
                    ? 'As soon as possible (20–30 mins)'
                    : preferences.scheduledTime}
                </p>
                <p><strong>Payment Method:</strong> {paymentLabels[paymentMethod] || paymentMethod}</p>
              </div>
            </div>

            {preferences.kitchenNotes && (
              <div className="receipt-notes-box">
                <strong>Special Kitchen Instructions:</strong>
                <p>"{preferences.kitchenNotes}"</p>
              </div>
            )}
          </div>

          {/* Educational Disclaimer */}
          <p className="order-demo-notice">
            ℹ <strong>Coursera Capstone Demonstration Notice:</strong> This order receipt is an educational simulation.
            No live financial charges were processed, and no food will actually be prepared.
          </p>

          {/* Action CTAs */}
          <div className="confirmation-actions" style={{ marginTop: '2.5rem' }}>
            <Link to="/menu" className="btn btn-primary">
              Explore More Dishes
            </Link>
            <Link to="/" className="btn btn-outline">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
