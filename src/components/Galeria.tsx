import { useState } from "react";
import { fotos, textos } from "@/config";

// Una foto con respaldo rosado si falla la carga
function Foto({ src, i }: { src: string; i: number }) {
  const [error, setError] = useState(false);
  return (
    <div className="shadow-soft aspect-square overflow-hidden rounded-2xl bg-secondary transition-transform duration-300 hover:-translate-y-1 hover:rotate-1">
      {error ? (
        <div className="flex h-full w-full items-center justify-center text-5xl text-primary">❤</div>
      ) : (
        <img
          src={src}
          alt={`Nosotros ${i + 1}`}
          loading="lazy"
          onError={() => setError(true)}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      )}
    </div>
  );
}

export function Galeria() {
  return (
    <section className="reveal mx-auto w-full max-w-5xl px-4">
      <h2 className="mb-6 text-center font-script text-5xl text-primary sm:text-6xl">{textos.tituloGaleria}</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {fotos.map((src, i) => (
          <Foto key={i} src={src} i={i} />
        ))}
      </div>
    </section>
  );
}
