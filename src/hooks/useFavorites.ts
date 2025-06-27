
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bibliotheca-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId];
      
      localStorage.setItem('bibliotheca-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (bookId: string) => favorites.includes(bookId);

  return { favorites, toggleFavorite, isFavorite };
};
