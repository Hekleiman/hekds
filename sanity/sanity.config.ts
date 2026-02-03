import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Singleton document types that should only have one instance
const singletonTypes = new Set(['siteSettings', 'homepage', 'aboutPage', 'servicesPage', 'pricingPage', 'contactPage']);

// Helper to create singleton list items in the studio structure
const singletonListItem = (
  S: Parameters<Parameters<typeof structureTool>[0]['structure']>[0],
  typeName: string,
  title: string
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));

export default defineConfig({
  name: 'hek-design-studio',
  title: 'HEK Design Studio',

  projectId: 'z5lmaamn',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Settings section
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([singletonListItem(S, 'siteSettings', 'Site Settings')])
              ),
            S.divider(),
            // Pages section
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    singletonListItem(S, 'homepage', 'Homepage'),
                    singletonListItem(S, 'aboutPage', 'About'),
                    singletonListItem(S, 'servicesPage', 'Services'),
                    singletonListItem(S, 'pricingPage', 'Pricing'),
                    singletonListItem(S, 'contactPage', 'Contact'),
                  ])
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('teamMember').title('Team Members'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent singletons from appearing in "Create new" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
});
