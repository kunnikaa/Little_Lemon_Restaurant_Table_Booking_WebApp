import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../data/menuItems';
import { useCart } from '../context/CartContext';

export default function FeaturedDishes() {
  const [notification, setNotification] = useState('');
  const { addToCart } = useCart();

  const featuredItems = MENU_ITEMS.filter((item) => item.featured).slice(0, 4);

  const handleOrder = (dish) => {
    addToCart(dish, 1);
    setNotification(`Added "${dish.name}" to your pre-order cart!`);
    setTimeout(() => setNotification(''), 3500);
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
          <Link
            to="/menu"
            className="btn btn-secondary"
            aria-label="View our full online menu"
          >
            Explore Complete Menu ({MENU_ITEMS.length} Dishes) →
          </Link>
        </div>

        {/* Live Notification */}
        {notification && (
          <div
            role="status"
            aria-live="polite"
            className="live-toast-notification"
          >
            ✓ {notification}
          </div>
        )}

        {/* Featured 4-card Grid */}
        <div className="featured-grid">
          {featuredItems.map((dish) => (
            <article key={dish.id} className="featured-card">
              <Link to={`/menu/${dish.id}`} className="featured-card-media" aria-label={`View details for ${dish.name}`}>
                <img
                  src={dish.image}
                  alt={dish.alt}
                  className="featured-card-img"
                  width="400"
                  height="260"
                  loading="lazy"
                />
                <span className="featured-dietary-badge">{dish.dietary}</span>
              </Link>
              <div className="featured-card-content">
                <div className="featured-card-meta">
                  <span className="featured-category">{dish.category}</span>
                  <span className="featured-price">{dish.price}</span>
                </div>
                <h3 className="featured-dish-name">
                  <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
                </h3>
                <p className="featured-dish-desc">{dish.description}</p>
                <div className="featured-card-actions">
                  <Link to={`/menu/${dish.id}`} className="view-details-link">
                    Details →
                  </Link>
                  <button
                    type="button"
                    className="order-delivery-btn"
                    onClick={() => handleOrder(dish)}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    + Add to Cart 🛒
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
