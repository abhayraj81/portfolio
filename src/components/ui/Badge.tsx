import { cn } from "@/lib/utils";

export default function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "coral";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-wide transition-colors",
        variant === "default" &&
          "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-teal)]/50 hover:text-[var(--color-teal)]",
        variant === "coral" &&
          "border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral)]",
        className
      )}
    >
      {children}
    </span>
  );
}
