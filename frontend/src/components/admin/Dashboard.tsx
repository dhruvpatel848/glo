'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaDollarSign, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';
import api from '@/utils/api';

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  bookingsByStatus: Array<{ _id: string; count: number }>;
  popularServices: Array<{ _id: string; name: string; count: number; revenue: number }>;
  recentBookings: Array<any>;
  locationStats: Array<{ _id: string; count: number }>;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statusCounts = stats?.bookingsByStatus.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.totalBookings || 0}</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-4 rounded-lg">
              <FaCalendarCheck size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹{stats?.totalRevenue.toFixed(2) || '0.00'}</p>
            </div>
            <div className="bg-green-100 text-green-600 p-4 rounded-lg">
              <FaDollarSign size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-gray-900">{statusCounts.confirmed || 0}</p>
            </div>
            <div className="bg-purple-100 text-purple-600 p-4 rounded-lg">
              <FaChartLine size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{statusCounts.pending || 0}</p>
            </div>
            <div className="bg-orange-100 text-orange-600 p-4 rounded-lg">
              <FaMapMarkerAlt size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popular Services & Recent Bookings */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Popular Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Services</h2>
          <div className="space-y-4">
            {stats?.popularServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.count} bookings</p>
                </div>
                <p className="text-lg font-bold text-blue-600">₹{service.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {stats?.recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{booking.bookingId}</p>
                  <p className="text-sm text-gray-600">{booking.customer?.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                  booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Location Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Locations</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {stats?.locationStats.map((location, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{location.count}</p>
              <p className="text-sm text-gray-600 mt-1">{location._id}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
