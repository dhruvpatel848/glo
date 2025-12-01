'use client';

import { useState, useEffect } from 'react';
import { BookingFormData } from '@/types/booking';
import api from '@/utils/api';

interface UseBookingReturn {
  bookingData: Partial<BookingFormData>;
  setBookingData: (data: Partial<BookingFormData>) => void;
  clearBookingData: () => void;
  createBooking: (data: BookingFormData) => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

const BOOKING_STORAGE_KEY = 'glocar_booking_data';

export const useBooking = (): UseBookingReturn => {
  const [bookingData, setBookingDataState] = useState<Partial<BookingFormData>>({});
  const [isLoading, setIsLoading] = useState(true); // Start as true
  const [error, setError] = useState<string | null>(null);

  // Load booking data from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(BOOKING_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setBookingDataState(parsed);
        } catch (e) {
          console.error('Failed to parse stored booking data:', e);
        }
      }
      setIsLoading(false); // Mark as loaded
    }
  }, []);

  const setBookingData = (data: Partial<BookingFormData>) => {
    const updated = { ...bookingData, ...data };
    setBookingDataState(updated);
    
    // Save to sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const clearBookingData = () => {
    setBookingDataState({});
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(BOOKING_STORAGE_KEY);
    }
  };

  const createBooking = async (data: BookingFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.post('/bookings', data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bookingData,
    setBookingData,
    clearBookingData,
    createBooking,
    isLoading,
    error,
  };
};
