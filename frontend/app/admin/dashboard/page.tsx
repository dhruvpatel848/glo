'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Dashboard } from '@/components/admin/Dashboard';

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}
