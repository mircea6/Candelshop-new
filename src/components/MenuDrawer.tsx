"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type MenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  // Închide drawer-ul când se schimbă ruta
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Previne scroll când drawer-ul e deschis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePoliticaNoastra = () => {
    onClose();
    if (pathname === "/") {
      // Dacă suntem deja pe homepage, scroll la footer
      const footer = document.getElementById("footer");
      footer?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Dacă suntem pe altă pagină, mergem la homepage și apoi scroll
      router.push("/#footer");
    }
  };

  return (
    <>
      {/* Overlay (fundal întunecat) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer (meniul din stânga) */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header drawer cu buton închidere */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200">
          <h2 className="text-xl font-bold text-black">Meniu</h2>
          <button
            onClick={onClose}
            aria-label="Închide meniul"
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lista de linkuri */}
        <nav className="p-4">
          <ul className="space-y-2">
            {/* Despre Noi */}
            <li>
              <Link
                href="/DespreNoi"
                className="block px-4 py-3 rounded-lg hover:bg-zinc-100 transition-colors text-black font-medium"
              >
                Despre Noi
              </Link>
            </li>

            {/* Produse (cu submeniu) */}
            <li>
              <button
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-zinc-100 transition-colors text-black font-medium"
              >
                <span>Produse</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transform transition-transform ${submenuOpen ? "rotate-90" : ""}`}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              {submenuOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/produse/lumanari-parfumate"
                      className="block px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-700"
                    >
                      Lumânări Parfumate
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/produse/odorizante"
                      className="block px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-700"
                    >
                      Odorizante
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/produse/marturii"
                      className="block px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-700"
                    >
                      Mărturii
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Contact */}
            <li>
              <Link
                href="/Contact"
                className="block px-4 py-3 rounded-lg hover:bg-zinc-100 transition-colors text-black font-medium"
              >
                Contact
              </Link>
            </li>

            {/* Politica Noastră */}
            <li>
              <button
                onClick={handlePoliticaNoastra}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-100 transition-colors text-black font-medium"
              >
                Politica Noastră
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}