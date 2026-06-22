import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import ImageSlider from '@/components/sections/ImageSlider';
import SiteIcon from '@/components/ui/SiteIcon';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import { getServiceSchema, getWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Home Nursing Care Services — Narpavi Homecare',
  description: 'Compassionate, professional home nursing care. From basic patient care & elder care to ICU at home & baby care. Nurse-supervised and background-verified.',
  keywords: ['home nursing care chennai', 'home nurse service', 'elder care chennai', 'icu care at home'],
  alternates: { canonical: '/home-nursing-care' },
};

const NURSING_BANNERS = [
  '/images/pik-4.png',
  '/images/pik-8.png',
  '/images/pik-9.png',
  '/images/pik-12.png',
];

const SERVICES = [
  { label: 'Basic Nursing Care', href: '/basic-nursing-care', desc: 'ADL assistance, vitals checking, and non-clinical recovery care.', icon: '🩺' },
  { label: 'Baby Care', href: '/home-nursing-care/baby-care', desc: 'Neonatal support, baby hygiene, massage, and new mother postpartum care.', icon: '👶' },
  { label: 'Patient Assistant Care', href: '/home-nursing-care/patient-assistant-care', desc: 'Companionship, hygiene help, and daily living assistance for recovering adults.', icon: '👩‍⚕️' },
  { label: 'Advance Nursing Care', href: '/home-nursing-care/advance-nursing-care', desc: 'Injections, IV therapy, wound dressings, and skilled clinical nursing checks.', icon: '💉' },
  { label: 'Specialty Nursing Care', href: '/home-nursing-care/specialty-nursing-care', desc: 'Rehabilitation care for stroke, Parkinson\'s, dementia, and oncological support.', icon: '🧠' },
  { label: 'ICU @ Home', href: '/home-nursing-care/icu-at-home', desc: 'Critical bedside care including ventilator, BiPAP, tracheostomy, and continuous vitals monitoring.', icon: '🚨' },
  { label: 'Elder Care', href: '/elder-care', desc: 'Geriatric daily living assistance, fall prevention, and cognitive companion care.', icon: '👴' },
  { label: 'End of Life Care', href: '/home-nursing-care/end-of-life-care', desc: 'Compassionate palliative care focusing on comfort, pain management, and dignity.', icon: '🕊' },
];

export default function HomeNursingCareHub() {
  const pageSchemas = [
    getWebPageSchema({
      title: 'Home Nursing Care Services',
      description: 'Compassionate, professional home nursing care with service options covering basic care, advanced nursing, elder care, ICU at home, and baby care.',
      path: '/home-nursing-care',
    }),
    getServiceSchema({
      name: 'Home Nursing Care Services',
      description: 'Nurse-supervised home nursing care for recovery, chronic illness support, advanced procedures, and ICU-level home care.',
      path: '/home-nursing-care',
      serviceType: 'Home healthcare service',
    }),
  ];

  return (
    <>
      <StructuredDataScript data={pageSchemas} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care' }]} />

      {/* SECTION 1: Hero Banner with CTA Form */}
      <section className="hero" id="hnc-hero" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div className="hero__content">
              <div className="hero__badge"><SiteIcon name="Nurse-Supervised Home Care" size={16} /> Nurse-Supervised Home Care</div>
              <h1 className="hero__title">
                Professional <span>Home Nursing Care</span>
              </h1>
              <p className="hero__subtitle">
                Comprehensive healthcare services delivered in the safety and comfort of your home. From basic caregiver support to clinical and critical ICU services.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', height: '240px', marginBottom: '2rem' }}>
                <ImageSlider images={NURSING_BANNERS} alt="Home Nursing Care Banners" />
              </div>
              <div className="hero__cta-group">
                <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
                <a href={BRAND.whatsapp} className="btn btn--outline btn--lg" target="_blank" rel="noopener"><SiteIcon name="WhatsApp" size={18} /> WhatsApp Us</a>
              </div>
            </div>
            <CTAForm title="Book Your Care Assessment" />
          </div>
        </div>
      </section>

      {/* SECTION 2: Definition */}
      <section className="section" id="hnc-definition">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2>What is Home Nursing Care?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1.25rem' }}>
            Home Nursing Care brings skilled medical supervision and dedicated caregiving directly to your doorstep. It bridges the gap between hospital discharge and family care, offering customized plans that support recovery, manage chronic conditions, and assist with daily living activities under the oversight of registered nurses and healthcare supervisors.
          </p>
        </div>
      </section>

      {/* SECTION 3: Catalogue - Home Nursing Care Services */}
      <section className="section section--alt" id="hnc-catalogue">
        <div className="container">
          <div className="section__header">
            <h2>Catalogue: Home Nursing Care Services</h2>
            <p>We provide a full spectrum of home healthcare solutions tailored to every recovery stage and clinical requirement.</p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card__icon"><SiteIcon name={s.label} size={34} /></div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{s.label}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>{s.desc}</p>
                <Link href={s.href} className="btn btn--outline btn--sm" style={{ alignSelf: 'flex-start' }}>Learn More <SiteIcon name="Arrow" size={16} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Benefits */}
      <section className="section" id="hnc-benefits">
        <div className="container">
          <div className="section__header">
            <h2>How Home Nursing Care Benefits Families</h2>
            <p>Bringing professional clinical care home offers peace of mind and significantly improves recovery outcomes.</p>
          </div>
          <div className="grid-4">
            {[
              { title: 'Faster Clinical Healing', desc: 'One-on-one attention and personalized care speed up recovery after hospital stays.', icon: '⚡' },
              { title: 'Reduced Infection Risk', desc: 'Staying out of wards reduces exposure to hospital-acquired superbugs.', icon: '🛡' },
              { title: 'NRI Family Security', desc: 'Get daily care logs and WhatsApp updates if you are living outside Chennai.', icon: '🌍' },
              { title: 'Dignity & Comfort', desc: 'Seniors and patients recover in their own bedrooms surrounded by family.', icon: '❤' },
            ].map((b, i) => (
              <div key={i} className="card text-center">
                <div className="card__icon"><SiteIcon name={b.title} size={31} /></div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{b.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: 4 Steps to Choose Right Care Package */}
      <section className="section section--alt" id="hnc-steps">
        <div className="container">
          <div className="section__header">
            <h2>4 Steps to Choose the Right Care Package</h2>
            <p>Evaluate your family&apos;s healthcare needs with these simple guide steps.</p>
          </div>
          <div className="grid-4">
            {[
              { num: '01', title: 'Assess Mobility Needs', desc: 'Is the patient fully mobile, semi-mobile needing assistance, or completely bedbound?' },
              { num: '02', title: 'Define Care Level', desc: 'Identify if you require basic hygiene support (non-clinical) or skilled nursing procedures (clinical).' },
              { num: '03', title: 'Match Shift Timing', desc: 'Decide if you need 12-hour day/night shift coverage or continuous 24-hour live-in support.' },
              { num: '04', title: 'Consult Our Supervisor', desc: 'Schedule a care assessment with our care coordinators to finalise the matching plan.' },
            ].map((step, i) => (
              <div key={i} className="card" style={{ position: 'relative', paddingTop: '2.5rem' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1.5rem', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(10,143,143,0.15)', fontFamily: 'var(--font-display)' }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Enrollment Process */}
      <section className="section" id="hnc-enrollment">
        <div className="container">
          <div className="section__header">
            <h2>Our Enrollment Process</h2>
            <p>We make starting home care quick, seamless, and safe for your family.</p>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { step: '1. Initial Inquiry', desc: 'Call us or fill out our online form. A care coordinator will review your needs.' },
              { step: '2. Clinical Assessment', desc: 'A senior supervisor conducts a virtual or physical assessment to map health parameters.' },
              { step: '3. Care Plan Design', desc: 'We structure a tailored daily care plan mapping vitals, medication, transfers, and feeding.' },
              { step: '4. Caregiver Matching', desc: 'We match a verified, background-screened caregiver matching the specialized profile.' },
              { step: '5. Care Commences', desc: 'Active care begins with supervision checks and daily logs sent to the family via WhatsApp.' },
            ].map((e, i) => (
              <div key={i} className="trust-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div className="trust-card__icon" style={{ width: '40px', height: '40px' }}><SiteIcon name="Check" size={19} /></div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>{e.step}</h4>
                  <p style={{ fontSize: '0.875rem' }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Why Choose Us */}
      <section className="section section--alt" id="hnc-why">
        <div className="container">
          <div className="section__header">
            <h2>Why Choose Narpavi Homecare?</h2>
            <p>Your safety and peace of mind are our absolute priorities.</p>
          </div>
          <div className="trust-grid">
            {[
              { icon: '🛡', title: 'Verified Backgrounds', desc: 'All caregivers undergo police checks, ID verification, and medical testing.' },
              { icon: '🩺', title: 'Nurse Supervision', desc: 'Routine clinical audits by supervising nurses to review client charts.' },
              { icon: '🔄', title: 'Seamless Replacement', desc: 'Quick replacements if a caregiver is sick or if the match isn\'t perfect.' },
              { icon: '📋', title: 'NRI-Friendly Updates', desc: 'Daily vitals log and safety check reports sent directly to family WhatsApp.' },
            ].map((t, i) => (
              <div key={i} className="trust-card">
                <div className="trust-card__icon"><SiteIcon name={t.title} /></div>
                <div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Shift Timings */}
      <section className="section" id="hnc-shifts">
        <div className="container">
          <div className="section__header">
            <h2>Shift Timing & Flexibility</h2>
            <p>Select a scheduling option that fits your recovery structure and lifestyle.</p>
          </div>
          <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="card text-center">
              <div className="card__icon"><SiteIcon name="Day Shift Sun" size={34} /></div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>12-Hour Day Shift</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Ideal for daily assistance, active rehabilitation, and assisting family members when they are at work.</p>
            </div>
            <div className="card text-center">
              <div className="card__icon"><SiteIcon name="Night Shift Moon" size={34} /></div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>12-Hour Night Shift</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Ensures overnight safety, sleep monitoring, restroom transfers, and emergency night support.</p>
            </div>
            <div className="card text-center">
              <div className="card__icon"><SiteIcon name="24-Hour Live-in Home Care" size={34} /></div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>24-Hour Live-in Care</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Round-the-clock clinical or non-clinical supervision for high-dependency or bedbound patients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Service Areas with Pincodes */}
      <section className="section section--light" id="hnc-service-areas" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section__header" style={{ marginBottom: '2rem' }}>
            <h2>Service Coverage</h2>
            <p>Providing trusted home nursing services across Chennai and surrounding suburbs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            {[
              { area: 'Adyar', pin: '600020' },
              { area: 'Velachery', pin: '600042' },
              { area: 'Mylapore', pin: '600004' },
              { area: 'T. Nagar', pin: '600017' },
              { area: 'Anna Nagar', pin: '600040' },
              { area: 'Tambaram', pin: '600045' },
              { area: 'OMR / Thoraipakkam', pin: '600097' },
              { area: 'Porur', pin: '600116' },
              { area: 'Besant Nagar', pin: '600090' },
              { area: 'Alwarpet', pin: '600018' },
              { area: 'Guindy', pin: '600032' },
              { area: 'Nungambakkam', pin: '600034' },
            ].map((loc, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                <span className="location-label"><SiteIcon name="Location" size={15} /> {loc.area}</span>
                <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{loc.pin}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="cta-strip">
        <div className="container">
          <h2>Find the Best Care Plan for Your Loved Ones</h2>
          <p>Book a professional nursing consultation and plan setup within 24-48 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--white btn--lg">Book Assessment Now</Link>
            <a href={BRAND.phoneHref} className="btn btn--outline btn--lg" style={{ color: 'white', borderColor: 'white' }}><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
