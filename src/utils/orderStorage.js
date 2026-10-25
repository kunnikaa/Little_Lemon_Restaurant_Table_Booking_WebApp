/**
 * Storage helpers for Little Lemon Orders and Table Reservations.
 * Manages localStorage persistence for user order history and table bookings.
 */

const ORDERS_KEY = 'little_lemon_orders';
const RESERVATIONS_KEY = 'little_lemon_reservations';

// Sample demonstration order to show when no live orders exist yet
const INITIAL_DEMO_ORDERS = [
  {
    orderId: 'LL-ORD-8419',
    date: '2026-10-24T18:30:00.000Z',
    displayDate: 'October 24, 2026 at 6:30 PM',
    diningMode: 'Takeout & Pickup',
    pickupTime: 'Today at 7:15 PM',
    items: [
      { id: 1, name: 'Greek Salad', price: 12.99, quantity: 2, image: '/images/greek-salad.jpg' },
      { id: 3, name: 'Lemon Dessert', price: 8.5, quantity: 1, image: '/images/lemon-dessert.jpg' },
    ],
    subtotal: 34.48,
    tax: 2.84,
    total: 37.32,
    status: 'Completed',
    paymentMethod: 'Demo Card (Simulated)',
    customer: {
      name: 'Elena Contos',
      email: 'elena.contos@example.com',
      phone: '(312) 555-0198',
    },
  },
];

// Sample demonstration reservation to show when no live bookings exist yet
const INITIAL_DEMO_RESERVATIONS = [
  {
    referenceId: 'LL-RES-7201',
    date: '2026-10-27',
    displayDate: 'October 27, 2026',
    time: '19:30',
    displayTime: '7:30 PM',
    guests: 4,
    occasion: 'Birthday',
    seating: 'Patio (Outdoor)',
    fullName: 'Elena Contos',
    email: 'elena.contos@example.com',
    phone: '(312) 555-0198',
    specialRequests: 'Quiet table overlooking the garden patio, please.',
    preOrderedDishes: [
      { id: 1, name: 'Greek Salad', quantity: 2, price: 12.99 },
      { id: 2, name: 'Bruschetta', quantity: 1, price: 9.99 },
    ],
    status: 'Confirmed',
    createdAt: '2026-10-24T14:15:00.000Z',
  },
];

export function getSavedOrders() {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : INITIAL_DEMO_ORDERS;
  } catch (e) {
    console.warn('Failed to load orders from storage:', e);
    return INITIAL_DEMO_ORDERS;
  }
}

export function saveOrder(order) {
  try {
    const existing = getSavedOrders();
    const updated = [order, ...existing];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save order to storage:', e);
    return [order];
  }
}

export function getSavedReservations() {
  try {
    const data = localStorage.getItem(RESERVATIONS_KEY);
    return data ? JSON.parse(data) : INITIAL_DEMO_RESERVATIONS;
  } catch (e) {
    console.warn('Failed to load reservations from storage:', e);
    return INITIAL_DEMO_RESERVATIONS;
  }
}

export function saveReservation(reservation) {
  try {
    const existing = getSavedReservations();
    const updated = [reservation, ...existing];
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save reservation to storage:', e);
    return [reservation];
  }
}
