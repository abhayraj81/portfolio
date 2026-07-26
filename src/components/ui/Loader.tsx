"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const id = requestAnimationFrame(() => {
        setSkip(true);
        onDone();
      });
      return () => cancelAnimationFrame(id);
    }

    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: onDone,
      });

      tl.set(rootRef.current, { display: "flex" })
        .from(".loader-line", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.7,
          stagger: 0.07,
        })
        .from(
          ".loader-letter",
          { yPercent: 120, opacity: 0, duration: 0.6, stagger: 0.035 },
          "-=0.45"
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1.15,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.floor(counter.value)).padStart(
                  3,
                  "0"
                );
              }
            },
          },
          "-=0.5"
        )
        .to(".loader-letter", { color: "#00D9B5", duration: 0.3, stagger: 0.015 }, "-=0.5")
        .to({}, { duration: 0.15 })
        .to(".loader-inner", { opacity: 0, duration: 0.35, ease: "power2.in" })
        .to(
          rootRef.current,
          {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.1"
        )
        .set(rootRef.current, { pointerEvents: "none", display: "none" });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip) return null;

  const word = "ABHAY RAJ".split("");

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[999] hidden flex-col items-center justify-center gap-8 bg-[var(--color-bg)]"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      <div className="loader-inner flex flex-col items-center gap-8">
        <div className="flex overflow-hidden font-display text-2xl font-semibold tracking-[0.2em] sm:text-4xl">
          {word.map((ch, i) => (
            <span key={i} className="loader-letter inline-block text-[var(--color-text)]">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        <div className="flex w-56 flex-col items-center gap-3">
          <div className="flex w-full flex-col gap-2">
            <span className="loader-line h-px w-full bg-[var(--color-teal)]/60" />
            <span className="loader-line h-px w-3/4 bg-[var(--color-border-hover)]" />
            <span className="loader-line h-px w-1/2 bg-[var(--color-border-hover)]" />
          </div>
          <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dim)]">
            <span>Loading</span>
            <span>
              <span ref={counterRef}>000</span>
              <span className="text-[var(--color-teal)]">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
