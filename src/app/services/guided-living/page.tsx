import type { Metadata } from 'next';
import BasicCarePackageLanding from '@/components/sections/BasicCarePackageLanding';
import { getCarePackage } from '@/lib/packages';

const packageData = getCarePackage('guided-living')!;

export const metadata: Metadata = {
  title: `${packageData.name} Basic Nursing Care - Narpavi Homecare`,
  description: `${packageData.tagline}. ${packageData.summary}`,
  keywords: [
    'guided living basic nursing care',
    'chronic illness home care chennai',
    'basic nursing care package chennai',
    ...packageData.bestFor,
  ],
  alternates: { canonical: `https://www.narpavihomecare.com${packageData.href}` },
};

export default function GuidedLivingPage() {
  return <BasicCarePackageLanding packageId="guided-living" />;
}
