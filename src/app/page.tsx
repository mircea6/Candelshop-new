"use client";

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";


export default function Home() {
  const { products, loading, error } = useProducts();
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="text-center mb-12 relative">
      {/* Iconița de coș - poziționată în colțul dreapta sus */}
      <Link
        href="/cart"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
        >
        {/* Iconiță coș (SVG simplu) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {/* Badge cu numărul de produse */}
        {totalItems > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[20px] text-center">
            {totalItems}
          </span>
        )}
      </Link>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Homepage - Magazin Lumânări
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Bine ai venit în magazinul nostru!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link
          href="/DespreNoi"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Despre Noi →
        </Link>
        <Link
          href="/produse"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Vezi Produse →
        </Link>
        <Link
          href="/PoliticaCookie"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Politica de Cookie →
        </Link>
        <Link
          href="/PoliticaGDPR"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Politica GDPR →
        </Link>
        <Link
          href="/Contact"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Contact →
        </Link>
      </div>
    </div>

        {
    loading ? (
      <div className="text-center py-12">
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Se încarcă produsele...
        </p>
      </div>
    ) : error ? (
      <div className="text-center py-12">
        <p className="text-lg text-red-600 dark:text-red-400">
          Eroare: {error}
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow"
          >
            {product.image && (
              <div className="mb-4 w-full aspect-square relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">
              {product.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-black dark:text-zinc-50">
              {product.price} {product.currency}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Adaugă în coș
            </button>
          </div>
        ))}
      </div>

    )
  }
      </main >
    </div >
  );
}
