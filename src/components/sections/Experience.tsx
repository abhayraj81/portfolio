"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative scroll-mt-24 border-t border-[var(--color-border)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="On the workbench, then in the codebase."
        />

        <div ref={containerRef} className="relative pl-10 sm:pl-14">
          <svg
            className="absolute left-0 top-0 h-full w-6 sm:w-8"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              className="stroke-[var(--color-border-hover)]"
              strokeWidth="2"
            />
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              className="stroke-[var(--color-teal)]"
              strokeWidth="2"
            />
          </svg>

          <div className="space-y-16">
            {experience.map((role, i) => (
              <Reveal key={role.id} delay={i * 0.1} className="relative">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.1 + 0.1 }}
                  className="absolute -left-10 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-teal)] shadow-[0_0_0_4px_var(--color-teal-dim)] sm:-left-14"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-teal)] opacity-40 [animation-duration:2.5s]" />
                </motion.span>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{role.role}</h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
                    {role.start} — {role.end}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--color-teal)]">
                  {role.org} · {role.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {role.points.map((p, pi) => (
                    <li
                      key={pi}
                      className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-[15px]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-dim)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
