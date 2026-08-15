export type SpecialtyNursingPackage = {
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
  checklist?: string[];
  shiftOptions?: string[];
  deliverables?: string[];
  redFlags?: string;
};

export type SpecialtyNursingDownload = {
  title: string;
  fileUrl: string;
};

export type SpecialtyNursingResource = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export const SPECIALTY_NURSING_PACKAGES: SpecialtyNursingPackage[] = [
  {
    id: 'tracheostomy-plus-care',
    name: 'Tracheostomy Plus Care',
    tagline: 'Safer airway care at home — sterile, supervised and responsive',
    image: '/images/specialty-nursing-care/Pik 7.jpeg',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 56%, #0CB3B3 100%)',
    icon: 'Airway & Respiratory',
    bestFor: [
      'Post-ICU tracheostomy patients',
      'Chronic airway disease with secretions',
      'Long-term tracheostomy users needing daily suction & stoma care'
    ],
    scope: [
      'PEG/NG/Ryle\'s tube feeding & flushes',
      'Tube/stoma site cleaning & dressing',
      'Bag changes & leakage/odor management',
      'Enteral feeding schedule & nutrition monitoring',
      'Family coaching for routine care'
    ],
    equipment: [
      'Feeding sets & syringes',
      'Stoma care kits',
      'Dressing materials',
      'PPE',
      'Waste disposal support'
    ],
    upgrades: [
      'Dietitian consult for tube feed plan',
      'Stoma therapist visit for complex cases',
      'Tele-review with doctor for complications'
    ],
    costCue: 'Airway safety demands zero compromise. Includes aseptic suctioning, cannula hygiene and humidifier monitoring.'
  },
  {
    id: 'tube-care',
    name: 'Tube Care',
    tagline: 'Expert PEG, NG — no more hospital trips',
    image: '/images/specialty-nursing-care/Pik 8.jpeg',
    color: '#5B8DEF',
    gradient: 'linear-gradient(135deg, #315CA8 0%, #5B8DEF 56%, #8DB8FF 100%)',
    icon: 'Tube & Nutrition',
    bestFor: [
      'Patients with PEG / Ryle’s / NG feeding tubes',
      'Individuals with colostomy or ileostomy',
      'Families managing long-term enteral feeding at home'
    ],
    scope: [
      'PEG/NG/Ryle’s tube feeding & flushes',
      'Tube/stoma site cleaning & dressing',
      'Bag changes & leakage/odor management',
      'Enteral feeding schedule & nutrition monitoring',
      'Family coaching for routine care'
    ],
    equipment: [
      'Feeding sets & syringes',
      'Stoma care kits',
      'Dressing materials',
      'PPE',
      'Waste disposal support'
    ],
    upgrades: [
      'Dietitian consult for tube feed plan',
      'Stoma therapist visit for complex cases',
      'Tele-review with doctor for complications'
    ],
    costCue: 'Focuses on smooth enteral feeding, aspiration prevention and stoma site integrity.'
  },
  {
    id: 'lineguard-infusion-care',
    name: 'LineGuard Infusion Care',
    tagline: 'IV, PICC & TPN therapy — sterile, safe, and doctor-led',
    image: '/images/specialty-nursing-care/Pik 4.jpeg',
    color: '#E56C45',
    gradient: 'linear-gradient(135deg, #B9442B 0%, #E56C45 54%, #F6A56B 100%)',
    icon: 'IV & Line Care',
    bestFor: [
      'Patients needing long-term IV antibiotics or hydration',
      'PICC line / midline / chemo port users',
      'Total parenteral nutrition (TPN) at home',
      'Complex infusions post-hospital or post-chemo'
    ],
    scope: [
      'Aseptic IV & PICC line setup, flushing, securement',
      'TPN preparation & administration as per protocol',
      'Peripheral IV insertion if required',
      'Dressing changes & line patency maintenance',
      'Early detection of infiltration, phlebitis, or sepsis'
    ],
    checklist: [
      'Stable vitals and no active sepsis',
      'Line type & placement confirmed (PICC, midline, port)',
      'Prescribed drug/TPN plan available',
      'All infusion consumables & dressing supplies available',
      'Required consumables ready (bags, dressings, cleaning solutions)'
    ],
    shiftOptions: [
      '12 Hours / Shift',
      '24 Hours / Day',
      '2 shifts / Day - Compulsory'
    ],
    deliverables: [
      'Daily infusion & vitals log (drug/volume/time)',
      'Line site monitoring & documentation (photos if consented)',
      'Weekly nurse supervisor tele/onsite review',
      'Real-time WhatsApp updates to family/NRI family'
    ],
    equipment: [
      'Infusion pumps',
      'IV stands',
      'Securement devices',
      'Sterile dressings',
      'TPN sets',
      'PPE'
    ],
    upgrades: [
      'Dietitian consultation for TPN',
      'Doctor tele-review during therapy',
      'Emergency supply of consumables & infusion pumps'
    ],
    redFlags: 'Fever, chills, pain/swelling/redness at line site, suspected air embolism, catheter dislodgement → 24×7 hotline & predefined hospital transfer',
    costCue: 'Doctor-guided central line and TPN administration with standard CLABSI prevention bundle.'
  },
  {
    id: 'woundpro-advanced-care',
    name: 'WoundPro Advanced Care',
    tagline: 'Heal faster with expert wound & bedsore care — sterile and safe at home',
    image: '/images/specialty-nursing-care/Pik 9.jpeg',
    color: '#7657D9',
    gradient: 'linear-gradient(135deg, #4933A5 0%, #7657D9 56%, #A28BEB 100%)',
    icon: 'Wound & Skin Integrity',
    bestFor: [
      'Chronic diabetic foot ulcers',
      'Post-surgical wound management',
      'Pressure sores / bedsores in immobile patients',
      'Cancer-related or non-healing wounds needing sterile dressing'
    ],
    scope: [
      'Sterile wound cleansing, debridement support (as ordered)',
      'Dressing changes — hydrocolloid, foam, alginate, silver, as per need',
      'Bedsore offloading & pressure relief positioning',
      'Pain control support & infection prevention',
      'Education on wound hygiene & nutrition for healing'
    ],
    equipment: [
      'Sterile dressing kits',
      'Antiseptics',
      'Offloading cushions',
      'Pressure-relief mattresses (rental)',
      'PPE'
    ],
    upgrades: [
      'Dietitian consult for wound healing nutrition',
      'Wound care specialist home visit',
      'Rental of advanced air/alpha/nimbus mattresses'
    ],
    costCue: 'Avoids painful traveling. Provides advanced sterile dressings (hydrocolloid, foam, silver) for faster healing.'
  },
  {
    id: 'oncology-comfort-care',
    name: 'Oncology Comfort Care',
    tagline: 'Compassionate chemo & palliative nursing — dignity, comfort and safety at home',
    image: '/images/specialty-nursing-care/Pik 10.jpeg',
    color: '#E05B80',
    gradient: 'linear-gradient(135deg, #A82D53 0%, #E05B80 56%, #F793B0 100%)',
    icon: 'Oncology & Palliative',
    bestFor: [
      'Cancer patients undergoing chemotherapy who need at-home support',
      'Advanced cancer with pain & symptom management needs',
      'Palliative / end-of-life care to maintain dignity & comfort',
      'NRI families wanting safe, compassionate care for loved ones'
    ],
    scope: [
      'Chemo port/PICC line care & dressing',
      'Supportive therapy for nausea, vomiting, pain',
      'Monitoring for chemo side effects & early complications',
      'End-of-life palliative care (comfort, skin, hygiene, positioning)',
      'Family emotional support & training for care'
    ],
    equipment: [
      'Infusion pumps',
      'Chemo port care kits',
      'PPE',
      'Pressure-relief aids',
      'Oxygen setup if needed'
    ],
    upgrades: [
      'Doctor/palliative specialist home visit',
      'Dietitian consult for nutrition support',
      'Psychological counselling for patient/family'
    ],
    costCue: 'Focuses on clinical comfort, symptom relief (nausea/pain) and dignity-preserving end-of-life support.'
  },
  {
    id: 'pd-support',
    name: 'PD Support (Peritoneal Dialysis)',
    tagline: 'Safe peritoneal dialysis exchanges — infection-free, guided and stress-free at home',
    image: '/images/specialty-nursing-care/Pik 11.jpeg',
    color: '#3F7A1A',
    gradient: 'linear-gradient(135deg, #244C0B 0%, #3F7A1A 56%, #5FA233 100%)',
    icon: 'Renal / Dialysis',
    bestFor: [
      'Chronic kidney disease patients on continuous ambulatory peritoneal dialysis (CAPD)',
      'Families newly trained but needing professional support',
      'Long-term PD users needing periodic nurse supervision'
    ],
    scope: [
      'Aseptic PD exchanges (CAPD) including hand hygiene & mask use',
      'Catheter site cleaning & dressing change',
      'Monitoring for infection signs: cloudy effluent, pain, fever',
      'Patient/family re-training on PD technique',
      'Safe disposal of effluent and waste'
    ],
    equipment: [
      'PD fluid bags',
      'Transfer sets',
      'Masks',
      'Dressing kits',
      'PPE',
      'Waste disposal guidance'
    ],
    upgrades: [
      'Nephrologist tele-review or home consult',
      'Dietitian advice for renal diet',
      'Supply coordination for PD fluids & disposables'
    ],
    costCue: 'Supports safe, sterile CAPD exchanges at home, significantly reducing peritonitis risk.'
  },
  {
    id: 'colostomy-ileostomy-care',
    name: 'Colostomy / Ileostomy Care',
    tagline: 'Confident stoma care at home — hygienic, safe and nurse-led',
    image: '/images/specialty-nursing-care/Pik 12.jpeg',
    color: '#1A7A76',
    gradient: 'linear-gradient(135deg, #0B4E4B 0%, #1A7A76 56%, #33A29E 100%)',
    icon: 'Stoma Care',
    bestFor: [
      'Patients discharged after colostomy or ileostomy surgery',
      'Long-term stoma users with skin irritation or leakage issues',
      'Families needing training in pouch changes & stoma hygiene'
    ],
    scope: [
      'Stoma and peristomal skin care',
      'Pouch emptying, cleaning, and replacement',
      'Leakage/odor management & appliance fitting',
      'Infection and skin complication monitoring',
      'Caregiver training for independent stoma management'
    ],
    equipment: [
      'Stoma pouching systems',
      'Skin barrier products',
      'Dressing kits',
      'PPE'
    ],
    upgrades: [
      'Stoma therapist home visit for complex fittings',
      'Dietitian guidance for stoma-friendly diet',
      'Supply support — pouch & barrier procurement'
    ],
    costCue: 'Professional stoma care and caregiver coaching to ensure skin integrity and leak-free stoma management.'
  }
];

export const SPECIALTY_NURSING_PACKAGE_NAMES = SPECIALTY_NURSING_PACKAGES.map(pkg => pkg.name);

export const SPECIALTY_NURSING_FRAMEWORK = [
  'Airway & Respiratory Care',
  'Enteral Tube & TPN Nutrition',
  'Central & IV Line Care',
  'Advanced Wound & Bedsore Healing',
  'Oncology Comfort & Palliative Care',
  'Peritoneal Dialysis exchange support',
  'Clean Stoma & Ostomy care',
  'Early Warning & Escalation protocol',
  'Digital Logging & Transparency'
];

export const SPECIALTY_NURSING_SAFETY = [
  'IV-certified and procedurally trained specialty nurses',
  'Doctor-guided clinical oversight & regular reviews',
  'WHO standard infection control and aseptic techniques',
  'Real-time WhatsApp updates and photo reports for families',
  '24/7 backup nurse availability & mapped hospital referrals',
  'Seamless care escalation and custom package options'
];

export const SPECIALTY_NURSING_DOWNLOADS: SpecialtyNursingDownload[] = [
  {
    title: 'BiPAP, CPAP & Oxygen Therapy Safety Guide',
    fileUrl: '/downloads/specialty-nursing-care/bipap-cpap-oxygen-therapy-safety-guide.pdf'
  },
  {
    title: 'Colostomy & Stoma Care Survival Guide',
    fileUrl: '/downloads/specialty-nursing-care/colostomy-stoma-care-survival-guide.pdf'
  },
  {
    title: 'Complete Guide to Safe Tracheostomy Care at Home',
    fileUrl: '/downloads/specialty-nursing-care/complete-guide-to-safe-tracheostomy-care-at-home.pdf'
  },
  {
    title: 'Home Tube Feeding & PEG Care Handbook',
    fileUrl: '/downloads/specialty-nursing-care/home-tube-feeding-peg-care-handbook.pdf'
  },
  {
    title: 'Wound & Bedsore Healing at Home — A Complete Family Guide',
    fileUrl: '/downloads/specialty-nursing-care/wound-bedsore-healing-home-guide.pdf'
  }
];

export const SPECIALTY_NURSING_RESOURCES: SpecialtyNursingResource[] = [
  {
    title: 'Tracheostomy Care at Home — Complete Safety Checklist',
    excerpt: 'A complete safety checklist for families managing ICU step-down airway care and sterile suctioning in Chennai.',
    image: '/images/specialty-nursing-care/Pik 13.jpeg',
    href: '/blog/tracheostomy-care-home-checklist'
  },
  {
    title: 'Managing PEG & NG Tube Feeding — Practical At-Home Tips',
    excerpt: 'Practical tips for smooth nutrition, flushing, clogging prevention and aspiration safety for tube feeding at home.',
    image: '/images/specialty-nursing-care/Pik 15.jpeg',
    href: '/blog/managing-peg-ng-tube-feeding'
  },
  {
    title: 'Colostomy Bag Care Tips You Can Follow at Home',
    excerpt: 'Learn stoma cleaning, skin protection, fitting tips and leakage prevention from specialty nurses in Chennai.',
    image: '/images/specialty-nursing-care/PIk 14.jpeg',
    href: '/blog/colostomy-bag-care-tips-home'
  },
  {
    title: 'How to Prevent Bedsores in Bedridden Patients',
    excerpt: 'Essential bedsore prevention tips, pressure-relief methods, skin hygiene and home nursing solutions in Chennai.',
    image: '/images/specialty-nursing-care/Pik 16.jpeg',
    href: '/blog/how-to-prevent-bedsores-bedridden'
  }
];

export const getSpecialtyNursingPackage = (packageId: string) => SPECIALTY_NURSING_PACKAGES.find(pkg => pkg.id === packageId);
export const getOtherSpecialtyNursingPackages = (packageId: string) => SPECIALTY_NURSING_PACKAGES.filter(pkg => pkg.id !== packageId);
