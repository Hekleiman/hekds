import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'services', title: 'Services' },
    { name: 'cta', title: 'CTA Section' },
  ],
  fields: [
    // ============ HERO SECTION ============
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Everything you need to build a standout brand',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      description: 'Brief description below the headline',
      group: 'hero',
    }),

    // ============ SERVICES ============
    defineField({
      name: 'services',
      title: 'Services',
      description:
        'Your service offerings (typically 4). They will alternate left/right layout automatically.',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Pen (Brand Identity)', value: 'pen' },
                  { title: 'Palette (Web Design)', value: 'palette' },
                  { title: 'Code (Development)', value: 'code' },
                  { title: 'Support (Retainer)', value: 'support' },
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Used for anchor links (e.g., /services#brand-identity)',
              options: {
                source: 'title',
                maxLength: 50,
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              description: 'Detailed description of this service',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'features',
              title: "What's Included",
              description: 'List of features/deliverables for this service',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(3).max(8),
            }),
            defineField({
              name: 'image',
              title: 'Service Image',
              type: 'image',
              description: 'Visual for this service (optional)',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle: subtitle ? subtitle.slice(0, 50) + '...' : '',
                media,
              };
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
      initialValue: 'Not sure which service you need?',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext',
      type: 'text',
      rows: 2,
      initialValue:
        "Let's talk about your project and figure out the best approach together. Most clients benefit from a combination of our services.",
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      group: 'cta',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get in Touch',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '/contact',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Services Page',
        subtitle: 'Edit services page content',
      };
    },
  },
});
