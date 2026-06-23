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
  costCue: string;
};

export const ADVANCE_NURSING_PACKAGES: AdvanceNursingPackage[] = [
  {
    id: 'iv-support-care', name: 'IV Support Care', tagline: 'Short-term IV fluids & medications at home', image: '/images/advance-nursing-care/Pik 6.png', color: '#0A8F8F', gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 56%, #0CB3B3 100%)', icon: 'IV infusion nursing',
    bestFor: ['Short courses of prescribed IV fluids or medication', 'Patients recovering from dehydration, fever or weakness', 'Families seeking a planned alternative to repeated hospital visits'],
    scope: ['Peripheral IV cannulation & fluid therapy', 'IV antibiotics/IM injections as per doctor order', 'Vital signs monitoring & reaction watch', 'Basic ADL support (mobility, comfort)', 'Digital log & instant family updates'],
    costCue: 'A focused option for one or a few planned IV sessions without an avoidable extended hospital stay.',
  },
  {
    id: 'infusion-plus-care', name: 'Infusion Plus Care', tagline: 'Long-term IV therapy with ongoing monitoring', image: '/images/advance-nursing-care/Pik 7.png', color: '#5B8DEF', gradient: 'linear-gradient(135deg, #315CA8 0%, #5B8DEF 56%, #8DB8FF 100%)', icon: 'Infusion therapy',
    bestFor: ['Long-term doctor-prescribed IV antibiotic therapy', 'Chronic conditions needing planned hydration, pain relief or infusion support', 'Autoimmune or rheumatology patients with routine prescribed drips'],
    scope: ['Planned infusion sessions', 'Ongoing vital signs and treatment-tolerance observation', 'Consistent records across sessions', 'Coordinated communication with the family', 'Escalation notes when clinical attention is needed'],
    costCue: 'A structured at-home plan for recurring infusion needs with visible monitoring and communication.',
  },
  {
    id: 'recovery-monitoring-care', name: 'Recovery & Monitoring Care', tagline: 'Comprehensive IV care with close nurse supervision', image: '/images/advance-nursing-care/Pik 8.png', color: '#E56C45', gradient: 'linear-gradient(135deg, #B9442B 0%, #E56C45 54%, #F6A56B 100%)', icon: 'Recovery monitoring',
    bestFor: ['Post-surgical patients with a higher monitoring need', 'Palliative patients receiving doctor-prescribed comfort medicines', 'Chronic illness recovery with frequent infusions and close observation'],
    scope: ['IV medication and fluid therapy as prescribed', 'Extended BP, SpO2 and pulse monitoring', 'Escalation protocol and direct doctor communication', 'Mobility, hydration and nutrition support when planned', 'Option to upgrade care if the condition changes'],
    costCue: 'Higher-touch support for a recovery phase where close observation and clear communication matter.',
  },
  {
    id: 'oxycare-support', name: 'OxyCare Support', tagline: 'Safe oxygen & nebulization therapy at home', image: '/images/advance-nursing-care/Pik 9.png', color: '#7657D9', gradient: 'linear-gradient(135deg, #4933A5 0%, #7657D9 56%, #A28BEB 100%)', icon: 'Oxygen respiratory care',
    bestFor: ['Patients prescribed intermittent oxygen or nebulizer support', 'COPD or asthma patients needing planned respiratory support', 'Families who need safe oxygen-device guidance at home'],
    scope: ['Oxygen concentrator setup guidance', 'Nebulizer administration per prescription', 'SpO2 and vital observation during sessions', 'Family education on oxygen and fire safety', 'Daily records and family updates'],
    costCue: 'Planned respiratory support at home with safe setup, clear records and family guidance.',
  },
];

export const ADVANCE_NURSING_PACKAGE_NAMES = ADVANCE_NURSING_PACKAGES.map((pkg) => pkg.name);
export const ADVANCE_NURSING_FRAMEWORK = ['Clinical IV & infusion support', 'Health monitoring & early warning', 'Aseptic technique & home safety', 'Doctor-guided coordination', 'Comfort & daily-living assistance', 'Reporting & transparency'];
export const ADVANCE_NURSING_SAFETY = ['Verified nursing professionals', 'Doctor-prescribed care plans', 'Strict hygiene practices', 'Early escalation protocol', 'Digital logs & family updates', 'Flexible package guidance'];

export const getAdvanceNursingPackage = (packageId: string) => ADVANCE_NURSING_PACKAGES.find((pkg) => pkg.id === packageId);
export const getOtherAdvanceNursingPackages = (packageId: string) => ADVANCE_NURSING_PACKAGES.filter((pkg) => pkg.id !== packageId);
