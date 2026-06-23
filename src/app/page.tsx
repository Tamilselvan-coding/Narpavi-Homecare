import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  HeartHandshake,
  IndianRupee,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
} from 'lucide-react';
import HomeFAQAccordion from '@/components/sections/HomeFAQAccordion';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import { BRAND } from '@/lib/constants';
import { getFaqSchema, getItemListSchema, getWebPageSchema } from '@/lib/seo';
import styles from './home.module.css';

type ImageCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
  href?: string;
  action?: string;
  status?: string;
};

const SOLUTIONS: ImageCard[] = [
  {
    title: 'Home Nursing Care',
    description: 'Skilled nursing and caregiver support from basic daily assistance to advanced and ICU-level care.',
    image: '/images/homepage/pik-02.png',
    alt: 'A home nurse supporting a patient and family',
    href: '/home-nursing-care',
    action: 'Explore Home Nursing',
  },
  {
    title: 'Medical Equipment',
    description: 'Hospital-grade equipment for rental or purchase, delivered, installed and supported at home.',
    image: '/images/homepage/pik-03.png',
    alt: 'Hospital-grade medical equipment in a clean care room',
    href: '/medical-equipment',
    action: 'View Equipment',
  },
  {
    title: 'Health Visits',
    description: 'Doctor consultations, nursing procedures, treatment support and vaccinations at home.',
    image: '/images/homepage/pik-04.png',
    alt: 'A nurse providing a health visit to an elderly patient',
    href: '/contact',
    action: 'Register Interest',
    status: 'Coming soon',
  },
  {
    title: 'Rehabilitation',
    description: 'Cardiac, pulmonary, neurological and orthopedic recovery programmes led by experienced professionals.',
    image: '/images/homepage/pik-05.png',
    alt: 'A rehabilitation professional helping a patient',
    href: '/contact',
    action: 'Register Interest',
    status: 'Coming soon',
  },
  {
    title: 'Wellness & Preventive Care',
    description: 'Yoga, nutrition, lifestyle coaching, screenings, stress management and corporate wellness.',
    image: '/images/homepage/pik-06.png',
    alt: 'Wellness and meditation illustration',
    href: '/contact',
    action: 'Register Interest',
    status: 'Coming soon',
  },
  {
    title: 'Assisted Living',
    description: 'Coordinated support for people who need ongoing safety, supervision, companionship and daily assistance.',
    image: '/images/homepage/pik-24.png',
    alt: 'A family supporting a loved one at home',
    href: '/contact',
    action: 'Register Interest',
    status: 'Coming soon',
  },
];

const SERVICE_DETAILS: ImageCard[] = [
  {
    title: 'Home Nursing Care',
    description:
      'Skilled nurses and caregivers for every level of need — from newborn and postnatal care to basic daily support, advanced nursing, specialty procedures such as tracheostomy and colostomy care, ICU at home, elder care, industrial nursing clinics and travel nursing assistance for safe journeys.',
    image: '/images/homepage/pik-07.png',
    alt: 'Home nursing care delivered beside a patient bed',
    href: '/home-nursing-care',
    action: 'Explore Home Nursing Care',
  },
  {
    title: 'Medical Equipment',
    description:
      'Reliable hospital-grade devices for rental and purchase with expert setup and 24/7 support. We coordinate oxygen concentrators, ventilators, monitors, infusion and syringe pumps, suction machines, hospital beds, anti-bedsore mattresses, wheelchairs and mobility aids.',
    image: '/images/homepage/pik-08.png',
    alt: 'Medical equipment ready for a home care setup',
    href: '/medical-equipment',
    action: 'Browse Medical Equipment',
  },
  {
    title: 'Health Visits',
    description:
      'Convenient professional visits at home, including doctor consultations and nursing procedures such as IV therapy, wound dressing, injections and catheter changes, plus treatment and vaccination support delivered with clinical safety and comfort.',
    image: '/images/homepage/pik-09.png',
    alt: 'A clinical team preparing for a home health visit',
    href: '/contact',
    action: 'Talk to Our Care Team',
    status: 'Coming soon',
  },
  {
    title: 'Rehabilitation',
    description:
      'Comprehensive recovery support through cardiac, pulmonary, neurological and orthopedic rehabilitation programmes. Experienced professionals help patients rebuild strength, mobility and independence after surgery, stroke or chronic illness.',
    image: '/images/homepage/pik-10.png',
    alt: 'A physiotherapist guiding a patient through rehabilitation',
    href: '/contact',
    action: 'Talk to Our Care Team',
    status: 'Coming soon',
  },
  {
    title: 'Wellness & Preventive Care',
    description:
      'Proactive support for the whole family through yoga and meditation therapy, nutrition and lifestyle coaching, stress management, preventive health screening and corporate wellness programmes.',
    image: '/images/homepage/pik-11.png',
    alt: 'A wellness emblem surrounded by natural health symbols',
    href: '/contact',
    action: 'Talk to Our Care Team',
    status: 'Coming soon',
  },
];

const BENEFITS: ImageCard[] = [
  {
    title: 'Home Heals Faster and Better',
    description: 'A familiar environment, family presence and personalised routines support mental wellbeing and recovery.',
    image: '/images/homepage/pik-01.png',
    alt: 'A patient receiving care at home with family nearby',
  },
  {
    title: 'Reduced Infection Risk',
    description: 'Lower exposure to hospital-acquired infections, supported by disciplined infection-control practices.',
    image: '/images/homepage/pik-13.png',
    alt: 'A patient recovering safely away from infection exposure',
  },
  {
    title: 'Cost, Energy & Time Savings',
    description: 'Reduce prolonged hospital expenses, repeated travel and the practical burden placed on families.',
    image: '/images/homepage/pik-14.png',
    alt: 'A savings illustration with a piggy bank',
  },
  {
    title: 'Family Involvement',
    description: 'Loved ones can participate in care and decision-making, offering emotional strength and continuity.',
    image: '/images/homepage/pik-15.png',
    alt: 'A family gathered supportively around a patient',
  },
  {
    title: 'Personalised One-to-One Attention',
    description: 'A dedicated professional focuses on one patient, enabling closer observation and earlier escalation.',
    image: '/images/homepage/pik-16.png',
    alt: 'A nurse giving one-to-one attention to a patient',
  },
  {
    title: 'Rapid Setup',
    description: 'Skilled staff, essential equipment and a structured care plan can often be arranged within 24–48 hours.',
    image: '/images/homepage/pik-17.png',
    alt: 'A prepared patient room representing rapid home care setup',
  },
  {
    title: 'Measurable Results',
    description: 'Vital tracking, structured care notes and regular progress reviews improve accountability.',
    image: '/images/homepage/pik-18.png',
    alt: 'Healthcare professionals reviewing monitoring results',
  },
  {
    title: 'Comfort & Dignity',
    description: 'Patients recover in familiar surroundings with privacy, independence and respect.',
    image: '/images/homepage/pik-19.png',
    alt: 'An elderly patient receiving compassionate care at home',
  },
];

const BENEFIT_ICONS = [
  HeartHandshake,
  ShieldCheck,
  IndianRupee,
  UsersRound,
  BadgeCheck,
  Clock3,
  Activity,
  Sparkles,
];

const AUDIENCES: ImageCard[] = [
  {
    title: 'Post-Surgical / Hospital Recovery',
    description: 'Support after orthopedic, cardiac, abdominal or cancer surgery, including mobility, wound and medication assistance.',
    image: '/images/homepage/pik-20.png',
    alt: 'A recovering patient speaking with a nurse',
  },
  {
    title: 'Critical & Chronic Illness',
    description: 'Support for ventilator or tracheostomy care, long-term lines, oncology, dialysis and respiratory needs.',
    image: '/images/homepage/pik-21.png',
    alt: 'A patient receiving critical care support',
  },
  {
    title: 'Seniors & Elderly',
    description: 'Daily-living support, mobility assistance and companionship, including specialised cognitive-care needs.',
    image: '/images/homepage/pik-22.png',
    alt: 'An older adult receiving bedside care',
  },
  {
    title: 'Mothers & Newborns',
    description: 'Postnatal mother care, lactation guidance, newborn nursing and support for preterm or fragile infants.',
    image: '/images/homepage/pik-23.png',
    alt: 'A nurse supporting a mother and newborn baby',
  },
  {
    title: 'Rehabilitation Needs',
    description: 'Recovery support for stroke survivors and people requiring cardiac, pulmonary, neurological or orthopedic rehabilitation.',
    image: '/images/homepage/pik-24.png',
    alt: 'A family helping a loved one during rehabilitation',
  },
  {
    title: 'NRI & Remote Families',
    description: 'Technology-enabled care in Chennai with regular monitoring and updates for family members living abroad.',
    image: '/images/homepage/pik-25.png',
    alt: 'An Indian family living abroad',
  },
  {
    title: 'Corporates, Communities & Industries',
    description: 'On-site nursing, first-aid room management and periodic health support for workplaces and communities.',
    image: '/images/homepage/pik-26.png',
    alt: 'A clinical team inside a healthcare facility',
  },
  {
    title: 'Every Individual & Family',
    description: 'Preventive care, wellness support and practical guidance for anyone seeking a healthier, happier life.',
    image: '/images/homepage/pik-27.png',
    alt: 'A happy multigenerational family',
  },
];

const TRUST_PILLARS: ImageCard[] = [
  {
    title: 'Well-Trained & Verified Professionals',
    description: 'Care professionals are screened and trained in infection control, patient safety and appropriate care skills.',
    image: '/images/homepage/pik-28.png',
    alt: 'A friendly qualified nurse',
  },
  {
    title: 'Hospital-Grade Protocols',
    description: 'Structured safety checks, infection-control practices and clinical escalation support guide every care plan.',
    image: '/images/homepage/pik-29.png',
    alt: 'A healthcare professional representing clinical protocols',
  },
  {
    title: 'Customised Care Plans',
    description: 'Individual plans with clear deliverables, goals, reporting and family involvement — never one-size-fits-all.',
    image: '/images/homepage/pik-30.png',
    alt: 'A digital care plan connected to health services',
  },
  {
    title: 'Safety & Passion First',
    description: 'Patient dignity, safety and compassionate human care guide every service decision.',
    image: '/images/homepage/pik-31.png',
    alt: 'Safety first emblem',
  },
  {
    title: 'Rapid Setup — 24–48 Hours',
    description: 'Staff deployment, equipment coordination and a safe care environment can often be arranged quickly.',
    image: '/images/homepage/pik-32.png',
    alt: 'A prepared hospital-grade care room',
  },
  {
    title: 'Transparent & Affordable Pricing',
    description: 'Clear packages and upfront estimates help families understand the care journey before it begins.',
    image: '/images/homepage/pik-33.png',
    alt: 'A transparent and affordable pricing illustration',
  },
];

const PROCESS = [
  {
    title: 'Connect with Narpavi',
    description: `Call ${BRAND.phoneFormatted} or request a home care assessment.`,
    icon: Phone,
  },
  {
    title: 'Clinical Needs Assessment',
    description: 'We review the patient’s condition, daily needs, home environment and family priorities.',
    icon: Stethoscope,
  },
  {
    title: 'Custom Care Plan & Estimate',
    description: 'Receive clear deliverables, recommended support, expected duration and transparent pricing.',
    icon: ClipboardCheck,
  },
  {
    title: 'Rapid Setup',
    description: 'Professionals, equipment and care protocols are coordinated — often within 24–48 hours.',
    icon: Clock3,
  },
  {
    title: 'Care Begins at Home',
    description: 'The assigned team delivers care according to the agreed plan and clinical instructions.',
    icon: HeartHandshake,
  },
  {
    title: 'Monitoring & Progress Reviews',
    description: 'Vitals, procedures, progress notes and family updates are documented and reviewed regularly.',
    icon: Activity,
  },
];

const HOME_FAQS = [
  {
    id: 1,
    question: 'What is home healthcare?',
    answer:
      'Home healthcare means receiving medical and supportive care in the comfort of your home instead of a hospital. Services can include nursing, rehabilitation, medical equipment, wellness programmes, and doctor or nurse visits.',
  },
  {
    id: 2,
    question: 'How is home healthcare different from hospital care?',
    answer:
      'It provides personalised, one-to-one care at home, may reduce prolonged hospital stays and allows recovery with family support in familiar surroundings.',
  },
  {
    id: 3,
    question: 'Is home healthcare safe?',
    answer:
      'Home healthcare is delivered through structured clinical protocols, infection-control practices, documented care and clear escalation support.',
  },
  {
    id: 4,
    question: 'What services does Narpavi Homecare provide?',
    answer:
      'Our service spectrum includes home nursing from basic to ICU-level care, medical equipment support, mother and baby care, elder care, patient assistance and planned health, rehabilitation and wellness services.',
  },
  {
    id: 5,
    question: 'Can I rent medical equipment from Narpavi Homecare?',
    answer:
      'Yes. We coordinate equipment such as oxygen concentrators, suction machines, hospital beds, monitors, wheelchairs and other home-care essentials with delivery, setup and support.',
  },
  {
    id: 6,
    question: 'Do you offer short-term and long-term care plans?',
    answer: 'Yes. Care plans can be arranged for shorter visits, shift-based support or round-the-clock long-term care based on assessment.',
  },
  {
    id: 7,
    question: 'Do you provide services only in Chennai?',
    answer: 'Our current operations focus on Chennai and nearby areas so we can maintain care quality and timely coordination.',
  },
  {
    id: 8,
    question: 'Is home healthcare affordable?',
    answer: 'Costs depend on the care type, duration, shift pattern and equipment required. We provide a clear estimate after assessment.',
  },
  {
    id: 9,
    question: 'How do I get a cost estimate?',
    answer: 'After an initial assessment, our team prepares a customised care plan with recommended services and transparent pricing.',
  },
  {
    id: 10,
    question: 'What payment options are available?',
    answer: 'Payment options and long-term package arrangements are explained clearly when your care plan is confirmed.',
  },
  {
    id: 11,
    question: 'Who provides care at home?',
    answer: 'The care team may include trained caregivers, nurses, physiotherapists and doctors, matched to the client’s assessed needs.',
  },
  {
    id: 12,
    question: 'Are your nurses and caregivers trained and verified?',
    answer: 'Care professionals are screened and trained for their assigned responsibilities, including safety, infection control and escalation.',
  },
  {
    id: 13,
    question: 'Will the same nurse or caregiver visit every day?',
    answer: 'As far as possible, dedicated staff are assigned for continuity. Backup or replacement support is coordinated when required.',
  },
  {
    id: 14,
    question: 'How do you monitor care at home?',
    answer: 'Care is monitored through documentation, progress tracking, family updates and regular supervisory review.',
  },
  {
    id: 15,
    question: 'Can family members be involved in the care plan?',
    answer: 'Yes. Family participation in goals, daily routines, monitoring and decisions is an important part of transparent home care.',
  },
  {
    id: 16,
    question: 'Do you provide 24/7 services?',
    answer: 'Round-the-clock care and escalation support can be arranged depending on the assessed service plan and staff availability.',
  },
  {
    id: 17,
    question: 'What if there is a medical emergency at home?',
    answer: 'The care team follows the defined escalation plan and coordinates with the appropriate doctor, ambulance or hospital when needed.',
  },
  {
    id: 18,
    question: 'Do you provide baby and mother care at home?',
    answer: 'Yes. We provide postnatal mother support, newborn care, feeding guidance and assistance with safe daily routines.',
  },
  {
    id: 19,
    question: 'Do you provide physiotherapy at home?',
    answer: 'Rehabilitation and physiotherapy programmes are being developed. Contact us to confirm current availability for your locality and need.',
  },
  {
    id: 20,
    question: 'What wellness programmes do you offer?',
    answer: 'Planned wellness services include yoga, nutrition and lifestyle guidance, preventive screening and stress-management support.',
  },
  {
    id: 21,
    question: 'How do I start services with Narpavi Homecare?',
    answer: `Call ${BRAND.phoneFormatted}, book an assessment, receive a custom care plan and confirm the start of care at home.`,
  },
];

const STATS = [
  { number: '500+', label: 'Chennai families served', icon: UsersRound },
  { number: '98%', label: 'Reported satisfaction', icon: BadgeCheck },
  { number: '24/7', label: 'Support availability', icon: ShieldCheck },
  { number: '24–48 hrs', label: 'Typical rapid setup window', icon: Clock3 },
];

const CARE_SHORTCUTS = [
  { label: 'Home Nursing', href: '#service-details', icon: HeartHandshake },
  { label: 'Medical Equipment', href: '/medical-equipment', icon: Activity },
  { label: 'Health Visits', href: '#service-details', icon: Stethoscope },
  { label: 'Rehabilitation', href: '#service-details', icon: UsersRound },
  { label: 'Wellness', href: '#service-details', icon: Sparkles },
  { label: 'Why Narpavi', href: '#why-choose', icon: ShieldCheck },
];

export const metadata: Metadata = {
  title: 'Trusted Home Healthcare in Chennai',
  description:
    'Complete home healthcare in Chennai with home nursing, ICU support, medical equipment, elder care, mother and baby care, rehabilitation and preventive wellness support.',
  keywords: [
    'home healthcare Chennai',
    'home nursing care Chennai',
    'ICU at home Chennai',
    'medical equipment rental Chennai',
    'doctor home visit Chennai',
    'elder care Chennai',
    'baby care at home Chennai',
    'rehabilitation at home Chennai',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Trusted Home Healthcare in Chennai | Narpavi Homecare',
    description: 'Hospital-grade home care delivered with compassion, safety and transparency.',
    url: BRAND.url,
    siteName: BRAND.name,
    locale: 'en_IN',
    type: 'website',
  },
};

function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
  align = 'center',
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`${styles.sectionHeading} ${align === 'left' ? styles.sectionHeadingLeft : ''}`}>
      <span className={styles.sectionIndex}>{index}</span>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export default function HomePage() {
  const schemas = [
    getWebPageSchema({
      title: 'Trusted Home Healthcare in Chennai',
      description: 'Complete, compassionate and professional healthcare delivered at home in Chennai.',
      path: '/',
    }),
    getFaqSchema(HOME_FAQS),
    getItemListSchema(
      'Narpavi Homecare solutions',
      SOLUTIONS.map((solution) => ({ name: solution.title, path: solution.href ?? '/contact' })),
    ),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />

      <div className={styles.home}>
        <section className={styles.hero} id="hero">
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroContent}>
              <div className={styles.heroKicker}>
                <MapPin size={16} />
                Professional home healthcare across Chennai
              </div>
              <h1>
                Trusted Home Healthcare
                <span>in Chennai</span>
              </h1>
              <p className={styles.heroLead}>
                Nursing, ICU support, medical equipment, recovery and wellness care — coordinated around your family,
                in the comfort of home.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryButton}>
                  Book a Home Assessment <ArrowRight size={18} />
                </Link>
                <a href={BRAND.phoneHref} className={styles.secondaryButton}>
                  <Phone size={18} /> Call {BRAND.phoneFormatted}
                </a>
              </div>
              <div className={styles.heroTrust}>
                {[
                  'Verified care professionals',
                  '24/7 escalation support',
                  'Transparent care planning',
                  'NRI-friendly family updates',
                ].map((item) => (
                  <span key={item}>
                    <CheckCircle2 size={16} /> {item}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <Image
                  src="/images/homepage/pik-01.png"
                  alt="Narpavi home nurse caring for a patient with family support"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingCardTop}`}>
                <ShieldCheck size={24} />
                <div>
                  <strong>Safety first</strong>
                  <span>Structured care protocols</span>
                </div>
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingCardBottom}`}>
                <Clock3 size={24} />
                <div>
                  <strong>Rapid coordination</strong>
                  <span>Often within 24–48 hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`container ${styles.trustBar}`}>
            {[
              { value: '24/7', label: 'Care escalation' },
              { value: 'Verified', label: 'Professionals' },
              { value: 'Clear', label: 'Family updates' },
              { value: 'Chennai', label: 'Local coordination' },
            ].map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <nav className={styles.careRail} aria-label="Explore homepage care sections">
          <div className={`container ${styles.careRailInner}`}>
            {CARE_SHORTCUTS.map((shortcut) => {
              const Icon = shortcut.icon;
              return (
                <Link href={shortcut.href} key={shortcut.label}>
                  <span>
                    <Icon size={20} />
                  </span>
                  {shortcut.label}
                  <ArrowRight size={14} />
                </Link>
              );
            })}
          </div>
        </nav>

        <section className={styles.section} id="definition">
          <div className={`container ${styles.introGrid}`}>
            <div className={styles.introVisual}>
              <Image
                src="/images/homepage/pik-02.png"
                alt="Home healthcare professional supporting a family"
                fill
                sizes="(max-width: 800px) 100vw, 45vw"
              />
            </div>
            <div>
              <SectionHeading
                index="02"
                eyebrow="What home healthcare means"
                title="Passionate healthcare at your doorstep"
                copy="Professional support designed around recovery, independence, safety and quality of life."
                align="left"
              />
              <p className={styles.introLead}>
                Narpavi Homecare brings skilled nurses, caregivers, clinical coordination and essential medical
                equipment directly to the patient’s home in Chennai and nearby areas.
              </p>
              <p className={styles.bodyCopy}>
                Our services support recovery after illness or surgery, ongoing daily needs, complex care,
                rehabilitation and preventive wellbeing — helping families avoid the stress of prolonged hospital
                stays while keeping care organised and accountable.
              </p>
              <div className={styles.promiseBox}>
                <Sparkles size={22} />
                <div>
                  <strong>Our service promise</strong>
                  <span>Compassionate care, transparent planning, prompt coordination and regular family updates.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionTint}`} id="solutions">
          <div className="container">
            <SectionHeading
              index="03"
              eyebrow="Complete care ecosystem"
              title="Explore Our Home Healthcare Solutions"
              copy="Access essential nursing, equipment, recovery and wellbeing support through one trusted care partner."
            />
            <div className={styles.solutionGrid}>
              {SOLUTIONS.map((solution) => (
                <Link href={solution.href ?? '/contact'} className={styles.solutionCard} key={solution.title}>
                  <div className={styles.solutionMedia}>
                    <Image src={solution.image} alt={solution.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                    {solution.status && <span className={styles.statusBadge}>{solution.status}</span>}
                  </div>
                  <div className={styles.solutionBody}>
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                    <span>
                      {solution.action} <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="service-details">
          <div className="container">
            <SectionHeading
              index="04"
              eyebrow="Detailed service content"
              title="The Right Support for Every Care Need"
              copy="Understand each service before choosing the care path that fits your family."
            />
            <div className={styles.detailList}>
              {SERVICE_DETAILS.map((service, index) => (
                <article className={`${styles.detailRow} ${index % 2 ? styles.detailRowReverse : ''}`} key={service.title}>
                  <div className={styles.detailImage}>
                    <Image src={service.image} alt={service.alt} fill sizes="(max-width: 800px) 100vw, 42vw" />
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailNumber}>{String(index + 1).padStart(2, '0')}</span>
                    {service.status && <span className={styles.softStatus}>{service.status}</span>}
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link href={service.href ?? '/contact'}>
                      {service.action} <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.benefitsSection}`} id="benefits">
          <div className="container">
            <div className={styles.benefitsHeader}>
              <div>
                <span className={styles.benefitsIndex}>05</span>
                <span className={styles.benefitsEyebrow}>Why care at home</span>
                <h2>Better recovery feels closer to home.</h2>
              </div>
              <div className={styles.benefitsHeaderCopy}>
                <p>
                  Hospital-grade coordination meets the emotional comfort, dignity and practical advantages of
                  familiar surroundings.
                </p>
                <span>
                  <Sparkles size={17} /> 8 family-first advantages
                </span>
              </div>
            </div>

            <div className={styles.benefitsShowcase}>
              <article className={styles.featuredBenefit}>
                <div className={styles.featuredBenefitImage}>
                  <Image
                    src={BENEFITS[0].image}
                    alt={BENEFITS[0].alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
                <div className={styles.featuredBenefitShade} />
                <span className={styles.featuredBenefitBadge}>
                  <HeartHandshake size={17} /> Featured advantage
                </span>
                <span className={styles.featuredBenefitNumber}>01</span>
                <div className={styles.featuredBenefitContent}>
                  <h3>{BENEFITS[0].title}</h3>
                  <p>{BENEFITS[0].description}</p>
                  <div>
                    <span>
                      <CheckCircle2 size={15} /> Familiar environment
                    </span>
                    <span>
                      <CheckCircle2 size={15} /> Family presence
                    </span>
                  </div>
                </div>
              </article>

              <div className={styles.benefitTileGrid}>
                {BENEFITS.slice(1).map((benefit, index) => {
                  const Icon = BENEFIT_ICONS[index + 1];
                  return (
                    <article className={styles.benefitTile} key={benefit.title}>
                      <div className={styles.benefitTileTop}>
                        <span className={styles.benefitTileIcon}>
                          <Icon size={20} />
                        </span>
                        <span className={styles.benefitTileNumber}>{String(index + 2).padStart(2, '0')}</span>
                      </div>
                      <div className={styles.benefitTileBody}>
                        <div className={styles.benefitTileImage}>
                          <Image src={benefit.image} alt={benefit.alt} fill sizes="(max-width: 640px) 30vw, 10vw" />
                        </div>
                        <div>
                          <h3>{benefit.title}</h3>
                          <p>{benefit.description}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className={styles.benefitsFooter}>
              <div>
                <ShieldCheck size={22} />
                <span>
                  <strong>Care designed around real life</strong>
                  Every plan balances clinical needs with family routines, safety and independence.
                </span>
              </div>
              <Link href="/contact">
                Find the right care plan <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section} id="who-we-care-for">
          <div className="container">
            <SectionHeading
              index="06"
              eyebrow="Care for every life stage"
              title="Who We Care For"
              copy="From newborns to seniors, short-term recovery to long-term support — our care starts with understanding the person."
            />
            <div className={styles.audienceGrid}>
              {AUDIENCES.map((audience) => (
                <article className={styles.audienceCard} key={audience.title}>
                  <div className={styles.audienceImage}>
                    <Image src={audience.image} alt={audience.alt} fill sizes="(max-width: 640px) 100vw, 25vw" />
                  </div>
                  <div className={styles.audienceOverlay}>
                    <h3>{audience.title}</h3>
                    <p>{audience.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.centerAction}>
              <Link href="/contact" className={styles.primaryButton}>
                Tell Us About Your Care Need <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`} id="why-choose">
          <div className="container">
            <SectionHeading
              index="07"
              eyebrow="Why choose Narpavi"
              title="Care Built on Trust, Safety and Compassion"
              copy="Families need more than a service provider. They need a responsive care partner who communicates clearly."
            />
            <div className={styles.trustGrid}>
              {TRUST_PILLARS.map((pillar) => (
                <article className={styles.trustCard} key={pillar.title}>
                  <div className={styles.trustImage}>
                    <Image src={pillar.image} alt={pillar.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  </div>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.trustNote}>
              <Check size={18} />
              Real-time family updates
              <Check size={18} />
              24/7 escalation support
              <Check size={18} />
              Patient dignity at every step
            </div>
          </div>
        </section>

        <section className={styles.section} id="process">
          <div className="container">
            <SectionHeading
              index="08"
              eyebrow="Simple care journey"
              title="Our Comprehensive Home Healthcare Process"
              copy="A transparent path from your first conversation to monitored, coordinated care at home."
            />
            <div className={styles.processGrid}>
              {PROCESS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article className={styles.processCard} key={step.title}>
                    <span className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <div className={styles.processIcon}>
                      <Icon size={24} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.proofSection}`} id="proof">
          <div className="container">
            <SectionHeading
              index="09"
              eyebrow="Confidence through accountability"
              title="Trusted by Families Across Chennai"
              copy="Clear care plans, responsive coordination and measurable progress help families feel informed and supported."
            />
            <div className={styles.statsGrid}>
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div className={styles.statCard} key={stat.label}>
                    <Icon size={25} />
                    <strong>{stat.number}</strong>
                    <span>{stat.label}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.reviewPlaceholder}>
              <div>
                <BadgeCheck size={28} />
                <h3>Real family experiences matter</h3>
                <p>
                  We publish only verified feedback shared with consent. Speak to our team to understand how care is
                  planned, monitored and communicated for families in Chennai and abroad.
                </p>
              </div>
              <Link href="/contact" className={styles.secondaryButton}>
                Speak to a Care Expert <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section} id="faqs">
          <div className="container">
            <SectionHeading
              index="10"
              eyebrow="Frequently asked questions"
              title="Answers Before You Begin Care"
              copy="Practical information about services, safety, staffing, pricing, monitoring and getting started."
            />
            <HomeFAQAccordion faqs={HOME_FAQS} />
          </div>
        </section>

        <section className={styles.finalCta} id="contact">
          <div className="container">
            <div className={styles.finalCtaInner}>
              <div>
                <span>Start with a conversation</span>
                <h2>Need trusted healthcare support at home?</h2>
                <p>Tell us what your family needs. We will help you understand the right care path and next steps.</p>
              </div>
              <div className={styles.finalActions}>
                <Link href="/contact" className={styles.lightButton}>
                  Book a Home Assessment <ArrowRight size={18} />
                </Link>
                <a href={BRAND.phoneHref} className={styles.darkButton}>
                  <Phone size={18} /> {BRAND.phoneFormatted}
                </a>
              </div>
              <div className={styles.finalBadges}>
                <span>
                  <ShieldCheck size={16} /> Safety-led care
                </span>
                <span>
                  <IndianRupee size={16} /> Transparent estimates
                </span>
                <span>
                  <UsersRound size={16} /> Family involvement
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
