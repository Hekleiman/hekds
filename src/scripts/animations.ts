import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize all animations
export function initAnimations() {
  // Only run on client
  if (typeof window === 'undefined') return;

  // Refresh ScrollTrigger on page load (for accurate measurements)
  ScrollTrigger.refresh();

  // 1. Hero animations (immediate on load)
  initHeroAnimations();

  // 2. Fade-up animations for sections
  initFadeUp();

  // 3. Stagger animations for grids/lists
  initStagger();
}

// Hero-specific animations (no scroll trigger, immediate)
function initHeroAnimations() {
  const hero = document.querySelector('[data-animate="hero"]');
  if (!hero) return;

  // Select hero children to animate in sequence
  const tag = hero.querySelector('[data-hero="tag"]');
  const headline = hero.querySelector('[data-hero="headline"]');
  const subtext = hero.querySelector('[data-hero="subtext"]');
  const cta = hero.querySelector('[data-hero="cta"]');
  const scroll = hero.querySelector('[data-hero="scroll"]');

  const elements = [tag, headline, subtext, cta, scroll].filter(Boolean);

  // Set initial state
  gsap.set(elements, {
    opacity: 0,
    y: 30
  });

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  // Animate in sequence
  if (tag) tl.to(tag, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
  if (headline) tl.to(headline, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
  if (subtext) tl.to(subtext, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.6 }, 0.8);
  if (scroll) tl.to(scroll, { opacity: 1, y: 0, duration: 0.6 }, 1.0);
}

// Fade-up animation for elements with [data-animate="fade-up"]
function initFadeUp() {
  const elements = document.querySelectorAll('[data-animate="fade-up"]');

  elements.forEach((el) => {
    gsap.fromTo(el,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// Stagger animation for grid children with [data-animate="stagger"]
function initStagger() {
  const containers = document.querySelectorAll('[data-animate="stagger"]');

  containers.forEach((container) => {
    const children = container.children;

    gsap.fromTo(children,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// Cleanup function for Astro View Transitions
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}
