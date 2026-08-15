import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import HomeFAQAccordion from '@/components/sections/HomeFAQAccordion';
import ScrollAnimator from '@/components/ui/ScrollAnimator';
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
  launchLabel?: string;
};

const SOLUTIONS: ImageCard[] = [
  {
    title: '',
    description: 'Skilled nursing and caregiver support from basic daily assistance to advanced and ICU-level care.',
    image: '/images/homepage/pik-02.png',
    alt: 'A home nurse supporting a patient and family',
    href: '/home-nursing-care',
    action: 'Home Nursing Care',
  },
  {
    title: '',
    description: 'Hospital-grade equipment for rental or purchase, delivered, installed and supported at home.',
    image: '/images/homepage/pik-03.png',
    alt: 'Hospital-grade medical equipment in a clean care room',
    href: '/medical-equipment',
    action: 'Medical Equipment',
  },
  {
    title: '',
    description: 'Doctor consultations, nursing procedures, treatment support and vaccinations at home.',
    image: '/images/homepage/pik-04.png',
    alt: 'A nurse providing a health visit to an elderly patient',
    action: 'Health Visits',
    launchLabel: 'Launching Soon',
  },
  {
    title: '',
    description: 'Cardiac, pulmonary, neurological and orthopedic recovery programmes led by experienced professionals.',
    image: '/images/homepage/pik-05.png',
    alt: 'A rehabilitation professional helping a patient',
    action: 'Rehabilitation',
    launchLabel: 'Launching Soon',
  },
  {
    title: '',
    description: 'Yoga, nutrition, lifestyle coaching, screenings, stress management and corporate wellness.',
    image: '/images/homepage/pik-06-clean.png',
    alt: 'Wellness and meditation illustration',
    action: 'Wellness & Preventive Care',
    launchLabel: 'Launching Soon',
  },
  {
    title: '',
    description: 'Coordinated support for people who need ongoing safety, supervision, companionship and daily assistance.',
    image: '/images/homepage/pik-24.png',
    alt: 'A family supporting a loved one at home',
    action: 'Assisted Living',
    launchLabel: 'Launching Soon',
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
    action: 'Explore Medical Equipment',
  },
  {
    title: 'Health Visits',
    description:
      'Convenient professional visits at home, including doctor consultations and nursing procedures such as IV therapy, wound dressing, injections and catheter changes, plus treatment and vaccination support delivered with clinical safety and comfort.',
    image: '/images/homepage/pik-09.png',
    alt: 'A clinical team preparing for a home health visit',
    href: '/contact',
    action: '',
  },
  {
    title: 'Rehabilitation',
    description:
      'Comprehensive recovery support through cardiac, pulmonary, neurological and orthopedic rehabilitation programmes. Experienced professionals help patients rebuild strength, mobility and independence after surgery, stroke or chronic illness.',
    image: '/images/homepage/pik-10.png',
    alt: 'A physiotherapist guiding a patient through rehabilitation',
    href: '/contact',
    action: '',
  },
  {
    title: 'Wellness & Preventive Care',
    description:
      'Proactive support for the whole family through yoga and meditation therapy, nutrition and lifestyle coaching, stress management, preventive health screening and corporate wellness programmes.',
    image: '/images/homepage/pik-11.png',
    alt: 'A wellness emblem surrounded by natural health symbols',
    href: '/contact',
    action: '',
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
    answer: 'Book an assessment, receive a custom care plan and confirm the start of care at home.',
  },
];

const STATS = [
  { number: '100+', label: 'Chennai families served', icon: UsersRound },
  { number: '98%', label: 'Reported satisfaction', icon: BadgeCheck },
  { number: '24/7', label: 'Support availability', icon: ShieldCheck },
  { number: '24–48 hrs', label: 'Typical rapid setup window', icon: Clock3 },
];

const HERO_BANNERS = [
  {
    kicker: 'Nurse-led care at home',
    heading: 'Home Nursing',
    highlight: 'Care',
    copy:
      'Skilled nurses and caregivers support recovery, daily routines and clinical needs at home with calm, family-first coordination.',
    image: '/images/homepage/banner-home-nursing-care-illustration.png',
    alt: 'A home nurse supporting a patient and family',
    usps: ['Verified Professionals', 'Hospital-Grade Protocols', 'Customised Care Plans'],
    metric: 'Care plan matched to every patient',
    accent: '#009A9F',
    accentRgb: '0, 154, 159',
    accentSoft: '#E6F8F8',
  },
  {
    kicker: 'Hospital equipment for home',
    heading: 'Medical Equipment',
    highlight: 'Setup',
    copy:
      'Hospital-grade equipment is delivered, installed and supported so families can begin safe home care with practical guidance.',
    image: '/images/homepage/banner-medical-equipment-illustration.png',
    alt: 'Hospital-grade medical equipment for home care',
    usps: ['Hospital-Grade Protocols', 'Rapid Setup', 'Transparent Pricing'],
    metric: 'Rental and purchase support',
    accent: '#FF784B',
    accentRgb: '255, 120, 75',
    accentSoft: '#FFF1EA',
  },
  {
    kicker: 'Clinical checks at home',
    heading: 'Health',
    highlight: 'Visits',
    copy:
      'Doctor and nurse visits bring professional checks, procedures and treatment support home with hygiene, comfort and clarity.',
    image: '/images/homepage/banner-health-visits-illustration.png',
    alt: 'A healthcare professional visiting an elderly patient at home',
    usps: ['Verified Professionals', 'Safety First', 'Rapid Setup'],
    metric: 'Home procedures planned safely',
    accent: '#3A8E55',
    accentRgb: '58, 142, 85',
    accentSoft: '#EDF8EF',
  },
  {
    kicker: 'Recovery beyond hospital',
    heading: 'Rehabilitation',
    highlight: 'Support',
    copy:
      'Recovery support for stroke, surgery, orthopedic, cardiac, pulmonary or neurological needs, guided toward strength and independence.',
    image: '/images/homepage/banner-rehabilitation-illustration.png',
    alt: 'A rehabilitation professional helping a patient at home',
    usps: ['Customised Care Plans', 'Safety First', 'Verified Professionals'],
    metric: 'Mobility, strength and confidence',
    accent: '#4763B8',
    accentRgb: '71, 99, 184',
    accentSoft: '#EEF2FF',
  },
  {
    kicker: 'Everyday health guidance',
    heading: 'Wellness &',
    highlight: 'Preventive Care',
    copy:
      'Preventive care supports healthier routines through wellness guidance, lifestyle support and simple checks shaped around each family.',
    image: '/images/homepage/banner-wellness-preventive-care-illustration.png',
    alt: 'Wellness and preventive care support at home',
    usps: ['Customised Care Plans', 'Safety First', 'Transparent Pricing'],
    metric: 'Better routines for long-term health',
    accent: '#8F5AAE',
    accentRgb: '143, 90, 174',
    accentSoft: '#F6EFFB',
  },
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
  title,
  copy,
  align = 'center',
  className = '',
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  copy: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div className={`${styles.sectionHeading} ${align === 'left' ? styles.sectionHeadingLeft : ''} ${className}`}>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
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
          <div className={`container ${styles.heroCarousel}`} aria-label="Main page service banners">
            {HERO_BANNERS.map((banner, index) => (
              <article
                className={styles.heroSlide}
                key={banner.heading}
                style={
                  {
                    '--slide-delay': `${(index - HERO_BANNERS.length) * 5}s`,
                    '--banner-accent': banner.accent,
                    '--banner-accent-rgb': banner.accentRgb,
                    '--banner-soft': banner.accentSoft,
                  } as CSSProperties
                }
              >
                <div className={styles.heroContent}>
                  <span className={styles.heroEyebrow}>
                    <Sparkles size={16} />
                    {banner.kicker}
                  </span>
                  <h1>
                    {banner.heading} <span>{banner.highlight}</span>
                  </h1>
                  <p className={styles.heroLead}>{banner.copy}</p>
                  <ul className={styles.heroUsps} aria-label={`${banner.heading} USPs`}>
                    {banner.usps.map((usp) => (
                      <li key={usp}>
                        <span className={styles.heroUspIcon}>
                          <CheckCircle2 size={18} />
                        </span>
                        <span>{usp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.heroVisual}>
                  <div className={styles.heroImage}>
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                    <div className={styles.heroImageBadge}>
                      <BadgeCheck size={18} />
                      <span>{banner.metric}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </section>

        <section className={`${styles.section} ${styles.homeIntroSection}`} id="home-health-care">
          <div className="container">
            <ScrollAnimator>
              <div className={styles.homeIntroShell}>
                <div className={styles.homeIntroGrid}>
                  <div className={styles.homeIntroCopy}>
                    <h2>Passionate Home Healthcare at Your Door-Step</h2>
                    <p>
                      <strong>Home Health Care</strong> by <strong>Narpavi</strong> is a <em>comprehensive range of
                      professional healthcare services provided at the patient&apos;s home in Chennai and surrounding
                      areas.</em> Our services are designed to support <strong>recovery after illness or surgery</strong>,
                      deliver <strong>skilled nursing and rehabilitation therapies</strong>, address{' '}
                      <strong>daily health needs</strong> and enhance <strong>overall wellbeing</strong>, all with the
                      goal of promoting <strong>healing, independence, comfort and quality of life.</strong>
                    </p>
                  </div>
                  <div className={styles.homeIntroVisual}>
                    <div className={styles.homeIntroImageCard}>
                      <Image
                        src="/images/homepage/home-health-care-intro.png"
                        alt="Narpavi nurse supporting a patient and family with home healthcare"
                        fill
                        sizes="(max-width: 900px) 100vw, 48vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionTint}`} id="solutions">
          <div className="container">
            <ScrollAnimator>
              <SectionHeading
                index="01"
                eyebrow="Complete care ecosystem"
                title="Explore Our Home Healthcare Solutions"
                copy=""
                className={styles.solutionsHeading}
              />
            </ScrollAnimator>
            <div className={styles.solutionGrid}>
              {SOLUTIONS.map((solution) => {
                const cardClassName = `${styles.solutionCard} ${
                  solution.launchLabel ? styles.solutionCardUpcoming : ''
                }`;
                const cardKey = `${solution.action ?? solution.title}-${solution.image}`;
                const cardContent = (
                  <>
                    <div className={styles.solutionMedia}>
                      <Image src={solution.image} alt={solution.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                      {solution.launchLabel && (
                        <span className={`${styles.statusBadge} ${styles.launchBadge}`}>
                          {solution.launchLabel}
                        </span>
                      )}
                      {solution.status && <span className={styles.statusBadge}>{solution.status}</span>}
                    </div>
                    <div className={styles.solutionBody}>
                      <h3>{solution.title}</h3>
                      {solution.action && (
                        <span>
                          {solution.action} {solution.href && <ArrowRight size={16} />}
                        </span>
                      )}
                    </div>
                  </>
                );

                if (!solution.href || !solution.action) {
                  return (
                    <article className={`${cardClassName} ${styles.solutionCardStatic}`} key={cardKey}>
                      {cardContent}
                    </article>
                  );
                }

                return (
                  <Link href={solution.href} className={cardClassName} key={cardKey}>
                    {cardContent}
                  </Link>
                );
              })}
            </div>
            <div className={styles.serviceOrbit}>
              <div className={styles.serviceDetailGrid}>
                {SERVICE_DETAILS.map((service) => (
                  <article className={styles.serviceDetailCard} key={service.title}>
                    <div className={styles.serviceDetailMedia}>
                      <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 28vw" />
                    </div>
                    <div className={styles.serviceDetailBody}>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      {service.action && (
                        <Link href={service.href ?? '/contact'}>
                          {service.action} <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section className={`${styles.section} ${styles.benefitsSection}`} id="benefits">
          <div className="container">
            <ScrollAnimator>
            <div className={styles.benefitsFlowHeader}>
              <h2>How Home Healthcare Benefits Families</h2>
              <div className={styles.benefitsFlowIntro}>
                <p>
                  Home healthcare provides comfort, safety, and cost efficiency while allowing patients to recover
                  surrounded by their loved ones. <strong>Narpavi Homecare</strong> delivers hospital-grade care and
                  outcomes in the warmth and comfort of your home.
                </p>
              </div>
            </div>
            </ScrollAnimator>

            <ScrollAnimator animation="fadeUp" delay={200}>
            <div className={styles.benefitsFlowGrid}>
                {BENEFITS.map((benefit, index) => {
                  const Icon = BENEFIT_ICONS[index];
                  return (
                    <article className={styles.benefitFlowItem} key={benefit.title}>
                      <div className={styles.benefitFlowCard}>
                        <span className={styles.benefitFlowIcon}>
                          <Icon size={18} />
                        </span>
                        <div>
                          <h3>{benefit.title}</h3>
                          <p>{benefit.description}</p>
                        </div>
                      </div>
                      <div className={styles.benefitFlowImage}>
                        <Image src={benefit.image} alt={benefit.alt} fill sizes="(max-width: 760px) 34vw, 9vw" />
                      </div>
                    </article>
                  );
                })}
            </div>
            </ScrollAnimator>

            <ScrollAnimator animation="fadeUp" delay={100}>
            <div className={styles.benefitsFooter}>
              <div>
                <ShieldCheck size={22} />
                <span>
                  <strong>Solutions designed around real life</strong>
                  Every plan balances clinical needs with family routines, safety and independence.
                </span>
              </div>
              <Link href="#solutions">
                Find the right solution <ArrowRight size={17} />
              </Link>
            </div>
            </ScrollAnimator>
          </div>
        </section>

        <section className={styles.section} id="who-we-care-for">
          <div className="container">
            <ScrollAnimator>
            <SectionHeading
              index="04"
              eyebrow="Care for every life stage"
              title="Comprehensive Home Healthcare for Every Stage of Life"
              className={styles.lifeStageHeading}
              copy="Who We Care For – Narpavi Homecare supports patients and families across every stage of life, from newborns to seniors, and from post-recovery support to long-term chronic care. For safe, professional home healthcare in Chennai, we’re here for you"
            />
            </ScrollAnimator>
            <ScrollAnimator animation="fadeUp" delay={150}>
            <div className={styles.audienceGrid}>
              {AUDIENCES.map((audience) => (
                <article className={styles.audienceCard} key={audience.title}>
                  <div className={styles.audienceImage}>
                    <Image src={audience.image} alt={audience.alt} fill sizes="(max-width: 640px) 100vw, 25vw" />
                  </div>
                  <div className={styles.audienceOverlay}>
                    <h3>{audience.title}</h3>
                  </div>
                </article>
              ))}
            </div>
            </ScrollAnimator>
            <div className={styles.centerAction}>
              <Link href="#solutions" className={styles.primaryButton}>
                Find the right solution <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`} id="why-choose">
          <div className="container">
            <ScrollAnimator>
            <SectionHeading
              index="05"
              eyebrow="Why choose Narpavi"
              title=" Why Choose Us-Care Built on Trust, Safety and Compassion"
              className={styles.whyChooseHeading}
              copy="Choosing the right home care provider is a serious decision. That’s why families and NRIs trust Narpavi Homecare for compassionate, transparent, and clinically excellent care delivered in the comfort of home."
            />
            </ScrollAnimator>
            <ScrollAnimator animation="fadeUp" delay={150}>
            <div className={styles.trustGrid}>
              {TRUST_PILLARS.map((pillar) => (
                <article className={styles.trustCard} key={pillar.title}>
                  <div className={styles.trustImage}>
                    <Image src={pillar.image} alt={pillar.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  </div>
                  <div>
                    <h3>{pillar.title}</h3>
                  </div>
                </article>
              ))}
            </div>
            </ScrollAnimator>
          </div>
        </section>

        <section className={`${styles.section} ${styles.proofSection}`} id="proof">
          <div className="container">
            <ScrollAnimator>
            <SectionHeading
              index="06"
              eyebrow="Confidence through accountability"
              title="Trusted by Families Across Chennai"
              copy="Clear care plans, responsive coordination and measurable progress help families feel informed and supported."
            />
            </ScrollAnimator>
            <ScrollAnimator animation="fadeUp" delay={100}>
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
            </ScrollAnimator>
            <ScrollAnimator animation="fadeUp" delay={200}>
            <div className={styles.reviewPlaceholder}>
              <div>
                <BadgeCheck size={28} />
                <h3>Real family experiences matter</h3>
                <p>
                  We publish only verified feedback shared with consent. Speak to our team to understand how care is
                  planned, monitored and communicated for families in Chennai and abroad.
                </p>
              </div>
            </div>
            </ScrollAnimator>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} id="faqs">
          <div className="container">
            <ScrollAnimator>
            <SectionHeading
              index="07"
              eyebrow="Frequently asked questions"
              title="Answers Before You Begin Care"
              className={styles.faqHeading}
              copy="Practical information about services, safety, staffing, pricing, monitoring and getting started."
            />
            </ScrollAnimator>
            <div className={styles.faqShowcase}>
              <div className={styles.faqListPanel}>
                <HomeFAQAccordion faqs={HOME_FAQS} />
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
