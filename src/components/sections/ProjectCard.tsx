"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { projects } from "@/lib/data";

type Project = (typeof projects)[number];

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isDeep = project.depth === "deep";
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), spring);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), spring);
  const spotX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotY = useTransform(mouseY, (v) => `${v * 100}%`);

  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-colors duration-300 hover:border-[var(--color-teal)]/40 sm:p-10"
    >
      {/* cursor-tracked spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(480px circle at ${x} ${y}, var(--color-teal-dim), transparent 70%)`
          ),
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--color-teal)]/[0.06] blur-[80px] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        aria-hidden
      />

      <div
        style={{ transform: "translateZ(24px)", transformStyle: "preserve-3d" }}
        className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
            {project.subtitle} · {project.period}
          </p>
          <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-active
          className="group/link relative inline-flex shrink-0 items-center gap-2 self-start overflow-hidden rounded-full border border-[var(--color-border-hover)] px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[var(--color-text)] transition-colors duration-300 hover:border-[var(--color-teal)]/60 hover:text-[var(--color-bg)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[var(--color-teal)] transition-transform duration-300 ease-out group-hover/link:translate-x-0" />
          <span className="relative">{project.linkLabel}</span>
          <ArrowUpRight
            size={14}
            className="relative transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      </div>

      {isDeep ? (
        <div
          style={{ transform: "translateZ(16px)" }}
          className="relative mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3"
        >
          {project.points.map((p, i) => (
            <div
              key={p.label}
              className="group/point relative bg-[var(--color-bg)] p-5 transition-colors duration-300 hover:bg-[var(--color-surface-hover)]"
            >
              <span
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--color-teal)] transition-transform duration-500 group-hover/point:scale-x-100"
                style={{ transitionDelay: `${i * 40}ms` }}
              />
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-teal)]">
                {p.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <ul
          style={{ transform: "translateZ(16px)" }}
          className="relative mt-8 space-y-2 border-t border-[var(--color-border)] pt-6"
        >
          {project.points.map((p) => (
            <li key={p.label} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-coral)]" />
              <span>
                <span className="text-[var(--color-text)]">{p.label}:</span> {p.detail}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
