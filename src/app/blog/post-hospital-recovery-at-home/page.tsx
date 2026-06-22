import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import SiteIcon from '@/components/ui/SiteIcon';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Post-Hospital Recovery at Home â€” How a Caregiver Can Help',
  description: 'Learn how a trained caregiver supports wound care, medication management, mobility and nutrition during post-hospital recovery at home.',
  keywords: ['post hospital recovery at home', 'home recovery care', 'caregiver after hospital', 'home care after hospital discharge'],
  alternates: { canonical: 'https://www.narpavihomecare.com/blog/post-hospital-recovery-at-home' },
};

const TOC_ITEMS = [
  { id: 'caregiver-support-recovery', label: 'How caregivers support recovery' },
  { id: 'benefits-home-recovery', label: 'Benefits of home recovery' },
  { id: 'home-recovery-takeaway', label: 'Key takeaway' },
];

export default function PostHospitalRecovery() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Post-Hospital Recovery at Home' }]} />

      <BlogArticleLayout
        slug="post-hospital-recovery-at-home"
        title="Post-Hospital Recovery at Home â€” How a Caregiver Can Help"
        image="/images/pik-15.png"
        imageAlt="Post hospital recovery care at home"
        readTime="5 min read"
        toc={TOC_ITEMS}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
          Recovering from surgery or illness is often faster and more comfortable at home. A professional caregiver can play a vital role in making recovery smoother.
        </p>

        <h2 id="caregiver-support-recovery" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>How Caregivers Support Recovery</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { title: 'Wound Care & Dressing', desc: 'Helping with wound care and dressing changes as directed by the medical team.' },
            { title: 'Infection Monitoring', desc: 'Monitoring for signs of infection and alerting medical staff promptly.' },
            { title: 'Safe Mobility & Exercises', desc: 'Assisting with safe mobility and prescribed exercises to prevent complications.' },
            { title: 'Medication Management', desc: 'Ensuring medications are taken on time with proper documentation.' },
            { title: 'Nutritious Meal Preparation', desc: 'Preparing nutritious meals to support healing and recovery.' },
            { title: 'Emotional Encouragement', desc: 'Providing emotional encouragement and companionship during recovery.' },
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

        <h2 id="benefits-home-recovery" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Benefits of Home Recovery with a Caregiver</h2>
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {[
            { title: 'Reduced Readmissions', desc: 'Professional monitoring prevents complications that lead to hospital return.' },
            { title: 'Lower Infection Risk', desc: 'Home environment has far fewer pathogens than hospital settings.' },
            { title: 'Personalised Care', desc: 'One-on-one attention tailored to your specific recovery needs.' },
            { title: 'Emotional Comfort', desc: 'Familiar surroundings and family proximity boost mental wellbeing.' },
          ].map((item) => (
            <div key={item.title} className="card text-center">
              <div className="card__icon"><SiteIcon name={item.title} size={30} /></div>
              <h4 style={{ marginBottom: '0.35rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div id="home-recovery-takeaway" style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Key Takeaway</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            With the right caregiver, home becomes the safest and most healing place after a hospital stay.
          </p>
        </div>

        <div className="cta-strip" style={{ borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Planning Post-Hospital Recovery?</h3>
          <p style={{ opacity: 0.9 }}>Book a care assessment and get professional care started within 24-48 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link href="/contact" className="btn btn--white">Book Care Assessment</Link>
            <a href={BRAND.phoneHref} className="btn btn--outline" style={{ color: 'white', borderColor: 'white' }}>Call {BRAND.phone}</a>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
