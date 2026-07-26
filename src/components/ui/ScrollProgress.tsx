"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-[var(--color-teal)] via-[var(--color-teal)] to-[var(--color-coral)]"
      aria-hidden
    />
  );
}
