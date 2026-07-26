import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToId(id: string, offset = -84) {
  const target = id.startsWith("#") ? id : `#${id}`;
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.3 });
    return;
  }
  const el = document.querySelector(target);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.3 });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function stopScroll() {
  instance?.stop();
}

export function startScroll() {
  instance?.start();
}
