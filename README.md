# Abhay Raj — Developer Portfolio

A dark-mode, motion-driven developer portfolio built with Next.js 16, Tailwind CSS v4,
Framer Motion, and GSAP. Content is sourced directly from the resume — every stat, bullet,
and project detail in `src/lib/data.ts` maps to a real line on the CV.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 (CSS-based theme tokens in `globals.css`)
- **Animation:** Framer Motion (scroll reveals, hover/tap states, layout transitions)
  + GSAP / ScrollTrigger (intro loader sequence, scroll-scrubbed timeline line)
- **Smooth scroll:** Lenis, synced to GSAP's ticker
- **Fonts:** Space Grotesk (display), IBM Plex Sans (body), JetBrains Mono (labels/code) —
  self-hosted via `@fontsource`, no runtime calls to Google's font CDN
- **Icons:** lucide-react

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Folder structure

```
src/
  app/
    layout.tsx       Root layout: fonts, metadata/SEO, smooth-scroll provider
    page.tsx          Assembles all sections + intro loader
    globals.css        Design tokens (color, type) as Tailwind v4 @theme vars
    sitemap.ts / robots.ts
  components/
    layout/
      Navbar.tsx        Sticky nav, active-section highlighting, mobile menu
      Footer.tsx
      SmoothScroll.tsx  Lenis + GSAP ScrollTrigger sync
    sections/
      Hero.tsx, About.tsx, TechStack.tsx, Experience.tsx,
      Projects.tsx, ProjectCard.tsx, Credentials.tsx, Contact.tsx
    ui/
      SectionHeading.tsx, Badge.tsx, MagneticButton.tsx, Reveal.tsx,
      GridBackground.tsx, Cursor.tsx, Loader.tsx
  lib/
    data.ts   Single source of truth for all resume content
    utils.ts  cn() class-merging helper
public/
  Abhay_Raj_Resume.pdf   Wired to every "Download Resume" button
```

## Editing content

Everything text-based — name, links, skills, experience, projects, certifications,
education — lives in `src/lib/data.ts`. Change it there and it propagates everywhere
automatically; you should not need to touch component files to update copy.

## Design system

Tokens live in `src/app/globals.css` under `@theme inline`:

- Background `#0A0E14`, surface `#12161F`, border `#1E2430`
- Accent teal `#00D9B5`, accent coral `#FF6B4A`
- Text `#E8EAED` (primary) / `#8B92A3` (muted) / `#565D6E` (dim)

## Signature interaction details

A pass focused on the details that separate a template from a crafted site:

- **Lenis-synced navigation** — every scroll trigger (nav links, hero CTAs, side rail,
  logo) calls into a single Lenis instance via `src/lib/lenis.ts`, so momentum scroll
  and programmatic scroll never fight each other.
- **Scroll-progress bar** embedded in the header's bottom edge, plus a matching
  section-aware **side rail** (desktop only) that doubles as quick navigation.
- **Ghost numerals + clip-path wipe** on every section heading (`SectionHeading.tsx`)
  instead of a plain fade/slide.
- **3D tilt + cursor spotlight** on project cards (`ProjectCard.tsx`) via Framer Motion
  motion values — subtle, capped rotation, resets smoothly on mouse leave.
- **Spotlight-hover cards** (`SpotlightCard.tsx`) reused across the tech stack grid.
- **Shine-sweep buttons** with tactile press feedback (`MagneticButton.tsx`).
- **Progress-counter loader** with a circular clip-path wipe exit instead of a flat
  translate, all skipped cleanly under `prefers-reduced-motion`.
- **Infinite marquee** of core tech keywords between Hero and About for rhythm.
- **Film-grain overlay** (`NoiseOverlay.tsx`) at ~3.5% opacity for a filmic, non-flat
  surface — an easy-to-miss detail that reads as "designed," not templated.
- Fixed a real bug: anchored sections now have `scroll-mt-24` so headings clear the
  fixed nav on jump, and Lenis offsets account for header height on programmatic scroll.

## Final QA pass

A dedicated audit for correctness and small-device behavior, on top of the interaction
polish above:

- **Fixed a real clipping bug**: the hero's rotating word ("Backend" / "Systems" /
  "APIs" / "Interfaces") was being cut off due to a CSS spec quirk —
  `overflow-x: visible` paired with `overflow-y: hidden` gets silently coerced to
  `overflow-x: auto` by browsers, which still clips. Fixed by sizing the box to the
  longest word instead of relying on overflow behavior.
- **Real focus containment**, not just visual hiding: the rest of the page is now
  marked `inert` (unfocusable, hidden from assistive tech) while the mobile menu or
  the intro loader is active, so keyboard/screen-reader users can't tab into content
  they can't see.
- **Touch targets**: the mobile menu button's hit area was ~22px; it's now a proper
  44px+ tap target without changing its visual size.
- **Small-device layout**: the About stats grid no longer forces 2 columns on the
  smallest phones; the hero status dot can no longer be squeezed into an oval by a
  narrow flex row; `overflow-x: hidden` added at the document level as a safety net
  against any decorative element causing horizontal scroll.
- **Resilience**: if the intro loader's GSAP timeline ever fails to complete for any
  reason, a 4s fallback timer unlocks the page anyway — the site can never get
  permanently stuck `inert`.
- **Verified contrast**: confirmed `--color-text-dim` sits at ~5:1 against the
  background (passes WCAG AA) via computed relative-luminance math, not eyeballing.
- **Real OG image + favicon**: replaced the default Next.js favicon and the missing
  Open Graph image with brand-matching ones generated via `next/og`
  (`app/icon.tsx`, `app/opengraph-image.tsx`), statically rendered at build time —
  visually verified, not just configured.
- Removed unused dependencies (an experimental Playwright install used to attempt
  real browser QA — blocked by this environment's network allowlist, removed
  afterward) so the shipped `package.json` stays clean.

**Honest limitation**: this project was built and QA'd from the command line in a
sandboxed environment with no headless browser available (Playwright's browser
download is blocked by network policy here). Everything above was verified through
production builds, ESLint, server-rendered HTML inspection, and direct visual
inspection of generated static images — not by rendering the live interactive page.
Do a manual pass in an actual browser (especially real mobile devices) before
treating this as fully signed off.

## Accessibility & performance notes

- `prefers-reduced-motion` disables the intro loader, custom cursor, grid parallax,
  and GSAP scroll-scrub — CSS fallback transitions still apply.
- Custom cursor and magnetic buttons are skipped entirely on touch/coarse-pointer devices.
- All animation runs on `transform`/`opacity` only (GPU-accelerated).
- Fonts are self-hosted and subset per weight to avoid render-blocking network calls.
- Visible focus rings (`:focus-visible`) are preserved for keyboard navigation.

## Deploying

The project is a static-friendly Next.js app — deploys cleanly to Vercel, Netlify, or
any Node host. On Vercel: push to a Git repo, import the project, no config needed.

Before going live, update `metadataBase` / OpenGraph URLs in `src/app/layout.tsx` and
`src/app/sitemap.ts` / `src/app/robots.ts` to your real domain.
