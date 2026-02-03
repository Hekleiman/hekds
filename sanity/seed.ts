/**
 * Sanity CMS Seed Script
 *
 * Populates Sanity CMS with all hardcoded content from Astro components.
 * Run with: cd sanity && npm run seed
 *
 * Required environment variable: SANITY_TOKEN
 */

import { createClient } from '@sanity/client';

// Configuration
const projectId = 'z5lmaamn';
const dataset = 'production';
const apiVersion = '2024-01-01';

// Get token from environment
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error('Error: SANITY_TOKEN environment variable is required');
  console.error('Get a token from: https://www.sanity.io/manage/project/z5lmaamn/api#tokens');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // We need fresh data for mutations
});

// ============ SEED DATA ============

// 1. Site Settings (singleton)
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'HEK Design Studio',
  tagline: 'Design and development for modern web.',
  contactEmail: 'hello@hekdesign.studio',
  location: 'Remote / Worldwide',
  footerCopyright: '© 2026 HEK Design Studio. All rights reserved.',
  socialLinks: {
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/',
    email: 'mailto:hello@hekdesign.studio',
  },
};

// 2. Homepage (singleton)
const homepage = {
  _id: 'homepage',
  _type: 'homepage',
  // Hero section
  heroHeadlineLine1: 'Designing and building',
  heroHeadlineLine2: 'modern websites',
  heroHeadlineLine3: 'with clarity and intention.',
  heroSubtext:
    'A design and development partnership focused on creating exceptional digital experiences. Direct collaboration, thoughtful execution, no handoffs.',
  heroPrimaryCta: { text: 'Start a Project →', href: '/contact' },
  heroSecondaryCta: { text: '⊕ View Our Work', href: '/work' },
  // Services section
  servicesHeadline: 'What We Do',
  servicesDescription:
    'End-to-end design and development. No handoffs, no miscommunication. Just seamless collaboration from concept to launch.',
  servicesCards: [
    {
      _key: 'service-1',
      title: 'Strategy & UX Design',
      description:
        'Clear thinking that guides every decision. We map user journeys, define information architecture, and create wireframes that solve real problems.',
      icon: 'strategy',
    },
    {
      _key: 'service-2',
      title: 'Visual Design & Systems',
      description:
        'Cohesive visual language built for scale. From initial concepts to comprehensive design systems, we create interfaces that feel intuitive and refined.',
      icon: 'design',
    },
    {
      _key: 'service-3',
      title: 'Development & Launch',
      description:
        'Clean, performant code that brings designs to life. We build responsive, accessible websites with modern frameworks and best practices.',
      icon: 'code',
    },
    {
      _key: 'service-4',
      title: 'Optimization & Support',
      description:
        "Launch isn't the finish line. We monitor, refine, and optimize over time, improving performance, usability, and conversion through real-world insights.",
      icon: 'settings',
    },
  ],
  // Process section
  processHeadline: 'How We Work',
  processDescription: 'A straightforward process built for collaboration and clarity.',
  processSteps: [
    {
      _key: 'step-1',
      number: '01',
      title: 'Discover',
      description:
        'We start by understanding your goals, audience, and challenges. This phase sets the foundation for everything that follows.',
    },
    {
      _key: 'step-2',
      number: '02',
      title: 'Design',
      description:
        'From wireframes to high-fidelity mockups, we iterate quickly and refine the experience until every detail feels right.',
    },
    {
      _key: 'step-3',
      number: '03',
      title: 'Build',
      description:
        'Clean, performant code that matches the design pixel-for-pixel. We build with accessibility and scalability in mind.',
    },
    {
      _key: 'step-4',
      number: '04',
      title: 'Iterate',
      description:
        'Launch is just the beginning. We test, learn, and refine based on real-user feedback and data.',
    },
  ],
  // Why Us section
  whyUsHeadline: 'Why Us?',
  whyUsDescription: 'Working with a small, focused studio has its advantages.',
  whyUsCards: [
    {
      _key: 'whyus-1',
      title: 'Direct Collaboration',
      description:
        'Work directly with the people designing and building your project. No account managers, no middlemen.',
      icon: 'collaboration',
    },
    {
      _key: 'whyus-2',
      title: 'No Handoffs',
      description:
        'Design and development happen in tandem. This means faster iterations, fewer miscommunications, and better results.',
      icon: 'sync',
    },
    {
      _key: 'whyus-3',
      title: 'Thoughtful, Hands-On Work',
      description:
        'We care about every detail. Small studio, focused attention, consistent quality across every project.',
      icon: 'heart',
    },
  ],
  // CTA section
  ctaHeadline: "Let's build something together.",
  ctaSubtext:
    "Every project is different. Whether you need a complete redesign or a new build from scratch, we'd love to hear about it. Pricing varies based on scope and timeline.",
  ctaPrimaryCta: { text: 'Start a Conversation →', href: '/contact' },
};

// 3. Services Page (singleton)
const servicesPage = {
  _id: 'servicesPage',
  _type: 'servicesPage',
  heroHeadline: 'Services',
  heroSubtext:
    'End-to-end design and development. We handle every aspect of your project, from initial concept to final launch.',
  services: [
    {
      _key: 'svc-1',
      title: 'Strategy & UX Design',
      slug: 'strategy-ux-design',
      icon: 'pen',
      description:
        'We start every project with clear thinking. User research, information architecture, and wireframing lay the groundwork for success.',
      features: [
        'User research and interviews',
        'Information architecture',
        'User flow mapping',
        'Wireframing and prototyping',
        'Usability testing',
      ],
    },
    {
      _key: 'svc-2',
      title: 'Visual Design & Systems',
      slug: 'visual-design-systems',
      icon: 'palette',
      description:
        'From initial concepts to comprehensive design systems, we create cohesive visual languages that scale with your product.',
      features: [
        'Brand identity and guidelines',
        'UI design and mockups',
        'Design system development',
        'Component libraries',
        'Usability testing',
      ],
    },
    {
      _key: 'svc-3',
      title: 'Development & Launch',
      slug: 'development-launch',
      icon: 'code',
      description:
        'Clean, performant code that brings designs to life. We build with modern frameworks and prioritize accessibility.',
      features: [
        'React and modern JavaScript',
        'Responsive implementation',
        'Performance optimization',
        'Accessibility standards',
        'Testing and QA',
      ],
    },
    {
      _key: 'svc-4',
      title: 'Optimization & Support',
      slug: 'optimization-support',
      icon: 'settings',
      description:
        'We continue optimizing your site after launch to improve performance and usability.',
      features: [
        'Performance monitoring and optimization',
        'Ongoing UX and UI refinements',
        'Accessibility audits and updates',
        'Feature and content improvements',
        'Testing, QA, and technical support',
      ],
    },
  ],
  ctaHeadline: 'Not sure which service you need?',
  ctaSubtext:
    "Let's talk about your project and figure out the best approach together. Most clients benefit from a combination of our services.",
  ctaPrimaryCta: { text: 'Get in Touch', href: '/contact' },
};

// 4. Pricing Page (singleton)
const pricingPage = {
  _id: 'pricingPage',
  _type: 'pricingPage',
  heroHeadline: 'Pricing',
  heroSubtext:
    "Every project is unique, so we don't offer fixed-price packages. Instead, we provide transparent, project-based pricing tailored to your specific needs and goals. Below are typical ranges to give you a sense of investment levels. The actual cost depends on scope, complexity, and timeline.",
  factorsHeadline: 'What Affects Pricing',
  factors: [
    {
      _key: 'factor-1',
      title: 'Project Scope',
      description:
        'The size and complexity of the project. A simple marketing site requires less time than a full web application.',
    },
    {
      _key: 'factor-2',
      title: 'Design Complexity',
      description:
        'Custom illustrations, animations, and advanced interactions add to the design phase.',
    },
    {
      _key: 'factor-3',
      title: 'Technical Requirements',
      description:
        'API integrations, custom functionality, and backend development all impact timeline and cost.',
    },
    {
      _key: 'factor-4',
      title: 'Timeline',
      description:
        'Rush projects require rearranging schedules and may come with expedited pricing.',
    },
  ],
  tiersHeadline: 'Typical Price Ranges',
  tiers: [
    {
      _key: 'tier-1',
      name: 'Bronze Tier',
      price: '$500 – $1,000',
      timeline: '1–2 weeks',
      accentColor: 'bronze',
      features: [
        '1–3 page website',
        'Custom visual design',
        'Responsive build',
        'Basic CMS setup',
        'SEO-ready structure',
      ],
    },
    {
      _key: 'tier-2',
      name: 'Silver Tier',
      price: '$1,500 – $3,000',
      timeline: '2–3 weeks',
      accentColor: 'silver',
      features: [
        'Full website design',
        'Interactive Prototype',
        'Responsive implementation',
        'Basic design system foundations',
        'Analytics setup',
      ],
    },
    {
      _key: 'tier-3',
      name: 'Gold Tier',
      price: 'Starting at $3,000',
      timeline: '3–5 weeks',
      accentColor: 'gold',
      features: [
        'Custom UX and UI design',
        'Front-end development',
        'Simple authentication flows',
        'Basic data handling',
        'Post-launch support',
      ],
    },
  ],
  tiersNote:
    "These are approximate ranges. We'll provide a detailed proposal after discussing your specific project.",
  ctaHeadline: "Let's Discuss Your Project",
  ctaSubtext:
    "The best way to get accurate pricing is to have a conversation. We'll ask about your goals, timeline, and requirements, then provide a detailed proposal.",
  ctaPrimaryCta: { text: 'Get in Touch →', href: '/contact' },
};

// 5. About Page (singleton)
const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroHeadline: 'Who are we?',
  whatMakesUsDifferentHeadline: 'What makes us different?',
  whatMakesUsDifferentText:
    "HEK Design Studio was founded on a simple idea: design and development should work together, not in silos. We're a boutique studio that handles everything from strategy and design to development and launch. Small team, focused attention, no handoffs. This approach allows us to move quickly, iterate efficiently, and maintain quality throughout the entire process.",
  howWeWorkHeadline: 'How We Work',
  howWeWorkParagraphs: [
    'We believe the best digital products come from close collaboration between design and development. When these disciplines work together from the start, you get better solutions, faster iterations, and fewer surprises.',
    'We keep our studio intentionally small. This allows us to stay involved in every project, maintain high standards, and build lasting relationships with our clients.',
    'Every project is different, so we adapt our process to fit your needs. But our core principles remain the same: clear communication, thoughtful work, and a focus on outcomes over outputs.',
  ],
  ctaHeadline: "Let's build something together.",
  ctaSubtext:
    "Every project is different. Whether you need a complete redesign or a new build from scratch, we'd love to hear about it.",
  ctaPrimaryCta: { text: 'Start a Conversation →', href: '/contact' },
};

// 6. Contact Page (singleton)
const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  heroHeadline: 'Get in Touch',
  heroSubtext:
    "Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you within 24 hours.",
  email: 'hello@hekdesign.studio',
  emailLabel: 'Email us',
  responseTime: 'Within 24 hours',
  responseTimeLabel: 'Response time',
  location: 'Remote / Worldwide',
  locationLabel: 'Based in',
  socialLabel: 'Follow us',
  formSuccessHeadline: 'Message sent!',
  formSuccessMessage:
    "Thanks for reaching out. We'll get back to you within 24 hours.",
  formErrorMessage:
    'Something went wrong. Please try again or email us directly.',
};

// 7. Team Members (collection documents)
const teamMembers = [
  {
    _type: 'teamMember',
    name: 'Harrison Kipper',
    role: 'Design Lead',
    bio: 'Harrison brings over 8 years of experience in digital design, specializing in user experience and visual systems. He believes great design is invisible—it just works. His approach combines strategic thinking with meticulous attention to detail.',
    areasOfFocus: [
      'User experience design',
      'Visual design systems',
      'Brand identity',
      'Design strategy',
    ],
    order: 1,
  },
  {
    _type: 'teamMember',
    name: 'Erik Kleiman',
    role: 'Development Lead',
    bio: 'Erik has been building for the web for over a decade. He is passionate about clean code, performance, and accessibility. His development philosophy centers on creating maintainable, scalable solutions that last.',
    areasOfFocus: [
      'Frontend development',
      'System architecture',
      'Performance optimization',
      'Accessibility',
    ],
    order: 2,
  },
];

// ============ SEED FUNCTIONS ============

async function seedSingletons() {
  console.log('\n📝 Seeding singleton documents...\n');

  const singletons = [
    { name: 'Site Settings', data: siteSettings },
    { name: 'Homepage', data: homepage },
    { name: 'Services Page', data: servicesPage },
    { name: 'Pricing Page', data: pricingPage },
    { name: 'About Page', data: aboutPage },
    { name: 'Contact Page', data: contactPage },
  ];

  for (const { name, data } of singletons) {
    try {
      await client.createOrReplace(data);
      console.log(`  ✓ ${name} (${data._id})`);
    } catch (error) {
      console.error(`  ✗ ${name}: ${error}`);
    }
  }
}

async function seedTeamMembers() {
  console.log('\n👥 Seeding team members...\n');

  for (const member of teamMembers) {
    try {
      // Check if team member already exists by name
      const existing = await client.fetch(
        `*[_type == "teamMember" && name == $name][0]._id`,
        { name: member.name }
      );

      if (existing) {
        // Update existing
        await client.patch(existing).set(member).commit();
        console.log(`  ✓ ${member.name} (updated)`);
      } else {
        // Create new
        await client.create(member);
        console.log(`  ✓ ${member.name} (created)`);
      }
    } catch (error) {
      console.error(`  ✗ ${member.name}: ${error}`);
    }
  }
}

async function main() {
  console.log('🌱 Sanity CMS Seed Script');
  console.log('========================');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);

  try {
    await seedSingletons();
    await seedTeamMembers();

    console.log('\n✅ Seeding complete!\n');
    console.log('Next steps:');
    console.log('  1. Open Sanity Studio: cd sanity && npm run dev');
    console.log('  2. Verify content at http://localhost:3333');
    console.log('  3. Run npm run build from project root to test queries\n');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
