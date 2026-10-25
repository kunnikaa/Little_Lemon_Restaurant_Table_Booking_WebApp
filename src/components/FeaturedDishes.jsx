import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuItems';

export default function FeaturedDishes({ onNavigateToMenu }) {
  const [notification, setNotification] = useState('');

  // Get the 4 highlighted featured dishes
  const featuredItems = MENU_ITEMS.filter((item) => item.featured).slice(0, 4);

  const handleOrder = (dishName) => {
    setNotification(`"${dishName}" added to demonstration order!`);
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <section id="featured" className="featured-section" aria-labelledby="featured-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="editorial-subtitle">CHEF ADRIAN & MARIO'S SELECTION</span>
            <h2 id="featured-heading" className="section-title">
              Signature Culinary Highlights
            </h2>
            <p className="section-subtitle">
              Each dish is prepared daily using cold-pressed Greek oils, organic herbs, and Mediterranean delicacies.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigateToMenu && onNavigateToMenu('menu')}
            aria-label="View our full online menu"
          >
            Explore Complete Menu (16 Dishes) →
          </button>
        </div>

        {/* Live Notification */}
        {notification && (
          <div
            role="status"
            aria-live="polite"
            className="live-toast-notification"
          >
            ✓ {notification} (Demonstration preview)
          </div>
        )}

        {/* Featured 4-card Grid */}
        <div className="featured-grid">
          {featuredItems.map((dish) => (
            <article key={dish.id} className="featured-card">
              <div className="featured-card-media">
                <img
                  src={dish.image}
                  alt={dish.alt}
                  className="featured-card-img"
                  width="400"
                  height="260"
                  loading="lazy"
                />
                <span className="featured-dietary-badge">{dish.dietary}</span>
              </div>
              <div className="featured-card-content">
                <div className="featured-card-meta">
                  <span className="featured-category">{dish.category}</span>
                  <span className="featured-price">{dish.price}</span>
                </div>
                <h3 className="featured-dish-name">{dish.name}</h3>
                <p className="featured-dish-desc">{dish.description}</p>
                <div className="featured-card-actions">
                  <button
                    type="button"
                    className="order-delivery-btn"
                    onClick={() => handleOrder(dish.name)}
                    aria-label={`Order delivery for ${dish.name}`}
                  >
                    Order a delivery <span aria-hidden="true">🛵</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
