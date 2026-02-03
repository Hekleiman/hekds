import project from './project';
import siteSettings from './siteSettings';
import homepage from './homepage';
import teamMember from './teamMember';
import aboutPage from './aboutPage';
import servicesPage from './servicesPage';
import pricingPage from './pricingPage';
import contactPage from './contactPage';

export const schemaTypes = [
  // Singletons
  siteSettings,
  homepage,
  aboutPage,
  servicesPage,
  pricingPage,
  contactPage,
  // Collections
  project,
  teamMember,
];
