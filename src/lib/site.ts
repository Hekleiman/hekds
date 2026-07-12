// Single source of truth for the studio's canonical public identity.
//
// The domain and public email had drifted across the codebase — an old
// pre-launch domain (hekdesign.studio) lingered in the footer, JSON-LD, and
// legal pages, while newer components introduced two *different* @hekdesigns.com
// addresses. Everything that renders the studio's domain or contact email now
// imports from here so the three can never diverge again.
//
// NOTE: static assets that can't import TS — `public/llms.txt` and
// `sanity/seed.ts` — must be kept in step with these values by hand.

/** Bare live domain, no protocol (e.g. for body copy). */
export const SITE_DOMAIN = 'hekdesigns.com';

/** Canonical site origin (www, https) — matches astro.config `site`. */
export const SITE_URL = 'https://www.hekdesigns.com';

/** The one public-facing contact address shown and emitted site-wide. */
export const CONTACT_EMAIL = 'contact@hekdesigns.com';
