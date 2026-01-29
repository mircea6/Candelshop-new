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
        <section className="relative w-full h-screen min-h-[320px] overflow-hidden bg-zinc-200">
          {/* Imaginea curentă – click duce la link */}
          <Link href={SLIDES[current].link} className="block w-full h-full relative">
            <Image
              src={SLIDES[current].image}
              alt={SLIDES[current].alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized
            />
          </Link>
    
          {/* Săgeata stânga */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Slide anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
    
          {/* Săgeata dreapta */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Slide următor"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </section>
      );
    }