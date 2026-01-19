import Link from "next/link";

export default function DespreNoi() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Despre Noi
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Suntem o echipa de 3 persoane care se ocupa de lumânari!
        </p>
        <Link 
          href="/"
        >
          ← Înapoi la Homepage
        </Link>
      </main>
    </div>
  );
}