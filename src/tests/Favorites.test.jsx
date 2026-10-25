import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider, useFavorites } from '../context/FavoritesContext';
import { CartProvider } from '../context/CartContext';
import Favorites from '../pages/Favorites';
import FavoriteButton from '../components/FavoriteButton';

function TestFavoritesConsumer() {
  const { favorites, favoritesCount, toggleFavorite, isFavorite, removeFromFavorites, clearFavorites } = useFavorites();
  return (
    <div>
      <span data-testid="count">{favoritesCount}</span>
      <span data-testid="is-fav-1">{isFavorite(1) ? 'yes' : 'no'}</span>
      <button onClick={() => toggleFavorite(1)}>Toggle 1</button>
      <button onClick={() => removeFromFavorites(1)}>Remove 1</button>
      <button onClick={clearFavorites}>Clear All</button>
    </div>
  );
}

describe('Favorites Feature & Context', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('manages favorites additions, toggles, removals, and persistence', async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <TestFavoritesConsumer />
      </FavoritesProvider>
    );

    // Initial default favorites contains items 1 and 2
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('yes');

    // Remove item 1
    await user.click(screen.getByRole('button', { name: 'Remove 1' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('no');

    // Toggle item 1 back
    await user.click(screen.getByRole('button', { name: 'Toggle 1' }));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('yes');

    // Clear all
    await user.click(screen.getByRole('button', { name: 'Clear All' }));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('toggles favorite button with accessible aria attributes', async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <FavoriteButton dishId={4} dishName="Mediterranean Pasta" />
      </FavoritesProvider>
    );

    const heartBtn = screen.getByRole('button', { name: /Add Mediterranean Pasta to favorites/i });
    expect(heartBtn).toBeInTheDocument();
    expect(heartBtn).toHaveAttribute('aria-pressed', 'false');

    // Click to add
    await user.click(heartBtn);
    expect(screen.getByRole('button', { name: /Remove Mediterranean Pasta from favorites/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('renders Favorites page and handles empty state', () => {
    localStorage.setItem('little_lemon_favorites', JSON.stringify([]));

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <CartProvider>
            <Favorites />
          </CartProvider>
        </FavoritesProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /My Favorite Dishes/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /No favorite dishes yet/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Full Menu →/i })).toBeInTheDocument();
  });
});
