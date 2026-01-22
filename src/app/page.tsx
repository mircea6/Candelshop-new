"use client";

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";


export default function Home() {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
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

        {loading ? (
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
              </div>
            ))}
          </div>
          
        )}
      </main>
    </div>
  );
}
