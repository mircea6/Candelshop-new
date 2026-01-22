"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { CartItem } from "@/types/CartItem";
import type { Product } from "@/types/Product";

// Tipul contextului - ce oferă
type CartContextValue = {
  cartItems: CartItem[];  // Lista de produse din coș
  addToCart: (product: Product) => void;  // Adaugă produs în coș
  removeFromCart: (productId: string) => void;  // Șterge produs din coș
  updateQuantity: (productId: string, quantity: number) => void;  // Actualizează cantitatea
  clearCart: () => void;  // Golește coșul
  getTotalPrice: () => number;  // Calculează totalul
  getTotalItems: () => number;  // Calculează numărul total de produse
};

// Creează contextul gol
const CartContext = createContext<CartContextValue | null>(null);

// Provider-ul (furnizorul de date)
export function CartProvider({ children }: { children: React.ReactNode }) {
  // State pentru lista de produse din coș
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Funcția care adaugă un produs în coș
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Caută dacă produsul există deja în coș
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Dacă există, mărește cantitatea cu 1
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Dacă nu există, adaugă produsul nou cu cantitatea 1
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Funcția care șterge un produs din coș
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Funcția care actualizează cantitatea unui produs
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Dacă cantitatea e 0 sau negativă, șterge produsul
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Funcția care golește coșul
  const clearCart = () => {
    setCartItems([]);
  };

  // Funcția care calculează totalul prețurilor
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  // Funcția care calculează numărul total de produse
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  // Valoarea contextului (ce oferă)
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook-ul personalizat pentru a accesa contextul
export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart trebuie folosit în interiorul <CartProvider>.");
  }

  return ctx;
}