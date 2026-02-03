import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'tiers', title: 'Pricing Tiers' },
    { name: 'cta', title: 'CTA Section' },
  ],
  fields: [
    // ============ HERO SECTION ============
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Simple, transparent pricing',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
      initialValue:
        'Choose the package that fits your project. All tiers include dedicated support and revisions.',
      group: 'hero',
    }),

    // ============ PRICING TIERS ============
    defineField({
      name: 'tiersHeadline',
      title: 'Tiers Section Headline',
      type: 'string',
      initialValue: 'Choose your package',
      group: 'tiers',
    }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      description: 'Your pricing packages (typically 3). Mark one as "highlighted" to feature it.',
      type: 'array',
      group: 'tiers',
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Tier Name',
              type: 'string',
              description: 'e.g., "Bronze", "Silver", "Gold" or "Starter", "Pro", "Enterprise"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., "$2,500", "$5,000", "Custom"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'timeline',
              title: 'Timeline',
              type: 'string',
              description: 'e.g., 1–2 weeks',
            }),
            defineField({
              name: 'description',
              title: 'Brief Description',
              type: 'text',
              rows: 2,
              description: 'One sentence describing who this tier is for',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'features',
              title: 'Features Included',
              type: 'array',
              of: [{ type: 'string' }],
              description: "List of what's included in this tier",
              validation: (Rule) => Rule.required().min(3).max(10),
            }),
            defineField({
              name: 'accentColor',
              title: 'Accent Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Bronze', value: 'bronze' },
                  { title: 'Silver', value: 'silver' },
                  { title: 'Gold', value: 'gold' },
                ],
                layout: 'radio',
              },
              initialValue: 'silver',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'tiersNote',
      title: 'Pricing Note',
      type: 'string',
      description: 'Small print below pricing cards (e.g., "All prices in USD")',
      initialValue: 'All prices in USD. Custom packages available for unique projects.',
      group: 'tiers',
    }),

    // ============ FACTORS SECTION ============
    defineField({
      name: 'factorsHeadline',
      title: 'Factors Section Headline',
      type: 'string',
      initialValue: 'What affects pricing',
      group: 'tiers',
    }),
    defineField({
      name: 'factors',
      title: 'Pricing Factors',
      description: 'Explain what affects the final price',
      type: 'array',
      group: 'tiers',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Factor Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),

    // ============ CTA SECTION ============
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      initialValue: 'Need a custom quote?',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext',
      type: 'text',
      rows: 2,
      initialValue:
        "Every project is unique. Let's discuss your specific needs and create a tailored proposal.",
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
        title: 'Pricing Page',
        subtitle: 'Edit pricing tiers and page content',
      };
    },
  },
});
