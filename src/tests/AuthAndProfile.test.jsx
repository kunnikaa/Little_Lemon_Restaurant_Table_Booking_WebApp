import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, DEFAULT_DEMO_USER } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import MyOrders from '../pages/MyOrders';
import MyReservations from '../pages/MyReservations';

describe('Authentication, Profile, and History Features', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders SignIn page and auto-fills demo credentials', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Sign In to Little Lemon/i })).toBeInTheDocument();

    const quickFillBtn = screen.getByRole('button', { name: /Auto-Fill Demo Account/i });
    await user.click(quickFillBtn);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    expect(emailInput).toHaveValue('elena.contos@example.com');
    expect(passwordInput).toHaveValue('lemon123');
  });

  it('validates password mismatch on SignUp page', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUp />
        </AuthProvider>
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passInput = screen.getByLabelText(/^Password/i);
    const confirmInput = screen.getByLabelText(/Confirm Password/i);
    const submitBtn = screen.getByRole('button', { name: /Complete Registration/i });

    await user.type(nameInput, 'Alexandre Dumas');
    await user.type(emailInput, 'alex@example.com');
    await user.type(passInput, 'secret123');
    await user.type(confirmInput, 'differentpass');
    await user.click(submitBtn);

    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('shows unauthenticated state with Sign In and Create Account options and no Logout', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const profileBtn = screen.getByRole('button', { name: /User account menu/i });
    await user.click(profileBtn);

    expect(screen.getByRole('link', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Create Account/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Logout/i })).not.toBeInTheDocument();
  });

  it('renders Profile page with user account details and delivery addresses when authenticated', () => {
    localStorage.setItem('little_lemon_auth_user', JSON.stringify(DEFAULT_DEMO_USER));
    render(
      <MemoryRouter>
        <AuthProvider>
          <FavoritesProvider>
            <Profile />
          </FavoritesProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Elena Contos/i })).toBeInTheDocument();
    expect(screen.getByText(/Saved Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Order History/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Table Bookings/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/742 Michigan Avenue/i)).toBeInTheDocument();
  });

  it('renders MyOrders history page with order summaries', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <MyOrders />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /My Order History/i })).toBeInTheDocument();
    expect(screen.getByText(/LL-ORD-8419/i)).toBeInTheDocument();
    expect(screen.getByText(/Takeout & Pickup/i)).toBeInTheDocument();
  });

  it('renders MyReservations history page with confirmed table bookings', () => {
    render(
      <MemoryRouter>
        <MyReservations />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /My Table Reservations/i })).toBeInTheDocument();
    expect(screen.getByText(/LL-RES-7201/i)).toBeInTheDocument();
    expect(screen.getByText(/4 Guests/i)).toBeInTheDocument();
  });
});
