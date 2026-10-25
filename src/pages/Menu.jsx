import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuItems';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All Dishes');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [toastMessage, setToastMessage] = useState('');
  const { addToCart, cartCount } = useCart();

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let items = MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All Dishes' ||
        item.category.toLowerCase() === activeCategory.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.dietary.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (sortBy === 'price-low') {
      items.sort((a, b) => a.priceNumber - b.priceNumber);
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.priceNumber - a.priceNumber);
    } else if (sortBy === 'name-asc') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (e, dish) => {
    e.preventDefault();
    addToCart(dish, 1);
    setToastMessage(`Added "${dish.name}" to your pre-order cart!`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div className="menu-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="menu-page-heading">
        <div className="container">
          <span className="editorial-subtitle">CHEF ADRIAN & MARIO'S KITCHEN</span>
          <h1 id="menu-page-heading" className="page-title">
            Our Full Mediterranean Menu
          </h1>
          <p className="page-description">
            Every dish is made to order using imported Kalamata olive oils, vine-ripened tomatoes,
            fragrant Amalfi coast citrus, and fresh seaside herbs.
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

      {/* Main Menu Container */}
      <section className="menu-page-content">
        <div className="container">
          {/* Toolbar: Category Tabs, Search & Sort */}
          <div className="menu-toolbar-full">
            {/* Category Filter Tabs */}
            <div
              className="category-tabs"
              role="tablist"
              aria-label="Filter menu by course"
            >
              {MENU_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`tab-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  aria-selected={activeCategory === category}
                  className={`category-tab-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search and Sort Controls */}
            <div className="menu-controls-row">
              <div className="menu-search-wrapper" style={{ margin: 0, maxWidth: '380px' }}>
                <label htmlFor="full-menu-search" className="sr-only">
                  Search dishes by ingredient or title
                </label>
                <input
                  type="search"
                  id="full-menu-search"
                  placeholder="Search dishes or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="menu-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="menu-sort-wrapper">
                <label htmlFor="menu-sort-select" className="sort-label">
                  Sort by:
                </label>
                <select
                  id="menu-sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Chef Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Alphabetical: A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div
              role="status"
              aria-live="polite"
              className="live-toast-notification"
            >
              ✓ {toastMessage}
            </div>
          )}

          {/* Results Summary */}
          <div className="menu-meta-status" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span>
              Showing <strong>{filteredAndSortedItems.length}</strong> {filteredAndSortedItems.length === 1 ? 'dish' : 'dishes'} in{' '}
              <em>{activeCategory}</em>
            </span>
            {searchQuery && (
              <span>
                {' '}matching "<strong>{searchQuery}</strong>"
              </span>
            )}
          </div>

          {/* Dish Grid */}
          <div className="menu-grid" id="full-menu-grid">
            {filteredAndSortedItems.length > 0 ? (
              filteredAndSortedItems.map((dish) => (
                <article key={dish.id} className="menu-card full-menu-card">
                  <Link to={`/menu/${dish.id}`} className="menu-card-link-wrapper" aria-label={`View details for ${dish.name}`}>
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

                  {/* Card Actions: View Details & Add to Cart */}
                  <div className="menu-card-bottom-actions">
                    <Link to={`/menu/${dish.id}`} className="view-details-link">
                      View Details →
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary add-to-cart-quick-btn"
                      onClick={(e) => handleAddToCart(e, dish)}
                    >
                      + Add to Cart
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="menu-empty-state" role="status">
                <span className="empty-icon" aria-hidden="true">🍽️</span>
                <h3>No dishes matched your filters</h3>
                <p>Try searching for another dish or selecting a different course category.</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setActiveCategory('All Dishes');
                    setSearchQuery('');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
