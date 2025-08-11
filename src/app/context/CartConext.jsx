'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.variation?.type === product.variation?.type &&
          item.variation?.size === product.variation?.size
      );

      if (existingIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
          price: product.price,
          variation: {
            ...product.variation,
            price: product.variation?.price || product.price,
          },
        };
        return updatedCart;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, variation) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id &&
            item.variation?.type === variation?.type &&
            item.variation?.size === variation?.size)
      )
    );
  };

  const updateQuantity = (id, variation, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
          item.variation?.type === variation?.type &&
          item.variation?.size === variation?.size
          ? { ...item, quantity }
          : item
      )
    );
  };

  function increment(id, variation) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
          item.variation?.type === variation?.type &&
          item.variation?.size === variation?.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrement(id, variation) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id &&
            item.variation?.type === variation?.type &&
            item.variation?.size === variation?.size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        increment,
        decrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
