'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaCar } from 'react-icons/fa';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import api from '@/utils/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', formData);
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="GloCar Logo" 
            className="h-16 w-auto object-contain mx-auto mb-4 max-w-full"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">
            Sign in to access the admin panel
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="pl-12"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-12"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Protected area - Authorized personnel only</p>
        </div>
      </motion.div>
    </main>
  );
}
