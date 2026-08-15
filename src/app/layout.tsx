import type { Metadata } from 'next';
import './globals.css';
import LayoutShell from '@/components/layout/LayoutShell';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import { BRAND } from '@/lib/constants';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: 'Narpavi Homecare | Professional Home Healthcare Services',
    template: '%s | Narpavi Homecare',
  },
  description: 'Trusted home healthcare. Nurse-supervised basic nursing care, post-surgery recovery, palliative care & caregiver services.',
  keywords: ['home healthcare chennai', 'nursing care at home', 'basic nursing care', 'home caregiver chennai', 'post surgery care at home'],
  authors: [{ name: 'Narpavi Homecare' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.narpavihomecare.com',
    siteName: 'Narpavi Homecare',
    title: 'Narpavi Homecare — Professional Home Healthcare Services',
    description: 'Trusted home healthcare. Nurse-supervised basic nursing care services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narpavi Homecare — Professional Home Healthcare',
    description: 'Trusted home healthcare. Nurse-supervised basic nursing care services.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

const GLOBAL_SCHEMAS = [
  getOrganizationSchema(),
  getLocalBusinessSchema(),
  getWebSiteSchema(),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredDataScript data={GLOBAL_SCHEMAS} />
      </head>
      <body suppressHydrationWarning>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
