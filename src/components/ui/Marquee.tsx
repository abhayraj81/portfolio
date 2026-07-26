const words = [
  "JAVA",
  "SPRING BOOT",
  "REST APIS",
  "PYTHON",
  "MYSQL",
  "MONGODB",
  "JAVASCRIPT",
  "SPRING DATA JPA",
  "GIT",
  "FIREBASE",
];

export default function Marquee() {
  const loop = [...words, ...words];

  return (
    <div className="relative overflow-hidden border-y border-[var(--color-border)] py-5" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

      <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-10 motion-reduce:animate-none">
        {loop.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-10 font-mono text-sm tracking-[0.25em] text-[var(--color-text-dim)]"
          >
            {word}
            <span className="text-[var(--color-teal)]">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
