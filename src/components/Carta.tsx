import { textos } from "@/config";

// Carta de amor con estilo de papel
export function Carta() {
  return (
    <section className="reveal mx-auto w-full max-w-2xl px-4">
      <article className="paper shadow-soft relative rounded-2xl border border-gold/40 px-6 py-10 sm:px-12">
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-4xl">💌</span>
        <h2 className="mb-4 text-center font-script text-4xl text-primary sm:text-5xl">{textos.tituloCarta}</h2>
        <p className="text-lg leading-8 sm:text-xl">{textos.carta}</p>
        <p className="mt-6 text-right font-script text-3xl text-primary">{textos.firma}</p>
      </article>
    </section>
  );
}
