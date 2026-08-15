import type { FAQ } from '@/lib/faqs';

export interface ICUAtHomeCard {
  title: string;
  icon: string;
}

export interface ICUAtHomeTextCard {
  text: string;
  icon: string;
}

export interface ICUAtHomePackage {
  id: string;
  name: string;
  fullTitle: string;
  image: string;
  color: string;
  gradient: string;
  icon: string;
  badge?: string;
  bestFor: string[];
  scope: string[];
  deliverables: string[];
  costCue: string;
  cta: string;
}

export interface ICUAtHomeDownload {
  title: string;
  fileUrl: string;
}

export interface ICUAtHomeResource {
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export const ICU_AT_HOME_HERO_TITLE = 'ICU @ Home in Chennai — Safe, Affordable & High-Grade';

export const ICU_AT_HOME_SUMMARY = {
  heading: 'What is ICU Care at Home  | Step-Down & Advanced Critical Care',
  body: 'ICU at Home is a specialized, advanced-level care provided at the patient’s home, replicating the clinical standards of an intensive care unit. Recovering after a critical illness doesn’t have to mean long, expensive hospital stays. Narpavi  Step-Down ICU Care at Home in Chennai offers a safe, medically supervised transition from hospital ICU to home-based recovery. We provide hospital-level intensive care at home with ICU-trained nurses, advanced monitoring equipment, and specialist oversight — ensuring safety, dignity, and faster healing.',
};

export const ICU_AT_HOME_WHO_INTRO = 'Not every patient discharged from an ICU is ready for fully independent living. At Narpavi ICU at Home, we support a wide range of critical care patients — helping families avoid hospital readmission, reduce costs, and keep loved ones safe in a familiar environment.';

export const ICU_AT_HOME_WHO_HEADING = 'Patients We Care Under  ICU @ Home';

export const ICU_AT_HOME_WHO: ICUAtHomeTextCard[] = [
  {
    text: 'Elderly Patients with Multiple Comorbidities - Seniors 60+ with diabetes, hypertension, post-stroke or frailty who require ICU-level monitoring and nursing.',
    icon: 'ICU patient support',
  },
  {
    text: 'Chronic Respiratory or Cardiac Conditions - For individuals with COPD, heart failure, long COVID, or oxygen / ventilator needs, avoiding prolonged hospital stays.',
    icon: 'ICU patient support',
  },
  {
    text: 'Post-Critical Illness Recovery - For Patients   recently discharged from hospital ICU who still need ventilator weaning, IV medication, or close monitoring.',
    icon: 'ICU patient support',
  },
  {
    text: 'Palliative & End-of-Life Care Guests - Patients needing pain control, ventilator or tracheostomy support, and compassionate end-of-life care',
    icon: 'ICU patient support',
  },
  {
    text: 'Referred for Intermediate Care - Patients referred by specialists and hospitals for intermediate care until they’re stable enough for normal home life.',
    icon: 'ICU patient support',
  },
  {
    text: 'Preventing Re-Admission - Families aiming to prevent costly, stressful readmission after major surgeries, neuro recovery, or fragile health events.',
    icon: 'ICU patient support',
  },
];

export const ICU_AT_HOME_DELIVERABLES_HEADING = 'Comprehensive ICU @ Home - Deliverables';

export const ICU_AT_HOME_DELIVERABLES_INTRO = 'Our ICU-at-Home program is more than a nurse and a monitor. We recreate the critical care ecosystem inside the patient’s home with advanced equipment, ICU-trained staff, and specialist supervision';

export const ICU_AT_HOME_DELIVERABLES: ICUAtHomeCard[] = [
  { title: 'Ventilator & Advanced Respiratory Support', icon: 'Ventilator respiratory support' },
  { title: 'Cardiac & Hemodynamic Monitoring', icon: 'Cardiac monitoring' },
  { title: 'Advanced Medical equipment Management', icon: 'ICU medical equipment' },
  { title: 'Infusion & IV Therapy', icon: 'IV infusion nursing' },
  { title: 'Nutrition & Feeding Support', icon: 'Nutrition feeding support' },
  { title: 'Physiotherapy & Mobility Rehabilitation', icon: 'Physiotherapy rehabilitation' },
  { title: 'Family engagement', icon: 'Family engagement' },
  { title: 'Infection Prevention & Safety', icon: 'Infection prevention safety' },
  { title: 'Real Time Documentation & Reporting', icon: 'Real time documentation' },
];

export const ICU_AT_HOME_PACKAGES_HEADING = 'Choose the Right ICU Care Package for Your Loved One';

export const ICU_AT_HOME_PACKAGES_INTRO = 'Every recovery journey is different. That’s why Narpavi ICU at Home offers three carefully designed packages — from basic ICU monitoring to a full ICU replication with tele-ICU and rapid response';

export const ICU_AT_HOME_PACKAGES: ICUAtHomePackage[] = [
  {
    id: 'essential-step-down-icu-care',
    name: 'Essential Step-Down ICU Care',
    fullTitle: 'Essential Step-Down ICU Care - Safe & Affordable Transition from ICU to Home',
    image: '/images/icu-at-home/pik-7.png',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 56%, #0CB3B3 100%)',
    icon: 'Step down ICU care',
    bestFor: [
      'Post-critical illness recovery (stable but not ready for independent living)',
      'Families preventing re-admission after surgery or severe infection',
    ],
    scope: [
      '24/7 ICU-trained nurse at bedside',
      'Continuous vitals & oxygen monitoring',
      'IV medications & infusion therapy',
      'Nutrition support & mobility assistance',
      'Basic respiratory care (nebulization, suction if needed)',
      'Emergency escalation & hospital transfer readiness',
      'Regular tele-consults with critical care physician',
    ],
    deliverables: [
      'Daily: Vitals charting & nurse progress notes',
      'Weekly: Physician review & care plan update',
      'Equipment: ICU bed, multi-parameter monitor, infusion pump (if needed)',
      'Support: Caregiver orientation & infection-control checklist',
    ],
    costCue: 'Save up to 60% compared to hospital ICU stay while maintaining safety standards.',
    cta: 'Book Now',
  },
  {
    id: 'advanced-icu-care',
    name: 'Advanced ICU Care',
    fullTitle: 'Advanced ICU Care - Ventilator & Cardiac Support with Specialist Oversight',
    image: '/images/icu-at-home/pik-8.png',
    color: '#5B8DEF',
    gradient: 'linear-gradient(135deg, #315CA8 0%, #5B8DEF 54%, #8DB8FF 100%)',
    icon: 'Ventilator cardiac support',
    badge: 'Popular Care Package',
    bestFor: [
      'Ventilator-dependent recovery',
      'COPD, heart failure, long COVID needing advanced respiratory & cardiac monitoring',
      'Elderly with multiple comorbidities under doctor referral',
    ],
    scope: [
      'Everything in Essential Care',
      'Ventilator setup, management & weaning protocols',
      'Tracheostomy suction & stoma care',
      'Advanced cardiac/hemodynamic monitoring',
      'Intensivist visits + tele-ICU review',
      'Physiotherapy & respiratory rehab',
      'Complex medication/infusion management',
      'Emergency escalation & hospital transfer readiness',
      'Regular tele-consults with critical care physician',
    ],
    deliverables: [
      'Daily: Nurse & respiratory therapist logs, ventilator alarm management',
      'Weekly: Intensivist bedside visit, tele-ICU data review',
      'Equipment: ICU bed, advanced ventilator, multi-parameter monitor, suction apparatus, infusion pumps',
      'Support: Emergency crash kit & escalation plan',
    ],
    costCue: 'High-acuity ICU care at nearly half the hospital ICU cost — with lower infection risk.\n.',
    cta: 'Book Now',
  },
  {
    id: 'premium-icu-replication',
    name: 'Premium ICU Replication',
    fullTitle: 'Premium ICU Replication - Full ICU at Home with 24/7 Tele-ICU & Emergency Backup',
    image: '/images/icu-at-home/pik-9.png',
    color: '#E56C45',
    gradient: 'linear-gradient(135deg, #B9442B 0%, #E56C45 54%, #F6A56B 100%)',
    icon: 'Full ICU replication',
    bestFor: [
      'Long-term ventilator-dependent or medically fragile care partners',
      'Palliative & end-of-life care guests needing dignity and comfort',
      'NRI families requiring remote updates & concierge support',
    ],
    scope: [
      'Everything in Advanced ICU Care',
      'Full ICU-grade setup (multi-ventilator backup, oxygen systems, UPS)',
      'Continuous tele-ICU supervision & smart dashboards',
      'Emergency crash kit with rapid hospital transfer support',
      'Dedicated case manager & concierge services for families abroad',
      'Personalized symptom relief & comfort care for end-of-life cases',
      'rehab',
      'Complex medication/infusion management',
      'Emergency escalation & hospital transfer readiness',
      'Regular tele-consults with critical care physician',
    ],
    deliverables: [
      'Daily: Tele-ICU data feed + 24/7 nurse charting',
      'Weekly: Intensivist video review & care optimization call',
      'Equipment: Complete ICU replication (ventilator redundancy, cardiac monitor, syringe & infusion pumps, backup power)',
      'Support: Dedicated case manager, family update dashboard, priority ambulance access',
    ],
    costCue: 'Maximum ICU safety & comfort at home — premium care at a fraction of hospital ICU charges.',
    cta: 'Book Now',
  },
];

export const ICU_AT_HOME_PACKAGE_NAMES = ICU_AT_HOME_PACKAGES.map((pkg) => pkg.name);

export const ICU_AT_HOME_TRUST_HEADING = 'Why Choose Narpavi - Safe & Trusted ICU Care at Home';

export const ICU_AT_HOME_TRUST_INTRO = 'At Narpavi ICU at Home, safety is our top priority. We replicate the clinical standards of a hospital ICU while adding the warmth of home, so your loved one receives critical care without compromise';

export const ICU_AT_HOME_TRUST_POINTS: ICUAtHomeTextCard[] = [
  {
    text: 'ICU-Trained Nursing & Specialist Overseeing - Experienced critical care nurses monitor patients round-the-clock and escalate to intensivists or physicians as needed.',
    icon: 'ICU trained nurse',
  },
  {
    text: 'Personalized ICU Recovery Plans: Tailored nutrition, medication management, and rehabilitation strategies for patients recovering from stroke, major surgery, infections, or cardiac events.',
    icon: 'Personalized ICU recovery plan',
  },
  {
    text: 'Hospital-Grade Equipment & Backup Support - Ventilators, monitors, infusion pumps, oxygen systems — with reliable power backup and technical support',
    icon: 'Hospital grade equipment',
  },
  {
    text: 'Real-Time Monitoring & Tele-ICU - Vital signs tracked via smart dashboards and specialist review for timely interventions.',
    icon: 'Tele ICU monitoring',
  },
  {
    text: 'Emergency Response Ready - Rapid escalation protocols, crash kit support, and hospital transfer pathways ensure patient safety.',
    icon: 'Emergency response',
  },
  {
    text: 'Cost-Effective & Family-Inclusive Care -  Save up to 50% compared to hospital ICU costs while reducing the risk of hospital-acquired infections and ensuring family-centered emotional support\n.',
    icon: 'Cost effective care',
  },
  {
    text: 'Rehabilitation & Post-ICU Recovery Support -  Specialized physiotherapy, respiratory therapy, and mobility rehabilitation programs designed to accelerate recovery and improve independence',
    icon: 'Post ICU rehabilitation',
  },
  {
    text: 'Infection Control at Home Medical Council compliant hand hygiene, PPE use, sterile techniques, and proper biomedical waste management reduce hospital-acquired infection risk',
    icon: 'Infection control home',
  },
];

export const ICU_AT_HOME_RESOURCE_COPY = 'Learn & Prepare Setting up an ICU at home can feel overwhelming. Our expertly prepared guide helps families understand what’s needed — from equipment and nurse staffing to cost planning and infection control — before making the move.\nIt’s a must-have resource for families looking for safe and reliable ICU at Home.';

export const ICU_AT_HOME_DOWNLOADS: ICUAtHomeDownload[] = [
  {
    title: 'ICU at Home Setup Checklist',
    fileUrl: '/downloads/icu-at-home/icu-at-home-setup-checklist.pdf',
  },
  {
    title: 'Cost Planning for ICU Care at Home vs Hospital ICU',
    fileUrl: '/downloads/icu-at-home/cost-planning-icu-care-home-vs-hospital.pdf',
  },
  {
    title: 'Emergency Preparedness Guide for Home ICU Patients',
    fileUrl: '/downloads/icu-at-home/emergency-preparedness-home-icu-patients.pdf',
  },
  {
    title: 'Ventilator Weaning at Home — Family Handbook',
    fileUrl: '/downloads/icu-at-home/ventilator-weaning-at-home-family-handbook.pdf',
  },
];

export const ICU_AT_HOME_RESOURCE_GUIDE_TEXT = 'Plan safe ICU care at home with expert tips, cost insights, and safety checklists';

export const ICU_AT_HOME_RESOURCES: ICUAtHomeResource[] = [
  {
    title: '7 Benefits of ICU Care at Home vs. Hospital ICU',
    excerpt: 'Discover the key clinical, emotional, and financial benefits of setting up ICU care at home.',
    image: '/images/icu-at-home/pik-11.jpeg',
    href: '/home-nursing-care/icu-at-home#icu-at-home-resources',
  },
  {
    title: 'How ICU at Home Works in Chennai: A Step-by-Step Guide',
    excerpt: 'A step-by-step walkthrough of the onboarding, equipment installation, and transition process.',
    image: '/images/icu-at-home/pik-12.png',
    href: '/home-nursing-care/icu-at-home#icu-at-home-resources',
  },
  {
    title: 'Cost Breakdown: Home ICU vs. Hospital ICU in Chennai',
    excerpt: 'A detailed cost comparison showing how home-based ICU care saves up to 60% compared to hospital stays.',
    image: '/images/icu-at-home/pik-13.png',
    href: '/home-nursing-care/icu-at-home#icu-at-home-resources',
  },
  {
    title: 'Is Home ICU Safe? Understanding Infection Control & Monitoring Protocols',
    excerpt: 'Learn about the strict infection control protocols and continuous monitoring systems used to ensure safety.',
    image: '/images/icu-at-home/pik-14.png',
    href: '/home-nursing-care/icu-at-home#icu-at-home-resources',
  },
];

export const ICU_AT_HOME_FINAL_CTA = {
  heading: 'Ready to Bring ICU-Level Care Safely Home?',
  body: 'Don’t let prolonged hospital stays, rising ICU costs, and infection risks slow your loved one’s recovery. With Narpavi ICU at Home in Chennai, you get hospital-grade monitoring, ICU-trained nurses, ventilator & cardiac support, and tele-ICU oversight — all in the comfort of home.',
  note: 'Book a free expert assessment and discover the safest, most cost-effective way to continue critical care at home.',
};

export const ICU_AT_HOME_FAQS: FAQ[] = [
  {
    id: 1,
    question: 'What is ICU-at-Home?',
    answer: 'ICU at Home is a specialized, advanced-level care provided at the patient’s home, replicating the clinical standards of an intensive care unit. It includes continuous monitoring, life-support systems (like ventilators), and intensive nursing care under the supervision of critical care physicians.\nA hospital-grade intensive care setup at home—complete with ventilators, monitors, IV equipment, and 24/7 critical care nurses—supervised remotely by specialists.',
  },
  {
    id: 2,
    question: 'what are the core benefits of ICU at Home?',
    answer: 'Shorten hospital stay and reduce hospital-acquired infection risk\nBoost emotional well-being—familiar environments help reduce stress\nPersonalized care plans based on specialist protocols, with round-the-clock surveillance to preempt complications\nSignificant cost savings—home care can be 40–60% less than hospital ICUs',
  },
  {
    id: 3,
    question: 'Who benefits from ICU at Home service ?',
    answer: 'Ideal for patients who:\nAre stepping down from hospital ICU but still require critical care\nHave chronic respiratory or cardiac conditions\nAre elderly with comorbidities requiring intensive oversight\nNeed palliative, dignified comfort care at home',
  },
  {
    id: 4,
    question: 'What equipment is provided?',
    answer: 'Ventilator/BiPAP + circuits, Oxygen concentrator or cylinder, Multiparameter monitor (HR, NIBP, SpO₂, RR, Temp), Infusion & syringe pumps, Suction machine (+ tubing), DVT pump, nebulizer, ICU-style hospital bed + pressure/air mattress, AED/defibrillator, Feeding pump (if required), Patient lift/mobility aids, PPE & isolation supplies, Firstaid kit & cleaning supplies and more tailored per patient',
  },
  {
    id: 5,
    question: 'Who provides the care?',
    answer: 'A certified team available 24/7:\nICU-trained nurses & nursing assistants (shift-based)\nRespiratory therapists & physiotherapists\nDoctors-on-call with tele-ICU backup by specialists\nMultidisciplinary: nutrition, wound care, palliative & psychological support',
  },
  {
    id: 6,
    question: 'How does 24/7 monitoring work?',
    answer: 'Patients are continuously observed by skilled nurses; vital data is logged in real-time via an e-monitoring dashboard. Doctors and family members can access live updates remotely.',
  },
  {
    id: 7,
    question: 'Is ICU-at-Home safe?',
    answer: 'Yes—rigorous infection control, hospital-grade equipment, and emergency protocols ensure safety standards equivalent to hospital ICUs. Out-of-hospital care reduces infection risk.',
  },
  {
    id: 8,
    question: 'How long does care continue?',
    answer: 'As long as needed—whether it\'s a gradual step-down after ICU, ventilator weaning, or ongoing chronic care. We customize care duration according to clinical assessments.',
  },
  {
    id: 9,
    question: 'How do I start the service?',
    answer: 'Step 1: Contact us for a free readiness assessment\nStep 2: We\'ll visit to evaluate your needs and set up equipment\nStep 3: Safe transfer from hospital to home ICU\nStep 4: Care begins with full monitoring and family handover',
  },
  {
    id: 10,
    question: 'What does it cost?',
    answer: 'Daily care packages range from ₹6,500–₹12,500 (nurse + equipment + monitoring), significantly lower than ₹30,000–₹50,000 per day in hospital ICU. We offer modular rental options and transparent billing.',
  },
  {
    id: 11,
    question: 'Is family involvement allowed?',
    answer: 'Absolutely—your loved ones can stay with the patient, receive training on basic care routines, and view live updates through the app/dashboard.',
  },
  {
    id: 12,
    question: 'Is ICU at Home as effective as hospital ICU?',
    answer: 'Yes — with advanced equipment, ICU-trained nurses, and critical care doctor supervision, ICU at Home can provide hospital-level care safely and effectively.',
  },
  {
    id: 13,
    question: 'How do you ensure safety and infection control at home?',
    answer: 'ICU-trained nurses follow strict hygiene protocols, use sterile consumables, and perform continuous monitoring. Fewer visitors and a controlled home environment also reduce infection risks.',
  },
  {
    id: 14,
    question: 'When Should You Consider ICU at Home? — Quick Checklist',
    answer: '✔️Medically stable but needs intensive monitoring\n✔️ Long-term ventilator or respiratory support\n✔️ Post-ICU recovery after surgery or illness\n✔️ High risk of hospital infections\n✔️ Palliative or end-of-life care\n✔️ Emotional & psychological comfort at home\n✔️ Financially sustainable alternative',
  },
  {
    id: 15,
    question: 'Is ventilator weaning at home safe?',
    answer: 'Yes — if supervised by experienced ICU doctors and nurses, and with proper equipment in place. Home-based weaning can actually reduce infection risk and improve emotional well-being.',
  },
  {
    id: 16,
    question: 'How can families help?',
    answer: 'Provide emotional support, follow hygiene protocols, assist in exercises if trained, and encourage the patient. Families also receive training to recognize early warning signs',
  },
  {
    id: 17,
    question: 'What are Infrastructure & Utilities Checklist for Home ICU setup  ?',
    answer: 'Dedicated room, 220V power outlets\nSurge protector, UPS, backup generator\nHand-washing station, waste disposal, spares\nFire extinguisher and safety signage',
  },
  {
    id: 18,
    question: 'What are the Clinical & Administrative Preparation Required for Home ICU setup?',
    answer: 'Referral letter + discharge summary\nCare plan with chart fields and escalation protocol\nConsent forms + family agreement\nTeleICU / doctor\'s contact list\nEmergency transfer protocol & ambulance contacts',
  },
];
