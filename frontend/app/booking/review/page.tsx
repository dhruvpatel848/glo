'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaCar, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/hooks/useBooking';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function BookingReviewPage() {
  const router = useRouter();
  const { bookingData, isLoading: hookLoading } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      // Wait for the hook to finish loading
      if (hookLoading) {
        return;
      }
      
      // Check if we have booking data
      if (!bookingData.customerName) {
        router.push('/booking');
        return;
      }

      // Fetch service details if serviceId exists
      if (bookingData.serviceId) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${bookingData.serviceId}`);
          const data = await response.json();
          if (data.success) {
            setService(data.service);
          }
        } catch (error) {
          console.error('Failed to fetch service:', error);
        }
      }
      
      setIsPageLoading(false);
    };

    loadData();
  }, [hookLoading, bookingData.customerName, bookingData.serviceId, router]);

  const total = service?.basePrice || 0;

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      router.push('/booking/payment');
    }, 1000);
  };

  const handleEditStep = (step: number) => {
    // Store the step to return to in sessionStorage
    sessionStorage.setItem('booking_edit_step', step.toString());
    router.push('/booking');
  };

  if (hookLoading || isPageLoading) {
    return (
      <main className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </main>
    );
  }

  if (!bookingData.customerName) {
    return null;
  }

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal animation="fadeInUp" className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Review Your Booking
            </h1>
            <p className="text-xl text-gray-600">
              Please review your booking details before proceeding to payment.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaUser size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                  </div>
                  <button
                    onClick={() => handleEditStep(1)}
                    className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Name:</span> {bookingData.customerName}</p>
                  <p><span className="font-medium">Email:</span> {bookingData.customerEmail}</p>
                  <p><span className="font-medium">Phone:</span> {bookingData.customerPhone}</p>
                </div>
              </motion.div>

              {/* Car Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaCar size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Car Details</h2>
                  </div>
                  <button
                    onClick={() => handleEditStep(2)}
                    className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Brand:</span> {bookingData.carBrand}</p>
                  <p><span className="font-medium">Model:</span> {bookingData.carModel}</p>
                  <p><span className="font-medium">Registration:</span> {bookingData.carNumber}</p>
                </div>
              </motion.div>

              {/* Service & Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaCalendarAlt size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Service & Schedule</h2>
                  </div>
                  <button
                    onClick={() => handleEditStep(3)}
                    className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Service:</span> {service?.name}</p>
                  <p><span className="font-medium">Date:</span> {new Date(bookingData.preferredDate || '').toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {bookingData.preferredTime}</p>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaMapMarkerAlt size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Service Address</h2>
                  </div>
                  <button
                    onClick={() => handleEditStep(4)}
                    className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="text-gray-700">
                  <p>{bookingData.address}</p>
                  <p>{bookingData.city}, {bookingData.pinCode}</p>
                </div>
              </motion.div>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Price Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Service Charge</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleProceedToPayment}
                  isLoading={isProcessing}
                >
                  Proceed to Payment
                </Button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FaCheckCircle className="text-green-500" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FaCheckCircle className="text-green-500" />
                    <span>100% satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FaCheckCircle className="text-green-500" />
                    <span>Expert technicians</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
