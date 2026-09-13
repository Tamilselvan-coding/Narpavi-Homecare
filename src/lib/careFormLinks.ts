const CARE_FORM_IDS: Record<string, string> = {
  '/baby-care': 'baby-care-form',
  '/home-nursing-care/baby-care': 'baby-care-form',
  '/basic-nursing-care': 'basic-care-form',
  '/home-nursing-care': 'hnc-cta',
  '/home-nursing-care/advance-nursing-care': 'advance-nursing-form',
  '/home-nursing-care/specialty-nursing-care': 'specialty-nursing-form',
  '/home-nursing-care/icu-at-home': 'icu-at-home-form',
  '/home-nursing-care/end-of-life-care': 'hero-form',
  '/elder-care': 'elder-care-hero',
};

export function getCareFormHref(path: string): string {
  if (path.includes('#')) return path;
  const id = CARE_FORM_IDS[path];
  return id ? `${path}#${id}` : '/contact#assessment-form';
}
