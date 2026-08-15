'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActions from '@/components/layout/FloatingActions';
import PageLoader from '@/components/layout/PageLoader';
import ScrollEnhancements from '@/components/layout/ScrollEnhancements';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <PageLoader />
        {children}
      </main>
      <Footer />
      <ScrollEnhancements />
      <FloatingActions />
    </>
  );
}
