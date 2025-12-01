'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock, FaShieldAlt, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/hooks/useBooking';
import { usePayment } from '@/hooks/usePayment';

type PaymentMethod = 'online' | 'cod';

export default function PaymentPage() {
  const router = useRouter();
  const { bookingData, isLoading: hookLoading } = useBooking();
  const { initializePayment, isProcessing, error } = usePayment();
  const [bookingId] = useState('BK' + Date.now().toString(36).toUpperCase());
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
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

  const handleCODPayment = async () => {
    setIsConfirming(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/cod`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            name: bookingData.customerName,
            email: bookingData.customerEmail,
            phone: bookingData.customerPhone,
          },
          car: {
            brand: bookingData.carBrand,
            model: bookingData.carModel,
            registrationNumber: bookingData.carNumber,
          },
          service: {
            serviceId: bookingData.serviceId,
            name: service?.name,
          },
          schedule: {
            preferredDate: bookingData.preferredDate,
            preferredTime: bookingData.preferredTime,
          },
          address: {
            street: bookingData.address,
            city: bookingData.city,
            pinCode: bookingData.pinCode,
          },
          payment: {
            method: 'cod',
            amount: total,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/booking/success?bookingId=${data.booking._id}&method=cod`);
      } else {
        throw new Error(data.message || 'Failed to create booking');
      }
    } catch (error: any) {
      console.error('COD booking error:', error);
      alert(error.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleOnlinePayment = () => {
    if (!bookingData.customerName || !bookingData.customerEmail || !bookingData.customerPhone) {
      return;
    }

    initializePayment({
      amount: total,
      bookingId,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      onSuccess: (response) => {
        console.log('Payment successful:', response);
        router.push(`/booking/success?bookingId=${bookingId}&method=online`);
      },
      onFailure: (error) => {
        console.error('Payment failed:', error);
      },
    });
  };

  if (hookLoading || isPageLoading) {
    return (
      <main className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment options...</p>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Payment Method
            </h1>
            <p className="text-xl text-gray-600">
              Select how you'd like to pay for your service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Online Payment Option */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedMethod('online')}
              className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all ${
                selectedMethod === 'online'
                  ? 'ring-4 ring-blue-500 shadow-xl'
                  : 'hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                  <FaCreditCard size={32} />
                </div>
                {selectedMethod === 'online' && (
                  <FaCheckCircle className="text-blue-600" size={28} />
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Pay Online
              </h3>
              <p className="text-gray-600 mb-6">
                Pay securely using Credit/Debit Card, UPI, Net Banking, or Wallets
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <FaLock className="text-green-600" />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <FaShieldAlt className="text-green-600" />
                  <span>Instant Confirmation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>Multiple Options</span>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Powered by Razorpay
              </div>
            </motion.div>

            {/* COD Option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setSelectedMethod('cod')}
              className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all ${
                selectedMethod === 'cod'
                  ? 'ring-4 ring-green-500 shadow-xl'
                  : 'hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                  <FaMoneyBillWave size={32} />
                </div>
                {selectedMethod === 'cod' && (
                  <FaCheckCircle className="text-green-600" size={28} />
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Cash on Delivery
              </h3>
              <p className="text-gray-600 mb-6">
                Pay in cash when our technician arrives at your location
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>No Online Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>Pay After Service</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>Flexible & Convenient</span>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Pay directly to technician
              </div>
            </motion.div>
          </div>

          {/* Payment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>{service?.name}</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-2xl font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-900">
              <p><span className="font-medium">Customer:</span> {bookingData.customerName}</p>
              <p><span className="font-medium">Date:</span> {new Date(bookingData.preferredDate || '').toLocaleDateString()}</p>
              <p><span className="font-medium">Time:</span> {bookingData.preferredTime}</p>
              <p><span className="font-medium">Location:</span> {bookingData.city}</p>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Proceed Button */}
          {selectedMethod && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full md:w-auto px-12"
                onClick={selectedMethod === 'cod' ? handleCODPayment : handleOnlinePayment}
                isLoading={isProcessing || isConfirming}
              >
                {selectedMethod === 'cod' ? (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Confirm Booking (COD)
                  </>
                ) : (
                  <>
                    <FaCreditCard className="mr-2" />
                    Pay ₹{total.toFixed(2)} Online
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By proceeding, you agree to our terms and conditions
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
