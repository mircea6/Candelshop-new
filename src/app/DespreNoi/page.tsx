import Link from "next/link";

export default function DespreNoi() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:underline dark:text-blue-400">
          ← Înapoi la Homepage
        </Link>
        
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-8">
          Despre Noi
        </h1>
        
        <div className="prose prose-lg max-w-none text-zinc-700 dark:text-zinc-300 space-y-6">
          <p className="text-xl font-semibold text-black dark:text-zinc-50">
            Candle Story – când frumusețea întâlnește aroma
          </p>
          
          <p>
            La Candle Story, fiecare creație spune o poveste. O poveste despre echilibru, eleganță și bucuria micilor momente care dau sens fiecărei zile.
          </p>
          
          <p>
            Am transformat pasiunea pentru frumos într-un univers olfactiv unic, unde designul rafinat se împletește cu mirosuri ce încântă simțurile. De ce Candle Story? Pentru că ne dorim ca lumânările noastre să fie mai mult decât simple obiecte: să spună o poveste și să ofere emoție, relaxare și inspirație.
          </p>
          
          <p>
            Fiecare lumânare este turnată manual, cu atenție și grijă, pentru a aduce liniște, magie și momente speciale în spațiul tău.
          </p>
          
          <p>
            Indiferent dacă alegi un cadou, o mărturie pentru un eveniment sau vrei să te răsfeți, Candle Story este despre emoție, estetic și reconectare cu sinele.
          </p>
        </div>
      </div>
    </div>
  );
}