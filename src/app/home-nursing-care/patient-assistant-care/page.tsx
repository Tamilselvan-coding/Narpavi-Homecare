import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Patient Assistant Care Services — Narpavi Homecare',
  description: 'Trained patient assistants and caregivers at home. Safe ADL assistance, companionship, mobility aid, and recovery support for families.',
  keywords: ['patient assistant care chennai', 'home caregiver chennai', 'elderly companion care', 'daily assistant care'],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/patient-assistant-care' },
};

export default function PatientAssistantCarePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'Patient Assistant Care' }]} />
      <section className="hero" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="hero__badge"><SiteIcon name="Companion Care" size={16} /> Compassionate Companion Care</div>
              <h1 className="hero__title">
                Professional <span>Patient Assistant Care</span>
              </h1>
              <p className="hero__subtitle">
                Reliable non-clinical support for activities of daily living (ADLs), ensuring safety, comfort, and companionship.
              </p>
              <div className="hero__cta-group">
                <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
                <Link href="/contact" className="btn btn--primary btn--lg">Book Assessment</Link>
              </div>
            </div>
            <CTAForm title="Book Assistant Assessment" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2>Daily Living Support & Companionship</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Our patient assistant care is tailored for individuals who do not require clinical procedures but need dependable, compassionate help with daily routines. Ideal for seniors living alone, stroke survivors during rehabilitation, or adults recovering from orthopedic issues.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { title: 'Personal Grooming & Hygiene Assistance', desc: 'Help with safe bathing, dressing, dental care, toileting, and incontinent care.' },
              { title: 'Nutrition Support & Meal Serving', desc: 'Preparing light, healthy meals, feeding support, and hydration checks.' },
              { title: 'Safe Mobility & Transfers', desc: 'Assisting in moving from bed to chair, safe walking inside the house, and fall prevention.' },
              { title: 'Companionship & Cognitive Engagement', desc: 'Active conversation, reading assistance, walking companion, and social engagement.' },
            ].map((item, i) => (
              <div key={i} className="trust-card">
                <div className="trust-card__icon"><SiteIcon name={item.title} /></div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--primary-light)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Need a Patient Assistant?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Our caregivers are background-checked and supervised. Get care started within 24-48 hours.</p>
            <Link href="/contact" className="btn btn--primary">Book Care Assessment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
