import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import Menu from '../pages/Menu';

function renderMenuPage() {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <CartProvider>
          <Menu />
        </CartProvider>
      </FavoritesProvider>
    </MemoryRouter>
  );
}

describe('Full Menu Page Component', () => {
  it('renders menu heading, category tabs, and search input', () => {
    renderMenuPage();

    expect(screen.getByRole('heading', { name: /Our Full Mediterranean Menu/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'All Dishes' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Starters' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Pasta' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Main Courses' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Desserts' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search dishes or ingredients/i)).toBeInTheDocument();
  });

  it('filters dishes when selecting a category tab', async () => {
    const user = userEvent.setup();
    renderMenuPage();

    const pastaTab = screen.getByRole('tab', { name: 'Pasta' });
    await user.click(pastaTab);

    expect(pastaTab).toHaveClass('active');
    expect(screen.getByText(/Amalfi Lemon & Garlic Prawn Linguine/i)).toBeInTheDocument();
    expect(screen.queryByText(/Santorini Mezze Platter/i)).not.toBeInTheDocument();
  });

  it('filters dishes dynamically when typing in search input', async () => {
    const user = userEvent.setup();
    renderMenuPage();

    const searchInput = screen.getByPlaceholderText(/Search dishes or ingredients/i);
    await user.type(searchInput, 'baklava');

    expect(screen.getByText(/Pistachio & Walnut Baklava/i)).toBeInTheDocument();
    expect(screen.queryByText(/Classic Greek Village Salad/i)).not.toBeInTheDocument();
  });

  it('shows empty state when no items match and allows filter reset', async () => {
    const user = userEvent.setup();
    renderMenuPage();

    const searchInput = screen.getByPlaceholderText(/Search dishes or ingredients/i);
    await user.type(searchInput, 'nonexistentxyz123');

    expect(screen.getByText(/No dishes matched your filters/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
    await user.click(resetBtn);

    expect(screen.queryByText(/No dishes matched your filters/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Bruschetta al Pomodoro/i)).toBeInTheDocument();
  });

  it('adds dish to cart and displays confirmation toast', async () => {
    const user = userEvent.setup();
    renderMenuPage();

    const addButtons = screen.getAllByRole('button', { name: /\+ Add to Cart/i });
    await user.click(addButtons[0]);

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/Added.*to your pre-order cart/i)).toBeInTheDocument();
  });
});
