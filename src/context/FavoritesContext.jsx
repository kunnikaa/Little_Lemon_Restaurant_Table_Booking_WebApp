import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'little_lemon_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Normalize to strings, filtering out invalid values or NaNs
          return Array.from(
            new Set(
              parsed
                .map(String)
                .filter((id) => id && id !== 'NaN' && id !== 'null' && id !== 'undefined')
            )
          );
        }
      }
      return []; // Must start completely empty unless user has actually favorited dishes
    } catch (e) {
      console.warn('Unable to read favorites from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Unable to persist favorites to localStorage:', e);
    }
  }, [favorites]);

  const toggleFavorite = (dishId) => {
    if (!dishId && dishId !== 0) return;
    const id = String(dishId);
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const isFavorite = (dishId) => {
    if (!dishId && dishId !== 0) return false;
    return favorites.includes(String(dishId));
  };

  const removeFromFavorites = (dishId) => {
    if (!dishId && dishId !== 0) return;
    const id = String(dishId);
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    favoritesCount: favorites.length,
    toggleFavorite,
    isFavorite,
    removeFromFavorites,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    return {
      favorites: [],
      favoritesCount: 0,
      toggleFavorite: () => {},
      isFavorite: () => false,
      removeFromFavorites: () => {},
      clearFavorites: () => {},
    };
  }
  return context;
}
