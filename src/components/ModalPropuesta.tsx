import { useEffect, useState } from "react";
import { textos } from "@/config";

type Props = { abierto: boolean; onSi: () => void; onNo: () => void };

const ESCAPES = 3;

// Modal propio con el botón "No" que se escapa 3 veces
export function ModalPropuesta({ abierto, onSi, onNo }: Props) {
  const [intentosNo, setIntentosNo] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  // Reiniciar contador y posición cada vez que se abre
  useEffect(() => {
    if (abierto) {
      setIntentosNo(0);
      setPos(null);
    }
  }, [abierto]);

  // Mueve el botón a una posición aleatoria visible dentro del viewport
  const escapar = () => {
    const w = window.innerWidth, h = window.innerHeight;
    const bw = 120, bh = 56, m = 16;
    setPos({ x: m + Math.random() * (w - bw - m * 2), y: m + Math.random() * (h - bh - m * 2) });
    setIntentosNo((n) => n + 1);
  };

  const intentarNo = (e: React.SyntheticEvent) => {
    if (intentosNo < ESCAPES) {
      e.preventDefault();
      escapar();
    }
  };

  const clickNo = (e: React.MouseEvent) => {
    if (intentosNo < ESCAPES) return intentarNo(e);
    onNo();
  };

  if (!abierto) return null;

  const btnNo = "min-h-12 min-w-28 rounded-full border-2 border-primary bg-card px-8 text-lg font-semibold text-primary";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="shadow-soft w-full max-w-md rounded-3xl bg-card p-8 text-center animate-in zoom-in-95">
        <div className="animate-heartbeat mb-2 text-5xl">💖</div>
        <h2 className="mb-8 font-script text-4xl text-primary sm:text-5xl">{textos.pregunta}</h2>
        <div className="flex min-h-14 items-center justify-center gap-4">
          <button onClick={onSi} className="btn-love min-h-12 min-w-28 rounded-full px-8 text-lg font-semibold">
            {textos.botonSi}
          </button>
          {!pos && (
            <button onMouseEnter={intentarNo} onTouchStart={intentarNo} onClick={clickNo} className={btnNo}>
              {textos.botonNo}
            </button>
          )}
        </div>
      </div>
      {pos && (
        <button
          onMouseEnter={intentarNo}
          onTouchStart={intentarNo}
          onClick={clickNo}
          className={`${btnNo} fixed z-[60] shadow-soft transition-all duration-300 ease-out`}
          style={{ left: pos.x, top: pos.y }}
        >
          {textos.botonNo}
        </button>
      )}
    </div>
  );
}
