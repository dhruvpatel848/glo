'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaOilCan, FaCar, FaWrench, FaTachometerAlt, FaSnowflake, FaCog, FaBatteryFull, FaTools, FaSearch } from 'react-icons/fa';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const iconMap: Record<string, any> = {
  'Maintenance': FaCog,
  'Safety': FaCar,
  'Repair': FaWrench,
  'Comfort': FaSnowflake,
  'Electrical': FaBatteryFull,
};

const colorMap: Record<string, string> = {
  'Maintenance': 'bg-blue-100 text-blue-600',
  'Safety': 'bg-red-100 text-red-600',
  'Repair': 'bg-orange-100 text-orange-600',
  'Comfort': 'bg-cyan-100 text-cyan-600',
  'Electrical': 'bg-yellow-100 text-yellow-600',
};

export default function ServicesPage() {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?isActive=true`);
      const data = await response.json();
      const services = data.services || [];
      setAllServices(services);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(services.map((s: any) => s.category))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredServices = allServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeInUp" className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional car care services delivered by expert technicians. 
              Choose from our wide range of services to keep your vehicle in top condition.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-md sticky top-20 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-96">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No services found matching your criteria.</p>
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const Icon = iconMap[service.category] || FaCog;
                const color = colorMap[service.category] || 'bg-blue-100 text-blue-600';
                
                return (
                  <StaggerItem key={service._id}>
                    <Card className="h-full flex flex-col">
                      <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                        <Icon size={28} />
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {service.name}
                        </h3>
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {service.category}
                        </span>
                      </div>

                      <p className="text-gray-900 mb-6">
                        {service.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-3xl font-bold text-blue-600">
                              ₹{service.basePrice}
                            </span>
                            <p className="text-sm text-gray-700">{service.duration} mins</p>
                          </div>
                        </div>

                        <Link href={`/booking?service=${service._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Book This Service
                          </motion.button>
                        </Link>
                      </div>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-4xl font-bold mb-6">
              Need Help Choosing a Service?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our experts are here to help. Contact us via WhatsApp or call us for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
