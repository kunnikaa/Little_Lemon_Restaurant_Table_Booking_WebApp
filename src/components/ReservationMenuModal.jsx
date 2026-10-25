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
  const triggerRef = useRef(null);

  // Focus management and background lock
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
      aria-label="Choose Your Dishes - Browse Full Menu"
      aria-labelledby="res-menu-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="res-modal-window" ref={modalRef}>
        {/* Header */}
        <header className="res-modal-header">
          <div className="res-modal-header-main">
            <span className="res-modal-eyebrow">RESERVATION PRE-ORDER</span>
            <div className="res-modal-title-row">
              <h2 id="res-menu-modal-title" className="res-modal-heading">
                Choose Your Dishes
              </h2>
              {totalUnits > 0 && (
                <span className="res-modal-count-pill" aria-live="polite">
                  {totalUnits} {totalUnits === 1 ? 'Dish' : 'Dishes'} Selected
                </span>
              )}
            </div>
            <p className="res-modal-subtitle">
              Explore our menu and pre-order your favorites for your table.
            </p>
          </div>

          <button
            type="button"
            className="res-modal-close-btn"
            onClick={onClose}
            aria-label="Close menu modal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        {/* Search & Category Filter Toolbar */}
        <div className="res-modal-toolbar">
          {/* Search Field */}
          <div className="res-modal-search-box">
            <span className="res-search-icon" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="search"
              className="res-modal-search-input"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search dishes and ingredients"
            />
            {searchQuery && (
              <button
                type="button"
                className="res-search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                &times;
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="res-modal-categories-scroll" role="tablist" aria-label="Menu categories">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`res-filter-chip ${isActive ? 'active' : ''}`}
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
            <div className="res-dishes-grid">
              {filteredDishes.map((dish) => {
                const qty = selectedItems[dish.id] || 0;
                const isSelected = qty > 0;

                return (
                  <article
                    key={dish.id}
                    className={`res-food-card ${isSelected ? 'selected' : ''}`}
                    data-testid={`res-dish-${dish.id}`}
                  >
                    <div className="res-card-media">
                      <img
                        src={dish.image}
                        alt={dish.alt || dish.name}
                        className="res-card-img"
                        loading="lazy"
                      />
                      {dish.dietary && (
                        <span className="res-card-dietary-badge">
                          {dish.dietary}
                        </span>
                      )}
                      {isSelected && (
                        <span className="res-card-selected-badge" aria-label={`${qty} selected`}>
                          ✓ {qty} Added
                        </span>
                      )}
                    </div>

                    <div className="res-card-content">
                      <div className="res-card-header">
                        <span className="res-card-category">{dish.category}</span>
                        <span className="res-card-price">{dish.price}</span>
                      </div>
                      <h3 className="res-card-name">{dish.name}</h3>
                      <p className="res-card-desc">{dish.description}</p>

                      <div className="res-card-action-bar">
                        {isSelected ? (
                          <div
                            className="res-card-stepper"
                            role="group"
                            aria-label={`Quantity controls for ${dish.name}`}
                          >
                            <button
                              type="button"
                              className="res-stepper-btn"
                              onClick={() => onUpdateQuantity(dish.id, qty - 1)}
                              aria-label={`Decrease ${dish.name} quantity`}
                            >
                              &minus;
                            </button>
                            <span className="res-stepper-count" aria-live="polite">
                              {qty}
                            </span>
                            <button
                              type="button"
                              className="res-stepper-btn"
                              onClick={() => onUpdateQuantity(dish.id, qty + 1)}
                              aria-label={`Increase ${dish.name} quantity`}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              className="res-card-remove-btn"
                              onClick={() => onUpdateQuantity(dish.id, 0)}
                              aria-label={`Remove ${dish.name}`}
                              title="Remove item"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline res-card-add-btn"
                            onClick={() => onUpdateQuantity(dish.id, 1)}
                            aria-label={`Add ${dish.name} to table reservation`}
                          >
                            + Add to Pre-order
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
              <div className="res-empty-icon" aria-hidden="true">🍽️</div>
              <h3 className="res-empty-title">No dishes found</h3>
              <p className="res-empty-desc">
                Try another search or explore a different category.
              </p>
              <button
                type="button"
                className="btn btn-primary res-empty-reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Dishes');
                }}
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}
        </div>

        {/* Fixed Bottom Selection Summary */}
        <footer className="res-modal-footer">
          <div className="res-footer-summary">
            <span className="res-footer-label">Your pre-order</span>
            <div className="res-footer-metrics">
              <span className="res-footer-count">
                {totalUnits === 0
                  ? '0 items selected'
                  : `${totalUnits} ${totalUnits === 1 ? 'item' : 'items'} selected`}
              </span>
              <span className="res-footer-separator" aria-hidden="true">&bull;</span>
              <span className="res-footer-subtotal">
                Food Subtotal: <strong>{formatCurrency(totalSubtotal)}</strong>
              </span>
            </div>
          </div>

          <div className="res-footer-actions">
            {totalUnits === 0 && (
              <button
                type="button"
                className="res-footer-skip-btn"
                onClick={onClose}
              >
                Skip for Now
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary res-footer-done-btn"
              onClick={onClose}
              id="confirm-menu-selection-btn"
            >
              Done &amp; Return to Reservation {totalUnits > 0 ? `(${totalUnits})` : ''}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
