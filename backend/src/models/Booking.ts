import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
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
    serviceId: mongoose.Types.ObjectId;
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
    location: mongoose.Types.ObjectId;
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

const BookingSchema: Schema = new Schema(
  {
    bookingId: {
      type: String,
      required: false,
      trim: true,
    },
    customer: {
      name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Customer email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      },
      phone: {
        type: String,
        required: [true, 'Customer phone is required'],
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
      },
    },
    car: {
      brand: {
        type: String,
        required: [true, 'Car brand is required'],
        trim: true,
      },
      model: {
        type: String,
        required: [true, 'Car model is required'],
        trim: true,
      },
      number: {
        type: String,
        required: [true, 'Car number is required'],
        trim: true,
        uppercase: true,
      },
    },
    service: {
      serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    schedule: {
      date: {
        type: Date,
        required: [true, 'Service date is required'],
      },
      time: {
        type: String,
        required: [true, 'Service time is required'],
      },
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      pinCode: {
        type: String,
        required: [true, 'PIN code is required'],
        trim: true,
      },
      location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: false,
      },
    },
    payment: {
      method: {
        type: String,
        enum: ['online', 'cod'],
        default: 'online',
      },
      razorpayOrderId: {
        type: String,
        required: function(this: any) {
          return this.payment.method === 'online';
        },
      },
      razorpayPaymentId: {
        type: String,
      },
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique booking ID before saving
BookingSchema.pre('save', async function (next) {
  if (!this.bookingId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    this.bookingId = `BK${timestamp}${random}`.toUpperCase();
  }
  next();
});

// Indexes for better query performance
BookingSchema.index({ bookingId: 1 }, { unique: true });
BookingSchema.index({ 'customer.email': 1 });
BookingSchema.index({ 'customer.phone': 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ 'payment.status': 1 });
BookingSchema.index({ 'schedule.date': 1 });
BookingSchema.index({ createdAt: -1 });

// Compound indexes
BookingSchema.index({ status: 1, createdAt: -1 });
BookingSchema.index({ 'payment.status': 1, createdAt: -1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
