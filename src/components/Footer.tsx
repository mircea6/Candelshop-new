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
<footer id="footer" className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Logo + mesaj */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/logo-candelstore.jpg"
                alt="Logo"
                width={320}
                height={160}
                className="h-16 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Transformăm momentele simple în experiențe parfumate!
            </p>
          </div>

          {/* Link-uri utile */}
          <div>
            <h3 className="font-semibold text-black dark:text-zinc-50 mb-3">Link-uri utile</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/DespreNoi" className="hover:underline">Despre Noi</Link></li>
              <li><Link href="/Contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/PoliticaCookie" className="hover:underline">Politica Cookie</Link></li>
              <li><Link href="/PoliticaGDPR" className="hover:underline">Politica GDPR</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-black dark:text-zinc-50 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Telefon: 0767193920</li>
              <li>Email: contact@exemplu.ro</li>
              <li>Adresă: Bucuresti </li>
            </ul>
          </div>

          {/* Program de funcționare */}
          <div>
            <h3 className="font-semibold text-black dark:text-zinc-50 mb-3">Program de funcționare</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>L-V: 9:00-18:00</li>
              <li>Sâmbătă - Duminică: Închis</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-black dark:text-zinc-50 mb-3">Newsletter</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Abonează-te pentru oferte și noutăți.
            </p>
            {subscribed ? (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Mulțumim, te-ai abonat!</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email-ul tău"
                  required
                  className="flex-1 min-w-0 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shrink-0"
                >
                  Abonează-te
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}