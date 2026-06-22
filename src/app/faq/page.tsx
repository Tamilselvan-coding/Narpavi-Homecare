import type { Metadata } from 'next';
import { FAQS } from '@/lib/faqs';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FAQAccordion from '@/components/sections/FAQAccordion';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQs — Basic Nursing Care at Home',
  description: 'Get answers about home nursing care. What is included, caregiver training, pricing, shift options and more.',
  alternates: { canonical: 'https://www.narpavihomecare.com/faq' },
};

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <section className="section" id="faq-page" style={{ marginTop: 0 }}>
        <div className="container">
          <div className="section__header">
            <h1>Frequently Asked Questions</h1>
            <p>Everything you need to know about Basic Nursing Care at Home from Narpavi Homecare, Chennai.</p>
          </div>
          <FAQAccordion faqs={FAQS} />
          <div className="text-center mt-4">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Still have questions? We are happy to help.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn--primary">Book Care Assessment</Link>
              <a href={BRAND.phoneHref} className="btn btn--outline">Call {BRAND.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}