import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of the studio (appears in browser tab)',
      initialValue: 'HEK Design Studio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline used in footer and meta descriptions',
      initialValue: 'Design studio crafting digital experiences',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Primary contact email (used on Contact page and footer)',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Remote / Worldwide" or "New York, NY"',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'dribbble', title: 'Dribbble URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'email', title: 'Email Address', type: 'string' },
      ],
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Text',
      type: 'string',
      description: 'e.g., "© 2025 HEK Design Studio"',
    }),
    defineField({
      name: 'footerPages',
      title: 'Footer Navigation Links',
      description: 'Links displayed in the footer navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      };
    },
  },
});
