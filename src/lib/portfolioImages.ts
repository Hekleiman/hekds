// Maps a project (by slug or title keyword) to the real, chrome-ready screenshot
// exported to public/images/portfolio/. Both the Home carousel and the Work page
// draw from the same assets so the two pages stay visually consistent — a project
// looks identical whether it comes from Sanity or the hardcoded fallback.

export interface GalleryShot {
  src?: string;
  /** Short caption describing the screen (adds insight on the detail page). */
  label: string;
  /** Website pages render in browser chrome; device mockups render bare. */
  framed?: boolean;
  /** A set of framed phone images rendered as a swipeable carousel. */
  phones?: string[];
}

export interface PortfolioImage {
  src: string;
  variant: 'browser' | 'phone';
  url?: string;
  /** Secondary shots for the detail-page gallery. */
  gallery?: GalleryShot[];
}

// Ordered most-specific first; matched against "slug + title".
const MAP: Array<{ match: RegExp; img: PortfolioImage }> = [
  {
    match: /lisette|images[-\s]?by/i,
    img: {
      src: '/images/portfolio/lisette.webp',
      variant: 'browser',
      url: 'imagesbylisette.com',
      gallery: [
        { src: '/images/portfolio/lisette-gallery.webp', label: 'Gallery — the work, uninterrupted', framed: true },
        { src: '/images/portfolio/lisette-prints.webp', label: 'Prints & shop', framed: true },
      ],
    },
  },
  {
    match: /trade[-\s]?up/i,
    img: {
      src: '/images/portfolio/tradeup.webp',
      variant: 'browser',
      url: 'tradeupmarket.com',
      gallery: [
        {
          label: 'The companion mobile app',
          phones: [
            '/images/portfolio/tradeup-app-1.webp',
            '/images/portfolio/tradeup-app-2.webp',
            '/images/portfolio/tradeup-app-3.webp',
            '/images/portfolio/tradeup-app-4.webp',
            '/images/portfolio/tradeup-app-5.webp',
          ],
        },
      ],
    },
  },
  {
    match: /yieldstone/i,
    img: {
      src: '/images/portfolio/yieldstone.webp',
      variant: 'browser',
      url: 'yieldstonesystems.com',
      gallery: [
        { src: '/images/portfolio/yieldstone-services.webp', label: 'Services — tiered engagement model', framed: true },
        { src: '/images/portfolio/yieldstone-about.webp', label: 'About the practice', framed: true },
      ],
    },
  },
  {
    match: /jewmanity/i,
    img: {
      src: '/images/portfolio/jewmanity.webp',
      variant: 'browser',
      url: 'jewmanity.com',
      gallery: [
        { src: '/images/portfolio/jewmanity-programs.webp', label: 'Programs — Heads Up', framed: true },
        { src: '/images/portfolio/jewmanity-shop.webp', label: 'Community shop', framed: true },
      ],
    },
  },
  {
    match: /sbk|kipper|stuart/i,
    img: {
      src: '/images/portfolio/sbk.webp',
      variant: 'browser',
      url: 'stuartbkippermd.com',
    },
  },
];

export function portfolioImageFor(project: {
  slug?: string;
  title?: string;
}): PortfolioImage | null {
  const hay = `${project.slug ?? ''} ${project.title ?? ''}`;
  const found = MAP.find((m) => m.match.test(hay));
  return found ? found.img : null;
}
