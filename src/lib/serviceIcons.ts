// Single source of truth for mapping a service's icon field to one of the four
// canonical illustration keys used across the Services page and Home's
// ServicesIntro. Legacy Sanity keys (pen/palette) alias onto the new keys.
export type ServiceIconKey = 'strategy' | 'design' | 'code' | 'settings';

const aliases: Record<string, ServiceIconKey> = {
  pen: 'strategy',
  palette: 'design',
  code: 'code',
  settings: 'settings',
  strategy: 'strategy',
  design: 'design',
};

export function resolveIconKey(icon?: string): ServiceIconKey {
  return aliases[icon ?? ''] ?? 'strategy';
}
