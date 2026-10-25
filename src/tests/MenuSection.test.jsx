import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuSection from '../components/MenuSection';

describe('MenuSection Component', () => {
  it('renders menu heading, category tabs, and search input', () => {
    render(<MenuSection />);

    expect(screen.getByRole('heading', { name: /Our Extensive Culinary Menu/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Starters' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Mains' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Pasta' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Desserts' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search dishes/i)).toBeInTheDocument();
  });

  it('filters dishes when selecting a category tab', async () => {
    const user = userEvent.setup();
    render(<MenuSection />);

    // Click 'Pasta' tab
    const pastaTab = screen.getByRole('tab', { name: 'Pasta' });
    await user.click(pastaTab);

    expect(pastaTab).toHaveClass('active');
    expect(screen.getByText(/Amalfi Lemon & Garlic Prawn Linguine/i)).toBeInTheDocument();
    // Non-pasta dish should not be present in the filtered view
    expect(screen.queryByText(/Santorini Mezze Platter/i)).not.toBeInTheDocument();
  });

  it('filters dishes dynamically when typing in search input', async () => {
    const user = userEvent.setup();
    render(<MenuSection />);

    const searchInput = screen.getByPlaceholderText(/Search dishes/i);
    await user.type(searchInput, 'baklava');

    expect(screen.getByText(/Pistachio & Walnut Baklava/i)).toBeInTheDocument();
    expect(screen.queryByText(/Classic Greek Village Salad/i)).not.toBeInTheDocument();
  });

  it('shows empty state when no items match the query and allows reset', async () => {
    const user = userEvent.setup();
    render(<MenuSection />);

    const searchInput = screen.getByPlaceholderText(/Search dishes/i);
    await user.type(searchInput, 'nonexistentdishxyz');

    expect(screen.getByText(/No dishes found/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Reset Filters/i });
    await user.click(resetBtn);

    expect(screen.queryByText(/No dishes found/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Bruschetta al Pomodoro/i)).toBeInTheDocument();
  });

  it('displays order delivery toast notification on click', async () => {
    const user = userEvent.setup();
    render(<MenuSection />);

    const orderButtons = screen.getAllByRole('button', { name: /Order.*for delivery/i });
    await user.click(orderButtons[0]);

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/added to demonstration cart/i)).toBeInTheDocument();
  });
});
