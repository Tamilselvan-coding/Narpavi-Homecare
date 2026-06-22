import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'How to Choose the Right Basic Nursing Care Plan — Narpavi Homecare',
  description: 'A complete family guide to choosing home care plans. Assess mobility, clinical needs, budget, and caregiver training in 6 steps.',
  alternates: { canonical: 'https://www.narpavihomecare.com/resources/how-to-choose-nursing-care-plan' },
};

export default function HowToChoosePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/blog' }, { label: 'How to Choose' }]} />
      <section className="section" style={{ marginTop: 0 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Educational Guide</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>How to Choose the Right Basic Nursing Care Plan</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>A Complete Family Guide for Choosing Safe Home Care Services</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem', alignItems: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.9' }}>
              Finding the right Basic Nursing Care service can be overwhelming — especially if you are arranging help for the first time or managing care from abroad. This guide will help you evaluate your loved one&apos;s needs, compare care plans, and choose a reliable service.
            </p>
            <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <Image src="/images/pik-11.png" alt="How to Choose the Right Basic Nursing Care Plan" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginTop: '2rem', marginBottom: '3rem' }}>
            {[
              {
                step: 'Step 1',
                title: 'Understand What Basic Nursing Care Includes',
                body: 'Basic Nursing Care focuses on non-medical, daily living support (ADLs) such as safe bathing, grooming, dressing, light meal preparation, medication reminders, companionship, and daily vitals checks (BP, temp, oxygen). Note: If your loved one needs IV infusions, wound dressing, tracheostomy care, or tube feeding, you should upgrade to Advanced or Specialty Care.'
              },
              {
                step: 'Step 2',
                title: 'Assess Mobility & Independence',
                body: "Evaluate the senior's mobility level. Independent but weak seniors benefit from Active Assist. Semi-independent seniors who need routine reminders fit Guided Living. Those with limited mobility needing transfers require Caring Hands, while bedridden individuals require Comfort Plus."
              },
              {
                step: 'Step 3',
                title: 'Consider Home Environment & Safety',
                body: 'Is your home fall-proof? Remove loose rugs, ensure good lighting in hallways, and place non-slip mats in bathrooms. Ensure the bed is at an accessible height for transfers. We assist families in making these home modifications.'
              },
              {
                step: 'Step 4',
                title: 'Check Caregiver Training & Verification',
                body: 'Always verify if caregivers have undergone police checks, medical screening, and are trained in WHO hygiene protocols and emergency response. Providers like Narpavi ensure all caregivers are strictly background-verified.'
              },
              {
                step: 'Step 5',
                title: 'Look for Transparency & Communication',
                body: 'For busy families or NRIs, daily care logs are essential. Choose a provider that sends regular logs and WhatsApp updates, and has a clear escalation protocol if vitals change.'
              },
              {
                step: 'Step 6',
                title: 'Balance Cost & Value',
                body: 'Compare packages and timings. Home care is significantly more affordable than hospital stays. Choose a plan that covers the necessary care window (hourly, 12-hour, or live-in) without extra clinical cost burdens.'
              }
            ].map((step, index) => (
              <div key={index} style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '1.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>{step.step}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.25rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>{step.body}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--primary-light)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Get Professional Advice</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>Book a professional nursing assessment to get a personalized home care design.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn--primary">Book Care Assessment</Link>
              <a href={BRAND.phoneHref} className="btn btn--outline">Call Us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
