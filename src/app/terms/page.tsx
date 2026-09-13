import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service — Narpavi Homecare',
  alternates: { canonical: 'https://www.nhlcare.com/terms' },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
      <section className="section" style={{ marginTop: 0 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '1.5rem' }}>Terms of Service</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Welcome to Narpavi Homecare. By scheduling care assessments, renting medical equipment, or hiring caregivers, you agree to these service terms.
          </p>
          <h3 style={{ margin: '1.5rem 0 0.75rem' }}>1. Non-Clinical Assistance Scope</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
            Our Basic Nursing Care plans provide non-clinical support (ADLs, companion checks, vitals logging). Our caregivers do not perform invasive clinical tasks unless specifically upgraded to Advanced clinical nursing.
          </p>
          <h3 style={{ margin: '1.5rem 0 0.75rem' }}>2. Caregiver Replacement</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
            We maintain a strict replacement guarantee. If a caregiver is not matching expectations, we will provide a replacement within 24-48 hours.
          </p>
        </div>
      </section>
    </>
  );
}