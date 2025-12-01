'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { OrderManager } from '@/components/admin/OrderManager';

export default function AdminOrdersPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <OrderManager />
    </AdminLayout>
  );
}
