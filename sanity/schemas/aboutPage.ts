import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'team', title: 'Team Section' },
    { name: 'values', title: 'Values Section' },
    { name: 'cta', title: 'CTA Section' },
  ],
  fields: [
    // ============ HERO SECTION ============
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'A small studio with big ambitions',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroStory',
      title: 'Our Story',
      description: 'The main story/description paragraphs',
      type: 'text',
      rows: 8,
      group: 'hero',
    }),

    // ============ TEAM SECTION ============
    defineField({
      name: 'teamHeadline',
      title: 'Team Headline',
      type: 'string',
      initialValue: 'Meet the people behind the pixels',
      group: 'team',
    }),
    defineField({
      name: 'teamDescription',
      title: 'Team Description',
      type: 'text',
      rows: 2,
      initialValue: 'A dedicated group of designers, developers, and strategists who love what they do.',
      group: 'team',
    }),
    // Note: Team members are fetched separately as a collection

    // ============ WHAT MAKES US DIFFERENT SECTION ============
    defineField({
      name: 'whatMakesUsDifferentHeadline',
      title: 'What Makes Us Different Headline',
      type: 'string',
      initialValue: 'What makes us different',
      group: 'values',
    }),
    defineField({
      name: 'whatMakesUsDifferentText',
      title: 'What Makes Us Different Text',
      type: 'text',
      rows: 4,
      description: 'Main paragraph explaining your unique value proposition',
      group: 'values',
    }),

    // ============ HOW WE WORK SECTION ============
    defineField({
      name: 'howWeWorkHeadline',
      title: 'How We Work Headline',
      type: 'string',
      initialValue: 'How we work',
      group: 'values',
    }),
    defineField({
      name: 'howWeWorkParagraphs',
      title: 'How We Work Paragraphs',
      description: 'Multiple paragraphs describing your work process',
      type: 'array',
      group: 'values',
      of: [
        defineArrayMember({
          type: 'text',
          rows: 3,
        }),
      ],
    }),

    // ============ CTA SECTION ============
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      initialValue: 'Want to work with us?',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext',
      type: 'text',
      rows: 2,
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
          initialValue: 'Start a Project',
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
        title: 'About Page',
        subtitle: 'Edit about page content',
      };
    },
  },
});
