/**
 * Little Lemon Booking API Utility
 * 
 * Implements the standard Coursera Meta Front-End Capstone API contract:
 * - fetchAPI(date): Returns an array of available booking time slots for a given Date.
 * - submitAPI(formData): Submits reservation data and returns boolean success.
 * 
 * If window.fetchAPI or window.submitAPI are provided (e.g. injected via script tag),
 * they will be preferred. Otherwise, this self-contained deterministic implementation is used.
 */

const seededRandom = function (seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

/**
 * Fetches available booking times for a given date.
 * Uses deterministic pseudo-random logic based on the date's day of the month.
 * @param {Date|string} dateInput - A Date object or valid date string (YYYY-MM-DD).
 * @returns {Array<string>} List of available time strings (e.g. ['17:00', '18:00', ...]).
 */
export const fetchAPI = function (dateInput) {
  // If window.fetchAPI is injected externally by course environment, use it
  if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
    try {
      const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
      return window.fetchAPI(dateObj);
    } catch {
      // Fall back to local implementation if window call encounters an issue
    }
  }

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
  // Guard against invalid dates
  if (isNaN(date.getTime())) {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  }

  const result = [];
  const random = seededRandom(date.getDate());

  for (let hour = 17; hour <= 23; hour++) {
    if (random() < 0.5) {
      result.push(`${hour}:00`);
    }
    if (random() < 0.5) {
      result.push(`${hour}:30`);
    }
  }

  // Ensure there is always at least a fallback set of slots if random generator yielded empty
  if (result.length === 0) {
    return ['17:00', '18:30', '19:00', '20:30', '21:00'];
  }

  return result;
};

/**
 * Submits the reservation form data.
 * @param {Object} formData - Booking form data.
 * @returns {Promise<boolean>|boolean} True if submission succeeded.
 */
export const submitAPI = function (formData) {
  if (typeof window !== 'undefined' && typeof window.submitAPI === 'function') {
    try {
      return window.submitAPI(formData);
    } catch {
      // Fall back to local implementation
    }
  }

  // Basic validation guard
  if (!formData || !formData.date || !formData.time || !formData.guests) {
    return false;
  }

  // Store in demonstration localStorage for demonstration purposes
  try {
    const existing = JSON.parse(localStorage.getItem('little_lemon_bookings') || '[]');
    const newBooking = {
      ...formData,
      id: `LL-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString()
    };
    existing.push(newBooking);
    localStorage.setItem('little_lemon_bookings', JSON.stringify(existing));
  } catch {
    // Graceful handling for non-storage environments
  }

  return true;
};
