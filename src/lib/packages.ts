export interface ServiceScope {
  category: string;
  detail: string;
}

export interface CarePackageHighlight {
  title: string;
  description: string;
}

export interface CarePackage {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  color: string;
  gradient: string;
  icon: string;
  facts: string[];
  bestFor: string[];
  highlights: CarePackageHighlight[];
  scope: ServiceScope[];
  costCue: string;
  whyChoose: string[];
  href: string;
}

export const CARE_PACKAGES: CarePackage[] = [
  {
    id: 'active-assist',
    name: 'Active Assist',
    tagline: 'Gentle Support for Faster Recovery',
    summary: 'Affordable short-term daily living help for adults who remain fairly independent but need support after surgery, injury, or postpartum recovery.',
    image: '/images/pik-7.png',
    color: '#0CB3B3',
    gradient: 'linear-gradient(135deg, #0A8F8F 0%, #0CB3B3 52%, #0CB3B3 100%)',
    icon: 'Recovery mobility support',
    facts: ['Short-term recovery', 'Light ADL help', 'Daily vitals'],
    bestFor: [
      'Post-surgery recovery (orthopedic, laparoscopic, minor procedures)',
      'Young adults with temporary mobility issues (fractures, sports injuries)',
      'New mothers needing light postpartum help',
    ],
    highlights: [
      { title: 'Gentle daily living support', description: 'Light bathing, dressing, grooming, feeding assistance, and hydration reminders for safer recovery at home.' },
      { title: 'Supervised mobility', description: 'Short walks, safe transfers, and simple fall-prevention checks reduce avoidable setbacks.' },
      { title: 'Medication and vitals routine', description: 'Timely oral medication reminders with daily Temp, BP, Pulse, and SpO2 checks.' },
      { title: 'Family care logs', description: 'Daily updates keep family members informed about comfort, routine, and recovery progress.' },
    ],
    scope: [
      { category: 'Activities of Daily Living', detail: 'Light help with bathing, dressing, grooming' },
      { category: 'Mobility Support', detail: 'Short supervised walks and transfers' },
      { category: 'Nutrition Support', detail: 'Feeding assist' },
      { category: 'Medication Support', detail: 'Reminders only' },
      { category: 'Basic Vital Monitoring', detail: 'Temp / BP / Pulse / SpO2, daily vitals and reporting' },
      { category: 'Safety and Fall Prevention', detail: 'Home safety tips and checks' },
      { category: 'Companionship', detail: 'Conversation and light activities' },
      { category: 'Family Communication', detail: 'Daily care log updates' },
      { category: 'Post-Hospital Care', detail: 'Light recovery help' },
      { category: 'Emergency Backup', detail: 'Escalation contact' },
    ],
    costCue: 'Affordable short-term help - recover safely at home without expensive hospital stay.',
    whyChoose: [
      'Best fit for lighter recovery needs',
      'Keeps care practical and affordable for short durations',
      'Supports new mothers and temporary mobility issues',
      'Helps families avoid unnecessary hospital stay',
    ],
    href: '/services/active-assist',
  },
  {
    id: 'guided-living',
    name: 'Guided Living',
    tagline: 'Steady Care for Everyday Life',
    summary: 'Structured daily routines for adults with chronic illness, early neurological concerns, or special needs that require dependable home support.',
    image: '/images/pik-8.png',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 52%, #0CB3B3 100%)',
    icon: 'Chronic care routine',
    facts: ['Chronic routine support', 'Daily WhatsApp logs', '24x7 nurse helpline'],
    bestFor: [
      'Adults with chronic illnesses (diabetes, hypertension, asthma)',
      'Early neurological conditions (Parkinsons, mild stroke recovery, MS)',
      'Adults with special needs requiring structured daily support',
    ],
    highlights: [
      { title: 'Structured everyday routine', description: 'Full ADL assistance, toileting support, mobility checks, hydration reminders, and emotional reassurance.' },
      { title: 'Medication discipline', description: 'Scheduled reminders and routine check-ins help maintain consistency for chronic conditions.' },
      { title: 'Daily vitals reporting', description: 'Daily BP, SpO2, Temp, and Pulse logs are reviewed so families can spot changes early.' },
      { title: 'Post-discharge stability', description: 'Structured recovery routines help reduce readmission risk after hospital discharge.' },
    ],
    scope: [
      { category: 'Activities of Daily Living', detail: 'Full ADL help incl. toileting and mobility' },
      { category: 'Mobility Support', detail: 'Routine mobility + safety checks' },
      { category: 'Nutrition Support', detail: 'Hydration reminders' },
      { category: 'Medication Support', detail: 'Structured reminders and routine check-ins' },
      { category: 'Basic Vital Monitoring', detail: 'Daily vitals and reporting' },
      { category: 'Safety and Fall Prevention', detail: 'Daily environment safety checks' },
      { category: 'Companionship', detail: 'Companionship + emotional reassurance' },
      { category: 'Family Communication', detail: 'Daily log + quick phone/WhatsApp updates' },
      { category: 'Post-Hospital Care', detail: 'Structured post-discharge routine' },
      { category: 'Emergency Backup', detail: '24x7 nurse helpline' },
    ],
    costCue: 'Reliable, structured home support - keep chronic illness under control and avoid readmissions.',
    whyChoose: [
      'Creates a dependable daily care rhythm',
      'Useful for chronic conditions and special needs',
      'Keeps families updated through daily logs',
      'Adds nurse helpline support for urgent concerns',
    ],
    href: '/services/guided-living',
  },
  {
    id: 'caring-hands',
    name: 'Caring Hands',
    tagline: 'Dependable Support for Mobility Needs',
    summary: 'Hands-on support for stroke recovery, accident recovery, and long-term disabilities where safe movement and full ADL help matter every day.',
    image: '/images/pik-9.png',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 54%, #0CB3B3 100%)',
    icon: 'Mobility transfer caregiver',
    facts: ['Limited mobility care', 'Transfer support', 'Supervisor check-ins'],
    bestFor: [
      'Stroke recovery after initial rehabilitation',
      'Long recovery after accident or trauma',
      'Adults with long-term disabilities needing hands-on ADL help',
    ],
    highlights: [
      { title: 'Hands-on ADL care', description: 'Bathing, dressing, toilet transfers, repositioning, and feeding support are handled with dignity.' },
      { title: 'Repositioning and fall prevention', description: 'Regular movement support and active safety checks reduce pressure sore and fall risks.' },
      { title: 'Strict routine tracking', description: 'Medication reminders, vitals logs, abnormal-reading escalation, and daily documentation keep care visible.' },
      { title: 'Family and supervisor involvement', description: 'Daily logs plus weekly supervisor calls give families confidence in the care plan.' },
    ],
    scope: [
      { category: 'Activities of Daily Living', detail: 'Full ADL + assisted transfers and repositioning' },
      { category: 'Mobility Support', detail: 'Repositioning and fall prevention' },
      { category: 'Nutrition Support', detail: 'Full feeding support and meal planning with family' },
      { category: 'Medication Support', detail: 'Strict reminder schedule and safety reporting' },
      { category: 'Basic Vital Monitoring', detail: 'Daily vitals + escalation if abnormal' },
      { category: 'Safety and Fall Prevention', detail: 'Active fall prevention and transfer support' },
      { category: 'Companionship', detail: 'Ongoing companionship and engagement' },
      { category: 'Family Communication', detail: 'Daily log + weekly supervisor call' },
      { category: 'Post-Hospital Care', detail: 'Intensive mobility and ADL support' },
      { category: 'Palliative Support', detail: 'Comfort routines and presence' },
      { category: 'Emergency Backup', detail: '24x7 backup and nurse guidance' },
    ],
    costCue: 'Comprehensive mobility care - safer, dignified living at home without clinical cost burden.',
    whyChoose: [
      'Built for higher mobility support needs',
      'Supports stroke, trauma, and disability recovery',
      'Improves safety during transfers and repositioning',
      'Balances hands-on care with family visibility',
    ],
    href: '/services/caring-hands',
  },
  {
    id: 'comfort-plus',
    name: 'Comfort Plus',
    tagline: 'Complete Care for Bedridden Patients',
    summary: 'Total bedside support for bedridden patients who need complete daily assistance, comfort routines, and careful observation at home.',
    image: '/images/pik-10.png',
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg, #E55A2B 0%, #FF6B35 54%, #FFF3ED 100%)',
    icon: 'Bedridden comfort care',
    facts: ['Complete bedside care', 'Pressure sore prevention', 'Frequent family updates'],
    bestFor: [
      'Bedridden adults with long-term illness (cancer, neurological disorders)',
      'Non-clinical palliative comfort care',
      'Post-ICU discharge adults requiring total daily support',
    ],
    highlights: [
      { title: 'Complete bedside hygiene', description: 'Bed bathing, sponge cleaning, dressing, grooming, skin care, and bedside comfort routines.' },
      { title: 'Pressure sore prevention', description: 'Regular repositioning, skin inspection, bed-rail positioning, and air-mattress checks support safety.' },
      { title: 'Feeding and comfort meals', description: 'Gentle feeding assistance, hydration tracking, and comfort-focused meal support.' },
      { title: 'Frequent reporting and escalation', description: 'Continuous vitals logging, daily documentation, supervisor review, and 24x7 backup support.' },
    ],
    scope: [
      { category: 'Activities of Daily Living', detail: 'Complete ADL and bedside hygiene' },
      { category: 'Mobility Support', detail: 'Full repositioning and pressure sore prevention' },
      { category: 'Nutrition Support', detail: 'Complete feeding assistance and comfort meals' },
      { category: 'Medication Support', detail: 'Strict reminders and full documentation' },
      { category: 'Basic Vital Monitoring', detail: 'Continuous vitals logging and supervisor review' },
      { category: 'Safety and Fall Prevention', detail: 'Full safety support incl. bed rails and positioning' },
      { category: 'Companionship', detail: 'Comfort presence and emotional support' },
      { category: 'Family Communication', detail: 'Daily logs + frequent family updates and escalation plan' },
      { category: 'Post-Hospital Care', detail: 'Full long-term comfort care' },
      { category: 'Palliative Support', detail: 'Dedicated bedside palliative presence' },
      { category: 'Emergency Backup', detail: '24x7 backup and escalation + supervisor oversight' },
    ],
    costCue: 'Round-the-clock comfort and support - high-touch care at a fraction of clinical cost.',
    whyChoose: [
      'Designed for bedridden and high-dependency daily care',
      'Focuses on comfort, hygiene, skin safety, and dignity',
      'Helpful for non-clinical palliative presence',
      'Gives families frequent updates and escalation support',
    ],
    href: '/services/comfort-plus',
  },
];

export const CARE_PACKAGE_NAMES = CARE_PACKAGES.map((pkg) => pkg.name);

export function getCarePackage(packageId: string) {
  return CARE_PACKAGES.find((pkg) => pkg.id === packageId);
}

export function getOtherCarePackages(packageId: string) {
  return CARE_PACKAGES.filter((pkg) => pkg.id !== packageId);
}
