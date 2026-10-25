import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuItems';
import { formatCurrency } from '../utils/currency';

export default function ReservationMenuModal({
  isOpen,
  onClose,
  selectedItems = {},
  onUpdateQuantity,
}) {
  const [activeCategory, setActiveCategory] = useState('All Dishes');
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Filter dishes by active category and search query
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchesCategory =
        activeCategory === 'All Dishes' ||
        dish.category === activeCategory ||
        (activeCategory === 'Vegetarian & Vegan' &&
          (dish.dietary === 'Vegetarian' || dish.dietary === 'Vegan'));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        (dish.ingredients && dish.ingredients.some((ing) => ing.toLowerCase().includes(q))) ||
        (dish.dietary && dish.dietary.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Calculate total selected units and running subtotal
  const { totalUnits, totalSubtotal } = useMemo(() => {
    let units = 0;
    let subtotal = 0;
    Object.entries(selectedItems).forEach(([dishId, qty]) => {
      if (qty > 0) {
        const dish = MENU_ITEMS.find((d) => String(d.id) === String(dishId));
        if (dish) {
          units += qty;
          subtotal += dish.priceNumber * qty;
        }
      }
    });
    return { totalUnits: units, totalSubtotal: subtotal };
  }, [selectedItems]);

  if (!isOpen) return null;

  return (
    <div
      className="res-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="res-menu-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="res-modal-window" ref={modalRef}>
        {/* Modal Header */}
        <div className="res-modal-header">
          <div className="res-modal-title-box">
            <span className="editorial-subtitle">RESERVATION DINE-IN PRE-ORDER</span>
            <h2 id="res-menu-modal-title" className="res-modal-heading">
              Browse Full Menu & Select Dishes
            </h2>
            <p className="res-modal-subtext">
              Choose from all 20 authentic Mediterranean dishes. Pre-ordered dishes will be prepared fresh
              for your table when you arrive.
            </p>
          </div>
          <button
            type="button"
            className="res-modal-close-btn"
            onClick={onClose}
            aria-label="Close menu selection modal"
          >
            ✕
          </button>
        </div>

        {/* Search Bar & Category Navigation */}
        <div className="res-modal-filter-bar">
          <div className="res-modal-search-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="res-modal-search-input"
              placeholder="Search dishes, ingredients (e.g. prawns, calamari, hummus)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search restaurant menu for table pre-order"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="res-modal-category-tabs" role="tablist" aria-label="Menu categories">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`res-cat-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Dishes Grid */}
        <div className="res-modal-body">
          {filteredDishes.length > 0 ? (
            <div className="res-modal-dishes-grid">
              {filteredDishes.map((dish) => {
                const qty = selectedItems[dish.id] || 0;
                const isSelected = qty > 0;

                return (
                  <article
                    key={dish.id}
                    className={`res-dish-card ${isSelected ? 'is-selected' : ''}`}
                  >
                    <div className="res-dish-image-box">
                      <img
                        src={dish.image}
                        alt={dish.alt || dish.name}
                        className="res-dish-img"
                        width="260"
                        height="160"
                        loading="lazy"
                      />
                      {dish.dietary && (
                        <span className="res-dish-dietary-badge">{dish.dietary}</span>
                      )}
                      {isSelected && (
                        <span className="res-dish-added-indicator" aria-label={`${qty} in pre-order`}>
                          ✓ {qty} Added
                        </span>
                      )}
                    </div>

                    <div className="res-dish-content">
                      <div className="res-dish-meta-row">
                        <span className="res-dish-category">{dish.category}</span>
                        <strong className="res-dish-price">{dish.price}</strong>
                      </div>
                      <h3 className="res-dish-name">{dish.name}</h3>
                      <p className="res-dish-desc">{dish.description}</p>

                      <div className="res-dish-controls">
                        {isSelected ? (
                          <div className="res-dish-stepper">
                            <button
                              type="button"
                              className="stepper-btn"
                              onClick={() => onUpdateQuantity(dish.id, qty - 1)}
                              aria-label={`Decrease ${dish.name} quantity`}
                            >
                              −
                            </button>
                            <span className="stepper-count" aria-live="polite">
                              {qty}
                            </span>
                            <button
                              type="button"
                              className="stepper-btn"
                              onClick={() => onUpdateQuantity(dish.id, qty + 1)}
                              aria-label={`Increase ${dish.name} quantity`}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline res-dish-add-btn"
                            onClick={() => onUpdateQuantity(dish.id, 1)}
                            aria-label={`Add ${dish.name} to table reservation`}
                          >
                            + Add to Pre-Order
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="res-modal-empty-state">
              <span className="empty-icon" aria-hidden="true">🍽️</span>
              <h3>No dishes match your search</h3>
              <p>Try searching for a different term or select "All Dishes".</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Dishes');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer with Summary */}
        <div className="res-modal-footer">
          <div className="res-modal-footer-summary">
            <span className="res-summary-count">
              <strong>{totalUnits}</strong> {totalUnits === 1 ? 'dish' : 'dishes'} selected for table
            </span>
            <span className="res-summary-subtotal">
              Subtotal: <strong>{formatCurrency(totalSubtotal)}</strong>
            </span>
          </div>

          <div className="res-modal-footer-actions">
            <button
              type="button"
              className="btn btn-primary res-modal-done-btn"
              onClick={onClose}
              id="confirm-menu-selection-btn"
            >
              Done & Return to Reservation ({totalUnits} Items)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
