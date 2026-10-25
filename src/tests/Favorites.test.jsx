import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider, useFavorites } from '../context/FavoritesContext';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import Favorites from '../pages/Favorites';
import FavoriteButton from '../components/FavoriteButton';

function TestFavoritesConsumer() {
  const { favorites, favoritesCount, toggleFavorite, isFavorite, removeFromFavorites, clearFavorites } = useFavorites();
  return (
    <div>
      <span data-testid="count">{favoritesCount}</span>
      <span data-testid="is-fav-bruschetta">{isFavorite('bruschetta-al-pomodoro') ? 'yes' : 'no'}</span>
      <span data-testid="is-fav-salad">{isFavorite('classic-greek-salad') ? 'yes' : 'no'}</span>
      <button onClick={() => toggleFavorite('bruschetta-al-pomodoro')}>Toggle Bruschetta</button>
      <button onClick={() => toggleFavorite('classic-greek-salad')}>Toggle Salad</button>
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
        <FavoriteButton dishId="amalfi-lemon-prawn-linguine" dishName="Amalfi Lemon & Garlic Prawn Linguine" />
      </FavoritesProvider>
    );

    const heartBtn = screen.getByRole('button', { name: /Add Amalfi Lemon & Garlic Prawn Linguine to favorites/i });
    expect(heartBtn).toBeInTheDocument();
    expect(heartBtn).toHaveAttribute('aria-pressed', 'false');

    // Click to add
    await user.click(heartBtn);
    expect(screen.getByRole('button', { name: /Remove Amalfi Lemon & Garlic Prawn Linguine from favorites/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('safely handles and prunes legacy/stale IDs so empty favorites produces count 0 and no profile badge', () => {
    // Seed legacy invalid IDs e.g. [1, 2] from old code
    localStorage.setItem('little_lemon_favorites', JSON.stringify([1, 2, 'invalid-id-xyz']));

    render(
      <FavoritesProvider>
        <TestFavoritesConsumer />
      </FavoritesProvider>
    );

    // Stale numbers are pruned against VALID_DISH_IDS: count is strictly 0!
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('renders Favorites page and handles empty state with correct copy and CTA', () => {
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
    expect(screen.getByText(/Explore our menu and save your favorite dishes for quick access/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Menu →/i })).toBeInTheDocument();
  });

  it('updates Profile dropdown badge dynamically: hidden on 0, shows 1, shows 2, and hides on unlike', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header />
              <TestFavoritesConsumer />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const profileBtn = screen.getByRole('button', { name: /User account menu/i });

    // Initial state: open dropdown and confirm no badge is present
    await user.click(profileBtn);
    let dropdownMenu = screen.getByRole('menu');
    let favItem = within(dropdownMenu).getByRole('menuitem', { name: /My Favorites/i });
    expect(within(favItem).queryByText(/[0-9]+/)).not.toBeInTheDocument();
    await user.click(profileBtn); // close dropdown

    // Like 1 dish
    await user.click(screen.getByRole('button', { name: 'Toggle Bruschetta' }));
    await user.click(profileBtn); // open dropdown
    dropdownMenu = screen.getByRole('menu');
    favItem = within(dropdownMenu).getByRole('menuitem', { name: /My Favorites/i });
    expect(within(favItem).getByText('1')).toBeInTheDocument();
    await user.click(profileBtn); // close dropdown

    // Like 2nd dish
    await user.click(screen.getByRole('button', { name: 'Toggle Salad' }));
    await user.click(profileBtn); // open dropdown
    dropdownMenu = screen.getByRole('menu');
    favItem = within(dropdownMenu).getByRole('menuitem', { name: /My Favorites/i });
    expect(within(favItem).getByText('2')).toBeInTheDocument();
    await user.click(profileBtn); // close dropdown

    // Unlike 1 dish
    await user.click(screen.getByRole('button', { name: 'Remove Bruschetta' }));
    await user.click(profileBtn); // open dropdown
    dropdownMenu = screen.getByRole('menu');
    favItem = within(dropdownMenu).getByRole('menuitem', { name: /My Favorites/i });
    expect(within(favItem).getByText('1')).toBeInTheDocument();
    await user.click(profileBtn); // close dropdown

    // Unlike last dish
    await user.click(screen.getByRole('button', { name: 'Clear All' }));
    await user.click(profileBtn); // open dropdown
    dropdownMenu = screen.getByRole('menu');
    favItem = within(dropdownMenu).getByRole('menuitem', { name: /My Favorites/i });
    expect(within(favItem).queryByText(/[0-9]+/)).not.toBeInTheDocument();
  });
});
