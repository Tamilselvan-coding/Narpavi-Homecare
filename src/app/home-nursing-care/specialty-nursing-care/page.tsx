import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Specialty Nursing Care Services — Narpavi Homecare',
  description: 'Specialized home nursing for chronic conditions. Expert care for stroke recovery, cancer care, dementia, and cardiac support.',
  keywords: ['specialty nursing care chennai', 'stroke rehab home care', 'dementia care chennai', 'home oncology care'],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/specialty-nursing-care' },
};

export default function SpecialtyNursingCarePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'Specialty Nursing Care' }]} />
      <section className="hero" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="hero__badge"><SiteIcon name="Neurological Specialty Care" size={16} /> Chronic & Neurological Rehabilitation</div>
              <h1 className="hero__title">
                Condition-Specific <span>Specialty Care</span>
              </h1>
              <p className="hero__subtitle">
                Expert, continuous care customized for Parkinson&apos;s, dementia support, post-stroke recovery, and cancer therapy assistance at home.
              </p>
              <div className="hero__cta-group">
                <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
                <Link href="/contact" className="btn btn--primary btn--lg">Book Assessment</Link>
              </div>
            </div>
            <CTAForm title="Book Specialty Care Assessment" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2>Targeted Specialty Healthcare at Home</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Chronic conditions demand constant vigilance and specialized care plans. Narpavi Homecare provides specialty caregivers trained specifically in managing neurological challenges, post-cancer support, and progressive physical limitations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { title: 'Post-Stroke Rehabilitation Support', desc: 'Mobility support, range-of-motion exercises, speech therapy encouragement, and safe transfer methods.' },
              { title: "Dementia & Alzheimer's Companion Care", desc: 'Cognitive engagement, safe wandering protocols, structured routines, and anxiety management techniques.' },
              { title: 'Oncology Care & Comfort Support', desc: 'Nutrition monitoring, hydration support, management of chemotherapy weakness, and compassionate presence.' },
              { title: 'Cardiac Care & Monitoring', desc: 'Daily BP tracking, oxygen logging, medication schedules, and low-sodium meal monitoring.' },
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
            <h3 style={{ marginBottom: '0.5rem' }}>Need Specialty Recovery Support?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Let our clinical supervisors design a custom home plan suited to your condition.</p>
            <Link href="/contact" className="btn btn--primary">Request Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
