import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../data/menuItems';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import FavoriteButton from '../components/FavoriteButton';

export default function Favorites() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart, cartCount } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  // Retrieve full dish objects for all favorited string IDs
  const favoritedDishes = MENU_ITEMS.filter((item) =>
    favorites.includes(String(item.id))
  );

  const handleAddToCart = (dish) => {
    addToCart(dish, 1);
    setToastMessage(`Added "${dish.name}" to your pre-order cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRemove = (dishId, dishName) => {
    removeFromFavorites(dishId);
    setToastMessage(`Removed "${dishName}" from your favorites.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="favorites-page">
      {/* Compact Editorial Page Header */}
      <section className="favorites-hero-header" aria-labelledby="favorites-page-heading">
        <div className="container">
          <span className="editorial-subtitle">YOUR COLLECTION</span>
          <h1 id="favorites-page-heading" className="favorites-title">
            My Favorite Dishes
          </h1>
          <p className="favorites-subtitle">
            Your saved Mediterranean dishes for fast re-ordering, catering, and personalized dining.
          </p>

          {cartCount > 0 && (
            <div className="favorites-cart-quickbar">
              <span>🛒 You have <strong>{cartCount}</strong> items in your pre-order cart.</span>
              <Link to="/order" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.88rem' }}>
                View Cart →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="favorites-content-section">
        <div className="container">
          {/* Toast Notification */}
          {toastMessage && (
            <div role="status" aria-live="polite" className="live-toast-notification">
              ✓ {toastMessage}
            </div>
          )}

          {favoritedDishes.length > 0 ? (
            <>
              <div className="favorites-toolbar-row">
                <span className="favorites-count-indicator">
                  Showing <strong>{favoritedDishes.length}</strong> {favoritedDishes.length === 1 ? 'saved dish' : 'saved dishes'}
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
                    <div className="featured-card-media-wrapper">
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
                      </Link>
                      <FavoriteButton dishId={dish.id} dishName={dish.name} className="card-favorite-top-btn" />
                    </div>

                    <div className="menu-card-info">
                      <div className="menu-card-header">
                        <span className="menu-item-category">{dish.category}</span>
                        <span className="menu-item-price">{dish.price}</span>
                      </div>
                      <h3 className="menu-item-name">
                        <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
                      </h3>
                      <p className="menu-item-desc">{dish.description}</p>
                    </div>

                    {/* Actions: Add to Cart & Remove */}
                    <div className="menu-card-bottom-actions favorites-card-actions">
                      <button
                        type="button"
                        className="btn btn-primary add-to-cart-quick-btn"
                        onClick={() => handleAddToCart(dish)}
                        aria-label={`Add ${dish.name} to cart`}
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
            <div className="favorites-refined-empty-card" role="status">
              <div className="empty-heart-emblem" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#495E57" strokeWidth="1.75">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h2 className="empty-heading">No favorite dishes yet</h2>
              <p className="empty-body">
                Browse our Mediterranean menu and click the heart icon on any dish to save it
                here for fast, personalized access!
              </p>
              <Link to="/menu" className="btn btn-primary empty-menu-cta">
                Explore Full Menu →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
