"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/ui/Loader";
import SideRail from "@/components/ui/SideRail";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Credentials from "@/components/sections/Credentials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Safety net: never let a loader animation failure permanently lock the page.
  useEffect(() => {
    if (loaded) return;
    const fallback = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(fallback);
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-[var(--color-teal)] px-4 py-2 font-mono text-xs font-medium text-[var(--color-bg)] transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div inert={!loaded}>
        <Navbar />
        <SideRail />
        <main id="main-content">
          <Hero />
          <Marquee />
          <About />
          <TechStack />
          <Experience />
          <Projects />
          <Credentials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
