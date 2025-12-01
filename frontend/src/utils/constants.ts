export const COLORS = {
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1e40af',
  white: '#ffffff',
  gray: '#6b7280',
  success: '#10b981',
  error: '#ef4444',
};

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';
export const WHATSAPP_MESSAGE = 'Hi, I would like to book a car service.';

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
