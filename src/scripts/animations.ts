import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Respect user's motion preference
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize all animations
export function initAnimations() {
  // Only run on client
  if (typeof window === 'undefined') return;

  // If the user prefers reduced motion, make sure everything is visible
  // and skip all motion. (CSS already forces [data-animate] visible.)
  if (prefersReducedMotion) {
    gsap.set('[data-animate], [data-hero]', { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  // Refresh ScrollTrigger on page load (for accurate measurements)
  ScrollTrigger.refresh();

  initHeroAnimations();
  initFadeUp();
  initStagger();
  initParallax();
  initLineDraw();
  initProgressLine();
  initSpotlight();
  initCountUp();
  // The work carousel marquee is a pure CSS animation (see ProjectCarousel.astro)
  // so it runs on the compositor — smooth on mobile — and never reacts to touch.
}

// Hero-specific animations (no scroll trigger, immediate)
function initHeroAnimations() {
  const hero = document.querySelector('[data-animate="hero"]');
  if (!hero) return;

  const tag = hero.querySelector('[data-hero="tag"]');
  const eyebrow = hero.querySelector('[data-hero="eyebrow"]');
  const subtext = hero.querySelector('[data-hero="subtext"]');
  const cta = hero.querySelector('[data-hero="cta"]');
  const visual = hero.querySelector('[data-hero="visual"]');
  const lines = hero.querySelectorAll('[data-hero="headline"] .line-inner');

  // Set initial state (tag keeps its own CSS rotate transform, so fade only)
  gsap.set([eyebrow, subtext, cta, visual].filter(Boolean), { opacity: 0, y: 24 });
  if (tag) gsap.set(tag, { opacity: 0 });
  if (lines.length) gsap.set(lines, { yPercent: 118 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
  if (lines.length) tl.to(lines, { yPercent: 0, duration: 0.95, stagger: 0.11, ease: 'power4.out' }, 0.22);
  if (subtext) tl.to(subtext, { opacity: 1, y: 0, duration: 0.6 }, 0.7);
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.6 }, 0.8);
  if (visual) tl.to(visual, { opacity: 1, y: 0, duration: 1.0 }, 0.75);
  if (tag) tl.to(tag, { opacity: 1, duration: 0.8 }, 1.0);

  // Draw the hero contour lines in on load
  const contours = hero.querySelectorAll('[data-draw="hero"]');
  contours.forEach((path, i) => {
    const len = getLength(path);
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
    tl.to(path, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.4 + i * 0.15);
  });
}

// Fade-up animation for elements with [data-animate="fade-up"]
function initFadeUp() {
  const elements = document.querySelectorAll('[data-animate="fade-up"]');
  const vh = window.innerHeight;

  elements.forEach((el) => {
    // If the element is already within (or peeking into) the viewport on load,
    // reveal it right away — otherwise content in that band would sit blank until
    // the user scrolls (an awkward gap under the fold). Below-the-fold elements
    // keep their scroll-triggered reveal.
    const inViewOnLoad = el.getBoundingClientRect().top < vh - 40;

    if (inViewOnLoad) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// Stagger animation for grid children with [data-animate="stagger"]
function initStagger() {
  const containers = document.querySelectorAll('[data-animate="stagger"]');

  containers.forEach((container) => {
    const children = container.children;

    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// Parallax for elements with [data-parallax] (data-parallax-speed controls amount)
function initParallax() {
  const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');

  elements.forEach((el) => {
    const speed = parseFloat(el.dataset.parallaxSpeed || '0.15');
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.dataset.parallaxTrigger
          ? (el.closest(el.dataset.parallaxTrigger) as Element) || el
          : el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

// Draw SVG strokes (lines/paths) as they scroll into view: [data-draw="scroll"]
function initLineDraw() {
  const paths = document.querySelectorAll('[data-draw="scroll"]');

  paths.forEach((path) => {
    const len = getLength(path);
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: (path as SVGElement).closest('[data-draw-trigger]') || path,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// Progress line: a bronze fill that grows along a timeline as its section
// scrolls, signifying movement from the first step to the last.
// [data-progress-fill] (+ data-progress-axis="x|y") scrubbed over the nearest
// [data-progress-trigger]. Reduced motion returns before this runs, leaving the
// fill at its CSS-default full state.
function initProgressLine() {
  const fills = document.querySelectorAll<HTMLElement>('[data-progress-fill]');

  fills.forEach((fill) => {
    const prop = fill.dataset.progressAxis === 'y' ? 'scaleY' : 'scaleX';
    const trigger = fill.closest('[data-progress-trigger]') || fill;

    gsap.fromTo(
      fill,
      { [prop]: 0 },
      {
        [prop]: 1,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top 78%',
          end: 'bottom 58%',
          scrub: true,
        },
      }
    );
  });
}

// Cursor "spotlight" that reveals detail beneath it. [data-spotlight]
// Pointer-fine only; degrades to nothing on touch / reduced motion.
function initSpotlight() {
  const zones = document.querySelectorAll<HTMLElement>('[data-spotlight]');
  if (!zones.length) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  zones.forEach((zone) => {
    const light = zone.querySelector<HTMLElement>('[data-spotlight-light]');
    if (!light) return;

    const xTo = gsap.quickTo(light, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(light, 'y', { duration: 0.5, ease: 'power3' });

    zone.addEventListener('pointermove', (e) => {
      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
      // Publish the cursor position so a masked "blueprint detail" layer can
      // reveal only the area under the spotlight (see ServicesHero.astro).
      zone.style.setProperty('--spot-x', `${x}px`);
      zone.style.setProperty('--spot-y', `${y}px`);
    });
    zone.addEventListener('pointerenter', () => {
      gsap.to(light, { opacity: 1, duration: 0.4 });
    });
    zone.addEventListener('pointerleave', () => {
      gsap.to(light, { opacity: 0, duration: 0.6 });
      // Move the reveal off-canvas so the hidden detail disappears again.
      zone.style.setProperty('--spot-x', '-999px');
      zone.style.setProperty('--spot-y', '-999px');
    });
  });
}

// Count a number up from 0 to its target when it scrolls into view.
// [data-countup="42"] — the element's text is replaced with the tally. Purely
// textual (no transforms), and skipped entirely under reduced motion (the CSS
// guard above returns before this runs, leaving the final value in place — so
// we set it immediately here as the honest resting state).
function initCountUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-countup]');

  els.forEach((el) => {
    const target = parseInt(el.dataset.countup || '0', 10);
    if (!Number.isFinite(target)) return;

    // Motion is allowed here (reduced-motion returns before this runs), so start
    // the tally from 0; the markup rendered the final value as its resting state.
    el.textContent = '0';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
          onComplete: () => {
            el.textContent = String(target);
          },
        });
      },
    });
  });
}

// Robust total-length helper (works for <line>, <path>, <polyline>)
function getLength(el: Element): number {
  const anyEl = el as SVGGeometryElement;
  if (typeof anyEl.getTotalLength === 'function') {
    const len = anyEl.getTotalLength();
    if (len && Number.isFinite(len)) return len;
  }
  return 1000;
}

// Cleanup function for Astro View Transitions
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
