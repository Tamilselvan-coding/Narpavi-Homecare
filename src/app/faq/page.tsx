import type { Metadata } from 'next';
import { FAQS } from '@/lib/faqs';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FAQExperience from '@/components/sections/FAQExperience';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — Home Healthcare & Nursing Care | Narpavi',
  description: 'Everything you need to know about Basic Nursing Care, caregiver verification, pricing, shift options and clinical supervision from Narpavi Homecare in Chennai.',
  alternates: { canonical: 'https://www.nhlcare.com/faq' },
};

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <FAQExperience faqs={FAQS} />
    </>
  );
}