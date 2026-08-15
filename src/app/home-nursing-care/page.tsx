import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, CheckCircle2, Sparkles } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import FAQAccordion from '@/components/sections/FAQAccordion';
import SiteIcon from '@/components/ui/SiteIcon';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import homeStyles from '../home.module.css';
import processStyles from './enrollment-process.module.css';
import polishStyles from './page-polish.module.css';
import { getFaqSchema, getServiceSchema, getWebPageSchema } from '@/lib/seo';
import {
  HNC_HERO_BANNERS,
  HNC_DEFINITION_HEADING,
  HNC_DEFINITION_PARAGRAPHS,
  HNC_DEFINITION_IMAGE,
  HNC_BENEFITS_HEADING,
  HNC_BENEFITS_IMAGE,
  HNC_BENEFITS,
  HNC_CATALOGUE_HEADING,
  HNC_CATALOGUE_INTRO,
  HNC_CATALOGUE_FOOTER,
  HNC_SERVICES,
  HNC_STEPS_HEADING,
  HNC_STEPS_NOTE,
  HNC_STEPS,
  HNC_TRUST_HEADING,
  HNC_TRUST_INTRO,
  HNC_TRUST_FOOTER,
  HNC_TRUST_PILLARS,
  HNC_AUDIENCE_HEADING,
  HNC_AUDIENCE_INTRO,
  HNC_AUDIENCE_FOOTER,
  HNC_AUDIENCES,
  HNC_DELIVERABLES_HEADING,
  HNC_DELIVERABLES_INTRO,
  HNC_DELIVERABLES_FOOTER,
  HNC_DELIVERABLES_IMAGE,
  HNC_DELIVERABLES,
  HNC_COMPREHENSIVE_HEADING,
  HNC_COMPREHENSIVE_PARAGRAPHS,
  HNC_COMPREHENSIVE_IMAGES,
  HNC_ENROLLMENT_HEADING,
  HNC_ENROLLMENT_INTRO,
  HNC_ENROLLMENT_FOOTER,
  HNC_ENROLLMENT_STEPS,
  HNC_STATS,
  HNC_TESTIMONIAL_INTRO,
  HNC_TESTIMONIALS,
  HNC_RESOURCES,
  HNC_CTA_HEADING,
  HNC_CTA_SCENARIOS,
  HNC_FAQS,
} from '@/lib/homeNursingCareData';

const HNC_CAROUSEL_BANNERS = [
  {
    kicker: 'Gentle newborn support at home',
    heading: 'Baby',
    highlight: 'Care',
    copy: 'Trained caregivers support newborn routines and help mothers recover with calm, hygienic and family-centred care at home.',
    image: HNC_HERO_BANNERS[0],
    alt: 'Baby care nurse in a pink uniform caring for a newborn at home',
    usps: ['Mother & Baby Support', 'Hygiene-Focused Care', 'Trained Caregivers'],
    metric: 'Comforting support for mother and newborn',
    accent: '#e36f99',
    accentRgb: '227, 111, 153',
    accentSoft: '#fff0f5',
  },
  {
    kicker: 'Everyday clinical support at home',
    heading: 'Basic Nursing',
    highlight: 'Care',
    copy: 'Professional nurses assist with vital checks, medication support, wound care and daily recovery needs in the comfort of home.',
    image: HNC_HERO_BANNERS[1],
    alt: 'Home nurse checking an elderly patient with family support',
    usps: ['Vital Monitoring', 'Medication Support', 'One-to-One Attention'],
    metric: 'Reliable nursing for everyday care needs',
    accent: '#009a9f',
    accentRgb: '0, 154, 159',
    accentSoft: '#e6f8f8',
  },
  {
    kicker: 'Advanced recovery beyond hospital',
    heading: 'Advance Nursing',
    highlight: 'Care',
    copy: 'Skilled nurses coordinate post-operative recovery, IV support and advanced procedures through structured clinical care at home.',
    image: HNC_HERO_BANNERS[2],
    alt: 'Nurse providing advanced post-operative care in a home-care room',
    usps: ['Advanced Procedures', 'Clinical Supervision', 'Recovery Monitoring'],
    metric: 'Structured advanced care with continuous oversight',
    accent: '#4763b8',
    accentRgb: '71, 99, 184',
    accentSoft: '#eef2ff',
  },
  {
    kicker: 'Condition-specific clinical expertise',
    heading: 'Specialty Nursing',
    highlight: 'Care',
    copy: 'Specially trained nurses provide focused care for complex conditions, rehabilitation needs and long-term clinical support at home.',
    image: HNC_HERO_BANNERS[3],
    alt: 'Specialty nursing care for a patient at home',
    usps: ['Specialist Nurses', 'Condition-Based Care', 'Family Education'],
    metric: 'Focused expertise for complex care requirements',
    accent: '#8f5aae',
    accentRgb: '143, 90, 174',
    accentSoft: '#f6effb',
  },
  {
    kicker: 'Critical care brought safely home',
    heading: 'ICU at',
    highlight: 'Home',
    copy: 'Critical-care teams deliver hospital-grade monitoring, equipment coordination and high-dependency nursing within the patient’s home.',
    image: HNC_HERO_BANNERS[4],
    alt: 'ICU at home nursing and monitoring setup',
    usps: ['Critical-Care Nurses', '24/7 Monitoring', 'Hospital-Grade Setup'],
    metric: 'ICU-level support coordinated at home',
    accent: '#e05b4f',
    accentRgb: '224, 91, 79',
    accentSoft: '#fff0ed',
  },
  {
    kicker: 'Recovery, mobility and independence',
    heading: 'Elder',
    highlight: 'Care',
    copy: 'Compassionate caregivers help older adults with mobility, routines, companionship and recovery while preserving dignity and independence.',
    image: HNC_HERO_BANNERS[5],
    alt: 'Care professional supporting an elderly patient during mobility training',
    usps: ['Mobility Assistance', 'Companionship', 'Family Communication'],
    metric: 'Dignified support for safer independent living',
    accent: '#3a8e55',
    accentRgb: '58, 142, 85',
    accentSoft: '#edf8ef',
  },
];

const HNC_BENEFIT_LEFT_ORDER = [0, 2, 4, 1, 3];
const HNC_BENEFIT_RIGHT_ORDER = [5, 6];


export const metadata: Metadata = {
  title: 'Nursing Care at Home in Chennai — Narpavi Homecare',
  description: 'Professional home nursing in Chennai — Basic, Advanced, Specialty & ICU-at-Home care. Trusted by families for post-surgery, elderly, baby, and industrial health support.',
  keywords: [
    'home nursing care Chennai',
    'ICU at home Chennai',
    'advanced nursing care Chennai',
    'post-surgical nursing',
    'elderly care nursing Chennai',
    'baby care nurse Chennai',
    'industrial nurse Chennai',
  ],
  alternates: { canonical: '/home-nursing-care' },
  openGraph: {
    title: 'Nursing Care Services in Chennai — Narpavi Homecare',
    description: 'Complete spectrum of home nursing — from basic support to ICU-level care, baby & elder care, and industrial health services.',
  },
};

export default function HomeNursingCareHub() {
  const pageSchemas = [
    getWebPageSchema({
      title: 'Nursing Care at Home in Chennai',
      description: 'Professional home nursing in Chennai — Basic, Advanced, Specialty & ICU-at-Home care. Trusted by families for post-surgery, elderly, baby, and industrial health support.',
      path: '/home-nursing-care',
    }),
    getServiceSchema({
      name: 'Home Nursing Care Services',
      description: 'Nurse-supervised home nursing care for recovery, chronic illness support, advanced procedures, and ICU-level home care.',
      path: '/home-nursing-care',
      serviceType: 'Home healthcare service',
    }),
    getFaqSchema(HNC_FAQS),
  ];

  return (
    <>
      <StructuredDataScript data={pageSchemas} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care' }]} />

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════ */}
      <main className={`basic-care-v2 ${polishStyles.page}`}>
      <section className={homeStyles.hero} id="hnc-hero" style={{ marginTop: 0 }}>
        <div className={homeStyles.heroGlow} aria-hidden="true" />
        <div className={`container ${homeStyles.heroCarousel}`} aria-label="Home nursing care service banners">
          {HNC_CAROUSEL_BANNERS.map((banner, index) => (
            <article
              className={`${homeStyles.heroSlide} hnc-carousel-slide`}
              key={banner.heading}
              style={{
                '--slide-delay': `${(index - HNC_CAROUSEL_BANNERS.length) * 5}s`,
                '--banner-accent': banner.accent,
                '--banner-accent-rgb': banner.accentRgb,
                '--banner-soft': banner.accentSoft,
                animationDuration: `${HNC_CAROUSEL_BANNERS.length * 5}s`,
              } as CSSProperties}
            >
              <div className={homeStyles.heroContent}>
                <span className={homeStyles.heroEyebrow}><Sparkles size={16} />{banner.kicker}</span>
                <h1>{banner.heading} <span>{banner.highlight}</span></h1>
                <p className={homeStyles.heroLead}>{banner.copy}</p>
                <ul className={homeStyles.heroUsps} aria-label={`${banner.heading} benefits`}>
                  {banner.usps.map((usp) => (
                    <li key={usp}><span className={homeStyles.heroUspIcon}><CheckCircle2 size={18} /></span><span>{usp}</span></li>
                  ))}
                </ul>
              </div>
              <div className={homeStyles.heroVisual}>
                <div className={homeStyles.heroImage}>
                  <Image src={banner.image} alt={banner.alt} fill priority={index === 0} sizes="(max-width: 900px) 100vw, 50vw" />
                  <div className={homeStyles.heroImageBadge}><BadgeCheck size={18} /><span>{banner.metric}</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 2: WHAT IS HOME NURSING CARE (SUMMARY LAYOUT)
          ═══════════════════════════════════════════ */}
      <section className="section section--alt" id="hnc-comprehensive">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{HNC_COMPREHENSIVE_HEADING}</h2>
          <div className="hnc-v2__comprehensive">
            <div className="hnc-v2__comprehensive-row hnc-v2__comprehensive-row--top">
              <div className="hnc-v2__comprehensive-copy">
                {HNC_COMPREHENSIVE_PARAGRAPHS.slice(0, 4).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="hnc-v2__comprehensive-img">
                <Image src={HNC_COMPREHENSIVE_IMAGES[0]} alt="Comprehensive nursing care" fill style={{ objectFit: 'cover' }} sizes="(max-width: 992px) 100vw, 300px" />
              </div>
            </div>
            <div className="hnc-v2__comprehensive-row hnc-v2__comprehensive-row--bottom">
              <div className="hnc-v2__comprehensive-img">
                <Image src={HNC_COMPREHENSIVE_IMAGES[1]} alt="Compassionate nursing care at home" fill style={{ objectFit: 'cover' }} sizes="(max-width: 992px) 100vw, 300px" />
              </div>
              <div className="hnc-v2__comprehensive-copy">
                {HNC_COMPREHENSIVE_PARAGRAPHS.slice(4).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="hnc-catalogue">
        <div className="container">
          <div className="section__header">
            <h2>{HNC_CATALOGUE_HEADING}</h2>
            <p>{HNC_CATALOGUE_INTRO}</p>
          </div>
          <div className="hnc-v2__catalogue-grid">
            {HNC_SERVICES.map((s, i) => (
              <Link key={i} href={s.href} className="hnc-v2__catalogue-card" style={{ textDecoration: 'none' }}>
                <div className="hnc-v2__catalogue-card-img">
                  <Image src={s.image} alt={s.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw" />
                </div>
                <div className="hnc-v2__catalogue-overlay">
                  <h3>{s.label}</h3>
                  <span className="btn">More Details <SiteIcon name="Arrow" size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '2rem', lineHeight: 1.7 }}>
            {HNC_CATALOGUE_FOOTER}
          </p>
        </div>
      </section>

      <section className="section" id="hnc-definition">
        <div className="container">
          <div className="hnc-v2__def">
            <div className="hnc-v2__def-copy">
              <h2>{HNC_DEFINITION_HEADING}</h2>
              {HNC_DEFINITION_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="hnc-v2__def-visual">
              <Image src={HNC_DEFINITION_IMAGE} alt="What is home nursing care" fill style={{ objectFit: 'cover' }} sizes="(max-width: 992px) 100vw, 38vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: BENEFITS
          ═══════════════════════════════════════════ */}
      <section className="section section--alt" id="hnc-benefits">
        <div className="container">
          <div className="section__header">
            <h2>{HNC_BENEFITS_HEADING}</h2>
          </div>
          <div className="hnc-v2__benefits-layout">
            <div className="hnc-v2__benefits-column hnc-v2__benefits-column--primary">
              {HNC_BENEFIT_LEFT_ORDER.map((itemIndex) => {
                const item = HNC_BENEFITS[itemIndex];
                return (
                  <article className="hnc-v2__benefit-pair" key={item.title}>
                    <div className="hnc-v2__benefit-label">
                      <span className="hnc-v2__benefit-icon"><SiteIcon name={item.icon || item.title} size={22} /></span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="hnc-v2__benefits-column hnc-v2__benefits-column--secondary">
              <div className="hnc-v2__benefits-visual">
                <Image src={HNC_BENEFITS_IMAGE} alt="How home nursing care benefits families" fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
              </div>
              {HNC_BENEFIT_RIGHT_ORDER.map((itemIndex) => {
                const item = HNC_BENEFITS[itemIndex];
                return (
                  <article className="hnc-v2__benefit-pair" key={item.title}>
                    <div className="hnc-v2__benefit-label">
                      <span className="hnc-v2__benefit-icon"><SiteIcon name={item.icon || item.title} size={22} /></span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: SERVICE CATALOGUE
          ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          SECTION 5: 4 SMART STEPS
          ═══════════════════════════════════════════ */}
      <section className="section section--alt" id="hnc-steps">
        <div className="container">
          <div className="section__header">
            <h2>{HNC_STEPS_HEADING}</h2>
          </div>
          <div className="hnc-v2__steps-grid">
            {HNC_STEPS.map((s, i) => (
              <div key={i} className="hnc-v2__step-card">
                <div className="hnc-v2__step-num">{s.step}</div>
                <h4>{s.title}</h4>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="hnc-v2__steps-followup">
            <p>{HNC_STEPS_NOTE}</p>
            <div className="hnc-v2__steps-cta">
              <Link href="#hnc-cta" className="btn btn--secondary btn--lg">Book for a Free Expert Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: WHY CHOOSE US — TRUST PILLARS
          ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          SECTION 6: WHY CHOOSE US — TRUST PILLARS
          ═══════════════════════════════════════════ */}
      <section className="section" id="hnc-trust">
        <div className="container">
          <div className="section__header">
            <h2>{HNC_TRUST_HEADING}</h2>
            <p>{HNC_TRUST_INTRO}</p>
          </div>
          <div className="hnc-v2__trust-grid">
            {HNC_TRUST_PILLARS.map((t, i) => (
              <article className="hnc-v2__trust-card" key={i}>
                <div className="hnc-v2__trust-card-img">
                  <Image src={t.image} alt={t.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <h3>{t.title}</h3>
              </article>
            ))}
          </div>
          <p className="hnc-v2__trust-footer">
            {HNC_TRUST_FOOTER}
          </p>
          <p className="hnc-v2__trust-cta">
            <Link href="#hnc-cta" className="btn btn--secondary btn--lg">Book Now for a Free Consultation</Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: WHO WE CARE FOR
          ═══════════════════════════════════════════ */}
      <section className="section section--alt" id="hnc-audience">
        <div className="container">
          <div className="section__header">
            <h2>{HNC_AUDIENCE_HEADING}</h2>
            <p>{HNC_AUDIENCE_INTRO}</p>
          </div>
          <div className="hnc-v2__audience-board">
            {[0, 1].map((columnIndex) => (
              <div className="hnc-v2__audience-column" key={columnIndex}>
                {HNC_AUDIENCES.filter((_, index) => index % 2 === columnIndex).map((person) => (
                  <article className="hnc-v2__audience-card" key={person.title}>
                    <div className="hnc-v2__audience-avatar">
                      <Image src={person.image} alt={person.alt} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <h3>{person.title}</h3>
                  </article>
                ))}
              </div>
            ))}
          </div>
          <p className="hnc-v2__audience-footer">
            {HNC_AUDIENCE_FOOTER}
          </p>
          <div className="hnc-v2__audience-cta">
            <Link href="#hnc-cta" className="btn btn--primary btn--lg">Book Now for a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8: DELIVERABLES CATEGORIES
          ═══════════════════════════════════════════ */}
      <section className="section" id="hnc-deliverables">
        <div className="container">
          <div className="section__header">
            <h2>{HNC_DELIVERABLES_HEADING}</h2>
            <p>{HNC_DELIVERABLES_INTRO}</p>
          </div>
          <div className="hnc-v2__deliverables-layout">
            {HNC_DELIVERABLES.map((item, idx) => (
              <article className={`hnc-v2__deliverable-tag hnc-v2__deliverable-tag--${idx + 1}`} key={idx}>
                  <span className="hnc-v2__deliverable-tag-icon" style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <SiteIcon name={item.icon || item.title} size={20} />
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{item.title}</h3>
              </article>
            ))}

            <div className="hnc-v2__deliverables-visual" style={{ position: 'relative', height: '360px', width: '100%' }}>
              <Image src={HNC_DELIVERABLES_IMAGE} alt="Nursing care deliverables" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--hnc-muted)', fontStyle: 'italic', margin: '2rem 0 0 0' }}>
            {HNC_DELIVERABLES_FOOTER}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9: COMPREHENSIVE NURSING
          ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          SECTION 10: ENROLLMENT PROCESS
          ═══════════════════════════════════════════ */}
      <section className={`section ${processStyles.scope}`} id="hnc-enrollment">
        <div className="container">
          <div className="section__header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginInline: 'auto' }}>{HNC_ENROLLMENT_HEADING}</h2>
            <p style={{ maxWidth: '750px', margin: '0.6rem auto 0', textAlign: 'center', color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>{HNC_ENROLLMENT_INTRO}</p>
          </div>
          <div className="hnc-v2__process-flow" aria-label="Narpavi ten-step enrollment process">
            <div className="hnc-v2__process-row hnc-v2__process-row--forward">
              {HNC_ENROLLMENT_STEPS.slice(0, 4).map((step, index) => (
                <div className={`hnc-v2__process-item hnc-v2__process-item--${index < 3 ? 'blue' : 'yellow'}`} key={step.title}>
                  <span className="hnc-v2__process-number">{String(index + 1).padStart(2, '0')}</span>
                  <h4>{step.title}</h4>
                  {index < 3 && <span className="hnc-v2__process-arrow hnc-v2__process-arrow--right" aria-hidden="true" />}
                </div>
              ))}
            </div>

            <div className="hnc-v2__process-down hnc-v2__process-down--right" aria-hidden="true" />

            <div className="hnc-v2__process-row hnc-v2__process-row--reverse">
              {HNC_ENROLLMENT_STEPS.slice(4, 8).reverse().map((step, index) => (
                <div className="hnc-v2__process-item hnc-v2__process-item--yellow" key={step.title}>
                  <span className="hnc-v2__process-number">{String(8 - index).padStart(2, '0')}</span>
                  <h4>{step.title}</h4>
                  {index < 3 && <span className="hnc-v2__process-arrow hnc-v2__process-arrow--left" aria-hidden="true" />}
                </div>
              ))}
            </div>

            <div className="hnc-v2__process-down hnc-v2__process-down--left" aria-hidden="true" />

            <div className="hnc-v2__process-row hnc-v2__process-row--final">
              {HNC_ENROLLMENT_STEPS.slice(8).map((step, index) => (
                <div className="hnc-v2__process-item hnc-v2__process-item--green" key={step.title}>
                  <span className="hnc-v2__process-number">{String(index + 9).padStart(2, '0')}</span>
                  <h4>{step.title}</h4>
                  {index === 0 && <span className="hnc-v2__process-arrow hnc-v2__process-arrow--right" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
          <p className="hnc-v2__process-footer">
            {HNC_ENROLLMENT_FOOTER}
          </p>
          <p className="hnc-v2__process-cta">
            <Link href="#hnc-cta" className="btn btn--secondary btn--lg">Book Your Free Home Nursing Assessment</Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11: STATS
          ═══════════════════════════════════════════ */}
      <section className="section section--alt" id="hnc-stats">
        <div className="container">
          <div className="section__header">
            <h2>Our Performance &amp; Impact</h2>
          </div>
          <div className="hnc-v2__stats-grid">
            {HNC_STATS.map((s, i) => (
              <div key={i} className="hnc-v2__stat-card">
                <span className="hnc-v2__stat-value">{s.value}</span>
                <h4>{s.metric}</h4>
                <p>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 12: CTA WITH SCENARIOS
          ═══════════════════════════════════════════ */}
      <section className="section hnc-v2__testimonials" id="hnc-testimonials">
        <div className="container">
          <div className="section__header">
            <h2>Testimonials 11 - Families &amp; Partners Who Trust Narpavi Homecare</h2>
            <p>{HNC_TESTIMONIAL_INTRO}</p>
          </div>
          <div className="hnc-v2__testimonial-grid">
            {HNC_TESTIMONIALS.map((item) => (
              <article className="hnc-v2__testimonial" key={item.name}>
                <div className="hnc-v2__quote-mark" aria-hidden="true">“</div>
                <p>{item.quote}</p>
                <footer><strong>{item.name}</strong><span>{item.location}</span></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="hnc-cta">
        <div className="container">
          <div className="hnc-v2__cta-split">
            <div className="hnc-v2__cta-scenarios">
              <h3>{HNC_CTA_HEADING}</h3>
              <ul className="hnc-v2__cta-list">
                {HNC_CTA_SCENARIOS.map((s, i) => (
                  <li key={i}>
                    <SiteIcon name="Check" size={18} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <CTAForm title="Book Your Free Consultation" submitLabel="Book Now for Free Consultation" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SHIFT TIMINGS SECTION
          ═══════════════════════════════════════════ */}
      {false && <section className="section" id="hnc-shifts" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section__header" style={{ marginBottom: '2.5rem' }}>
            <h2>Flexible Care Shift Timings</h2>
            <p>We provide home nursing care on flexible shift schedules tailored to the medical needs and comfort of patients and families.</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <article className="hnc-v2__benefit-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '180px' }}>
              <span className="hnc-v2__benefit-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Day shift" size={24} />
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>12-Hour Day Shift</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Usually from 8:00 AM to 8:00 PM. Ideal for daytime rehabilitation, post-surgery recovery, routine medication support, and activity assistance.
              </p>
            </article>

            <article className="hnc-v2__benefit-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '180px' }}>
              <span className="hnc-v2__benefit-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Night shift" size={24} />
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>12-Hour Night Shift</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Usually from 8:00 PM to 8:00 AM. Best for baby care at night, ICU monitoring, respiratory support, and ensuring patient safety while the family rests.
              </p>
            </article>

            <article className="hnc-v2__benefit-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '180px' }}>
              <span className="hnc-v2__benefit-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Schedule" size={24} />
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>24-Hour Continuous Care</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Round-the-clock coverage managed by two rotating 12-hour shifts. Essential for critical ICU-at-home, terminal care, or highly dependent bedridden patients.
              </p>
            </article>

            <article className="hnc-v2__benefit-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '180px' }}>
              <span className="hnc-v2__benefit-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Clinical" size={24} />
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>Timed Procedure Visits</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                1 to 2-hour clinical visits for specific medical procedures such as wound dressings, IV infusions, injections, catheter changes, or Ryle&apos;s tube insertion.
              </p>
            </article>
          </div>
        </div>
      </section>}

      {/* ═══════════════════════════════════════════
          SECTION 13: FAQs
          ═══════════════════════════════════════════ */}
      <section className="section section--alt" id="hnc-faqs">
        <div className="container">
          <div className="section__header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={HNC_FAQS} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA STRIP (SPLIT GRID LAYOUT)
          ═══════════════════════════════════════════ */}
      <section className="section hnc-v2__resources" id="hnc-resources">
        <div className="container">
          <div className="section__header">
            <h2>Blogs - Resources &amp; Learning Hub</h2>
          </div>
          <div className="hnc-v2__resource-grid">
            {HNC_RESOURCES.map((resource, index) => (
              <Link className={`hnc-v2__resource-card${index === 0 ? ' hnc-v2__resource-card--featured' : ''}`} href={resource.href} key={resource.title}>
                <Image src={resource.image} alt={resource.title} fill sizes={index === 0 ? '(max-width: 768px) 100vw, 55vw' : '(max-width: 768px) 100vw, 25vw'} />
                <div className="hnc-v2__resource-shade" />
                <div className="hnc-v2__resource-copy"><span>Read article</span><h3>{resource.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE AREA COVERAGE SECTION
          ═══════════════════════════════════════════ */}
      {false && <section className="section section--alt" id="hnc-service-areas">
        <div className="container">
          <div className="section__header" style={{ marginBottom: '3rem' }}>
            <h2>Service Area Coverage in Chennai</h2>
            <p>Narpavi Homecare provides reliable home nursing and healthcare services across Greater Chennai. We serve families and clinical needs in the following primary regions:</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <article className="hnc-v2__trust-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '160px' }}>
              <span className="hnc-v2__benefit-icon" style={{ alignSelf: 'flex-start', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Location" size={20} />
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>Central Chennai</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Adyar, T. Nagar, Mylapore, Nungambakkam, Alwarpet, Royapettah, Kilpauk, and surrounding areas.
                <br />
                <span style={{ fontSize: '0.82rem', color: 'var(--hnc-teal)', fontWeight: 'bold' }}>Pincodes: 600020, 600017, 600004, 600034, 600018, 600014, 600010</span>
              </p>
            </article>

            <article className="hnc-v2__trust-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '160px' }}>
              <span className="hnc-v2__benefit-icon" style={{ alignSelf: 'flex-start', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Location" size={20} />
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>South Chennai</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Velachery, Tambaram, Thiruvanmiyur, Sholinganallur, ECR, OMR, Perungudi, Medavakkam.
                <br />
                <span style={{ fontSize: '0.82rem', color: 'var(--hnc-teal)', fontWeight: 'bold' }}>Pincodes: 600042, 600045, 600041, 600119, 600096, 600100</span>
              </p>
            </article>

            <article className="hnc-v2__trust-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '160px' }}>
              <span className="hnc-v2__benefit-icon" style={{ alignSelf: 'flex-start', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Location" size={20} />
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>West Chennai</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Porur, Guindy, Vadapalani, Koyambedu, KK Nagar, Ramapuram, Valasaravakkam.
                <br />
                <span style={{ fontSize: '0.82rem', color: 'var(--hnc-teal)', fontWeight: 'bold' }}>Pincodes: 600116, 600032, 600026, 600107, 600078, 600089, 600087</span>
              </p>
            </article>

            <article className="hnc-v2__trust-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '160px' }}>
              <span className="hnc-v2__benefit-icon" style={{ alignSelf: 'flex-start', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SiteIcon name="Location" size={20} />
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--hnc-ink)' }}>North Chennai</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Anna Nagar, Perambur, Sowcarpet, Royapuram, Madhavaram, Tondiarpet.
                <br />
                <span style={{ fontSize: '0.82rem', color: 'var(--hnc-teal)', fontWeight: 'bold' }}>Pincodes: 600040, 600011, 600079, 600013, 600060, 600081</span>
              </p>
            </article>
          </div>
        </div>
      </section>}

      {false && <section className="section" id="hnc-final-cta">
        <div className="container">
          <div className="hnc-v2__cta-split" style={{ background: 'linear-gradient(110deg, #073c4a, #008e92 58%, #4763b8)' }}>
            <div className="hnc-v2__cta-scenarios">
              <h2 style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 900 }}>Ready to Start Safe, Reliable Home Nursing Care?</h2>
              <p style={{ color: '#e0f7f6', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Your recovery or daily care doesn&apos;t need to be complicated. Narpavi Homecare makes it easy to begin safe, personalized Home Nursing Care in Chennai — with trained caregivers, nurse supervision, and real-time updates.
              </p>
              <ul className="hnc-v2__cta-list" style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <li style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SiteIcon name="Check" size={16} /> <span style={{ fontWeight: 600 }}>Fast onboarding</span></li>
                <li style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SiteIcon name="Check" size={16} /> <span style={{ fontWeight: 600 }}>Verified caregivers</span></li>
                <li style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SiteIcon name="Check" size={16} /> <span style={{ fontWeight: 600 }}>24×7 emergency support</span></li>
                <li style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SiteIcon name="Check" size={16} /> <span style={{ fontWeight: 600 }}>Transparent pricing</span></li>
              </ul>
            </div>
            <CTAForm title="Book Your Free Assessment" />
          </div>
        </div>
      </section>}
      </main>
    </>
  );
}
