"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="footer" className="bg-zinc-800 text-white">
      {/* Secțiune 1: Newsletter - bară full width */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-zinc-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white mb-1">Newsletter</h3>
            <p className="text-sm text-zinc-400">Abonează-te pentru oferte și noutăți.</p>
          </div>
          <div className="flex-1 md:max-w-md md:ml-auto flex gap-2">
            {subscribed ? (
              <p className="text-sm text-green-400 font-medium py-2">Mulțumim, te-ai abonat!</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email-ul tău"
                  required
                  className="flex-1 min-w-0 px-3 py-2 rounded border border-zinc-600 bg-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium shrink-0"
                >
                  Abonează-te
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Secțiune 2: Coloane - Logo, Link-uri, Contact, Program */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + slogan */}
          <div>
            <Link href="/" className="inline-block mb-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Image src="/logo-candelstore.jpg" alt="Logo" width={200} height={100} className="h-12 w-auto object-contain" unoptimized />
            </Link>
            <p className="text-sm text-zinc-400">Transformăm momentele simple în experiențe parfumate!</p>
          </div>
          {/* Link-uri utile */}
          <div>
            <h3 className="font-semibold text-white mb-3">Link-uri utile</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/DespreNoi" className="hover:text-white transition-colors">Despre Noi</Link></li>
              <li><Link href="/Contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/PoliticaCookie" className="hover:text-white transition-colors">Politica Cookie</Link></li>
              <li><Link href="/PoliticaGDPR" className="hover:text-white transition-colors">Politica GDPR</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Telefon: 0767193920</li>
              <li>Email: contact@exemplu.ro</li>
              <li>Adresă: București</li>
            </ul>
          </div>
          {/* Program */}
          <div>
            <h3 className="font-semibold text-white mb-3">Program de funcționare</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>L-V: 9:00-18:00</li>
              <li>Sâmbătă - Duminică: Închis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rând: mesaj stânga, linkuri SOL/ANPC + copyright dreapta (pe aceeași linie) */}
      <div className="border-t border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <p className="text-sm sm:text-base text-zinc-300 order-2 lg:order-1 shrink-0">
              © Candle Store 2025– Made With ❤️!
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 order-1 lg:order-2 lg:justify-end">
              {/* SOL - Soluționarea online a litigiilor (stil ca în prima poză) */}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-blue-800 bg-white text-blue-800 hover:bg-blue-50 transition-colors w-full sm:w-auto sm:min-w-[220px]"
              >
                <span className="text-sm font-bold uppercase text-center leading-tight mb-3 tracking-wide">
                  Soluționarea online a litigiilor
                </span>
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-800 text-white text-xs font-bold uppercase border border-blue-800">
                  Detalii
                </span>
              </a>
              {/* ANPC - Soluționarea alternativă a litigiilor (stil ca în prima poză) */}
              <a
                href="https://reclamatiisal.anpc.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-blue-800 bg-white text-blue-800 hover:bg-blue-50 transition-colors w-full sm:w-auto sm:min-w-[240px]"
              >
                <span className="text-sm font-bold uppercase text-center leading-tight mb-3 tracking-wide">
                  ANPC – Soluționarea alternativă a litigiilor
                </span>
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-800 text-white text-xs font-bold uppercase border border-blue-800">
                  Detalii
                </span>
              </a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}