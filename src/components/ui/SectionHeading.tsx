"use client";

import { motion } from "framer-motion";

const wipe = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SectionHeading({
  index,
  title,
  eyebrow,
  description,
}: {
  index: string;
  title: string;
  eyebrow: string;
  description?: string;
}) {
  return (
    <div className="relative mb-14 md:mb-20">
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -top-10 -left-1 select-none text-[7rem] font-semibold leading-none text-[var(--color-text)]/[0.035] sm:-top-14 sm:text-[10rem] md:-top-16 md:text-[12rem]"
      >
        {index}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--color-teal)] uppercase"
      >
        <span className="text-[var(--color-text-dim)]">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="h-px w-8 origin-left bg-[var(--color-teal)]/50"
        />
        {eyebrow}
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={wipe}
        className="font-display relative mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mt-4 max-w-xl text-[var(--color-text-muted)]"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
