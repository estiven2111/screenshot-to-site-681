import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { textos, VIDEO_URL } from "@/config";
import { FloatingHearts } from "@/components/FloatingHearts";

export const Route = createFileRoute("/si")({
  head: () => ({
    meta: [
      { title: "¡Dijo que sí! 💖" },
      { name: "description", content: "El comienzo de nuestra historia juntos." },
      { property: "og:title", content: "¡Dijo que sí! 💖" },
      { property: "og:description", content: "El comienzo de nuestra historia juntos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Respuesta,
});

// Vista de celebración
function Respuesta() {
  // Confeti y corazones al cargar
  useEffect(() => {
    let cancel = false;
    import("canvas-confetti").then(({ default: confetti }) => {
      const heart = confetti.shapeFromText({ text: "❤", scalar: 2 });
      const fin = Date.now() + 3000;
      const loop = () => {
        if (cancel) return;
        confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 } });
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 } });
        confetti({ particleCount: 3, shapes: [heart], scalar: 2, spread: 100, origin: { y: 0.4 } });
        if (Date.now() < fin) requestAnimationFrame(loop);
      };
      loop();
    });
    return () => { cancel = true; };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingHearts count={26} />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-10 px-4 py-16 text-center sm:py-24">
        <h1 className="animate-heartbeat font-script text-7xl text-primary sm:text-8xl">{textos.celebracionTitulo}</h1>
        <p className="text-xl leading-relaxed sm:text-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {textos.celebracionMensaje}
        </p>
        <div className="shadow-soft aspect-video w-full overflow-hidden rounded-2xl border-4 border-card bg-secondary">
          {VIDEO_URL ? (
            <iframe
              src={VIDEO_URL}
              title="Nuestra canción"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
              <span className="animate-heartbeat text-5xl">🎵</span>
              <p className="font-script text-3xl text-primary sm:text-4xl">{textos.videoPlaceholder}</p>
            </div>
          )}
        </div>
        <Link to="/" className="inline-flex min-h-12 items-center rounded-full px-6 text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
          ← {textos.botonVolver}
        </Link>
      </div>
    </main>
  );
}
