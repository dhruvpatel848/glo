import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { createRazorpayOrder } from '../utils/razorpay';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;

    // Create Razorpay order
    const order = await createRazorpayOrder({
      amount: bookingData.payment.amount,
      receipt: `booking_${Date.now()}`,
      notes: {
        customerEmail: bookingData.customer.email,
        customerName: bookingData.customer.name,
      },
    });

    // Create booking with payment order ID
    const booking = await Booking.create({
      ...bookingData,
      payment: {
        ...bookingData.payment,
        razorpayOrderId: order.id,
        status: 'pending',
      },
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error: any) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    const filter: any = {};
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate as string);
      if (endDate) filter.createdAt.$lte = new Date(endDate as string);
    }

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .populate('service.serviceId')
      .populate('address.location');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error: any) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate('service.serviceId')
      .populate('address.location');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error: any) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message,
    });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      booking,
    });
  } catch (error: any) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message,
    });
  }
};

export const createCODBooking = async (req: Request, res: Response) => {
  try {
    const { customer, car, service, schedule, address, payment } = req.body;

    // Create booking with COD payment method
    const booking = await Booking.create({
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      car: {
        brand: car.brand,
        model: car.model,
        number: car.registrationNumber,
      },
      service: {
        serviceId: service.serviceId,
        name: service.name,
        price: payment.amount,
      },
      schedule: {
        date: new Date(schedule.preferredDate),
        time: schedule.preferredTime,
      },
      address: {
        street: address.street,
        city: address.city,
        pinCode: address.pinCode,
      },
      payment: {
        method: 'cod',
        amount: payment.amount,
        status: 'pending',
      },
      status: 'confirmed',
    });

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully. Pay cash on delivery.',
      booking,
    });
  } catch (error: any) {
    console.error('Create COD booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
    });
  }
};
