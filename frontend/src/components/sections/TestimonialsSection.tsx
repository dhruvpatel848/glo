'use client';

import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Slider } from '@/components/ui/Slider';

const testimonials = [
  {
    name: 'John Smith',
    role: 'Business Owner',
    image: '👨‍💼',
    rating: 5,
    text: 'Excellent service! The technicians were professional and my car runs like new. The online booking made everything so convenient.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    image: '👩‍💼',
    rating: 5,
    text: 'I love how easy it is to book a service. The payment process was smooth and the quality of work exceeded my expectations.',
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: '👨‍💻',
    rating: 5,
    text: 'Best car service experience I\'ve had. They came to my location, fixed everything quickly, and the pricing was transparent.',
  },
  {
    name: 'Emily Davis',
    role: 'Teacher',
    image: '👩‍🏫',
    rating: 5,
    text: 'Highly recommend! The WhatsApp support was very responsive and the service quality was top-notch. Will definitely use again.',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their vehicles.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <Slider autoPlay interval={5000}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4 py-8">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
                  <FaQuoteLeft className="text-blue-600 text-4xl mb-6" />
                  
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">
                        {testimonial.image}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xl" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Stats */}
        <ScrollReveal animation="fadeInUp" delay={0.4}>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-white mb-2">10,000+</h3>
              <p className="text-blue-100 text-lg">Happy Customers</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-white mb-2">4.9/5</h3>
              <p className="text-blue-100 text-lg">Average Rating</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-white mb-2">99%</h3>
              <p className="text-blue-100 text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
