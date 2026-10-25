import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

const STORAGE_KEY = 'little_lemon_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [1, 2]; // default with Greek Salad & Bruschetta for discovery
    } catch (e) {
      console.warn('Unable to read favorites from localStorage:', e);
      return [1, 2];
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
    const id = Number(dishId);
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const isFavorite = (dishId) => {
    return favorites.includes(Number(dishId));
  };

  const removeFromFavorites = (dishId) => {
    const id = Number(dishId);
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
