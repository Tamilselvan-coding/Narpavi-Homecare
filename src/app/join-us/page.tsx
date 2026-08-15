import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CareerPageExperience from '@/components/sections/CareerPageExperience';

export const metadata: Metadata = {
  title: 'Careers at Narpavi Homecare — Healthcare Jobs & Partnerships',
  description:
    'Join Narpavi Homecare as a Nurse, Caregiver, Physiotherapist, Physician, or Resource Partner. Explore 15+ healthcare career opportunities with training, growth, and flexible employment models.',
  keywords: [
    'narpavi homecare careers',
    'nursing jobs chennai',
    'home healthcare jobs',
    'caregiver jobs',
    'physiotherapist jobs chennai',
    'healthcare careers',
    'narpavi jobs',
  ],
  alternates: { canonical: 'https://www.narpavihomecare.com/join-us' },
};

export default function JoinUsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />
      <CareerPageExperience />
    </>
  );
}
