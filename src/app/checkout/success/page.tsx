"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
        <h1 className="text-2xl font-bold text-black dark:text-zinc-50 mb-2">Plată reușită</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Mulțumim pentru comandă. Vei primi un email de confirmare.
        </p>
        <Link href="/" className="btn-back">
          Înapoi la homepage
        </Link>
      </div>
    </div>
  );
}