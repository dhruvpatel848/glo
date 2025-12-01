'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookingForm } from '@/components/forms/BookingForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeInUp" className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your Service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill in the details below to schedule your car service. We'll take care of the rest!
            </p>
          </ScrollReveal>

          <BookingForm preSelectedServiceId={serviceId || undefined} />
        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
