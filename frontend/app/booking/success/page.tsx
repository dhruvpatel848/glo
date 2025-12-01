'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCalendarAlt, FaFileDownload, FaHome } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId') || 'BK' + Date.now();
  const paymentMethod = searchParams.get('method') || 'online';

  // Clear booking data from sessionStorage on success
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('glocar_booking_data');
    }
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <FaCheckCircle className="text-green-600 text-6xl" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {paymentMethod === 'cod' 
                ? 'Your car service has been successfully booked. Pay cash when our technician arrives.'
                : 'Your payment was successful and your car service has been booked. We\'ve sent a confirmation email with all the details.'}
            </p>
          </motion.div>

          {/* Booking ID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 rounded-xl p-6 mb-8"
          >
            <p className="text-sm text-gray-600 mb-2">Your Booking ID</p>
            <p className="text-3xl font-bold text-blue-600">{bookingId}</p>
            <p className="text-sm text-gray-500 mt-2">
              Please save this ID for future reference
            </p>
            {paymentMethod === 'cod' && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm font-medium text-yellow-800">
                  💰 Payment Method: Cash on Delivery
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Please keep cash ready for payment after service completion
                </p>
              </div>
            )}
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-left mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">Confirmation Email</p>
                  <p className="text-gray-600 text-sm">
                    You'll receive a detailed confirmation email with your booking information.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">Technician Assignment</p>
                  <p className="text-gray-600 text-sm">
                    Our team will assign an expert technician for your service.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">Service Day</p>
                  <p className="text-gray-600 text-sm">
                    Our technician will arrive at your location on the scheduled date and time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="flex-1 flex items-center justify-center space-x-2"
              onClick={() => router.push('/')}
            >
              <FaHome />
              <span>Back to Home</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 flex items-center justify-center space-x-2"
              onClick={() => router.push('/services')}
            >
              <FaCalendarAlt />
              <span>Book Another Service</span>
            </Button>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600 text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:support@glocar.com" className="text-blue-600 hover:underline">
                support@glocar.com
              </a>{' '}
              or call{' '}
              <a href="tel:+911234567890" className="text-blue-600 hover:underline">
                +91 1234567890
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
