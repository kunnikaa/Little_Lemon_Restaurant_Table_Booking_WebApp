import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Integration Flow', () => {
  beforeEach(() => {
    localStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  it('renders all key restaurant sections and handles announcement dismissal', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Announcement bar
    const announcement = screen.getByRole('region', { name: /Restaurant Announcement/i });
    expect(announcement).toBeInTheDocument();
    const dismissBtn = screen.getByLabelText(/Dismiss announcement banner/i);
    await user.click(dismissBtn);
    expect(screen.queryByRole('region', { name: /Restaurant Announcement/i })).not.toBeInTheDocument();

    // Brand and Navigation
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getAllByText(/LITTLE LEMON/i).length).toBeGreaterThan(0);

    // Hero Section
    expect(
      screen.getByRole('heading', { name: /A Little Taste of the Mediterranean/i, level: 1 })
    ).toBeInTheDocument();

    // Featured Highlights Section
    expect(
      screen.getByRole('heading', { name: /Signature Culinary Highlights/i })
    ).toBeInTheDocument();

    // Extensive Menu Section
    expect(
      screen.getByRole('heading', { name: /Our Extensive Culinary Menu/i })
    ).toBeInTheDocument();

    // Reservations Section
    expect(
      screen.getByRole('heading', { name: /Reserve a Table at Little Lemon/i, level: 2 })
    ).toBeInTheDocument();

    // Story Section
    expect(screen.getByRole('heading', { name: /The Story of Little Lemon/i })).toBeInTheDocument();

    // Testimonials Section
    expect(screen.getByRole('heading', { name: /What Our Guests Say/i })).toBeInTheDocument();

    // Footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('completes the full table booking flow: filling form, submitting, displaying confirmation summary, and resetting', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Fill the booking form
    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const guestsInput = screen.getByLabelText(/Number of Guests/i);

    await user.type(nameInput, 'Sophia Rossi');
    await user.type(emailInput, 'sophia@example.com');
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');

    // Submit the form
    const submitBtn = screen.getByRole('button', { name: /Reserve Your Table/i });
    await user.click(submitBtn);

    // Wait for the booking confirmation card to appear
    await waitFor(
      () => {
        expect(screen.getByRole('heading', { name: /Reservation Confirmed!/i })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify confirmation details are displayed
    expect(screen.getAllByText('Sophia Rossi').length).toBeGreaterThan(0);
    expect(screen.getByText('sophia@example.com')).toBeInTheDocument();
    expect(screen.getByText(/4 Guests/i)).toBeInTheDocument();
    expect(screen.getByText(/Booking Reference/i)).toBeInTheDocument();

    // Click "Book Another Table"
    const bookAnotherBtn = screen.getByRole('button', { name: /Book Another Table/i });
    await user.click(bookAnotherBtn);

    // Verify form is restored and available again
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reserve Your Table/i })).toBeInTheDocument();
  });
});
