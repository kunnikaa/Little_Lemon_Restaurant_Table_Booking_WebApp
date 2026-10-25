import { fetchAPI } from './bookingApi';

/**
 * Returns today's date formatted as YYYY-MM-DD in local time.
 */
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a YYYY-MM-DD date string into a user-friendly date (e.g., "Saturday, Oct 25, 2026").
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

/**
 * Initializes available reservation times for today's date.
 * (Required function name for Coursera Capstone rubric).
 * @param {Date|string} [initialDate] Optional starting date
 * @returns {Array<string>} Array of available time strings
 */
export const initializeTimes = (initialDate = new Date()) => {
  const dateObj = initialDate instanceof Date ? initialDate : new Date(initialDate);
  return fetchAPI(dateObj);
};

/**
 * Reducer function to update available reservation times based on selected date.
 * (Required function name for Coursera Capstone rubric).
 * @param {Array<string>} state Current list of available times
 * @param {Object} action Reducer action { type: string, payload: string|Date }
 * @returns {Array<string>} New list of available times
 */
export const updateTimes = (state, action) => {
  if (!action) return state;

  switch (action.type) {
    case 'UPDATE_TIMES': {
      const selectedDate = action.payload;
      if (!selectedDate) return state;
      // Convert string YYYY-MM-DD to Date object
      let dateObj;
      if (typeof selectedDate === 'string' && selectedDate.includes('-')) {
        const [year, month, day] = selectedDate.split('-').map(Number);
        dateObj = new Date(year, month - 1, day);
      } else {
        dateObj = new Date(selectedDate);
      }
      return fetchAPI(dateObj);
    }
    case 'RESET_TIMES': {
      return initializeTimes();
    }
    default:
      return state;
  }
};

/**
 * Validates the table booking form data.
 * @param {Object} formData Form inputs
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateBookingForm = (formData) => {
  const errors = {};
  const today = getTodayDateString();

  // Full Name validation
  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com).';
  }

  // Phone number validation (optional but validated if provided)
  if (formData.phone && formData.phone.trim()) {
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
  }

  // Date validation
  if (!formData.date) {
    errors.date = 'Please select a reservation date.';
  } else if (formData.date < today) {
    errors.date = 'Reservation date cannot be in the past.';
  }

  // Time validation
  if (!formData.time) {
    errors.time = 'Please select a reservation time.';
  }

  // Number of guests validation
  const guestsNum = Number(formData.guests);
  if (!formData.guests && formData.guests !== 0) {
    errors.guests = 'Please select the number of guests.';
  } else if (isNaN(guestsNum) || guestsNum < 1) {
    errors.guests = 'Must be at least 1 guest.';
  } else if (guestsNum > 10) {
    errors.guests = 'Maximum 10 guests per online booking. For larger parties, please contact us.';
  }

  // Occasion validation
  if (!formData.occasion) {
    errors.occasion = 'Please choose an occasion.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
