import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

describe('BookingForm Component', () => {
  const mockTimes = ['17:00', '18:00', '19:30', '20:00', '21:30'];
  const mockDispatchTimes = vi.fn();
  const mockOnSubmitBooking = vi.fn();

  it('renders all required form controls and labels with correct accessible attributes', () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    // Verify all core labels required by Coursera rubric
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();

    // Verify submit button
    const submitBtn = screen.getByRole('button', { name: /Submit reservation|Reserve Your Table/i });
    expect(submitBtn).toBeInTheDocument();
  });

  it('verifies HTML5 validation attributes on input elements', () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    const nameInput = screen.getByLabelText(/Full Name/i);
    expect(nameInput).toHaveAttribute('required');
    expect(nameInput).toHaveAttribute('minLength', '2');

    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');

    const dateInput = screen.getByLabelText(/Choose Date/i);
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('id', 'res-date');

    const timeSelect = screen.getByLabelText(/Choose Time/i);
    expect(timeSelect).toHaveAttribute('required');
    expect(timeSelect).toHaveAttribute('id', 'res-time');

    const guestsInput = screen.getByLabelText(/Number of Guests/i);
    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(guestsInput).toHaveAttribute('id', 'guests');

    const occasionSelect = screen.getByLabelText(/Occasion/i);
    expect(occasionSelect).toHaveAttribute('required');
    expect(occasionSelect).toHaveAttribute('id', 'occasion');
  });

  it('calls dispatchTimes with UPDATE_TIMES action when date input is changed', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    const dateInput = screen.getByLabelText(/Choose Date/i);
    await user.clear(dateInput);
    await user.type(dateInput, '2026-11-20');

    expect(mockDispatchTimes).toHaveBeenCalledWith({
      type: 'UPDATE_TIMES',
      payload: '2026-11-20',
    });
  });

  it('displays inline validation errors when submitting with empty or invalid fields', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Submit reservation|Reserve Your Table/i });
    await user.click(submitBtn);

    // Validation messages should appear
    expect(await screen.findByText(/Please enter your full name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter your email address/i)).toBeInTheDocument();

    // onSubmitBooking should NOT have been called
    expect(mockOnSubmitBooking).not.toHaveBeenCalled();
  });

  it('displays error when entering an invalid email format', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    await user.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('submits valid form data correctly and calls onSubmitBooking', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    // Fill valid values
    await user.type(screen.getByLabelText(/Full Name/i), 'Maria Garcia');
    await user.type(screen.getByLabelText(/Email Address/i), 'maria@example.com');
    await user.type(screen.getByLabelText(/Phone Number/i), '3125550188');

    const submitBtn = screen.getByRole('button', { name: /Submit reservation|Reserve Your Table/i });
    await user.click(submitBtn);

    expect(mockOnSubmitBooking).toHaveBeenCalledTimes(1);
    expect(mockOnSubmitBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'Maria Garcia',
        email: 'maria@example.com',
        phone: '3125550188',
        guests: 2,
        occasion: 'Casual Dining',
        seating: 'indoor',
      })
    );
  });

  it('disables submit button and shows loading text when isSubmitting is true', () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
        isSubmitting={true}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Submit reservation|Processing Reservation/i });
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent(/Processing Reservation/i);
  });

  it('submits a Table-Only reservation without requiring any food pre-orders', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    await user.type(screen.getByLabelText(/Full Name/i), 'Sophia Taylor');
    await user.type(screen.getByLabelText(/Email Address/i), 'sophia@example.com');
    await user.type(screen.getByLabelText(/Phone Number/i), '3125550199');

    // Confirm "Reserve a Table Only" is selected by default
    const tableOnlyRadio = screen.getByRole('radio', { name: /Reserve a Table Only/i });
    expect(tableOnlyRadio).toBeChecked();

    const submitBtn = screen.getByRole('button', { name: /Reserve Your Table/i });
    await user.click(submitBtn);

    expect(mockOnSubmitBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'Sophia Taylor',
        bookingChoice: 'table_only',
        preOrderedDishes: [],
        preOrderSubtotal: 0,
      })
    );
  });

  it('allows user to choose Table + Pre-order Food, browse full menu modal, and attach dishes', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatchTimes={mockDispatchTimes}
        onSubmitBooking={mockOnSubmitBooking}
      />
    );

    await user.type(screen.getByLabelText(/Full Name/i), 'Liam Wilson');
    await user.type(screen.getByLabelText(/Email Address/i), 'liam@example.com');
    await user.type(screen.getByLabelText(/Phone Number/i), '3125550200');

    // Switch to Table + Pre-order Food
    const tableFoodRadio = screen.getByRole('radio', { name: /Reserve a Table \+ Pre-order Food/i });
    await user.click(tableFoodRadio);
    expect(tableFoodRadio).toBeChecked();

    // Prominent "Browse Full Menu & Add Dishes" button should appear
    const browseBtn = screen.getByRole('button', { name: /Browse full restaurant menu/i });
    expect(browseBtn).toBeInTheDocument();

    // Click to open full menu modal
    await user.click(browseBtn);

    // Modal should be open with menu categories and search
    expect(screen.getByRole('dialog', { name: /Choose Your Dishes/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search dishes/i)).toBeInTheDocument();

    // Add Classic Greek Village Salad to pre-order
    const addGreekSaladBtn = screen.getByRole('button', { name: /Add Classic Greek Village Salad/i });
    await user.click(addGreekSaladBtn);

    // Close modal via Done button
    const doneBtn = screen.getByRole('button', { name: /Done & Return to Reservation/i });
    await user.click(doneBtn);

    // Itemized summary should now be displayed in booking form
    expect(screen.getByText('Pre-ordered Dishes for Your Table')).toBeInTheDocument();
    expect(screen.getByText('Classic Greek Village Salad')).toBeInTheDocument();
    expect(screen.getByText(/Payment at Restaurant/i)).toBeInTheDocument();

    // Submit booking with attached food
    const submitBtn = screen.getByRole('button', { name: /Reserve Your Table/i });
    await user.click(submitBtn);

    expect(mockOnSubmitBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'Liam Wilson',
        bookingChoice: 'table_and_food',
        preOrderedDishes: expect.arrayContaining([
          expect.objectContaining({
            name: 'Classic Greek Village Salad',
            quantity: 1,
          }),
        ]),
      })
    );
  });
});
