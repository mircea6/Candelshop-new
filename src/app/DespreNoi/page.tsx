import Link from "next/link";

export default function DespreNoi() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#F6F4F1] px-4 pb-24
        pt-14 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-52
        -mt-14 sm:-mt-16 md:-mt-20 lg:-mt-24 xl:-mt-52"
    >
      {/* Video fundal: acoperă tot spațiul inclusiv zona de sub navbar; object-cover = responsive pe toate ecranele */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover opacity-[0.28]"
        aria-hidden
      >
        <source src="/loop-desprenoi.mp4" type="video/mp4" />
        <source src="/loop-desprenoi.mov" type="video/quicktime" />
      </video>

      {/* Pas 2: Conținutul pe un strat de deasupra (z-10) cu fundal ușor transparent pentru lizibilitate */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-[#F6F4F1]/90 backdrop-blur-sm rounded-lg px-6 py-8 shadow-sm">
          <Link href="/" className="btn-back mb-8">
          ← Înapoi la Homepage
        </Link>

        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-zinc-900 mb-8">
          Despre Noi
        </h1>

        <div className="prose prose-lg lg:prose-xl max-w-none text-zinc-700 space-y-6 [&_p]:text-base lg:[&_p]:text-xl xl:[&_p]:text-2xl">
          <p className="text-xl lg:text-2xl xl:text-3xl font-semibold text-zinc-900">
            Candle Story – când frumusețea întâlnește aroma
          </p>

          <p>
            La Candle Story, fiecare lumânare este mai mult decât un obiect decorativ. Este o stare, o emoție și o poveste spusă prin lumină și parfum. Credem în frumusețea lucrurilor create cu răbdare, în detalii care nu sar imediat în ochi, dar care se simt. De aceea, fiecare creație Candle Story pornește din dorința de a aduce echilibru, liniște și eleganță în viața de zi cu zi.
          </p>

          <p>
            Povestea noastră a început din pasiunea pentru frumos și din nevoia de a crea obiecte care să ofere mai mult decât utilitate. Am transformat această pasiune într-un univers olfactiv atent construit, unde designul rafinat se îmbină armonios cu arome alese cu grijă, menite să încânte simțurile și să creeze atmosfere memorabile.
          </p>

          <p>
            Ne dorim ca fiecare lumânare Candle Story să spună o poveste — o poveste despre momentele mici care contează, despre pauze bine-meritate, despre seri liniștite, despre emoții autentice. Fie că este aprinsă într-un moment de relaxare, oferită cadou sau aleasă pentru un eveniment special, o lumânare Candle Story devine parte din experiența ta.
          </p>

          <p>
            Toate produsele noastre sunt realizate manual, în atelierul nostru, cu atenție și respect pentru proces. Folosim ceară de soia 100% naturală, aleasă pentru calitatea sa superioară și pentru modul în care redă fidel aromele. Turnarea manuală ne permite să controlăm fiecare detaliu și să ne asigurăm că fiecare lumânare respectă standardele noastre de calitate, estetică și durabilitate.
          </p>

          <p>
            Pentru noi, estetica nu este doar un aspect vizual, ci o stare. Formele, texturile și liniile fiecărei lumânări sunt gândite astfel încât să completeze armonios orice spațiu, transformându-l într-un loc mai cald, mai personal și mai echilibrat. Ne inspirăm din natură, din simplitate și din eleganța atemporală, pentru a crea obiecte care nu se demodează și care rămân relevante în timp.
          </p>

          <p>
            Candle Story este despre emoție, despre reconectare cu sinele și despre bucuria de a trăi conștient fiecare moment. Este despre cadouri cu semnificație, despre mărturii care spun ceva fără cuvinte și despre mici ritualuri zilnice care aduc liniște și inspirație.
          </p>

          <p>
            Indiferent dacă îți dorești să creezi o atmosferă specială în casa ta, să oferi un cadou cu adevărat personal sau să marchezi un eveniment important, Candle Story este alegerea celor care caută mai mult decât o lumânare. Este alegerea celor care caută o poveste.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}