import { describe, it, expect } from 'vitest';
import {
  initializeTimes,
  updateTimes,
  validateBookingForm,
  getTodayDateString,
  formatDateForDisplay,
} from '../utils/bookingUtils';
import { fetchAPI, submitAPI } from '../utils/bookingApi';

describe('Booking Utilities and API', () => {
  describe('initializeTimes', () => {
    it('returns a non-empty array of available booking time slots', () => {
      const times = initializeTimes();
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThan(0);
      expect(typeof times[0]).toBe('string');
      expect(times[0]).toMatch(/^\d{1,2}:\d{2}$/);
    });
  });

  describe('updateTimes', () => {
    it('returns updated available times when UPDATE_TIMES action is dispatched', () => {
      const initialState = ['17:00', '18:00'];
      const action = { type: 'UPDATE_TIMES', payload: '2026-11-15' };
      const updatedTimes = updateTimes(initialState, action);

      expect(Array.isArray(updatedTimes)).toBe(true);
      expect(updatedTimes.length).toBeGreaterThan(0);
    });

    it('returns the same state if action type is unknown', () => {
      const initialState = ['17:00', '18:00'];
      const action = { type: 'UNKNOWN_ACTION' };
      const result = updateTimes(initialState, action);
      expect(result).toEqual(initialState);
    });

    it('resets times when RESET_TIMES action is dispatched', () => {
      const initialState = ['20:00'];
      const action = { type: 'RESET_TIMES' };
      const result = updateTimes(initialState, action);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('fetchAPI and submitAPI', () => {
    it('fetchAPI returns reproducible time slots for a given date', () => {
      const date = new Date(2026, 9, 25);
      const times1 = fetchAPI(date);
      const times2 = fetchAPI(date);
      expect(times1).toEqual(times2);
    });

    it('submitAPI returns true for valid booking payload', () => {
      const validPayload = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        date: '2026-11-20',
        time: '18:00',
        guests: 4,
        occasion: 'Birthday',
      };
      const result = submitAPI(validPayload);
      expect(result).toBe(true);
    });

    it('submitAPI returns false if required booking fields are missing', () => {
      const invalidPayload = {
        fullName: 'Jane Doe',
      };
      const result = submitAPI(invalidPayload);
      expect(result).toBe(false);
    });
  });

  describe('validateBookingForm', () => {
    const validData = {
      fullName: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '3125550199',
      date: '2099-12-31',
      time: '19:00',
      guests: 4,
      occasion: 'Birthday',
    };

    it('validates correct form data with no errors', () => {
      const validation = validateBookingForm(validData);
      expect(validation.isValid).toBe(true);
      expect(Object.keys(validation.errors).length).toBe(0);
    });

    it('catches missing full name', () => {
      const validation = validateBookingForm({ ...validData, fullName: '' });
      expect(validation.isValid).toBe(false);
      expect(validation.errors.fullName).toBeDefined();
    });

    it('catches invalid email address formats', () => {
      const invalidEmails = ['plainaddress', 'missing@domain', '@missinguser.com'];
      invalidEmails.forEach((email) => {
        const validation = validateBookingForm({ ...validData, email });
        expect(validation.isValid).toBe(false);
        expect(validation.errors.email).toBeDefined();
      });
    });

    it('catches past reservation dates', () => {
      const validation = validateBookingForm({ ...validData, date: '2020-01-01' });
      expect(validation.isValid).toBe(false);
      expect(validation.errors.date).toMatch(/cannot be in the past/i);
    });

    it('catches invalid guest counts (less than 1 or greater than 10)', () => {
      const underMin = validateBookingForm({ ...validData, guests: 0 });
      expect(underMin.isValid).toBe(false);
      expect(underMin.errors.guests).toBeDefined();

      const overMax = validateBookingForm({ ...validData, guests: 11 });
      expect(overMax.isValid).toBe(false);
      expect(overMax.errors.guests).toMatch(/maximum 10/i);
    });
  });

  describe('formatDateForDisplay and getTodayDateString', () => {
    it('getTodayDateString returns YYYY-MM-DD format', () => {
      const todayStr = getTodayDateString();
      expect(todayStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('formatDateForDisplay formats string date properly', () => {
      const formatted = formatDateForDisplay('2026-10-25');
      expect(formatted).toContain('2026');
      expect(formatted).toContain('Oct');
    });
  });
});
