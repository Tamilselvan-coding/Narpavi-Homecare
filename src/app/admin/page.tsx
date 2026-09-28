'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession } from '@/lib/adminSession';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = getAdminSession();
      if (session) {
        const role = session.role;
        router.push(role === 'ADMIN' || role === 'MANAGER' ? '/admin/dashboard' : '/sales/dashboard');
      } else {
        router.push('/admin/login');
      }
    }
  }, [router]);

  return null;
}
