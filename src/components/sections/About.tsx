"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { label: "Program", value: "MCA, 2025–27" },
  { label: "Base", value: "Kanpur, IN" },
  { label: "Focus", value: "Java / Spring" },
  { label: "Status", value: "Open to roles" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="About" title="Two disciplines, one habit of precision." />

        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          <Reveal className="md:col-span-3" delay={0.05}>
            <div className="space-y-5 text-[15px] leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              <p>
                Before backend systems, there were machine tolerances. During an
                apprenticeship at the Indian Air Force Station in Kanpur, I operated
                CNC and Lathe machines and calibrated instruments on AN-32 aircraft —
                work where a fraction of a millimeter is the difference between
                correct and broken.
              </p>
              <p>
                That same standard now applies to the code I write. As an MCA
                student at Allenhouse Institute of Technology, I build layered REST
                APIs with Java, Spring Boot, and Spring Data JPA — with the same
                instinct for validation, tolerance, and things failing safely rather
                than silently.
              </p>
              <p>
                In between, I taught Guitar and Piano at Samarpan Sangeet Kala
                Academy — which turned out to be its own lesson in breaking complex
                systems into steps someone else can follow. I&apos;m currently deepening
                that foundation with Full Stack MERN training and looking for a
                Software Development or Technical Support Engineer role where
                precision is the job.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.15}>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
              {stats.map((s) => (
                <div key={s.label} className="bg-[var(--color-surface)] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dim)]">
                    {s.label}
                  </p>
                  <p className="font-display mt-2 text-lg font-medium">{s.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
