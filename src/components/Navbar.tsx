"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import MenuDrawer from "./MenuDrawer";

export default function Navbar() {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200"
        >
            <div className="max-w-7xl mx-auto px-2 h-32 flex items-center justify-between">
                {/* Stânga: meniu hamburger */}
                <div className="w-5 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Deschide meniul"
                        className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                        </svg>
                    </button>
                </div>
                {/* Centru: logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo-candelstore.jpg"
                        alt="Logo magazin"
                        width={280}
                        height={120}
                        className="h-20 w-auto object-contain"
                        unoptimized
                    />
                </Link>
                {/* Dreapta: social, telefon, coș */}
                <div className="w-5 flex items-center justify-end gap-2">
                    <a
                        href="https://instagram.com"
                        target="https://www.instagram.com/candle_stories_handmade?igsh=ZGc5NHhnZ3pycWNp"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>

                    <a
                        href="https://tiktok.com"
                        target="https://www.tiktok.com/@candle_stories_handmade?_r=1&_t=ZN-93Rj79ibRCA"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                        className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                    </a>

                    <a
                        href="https://wa.me/40767193920"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Sună pe WhatsApp"
                        className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </a>

                    <Link
                        href="/cart"
                        aria-label={`Coș: ${totalItems} produse`}
                        className="relative p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
            <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}