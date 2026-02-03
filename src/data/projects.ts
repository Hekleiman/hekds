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

export const projects: Project[] = [
  {
    title: "Nova Fitness",
    slug: "nova-fitness",
    category: "Brand Identity",
    year: "2024",
    client: "Nova Fitness Co.",
    description: "Complete brand identity for a modern fitness startup.",
    fullDescription: "Nova Fitness needed a bold identity that would stand out in the crowded fitness market. We developed a comprehensive brand system including logo, color palette, typography, and guidelines that capture their energetic, inclusive approach to wellness.",
    services: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines"],
    testimonial: {
      quote: "HEK transformed our vision into a brand that truly represents who we are. The response from our customers has been incredible.",
      author: "Sarah Chen",
      role: "Founder, Nova Fitness"
    },
    nextProject: "cloudsync"
  },
  {
    title: "CloudSync App",
    slug: "cloudsync",
    category: "Web Design",
    year: "2024",
    client: "CloudSync Technologies",
    description: "Dashboard UI design for a cloud management platform.",
    fullDescription: "CloudSync needed a complete redesign of their dashboard to improve user experience and reduce churn. We created an intuitive interface that makes complex cloud management tasks feel simple and approachable.",
    services: ["UI/UX Design", "Design System", "Prototyping", "User Research"],
    testimonial: {
      quote: "The new dashboard reduced our support tickets by 40%. Users actually enjoy using the product now.",
      author: "Mike Torres",
      role: "CPO, CloudSync"
    },
    nextProject: "artisan-coffee"
  },
  {
    title: "Artisan Coffee Co",
    slug: "artisan-coffee",
    category: "Brand Identity",
    year: "2023",
    client: "Artisan Coffee Co.",
    description: "Warm, inviting brand for a specialty coffee roaster.",
    fullDescription: "Artisan Coffee Co. wanted a brand that reflected their commitment to quality and craft. We developed an identity system that feels premium yet approachable, with packaging design that stands out on shelves.",
    services: ["Brand Identity", "Packaging Design", "Signage", "Menu Design"],
    nextProject: "techflow"
  },
  {
    title: "TechFlow Dashboard",
    slug: "techflow",
    category: "Development",
    year: "2024",
    client: "TechFlow Inc.",
    description: "Full-stack development for an analytics platform.",
    fullDescription: "TechFlow needed their designs brought to life with clean, performant code. We built a responsive dashboard with real-time data visualization, optimized for speed and accessibility.",
    services: ["Frontend Development", "API Integration", "Performance Optimization", "Deployment"],
    nextProject: "meridian-hotels"
  },
  {
    title: "Meridian Hotels",
    slug: "meridian-hotels",
    category: "Creative Direction",
    year: "2023",
    client: "Meridian Hotel Group",
    description: "Campaign creative for a luxury hotel rebrand.",
    fullDescription: "Meridian Hotels was repositioning as a boutique luxury brand. We provided creative direction for their launch campaign, including photo shoots, video content, and social media strategy.",
    services: ["Creative Direction", "Art Direction", "Photo Direction", "Campaign Strategy"],
    nextProject: "pulse-health"
  },
  {
    title: "Pulse Health",
    slug: "pulse-health",
    category: "Web Design",
    year: "2024",
    client: "Pulse Health",
    description: "Marketing website for a telehealth startup.",
    fullDescription: "Pulse Health needed a website that would build trust with potential patients while clearly communicating their services. We designed a calming, accessible site that converts visitors into patients.",
    services: ["Web Design", "UX Strategy", "Copywriting Direction", "Webflow Development"],
    testimonial: {
      quote: "Our conversion rate doubled after the redesign. HEK understood exactly what our patients needed to see.",
      author: "Dr. Amanda Lee",
      role: "CEO, Pulse Health"
    },
    nextProject: "nova-fitness"
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
