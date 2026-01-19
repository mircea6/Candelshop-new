"use client";

import React from "react";
import { ProductsProvider } from "@/context/ProductsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProductsProvider>{children}</ProductsProvider>;
}
