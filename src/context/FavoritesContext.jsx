import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menuItems';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'little_lemon_favorites';

// Valid set of unique string dish IDs currently published in Little Lemon's menu
const VALID_DISH_IDS = new Set(MENU_ITEMS.map((item) => String(item.id)));

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Strictly sanitize and prune invalid, stale, legacy numeric (e.g. 1, 2), or NaN IDs
          const sanitized = Array.from(
            new Set(
              parsed
                .map(String)
                .filter((id) => VALID_DISH_IDS.has(id))
            )
          );
          return sanitized;
        }
      }
      return []; // Must start completely empty (0) unless valid dishes were saved
    } catch (e) {
      console.warn('Unable to read favorites from localStorage:', e);
      return [];
    }
  });

  // Sync to localStorage on change; automatically writes back the sanitized list
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Unable to persist favorites to localStorage:', e);
    }
  }, [favorites]);

  const toggleFavorite = (dishId) => {
    if (!dishId && dishId !== 0) return;
    const strId = String(dishId);
    if (!VALID_DISH_IDS.has(strId)) return;
    setFavorites((prev) => {
      if (prev.includes(strId)) {
        return prev.filter((item) => item !== strId);
      }
      return [...prev, strId];
    });
  };

  const isFavorite = (dishId) => {
    if (!dishId && dishId !== 0) return false;
    const strId = String(dishId);
    return VALID_DISH_IDS.has(strId) && favorites.includes(strId);
  };

  const removeFromFavorites = (dishId) => {
    if (!dishId && dishId !== 0) return;
    const strId = String(dishId);
    setFavorites((prev) => prev.filter((item) => item !== strId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  // Derive favorites and count strictly from valid unique dish IDs
  const validFavorites = Array.from(
    new Set(favorites.map(String).filter((id) => VALID_DISH_IDS.has(id)))
  );
  const favoritesCount = validFavorites.length;

  const value = {
    favorites: validFavorites,
    favoritesCount,
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
