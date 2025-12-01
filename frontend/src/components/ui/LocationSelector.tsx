'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaTimes, FaSpinner } from 'react-icons/fa';
import { useLocation } from '@/hooks/useLocation';
import { Location } from '@/types/location';
import { usePathname } from 'next/navigation';

export const LocationSelector: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  const {
    selectedLocation,
    setSelectedLocation,
    availableLocations,
    isLoading,
    error,
    detectLocation,
    isDetecting,
  } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Show selector if no location is selected (but not on admin pages)
  useEffect(() => {
    if (!isAdminRoute && !selectedLocation && !isLoading) {
      setIsOpen(true);
      // Auto-detect location on first load
      detectLocation();
    }
  }, [selectedLocation, isLoading, isAdminRoute]);

  // Don't render anything on admin pages
  if (isAdminRoute) {
    return null;
  }

  const filteredLocations = Array.isArray(availableLocations) 
    ? availableLocations.filter(
        (location) =>
          location.isActive &&
          (location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.state.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Selected Location Display */}
      {selectedLocation && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 right-4 z-20 bg-white shadow-lg rounded-lg p-3 flex items-center space-x-2 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setIsOpen(true)}
        >
          <FaMapMarkerAlt className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">{selectedLocation.city}</p>
            <p className="text-xs text-gray-500">{selectedLocation.state}</p>
          </div>
        </motion.div>
      )}

      {/* Location Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => selectedLocation && setIsOpen(false)}
            />

            {/* Selector Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-blue-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Select Your Location</h2>
                  {selectedLocation && (
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <FaTimes size={24} />
                    </button>
                  )}
                </div>
                <p className="text-blue-100">
                  Choose your city to see available services
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Auto-detect Button */}
                <button
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="w-full bg-blue-50 text-blue-600 border-2 border-blue-600 rounded-lg p-4 mb-4 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isDetecting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <FaMapMarkerAlt />
                      <span>Detect My Location</span>
                    </>
                  )}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                    {error}
                  </div>
                )}

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search city or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Locations List */}
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <FaSpinner className="animate-spin text-blue-600 mx-auto mb-2" size={32} />
                      <p className="text-gray-600">Loading locations...</p>
                    </div>
                  ) : filteredLocations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No locations found
                    </div>
                  ) : (
                    filteredLocations.map((location) => (
                      <motion.button
                        key={location._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLocationSelect(location)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedLocation?._id === location._id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <FaMapMarkerAlt
                            className={`mt-1 ${
                              selectedLocation?._id === location._id
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`}
                          />
                          <div>
                            <p className="font-medium text-gray-900">{location.city}</p>
                            <p className="text-sm text-gray-600">{location.state}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              PIN: {location.pinCode}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
