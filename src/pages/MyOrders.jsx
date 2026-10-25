import React from 'react';
import { Link } from 'react-router-dom';
import { getSavedOrders } from '../utils/orderStorage';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';

export default function MyOrders() {
  const orders = getSavedOrders();
  const { addToCart } = useCart();

  const handleReorder = (item) => {
    addToCart(item, item.quantity || 1);
  };

  return (
    <div className="orders-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="orders-page-heading">
        <div className="container">
          <span className="editorial-subtitle">CULINARY HISTORY</span>
          <h1 id="orders-page-heading" className="page-title">
            My Order History
          </h1>
          <p className="page-description">
            Review past pre-orders, takeaway confirmations, itemized dish breakdowns, and live preparation statuses.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="orders-page-content" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="history-header-bar">
            <div>
              <h2>Recent Pre-Orders & Takeaway</h2>
              <p className="history-subtext">
                All confirmed online pre-orders are tracked below with itemized receipts.
              </p>
            </div>
            <Link to="/order" className="btn btn-primary">
              + Start New Pre-Order
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <article key={order.orderId} className="order-history-card">
                  <div className="order-card-header">
                    <div className="order-meta-group">
                      <span className="order-ref-badge">{order.orderId}</span>
                      <span className="order-date-text">{order.displayDate || new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="order-status-group">
                      <span className="dining-mode-chip">{order.diningMode || 'Takeout & Pickup'}</span>
                      <span className={`status-pill status-${(order.status || 'confirmed').toLowerCase()}`}>
                        ● {order.status || 'Confirmed'}
                      </span>
                    </div>
                  </div>

                  <div className="order-items-table">
                    <div className="order-items-list">
                      {order.items &&
                        order.items.map((item, index) => (
                          <div key={index} className="order-item-row">
                            <div className="order-item-main">
                              <span className="order-item-qty">{item.quantity}×</span>
                              <strong className="order-item-name">{item.name}</strong>
                            </div>
                            <span className="order-item-price">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="order-card-footer">
                    <div className="order-financials">
                      <div className="financial-line">
                        <span>Subtotal:</span>
                        <strong>{formatCurrency(order.subtotal || 0)}</strong>
                      </div>
                      <div className="financial-line">
                        <span>Estimated Tax (8.25%):</span>
                        <span>{formatCurrency(order.tax || 0)}</span>
                      </div>
                      <div className="financial-line total-line">
                        <span>Total Paid (Demo Mode):</span>
                        <strong className="final-total-amount">{formatCurrency(order.total || 0)}</strong>
                      </div>
                    </div>

                    <div className="order-card-actions">
                      <Link to="/menu" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                        Browse Menu
                      </Link>
                      <Link to="/order" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                        Re-Order Dishes
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="menu-empty-state" role="status">
              <span className="empty-icon" aria-hidden="true">📦</span>
              <h2>No past orders yet</h2>
              <p>
                You haven't placed any food pre-orders yet. Browse our full Mediterranean menu
                to start your first pre-order!
              </p>
              <Link to="/menu" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Explore Menu & Order Online →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
