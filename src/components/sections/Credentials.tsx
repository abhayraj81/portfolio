"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { certifications, education } from "@/lib/data";

export default function Credentials() {
  return (
    <section
      id="credentials"
      className="relative scroll-mt-24 border-t border-[var(--color-border)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" eyebrow="Credentials" title="Certifications & education." />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
              <Award size={14} className="text-[var(--color-teal)]" />
              Certifications
            </div>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-teal)]/40 hover:bg-[var(--color-surface-hover)] hover:shadow-[0_8px_30px_-12px_var(--color-teal-dim)]"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)] sm:text-[15px]">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                      {cert.issuer}
                      {cert.note ? ` · ${cert.note}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-[var(--color-teal)]">
                    {cert.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
              <GraduationCap size={14} className="text-[var(--color-teal)]" />
              Education
            </div>
            <div className="space-y-3">
              {education.map((ed, i) => (
                <Reveal key={ed.id} delay={i * 0.06}>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-teal)]/40 hover:bg-[var(--color-surface-hover)] hover:shadow-[0_8px_30px_-12px_var(--color-teal-dim)]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-[var(--color-text)] sm:text-[15px]">
                        {ed.degree}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dim)]">
                        {ed.period}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">{ed.school}</p>
                    {ed.detail && (
                      <p className="mt-2 text-xs text-[var(--color-text-dim)]">{ed.detail}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
