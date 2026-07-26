"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      tx = (e.clientX / innerWidth - 0.5) * 18;
      ty = (e.clientY / innerHeight - 0.5) * 18;
    };

    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={gridRef}
        className="blueprint-grid absolute -inset-8 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-teal)]/[0.06] blur-[100px]" />
      <div className="absolute -bottom-40 -right-20 h-[40vmax] w-[40vmax] rounded-full bg-[var(--color-coral)]/[0.05] blur-[110px]" />
    </div>
  );
}
