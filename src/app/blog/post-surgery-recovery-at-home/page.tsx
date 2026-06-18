import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import SiteIcon from '@/components/ui/SiteIcon';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Post-Surgery Recovery for Adults at Home â€” Safety & Comfort Tips',
  description: 'Essential tips for safe post-surgery recovery at home. ADLs, safe mobility, vital checks and home modifications for adults recovering from surgery.',
  keywords: ['post surgery recovery at home', 'caregiver after surgery', 'surgery recovery tips', 'home recovery after surgery chennai'],
  alternates: { canonical: 'https://www.narpavihomecare.com/blog/post-surgery-recovery-at-home' },
};

const TOC_ITEMS = [
  { id: 'why-home-recovery-works', label: 'Why home recovery works' },
  { id: 'core-support-after-surgery', label: 'Core support after surgery' },
  { id: 'choose-care-plan', label: 'Choosing the right care plan' },
  { id: 'prepare-home-recovery', label: 'Preparing your home for recovery' },
  { id: 'why-families-trust-narpavi', label: 'Why families trust Narpavi' },
];

export default function PostSurgeryRecovery() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Post-Surgery Recovery at Home' }]} />

      <BlogArticleLayout
        slug="post-surgery-recovery-at-home"
        title="Post-Surgery Recovery for Adults at Home â€” Safety & Comfort Tips"
        image="/images/pik-12.png"
        imageAlt="Post surgery recovery care at home"
        readTime="7 min read"
        toc={TOC_ITEMS}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
          Recovering after surgery doesn&apos;t have to mean a long hospital stay. With the right Basic Nursing Care at home, you can heal faster, reduce infection risk, and stay comfortable while your family stays stress-free.
        </p>

        <h2 id="why-home-recovery-works" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Why Home Recovery Works for Many Adults Under 50</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
          Hospitals are ideal for acute treatment, but staying there longer than needed can be expensive and expose you to hospital-acquired infections. For most post-operative cases such as orthopedic, laparoscopic, hernia, sports injury, and gynecological procedures, safe recovery is possible at home with the right daily support.
        </p>

        <h2 id="core-support-after-surgery" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Core Support You May Need After Surgery</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { title: 'Activities of Daily Living (ADLs)', desc: 'Help with bathing, grooming, dressing, and light mobility.' },
            { title: 'Safe Mobility & Transfers', desc: 'Assistance with getting in and out of bed, using the bathroom, and short supervised walks to avoid falls.' },
            { title: 'Nutrition & Hydration Support', desc: 'Light meal prep, serving, and monitoring food intake for strength and healing.' },
            { title: 'Basic Vital Checks', desc: 'Temperature, blood pressure, pulse, and oxygen level monitoring to spot early complications.' },
            { title: 'Medication Reminders', desc: 'Keeping track of your prescription schedule without administering injections.' },
            { title: 'Hygiene & Environment Safety', desc: 'Maintaining a clean, clutter-free space and preventing slip or fall hazards.' },
            { title: 'Emotional Support & Companionship', desc: 'Someone reliable to encourage you and keep you from feeling isolated.' },
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

        <h2 id="choose-care-plan" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Choosing the Right Basic Nursing Care Plan</h2>
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <h4 style={{ color: '#0CB3B3', marginBottom: '0.5rem' }}>Active Assist</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Independent but weak? Light support for faster recovery.</p>
          </div>
          <div className="card">
            <h4 style={{ color: '#0A8F8F', marginBottom: '0.5rem' }}>Guided Living</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Need more routine help and reminders? Structured daily support.</p>
          </div>
          <div className="card">
            <h4 style={{ color: '#0A8F8F', marginBottom: '0.5rem' }}>Caring Hands</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mobility is severely limited? Full ADL and transfer support.</p>
          </div>
          <div className="card">
            <h4 style={{ color: '#FF6B35', marginBottom: '0.5rem' }}>Comfort Plus</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Bedridden but no clinical needs? Complete bedside care.</p>
          </div>
        </div>

        <div style={{ background: 'var(--accent-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--accent)' }}>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <strong>Note:</strong> If you require IV therapy, wound dressing, tracheostomy, or feeding tube care, consider upgrading to Advanced or Specialty Care.
          </p>
        </div>

        <h2 id="prepare-home-recovery" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Preparing Your Home for Recovery</h2>
        <ul style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '2', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li style={{ listStyle: 'disc' }}>Clear clutter and create wide walkways for safe movement.</li>
          <li style={{ listStyle: 'disc' }}>Place non-slip mats in bathrooms.</li>
          <li style={{ listStyle: 'disc' }}>Keep essentials like water, medicines, and phone within reach.</li>
          <li style={{ listStyle: 'disc' }}>Ensure good lighting in hallways and bedrooms.</li>
          <li style={{ listStyle: 'disc' }}>Prepare a comfortable rest area with easy access to the bathroom.</li>
        </ul>

        <h2 id="why-families-trust-narpavi" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Why Families Trust Narpavi Homecare</h2>
        <ul style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '2', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li style={{ listStyle: 'disc' }}>Verified and trained caregivers under doctor and nurse supervision.</li>
          <li style={{ listStyle: 'disc' }}>Customized recovery plans based on surgery type and mobility level.</li>
          <li style={{ listStyle: 'disc' }}>Daily logs and WhatsApp updates for families, including NRIs.</li>
          <li style={{ listStyle: 'disc' }}>24x7 emergency escalation if health changes unexpectedly.</li>
        </ul>

        <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Final Takeaway</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Post-surgery recovery at home can be safe, affordable, and comfortable with the right caregiver support. Narpavi Homecare&apos;s Basic Nursing Care Services from Active Assist to Comfort Plus are designed to keep you safe, independent, and on the path to full recovery.
          </p>
        </div>

        <div className="cta-strip" style={{ borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Planning Post-Surgery Recovery at Home?</h3>
          <p style={{ opacity: 0.9 }}>Call {BRAND.phone} or request a free care assessment today to plan your post-surgery care at home.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link href="/contact" className="btn btn--white">Book Free Assessment</Link>
            <a href={BRAND.phoneHref} className="btn btn--outline" style={{ color: 'white', borderColor: 'white' }}>Call {BRAND.phone}</a>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
