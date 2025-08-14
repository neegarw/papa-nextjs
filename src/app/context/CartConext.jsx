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

  const addToCart = (product, quantity, variation) => {
    // 🔹 unikal açar: id + variation.id və ya variation.name
    const variationKey = variation
      ? `${product.id}-${variation.name || variation.id}`
      : `${product.id}`;

    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.key === variationKey);

      if (existing) {
        return prevCart.map((item) =>
          item.key === variationKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            variation,
            key: variationKey, // unikal açar
          },
        ];
      }
    });
  };

  const removeFromCart = (id, variation) => {
    const variationKey = variation
      ? `${id}-${variation.name || variation.id}`
      : `${id}`;
    setCartItems((prev) => prev.filter((item) => item.key !== variationKey));
  };

  const updateQuantity = (id, variation, quantity) => {
    const variationKey = variation
      ? `${id}-${variation.name || variation.id}`
      : `${id}`;
    setCartItems((prev) =>
      prev.map((item) =>
        item.key === variationKey ? { ...item, quantity } : item
      )
    );
  };

  function increment(id, variation) {
    const variationKey = variation
      ? `${id}-${variation.name || variation.id}`
      : `${id}`;
    setCartItems((prev) =>
      prev.map((item) =>
        item.key === variationKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrement(id, variation) {
    const variationKey = variation
      ? `${id}-${variation.name || variation.id}`
      : `${id}`;
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === variationKey
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
