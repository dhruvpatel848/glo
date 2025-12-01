export interface IService {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: number;
  image: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILocation {
  _id: string;
  name: string;
  city: string;
  state: string;
  pinCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking {
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
