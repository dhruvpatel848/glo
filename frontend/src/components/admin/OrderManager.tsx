'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaFilter, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Select, Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import api from '@/utils/api';
import { Booking } from '@/types/booking';

export const OrderManager: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, statusFilter, startDate, endDate]);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Date range filter
    if (startDate) {
      filtered = filtered.filter(booking => 
        new Date(booking.schedule.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(booking => 
        new Date(booking.schedule.date) <= new Date(endDate)
      );
    }

    setFilteredBookings(filtered);
  };

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  const exportToCSV = () => {
    const headers = [
      'Booking ID',
      'Customer Name',
      'Email',
      'Phone',
      'Service',
      'Car Brand',
      'Car Model',
      'Car Number',
      'Date',
      'Time',
      'Amount',
      'Payment Status',
      'Booking Status',
      'Address',
      'City',
      'Pin Code'
    ];

    const rows = filteredBookings.map(booking => [
      booking.bookingId,
      booking.customer.name,
      booking.customer.email,
      booking.customer.phone,
      booking.service.name,
      booking.car.brand,
      booking.car.model,
      booking.car.number,
      new Date(booking.schedule.date).toLocaleDateString(),
      booking.schedule.time,
      booking.payment.amount.toFixed(2),
      booking.payment.status,
      booking.status,
      booking.address.street,
      booking.address.city,
      booking.address.pinCode
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const dateRange = startDate && endDate 
      ? `_${startDate}_to_${endDate}` 
      : startDate 
      ? `_from_${startDate}` 
      : endDate 
      ? `_until_${endDate}` 
      : '';
    
    link.setAttribute('href', url);
    link.setAttribute('download', `orders${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      fetchBookings();
      if (selectedBooking && selectedBooking._id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: newStatus as any });
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'in-progress':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-purple-100 text-purple-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
            <p className="text-gray-600 mt-1">View and manage customer bookings</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowDateFilter(!showDateFilter)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <FaCalendarAlt />
              <span>Date Filter</span>
            </Button>
            <Button
              onClick={exportToCSV}
              disabled={filteredBookings.length === 0}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              <FaDownload />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            {/* Status Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-2" />
                Status Filter
              </label>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Orders' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'confirmed', label: 'Confirmed' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
              />
            </div>

            {/* Date Range Filter */}
            {showDateFilter && (
              <>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={clearDateFilter}
                  variant="outline"
                  className="mb-0"
                >
                  Clear Dates
                </Button>
              </>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredBookings.length} of {bookings.length} orders
            {(startDate || endDate) && (
              <span className="ml-2 text-blue-600">
                (Filtered by date: {startDate || 'any'} to {endDate || 'any'})
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Booking ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No orders found matching the selected filters
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{booking.bookingId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{booking.customer.name}</p>
                      <p className="text-sm text-gray-600">{booking.customer.email}</p>
                      <p className="text-sm text-gray-600">{booking.customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{booking.service.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">
                        {new Date(booking.schedule.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">{booking.schedule.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">₹{booking.payment.amount.toFixed(2)}</p>
                    <p className={`text-xs ${
                      booking.payment.status === 'completed'
                        ? 'text-green-600'
                        : booking.payment.status === 'failed'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}>
                      {booking.payment.status}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEye size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Details"
        size="lg"
      >
        {selectedBooking && (
          <div className="space-y-6">
            {/* Booking Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><span className="font-medium">Booking ID:</span> {selectedBooking.bookingId}</p>
                <p><span className="font-medium">Created:</span> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><span className="font-medium">Name:</span> {selectedBooking.customer.name}</p>
                <p><span className="font-medium">Email:</span> {selectedBooking.customer.email}</p>
                <p><span className="font-medium">Phone:</span> {selectedBooking.customer.phone}</p>
              </div>
            </div>

            {/* Car Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Car Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><span className="font-medium">Brand:</span> {selectedBooking.car.brand}</p>
                <p><span className="font-medium">Model:</span> {selectedBooking.car.model}</p>
                <p><span className="font-medium">Number:</span> {selectedBooking.car.number}</p>
              </div>
            </div>

            {/* Service & Schedule */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service & Schedule</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><span className="font-medium">Service:</span> {selectedBooking.service.name}</p>
                <p><span className="font-medium">Price:</span> ₹{selectedBooking.service.price}</p>
                <p><span className="font-medium">Date:</span> {new Date(selectedBooking.schedule.date).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {selectedBooking.schedule.time}</p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Address</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>{selectedBooking.address.street}</p>
                <p>{selectedBooking.address.city}, {selectedBooking.address.pinCode}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><span className="font-medium">Amount:</span> ₹{selectedBooking.payment.amount.toFixed(2)}</p>
                <p><span className="font-medium">Status:</span> {selectedBooking.payment.status}</p>
                <p><span className="font-medium">Order ID:</span> {selectedBooking.payment.razorpayOrderId}</p>
                {selectedBooking.payment.razorpayPaymentId && (
                  <p><span className="font-medium">Payment ID:</span> {selectedBooking.payment.razorpayPaymentId}</p>
                )}
              </div>
            </div>

            {/* Status Update */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
              <Select
                value={selectedBooking.status}
                onChange={(e) => handleUpdateStatus(selectedBooking._id, e.target.value)}
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'confirmed', label: 'Confirmed' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
