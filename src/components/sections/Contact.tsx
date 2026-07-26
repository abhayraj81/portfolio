"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Github, Phone } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { personal } from "@/lib/data";

const links = [
  { label: "Email", value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  {
    label: "LinkedIn",
    value: personal.linkedinLabel,
    href: personal.linkedin,
    icon: Linkedin,
  },
  { label: "GitHub", value: personal.githubLabel, href: personal.github, icon: Github },
  { label: "Phone", value: personal.phone, href: `tel:${personal.phone}`, icon: Phone },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-[var(--color-border)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--color-teal)] uppercase">
          <span className="text-[var(--color-text-dim)]">06</span>
          <span className="h-px w-8 bg-[var(--color-teal)]/50" />
          Contact
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
        >
          Let&apos;s build something that has to work correctly the first time.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton href={`mailto:${personal.email}`} variant="primary">
            Say Hello
            <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton href={personal.resumeFile} variant="ghost">
            Download Resume
          </MagneticButton>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-cursor-active
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col gap-3 bg-[var(--color-surface)] p-6 transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              <l.icon size={18} className="text-[var(--color-teal)]" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dim)]">
                  {l.label}
                </p>
                <p className="mt-1 truncate text-sm text-[var(--color-text)] group-hover:text-[var(--color-teal)]">
                  {l.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
