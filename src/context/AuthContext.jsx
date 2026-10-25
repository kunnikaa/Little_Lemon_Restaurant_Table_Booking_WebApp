import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_USER_KEY = 'little_lemon_auth_user';
const ADDRESSES_KEY = 'little_lemon_saved_addresses';

const DEFAULT_DEMO_USER = {
  id: 'usr_demo_01',
  name: 'Elena Contos',
  email: 'elena.contos@example.com',
  phone: '(312) 555-0198',
  memberSince: 'March 2024',
  avatar: 'EC',
  bio: 'Mediterranean food lover & Little Lemon regular.',
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr_1',
    label: 'Home',
    street: '742 Michigan Avenue, Apt 4B',
    city: 'Chicago',
    state: 'IL',
    zip: '60611',
    isDefault: true,
  },
  {
    id: 'addr_2',
    label: 'Office',
    street: '150 N Riverside Plaza, Floor 18',
    city: 'Chicago',
    state: 'IL',
    zip: '60606',
    isDefault: false,
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
    } catch (e) {
      console.warn('Failed to parse saved user:', e);
      return DEFAULT_DEMO_USER;
    }
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(ADDRESSES_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch (e) {
      console.warn('Failed to parse saved addresses:', e);
      return DEFAULT_ADDRESSES;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch (e) {
      console.warn('Failed to save user:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
    } catch (e) {
      console.warn('Failed to save addresses:', e);
    }
  }, [addresses]);

  // Frontend demonstration login
  const login = async ({ email, password }) => {
    // Basic simulation delay
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (!email || !password) {
      throw new Error('Please enter both your email address and password.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    // Generate user initials
    const namePart = email.split('@')[0];
    const formattedName = namePart
      .split(/[._-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const initials = formattedName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'LL';

    const authenticatedUser = {
      id: `usr_${Date.now()}`,
      name: formattedName || 'Little Lemon Guest',
      email: email.toLowerCase(),
      phone: '(312) 555-0142',
      memberSince: 'October 2026',
      avatar: initials,
      bio: 'Little Lemon Member (Demo Account)',
    };

    setUser(authenticatedUser);
    return authenticatedUser;
  };

  // Frontend demonstration registration
  const signup = async ({ name, email, phone, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'LL';

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || '(312) 555-0100',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatar: initials,
      bio: 'New Little Lemon Member',
    };

    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const addAddress = (newAddr) => {
    const address = {
      id: `addr_${Date.now()}`,
      isDefault: addresses.length === 0,
      ...newAddr,
    };
    setAddresses((prev) => [...prev, address]);
    return address;
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
    updateProfile,
    addresses,
    addAddress,
    removeAddress,
    setDefaultAddress,
    isDemoAuth: true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      login: async () => {},
      signup: async () => {},
      logout: () => {},
      updateProfile: () => {},
      addresses: [],
      addAddress: () => {},
      removeAddress: () => {},
      setDefaultAddress: () => {},
      isDemoAuth: true,
    };
  }
  return context;
}
