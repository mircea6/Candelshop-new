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
    <section className="relative w-full h-[50vh] min-h-[240px] sm:h-[60vh] sm:min-h-[320px] md:h-[70vh] lg:h-screen overflow-hidden bg-zinc-200">
      {/* Container pentru toate slide-urile - se translatează pe orizontală */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <Link
            key={index}
            href={slide.link}
            className="block w-full h-full relative flex-shrink-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
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