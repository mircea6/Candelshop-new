import Link from "next/link";

export default function Produse() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F4F1] font-sans">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-zinc-900">
          Pagina de Produse
        </h1>
        <p className="text-lg text-zinc-600">
          Aici vei vedea toate produsele noastre
        </p>
        
        <Link href="/" className="btn-back">
          ← Înapoi la Homepage
        </Link>
      </main>
    </div>
  );
}
