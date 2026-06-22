import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'End of Life Care Services — Narpavi Homecare',
  description: 'Compassionate hospice and end-of-life care at home. We provide palliative comfort, bedside care, pain support and dignity-first family assistance.',
  keywords: ['end of life care chennai', 'hospice care at home', 'palliative home care', 'comfort care seniors'],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/end-of-life-care' },
};

export default function EndOfLifeCarePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'End of Life Care' }]} />
      <section className="hero" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="hero__badge"><SiteIcon name="Palliative Dignity Care" size={16} /> Dignity-First Comfort Care</div>
              <h1 className="hero__title">
                Compassionate <span>End of Life Care</span> at Home
              </h1>
              <p className="hero__subtitle">
                Dedicated non-clinical comfort care and hospice presence to ensure peace, respect, and dignity for your loved ones at home.
              </p>
              <div className="hero__cta-group">
                <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
                <Link href="/contact" className="btn btn--primary btn--lg">Book Assessment</Link>
              </div>
            </div>
            <CTAForm title="Book Comfort Assessment" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2>Respectful Hospice & Palliative Presence</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            During the final stages of a progressive illness, the primary objective is pain relief, dignity, and family closeness. Our comfort care program supports bedridden individuals with meticulous bedside care, hygiene, nutrition support, and constant emotional companion presence.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { title: 'Gentle Bedside Hygiene & Care', desc: 'Bed bathing, skin hydration, repositioning to prevent bed sores, and comfort positioning.' },
              { title: 'Compassionate Presence & Companionship', desc: 'A soothing, quiet presence to minimize isolation, fear, and anxiety.' },
              { title: 'Hydration & Nutritional Comfort', desc: 'Assisting with fluid intake, serving soft pureed comfort food, and light feeding.' },
              { title: 'Family Counseling Link & Support', desc: 'Assisting family members in managing the schedule, offering relief, and coordination.' },
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
            <h3 style={{ marginBottom: '0.5rem' }}>Arrange Comfort Care?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Our Comfort Plus plan is optimized for end-of-life care. Contact our nurse coordinator.</p>
            <Link href="/contact" className="btn btn--primary">Get Comfort Assessment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
