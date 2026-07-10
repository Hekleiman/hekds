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
  initSpotlight();
  initCarousel();
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

// Infinite auto-drifting project carousel + cursor-reactive 3D tilt
function initCarousel() {
  const carousel = document.querySelector<HTMLElement>('[data-carousel]');
  const track = document.querySelector<HTMLElement>('[data-carousel-track]');
  const tilt = document.querySelector<HTMLElement>('[data-carousel-tilt]');
  if (!carousel || !track) return;

  // Seamless marquee: track holds two copies, so -50% is exactly one set.
  const setWidth = track.scrollWidth / 2;
  const speed = 55; // px per second
  const marquee = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration: setWidth / speed,
    repeat: -1,
  });

  // Ease the drift down (not a hard stop) while hovering the wall
  carousel.addEventListener('pointerenter', () =>
    gsap.to(marquee, { timeScale: 0.15, duration: 0.6, overwrite: true })
  );
  carousel.addEventListener('pointerleave', () =>
    gsap.to(marquee, { timeScale: 1, duration: 0.8, overwrite: true })
  );

  // Cursor-reactive tilt (pointer-fine only). Base angle set via GSAP so it
  // composes cleanly with the pointer delta.
  if (tilt && window.matchMedia('(pointer: fine)').matches) {
    gsap.set(tilt, { transformPerspective: 1600, rotationX: 7, rotationZ: -3 });
    const rotY = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3' });
    const rotX = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3' });
    const zone = tilt.closest('[data-spotlight]') || carousel;
    zone.addEventListener('pointermove', (e) => {
      const ev = e as PointerEvent;
      const r = (zone as HTMLElement).getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const py = (ev.clientY - r.top) / r.height - 0.5;
      rotY(px * 10);
      rotX(7 - py * 5);
    });
  }
}

// Fade-up animation for elements with [data-animate="fade-up"]
function initFadeUp() {
  const elements = document.querySelectorAll('[data-animate="fade-up"]');

  elements.forEach((el) => {
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
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    });
    zone.addEventListener('pointerenter', () => {
      gsap.to(light, { opacity: 1, duration: 0.4 });
    });
    zone.addEventListener('pointerleave', () => {
      gsap.to(light, { opacity: 0, duration: 0.6 });
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
