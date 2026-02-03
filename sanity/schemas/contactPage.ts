import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'info', title: 'Contact Information' },
    { name: 'form', title: 'Form Settings' },
  ],
  fields: [
    // ============ HERO SECTION ============
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: "Let's start a conversation",
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
      initialValue:
        "Have a project in mind? We'd love to hear about it. Fill out the form below or reach out directly.",
      group: 'hero',
    }),

    // ============ CONTACT INFO ============
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Primary email displayed on contact page',
      validation: (Rule) => Rule.email(),
      group: 'info',
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Label',
      type: 'string',
      initialValue: 'Email us',
      group: 'info',
    }),
    defineField({
      name: 'responseTime',
      title: 'Response Time',
      type: 'string',
      description: 'e.g., "Within 24 hours"',
      initialValue: 'Within 24 hours',
      group: 'info',
    }),
    defineField({
      name: 'responseTimeLabel',
      title: 'Response Time Label',
      type: 'string',
      initialValue: 'Response time',
      group: 'info',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Remote / Worldwide" or "New York, NY"',
      initialValue: 'Remote / Worldwide',
      group: 'info',
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location Label',
      type: 'string',
      initialValue: 'Based in',
      group: 'info',
    }),
    defineField({
      name: 'socialLabel',
      title: 'Social Links Label',
      type: 'string',
      initialValue: 'Follow us',
      group: 'info',
    }),
    // Note: Social links come from Site Settings

    // ============ FORM SETTINGS ============
    defineField({
      name: 'formSuccessHeadline',
      title: 'Success Message Headline',
      type: 'string',
      initialValue: 'Message sent!',
      group: 'form',
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Success Message Text',
      type: 'text',
      rows: 2,
      initialValue:
        "Thanks for reaching out. We'll review your project details and get back to you within 24 hours.",
      group: 'form',
    }),
    defineField({
      name: 'formErrorMessage',
      title: 'Error Message Text',
      type: 'text',
      rows: 2,
      initialValue: 'Something went wrong. Please try again or email us directly.',
      group: 'form',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
        subtitle: 'Edit contact page content',
      };
    },
  },
});
