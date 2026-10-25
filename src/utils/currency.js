/**
 * Currency utility formatting functions.
 * Ensures consistent USD currency formatting across menu, cart, checkout, and confirmations.
 */

export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }
  return `$${amount.toFixed(2)}`;
};
