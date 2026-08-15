'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('narpavi_admin_session');
      if (session) {
        router.push('/sales/dashboard');
      } else {
        router.push('/admin/login');
      }
    }
  }, [router]);

  return null;
}
