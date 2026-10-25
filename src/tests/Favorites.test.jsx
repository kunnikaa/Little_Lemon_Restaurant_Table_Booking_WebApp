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
      <span data-testid="is-fav-bruschetta">{isFavorite('bruschetta-al-pomodoro') ? 'yes' : 'no'}</span>
      <span data-testid="is-fav-salad">{isFavorite('greek-salad') ? 'yes' : 'no'}</span>
      <button onClick={() => toggleFavorite('bruschetta-al-pomodoro')}>Toggle Bruschetta</button>
      <button onClick={() => toggleFavorite('greek-salad')}>Toggle Salad</button>
      <button onClick={() => removeFromFavorites('bruschetta-al-pomodoro')}>Remove Bruschetta</button>
      <button onClick={clearFavorites}>Clear All</button>
    </div>
  );
}

describe('Favorites Feature & Context', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initially has no favorites and toggles string IDs independently without cross-affecting other dishes', async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <TestFavoritesConsumer />
      </FavoritesProvider>
    );

    // Initial state: 0 favorites
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-fav-bruschetta')).toHaveTextContent('no');
    expect(screen.getByTestId('is-fav-salad')).toHaveTextContent('no');

    // Toggle Bruschetta only
    await user.click(screen.getByRole('button', { name: 'Toggle Bruschetta' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-fav-bruschetta')).toHaveTextContent('yes');
    expect(screen.getByTestId('is-fav-salad')).toHaveTextContent('no'); // Salad must remain unaffected

    // Toggle Salad as well
    await user.click(screen.getByRole('button', { name: 'Toggle Salad' }));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('is-fav-bruschetta')).toHaveTextContent('yes');
    expect(screen.getByTestId('is-fav-salad')).toHaveTextContent('yes');

    // Remove Bruschetta only
    await user.click(screen.getByRole('button', { name: 'Remove Bruschetta' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-fav-bruschetta')).toHaveTextContent('no');
    expect(screen.getByTestId('is-fav-salad')).toHaveTextContent('yes'); // Salad must remain favorited

    // Clear all
    await user.click(screen.getByRole('button', { name: 'Clear All' }));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-fav-bruschetta')).toHaveTextContent('no');
    expect(screen.getByTestId('is-fav-salad')).toHaveTextContent('no');
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
