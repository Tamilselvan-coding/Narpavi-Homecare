import type { FAQ } from '@/lib/faqs';

export interface BabyCarePackage {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  color: string;
  gradient: string;
  icon: string;
  facts: string[];
  idealFor: string[];
  includes: string[];
  highlights: Array<Pick<BabyCareCard, 'title' | 'description'>>;
  scope: Array<{ category: string; detail: string }>;
  costCue: string;
  whyChoose: string[];
  href: string;
}

export interface BabyCareCard {
  title: string;
  description: string;
  icon: string;
}

export interface BabyCareDownload {
  title: string;
  fileUrl: string;
}

export interface BabyCareResource {
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export const BABY_CARE_PACKAGE_NAMES = [
  'Active Assist',
  'Guided Living',
  'Caring Hands',
  'Comfort Plus',
];

export const BABY_CARE_BENEFITS = [
  {
    title: 'Benefits to the Mother',
    icon: 'Mother postnatal recovery',
    points: [
      'Faster postnatal recovery',
      'More rest, less exhaustion',
      'Reduced stress and anxiety',
      'Dedicated postnatal support',
    ],
  },
  {
    title: 'Benefits to the Family',
    icon: 'Family support',
    points: [
      'Saves time every day',
      'Calmer home environment',
      'Consistent, reliable care',
      'Peace of mind for everyone',
    ],
  },
  {
    title: 'Benefits to the Baby',
    icon: 'Newborn baby care',
    points: [
      'Safe, hygienic daily care',
      'Better sleep and feeding routines',
      'Lower risk of infections and discomfort',
      'Comfort of familiar home care',
    ],
  },
];

export const BABY_CARE_DELIVERABLES: BabyCareCard[] = [
  {
    title: 'Newborn & Sleep Care',
    description: 'Diapering, gentle bathing, vital signs monitoring, safe sleep, colic soothing, and daily routines.',
    icon: 'Newborn sleep care',
  },
  {
    title: 'Mother & Baby Wellness Care',
    description: 'Lactation guidance, nutrition reminders, emotional support, and assistance with maternal recovery.',
    icon: 'Mother wellness care',
  },
  {
    title: 'Feeding Assistance',
    description: 'Breastfeeding support, formula preparation, bottle sterilization, burping, and feeding logs.',
    icon: 'Feeding milk baby',
  },
  {
    title: 'Special Baby Care - NICU Level',
    description: 'Skilled home support for preterm or medically vulnerable infants, including kangaroo care guidance.',
    icon: 'NICU baby nurse',
  },
  {
    title: 'Working Parents Support',
    description: 'Day or night caregivers, flexible schedules, routine tracking, and emergency backup care.',
    icon: 'Working parents baby care',
  },
  {
    title: 'Growth & Development Monitoring',
    description: 'Weight, feeding, sleep, and milestone logs that help parents understand baby progress.',
    icon: 'Growth monitoring baby',
  },
];

export const BABY_CARE_WHO = [
  'Parents with family support in place, but requiring extra assistance',
  'First-time parents with family far away who need professional guidance',
  'Working parents or second-baby families balancing career and baby care',
  'Parents of premature babies or babies with special needs',
  'Mothers needing recovery time after delivery or C-section',
  'Mothers who delivered twin babies',
];

export const BABY_CARE_PACKAGES: BabyCarePackage[] = [
  {
    id: 'active-assist',
    name: 'Active Assist',
    tagline: 'Peaceful nights, productive days',
    summary: 'Gentle newborn and night routine support for families who already have some help but need reliable extra care.',
    image: '/images/baby-care/pik-7.png',
    color: '#0CB3B3',
    gradient: 'linear-gradient(135deg, #0A8F8F 0%, #0CB3B3 52%, #0CB3B3 100%)',
    icon: 'Night newborn care',
    facts: ['Night care', 'Feeding help', 'Parent rest'],
    idealFor: [
      'Parents with family support who need additional help',
      'Parents needing overnight help to rest',
      'Mothers of twins managing night feeds and sleep schedules',
    ],
    includes: ['Newborn & Sleep Care', 'Working Parents Support', 'Feeding Assistance'],
    highlights: [
      { title: 'Safe night routines', description: 'Caregivers support diapering, soothing, safe sleep checks, and routine baby monitoring during rest hours.' },
      { title: 'Feeding support', description: 'Assistance with night feeds, burping, bottle sterilization, and simple feeding logs.' },
      { title: 'Rest for parents', description: 'Parents get calmer nights while still receiving updates on sleep, feeding, and baby comfort.' },
    ],
    scope: [
      { category: 'Newborn & Sleep Care', detail: 'Diapering, soothing, safe sleep monitoring, and basic night routine support' },
      { category: 'Feeding Assistance', detail: 'Breastfeeding support, bottle preparation, sterilization, burping, and feed notes' },
      { category: 'Working Parents Support', detail: 'Flexible day or night caregiver support for busy parents' },
      { category: 'Family Updates', detail: 'Simple sleep, feed, diaper, and comfort logs for parents' },
      { category: 'Emergency Escalation', detail: 'Prompt family alert if fever, breathing discomfort, feeding refusal, or unusual crying is noticed' },
    ],
    costCue: 'Ideal for families who need extra help without a full mother-baby wellness plan.',
    whyChoose: [
      'Best fit for overnight help and parent rest',
      'Useful when family support is present but not enough',
      'Keeps newborn routines calm and consistent',
      'Supports twin night feeds and sleep schedules',
    ],
    href: '/baby-care/active-assist',
  },
  {
    id: 'guided-living',
    name: 'Guided Living',
    tagline: 'Gentle beginning for your baby',
    summary: 'Structured guidance for first-time parents and working couples who need a steady baby care routine at home.',
    image: '/images/baby-care/pik-8.png',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 52%, #0CB3B3 100%)',
    icon: 'Newborn routine guidance',
    facts: ['First-time parents', 'Routine guidance', 'Safe hygiene'],
    idealFor: [
      'First-time parents, especially away from family',
      'Working couples balancing career and baby routines',
      'First-time mothers of twins managing night feeds and sleep',
    ],
    includes: ['Newborn & Sleep Care', 'Feeding Assistance'],
    highlights: [
      { title: 'Daily routine setup', description: 'Support for bathing, diapering, safe handling, feeding rhythm, and sleep routines.' },
      { title: 'Parent education', description: 'Caregivers guide new parents on feeding cues, burping, hygiene, and newborn comfort.' },
      { title: 'Hygiene discipline', description: 'Sterilization, hand hygiene, cord care awareness, and infection-prevention practices are reinforced.' },
    ],
    scope: [
      { category: 'Newborn & Sleep Care', detail: 'Bathing support, diapering, sleep routine guidance, soothing, and safe handling' },
      { category: 'Feeding Assistance', detail: 'Feeding cues, bottle prep, breastfeeding support, burping, and feed tracking' },
      { category: 'Parent Guidance', detail: 'Practical support for first-time parents learning daily newborn routines' },
      { category: 'Hygiene Support', detail: 'Sterilization, clean handling, and safe home care routines' },
      { category: 'Routine Logs', detail: 'Simple daily notes for feeding, sleep, diaper changes, and baby comfort' },
    ],
    costCue: 'A steady starter plan for families who want professional guidance during the first weeks.',
    whyChoose: [
      'Best fit for first-time parents',
      'Helps families living away from elders or relatives',
      'Creates predictable feeding and sleep routines',
      'Balances working-parent schedules with baby needs',
    ],
    href: '/baby-care/guided-living',
  },
  {
    id: 'caring-hands',
    name: 'Caring Hands',
    tagline: 'Care for two hearts, one bond',
    summary: 'Complete mother and baby wellness care for delivery recovery, C-section comfort, twin care, and family confidence.',
    image: '/images/baby-care/pik-9.png',
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg, #E55A2B 0%, #FF6B35 54%, #FFF3ED 100%)',
    icon: 'Mother baby wellness',
    facts: ['Mother recovery', 'Baby care', 'Wellness logs'],
    idealFor: [
      'Mothers recovering after delivery or C-section',
      'Mothers of twins needing complete wellness support',
      'Families seeking full mother-baby wellness care',
    ],
    includes: ['Newborn & Sleep Care', 'Feeding Assistance', 'Mother & Baby Wellness Care', 'Growth & Development Monitoring'],
    highlights: [
      { title: 'Mother recovery support', description: 'Gentle help for rest, hydration reminders, recovery comfort, and emotional reassurance.' },
      { title: 'Full baby routine care', description: 'Daily newborn routines, feeding help, safe sleep, hygiene, and comfort monitoring.' },
      { title: 'Growth and routine tracking', description: 'Feeding, sleep, diaper, weight, and milestone notes help families follow baby progress.' },
    ],
    scope: [
      { category: 'Mother & Baby Wellness Care', detail: 'Mother recovery support, lactation guidance, emotional comfort, and daily baby routines' },
      { category: 'Newborn & Sleep Care', detail: 'Safe sleep, soothing, diapering, bathing support, and baby comfort routines' },
      { category: 'Feeding Assistance', detail: 'Breastfeeding help, bottle prep, sterilization, burping, and feeding records' },
      { category: 'Growth Monitoring', detail: 'Weight, feeding, sleep, diaper, and milestone logs' },
      { category: 'Twin Support', detail: 'Routine support for families managing two babies and extra recovery needs' },
    ],
    costCue: 'Balanced support for both mother recovery and baby care during the most demanding weeks.',
    whyChoose: [
      'Best fit after delivery or C-section',
      'Supports mothers of twins',
      'Combines mother recovery and newborn care',
      'Gives families visible daily wellness updates',
    ],
    href: '/baby-care/caring-hands',
  },
  {
    id: 'comfort-plus',
    name: 'Comfort Plus',
    tagline: 'Expert care for delicate beginnings',
    summary: 'Advanced home support for premature, low birth weight, medically vulnerable, or post-NICU babies who need extra observation.',
    image: '/images/baby-care/pik-10.png',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 54%, #0CB3B3 100%)',
    icon: 'NICU level baby care',
    facts: ['Preterm care', 'Kangaroo care', 'Close monitoring'],
    idealFor: [
      'Parents of premature babies',
      'Babies with low birth weight or special medical needs',
      'Babies recovering after NICU discharge',
    ],
    includes: ['Newborn & Sleep Care', 'Feeding Assistance', 'Special Baby Care - NICU Level', 'Growth & Development Monitoring'],
    highlights: [
      { title: 'Special baby care support', description: 'Extra observation and gentle handling for preterm, low birth weight, or post-NICU babies.' },
      { title: 'Kangaroo care guidance', description: 'Support for safe skin-to-skin bonding routines when advised by the doctor.' },
      { title: 'Strict hygiene and monitoring', description: 'Caregivers follow careful hygiene, feeding, temperature, and warning-sign tracking.' },
    ],
    scope: [
      { category: 'Special Baby Care - NICU Level', detail: 'Home support for preterm, low birth weight, medically vulnerable, or post-NICU babies' },
      { category: 'Newborn & Sleep Care', detail: 'Gentle handling, safe sleep, comfort routines, and temperature awareness' },
      { category: 'Feeding Assistance', detail: 'Feeding schedule support, sterilization, burping, and tolerance observation' },
      { category: 'Growth Monitoring', detail: 'Feeding, sleep, temperature, diaper, and milestone logs for family review' },
      { category: 'Escalation Support', detail: 'Prompt family alert for fever, breathing difficulty, blue lips, feeding refusal, or unusual lethargy' },
    ],
    costCue: 'Higher-touch baby care for delicate beginnings and post-NICU transitions at home.',
    whyChoose: [
      'Best fit for premature or low birth weight babies',
      'Supports post-NICU transition at home',
      'Keeps hygiene and monitoring routines stricter',
      'Helps parents feel supported through delicate care needs',
    ],
    href: '/baby-care/comfort-plus',
  },
];

export function getBabyCarePackage(packageId: string) {
  return BABY_CARE_PACKAGES.find((pkg) => pkg.id === packageId);
}

export function getOtherBabyCarePackages(packageId: string) {
  return BABY_CARE_PACKAGES.filter((pkg) => pkg.id !== packageId);
}

export const BABY_CARE_TRUST_POINTS: BabyCareCard[] = [
  {
    title: 'Rigorous Caregiver Screening',
    description: 'Every caregiver and nurse is vetted, trained, and reviewed before entering your home.',
    icon: 'Verified caregiver',
  },
  {
    title: 'Pediatrician-Guided Care Protocols',
    description: 'Care routines follow newborn safety, feeding, sleep, and escalation standards.',
    icon: 'Pediatrician nurse care',
  },
  {
    title: 'Infection Control & Hygiene',
    description: 'Strict hand hygiene, sterilization, safe handling, and home cleanliness practices.',
    icon: 'Infection hygiene',
  },
  {
    title: 'Real-Time Monitoring & Communication',
    description: 'Daily logs, feeding notes, sleep updates, and quick escalation when needed.',
    icon: 'Real-time communication',
  },
  {
    title: 'Customized Care Plan',
    description: 'Plans are matched to the baby age, mother recovery, family support, and shift need.',
    icon: 'Personalized care plan',
  },
  {
    title: 'Affordable & Transparent Pricing',
    description: 'Clear package guidance so families can choose support without confusion.',
    icon: 'Transparent pricing',
  },
];

export const BABY_CARE_FAQS: FAQ[] = [
  {
    id: 1,
    question: 'What is included in Narpavi Baby Care services?',
    answer: 'Baby Care services cover newborn and infant care at home, including feeding support, hygiene, bathing, diaper changing, safe handling, sleep routine guidance, and monitoring baby well-being. We also support premature or low birth weight babies and mothers after C-section deliveries.',
  },
  {
    id: 2,
    question: 'Who will take care of my baby?',
    answer: 'Only trained and experienced baby care nurses or caregivers will look after your baby. They are skilled in newborn handling, hygiene, feeding techniques, and basic health monitoring, and all staff undergo background verification.',
  },
  {
    id: 3,
    question: 'Can you provide care for twins or multiple babies?',
    answer: 'Yes. We provide dedicated caregivers for twins or multiple babies so each child receives equal attention, safe handling, feeding support, and routine tracking.',
  },
  {
    id: 4,
    question: 'Will the nurse also guide me as a new parent?',
    answer: 'Yes. Baby care nurses educate and guide parents on feeding, bathing, sleep routines, burping, hygiene, and baby health monitoring. This is especially helpful for first-time parents.',
  },
  {
    id: 5,
    question: 'Can the caregiver stay overnight?',
    answer: 'Yes. Overnight baby care is available so parents can rest while knowing the baby is being monitored and cared for safely.',
  },
  {
    id: 6,
    question: 'How do you match the right caregiver for my baby?',
    answer: 'We assess the baby age, health condition, mother recovery needs, family support, and preferred shift before assigning a caregiver with the right skills and experience.',
  },
  {
    id: 7,
    question: 'How often should I bathe my newborn?',
    answer: 'For the first few weeks, sponge-bathing 2-3 times a week is usually enough. Daily baths are not necessary and may dry delicate skin. Keep the diaper area clean and dry at all times.',
  },
  {
    id: 8,
    question: 'How do I know if my baby is feeding enough?',
    answer: 'Good signs include 6-8 wet diapers per day, appearing content after feeding, and steady weight gain during check-ups. A baby care nurse can help monitor feeding patterns.',
  },
  {
    id: 9,
    question: 'What is kangaroo mother care?',
    answer: 'Kangaroo mother care means holding the baby skin-to-skin against the chest. It helps regulate temperature, supports bonding and breastfeeding, and reduces infection risks for premature babies.',
  },
  {
    id: 10,
    question: 'How do I book Narpavi Baby Care services?',
    answer: 'Call our helpline or message us through WhatsApp or the website. We will discuss your needs, recommend the right package, and arrange care at your preferred time.',
  },
];

export const BABY_CARE_DOWNLOADS: BabyCareDownload[] = [
  {
    title: 'Preparing for Your Newborn First Days at Home',
    fileUrl: '/downloads/baby-care/preparing-for-a-newborn-at-home.docx',
  },
  {
    title: 'Caring for a Premature Baby at Home',
    fileUrl: '/downloads/baby-care/caring-for-premature-babies-safely-at-home.docx',
  },
  {
    title: 'Postnatal Recovery Tips for Indian Mothers',
    fileUrl: '/downloads/baby-care/postnatal-recovery-tips-for-indian-mothers.docx',
  },
  {
    title: 'Educative FAQs in Baby Care',
    fileUrl: '/downloads/baby-care/educative-faqs-in-baby-care.docx',
  },
];

export const BABY_CARE_RESOURCES: BabyCareResource[] = [
  {
    title: 'How to Choose the Right Baby Caregiver in Chennai',
    excerpt: 'Key checks for training, background verification, hygiene standards, and support backup.',
    image: '/images/baby-care/pik-12.jpeg',
    href: '/baby-care#baby-care-blogs',
  },
  {
    title: 'Night Care for Newborns: Why Parents Need Rest Too',
    excerpt: 'How overnight support protects newborn routines while helping parents recover from exhaustion.',
    image: '/images/baby-care/pik-13.jpeg',
    href: '/baby-care#baby-care-blogs',
  },
  {
    title: 'Safe Hygiene & Infection Control for Newborns at Home',
    excerpt: 'Simple practices for hand hygiene, feeding safety, cord care, and visitor management.',
    image: '/images/baby-care/pik-14.jpeg',
    href: '/baby-care#baby-care-blogs',
  },
  {
    title: 'Twin Baby Care at Home: Real Tips for Double the Joy',
    excerpt: 'Practical feeding, sleep, and support tips for families caring for twins at home.',
    image: '/images/baby-care/pik-15.jpeg',
    href: '/baby-care#baby-care-blogs',
  },
];
