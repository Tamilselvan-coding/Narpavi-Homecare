import type { Metadata } from 'next';
import BasicCarePackageLanding from '@/components/sections/BasicCarePackageLanding';
import { getCarePackage } from '@/lib/packages';

const packageData = getCarePackage('active-assist')!;

export const metadata: Metadata = {
  title: `${packageData.name} Basic Nursing Care - Narpavi Homecare`,
  description: `${packageData.tagline}. ${packageData.summary}`,
  keywords: [
    'active assist basic nursing care',
    'post surgery care at home chennai',
    'basic nursing care package chennai',
    ...packageData.bestFor,
  ],
  alternates: { canonical: `https://www.narpavihomecare.com${packageData.href}` },
};

export default function ActiveAssistPage() {
  return <BasicCarePackageLanding packageId="active-assist" />;
}
