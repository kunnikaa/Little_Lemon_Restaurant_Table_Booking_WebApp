import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../context/CartContext';

// Helper component to exercise CartContext
function CartTestConsumer() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, subtotal, total } = useCart();

  const mockDish = {
    id: 'test-pasta',
    name: 'Lemon Pasta',
    price: '$20.00',
    priceNumber: 20.0,
  };

  return (
    <div>
      <span data-testid="cart-count">{cartCount}</span>
      <span data-testid="cart-subtotal">{subtotal}</span>
      <span data-testid="cart-total">{total}</span>
      <button onClick={() => addToCart(mockDish, 1)}>Add Pasta</button>
      <button onClick={() => updateQuantity('test-pasta', 3)}>Set Qty 3</button>
      <button onClick={() => removeFromCart('test-pasta')}>Remove Pasta</button>
      <button onClick={clearCart}>Clear All</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id} data-testid={`item-${item.id}`}>
            {item.dish.name} - Qty: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe('CartContext & Pre-Order System', () => {
  it('manages cart additions, quantity updates, item removals, and price calculations', async () => {
    localStorage.clear();
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartTestConsumer />
      </CartProvider>
    );

    // Initial state: empty cart
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-subtotal')).toHaveTextContent('0');

    // Add 1 dish
    await user.click(screen.getByText('Add Pasta'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-subtotal')).toHaveTextContent('20');
    expect(screen.getByTestId('item-test-pasta')).toHaveTextContent('Lemon Pasta - Qty: 1');

    // Update quantity to 3
    await user.click(screen.getByText('Set Qty 3'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-subtotal')).toHaveTextContent('60');

    // Total should include 8.25% demo tax (60 + 4.95 = 64.95)
    expect(Number(screen.getByTestId('cart-total').textContent)).toBeCloseTo(64.95, 2);

    // Remove dish
    await user.click(screen.getByText('Remove Pasta'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.queryByTestId('item-test-pasta')).not.toBeInTheDocument();
  });
});
