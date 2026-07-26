(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pageRoot = document.getElementById("pageRoot");
  var loaded = false;

  /* ========================================================================
     0. Render data-driven content (tech stack grid + marquee)
     ======================================================================== */
  function renderStackGrid() {
    var grid = document.getElementById("stackGrid");
    if (!grid) return;
    var html = "";
    SITE_DATA.skillGroups.forEach(function (group) {
      html += '<div class="stack__card" data-spotlight>';
      html += '<div class="stack__spotlight"></div>';
      html += '<h3 class="stack__card-title">' + group.label + "</h3>";
      html += '<div class="stack__tags">';
      group.items.forEach(function (item) {
        html += '<span class="stack__tag">' + item + "</span>";
      });
      html += "</div></div>";
    });
    grid.innerHTML = html;
  }

  function renderMarquee() {
    var track = document.getElementById("marqueeTrack");
    if (!track) return;
    var words = SITE_DATA.marqueeWords.concat(SITE_DATA.marqueeWords);
    var html = "";
    words.forEach(function (w) {
      html += '<span class="marquee__item">' + w + " <span>/</span></span>";
    });
    track.innerHTML = html;
  }

  renderStackGrid();
  renderMarquee();

  /* ========================================================================
     1. Lenis smooth scroll + GSAP ScrollTrigger sync
     ======================================================================== */
  var lenis = null;
  if (!prefersReducedMotion && window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      });
    }
  } else if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  function scrollToId(id, offset) {
    var target = id.indexOf("#") === 0 ? id : "#" + id;
    offset = typeof offset === "number" ? offset : -84;
    if (lenis) {
      lenis.scrollTo(target, { offset: offset, duration: 1.3 });
      return;
    }
    var el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll("[data-target]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var id = el.getAttribute("data-target");
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    });
  });

  var navLogo = document.getElementById("navLogo");
  if (navLogo) {
    navLogo.addEventListener("click", function (e) {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 1.3 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ========================================================================
     2. Intro loader (progress counter + circular clip-path wipe exit)
        with a safety-net fallback so the page can never stay stuck.
     ======================================================================== */
  function unlockPage() {
    if (loaded) return;
    loaded = true;
    if (pageRoot) pageRoot.removeAttribute("inert");
  }
  // Safety net: if anything below fails, never leave the page permanently inert.
  var fallbackTimer = setTimeout(unlockPage, 4000);

  if (pageRoot) pageRoot.setAttribute("inert", "");

  (function initLoader() {
    var loaderEl = document.getElementById("loader");
    var wordEl = document.getElementById("loaderWord");
    var percentEl = document.getElementById("loaderPercent");
    if (!loaderEl || !wordEl) {
      unlockPage();
      return;
    }

    var word = "ABHAY RAJ";
    word.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "loader__letter";
      span.textContent = ch === " " ? "\u00A0" : ch;
      wordEl.appendChild(span);
    });

    if (prefersReducedMotion || !window.gsap) {
      clearTimeout(fallbackTimer);
      unlockPage();
      return;
    }

    var letters = loaderEl.querySelectorAll(".loader__letter");
    var lines = loaderEl.querySelectorAll(".loader__line");
    var counter = { value: 0 };

    var tl = window.gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: function () {
        clearTimeout(fallbackTimer);
        unlockPage();
      },
    });

    tl.set(loaderEl, { display: "flex" })
      .from(lines, { scaleX: 0, transformOrigin: "left", duration: 0.7, stagger: 0.07 })
      .from(letters, { yPercent: 120, opacity: 0, duration: 0.6, stagger: 0.035 }, "-=0.45")
      .to(
        counter,
        {
          value: 100,
          duration: 1.15,
          ease: "power2.inOut",
          onUpdate: function () {
            if (percentEl) {
              percentEl.textContent = String(Math.floor(counter.value)).padStart(3, "0");
            }
          },
        },
        "-=0.5"
      )
      .to(letters, { color: "#00D9B5", duration: 0.3, stagger: 0.015 }, "-=0.5")
      .to({}, { duration: 0.15 })
      .to(".loader__word, .loader__lines, .loader__meta", { opacity: 0, duration: 0.35, ease: "power2.in" })
      .to(loaderEl, { clipPath: "circle(0% at 50% 50%)", duration: 0.9, ease: "power4.inOut" }, "-=0.1")
      .set(loaderEl, { pointerEvents: "none", display: "none" });
  })();

  /* ========================================================================
     3. Custom cursor (fine-pointer, hover-capable devices only)
     ======================================================================== */
  (function initCursor() {
    var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover || prefersReducedMotion) return;

    var dot = document.getElementById("cursorDot");
    var ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    var mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
    });

    window.addEventListener(
      "mouseover",
      function (e) {
        var active = !!e.target.closest("a, button, [data-cursor-active]");
        ring.classList.toggle("is-active", active);
      },
      true
    );

    function tick() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%,-50%)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ========================================================================
     4. Hero grid-background parallax
     ======================================================================== */
  (function initGridParallax() {
    var grid = document.getElementById("heroGrid");
    if (!grid || prefersReducedMotion) return;

    var tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    window.addEventListener("mousemove", function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 18;
      ty = (e.clientY / window.innerHeight - 0.5) * 18;
    });

    function tick() {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      grid.style.transform = "translate(" + cx + "px," + cy + "px)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ========================================================================
     5. Hero rotating word — sized to the longest word to avoid clipping
        (a real bug found + fixed in the React version: overflow-x:visible
        paired with overflow-y:hidden gets silently coerced to overflow-x:auto
        by browsers per spec, and still clips. Fix: size the box explicitly.)
     ======================================================================== */
  (function initHeroWords() {
    var box = document.getElementById("heroWordBox");
    if (!box) return;

    var words = SITE_DATA.heroWords;
    var longest = Math.max.apply(
      null,
      words.map(function (w) {
        return w.length;
      })
    );
    box.style.width = longest + 2 + "ch"; // +2 buffer: ch is only an estimate for proportional fonts

    words.forEach(function (w) {
      var span = document.createElement("span");
      span.className = "hero__word";
      span.textContent = w + ".";
      box.appendChild(span);
    });

    var spans = box.querySelectorAll(".hero__word");
    var index = 0;
    spans[0].classList.add("is-current");

    if (prefersReducedMotion || spans.length < 2) return;

    setInterval(function () {
      spans[index].classList.remove("is-current");
      spans[index].classList.add("is-prev");
      index = (index + 1) % spans.length;
      spans[index].classList.remove("is-prev");
      spans[index].classList.add("is-current");
      // clean up the previous word's exit class after its transition ends
      setTimeout(function () {
        spans.forEach(function (s, i) {
          if (i !== index) s.classList.remove("is-prev");
        });
      }, 520);
    }, 2200);
  })();

  /* ========================================================================
     6. Navbar: scroll state, active-section scrollspy, mobile menu
     ======================================================================== */
  (function initNav() {
    var header = document.getElementById("header");
    var navLinks = document.querySelectorAll(".nav__link, .side-rail__item");
    var toggle = document.getElementById("navToggle");
    var toggleIconUse = document.getElementById("navToggleIconUse");
    var mobileMenu = document.getElementById("mobileMenu");
    var sideRail = document.getElementById("sideRail");
    var progress = document.getElementById("navProgress");

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle("is-scrolled", y > 24);
      if (sideRail) sideRail.classList.toggle("is-visible", y > window.innerHeight * 0.4);

      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? y / scrollable : 0;
      if (progress) progress.style.transform = "scaleX(" + pct + ")";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Active-section scrollspy shared by top nav + side rail
    var sectionIds = ["top", "about", "stack", "experience", "projects", "credentials", "contact"];
    var sections = sectionIds
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.id;
              navLinks.forEach(function (el) {
                el.classList.toggle("is-active", el.getAttribute("data-target") === id);
              });
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) {
        observer.observe(s);
      });
    }

    // Generic scroll-reveal for section headings + .reveal elements
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "-80px", threshold: 0 }
      );
      document.querySelectorAll(".reveal").forEach(function (el) {
        revealObserver.observe(el);
      });
      document.querySelectorAll("[data-heading]").forEach(function (heading) {
        heading.querySelectorAll(".section-heading__eyebrow, .section-heading__title, .section-heading__desc").forEach(
          function (el) {
            revealObserver.observe(el);
          }
        );
      });
    } else {
      // No IntersectionObserver support: show everything immediately.
      document
        .querySelectorAll(".reveal, .section-heading__eyebrow, .section-heading__title, .section-heading__desc")
        .forEach(function (el) {
          el.classList.add("is-visible");
        });
    }

    // Mobile menu: open/close, focus containment, Escape, scroll lock
    var firstLink = mobileMenu ? mobileMenu.querySelector(".mobile-menu__link") : null;
    var isOpen = false;

    function setIcon(name) {
      if (toggleIconUse) toggleIconUse.setAttribute("href", "#icon-" + name);
    }

    function openMenu() {
      isOpen = true;
      mobileMenu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      setIcon("x");
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();

      var mainEl = document.getElementById("main-content");
      var footerEl = document.querySelector(".footer");
      if (mainEl) mainEl.setAttribute("inert", "");
      if (footerEl) footerEl.setAttribute("inert", "");

      requestAnimationFrame(function () {
        if (firstLink) firstLink.focus();
      });
    }

    function closeMenu(restoreFocus) {
      isOpen = false;
      mobileMenu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      setIcon("menu");
      document.body.style.overflow = "";
      if (lenis) lenis.start();

      var mainEl = document.getElementById("main-content");
      var footerEl = document.querySelector(".footer");
      if (mainEl) mainEl.removeAttribute("inert");
      if (footerEl) footerEl.removeAttribute("inert");

      if (restoreFocus) toggle.focus();
    }

    if (toggle && mobileMenu) {
      toggle.addEventListener("click", function () {
        if (isOpen) closeMenu(true);
        else openMenu();
      });

      mobileMenu.querySelectorAll("[data-target]").forEach(function (link) {
        link.addEventListener("click", function () {
          closeMenu(false);
        });
      });

      window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isOpen) closeMenu(true);
      });
    }
  })();

  /* ========================================================================
     7. Experience timeline: scroll-scrubbed line draw + node pop-in
     ======================================================================== */
  (function initTimeline() {
    var timeline = document.getElementById("timeline");
    var drawLine = document.getElementById("timelineDraw");
    if (!timeline) return;

    if (!prefersReducedMotion && drawLine && window.gsap && window.ScrollTrigger) {
      window.gsap.set(drawLine, { strokeDasharray: 1000, strokeDashoffset: 1000 });
      window.gsap.to(drawLine, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 65%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      });
    }

    if ("IntersectionObserver" in window) {
      var nodeObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "-60px", threshold: 0 }
      );
      timeline.querySelectorAll(".timeline__node").forEach(function (n) {
        nodeObserver.observe(n);
      });
    } else {
      timeline.querySelectorAll(".timeline__node").forEach(function (n) {
        n.classList.add("is-visible");
      });
    }
  })();

  /* ========================================================================
     8. Spotlight hover (tech stack cards) — CSS custom properties, no
        re-render, cheap enough to run on many repeated cards.
     ======================================================================== */
  document.addEventListener("mousemove", function (e) {
    var card = e.target.closest ? e.target.closest("[data-spotlight]") : null;
    if (!card) return;
    var rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - rect.left + "px");
    card.style.setProperty("--my", e.clientY - rect.top + "px");
  });

  /* ========================================================================
     9. Project card 3D tilt + cursor spotlight
     ======================================================================== */
  (function initProjectTilt() {
    if (prefersReducedMotion) return;
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      var rafId = null;
      var targetRX = 0,
        targetRY = 0,
        curRX = 0,
        curRY = 0;

      function apply() {
        curRX += (targetRX - curRX) * 0.15;
        curRY += (targetRY - curRY) * 0.15;
        card.style.transform =
          "perspective(1000px) rotateX(" + curRX.toFixed(2) + "deg) rotateY(" + curRY.toFixed(2) + "deg)";
        if (Math.abs(targetRX - curRX) > 0.02 || Math.abs(targetRY - curRY) > 0.02) {
          rafId = requestAnimationFrame(apply);
        } else {
          rafId = null;
        }
      }

      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
        targetRY = (px - 0.5) * 8; // -4..4deg
        targetRX = (0.5 - py) * 8;
        if (!rafId) rafId = requestAnimationFrame(apply);
      });

      card.addEventListener("mouseleave", function () {
        targetRX = 0;
        targetRY = 0;
        if (!rafId) rafId = requestAnimationFrame(apply);
      });
    });
  })();

  /* ========================================================================
     10. Footer year
     ======================================================================== */
  var year = new Date().getFullYear();
  var y1 = document.getElementById("year");
  var y2 = document.getElementById("year2");
  if (y1) y1.textContent = year;
  if (y2) y2.textContent = year;
})();
