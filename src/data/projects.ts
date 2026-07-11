// Centralized project data — used by both /work and /work/[slug]
// Will be replaced by Sanity CMS fetch later

export interface Project {
  title: string;
  slug: string;
  category: string;
  year: string;
  client?: string;
  description: string;
  fullDescription: string;
  services: string[];
  thumbnail?: string;
  images?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  nextProject?: string;
}

// The four real projects. Kept honest — real titles, categories, and a plain
// description of the actual work. No invented testimonials. Slugs match the
// /work index fallback (src/pages/work.astro) and the portfolio image map
// (src/lib/portfolioImages.ts). Sanity, when populated, overrides all of this.
export const projects: Project[] = [
  {
    title: "Jewmanity",
    slug: "jewmanity",
    category: "Nonprofit · Web Design & Development",
    year: "2025",
    client: "Jewmanity",
    description: "A warm, welcoming home for a community nonprofit — designed to grow its audience and built to be easy to run day to day.",
    fullDescription: "Jewmanity needed a home online that felt as warm and human as the community behind it. We designed and built a site that leads with real people and a clear story, makes it easy to get involved, and stays simple to update as programs grow — so the team can keep the content fresh without touching code.",
    services: ["Web Design", "Development", "Brand Direction", "CMS Setup"],
    nextProject: "images-by-lisette"
  },
  {
    title: "Images by Lisette",
    slug: "images-by-lisette",
    category: "Photography · Web Design",
    year: "2025",
    client: "Images by Lisette",
    description: "An elegant, image-first portfolio that gets out of the way and lets a fine-art photographer's work fill the frame.",
    fullDescription: "A photographer's site has one job: let the work breathe. We designed an image-first portfolio built around generous whitespace, an elegant serif, and large, uninterrupted imagery — a quiet, confident frame that puts Lisette's photography front and center on every screen size.",
    services: ["Web Design", "Art Direction", "Development"],
    nextProject: "trade-up"
  },
  {
    title: "Trade Up",
    slug: "trade-up",
    category: "Product · Web & App",
    year: "2025",
    client: "Trade Up",
    description: "A peer-to-peer marketplace designed and built end-to-end — a marketing site and a product experience that feel like one.",
    fullDescription: "Trade Up is a peer-to-peer marketplace that spans a marketing site and a native app experience. We designed and built both sides end-to-end, keeping a single, cohesive product language across web and mobile so the jump from landing page to listing to checkout feels like one seamless experience.",
    services: ["Web Design", "App Design", "Development"],
    nextProject: "yieldstone-systems"
  },
  {
    title: "Yieldstone Systems",
    slug: "yieldstone-systems",
    category: "B2B Systems · Web Design & Development",
    year: "2025",
    client: "Yieldstone Systems",
    description: "A B2B quality-systems platform with a clean, confident interface that makes complex operations feel simple.",
    fullDescription: "Yieldstone Systems helps manufacturers meet demanding quality and compliance standards. We designed and built a dark, confident B2B interface with a clear content hierarchy and a reusable component system — so a genuinely complex product reads as calm, credible, and easy to navigate.",
    services: ["Web Design", "Development", "Design System"],
    nextProject: "jewmanity"
  }
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

// Helper to get all slugs (for getStaticPaths)
export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug);
}
