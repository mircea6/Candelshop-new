"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Coș de Cumpărături
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Înapoi la Homepage
          </Link>
        </div>

        {/* Lista de produse */}
        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg text-center">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
              Coșul tău este gol
            </p>
            <Link
              href="/"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Continuă cumpărăturile
            </Link>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-4"
              >
                {/* Imagine produs */}
                {item.product.image && (
                  <div className="w-full md:w-32 h-32 relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                      sizes="128px"
                    />
                  </div>
                )}

                {/* Detalii produs */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                    {item.product.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                   {item.product.price} {item.product.currency}
                  </p>
                  <p className="text-lg font-bold text-black dark:text-zinc-50">
                  {item.product.description} 
                  </p>
                </div>

                {/* Controale cantitate */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-50 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold text-black dark:text-zinc-50">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-50 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-bold text-black dark:text-zinc-50">
                    Total: {(item.product.price * item.quantity).toFixed(2)}{" "}
                    {item.product.currency}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total și butoane */}
        {cartItems.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Total produse: {totalItems}
                </p>
                <p className="text-2xl font-bold text-black dark:text-zinc-50">
                  Total: {totalPrice.toFixed(2)} RON
                </p>
              </div>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Golește coșul
              </button>
            </div>
            <Link              href="/checkout"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center">
              Finalizează comanda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}