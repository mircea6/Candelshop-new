"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  { image: "/Slide1.png", link: "/produse", alt: "Slide 1" },
  { image: "/Slide2.png", link: "/produse", alt: "Slide 2" },
  { image: "/Slide3.png", link: "/produse", alt: "Slide 3" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const goPrev = () => {
    setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  const goNext = () => {
    setCurrent((i) => (i + 1) % SLIDES.length);
  };
  return (
    <section className="relative w-full h-screen min-h-[400px] overflow-hidden bg-[#EEECE8]
      -mt-14 sm:-mt-16 md:-mt-20 lg:-mt-24 xl:-mt-52">
      {/* Container pentru toate slide-urile – mesajul e în prima slide și pleacă odată cu poza */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {/* Prima slide: imagine + mesaj „Bine ai venit” (se mișcă împreună) */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Link href={SLIDES[0].link} className="block w-full h-full relative">
            <Image
              src={SLIDES[0].image}
              alt={SLIDES[0].alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized
            />
          </Link>
          <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
            <div className="bg-[#EEECE8]/85 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 rounded-xl shadow-lg max-w-[90vw] border border-[#E0DDD8]/80 backdrop-blur-sm">
              <h1 className="font-bold text-zinc-900 text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                Bine ai venit în magazinul nostru!
              </h1>
            </div>
          </div>
        </div>

        {/* Slide 2 și 3 */}
        {SLIDES.slice(1).map((slide, index) => (
          <Link
            key={index + 1}
            href={slide.link}
            className="block w-full h-full relative flex-shrink-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          </Link>
        ))}
      </div>

      {/* Săgeata stânga */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Slide anterior"
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black transition-colors shadow-lg touch-manipulation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Săgeata dreapta */}
      <button
        type="button"
        onClick={goNext}
        aria-label="Slide următor"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black transition-colors shadow-lg touch-manipulation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </section>
  );
}