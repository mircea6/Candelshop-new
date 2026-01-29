import Link from "next/link";

export default function Odorizante() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:underline dark:text-blue-400">
          ← Înapoi la Homepage
        </Link>
        
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-8">
          Odorizante
        </h1>
        
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Aici vei găsi toate odorizantele noastre.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Produse vor fi afișate aici */}
        </div>
      </div>
    </div>
  );
}