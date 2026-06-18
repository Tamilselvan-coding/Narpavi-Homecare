import type { Metadata } from 'next';
import BasicCarePackageLanding from '@/components/sections/BasicCarePackageLanding';
import { getCarePackage } from '@/lib/packages';

const packageData = getCarePackage('caring-hands')!;

export const metadata: Metadata = {
  title: `${packageData.name} Basic Nursing Care - Narpavi Homecare`,
  description: `${packageData.tagline}. ${packageData.summary}`,
  keywords: [
    'caring hands basic nursing care',
    'mobility support at home chennai',
    'basic nursing care package chennai',
    ...packageData.bestFor,
  ],
  alternates: { canonical: `https://www.narpavihomecare.com${packageData.href}` },
};

export default function CaringHandsPage() {
  return <BasicCarePackageLanding packageId="caring-hands" />;
}
