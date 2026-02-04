"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/Product";

const MARTURII: Product[] = [
  {
    id: "marturii-1",
    name: "Mărturie 1",
    price: 40,
    currency: "RON",
    scent: "neutru",
    wax: "soia",
    burnTimeHours: 20,
    sizeGrams: 180,
    inStock: true,
    image: "/marturii1.jpeg",
    description: "Mărturie decorativă, handmade.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "marturii-2",
    name: "Mărturie 2",
    price: 50,
    currency: "RON",
    scent: "neutru",
    wax: "soia",
    burnTimeHours: 22,
    sizeGrams: 200,
    inStock: true,
    image: "/marturii2.jpeg",
    description: "Mărturie decorativă, handmade.",
    createdAt: new Date().toISOString(),
  },
];

export default function Marturii() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#F6F4F1] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="btn-back mb-8">
          ← Înapoi la Homepage
        </Link>

        <h1 className="text-4xl font-bold text-zinc-900 mb-4">
          Mărturii
        </h1>

        <p className="text-lg text-zinc-600 mb-8">
          Aici vei găsi toate mărturiile noastre.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {MARTURII.map((product) => (
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
      </div>
    </div>
  );
}
