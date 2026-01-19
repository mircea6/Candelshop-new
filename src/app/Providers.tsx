"use client";

import React from "react";
import { ProductsProvider } from "@/context/ProductsContext.tsx";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProductsProvider>{children}</ProductsProvider>;
}
