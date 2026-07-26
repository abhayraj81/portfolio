# Abhay Raj — Portfolio (HTML / CSS / JS)

A framework-free conversion of the Next.js + React + Tailwind + Framer Motion
version — same design, same animations, same content, no build step. Open
`index.html` in a browser, or serve the folder with any static file server.

## Why it works with zero setup

Everything the site needs is vendored locally — **no CDN, no npm install,
no build step, works offline**:

- `js/vendor/gsap.min.js`, `js/vendor/ScrollTrigger.min.js`,
  `js/vendor/lenis.min.js` — the actual library files, not CDN links.
- `fonts/*.woff2` — the real font files (Space Grotesk, IBM Plex Sans,
  JetBrains Mono), referenced via `@font-face` in `css/base.css`.
- `assets/favicon.png`, `assets/og-image.png` — pre-rendered, on-brand,
  not generated at request time.
- Icons are an inline SVG `<symbol>` sprite in `index.html` (no icon
  library dependency).

## Running it

```bash
# Easiest: just double-click index.html
# Or serve it properly (recommended, avoids any file:// quirks):
python3 -m http.server 5500
# then open http://localhost:5500
```

## File structure

```
index.html            All markup: nav, mobile menu, side rail, every
                       section, SVG icon sprite, loader, cursor.
css/
  base.css             Design tokens (@font-face, CSS variables, reset)
  layout.css           Buttons, badges, cursor, noise overlay, loader,
                       section-heading (ghost numeral + wipe reveal)
  navbar.css           Header, mobile menu, desktop scrollspy side rail
  hero.css             Hero (rotating word, grid parallax bg) + marquee
  sections-1.css        About, tech stack, experience timeline
  sections-2.css        Projects, credentials, contact, footer
js/
  data.js              Content for the tech-stack grid + marquee strip
                       (single source of truth, same role as the React
                       version's lib/data.ts)
  main.js              All behavior — see below
  vendor/              Vendored GSAP, ScrollTrigger, Lenis
fonts/                 Self-hosted woff2 files
assets/                Resume PDF, favicon, OG image
```

## What `main.js` does (in order)

1. Renders the tech-stack grid and marquee strip from `data.js`
2. Initializes Lenis smooth scroll, synced to GSAP's ticker/ScrollTrigger
3. Wires every `[data-target]` element (nav links, hero CTAs, side rail,
   scroll cue) to a shared `scrollToId()` helper
4. Runs the intro loader (letter reveal → progress counter → circular
   clip-path wipe exit), with a **4-second safety-net timeout** so the
   page can never get permanently stuck if the animation fails
5. Custom cursor — only on fine-pointer, hover-capable, non-reduced-motion
   devices
6. Hero grid-background parallax
7. Hero rotating word — box width is computed from the longest word
   (`Interfaces` + buffer), not left to `overflow` behavior. This mirrors
   a real bug fix from the React version: `overflow-x: visible` paired
   with `overflow-y: hidden` gets silently coerced to `overflow-x: auto`
   by browsers per the CSS spec, and still clips.
8. Navbar: scroll-state background, active-section scrollspy (shared by
   the top nav and the side rail), mobile menu with real focus
   containment (`inert` on background content, not just visual hiding),
   Escape-to-close, focus restore, scroll lock
9. Experience timeline: GSAP ScrollTrigger-scrubbed SVG line draw + node
   pop-in
10. Tech-stack card spotlight (cursor-tracked radial gradient via CSS
    custom properties)
11. Project card 3D tilt + spotlight (rAF-smoothed, resets on mouse leave)
12. Footer year

Every effect checks `prefers-reduced-motion` and degrades to instant/static
state when it's set. Every scroll-based reveal checks for
`IntersectionObserver` support and shows all content immediately if it's
missing, rather than leaving it hidden.

## How this was verified (and its limits)

This was built and tested from the command line in a sandboxed environment
with **no headless browser available** — the same constraint noted for the
React version. What was actually verified:

- **HTML structure**: parsed with Python's `html.parser` to confirm no
  unclosed/mismatched tags, no duplicate IDs, no dangling `href="#id"` /
  `aria-controls` references.
- **JS correctness**: syntax-checked with `node --check`, then **actually
  executed** against the real `index.html` using `jsdom`, deliberately
  with GSAP/Lenis/`IntersectionObserver` stripped out one at a time, to
  exercise every fallback path — confirmed zero runtime errors and correct
  DOM output (tech-stack tag count, marquee item count, hero word count,
  computed word-box width, reveal-fallback visibility, `inert` release)
  in each scenario.
- **Assets**: every CSS/JS/font/image path served a real `200` from a
  local static server; the OG image and favicon were visually inspected
  (not just confirmed to load).

**What wasn't verified**: the actual animated, interactive, rendered page
in a real browser — the tilt/spotlight feel, the loader timing, mobile
layout at real widths. Load it in an actual browser (and a real phone)
before treating it as finished.
