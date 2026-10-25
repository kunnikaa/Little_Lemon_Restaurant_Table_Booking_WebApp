import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuItems';
import MenuCard from './MenuCard';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderToast, setOrderToast] = useState('');

  // Filter items based on active category and optional search query
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dietary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOrder = (dishName) => {
    setOrderToast(`"${dishName}" added to demonstration cart!`);
    setTimeout(() => setOrderToast(''), 3500);
  };

  return (
    <section id="menu" className="menu-section" aria-labelledby="menu-main-heading">
      <div className="container">
        {/* Section Heading */}
        <div className="menu-header">
          <span className="editorial-subtitle">TRADITIONAL MEDITERRANEAN CUISINE</span>
          <h2 id="menu-main-heading" className="section-title">
            Our Extensive Culinary Menu
          </h2>
          <p className="section-subtitle">
            Explore authentic flavors crafted from generational recipes. Filter by course or dietary preference.
          </p>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="menu-toolbar">
          {/* Category Tabs */}
          <div
            className="category-tabs"
            role="tablist"
            aria-label="Menu Course Categories"
          >
            {MENU_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                id={`tab-${category.toLowerCase()}`}
                aria-selected={activeCategory === category}
                aria-controls="menu-grid-panel"
                className={`category-tab-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input Filter */}
          <div className="menu-search-wrapper">
            <label htmlFor="menu-search" className="sr-only">
              Search Dishes
            </label>
            <input
              type="search"
              id="menu-search"
              placeholder="Search dishes, ingredients (e.g. lemon, feta)..."
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
        </div>

        {/* Live Filter Indicator */}
        <div className="menu-meta-status">
          <span>
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'} in{' '}
            <em>{activeCategory}</em>
          </span>
          {searchQuery && (
            <span>
              {' '}matching "<strong>{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* Toast feedback for ordering */}
        {orderToast && (
          <div
            role="status"
            aria-live="polite"
            className="live-toast-notification"
          >
            ✓ {orderToast} (Demonstration order preview)
          </div>
        )}

        {/* Menu Cards Grid */}
        <div
          id="menu-grid-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.toLowerCase()}`}
          className="menu-grid"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((dish) => (
              <MenuCard key={dish.id} dish={dish} onOrder={handleOrder} />
            ))
          ) : (
            <div className="menu-empty-state" role="status">
              <span className="empty-icon" aria-hidden="true">🍽️</span>
              <h3>No dishes found</h3>
              <p>We couldn't find any dishes matching your current selection.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
