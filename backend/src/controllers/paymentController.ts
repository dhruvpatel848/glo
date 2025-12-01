import { Request, Response } from 'express';
import { createRazorpayOrder, verifyRazorpaySignature } from '../utils/razorpay';
import Booking from '../models/Booking';

export const createPaymentOrder = async (req: Request, res: Response) => {
  try {
    const { amount, bookingId, customerEmail, customerName } = req.body;

    if (!amount || !bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and booking ID are required',
      });
    }

    const order = await createRazorpayOrder({
      amount,
      receipt: bookingId,
      notes: {
        bookingId,
        customerEmail: customerEmail || '',
        customerName: customerName || '',
      },
    });

    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    });
  } catch (error: any) {
    console.error('Payment order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message,
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification parameters',
      });
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Update booking with payment details
    if (bookingId) {
      await Booking.findOneAndUpdate(
        { bookingId },
        {
          'payment.razorpayPaymentId': razorpay_payment_id,
          'payment.status': 'completed',
          status: 'confirmed',
        }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};

export const handlePaymentFailure = async (req: Request, res: Response) => {
  try {
    const { bookingId, error } = req.body;

    if (bookingId) {
      await Booking.findOneAndUpdate(
        { bookingId },
        {
          'payment.status': 'failed',
          status: 'cancelled',
        }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Payment failure recorded',
    });
  } catch (error: any) {
    console.error('Payment failure handling error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to handle payment failure',
      error: error.message,
    });
  }
};
