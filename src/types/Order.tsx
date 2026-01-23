import type { CartItem } from "./CartItem";

export type Order = {
  id: string;  // ID-ul comenzii (generat de MongoDB)
  customerName: string;  // Numele clientului
  customerEmail: string;  // Email-ul clientului
  customerPhone: string;  // Telefonul clientului
  customerAddress: string;  // Adresa de livrare
  paymentMethod: "ramburs" | "card";  // Metoda de plată
  items: CartItem[];  // Lista de produse din comandă
  totalPrice: number;  // Totalul comenzii
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";  // Statusul comenzii
  createdAt: string;  // Data când a fost creată comanda
};