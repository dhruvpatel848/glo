'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaOilCan, FaCar, FaWrench, FaTachometerAlt, FaSnowflake, FaCog } from 'react-icons/fa';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';

const iconMap: Record<string, any> = {
  'Maintenance': FaCog,
  'Safety': FaCar,
  'Repair': FaWrench,
  'Comfort': FaSnowflake,
  'Electrical': FaTachometerAlt,
};

const colorMap: Record<string, string> = {
  'Maintenance': 'bg-blue-100 text-blue-600',
  'Safety': 'bg-red-100 text-red-600',
  'Repair': 'bg-orange-100 text-orange-600',
  'Comfort': 'bg-cyan-100 text-cyan-600',
  'Electrical': 'bg-green-100 text-green-600',
};

export const ServicesSection: React.FC = () => {
  const [services, setServices] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?isActive=true`);
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">No services available at the moment.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional car care services delivered by expert technicians with years of experience.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.category] || FaCog;
            const color = colorMap[service.category] || 'bg-blue-100 text-blue-600';
            
            return (
              <StaggerItem key={service._id}>
                <Card className="h-full flex flex-col">
                  <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <Icon size={28} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      From ₹{service.basePrice}
                    </span>
                    <Link href={`/booking?service=${service._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Book Now
                      </motion.button>
                    </Link>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <ScrollReveal animation="fadeInUp" delay={0.6} className="text-center mt-12">
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              View All Services
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};
