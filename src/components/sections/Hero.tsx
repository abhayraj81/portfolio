"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import GridBackground from "@/components/ui/GridBackground";
import MagneticButton from "@/components/ui/MagneticButton";
import { heroWords, personal } from "@/lib/data";
import { scrollToId } from "@/lib/lenis";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const longestWord = Math.max(...heroWords.map((w) => w.length)) + 2; // buffer: "ch" is based on the "0" glyph, which is only an estimate for a proportional font

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % heroWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 md:px-10"
    >
      <GridBackground />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-teal)]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-teal)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-teal)]" />
          </span>
          Open to Software Development &amp; Technical Support roles
        </motion.div>

        <h1 className="font-display max-w-4xl text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Abhay Raj
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 flex flex-wrap items-baseline gap-x-4 text-[var(--color-text-muted)]"
          >
            builds
            <span
              className="relative inline-flex h-[1.1em] overflow-hidden align-bottom"
              style={{ width: `${longestWord}ch` }}
              aria-hidden="true"
            >
              {heroWords.map((word, i) => (
                <motion.span
                  key={word}
                  animate={{
                    y: i === wordIndex ? 0 : i < wordIndex ? "-110%" : "110%",
                    opacity: i === wordIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 whitespace-nowrap text-[var(--color-teal)]"
                >
                  {word}.
                </motion.span>
              ))}
            </span>
            <span className="sr-only">
              {heroWords.join(", ")}.
            </span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 max-w-xl text-[var(--color-text-muted)] sm:text-lg"
        >
          {personal.tagline} MCA student building layered REST APIs with Java
          &amp; Spring Boot — trained on precision hardware before precision code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("projects");
            }}
            variant="primary"
          >
            View Projects
            <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton href={`mailto:${personal.email}`} variant="ghost">
            Get in Touch
          </MagneticButton>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-text-dim)] md:flex"
        data-cursor-active
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
