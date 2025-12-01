'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { LocationManager } from '@/components/admin/LocationManager';

export default function AdminLocationsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <LocationManager />
    </AdminLayout>
  );
}
