import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Homepage - Magazin Lumânări
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Bine ai venit în magazinul nostru!
        </p>

        <Link 
          href="/DespreNoi"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Despre Noi →
        </Link>
        {/* Buton pentru a naviga la pagina de produse */}
        <Link 
          href="/produse"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Vezi Produse →
        </Link>
        <Link 
          href="/PoliticaCookie"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Politica de Cookie →
        </Link>
        <Link 
          href="/PoliticaGDPR"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Politica GDPR →
        </Link>
        <Link 
          href="/Contact"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Contact →
        </Link>
      </main>
    </div>
  );
}
