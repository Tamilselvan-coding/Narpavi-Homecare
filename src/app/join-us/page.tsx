import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import JoinUsExperience from '@/components/sections/JoinUsExperience';

export const metadata: Metadata = {
  title: 'Join Narpavi Homecare — Partner or Candidate',
  description:
    'Partner with Narpavi Homecare or apply for caregiver and nursing opportunities. Choose the right path and submit your details.',
  alternates: { canonical: 'https://www.narpavihomecare.com/join-us' },
};

export default function JoinUsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Join Us' }]} />
      <JoinUsExperience />
    </>
  );
}
