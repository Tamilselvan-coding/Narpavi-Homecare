import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'ICU at Home Services — Narpavi Homecare',
  description: 'Critical care ICU setup at home. Professional nurse-supervised management of ventilators, BIPAP, CPAP, tracheostomy and post-ICU recovery.',
  keywords: ['ICU at home chennai', 'critical care home nursing', 'tracheostomy care chennai', 'home ventilator nursing'],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/icu-at-home' },
};

export default function ICUAtHomePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'ICU @ Home' }]} />
      <section className="hero" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="hero__badge"><SiteIcon name="Critical ICU Alert" size={16} /> 24x7 Critical Care Support</div>
              <h1 className="hero__title">
                Professional <span>ICU at Home</span> Services
              </h1>
              <p className="hero__subtitle">
                Hospital-grade critical care, equipment coordination, and specialized nursing support for post-ICU discharged patients.
              </p>
              <div className="hero__cta-group">
                <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
                <Link href="/contact" className="btn btn--primary btn--lg">Book Assessment</Link>
              </div>
            </div>
            <CTAForm title="Book ICU Assessment" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2>Hospital-Grade Critical Care at Home</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Transitioning a critically ill patient from hospital ICU to home requires strict medical protocols, continuous vitals logging, and specialized equipment. Narpavi Homecare coordinates clinical staffing and setups to ensure a safe transition.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { title: 'Ventilator & BiPAP/CPAP Management', desc: 'Monitoring settings, ensuring oxygen flow, masks cleaning, and immediate reporting of deviations.' },
              { title: 'Tracheostomy Care & Suctioning', desc: 'Tracheostomy tube cleaning, safe suctioning to prevent choking, and wound monitoring.' },
              { title: "Enteral (Ryle's Tube) Nutrition", desc: 'Safe tube feed prep, positioning, gravity feeding, and flushing protocols.' },
              { title: 'Emergency Escalation & Backup Protocols', desc: '24x7 nurse on-call supervision, backup equipment coordination, and direct physician links.' },
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
            <h3 style={{ marginBottom: '0.5rem' }}>Setting Up an ICU at Home?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>We coordinate with medical equipment providers and doctors. Contact our team immediately.</p>
            <Link href="/contact" className="btn btn--primary">Get ICU Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
