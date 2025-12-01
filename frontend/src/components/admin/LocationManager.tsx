'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import api from '@/utils/api';
import { Location } from '@/types/location';

export const LocationManager: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    pinCode: '',
    latitude: '',
    longitude: '',
    isActive: true,
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await api.get('/locations');
      setLocations(response.data.locations);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (location?: Location) => {
    if (location) {
      setEditingLocation(location);
      setFormData({
        name: location.name,
        city: location.city,
        state: location.state,
        pinCode: location.pinCode,
        latitude: location.coordinates?.latitude.toString() || '',
        longitude: location.coordinates?.longitude.toString() || '',
        isActive: location.isActive,
      });
    } else {
      setEditingLocation(null);
      setFormData({
        name: '',
        city: '',
        state: '',
        pinCode: '',
        latitude: '',
        longitude: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLocation(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const locationData: any = {
      name: formData.name,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,
      isActive: formData.isActive,
    };

    if (formData.latitude && formData.longitude) {
      locationData.coordinates = {
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      };
    }

    try {
      if (editingLocation) {
        await api.put(`/locations/${editingLocation._id}`, locationData);
      } else {
        await api.post('/locations', locationData);
      }
      fetchLocations();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save location:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    
    try {
      await api.delete(`/locations/${id}`);
      fetchLocations();
    } catch (error) {
      console.error('Failed to delete location:', error);
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Locations Management</h2>
          <p className="text-gray-600 mt-1">Manage service locations and coverage areas</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <FaPlus className="mr-2" />
          Add Location
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <motion.div
            key={location._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.city}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                location.isActive
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {location.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">State:</span> {location.state}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">PIN:</span> {location.pinCode}
              </p>
              {location.coordinates && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Coordinates:</span>{' '}
                  {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleOpenModal(location)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FaEdit />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(location._id)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingLocation ? 'Edit Location' : 'Add New Location'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Location Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Downtown, North Side"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="PIN Code"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="123456"
            maxLength={6}
            required
          />

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Coordinates (Optional)
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Latitude"
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="40.7128"
              />

              <Input
                label="Longitude"
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="-74.0060"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="isActive" className="text-gray-700">
              Active (available for service)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingLocation ? 'Update Location' : 'Create Location'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
