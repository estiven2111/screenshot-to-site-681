import { useEffect, useState } from "react";

// Corazones flotando de fondo (generados en cliente para evitar desajustes de hidratación)
export function FloatingHearts({ count = 18 }: { count?: number }) {
  const [hearts, setHearts] = useState<{ left: number; size: number; dur: number; delay: number }[]>([]);
  useEffect(() => {
    setHearts(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        dur: 8 + Math.random() * 10,
        delay: Math.random() * 10,
      })),
    );
  }, [count]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="animate-float-up absolute -bottom-10 text-on-romance/70"
          style={{ left: `${h.left}%`, fontSize: h.size, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

// Hook para fade-in al hacer scroll
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
