export interface Booking {
  _id: string;
  bookingId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  car: {
    brand: string;
    model: string;
    number: string;
  };
  service: {
    serviceId: string;
    name: string;
    price: number;
  };
  schedule: {
    date: Date;
    time: string;
  };
  address: {
    street: string;
    city: string;
    pinCode: string;
    location: string;
  };
  payment: {
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
  };
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  carBrand: string;
  carModel: string;
  carNumber: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  city: string;
  pinCode: string;
}
