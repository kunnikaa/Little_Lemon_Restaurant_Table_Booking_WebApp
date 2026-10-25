import React, { useState } from 'react';

const SPECIALS_DATA = [
  {
    id: 'greek-salad',
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'The famous Greek salad of crispy romaine lettuce, kalamata olives, vine-ripened tomatoes, sliced cucumbers, and Chicago-style authentic feta cheese, dusted with oregano and drizzled with cold-pressed olive oil.',
    image: '/images/greek-salad.jpg',
    alt: 'Authentic Greek salad with block of seasoned feta cheese, kalamata olives, and fresh vegetables',
    tag: 'Vegetarian',
  },
  {
    id: 'bruschetta',
    title: 'Bruschetta',
    price: '$7.99',
    description:
      'Our signature Bruschetta is crafted from grilled artisan sourdough bread rubbed with fresh garlic, topped with marinated diced Roma tomatoes, fragrant fresh basil ribbons, and aged balsamic glaze.',
    image: '/images/bruschetta.jpg',
    alt: 'Crispy sourdough bruschetta with marinated diced tomatoes and fresh basil on a slate board',
    tag: 'Popular',
  },
  {
    id: 'lemon-dessert',
    title: 'Lemon Dessert',
    price: '$6.50',
    description:
      'Straight from grandmother’s secret recipe book. Made with fresh Amalfi coast lemons, fluffy ricotta cake, luscious lemon curd, powdered sugar dusting, and a crystallized lemon wheel garnish.',
    image: '/images/lemon-dessert.jpg',
    alt: 'Slice of authentic lemon dessert cake with candied lemon garnish and fresh mint',
    tag: "Chef's Special",
  },
];

export default function MenuHighlights() {
  const [deliveryNotification, setDeliveryNotification] = useState('');

  const handleDeliveryOrder = (dishTitle) => {
    setDeliveryNotification(`Added "${dishTitle}" to your demo cart!`);
    setTimeout(() => {
      setDeliveryNotification('');
    }, 4000);
  };

  return (
    <section id="menu" className="specials-section" aria-labelledby="specials-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 id="specials-heading" className="section-title">
              This Week’s Specials!
            </h2>
            <p className="section-subtitle">
              Hand-crafted daily with locally sourced organic produce and imported Mediterranean delicacies.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleDeliveryOrder('Full Online Tasting Menu')}
            aria-label="View our full online menu"
          >
            Online Menu
          </button>
        </div>

        {/* Live Notification banner for order interaction */}
        {deliveryNotification && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
              fontWeight: '600',
              border: '1px solid var(--color-success-border)',
            }}
          >
            ✓ {deliveryNotification} (Demonstration order preview)
          </div>
        )}

        {/* Specials Cards Grid */}
        <div className="specials-grid">
          {SPECIALS_DATA.map((dish) => (
            <article key={dish.id} className="special-card">
              <img
                src={dish.image}
                alt={dish.alt}
                className="special-card-image"
                width="400"
                height="220"
                loading="lazy"
              />
              <div className="special-card-body">
                <div className="special-card-top">
                  <h3 className="special-dish-title">{dish.title}</h3>
                  <span className="special-dish-price">{dish.price}</span>
                </div>
                <p className="special-dish-desc">{dish.description}</p>
                <button
                  type="button"
                  className="special-order-action"
                  onClick={() => handleDeliveryOrder(dish.title)}
                  aria-label={`Order delivery for ${dish.title}`}
                >
                  Order a delivery <span aria-hidden="true">🛵</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
