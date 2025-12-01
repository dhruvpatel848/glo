'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import api from '@/utils/api';
import { Service } from '@/types/service';

export const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    duration: '',
    image: '',
    category: '',
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        basePrice: service.basePrice.toString(),
        duration: service.duration.toString(),
        image: service.image,
        category: service.category,
        isActive: service.isActive,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        basePrice: '',
        duration: '',
        image: '',
        category: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      basePrice: parseFloat(formData.basePrice),
      duration: parseInt(formData.duration),
    };

    try {
      if (editingService) {
        await api.put(`/services/${editingService._id}`, serviceData);
      } else {
        await api.post('/services', serviceData);
      }
      fetchServices();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      await api.put(`/services/${service._id}`, {
        ...service,
        isActive: !service.isActive,
      });
      fetchServices();
    } catch (error) {
      console.error('Failed to toggle service status:', error);
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
          <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
          <p className="text-gray-600 mt-1">Manage your car service offerings</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <FaPlus className="mr-2" />
          Add Service
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <motion.tr
                  key={service._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    ₹{service.basePrice}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {service.duration} mins
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleActive(service)}
                      className="flex items-center space-x-2"
                    >
                      {service.isActive ? (
                        <>
                          <FaToggleOn className="text-green-600 text-2xl" />
                          <span className="text-green-600 text-sm font-medium">Active</span>
                        </>
                      ) : (
                        <>
                          <FaToggleOff className="text-gray-400 text-2xl" />
                          <span className="text-gray-600 text-sm font-medium">Inactive</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenModal(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Service Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Base Price (₹)"
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              required
            />

            <Input
              label="Duration (minutes)"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Maintenance, Repair"
            required
          />

          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="isActive" className="text-gray-700">
              Active (visible to customers)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingService ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
