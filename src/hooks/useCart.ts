
import { useState, useEffect } from 'react';
import { Book } from '../types/book';

interface CartItem {
  book: Book;
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bibliotheca-cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.book.id === book.id);
      let newCart;
      
      if (existingItem) {
        newCart = prev.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, { book, quantity: 1 }];
      }
      
      localStorage.setItem('bibliotheca-cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.book.id !== bookId);
      localStorage.setItem('bibliotheca-cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCart(prev => {
      const newCart = prev.map(item =>
        item.book.id === bookId
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('bibliotheca-cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (bookId: string) => cart.some(item => item.book.id === bookId);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    isInCart
  };
};
