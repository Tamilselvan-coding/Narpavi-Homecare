import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Narpavi Homecare',
  description: 'Narpavi Homecare Admin Portal – View leads, package applications, and manage enquiries.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout-root">
      {children}
    </div>
  );
}
