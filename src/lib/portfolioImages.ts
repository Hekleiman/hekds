// Maps a project (by slug or title keyword) to the real, chrome-ready screenshot
// exported to public/images/portfolio/. Both the Home carousel and the Work page
// draw from the same assets so the two pages stay visually consistent — a project
// looks identical whether it comes from Sanity or the hardcoded fallback.

export interface PortfolioImage {
  src: string;
  variant: 'browser' | 'phone';
  url?: string;
  /** Optional secondary shots for the detail-page gallery. */
  gallery?: string[];
}

// Ordered most-specific first; matched against "slug + title".
const MAP: Array<{ match: RegExp; img: PortfolioImage }> = [
  {
    match: /lisette|images[-\s]?by/i,
    img: {
      src: '/images/portfolio/lisette.webp',
      variant: 'browser',
      url: 'imagesbylisette.com',
      gallery: ['/images/portfolio/lisette-gallery.webp'],
    },
  },
  {
    match: /trade[-\s]?up/i,
    img: {
      src: '/images/portfolio/tradeup.webp',
      variant: 'browser',
      url: 'tradeupmarket.com',
      gallery: ['/images/portfolio/tradeup-app.webp'],
    },
  },
  {
    match: /yieldstone/i,
    img: {
      src: '/images/portfolio/yieldstone.webp',
      variant: 'browser',
      url: 'yieldstonesystems.com',
      gallery: ['/images/portfolio/yieldstone-services.webp'],
    },
  },
  {
    match: /jewmanity/i,
    img: {
      src: '/images/portfolio/jewmanity.webp',
      variant: 'browser',
      url: 'jewmanity.com',
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
