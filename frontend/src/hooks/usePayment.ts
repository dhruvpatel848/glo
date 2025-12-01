'use client';

import { useState } from 'react';
import api from '@/utils/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOptions {
  amount: number;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (options: PaymentOptions) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Create Razorpay order
      const orderResponse = await api.post('/payments/create-order', {
        amount: options.amount,
        bookingId: options.bookingId,
        customerEmail: options.customerEmail,
        customerName: options.customerName,
      });

      const { order } = orderResponse.data;

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize Razorpay payment
      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'GloCar Services',
        description: 'Car Service Payment',
        order_id: order.id,
        prefill: {
          name: options.customerName,
          email: options.customerEmail,
          contact: options.customerPhone,
        },
        theme: {
          color: '#2563eb',
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: options.bookingId,
            });

            if (verifyResponse.data.success) {
              options.onSuccess(response);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err: any) {
            console.error('Payment verification error:', err);
            options.onFailure(err);
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setError('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    } catch (err: any) {
      console.error('Payment initialization error:', err);
      setError(err.message || 'Failed to initialize payment');
      setIsProcessing(false);
      options.onFailure(err);
    }
  };

  return {
    initializePayment,
    isProcessing,
    error,
  };
};
