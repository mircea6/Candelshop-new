import type { Product } from "./Product";

export type CartItem = {
  product: Product;  // Produsul complet
  quantity: number;  // Câte bucăți din acest produs
};