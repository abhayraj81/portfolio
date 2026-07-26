"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";
import { scrollToId, scrollToTop, stopScroll, startScroll } from "@/lib/lenis";
import ScrollProgress from "@/components/ui/ScrollProgress";

const links = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeAndRestoreFocus = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Lock background scroll (both native + Lenis) while the mobile menu is open,
  // make the rest of the page inert so focus/AT can't escape the panel,
  // close on Escape, and return focus to the toggle button on close.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      stopScroll();
      const mainEl = document.querySelector("main");
      const footerEl = document.querySelector("footer");
      const sideRailEl = document.querySelector("[data-side-rail]");
      mainEl?.setAttribute("inert", "");
      footerEl?.setAttribute("inert", "");
      sideRailEl?.setAttribute("inert", "");
      const id = requestAnimationFrame(() => firstLinkRef.current?.focus());
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeAndRestoreFocus();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(id);
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        startScroll();
        mainEl?.removeAttribute("inert");
        footerEl?.removeAttribute("inert");
        sideRailEl?.removeAttribute("inert");
      };
    }
  }, [open]);

  const handleClick = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <ScrollProgress />
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="group font-display text-sm font-semibold tracking-tight"
            data-cursor-active
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
              AR
            </span>
            <span className="text-[var(--color-teal)]">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  data-cursor-active
                  className={cn(
                    "group/link relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
                    active === link.id
                      ? "text-[var(--color-teal)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/link:scale-x-100",
                      active === link.id && "scale-x-0"
                    )}
                  />
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--color-teal)]/10 ring-1 ring-[var(--color-teal)]/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <a
            href={personal.resumeFile}
            download
            data-cursor-active
            className="group hidden items-center gap-1.5 rounded-full border border-[var(--color-border-hover)] px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--color-text)] transition-colors hover:border-[var(--color-teal)]/60 hover:text-[var(--color-teal)] md:inline-flex"
          >
            Resume
            <Download
              size={12}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>

          <button
            ref={toggleRef}
            id="mobile-menu-toggle"
            className="-m-2.5 p-2.5 text-[var(--color-text)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu-panel"
            data-cursor-active
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)]/98 backdrop-blur-md md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <button
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={() => handleClick(link.id)}
                    className="font-display text-3xl font-medium text-[var(--color-text)]"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.06, duration: 0.4 }}
              >
                <a
                  href={personal.resumeFile}
                  download
                  className="mt-2 rounded-full bg-[var(--color-teal)] px-6 py-3 font-mono text-sm text-[var(--color-bg)]"
                >
                  Download Resume
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
