'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ServiceManager } from '@/components/admin/ServiceManager';

export default function AdminServicesPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <ServiceManager />
    </AdminLayout>
  );
}
