"use client";

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import HeroSlider from "@/components/HeroSlider";
import ScrollStack from "@/components/lightswind/scroll-stack";



export default function Home() {
  const { products, loading, error } = useProducts();
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const scrollStackCards = [
    {
      title: "Lumanari handmade realizate cu atentie si grija in atelierul nostru",
    },
    {
      title: "Produse realizate din ceara de soia naturala 100%",
      backgroundImage: "https://images.pexels.com/photos/6985136/pexels-photo-6985136.jpeg",
    },
    {
      title: "Parfumanti de inalta calitate care persista si creaza o experienta unica",

    },

  ];

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
        Bine ai venit în magazinul nostru!
      </h1>
      <HeroSlider />
      {/* Secțiune ScrollStack centrată sub Hero */}
      <section className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <ScrollStack
            cards={scrollStackCards}
            cardHeight="70vh"
            animationDuration="0.8s"
            sectionHeightMultiplier={4}
            className="mx-auto"
          />
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Cele mai vandute produse
          </h1>

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
      </main>
    </div >
  );
}
