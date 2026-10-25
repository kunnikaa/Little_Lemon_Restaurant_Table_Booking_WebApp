import React from 'react';

export default function MenuCard({ dish, onOrder }) {
  const { name, category, price, description, image, alt, dietary } = dish;

  return (
    <article className="menu-card" data-category={category}>
      <div className="menu-card-image-box">
        <img
          src={image}
          alt={alt}
          className="menu-card-img"
          width="350"
          height="200"
          loading="lazy"
        />
        {dietary && <span className="menu-dietary-tag">{dietary}</span>}
      </div>

      <div className="menu-card-info">
        <div className="menu-card-header">
          <span className="menu-item-category">{category}</span>
          <span className="menu-item-price">{price}</span>
        </div>
        <h3 className="menu-item-name">{name}</h3>
        <p className="menu-item-desc">{description}</p>
        <button
          type="button"
          className="menu-card-order-link"
          onClick={() => onOrder && onOrder(name)}
          aria-label={`Order ${name} for delivery`}
        >
          Order a delivery <span aria-hidden="true">🛵</span>
        </button>
      </div>
    </article>
  );
}
