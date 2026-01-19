import Link from "next/link";

export default function PoliticaCookie() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Politica de Cookie
        </h1>
        <p>
            Acesta este un site de test si nu are o politica de cookie momentan!
        </p>
        <Link href="/">
        ← Înapoi la Homepage
        </Link>
      </main>
    </div>
  );
}