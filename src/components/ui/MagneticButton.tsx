"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  target,
  rel,
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: "primary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
    variant === "primary" &&
      "bg-[var(--color-teal)] text-[var(--color-bg)] hover:bg-[var(--color-teal)]/90",
    variant === "ghost" &&
      "border border-[var(--color-border-hover)] text-[var(--color-text)] hover:border-[var(--color-teal)]/60 hover:text-[var(--color-teal)]",
    className
  );

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref as never}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={classes}
      data-cursor-active
      {...rest}
    >
      {/* shine sweep */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] transition-transform duration-700 ease-out group-hover:translate-x-[120%]",
          variant === "primary"
            ? "bg-gradient-to-r from-transparent via-white/40 to-transparent"
            : "bg-gradient-to-r from-transparent via-[var(--color-teal)]/10 to-transparent"
        )}
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Comp>
  );
}
