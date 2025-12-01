import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Booking from '../models/Booking';
import Service from '../models/Service';
import Location from '../models/Location';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive',
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Get total bookings
    const totalBookings = await Booking.countDocuments();

    // Get bookings by status
    const bookingsByStatus = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get total revenue
    const revenueData = await Booking.aggregate([
      {
        $match: {
          'payment.status': 'completed',
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$payment.amount' },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    // Get popular services
    const popularServices = await Booking.aggregate([
      {
        $group: {
          _id: '$service.serviceId',
          name: { $first: '$service.name' },
          count: { $sum: 1 },
          revenue: { $sum: '$service.price' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('bookingId customer.name service.name status createdAt');

    // Get location stats
    const locationStats = await Booking.aggregate([
      {
        $group: {
          _id: '$address.city',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalBookings,
        totalRevenue,
        bookingsByStatus,
        popularServices,
        recentBookings,
        locationStats,
      },
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message,
    });
  }
};

export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create new admin user
    const user = await User.create({
      email,
      password,
      name,
      role: 'admin',
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Create admin user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create admin user',
      error: error.message,
    });
  }
};
