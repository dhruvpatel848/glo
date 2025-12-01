'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaCar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Input, Select, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLocation } from '@/hooks/useLocation';
import { useBooking } from '@/hooks/useBooking';
import { BookingFormData } from '@/types/booking';

interface BookingFormProps {
  preSelectedServiceId?: string;
}

const carBrands = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
  'Audi', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Tesla', 'Other'
];

export const BookingForm: React.FC<BookingFormProps> = ({ preSelectedServiceId }) => {
  const router = useRouter();
  const { selectedLocation } = useLocation();
  const { setBookingData, createBooking, isLoading, error } = useBooking();

  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    
    // Check if we're returning from review page to edit a specific step
    const editStep = sessionStorage.getItem('booking_edit_step');
    if (editStep) {
      setCurrentStep(parseInt(editStep));
      sessionStorage.removeItem('booking_edit_step');
    }
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?isActive=true`);
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setServicesLoading(false);
    }
  };
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    carBrand: '',
    carModel: '',
    carNumber: '',
    serviceId: preSelectedServiceId || '',
    preferredDate: '',
    preferredTime: '',
    address: '',
    city: selectedLocation?.city || '',
    pinCode: selectedLocation?.pinCode || '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  useEffect(() => {
    if (selectedLocation) {
      setFormData((prev) => ({
        ...prev,
        city: selectedLocation.city,
        pinCode: selectedLocation.pinCode,
      }));
    }
  }, [selectedLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name as keyof BookingFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Partial<Record<keyof BookingFormData, string>> = {};

    if (step === 1) {
      if (!formData.customerName.trim()) errors.customerName = 'Name is required';
      if (!formData.customerEmail.trim()) errors.customerEmail = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.customerEmail)) errors.customerEmail = 'Invalid email';
      if (!formData.customerPhone.trim()) errors.customerPhone = 'Phone is required';
      else if (!/^\d{10}$/.test(formData.customerPhone.replace(/\D/g, ''))) errors.customerPhone = 'Invalid phone number';
    }

    if (step === 2) {
      if (!formData.carBrand) errors.carBrand = 'Car brand is required';
      if (!formData.carModel.trim()) errors.carModel = 'Car model is required';
      if (!formData.carNumber.trim()) errors.carNumber = 'Car number is required';
    }

    if (step === 3) {
      if (!formData.serviceId) errors.serviceId = 'Please select a service';
      if (!formData.preferredDate) errors.preferredDate = 'Date is required';
      if (!formData.preferredTime) errors.preferredTime = 'Time is required';
    }

    if (step === 4) {
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.pinCode.trim()) errors.pinCode = 'PIN code is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      try {
        setBookingData(formData);
        router.push('/booking/review');
      } catch (err) {
        console.error('Booking error:', err);
      }
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: FaUser },
    { number: 2, title: 'Car Details', icon: FaCar },
    { number: 3, title: 'Service & Schedule', icon: FaCalendarAlt },
    { number: 4, title: 'Address', icon: FaMapMarkerAlt },
  ];

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 transition-colors ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <Input
                label="Full Name"
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="John Doe"
                error={formErrors.customerName}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                error={formErrors.customerEmail}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="+91 1234567890"
                error={formErrors.customerPhone}
                helperText="10-digit phone number"
                required
              />
            </div>
          )}

          {/* Step 2: Car Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Car Details</h2>
              
              <Select
                label="Car Brand"
                name="carBrand"
                value={formData.carBrand}
                onChange={handleChange}
                error={formErrors.carBrand}
                options={[
                  { value: '', label: 'Select Brand' },
                  ...carBrands.map(brand => ({ value: brand, label: brand }))
                ]}
                required
              />

              <Input
                label="Car Model"
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                placeholder="e.g., Camry, Civic, Model 3"
                error={formErrors.carModel}
                required
              />

              <Input
                label="Car Registration Number"
                type="text"
                name="carNumber"
                value={formData.carNumber}
                onChange={handleChange}
                placeholder="e.g., ABC1234"
                error={formErrors.carNumber}
                required
              />
            </div>
          )}

          {/* Step 3: Service & Schedule */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service & Schedule</h2>
              
              <Select
                label="Select Service"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                error={formErrors.serviceId}
                options={[
                  { value: '', label: servicesLoading ? 'Loading services...' : 'Choose a service' },
                  ...services.map(service => ({
                    value: service._id,
                    label: `${service.name} - ₹${service.basePrice}`
                  }))
                ]}
                required
              />

              <Input
                label="Preferred Date"
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={minDate}
                error={formErrors.preferredDate}
                required
              />

              <Select
                label="Preferred Time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                error={formErrors.preferredTime}
                options={[
                  { value: '', label: 'Select time' },
                  { value: '09:00', label: '9:00 AM' },
                  { value: '10:00', label: '10:00 AM' },
                  { value: '11:00', label: '11:00 AM' },
                  { value: '12:00', label: '12:00 PM' },
                  { value: '13:00', label: '1:00 PM' },
                  { value: '14:00', label: '2:00 PM' },
                  { value: '15:00', label: '3:00 PM' },
                  { value: '16:00', label: '4:00 PM' },
                  { value: '17:00', label: '5:00 PM' },
                ]}
                required
              />
            </div>
          )}

          {/* Step 4: Address */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Address</h2>
              
              <TextArea
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                error={formErrors.address}
                rows={3}
                required
              />

              <Input
                label="City"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={formErrors.city}
                required
              />

              <Input
                label="PIN Code"
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="123456"
                error={formErrors.pinCode}
                required
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            
            {currentStep < 4 ? (
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="ml-auto"
              >
                Review Booking
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
