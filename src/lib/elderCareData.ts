import type { ServiceScope } from '@/lib/packages';

export interface ElderCareHighlight {
  title: string;
  description: string;
}

export interface ElderCarePackage {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  gradient: string;
  image: string;
  bestFor: string[];
  highlights: ElderCareHighlight[];
  scope: ServiceScope[];
  whyChoose: string[];
  costCue: string;
  href: string;
}

export interface ElderCareCardItem {
  title: string;
  description: string;
  icon: string;
}

export interface ElderCareStep {
  title: string;
  description: string;
  timeline: string;
}

export interface ElderCareResource {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  readTime: string;
}

export interface ElderCareDownload {
  title: string;
  fileUrl: string;
}

export const ELDER_CARE_PACKAGES: ElderCarePackage[] = [
  {
    id: 'golden-companion',
    name: 'Golden Companion',
    tagline: 'Daily companionship and ADL support for independent seniors',
    icon: 'Elder Companion',
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg, #E55A2B 0%, #FF6B35 52%, #FFF3ED 100%)',
    image: '/images/elder-care/pik-7.png',
    bestFor: [
      'Seniors who live alone and need daily reassurance',
      'Mostly independent elders who need light ADL help',
      'Families who want reliable companionship and daily updates',
    ],
    highlights: [
      {
        title: 'Warm daily presence',
        description: 'Conversation, supervised routines, reading, walks, and gentle engagement to reduce loneliness.',
      },
      {
        title: 'Respectful personal support',
        description: 'Bathing reminders, dressing support, grooming help, toileting safety, and meal-time assistance.',
      },
      {
        title: 'Family peace of mind',
        description: 'Daily WhatsApp updates and quick escalation if mood, appetite, mobility, or vitals change.',
      },
    ],
    scope: [
      { category: 'Activities of Daily Living', detail: 'Light bathing, dressing, grooming, toileting prompts, and respectful hygiene support' },
      { category: 'Mobility and Fall Prevention', detail: 'Supervised indoor walks, chair transfers, and safety checks around common fall points' },
      { category: 'Nutrition and Hydration', detail: 'Meal reminders, hydration prompts, feeding assistance if needed, and appetite notes' },
      { category: 'Medication Support', detail: 'Strict reminders, family-informed missed-dose alerts, and routine documentation' },
      { category: 'Vital Sign Monitoring', detail: 'Basic BP, pulse, temperature, SpO2, and glucose logging when requested' },
      { category: 'Companionship', detail: 'Conversation, memory-friendly activities, and emotional reassurance' },
      { category: 'Family Communication', detail: 'Daily logs and WhatsApp summaries for local and NRI families' },
    ],
    whyChoose: [
      'A gentle entry-level plan for seniors who need structure without heavy clinical support',
      'Keeps elders active, socially connected, and safer inside their own home',
      'Ideal for families who want dependable observation before needs become urgent',
    ],
    costCue: 'Affordable daily companionship that helps seniors stay independent at home.',
    href: '/elder-care/golden-companion',
  },
  {
    id: 'graceful-recovery',
    name: 'Graceful Recovery',
    tagline: 'Post-hospital and post-surgery recovery support for elders',
    icon: 'Hospital Recovery',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 52%, #0CB3B3 100%)',
    image: '/images/elder-care/pik-8.png',
    bestFor: [
      'Elders returning home after hospitalization',
      'Post-surgery recovery with mobility or wound observation needs',
      'Families trying to avoid readmission through structured home routines',
    ],
    highlights: [
      {
        title: 'Discharge-to-home routine',
        description: 'Caregivers help families follow discharge advice, rest schedules, nutrition, and mobility precautions.',
      },
      {
        title: 'Recovery-friendly monitoring',
        description: 'Vitals, wound observation, medication reminders, and daily status notes are tracked consistently.',
      },
      {
        title: 'Rehab-safe assistance',
        description: 'Support for transfers, supervised walks, breathing exercises, and doctor-advised activity limits.',
      },
    ],
    scope: [
      { category: 'Post-Hospital Transition', detail: 'Discharge routine support, appointment reminders, recovery planning, and family coordination' },
      { category: 'Activities of Daily Living', detail: 'Hands-on hygiene, dressing, toileting, and bedside assistance during weak recovery phases' },
      { category: 'Mobility and Fall Prevention', detail: 'Assisted transfers, supervised walking, fall-risk checks, and repositioning reminders' },
      { category: 'Nutrition and Hydration', detail: 'Recovery diet reminders, hydration tracking, and appetite reporting' },
      { category: 'Medication Support', detail: 'Dose timing reminders, missed-dose alerts, and medicine stock visibility for families' },
      { category: 'Vital Sign Monitoring', detail: 'BP, pulse, temperature, SpO2, and glucose logs with escalation when readings are abnormal' },
      { category: 'Family Communication', detail: 'Daily care logs, recovery progress updates, and supervisor check-ins' },
    ],
    whyChoose: [
      'Best fit when the first days after discharge need calm, watchful structure',
      'Bridges the gap between hospital instructions and practical home routines',
      'Helps families notice warning signs early and act before complications grow',
    ],
    costCue: 'Structured recovery support that can reduce avoidable hospital revisits.',
    href: '/elder-care/graceful-recovery',
  },
  {
    id: 'health-mind-guardian',
    name: 'Health & Mind Guardian',
    tagline: 'Chronic illness management with cognitive and dementia companion care',
    icon: 'Brain Health',
    color: '#0CB3B3',
    gradient: 'linear-gradient(135deg, #0A8F8F 0%, #0CB3B3 52%, #0CB3B3 100%)',
    image: '/images/elder-care/pik-9.png',
    bestFor: [
      'Seniors with diabetes, hypertension, Parkinsons, stroke history, or cardiac concerns',
      'Families supporting early dementia, Alzheimer related confusion, or memory decline',
      'Elders who need routine monitoring plus meaningful mental engagement',
    ],
    highlights: [
      {
        title: 'Health routine discipline',
        description: 'Structured reminders, vitals logs, diet prompts, and abnormal-reading escalation help stabilize daily care.',
      },
      {
        title: 'Cognitive companionship',
        description: 'Memory-friendly activities, calm redirection, conversation, and anxiety reduction for confused elders.',
      },
      {
        title: 'Nurse-led visibility',
        description: 'Supervisor review and family reporting help keep chronic conditions from drifting unnoticed.',
      },
    ],
    scope: [
      { category: 'Chronic Illness Support', detail: 'Daily routine support for diabetes, BP, Parkinsons, stroke recovery, and cardiac precautions' },
      { category: 'Cognitive Care', detail: 'Dementia-friendly companionship, gentle redirection, routine anchoring, and anxiety reduction' },
      { category: 'Activities of Daily Living', detail: 'Personal hygiene, dressing, toileting, and grooming support with patience and dignity' },
      { category: 'Nutrition and Hydration', detail: 'Diet reminders, hydration tracking, glucose-conscious meal prompts, and appetite notes' },
      { category: 'Medication Support', detail: 'Strict reminder schedule, medicine log, family alerts, and routine adherence support' },
      { category: 'Vital Sign Monitoring', detail: 'BP, glucose, SpO2, pulse, temperature, and symptom observation notes' },
      { category: 'Family Communication', detail: 'Daily reports, incident alerts, NRI family updates, and supervisor summaries' },
    ],
    whyChoose: [
      'Designed for families balancing medical routines with emotional and cognitive needs',
      'Useful when a senior is physically stable but needs close daily observation',
      'Pairs practical chronic-care discipline with companionship that feels humane',
    ],
    costCue: 'Balanced health and cognitive support without moving your loved one away from home.',
    href: '/elder-care/health-mind-guardian',
  },
  {
    id: 'comfort-care',
    name: 'Comfort Care',
    tagline: 'Complete bedridden elder care and palliative comfort support',
    icon: 'Comfort Palliative',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 54%, #0CB3B3 100%)',
    image: '/images/elder-care/pik-10.png',
    bestFor: [
      'Bedridden seniors who need total ADL and bedside support',
      'Palliative comfort, frailty, cancer care, or advanced neurological illness',
      'Families needing 12-hour or 24-hour caregiver presence with escalation support',
    ],
    highlights: [
      {
        title: 'Complete bedside assistance',
        description: 'Full hygiene, feeding, repositioning, skin care reminders, and comfort routines are handled with dignity.',
      },
      {
        title: 'Pressure sore prevention',
        description: 'Repositioning schedules, linen hygiene, hydration prompts, and skin observation reduce avoidable discomfort.',
      },
      {
        title: 'Comfort-first presence',
        description: 'Calm bedside support, family communication, and emergency escalation help loved ones feel protected.',
      },
    ],
    scope: [
      { category: 'Complete ADL Care', detail: 'Full bathing, sponge bath, grooming, toileting, diaper care, dressing, and oral hygiene support' },
      { category: 'Bedridden Support', detail: 'Repositioning, pressure sore prevention reminders, linen changes, and bedside comfort routines' },
      { category: 'Nutrition and Hydration', detail: 'Feeding assistance, hydration prompts, comfort meals, and intake observation' },
      { category: 'Medication Support', detail: 'Strict reminder tracking, documentation, and family escalation for missed or refused medicines' },
      { category: 'Vital Sign Monitoring', detail: 'Routine vitals logs and urgent escalation if health status changes' },
      { category: 'Palliative Comfort', detail: 'Comfort presence, gentle handling, symptom observation, and family emotional support' },
      { category: 'Family Communication', detail: 'Detailed daily logs, incident alerts, and frequent supervisor-led family updates' },
    ],
    whyChoose: [
      'Built for high-dependency elder care where dignity and comfort matter every hour',
      'Supports families who cannot manage total bedside care alone',
      'Combines caregiver presence, nurse-led oversight, and clear escalation protocols',
    ],
    costCue: 'High-touch comfort care at home with flexible shift and 24-hour options.',
    href: '/elder-care/comfort-care',
  },
];

export const ELDER_CARE_SAFETY_POINTS: ElderCareCardItem[] = [
  { title: 'Verified caregivers', description: 'Identity checks, screening, and role-fit matching before deployment.', icon: 'Verified Caregivers' },
  { title: 'Nurse-led oversight', description: 'Care routines are reviewed by supervisors with clinical homecare experience.', icon: 'Nurse Oversight' },
  { title: 'Hospital-grade hygiene', description: 'Hand hygiene, PPE guidance, clean handling, and infection-control discipline.', icon: 'Hygiene Protocols' },
  { title: '24x7 emergency escalation', description: 'Families get clear escalation routes when condition, vitals, or behavior changes.', icon: 'Emergency Escalation' },
  { title: 'Transparent reporting', description: 'Daily care logs, WhatsApp updates, and incident notes for local and NRI families.', icon: 'Transparent Reporting' },
];

export const ELDER_CARE_WHO_NEEDS: ElderCareCardItem[] = [
  { title: 'Seniors living alone', description: 'Daily support, companionship, safety checks, and emotional reassurance.', icon: 'Senior Living Alone' },
  { title: 'NRI families', description: 'Reliable local care with routine reporting and quick escalation.', icon: 'NRI Family Updates' },
  { title: 'Post-hospital elders', description: 'Discharge routines, mobility help, vitals tracking, and recovery observation.', icon: 'Hospital Recovery' },
  { title: 'Dementia or confusion', description: 'Calm companionship, memory-friendly activities, and safe routine anchoring.', icon: 'Dementia Cognitive Support' },
  { title: 'Chronic illness', description: 'Medication reminders, diet prompts, vitals logs, and symptom observation.', icon: 'Chronic Medication' },
  { title: 'Fall-risk seniors', description: 'Transfer support, walking supervision, home safety checks, and repositioning.', icon: 'Fall Prevention Mobility' },
];

export const ELDER_CARE_DELIVERABLES: ElderCareCardItem[] = [
  { title: 'Personal care support', description: 'Bathing, dressing, grooming, toileting, oral care, and respectful hygiene assistance.', icon: 'Personal Care Bath' },
  { title: 'Mobility assistance', description: 'Safe transfers, supervised walking, fall-prevention prompts, and repositioning support.', icon: 'Mobility Transfer' },
  { title: 'Nutrition and hydration', description: 'Meal support, feeding assistance, appetite notes, hydration reminders, and diet coordination.', icon: 'Nutrition Hydration' },
  { title: 'Medication reminders', description: 'Dose-time prompts, missed-dose alerts, medicine stock visibility, and daily logs.', icon: 'Medication Pill' },
  { title: 'Vital monitoring', description: 'BP, temperature, pulse, SpO2, glucose, and symptom observation when required.', icon: 'Vital Sign Monitoring' },
  { title: 'Companionship', description: 'Conversation, activities, reassurance, anxiety reduction, and meaningful daily engagement.', icon: 'Companionship Emotional Support' },
  { title: 'Family updates', description: 'WhatsApp updates, NRI reporting, supervisor notes, and incident escalation.', icon: 'Family Updates Report' },
  { title: 'Safety checks', description: 'Fall-risk checks, hygiene discipline, bed safety, and home environment observation.', icon: 'Safety Shield' },
];

export const ELDER_CARE_ONBOARDING_STEPS: ElderCareStep[] = [
  {
    title: 'Care assessment',
    timeline: 'Day 1',
    description: 'We understand the senior condition, family expectations, home setup, shift need, and risk points.',
  },
  {
    title: 'Care plan design',
    timeline: 'Within 24 hours',
    description: 'A practical plan is mapped around ADLs, mobility, medications, vitals, reporting, and emergency steps.',
  },
  {
    title: 'Caregiver matching',
    timeline: '24-48 hours',
    description: 'We match a verified caregiver based on dependency level, language comfort, schedule, and care sensitivity.',
  },
  {
    title: 'Care begins',
    timeline: 'Start date',
    description: 'The caregiver starts with clear routines, documentation, family coordination, and supervisor visibility.',
  },
  {
    title: 'Ongoing monitoring',
    timeline: 'Every week',
    description: 'The care plan is reviewed as the senior improves, declines, or needs a different package intensity.',
  },
];

export const ELDER_CARE_COMPONENTS: ElderCareCardItem[] = [
  { title: 'Activities of Daily Living', description: 'Bathing, dressing, grooming, oral care, toileting, diaper support, and respectful hygiene routines.', icon: 'Bath Daily Living' },
  { title: 'Mobility and Fall Prevention', description: 'Supervised walking, bed-to-chair transfers, repositioning, balance support, and home fall-risk checks.', icon: 'Mobility Fall Prevention' },
  { title: 'Nutrition and Hydration', description: 'Feeding assistance, diet prompts, hydration reminders, appetite observation, and family-informed intake notes.', icon: 'Nutrition Hydration' },
  { title: 'Medication Management', description: 'Strict reminders, dosage tracking, missed-dose alerts, medicine stock checks, and doctor-report readiness.', icon: 'Medication Management' },
  { title: 'Vital Sign Monitoring', description: 'BP, temperature, pulse, SpO2, glucose, symptom observation, and escalation when readings are abnormal.', icon: 'Vital Sign Monitoring' },
  { title: 'Safety and Home Environment', description: 'Bed rails, bathroom safety, clutter checks, hygiene discipline, infection-control habits, and safe routines.', icon: 'Safety Home Environment' },
  { title: 'Companionship and Emotional Support', description: 'Conversation, mental stimulation, routine anchoring, anxiety reduction, and emotional reassurance.', icon: 'Companionship Emotional' },
  { title: 'Family Communication', description: 'Daily logs, WhatsApp updates, NRI family reporting, incident alerts, and supervisor summaries.', icon: 'Family Communication Report' },
  { title: 'Post-Hospital Transition Care', description: 'Discharge routine support, recovery protocols, appointment reminders, and readmission-risk observation.', icon: 'Post Hospital Transition' },
  { title: 'Emergency and Palliative Support', description: '24x7 escalation, comfort care, bedside presence, palliative sensitivity, and family coordination.', icon: 'Emergency Palliative Support' },
];

export const ELDER_CARE_FAQS = [
  {
    id: 1,
    question: 'What is included in Elder Care at home?',
    answer: 'Elder Care includes personal care, mobility support, medication reminders, vitals monitoring when required, companionship, nutrition prompts, safety checks, and daily family updates.',
  },
  {
    id: 2,
    question: 'Is Elder Care different from Basic Nursing Care?',
    answer: 'Yes. Elder Care is designed around senior-specific needs such as fall prevention, dementia-friendly companionship, chronic illness routines, NRI family reporting, and high-dependency bedside comfort.',
  },
  {
    id: 3,
    question: 'Can you support parents when children live abroad?',
    answer: 'Yes. Narpavi Homecare supports NRI families with daily WhatsApp updates, incident alerts, supervisor check-ins, and clear escalation if health or safety concerns appear.',
  },
  {
    id: 4,
    question: 'Do caregivers handle dementia or Alzheimer related confusion?',
    answer: 'We provide trained companion support for early cognitive decline, confusion, routine anchoring, calm redirection, and family reporting. Clinical diagnosis and medication decisions remain with doctors.',
  },
  {
    id: 5,
    question: 'Can the caregiver stay for 24 hours?',
    answer: 'Yes. Depending on need and availability, we can arrange day shift, night shift, 12-hour support, or 24-hour care for high-dependency seniors.',
  },
  {
    id: 6,
    question: 'Will you monitor BP, sugar, and oxygen levels?',
    answer: 'Caregivers can record basic vitals such as BP, pulse, temperature, SpO2, and glucose when equipment is available and the care plan includes monitoring.',
  },
  {
    id: 7,
    question: 'Can Elder Care help after hospital discharge?',
    answer: 'Yes. The Graceful Recovery package is built for post-hospital and post-surgery elders who need discharge routines, mobility help, vitals logs, wound observation, and family updates.',
  },
  {
    id: 8,
    question: 'How fast can care start?',
    answer: 'After the assessment, caregiver matching usually begins quickly. Many families can start care within 24 to 48 hours depending on location, shift type, and care complexity.',
  },
  {
    id: 9,
    question: 'Do you provide palliative or bedridden elder support?',
    answer: 'Yes. The Comfort Care package supports bedridden seniors with full ADL help, feeding assistance, repositioning, pressure sore prevention reminders, bedside comfort, and escalation support.',
  },
];

export const ELDER_CARE_DOWNLOADS: ElderCareDownload[] = [
  {
    title: 'Caring for a Parent With Dementia or Alzheimer\'s - A Family Guide',
    fileUrl: '/downloads/elder-care/caring-for-parent-dementia-family-guide.docx',
  },
  {
    title: 'Managing Chronic Conditions Safely at Home',
    fileUrl: '/downloads/elder-care/managing-chronic-conditions-safely-at-home.docx',
  },
  {
    title: 'Preventing Falls at Home: Safety Tips for Seniors',
    fileUrl: '/downloads/elder-care/preventing-falls-safety-tips-seniors-chennai.docx',
  },
  {
    title: 'Staying Happy & Connected - Tips for Seniors Living Alone',
    fileUrl: '/downloads/elder-care/staying-happy-connected-seniors-living-alone.docx',
  },
];

export const ELDER_CARE_RESOURCES: ElderCareResource[] = [
  {
    title: 'Post Hospital Recovery at Home for Seniors',
    excerpt: 'How to avoid readmission with safe routines, mobility help, and family monitoring.',
    image: '/images/elder-care/pik-12.jpg',
    href: '/blog/post-hospital-recovery-at-home',
    readTime: '5 min read',
  },
  {
    title: 'Managing Chronic Conditions at Home',
    excerpt: 'Diabetes, heart, and stroke care routines for seniors.',
    image: '/images/elder-care/pik-13.png',
    href: '/blog/post-surgery-recovery-at-home',
    readTime: '7 min read',
  },
  {
    title: 'Caring for a Parent With Dementia at Home',
    excerpt: 'What every family should know about routines, safety, and reassurance.',
    image: '/images/elder-care/pik-14.jpg',
    href: '/blog/palliative-care-at-home',
    readTime: '6 min read',
  },
  {
    title: 'Palliative and End-of-Life Care at Home',
    excerpt: 'Comfort-first support that protects dignity and keeps families informed.',
    image: '/images/elder-care/pik-15.png',
    href: '/blog/what-does-a-basic-nursing-care-caregiver-do',
    readTime: '6 min read',
  },
];

export function getElderCarePackage(packageId: string) {
  return ELDER_CARE_PACKAGES.find((pkg) => pkg.id === packageId);
}

export function getOtherElderCarePackages(packageId: string) {
  return ELDER_CARE_PACKAGES.filter((pkg) => pkg.id !== packageId);
}
