import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import SiteIcon from '@/components/ui/SiteIcon';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What Does a Basic Nursing Care Caregiver Do? A Complete Guide for Families',
  description: 'A complete guide explaining the roles, responsibilities and benefits of hiring a Basic Nursing Care caregiver for your family.',
  keywords: ['patient care assistant', 'basic nursing care caregiver', 'home caregiver duties', 'BNC caregiver roles'],
  alternates: { canonical: 'https://www.narpavihomecare.com/blog/what-does-a-basic-nursing-care-caregiver-do' },
};

const TOC_ITEMS = [
  { id: 'main-roles-bnc', label: 'Main roles of a BNC caregiver' },
  { id: 'benefits-bnc', label: 'Benefits of hiring a BNC caregiver' },
  { id: 'bnc-takeaway', label: 'Key takeaway' },
];

export default function CaregiverGuide() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'What Does a BNC Caregiver Do?' }]} />

      <BlogArticleLayout
        slug="what-does-a-basic-nursing-care-caregiver-do"
        title="What Does a Basic Nursing Care Caregiver Do? A Complete Guide for Families"
        image="/images/pik-13.jpeg"
        imageAlt="Basic nursing care caregiver guide"
        readTime="5 min read"
        toc={TOC_ITEMS}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
          When a loved one needs extra support at home, a Basic Nursing Care caregiver can make all the difference. But what exactly does a BNC caregiver do, and how can they help your family?
        </p>

        <h2 id="main-roles-bnc" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Main Roles of a BNC Caregiver</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { title: 'Daily Living Activities', desc: 'Assistance with bathing, grooming, and feeding while maintaining personal hygiene and dignity.' },
            { title: 'Mobility Support', desc: 'Helping patients walk, use wheelchairs, or move in bed safely to prevent falls and injuries.' },
            { title: 'Medication Reminders', desc: 'Ensuring patients take medicines on time with proper tracking and documentation.' },
            { title: 'Companionship', desc: 'Providing emotional support, conversation, and engagement to reduce loneliness and anxiety.' },
            { title: 'Health Monitoring', desc: 'Checking vital signs such as temperature, BP, pulse, and SpO2 and reporting any concerns promptly.' },
            { title: 'Specialised Care', desc: 'Tailored support for dementia patients, bedridden individuals, or those recovering from surgery.' },
          ].map((item) => (
            <div key={item.title} className="trust-card">
              <div className="trust-card__icon"><SiteIcon name={item.title} /></div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 id="benefits-bnc" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Benefits of Hiring a BNC Caregiver</h2>
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {[
            { title: 'Familiar Surroundings', desc: 'Patients recover better in their own home environment.' },
            { title: 'Family Stress Relief', desc: 'Reduces the caregiving burden on family members.' },
            { title: 'Professional Care', desc: 'Consistent, trained care following healthcare standards.' },
            { title: 'Safety & Comfort', desc: 'Improves patient safety with fall prevention and hygiene.' },
          ].map((item) => (
            <div key={item.title} className="card text-center">
              <div className="card__icon"><SiteIcon name={item.title} size={30} /></div>
              <h4 style={{ marginBottom: '0.35rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div id="bnc-takeaway" style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Key Takeaway</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            A BNC caregiver bridges the gap between family care and medical attention, offering compassion, safety, and dignity for your loved ones.
          </p>
        </div>

        <div className="cta-strip" style={{ borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Need a Professional Caregiver at Home?</h3>
          <p style={{ opacity: 0.9 }}>Book a care assessment and get matched with a trained caregiver within 24-48 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link href="/contact" className="btn btn--white">Book Care Assessment</Link>
            <a href={BRAND.phoneHref} className="btn btn--outline" style={{ color: 'white', borderColor: 'white' }}>Call {BRAND.phone}</a>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
