import { personal } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-[var(--color-text-dim)] sm:flex-row md:px-10">
        <p>
          © {new Date().getFullYear()} {personal.name}. Built with precision.
        </p>
        <p>Kanpur, India — {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
