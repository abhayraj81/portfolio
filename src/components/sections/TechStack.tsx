"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { skillGroups } from "@/lib/data";

export default function TechStack() {
  return (
    <section
      id="stack"
      className="relative scroll-mt-24 border-t border-[var(--color-border)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Toolbox"
          title="What I build with."
          description="Grouped by where each tool sits in the stack — from language to deployment."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors duration-300 hover:border-[var(--color-teal)]/40">
                <h3 className="relative flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-teal)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--color-teal)]" />
                  {group.label}
                </h3>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.08 + i * 0.03 }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="cursor-default rounded-full border border-[var(--color-border-hover)] bg-[var(--color-bg)] px-3 py-1.5 text-sm text-[var(--color-text)] shadow-[0_0_0_0_var(--color-teal-dim)] transition-[color,border-color,box-shadow] duration-300 hover:border-[var(--color-teal)]/60 hover:text-[var(--color-teal)] hover:shadow-[0_0_16px_2px_var(--color-teal-dim)]"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
