import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { textos } from "@/config";
import { FloatingHearts, useReveal } from "@/components/FloatingHearts";
import { Galeria } from "@/components/Galeria";
import { Carta } from "@/components/Carta";
import { ModalPropuesta } from "@/components/ModalPropuesta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Para ti, mi amor 💕" },
      { name: "description", content: "Una carta y una pregunta muy especial, hecha con todo mi cariño." },
      { property: "og:title", content: "Para ti, mi amor 💕" },
      { property: "og:description", content: "Una carta y una pregunta muy especial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

// Vista principal
function Home() {
  useReveal();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  // Al decir "No": cerrar modal, mostrar alerta y volver a abrir
  const manejarNo = async () => {
    setAbierto(false);
    const Swal = (await import("sweetalert2")).default;
    await Swal.fire({
      title: textos.alertaTitulo,
      text: textos.alertaTexto,
      icon: "error",
      confirmButtonText: textos.alertaBoton,
      confirmButtonColor: "oklch(0.6 0.19 15)",
    });
    setAbierto(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 flex flex-col gap-16 pb-20 sm:gap-20">
        <header className="reveal px-4 pt-16 text-center sm:pt-24">
          <h1 className="font-script text-6xl text-primary sm:text-7xl lg:text-8xl">{textos.bienvenida}</h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">{textos.subtitulo}</p>
        </header>
        <Galeria />
        <Carta />
        <div className="reveal flex justify-center px-4">
          <button onClick={() => setAbierto(true)} className="btn-love animate-heartbeat min-h-14 rounded-full px-10 text-xl font-semibold">
            {textos.botonRespuesta} 💌
          </button>
        </div>
      </div>
      <ModalPropuesta abierto={abierto} onSi={() => navigate({ to: "/si" })} onNo={manejarNo} />
    </main>
  );
}
