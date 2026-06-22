export interface EquipmentItem {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  desc: string;
  metaDesc: string;
  keywords: string[];
  image: string;
  options: string[];
  features: string[];
  useCases: string[];
  pricingHint: string;
}

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    slug: 'respiratory-equipment',
    title: 'BiPAP, CPAP & Oxygen Concentrators',
    shortTitle: 'Respiratory Equipment',
    category: 'Breathing support',
    desc: 'Home respiratory therapy support with BiPAP, CPAP and oxygen concentrator options for sleep apnea, COPD support, post-discharge breathing assistance and supervised recovery.',
    metaDesc: 'Rent or buy BiPAP, CPAP, and Oxygen Concentrators at home. Installation, setup guidance and technician support.',
    keywords: ['bipap rental chennai', 'oxygen concentrator rental', 'cpap machine chennai'],
    image: '/images/pik-12.png',
    options: ['BiPAP machine rental for monthly use', 'CPAP systems for sleep apnea therapy', '5L and 10L oxygen concentrators', 'Nasal masks, tubing and filters'],
    features: ['Sanitized before delivery', 'Technician-led setup and usage demo', 'Flow and pressure guidance based on prescription', 'Backup support coordination for urgent needs'],
    useCases: ['Sleep apnea support', 'COPD and breathlessness support', 'Post-hospital respiratory recovery', 'Doctor-advised home oxygen therapy'],
    pricingHint: 'Rental plans usually start from Rs. 4,500/month depending on machine type and availability.',
  },
  {
    slug: 'monitors',
    title: 'Patient Monitors & Pulse Oximeters',
    shortTitle: 'Monitors',
    category: 'Vitals monitoring',
    desc: 'Reliable home monitoring devices for tracking SpO2, pulse rate, blood pressure, temperature and other vital signs during recovery or chronic illness care.',
    metaDesc: 'Rent or buy patient monitors and pulse oximeters for home care and post-hospital recovery.',
    keywords: ['patient monitor rental chennai', 'vital signs monitor', 'pulse oximeter rental'],
    image: '/images/pik-10.png',
    options: ['5-parameter patient monitors', 'Pulse oximeters', 'BP monitors and temperature devices', 'ECG-capable monitoring units on request'],
    features: ['Clear display with alarm indicators', 'Simple family demonstration', 'Suitable for nurse-supervised care plans', 'Home delivery and setup support'],
    useCases: ['Post-surgery observation', 'Elder care vitals tracking', 'ICU step-down care at home', 'Chronic condition monitoring'],
    pricingHint: 'Rental and purchase options are available based on required parameters and duration.',
  },
  {
    slug: 'ventilators',
    title: 'Home ICU Ventilators',
    shortTitle: 'Ventilators',
    category: 'Critical respiratory care',
    desc: 'Portable ventilator coordination for doctor-advised critical care, ICU step-down support and high-dependency respiratory care at home.',
    metaDesc: 'Rent home ventilators with setup coordination for ICU at home and critical respiratory care.',
    keywords: ['home ventilator rental chennai', 'critical care ventilator', 'portable ventilator'],
    image: '/images/pik-9.png',
    options: ['Portable ICU ventilators', 'Non-invasive ventilation support models', 'Battery-backup devices where available', 'Ventilator accessories coordination'],
    features: ['Pre-tested equipment before dispatch', 'Clinical setup coordination', 'Alarm and battery alert guidance', 'Regular calibration support on request'],
    useCases: ['ICU step-down at home', 'Long-term respiratory support', 'Doctor-guided critical care', 'High-dependency patient care'],
    pricingHint: 'Pricing depends on ventilator model, duration, technician setup and care support requirements.',
  },
  {
    slug: 'oxygen-cylinder',
    title: 'Medical Oxygen Cylinders',
    shortTitle: 'Oxygen Cylinder',
    category: 'Oxygen support',
    desc: 'Medical oxygen cylinders for home use, emergency standby and short-term oxygen support, supplied with essential flowmeter accessories.',
    metaDesc: 'Rent oxygen cylinders for home oxygen support with flowmeter and refill assistance.',
    keywords: ['oxygen cylinder rental chennai', 'medical oxygen cylinder', 'oxygen flowmeter'],
    image: '/images/pik-15.png',
    options: ['Portable 10L cylinders', 'Large 47L home oxygen cylinders', 'Flowmeter and key bundle', 'Refill support based on location'],
    features: ['Pressure-tested cylinders', 'Sanitized handling process', 'Simple usage explanation', 'Fast delivery coordination'],
    useCases: ['Emergency oxygen standby', 'Short-term post-discharge support', 'Doctor-advised oxygen therapy', 'Backup for concentrator users'],
    pricingHint: 'Rental, refill and delivery charges vary by cylinder size and service location.',
  },
  {
    slug: 'medical-mattress',
    title: 'Anti-Bedsore Medical Mattresses',
    shortTitle: 'Medical Mattress',
    category: 'Bedridden patient comfort',
    desc: 'Alternating pressure bubble and tubular mattresses designed to reduce pressure sore risk for bedridden patients and long-duration recovery.',
    metaDesc: 'Rent or buy anti-bedsore air mattresses for bedridden patients and elder care.',
    keywords: ['bubble air mattress chennai', 'medical air bed rental', 'bed sore prevention mattress'],
    image: '/images/pik-7.png',
    options: ['Bubble air mattresses', 'Tubular air mattresses', 'Pressure pump units', 'Waterproof mattress covers'],
    features: ['Adjustable pressure control', 'Low-noise pump operation', 'Easy cleaning surface', 'Suitable for long-term bed care'],
    useCases: ['Bedridden elder care', 'Paralysis and stroke recovery', 'Post-surgery bed rest', 'Pressure sore prevention'],
    pricingHint: 'Affordable monthly rental and purchase options are available.',
  },
  {
    slug: 'hospital-cot',
    title: 'Hospital Beds & Fowler Cots',
    shortTitle: 'Hospital COT',
    category: 'Home bed setup',
    desc: 'Manual and motorized hospital cot options for safer positioning, easier transfers and better comfort during home recovery.',
    metaDesc: 'Rent or buy hospital beds and fowler cots for home patient care.',
    keywords: ['hospital cot rental chennai', 'fowler bed rental', 'motorized hospital bed'],
    image: '/images/pik-8.png',
    options: ['Manual fowler beds', 'Motorized hospital beds', 'Side rails and patient backrests', 'Cot-compatible mattresses'],
    features: ['Adjustable back and leg sections', 'Sturdy frame with safety rails', 'Caregiver-friendly height and access', 'Delivery and installation coordination'],
    useCases: ['Post-operative recovery', 'Long-term bed care', 'Elder care at home', 'Patient transfer support'],
    pricingHint: 'Rental starts based on manual or motorized model, delivery location and rental duration.',
  },
  {
    slug: 'mobility-equipment',
    title: 'Wheelchairs, Walkers & Mobility Aids',
    shortTitle: 'Mobility Equipment',
    category: 'Safe movement',
    desc: 'Mobility aids for safer transfers, walking support and independence during recovery, elder care or chronic mobility limitations.',
    metaDesc: 'Rent or buy wheelchairs, walkers and mobility aids for home care.',
    keywords: ['wheelchair rental chennai', 'walker rental chennai', 'patient mobility aids'],
    image: '/images/pik-3.jpg',
    options: ['Foldable wheelchairs', 'Reclining wheelchairs', 'Walkers and rollators', 'Canes and transfer aids'],
    features: ['Lightweight and foldable options', 'Safety brakes where applicable', 'Adjustable height support', 'Easy home delivery'],
    useCases: ['Elder mobility support', 'Post-fracture recovery', 'Post-surgery walking support', 'Safe bathroom and room transfers'],
    pricingHint: 'Rental and purchase options are available across standard and premium models.',
  },
  {
    slug: 'pumps-dvt',
    title: 'DVT Pumps & Compression Sleeves',
    shortTitle: 'Pumps & DVT',
    category: 'Circulation support',
    desc: 'Sequential compression DVT pumps and sleeves that support blood circulation for bedbound or post-operative patients when recommended by clinicians.',
    metaDesc: 'DVT pump rental with compression sleeves for post-surgery and bedridden patients.',
    keywords: ['dvt pump rental chennai', 'compression sleeves', 'dvt prevention pump'],
    image: '/images/pik-11.png',
    options: ['Sequential compression pumps', 'Calf and thigh sleeves', 'Adjustable pressure models', 'Single-patient sleeve sets'],
    features: ['Graduated compression cycles', 'Comfortable sleeve fit', 'Clear pressure controls', 'Sanitized machine handling'],
    useCases: ['Post-surgery DVT prevention', 'Bedridden patient circulation support', 'Stroke recovery support', 'Doctor-advised compression therapy'],
    pricingHint: 'Rates depend on pump type, sleeve set and rental period.',
  },
  {
    slug: 'suction-machine',
    title: 'Portable Suction Machines',
    shortTitle: 'Suction Machine',
    category: 'Airway clearance',
    desc: 'Portable suction machines for mucus and secretion clearance, especially for tracheostomy care, respiratory support and bedbound patients.',
    metaDesc: 'Rent suction machines for phlegm removal, tracheostomy support and home respiratory care.',
    keywords: ['suction machine rental chennai', 'electric mucus extractor', 'portable suction machine'],
    image: '/images/pik-6.jpeg',
    options: ['Single bottle suction units', 'Double bottle suction machines', 'Battery-backed portable units', 'Suction catheters and jars on request'],
    features: ['Adjustable suction pressure', 'Overflow protection', 'Easy cleaning accessories', 'Technician setup guidance'],
    useCases: ['Tracheostomy care', 'Bedridden patient secretion clearance', 'Palliative respiratory support', 'Post-ICU home care'],
    pricingHint: 'Rental plans usually start from Rs. 1,500/month. Consumables are billed separately.',
  },
  {
    slug: 'masks-accessories',
    title: 'BiPAP/CPAP Masks & Accessories',
    shortTitle: 'Masks & Accessories',
    category: 'Respiratory accessories',
    desc: 'Comfortable respiratory masks, tubing, filters and oxygen accessories to support BiPAP, CPAP and oxygen therapy setups at home.',
    metaDesc: 'Buy BiPAP masks, CPAP masks, oxygen tubing and respiratory accessories.',
    keywords: ['bipap mask chennai', 'cpap mask chennai', 'oxygen tubing'],
    image: '/images/pik-13.jpeg',
    options: ['Full-face BiPAP masks', 'Nasal CPAP masks', 'Oxygen tubing and nasal cannula', 'Filters, humidifier chambers and connectors'],
    features: ['Soft silicone fit', 'Multiple size availability', 'Sterile-sealed accessory options', 'Compatible alternatives suggested where possible'],
    useCases: ['BiPAP therapy comfort', 'CPAP sleep therapy', 'Oxygen concentrator setup', 'Replacement accessory purchase'],
    pricingHint: 'Most accessories are sale-only for hygiene. Availability depends on size and brand.',
  },
];

export function getEquipmentItem(slug: string) {
  return EQUIPMENT_ITEMS.find((item) => item.slug === slug);
}

export function getRelatedEquipment(slug: string) {
  return EQUIPMENT_ITEMS.filter((item) => item.slug !== slug).slice(0, 3);
}
