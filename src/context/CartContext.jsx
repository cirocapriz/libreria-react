// src/context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (libro) => {
    setCart((prev) => {
      const exists = prev.find((it) => it.id === libro.id);
      if (exists) {
        return prev.map((it) =>
          it.id === libro.id ? { ...it, cantidad: (it.cantidad || 1) + 1 } : it
        );
      }
      return [...prev, { ...libro, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item))
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad - 1) } : item))
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (Number(item.precio) || 0) * item.cantidad, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increase,
      decrease,
      clearCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

