"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/types/Product.tsx";
import mockProducts from "@/data/products.json";

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: Product) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts as Product[]);

  function addProduct(product: Product) {
    setProducts((prev) => [product, ...prev]);
  }

  const value = useMemo(() => ({ products, addProduct }), [products]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);

  if (!ctx) {
    throw new Error("useProducts trebuie folosit în interiorul <ProductsProvider>.");
  }

  return ctx;
}
