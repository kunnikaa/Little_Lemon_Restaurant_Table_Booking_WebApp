import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoriteButton({ dishId, dishName, className = '', size = 20 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(dishId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(dishId);
  };

  return (
    <button
      type="button"
      className={`favorite-heart-btn ${isFav ? 'is-favorited' : ''} ${className}`}
      onClick={handleClick}
      aria-label={isFav ? `Remove ${dishName} from favorites` : `Add ${dishName} to favorites`}
      aria-pressed={isFav}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isFav ? '#E63946' : 'none'}
        stroke={isFav ? '#E63946' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="heart-icon-svg"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
