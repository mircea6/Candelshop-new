"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/Product.tsx";

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/products');

      console.log(response);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const addProduct = async (productData: Omit<Product, "id" | "createdAt">) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      setProducts((prev) => [newProduct, ...prev]);
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const value = useMemo(() => ({ products, addProduct, loading, error }), [products, loading, error]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}




export function useProducts() {
  const ctx = useContext(ProductsContext);

  if (!ctx) {
    throw new Error("useProducts trebuie folosit în interiorul <ProductsProvider>.");
  }

  return ctx;
}