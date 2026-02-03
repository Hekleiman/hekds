import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'services', title: 'Services Intro' },
    { name: 'process', title: 'How We Work' },
    { name: 'whyUs', title: 'Why Us' },
    { name: 'cta', title: 'CTA Section' },
  ],
  fields: [
    // ============ HERO SECTION ============
    defineField({
      name: 'heroHeadlineLine1',
      title: 'Hero Headline Line 1',
      type: 'string',
      description: 'First line of the headline',
      initialValue: 'We craft digital',
      validation: (Rule) => Rule.required().max(50),
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadlineLine2',
      title: 'Hero Headline Line 2 (muted color)',
      type: 'string',
      description: 'Second line - displayed in muted color',
      initialValue: 'experiences that',
      validation: (Rule) => Rule.max(50),
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadlineLine3',
      title: 'Hero Headline Line 3',
      type: 'string',
      description: 'Third line of the headline',
      initialValue: 'elevate brands',
      validation: (Rule) => Rule.max(50),
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
      description: 'Supporting text below headline (1-2 sentences)',
      initialValue:
        'A boutique design studio specializing in brand identity, web design, and development for forward-thinking companies ready to stand out.',
      validation: (Rule) => Rule.max(250),
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string', initialValue: 'View Our Work' },
        { name: 'link', title: 'Button Link', type: 'string', initialValue: '/work' },
      ],
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Button',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string', initialValue: 'Get in Touch' },
        { name: 'link', title: 'Button Link', type: 'string', initialValue: '/contact' },
      ],
    }),

    // ============ SERVICES INTRO ============
    defineField({
      name: 'servicesHeadline',
      title: 'Services Headline',
      type: 'string',
      initialValue: 'Services built for modern brands',
      group: 'services',
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Services Description',
      type: 'text',
      rows: 2,
      initialValue:
        'We combine strategic thinking with exceptional craft to deliver work that drives real results for ambitious businesses.',
      group: 'services',
    }),
    defineField({
      name: 'servicesCards',
      title: 'Service Cards',
      description: 'The 4 service preview cards shown on homepage',
      type: 'array',
      group: 'services',
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'description', title: 'Brief Description', type: 'text', rows: 2 },
            { name: 'link', title: 'Learn More Link', type: 'string', initialValue: '/services' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
    }),

    // ============ HOW WE WORK ============
    defineField({
      name: 'processHeadline',
      title: 'Process Headline',
      type: 'string',
      initialValue: 'How we bring ideas to life',
      group: 'process',
    }),
    defineField({
      name: 'processDescription',
      title: 'Process Description',
      type: 'text',
      rows: 2,
      initialValue:
        'A proven process that transforms your vision into exceptional design, delivered on time and on budget.',
      group: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      description: 'The 4 steps in your process',
      type: 'array',
      group: 'process',
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title };
            },
          },
        }),
      ],
    }),

    // ============ WHY US ============
    defineField({
      name: 'whyUsHeadline',
      title: 'Why Us Headline',
      type: 'string',
      initialValue: 'What sets us apart',
      group: 'whyUs',
    }),
    defineField({
      name: 'whyUsDescription',
      title: 'Why Us Description',
      type: 'text',
      rows: 2,
      initialValue:
        "We're not just another design agency. Here's why clients choose to work with us.",
      group: 'whyUs',
    }),
    defineField({
      name: 'whyUsCards',
      title: 'Why Us Cards',
      description: 'The 3 value proposition cards',
      type: 'array',
      group: 'whyUs',
      validation: (Rule) => Rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Collaboration', value: 'collaboration' },
                  { title: 'Sync', value: 'sync' },
                  { title: 'Heart', value: 'heart' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title, subtitle: icon };
            },
          },
        }),
      ],
    }),

    // ============ CTA SECTION ============
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      initialValue: 'Ready to elevate your brand?',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext',
      type: 'text',
      rows: 2,
      initialValue: "Let's discuss your project and create something extraordinary together.",
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string', initialValue: 'Start a Project' },
        { name: 'link', title: 'Button Link', type: 'string', initialValue: '/contact' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Edit homepage content',
      };
    },
  },
});
