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
      backgroundImage: "/Background-Cards.png",
      content: (
        <div className="flex items-center justify-center gap-4 sm:gap-6 h-full w-full px-4">
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 relative">
            <Image
              src="/Icon-handmade-removebg-preview.png"
              alt="Handmade"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight text-center max-w-md">
            Lumanari handmade realizate cu atentie si grija in atelierul nostru
          </h3>
        </div>
      ),
    },
    {
      title: "Produse realizate din ceara de soia naturala 100%",
      backgroundImage: "/Background-Cards.png",
      content: (
        <div className="flex items-center justify-center gap-4 sm:gap-6 h-full w-full px-4">
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 relative">
            <Image
              src="/Icon-soia-removebg-preview.png"
              alt="Handmade"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight text-center max-w-md">
            Produse realizate din ceara de soia naturala 100%
          </h3>
        </div>
      ),
    },
    {
      title: "Parfumanti de inalta calitate care persista si creaza o experienta unica",
      backgroundImage: "/Background-Cards.png",
      content: (
        <div className="flex items-center justify-center gap-4 sm:gap-6 h-full w-full px-4">
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 relative">
            <Image
              src="/Icon-aroma-removebg-preview.png"
              alt="Handmade"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight text-center max-w-md">
            Parfumanti de inalta calitate care persista si creaza o experienta unica          </h3>
        </div>
      ),
    },
  ];

  return (
    <div className="text-center">
      <HeroSlider />
      {/* Secțiune ScrollStack centrată sub Hero – butonul Despre noi în zona vizibilă sub carduri */}
      <section className="w-full flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-4xl">
          <ScrollStack
            cards={scrollStackCards}
            cardHeight="70vh"
            animationDuration="0.8s"
            sectionHeightMultiplier={4}
            className="mx-auto"
            backgroundColor="bg-transparent"
            bottomContent={
              <Link
                href="/DespreNoi"
                className="px-6 py-3.5 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full font-semibold text-white
                  bg-cover bg-center bg-no-repeat transition-transform duration-200 hover:scale-105
                  inline-flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[52px] touch-manipulation
                  text-base sm:text-lg md:text-xl"
                style={{ backgroundImage: "url('/Background-Cards.png')" }}
                aria-label="Mergi la pagina Despre noi"
              >
                Despre noi
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            }
          />
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 pb-6 sm:pb-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-bold text-zinc-900 mb-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            Cele mai vandute produse
          </h1>

        </div>

        {
          loading ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-base sm:text-lg text-zinc-600">
                Se încarcă produsele...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-base sm:text-lg text-red-600">
                Eroare: {error}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-transparent rounded-xl overflow-hidden p-2 sm:p-3
                    shadow-none hover:scale-[1.02] transition-all duration-200"
                >
                  {product.image && (
                    <div className="mb-2 sm:mb-3 w-full min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] aspect-3/4 relative overflow-hidden rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 text-zinc-900 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-zinc-900">
                    {product.price} {product.currency}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2.5 sm:py-3 border border-zinc-800 bg-white text-zinc-900 text-sm sm:text-base font-medium
                      hover:bg-zinc-800 hover:text-white transition-colors duration-200 touch-manipulation"
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
