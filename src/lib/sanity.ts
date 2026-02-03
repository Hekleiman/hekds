import { createClient, type SanityClient } from '@sanity/client';

// Check if Sanity is configured with a valid project ID
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const isConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);

// Only create client if properly configured
export const sanityClient: SanityClient | null = isConfigured
  ? createClient({
      projectId,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true, // Use CDN for faster responses (cached data)
    })
  : null;

// ============ TYPE DEFINITIONS ============

// Site Settings (singleton)
export interface SiteSettings {
  siteName: string;
  tagline?: string;
  contactEmail?: string;
  location?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    dribbble?: string;
    instagram?: string;
    email?: string;
  };
  footerCopyright?: string;
}

// CTA type (reusable)
export interface CtaLink {
  text: string;
  href: string;
}

// Homepage Content (singleton)
export interface HomepageContent {
  // Hero (3-line headline)
  heroHeadlineLine1?: string;
  heroHeadlineLine2?: string;
  heroHeadlineLine3?: string;
  heroSubtext?: string;
  heroPrimaryCta?: CtaLink;
  heroSecondaryCta?: CtaLink;
  // Services
  servicesHeadline?: string;
  servicesDescription?: string;
  servicesCards?: Array<{
    _key: string;
    title: string;
    description: string;
    icon?: string;
  }>;
  // Process
  processHeadline?: string;
  processDescription?: string;
  processSteps?: Array<{
    _key: string;
    number?: string;
    title: string;
    description: string;
  }>;
  // Why Us
  whyUsHeadline?: string;
  whyUsDescription?: string;
  whyUsCards?: Array<{
    _key: string;
    title: string;
    description: string;
    icon?: string;
  }>;
  // CTA
  ctaHeadline?: string;
  ctaSubtext?: string;
  ctaPrimaryCta?: CtaLink;
}

// Team Member type
export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  areasOfFocus?: string[];
  image?: string;
  order: number;
}

// About Page Content (singleton)
export interface AboutPageContent {
  // Hero
  heroHeadline?: string;
  // What Makes Us Different
  whatMakesUsDifferentHeadline?: string;
  whatMakesUsDifferentText?: string;
  // How We Work
  howWeWorkHeadline?: string;
  howWeWorkParagraphs?: string[];
  // CTA
  ctaHeadline?: string;
  ctaSubtext?: string;
  ctaPrimaryCta?: CtaLink;
}

// Service Item type (for services page)
export interface ServiceItem {
  _key?: string;
  title: string;
  slug?: string;
  icon?: string;
  description: string;
  features: string[];
  image?: string;
}

// Services Page Content (singleton)
export interface ServicesPageContent {
  // Hero
  heroHeadline?: string;
  heroSubtext?: string;
  // Services
  services?: ServiceItem[];
  // CTA
  ctaHeadline?: string;
  ctaSubtext?: string;
  ctaPrimaryCta?: CtaLink;
}

// Pricing Factor type
export interface PricingFactor {
  _key?: string;
  title: string;
  description: string;
}

// Pricing Tier type
export interface PricingTier {
  _key?: string;
  name: string;
  price: string;
  timeline?: string;
  features: string[];
  accentColor: 'bronze' | 'silver' | 'gold';
  highlighted?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

// Pricing Page Content (singleton)
export interface PricingPageContent {
  // Hero
  heroHeadline?: string;
  heroSubtext?: string;
  // Factors
  factorsHeadline?: string;
  factors?: PricingFactor[];
  // Tiers
  tiersHeadline?: string;
  tiers?: PricingTier[];
  tiersNote?: string;
  // CTA
  ctaHeadline?: string;
  ctaSubtext?: string;
  ctaPrimaryCta?: CtaLink;
}

// Contact Page Content (singleton)
export interface ContactPageContent {
  // Hero
  heroHeadline?: string;
  heroSubtext?: string;
  // Contact Info
  email?: string;
  emailLabel?: string;
  responseTime?: string;
  responseTimeLabel?: string;
  location?: string;
  locationLabel?: string;
  socialLabel?: string;
  // Form
  formSuccessHeadline?: string;
  formSuccessMessage?: string;
  formErrorMessage?: string;
}

// Project type
export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
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
  order: number;
}

// ============ FETCH FUNCTIONS ============

// Fetch site settings (singleton)
export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      tagline,
      contactEmail,
      location,
      socialLinks,
      footerCopyright
    }
  `);
}

// Fetch homepage content (singleton)
export async function getHomepageContent(): Promise<HomepageContent | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(`
    *[_type == "homepage"][0] {
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      heroPrimaryCta,
      heroSecondaryCta,
      servicesHeadline,
      servicesDescription,
      servicesCards[] {
        _key,
        title,
        description,
        icon
      },
      processHeadline,
      processDescription,
      processSteps[] {
        _key,
        number,
        title,
        description
      },
      whyUsHeadline,
      whyUsDescription,
      whyUsCards[] {
        _key,
        title,
        description,
        icon
      },
      ctaHeadline,
      ctaSubtext,
      ctaPrimaryCta
    }
  `);
}

// Fetch about page content (singleton)
export async function getAboutPageContent(): Promise<AboutPageContent | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(`
    *[_type == "aboutPage"][0] {
      heroHeadline,
      whatMakesUsDifferentHeadline,
      whatMakesUsDifferentText,
      howWeWorkHeadline,
      howWeWorkParagraphs,
      ctaHeadline,
      ctaSubtext,
      ctaPrimaryCta
    }
  `);
}

// Fetch services page content (singleton)
export async function getServicesPageContent(): Promise<ServicesPageContent | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(`
    *[_type == "servicesPage"][0] {
      heroHeadline,
      heroSubtext,
      services[] {
        _key,
        title,
        slug,
        icon,
        description,
        features,
        "image": image.asset->url
      },
      ctaHeadline,
      ctaSubtext,
      ctaPrimaryCta
    }
  `);
}

// Fetch pricing page content (singleton)
export async function getPricingPageContent(): Promise<PricingPageContent | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(`
    *[_type == "pricingPage"][0] {
      heroHeadline,
      heroSubtext,
      factorsHeadline,
      factors[] {
        _key,
        title,
        description
      },
      tiersHeadline,
      tiers[] {
        _key,
        name,
        price,
        timeline,
        features,
        accentColor,
        highlighted,
        ctaText,
        ctaLink
      },
      tiersNote,
      ctaHeadline,
      ctaSubtext,
      ctaPrimaryCta
    }
  `);
}

// Fetch contact page content (singleton)
export async function getContactPageContent(): Promise<ContactPageContent | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(`
    *[_type == "contactPage"][0] {
      heroHeadline,
      heroSubtext,
      email,
      emailLabel,
      responseTime,
      responseTimeLabel,
      location,
      locationLabel,
      socialLabel,
      formSuccessHeadline,
      formSuccessMessage,
      formErrorMessage
    }
  `);
}

// Fetch team members (collection)
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      bio,
      areasOfFocus,
      "image": image.asset->url,
      order
    }
  `);
}

// Fetch all projects (for /work page)
export async function getAllProjects(): Promise<SanityProject[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      slug,
      category,
      year,
      client,
      description,
      fullDescription,
      services,
      "thumbnail": thumbnail.asset->url,
      testimonial,
      order
    }
  `);
}

// Fetch single project by slug (for /work/[slug] page)
export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  if (!sanityClient) return null;

  const project = await sanityClient.fetch(
    `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      year,
      client,
      description,
      fullDescription,
      services,
      "thumbnail": thumbnail.asset->url,
      "images": images[].asset->url,
      testimonial,
      order
    }
  `,
    { slug }
  );

  return project || null;
}

// Fetch all slugs (for getStaticPaths)
export async function getAllProjectSlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  const slugs = await sanityClient.fetch(`
    *[_type == "project"].slug.current
  `);
  return slugs;
}

// Fetch next project for navigation
export async function getNextProject(
  currentOrder: number
): Promise<Pick<SanityProject, 'title' | 'slug'> | null> {
  if (!sanityClient) return null;

  const next = await sanityClient.fetch(
    `
    *[_type == "project" && order > $currentOrder] | order(order asc)[0] {
      title,
      slug
    }
  `,
    { currentOrder }
  );

  // If no next project, wrap to first
  if (!next) {
    const first = await sanityClient.fetch(`
      *[_type == "project"] | order(order asc)[0] {
        title,
        slug
      }
    `);
    return first;
  }

  return next;
}
