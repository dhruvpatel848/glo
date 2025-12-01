'use client';

import React from 'react';
import { FaSearch, FaCalendarAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const steps = [
  {
    icon: FaSearch,
    title: 'Choose Service',
    description: 'Browse our wide range of car services and select what your vehicle needs.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FaCalendarAlt,
    title: 'Book Appointment',
    description: 'Pick your preferred date, time, and location for the service.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: FaCreditCard,
    title: 'Secure Payment',
    description: 'Pay online securely through our integrated payment gateway.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: FaCheckCircle,
    title: 'Get Service',
    description: 'Our expert technicians will service your car at your chosen location.',
    color: 'bg-orange-100 text-orange-600',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your car serviced in 4 simple steps. Quick, easy, and hassle-free.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <div className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
                )}

                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <step.icon size={28} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal animation="fadeInUp" delay={0.6} className="text-center mt-16">
          <a
            href="/booking"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Booking Now
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};
