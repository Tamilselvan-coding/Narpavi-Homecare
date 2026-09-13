'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('narpavi_admin_session');
      if (session) {
        try {
          const role = JSON.parse(session).role;
          router.push(role === 'ADMIN' || role === 'MANAGER' ? '/admin/dashboard' : '/sales/dashboard');
        } catch {
          router.push('/sales/dashboard');
        }
      } else {
        router.push('/admin/login');
      }
    }
  }, [router]);

  return null;
}
