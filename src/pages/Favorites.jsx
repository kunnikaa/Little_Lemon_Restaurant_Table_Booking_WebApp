import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../data/menuItems';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

export default function Favorites() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart, cartCount } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  // Retrieve full dish objects for all favorited IDs
  const favoritedDishes = MENU_ITEMS.filter((item) =>
    favorites.includes(Number(item.id))
  );

  const handleAddToCart = (dish) => {
    addToCart(dish, 1);
    setToastMessage(`Added "${dish.name}" to your pre-order cart!`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleRemove = (dishId, dishName) => {
    removeFromFavorites(dishId);
    setToastMessage(`Removed "${dishName}" from your favorites.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="favorites-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="favorites-page-heading">
        <div className="container">
          <span className="editorial-subtitle">CURATED BY YOU</span>
          <h1 id="favorites-page-heading" className="page-title">
            My Favorite Dishes
          </h1>
          <p className="page-description">
            Your personal collection of beloved Little Lemon recipes. Quickly re-order your favorites
            or explore their ingredients and culinary backstory.
          </p>

          {cartCount > 0 && (
            <div className="menu-cart-banner">
              <span>🛒 You have <strong>{cartCount}</strong> items in your pre-order cart.</span>
              <Link to="/order" className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.9rem' }}>
                View Cart & Checkout →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="favorites-page-content" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          {/* Toast Notification */}
          {toastMessage && (
            <div role="status" aria-live="polite" className="live-toast-notification">
              ✓ {toastMessage}
            </div>
          )}

          {favoritedDishes.length > 0 ? (
            <>
              <div className="favorites-toolbar">
                <span className="favorites-count-label">
                  You have saved <strong>{favoritedDishes.length}</strong> {favoritedDishes.length === 1 ? 'dish' : 'dishes'}
                </span>
                <button
                  type="button"
                  className="btn btn-outline favorites-clear-btn"
                  onClick={clearFavorites}
                >
                  Clear All Favorites
                </button>
              </div>

              <div className="menu-grid" id="favorites-grid">
                {favoritedDishes.map((dish) => (
                  <article key={dish.id} className="menu-card favorite-card">
                    <Link
                      to={`/menu/${dish.id}`}
                      className="menu-card-link-wrapper"
                      aria-label={`View details for ${dish.name}`}
                    >
                      <div className="menu-card-image-box">
                        <img
                          src={dish.image}
                          alt={dish.alt}
                          className="menu-card-img"
                          width="350"
                          height="210"
                          loading="lazy"
                        />
                        <span className="menu-dietary-tag">{dish.dietary}</span>
                      </div>

                      <div className="menu-card-info">
                        <div className="menu-card-header">
                          <span className="menu-item-category">{dish.category}</span>
                          <span className="menu-item-price">{dish.price}</span>
                        </div>
                        <h3 className="menu-item-name">{dish.name}</h3>
                        <p className="menu-item-desc">{dish.description}</p>
                      </div>
                    </Link>

                    {/* Actions: Add to Cart & Remove */}
                    <div className="menu-card-bottom-actions favorites-card-actions">
                      <button
                        type="button"
                        className="btn btn-primary add-to-cart-quick-btn"
                        onClick={() => handleAddToCart(dish)}
                      >
                        + Add to Cart
                      </button>
                      <button
                        type="button"
                        className="btn-remove-favorite"
                        onClick={() => handleRemove(dish.id, dish.name)}
                        aria-label={`Remove ${dish.name} from favorites`}
                      >
                        💔 Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="menu-empty-state favorites-empty-state" role="status">
              <span className="empty-icon" aria-hidden="true">❤️</span>
              <h2>No favorite dishes yet</h2>
              <p>
                Browse our Mediterranean menu and click the heart icon on any dish to save it
                here for quick access!
              </p>
              <Link to="/menu" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Explore Full Menu →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
