"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scrollToId } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const sections = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function SideRail() {
  const [active, setActive] = useState("top");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.nav
      data-side-rail
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 12 }}
      transition={{ duration: 0.4 }}
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      aria-hidden={!visible}
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollToId(s.id)}
          data-cursor-active
          tabIndex={visible ? 0 : -1}
          className={cn(
            "group pointer-events-auto flex items-center gap-3 transition-opacity",
            visible ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-label={`Go to ${s.label}`}
        >
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:opacity-100",
              active === s.id ? "text-[var(--color-teal)]" : "text-[var(--color-text-dim)]"
            )}
          >
            {s.label}
          </span>
          <span
            className={cn(
              "block h-1.5 w-1.5 rounded-full border transition-all duration-300",
              active === s.id
                ? "scale-125 border-[var(--color-teal)] bg-[var(--color-teal)] shadow-[0_0_8px_var(--color-teal)]"
                : "border-[var(--color-border-hover)] bg-transparent group-hover:border-[var(--color-teal)]/60"
            )}
          />
        </button>
      ))}
    </motion.nav>
  );
}
