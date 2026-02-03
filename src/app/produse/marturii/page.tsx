import Link from "next/link";

export default function Marturii() {
  return (
    <div className="min-h-screen bg-[#F6F4F1] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="btn-back mb-8">
          ← Înapoi la Homepage
        </Link>
        
        <h1 className="text-4xl font-bold text-zinc-900 mb-8">
          Mărturii
        </h1>
        
        <p className="text-lg text-zinc-600 mb-8">
          Aici vei găsi toate mărturiile noastre.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Produse vor fi afișate aici */}
        </div>
      </div>
    </div>
  );
}