export type AdvanceNursingPackage = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  color: string;
  gradient: string;
  icon: string;
  bestFor: string[];
  scope: string[];
  equipment: string[];
  upgrades: string[];
  costCue: string;
};

export type AdvanceNursingDownload = {
  title: string;
  fileUrl: string;
};

export type AdvanceNursingResource = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export const ADVANCE_NURSING_PACKAGES: AdvanceNursingPackage[] = [
  {
    id: 'iv-support-care',
    name: 'IV Support Care',
    tagline: 'Short-term IV fluids & medications at home',
    image: '/images/advance-nursing-care/Pik 6.png',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 56%, #0CB3B3 100%)',
    icon: 'IV infusion nursing',
    bestFor: [
      'Short courses of prescribed IV fluids or medication',
      'Patients recovering from dehydration, fever or weakness',
      'Families seeking a planned alternative to repeated hospital visits',
      'Mild respiratory infections needing nebulizer support',
      'COPD/asthma patients needing intermittent oxygen'
    ],
    scope: [
      'Peripheral IV cannulation & fluid therapy',
      'IV antibiotics/IM injections as per doctor order',
      'Vital signs monitoring & reaction watch',
      'Basic ADL support (mobility, comfort)',
      'Digital log & instant family updates'
    ],
    equipment: [
      'IV stands & hangers',
      'Infusion sets & cannulas',
      'Sterile dressing supplies',
      'Vitals monitoring devices',
      'Sharps disposal container'
    ],
    upgrades: [
      'Home delivery of prescribed pharmacy items',
      'Telemetry monitoring options',
      'Priority doctor tele-consultation'
    ],
    costCue: 'A focused option for one or a few planned IV sessions without an avoidable extended hospital stay.',
  },
  {
    id: 'infusion-plus-care',
    name: 'Infusion Plus Care',
    tagline: 'Long-term IV therapy with ongoing monitoring',
    image: '/images/advance-nursing-care/Pik 7.png',
    color: '#5B8DEF',
    gradient: 'linear-gradient(135deg, #315CA8 0%, #5B8DEF 56%, #8DB8FF 100%)',
    icon: 'Infusion therapy',
    bestFor: [
      'Long-term doctor-prescribed IV antibiotic therapy',
      'Chronic conditions needing planned hydration, pain relief or infusion support',
      'Autoimmune or rheumatology patients with routine prescribed drips'
    ],
    scope: [
      'Planned infusion sessions',
      'Ongoing vital signs and treatment-tolerance observation',
      'Consistent records across sessions',
      'Coordinated communication with the family',
      'Escalation notes when clinical attention is needed'
    ],
    equipment: [
      'IV Stand & micro-drip sets',
      'PICC / Central line dressing kits',
      'Normal saline / heparin flushes',
      'Sterile dressing materials',
      'Basic vitals monitoring equipment'
    ],
    upgrades: [
      'Infusion pump rental for precise dosing',
      'Port-a-cath access specialized support',
      'Coordinator-led clinical home audit'
    ],
    costCue: 'Hospital-grade IV care at home - continuous safety at lower cost.',
  },
  {
    id: 'recovery-monitoring-care',
    name: 'Recovery & Monitoring Care',
    tagline: 'Comprehensive IV care with close nurse supervision',
    image: '/images/advance-nursing-care/Pik 8.png',
    color: '#E56C45',
    gradient: 'linear-gradient(135deg, #B9442B 0%, #E56C45 54%, #F6A56B 100%)',
    icon: 'Recovery monitoring',
    bestFor: [
      'Post-surgical patients with a higher monitoring need',
      'Palliative patients receiving doctor-prescribed comfort medicines',
      'Chronic illness recovery with frequent infusions and close observation'
    ],
    scope: [
      'IV medication and fluid therapy as prescribed',
      'Extended BP, SpO2 and pulse monitoring',
      'Escalation protocol and direct doctor communication',
      'Mobility, hydration and nutrition support when planned',
      'Option to upgrade quickly to Specialty Care if condition worsens'
    ],
    equipment: [
      'Standard IV infusion kit',
      'Advanced vitals monitor',
      'Urine output measurement sets',
      'Positioning cushions & safety supports',
      'Sterile wound-dressing materials'
    ],
    upgrades: [
      'Dietitian consultation for tailored nutrition plan',
      'Remote physician review for medication changes',
      'Physiotherapy assessment visit'
    ],
    costCue: 'Full recovery support - safer, monitored, and more affordable.',
  },
  {
    id: 'oxycare-support',
    name: 'OxyCare Support',
    tagline: 'Safe oxygen & nebulization therapy at home',
    image: '/images/advance-nursing-care/Pik 9.png',
    color: '#7657D9',
    gradient: 'linear-gradient(135deg, #4933A5 0%, #7657D9 56%, #A28BEB 100%)',
    icon: 'Oxygen respiratory care',
    bestFor: [
      'Patients prescribed intermittent oxygen or nebulizer support',
      'COPD or asthma patients needing planned respiratory support',
      'Families who need safe oxygen-device guidance at home'
    ],
    scope: [
      'Oxygen concentrator setup guidance',
      'Nebulizer administration per prescription',
      'SpO2 and vital observation during sessions',
      'Family education on oxygen and fire safety',
      'Daily records and family updates'
    ],
    equipment: [
      'Nebulizer machine (for session use)',
      'Oxygen tubings & nasal cannulas',
      'Pulse oximeter (SpO2 device)',
      'Oxygen safety display board',
      'PPE & waste disposal bag'
    ],
    upgrades: [
      'Oxygen concentrator machine rental',
      'Emergency cylinder backup mapping',
      'Pulmonologist remote review'
    ],
    costCue: 'Affordable oxygen support at home — lower infection risk & no hospital wait.',
  },
];

export const ADVANCE_NURSING_PACKAGE_NAMES = ADVANCE_NURSING_PACKAGES.map((pkg) => pkg.name);
export const ADVANCE_NURSING_FRAMEWORK = ['Clinical IV & infusion support', 'Health monitoring & early warning', 'Aseptic technique & home safety', 'Doctor-guided coordination', 'Comfort & daily-living assistance', 'Reporting & transparency'];
export const ADVANCE_NURSING_SAFETY = ['Verified nursing professionals', 'Doctor-prescribed care plans', 'Strict hygiene practices', 'Early escalation protocol', 'Digital logs & family updates', 'Flexible package guidance'];

export const ADVANCE_NURSING_DOWNLOADS: AdvanceNursingDownload[] = [
  {
    title: 'Complete Guide to Choosing Advanced Nursing Care at Home',
    fileUrl: '/downloads/advance-nursing-care/complete-guide-to-choosing-advanced-nursing-care-at-home.pdf',
  },
  {
    title: 'Safe IV Therapy at Home - Family Preparation Checklist',
    fileUrl: '/downloads/advance-nursing-care/safe-iv-therapy-at-home-family-preparation-checklist.pdf',
  },
];

export const ADVANCE_NURSING_RESOURCES: AdvanceNursingResource[] = [
  {
    title: 'Complete Guide to IV Therapy at Home in Chennai',
    excerpt: 'Safety, cost, eligibility and family updates for doctor-prescribed IV therapy at home.',
    image: '/images/advance-nursing-care/Pik 11.jpg',
    href: '/blog/complete-guide-iv-therapy-at-home-chennai',
  },
  {
    title: 'Dehydration & Heat Stroke Recovery: Why IV Drips at Home Help',
    excerpt: 'When doctor-prescribed IV hydration at home can support safer recovery during Chennai heat.',
    image: '/images/advance-nursing-care/Pik 13.jpeg',
    href: '/blog/dehydration-heat-stroke-iv-drips-at-home',
  },
  {
    title: 'How NRI Families Can Arrange Reliable IV Care in Chennai',
    excerpt: 'A practical guide for overseas families arranging verified nursing, daily logs and escalation support.',
    image: '/images/advance-nursing-care/Pik 12.png',
    href: '/blog/nri-families-reliable-iv-care-chennai',
  },
  {
    title: 'IV Antibiotics at Home: How It Works & What Families Should Know',
    excerpt: 'What to expect from prescription review, sterile setup, dose monitoring and family reporting.',
    image: '/images/advance-nursing-care/Pik 10.jpg',
    href: '/blog/iv-antibiotics-at-home-family-guide',
  },
];

export const getAdvanceNursingPackage = (packageId: string) => ADVANCE_NURSING_PACKAGES.find((pkg) => pkg.id === packageId);
export const getOtherAdvanceNursingPackages = (packageId: string) => ADVANCE_NURSING_PACKAGES.filter((pkg) => pkg.id !== packageId);
