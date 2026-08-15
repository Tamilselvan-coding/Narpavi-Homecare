export const BRAND = {
  name: 'Narpavi Homecare',
  tagline: 'Professional Home Healthcare',
  email: 'service@nhlcare.com',
  phone: '+91 97900 16067',
  whatsapp: '919790016067',
  address: 'Chennai, Tamil Nadu, India',
  url: 'https://www.narpavihomecare.com',
  foundedYear: 2024,
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Home Nursing Care',
    href: '/home-nursing-care',
    children: [
      { label: 'Patient Assistant Care', href: '/home-nursing-care/patient-assistant-care' },
      { label: 'Basic Nursing Care', href: '/basic-nursing-care', highlight: true },
      { label: 'Advance Nursing Care', href: '/home-nursing-care/advance-nursing-care' },
      { label: 'Specialty Nursing Care', href: '/home-nursing-care/specialty-nursing-care' },
      { label: 'ICU @ Home', href: '/home-nursing-care/icu-at-home' },
    ],
  },
  { label: 'Baby Care', href: '/baby-care' },
  { label: 'Elder Care', href: '/elder-care' },
  {
    label: 'Medical Equipment',
    href: '/medical-equipment',
    children: [
      { label: 'Respiratory Equipment', href: '/medical-equipment/respiratory-equipment' },
      { label: 'Monitors', href: '/medical-equipment/monitors' },
      { label: 'Ventilators', href: '/medical-equipment/ventilators' },
      { label: 'Oxygen Cylinder', href: '/medical-equipment/oxygen-cylinder' },
      { label: 'Medical Mattress', href: '/medical-equipment/medical-mattress' },
      { label: 'Hospital COT', href: '/medical-equipment/hospital-cot' },
      { label: 'Mobility Equipment', href: '/medical-equipment/mobility-equipment' },
      { label: 'Pumps & DVT', href: '/medical-equipment/pumps-dvt' },
      { label: 'Suction Machine', href: '/medical-equipment/suction-machine' },
      { label: 'Masks & Accessories', href: '/medical-equipment/masks-accessories' },
    ],
  },
  { label: 'Join Us', href: '/join-us' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
