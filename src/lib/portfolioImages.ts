// Maps a project (by slug or title keyword) to the real, chrome-ready screenshot
// exported to public/images/portfolio/. Both the Home carousel and the Work page
// draw from the same assets so the two pages stay visually consistent — a project
// looks identical whether it comes from Sanity or the hardcoded fallback.

export interface GalleryShot {
  src: string;
  /** Short caption describing the screen (adds insight on the detail page). */
  label: string;
  /** 'phone' renders in a device frame; default 'browser' renders website chrome. */
  type?: 'browser' | 'phone';
}

export interface PortfolioImage {
  src: string;
  variant: 'browser' | 'phone';
  url?: string;
  /** Secondary screens for the detail-page "Selected screens" carousel. */
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
        { src: '/images/portfolio/lisette-gallery.webp', label: 'Gallery — the work, uninterrupted' },
        { src: '/images/portfolio/lisette-prints.webp', label: 'Prints & shop' },
        { src: '/images/portfolio/lisette-about.webp', label: 'About' },
        { src: '/images/portfolio/lisette-order.webp', label: 'Order a digital download' },
        { src: '/images/portfolio/lisette-contact.webp', label: 'Contact' },
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
        { src: '/images/portfolio/tradeup-app-1.webp', label: 'Home feed', type: 'phone' },
        { src: '/images/portfolio/tradeup-app-2.webp', label: 'Browse', type: 'phone' },
        { src: '/images/portfolio/tradeup-app-3.webp', label: 'Listing', type: 'phone' },
        { src: '/images/portfolio/tradeup-app-4.webp', label: 'Messages', type: 'phone' },
        { src: '/images/portfolio/tradeup-app-5.webp', label: 'Rewards', type: 'phone' },
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
        { src: '/images/portfolio/yieldstone-services.webp', label: 'Services — tiered engagement model' },
        { src: '/images/portfolio/yieldstone-casestudies.webp', label: 'Case studies — past work & results' },
        { src: '/images/portfolio/yieldstone-about.webp', label: 'About the practice' },
        { src: '/images/portfolio/yieldstone-contact.webp', label: 'Contact' },
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
        { src: '/images/portfolio/jewmanity-programs.webp', label: 'Programs — Heads Up' },
        { src: '/images/portfolio/jewmanity-community.webp', label: 'Community — recipes & heritage' },
        { src: '/images/portfolio/jewmanity-shop.webp', label: 'Community shop' },
        { src: '/images/portfolio/jewmanity-about.webp', label: 'About — Our Story' },
        { src: '/images/portfolio/jewmanity-volunteer.webp', label: 'Get Involved — Volunteer' },
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
