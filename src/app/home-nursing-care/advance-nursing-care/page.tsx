import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Advance Nursing Care Services — Narpavi Homecare',
  description: 'Clinical home nursing services. Doctor-overseen advanced care including IV infusions, wound dressing, post-op injections and catheterization.',
  keywords: ['advance nursing care chennai', 'home clinical nurse', 'IV infusion at home', 'catheter care at home'],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/advance-nursing-care' },
};

export default function AdvanceNursingCarePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'Advance Nursing Care' }]} />
      <section className="hero" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="hero__badge"><SiteIcon name="Advanced Clinical Nursing" size={16} /> Professional Clinical Nursing</div>
              <h1 className="hero__title">
                Clinical <span>Advance Nursing Care</span> at Home
              </h1>
              <p className="hero__subtitle">
                Qualified, registered home nurses providing specialized clinical procedures and post-operative management under doctor oversight.
              </p>
              <div className="hero__cta-group">
                <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
                <Link href="/contact" className="btn btn--primary btn--lg">Book Assessment</Link>
              </div>
            </div>
            <CTAForm title="Book Clinical Assessment" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2>Specialized Clinical Home Nursing</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            When medical conditions require clinical procedures, general caregiver assistance is not enough. Our Advanced Nursing Care program delivers skilled nursing interventions at your doorstep, reducing hospital stays and risk of readmission.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { title: 'Intravenous (IV) Infusion & Injections', desc: 'Safe administration of prescribed IV fluids, clinical antibiotics, and sub-cutaneous/IM injections.' },
              { title: 'Complex Wound Care & Post-Op Dressing', desc: 'Infection control-oriented surgical wound cleaning, stitch removal, and specialized dressing.' },
              { title: "Catheterization & Ryle's Tube Management", desc: 'Insertion, monitoring, cleaning, and replacement of urinary catheters and nasogastric feeding tubes.' },
              { title: 'Vitals Logging & Doctor Escalation', desc: 'Continuous clinical vitals monitoring, blood sugar checks, and direct escalation to treating physicians.' },
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
            <h3 style={{ marginBottom: '0.5rem' }}>Need Advanced Clinical Care?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Our nursing care plans are supervised by experienced clinicians. Book an assessment today.</p>
            <Link href="/contact" className="btn btn--primary">Get Assessment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
