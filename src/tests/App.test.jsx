import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Multi-Page Application & Routing Flow', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = function () {};
    window.scrollTo = function () {};
  });

  it('renders homepage with user logo, hero, featured dishes, and navigation', () => {
    render(<App />);

    // Logo image from reference present in header and footer
    expect(
      screen.getAllByAltText(/Little Lemon Mediterranean Kitchen Logo/i).length
    ).toBeGreaterThanOrEqual(1);

    // Main Hero
    expect(
      screen.getByRole('heading', { name: /A Little Taste of the Mediterranean/i, level: 1 })
    ).toBeInTheDocument();

    // Navigation links in banner
    const banner = screen.getByRole('banner');
    expect(within(banner).getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(within(banner).getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(within(banner).getByRole('link', { name: 'Menu' })).toBeInTheDocument();
    expect(within(banner).getByRole('link', { name: 'Reservations' })).toBeInTheDocument();
    expect(within(banner).getByRole('link', { name: 'Order Online' })).toBeInTheDocument();
  });

  it('navigates to the Menu page when clicking Menu link', async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuLink = screen.getByRole('link', { name: 'Menu' });
    await user.click(menuLink);

    expect(
      await screen.findByRole('heading', { name: /Our Full Mediterranean Menu/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'All Dishes' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Starters' })).toBeInTheDocument();
  });

  it('navigates to the Reservations page and completes the full table booking flow', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate to Reservations
    const resLink = screen.getByRole('link', { name: 'Reservations' });
    await user.click(resLink);

    expect(
      await screen.findByRole('heading', { name: /Book Your Table at Little Lemon/i })
    ).toBeInTheDocument();

    // Fill the booking form
    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const guestsInput = screen.getByLabelText(/Number of Guests/i);

    await user.type(nameInput, 'Sophia Rossi');
    await user.type(emailInput, 'sophia@example.com');
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');

    // Submit reservation
    const submitBtn = screen.getByRole('button', { name: /Reserve Your Table/i });
    await user.click(submitBtn);

    // Wait for confirmation card
    await waitFor(
      () => {
        expect(screen.getByRole('heading', { name: /Reservation Confirmed!/i })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getAllByText('Sophia Rossi').length).toBeGreaterThan(0);
    expect(screen.getByText('sophia@example.com')).toBeInTheDocument();
    expect(screen.getByText(/4 Guests/i)).toBeInTheDocument();

    // Reset reservation
    const bookAnotherBtn = screen.getByRole('button', { name: /Book Another Table/i });
    await user.click(bookAnotherBtn);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  it('navigates to About Us page and renders founders story', async () => {
    const user = userEvent.setup();
    render(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    await user.click(aboutLink);

    expect(
      await screen.findByRole('heading', { name: /Two Friends, One Shared Culinary Dream/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Mario/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Adrian/i).length).toBeGreaterThan(0);
  });
});
