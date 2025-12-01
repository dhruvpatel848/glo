import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay only if keys are provided
let razorpay: Razorpay | null = null;

// Debug: Log environment variable status
console.log('Razorpay Key ID exists:', !!process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret exists:', !!process.env.RAZORPAY_KEY_SECRET);

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('✓ Razorpay initialized successfully');
} else {
  console.warn('⚠️  Razorpay keys not configured. Payment features will be disabled.');
}

export interface CreateOrderParams {
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export const createRazorpayOrder = async (params: CreateOrderParams) => {
  if (!razorpay) {
    throw new Error('Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.');
  }

  try {
    const options = {
      amount: params.amount * 100, // Convert to paise
      currency: params.currency || 'USD',
      receipt: params.receipt,
      notes: params.notes || {},
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    throw error;
  }
};

export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  try {
    const text = `${orderId}|${paymentId}`;
    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    return generatedSignature === signature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};

export default razorpay;
