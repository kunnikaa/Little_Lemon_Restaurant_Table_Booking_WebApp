import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../data/menuItems';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import FavoriteButton from '../components/FavoriteButton';

export default function DishDetails() {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  // Find dish by ID
  const dish = MENU_ITEMS.find((item) => item.id === dishId);

  if (!dish) {
    return (
      <div className="dish-details-page">
        <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
          <h2>Dish Not Found</h2>
          <p style={{ margin: '1rem 0 2rem 0', color: 'var(--color-warm-gray)' }}>
            We could not find the dish you were looking for.
          </p>
          <Link to="/menu" className="btn btn-primary">
            ← Back to Full Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    setToastMessage(`Added ${quantity} × "${dish.name}" to your pre-order cart!`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const totalPrice = dish.priceNumber * quantity;

  return (
    <div className="dish-details-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="details-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/menu">Menu</Link>
          <span>/</span>
          <Link to={`/menu?category=${encodeURIComponent(dish.category)}`}>{dish.category}</Link>
          <span>/</span>
          <strong aria-current="page">{dish.name}</strong>
        </nav>

        {/* Toast Alert */}
        {toastMessage && (
          <div role="status" aria-live="polite" className="live-toast-notification">
            ✓ {toastMessage}
          </div>
        )}

        {/* Dish Details Grid */}
        <div className="dish-details-grid">
          {/* Large Image Frame */}
          <div className="dish-details-media">
            <div className="dish-details-img-frame">
              <img
                src={dish.image}
                alt={dish.alt}
                className="dish-details-img"
                width="600"
                height="450"
              />
              <span className="dish-details-badge">{dish.dietary}</span>
            </div>
          </div>

          {/* Dish Information */}
          <div className="dish-details-info">
            <div className="dish-details-meta">
              <span className="dish-details-category">{dish.category}</span>
              <span className="dish-details-price">{dish.price}</span>
            </div>

            <div className="dish-details-title-row">
              <h1 className="dish-details-title">{dish.name}</h1>
              <FavoriteButton dishId={dish.id} dishName={dish.name} className="detail-favorite-btn" size={24} />
            </div>

            <p className="dish-details-full-desc">{dish.fullDescription}</p>

            {/* Quick Metrics */}
            <div className="dish-metrics-strip">
              <div className="metric-box">
                <span className="metric-label">Prep Time</span>
                <span className="metric-value">⏱ {dish.prepTime}</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Calories</span>
                <span className="metric-value">🔥 {dish.calories}</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Dietary</span>
                <span className="metric-value">🌱 {dish.dietary}</span>
              </div>
            </div>

            {/* Ingredients List */}
            <div className="dish-ingredients-box">
              <h3>Ingredients & Flavor Profile</h3>
              <ul className="ingredients-pills">
                {dish.ingredients.map((ing) => (
                  <li key={ing} className="ingredient-pill">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pre-Order Action Controls */}
            <div className="dish-order-actions-box">
              <div className="quantity-selector">
                <span className="quantity-label">Quantity:</span>
                <div className="quantity-controls">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-display" aria-label={`Selected quantity: ${quantity}`}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((prev) => Math.min(20, prev + 1))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="order-cta-row">
                <button
                  type="button"
                  className="btn btn-primary add-to-cart-large-btn"
                  onClick={handleAddToCart}
                >
                  Add to Pre-Order Cart • {formatCurrency(totalPrice)}
                </button>

                {cartCount > 0 && (
                  <Link to="/order" className="btn btn-secondary">
                    View Cart ({cartCount}) →
                  </Link>
                )}
              </div>
            </div>

            {/* Back link */}
            <div style={{ marginTop: '2rem' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/menu')}
              >
                ← Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
