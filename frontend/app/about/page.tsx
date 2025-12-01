'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaTools, FaHeart } from 'react-icons/fa';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const values = [
  {
    icon: FaAward,
    title: 'Excellence',
    description: 'We strive for excellence in every service we provide, ensuring top-quality results.',
  },
  {
    icon: FaUsers,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond to meet your needs.',
  },
  {
    icon: FaTools,
    title: 'Expert Technicians',
    description: 'Our certified professionals have years of experience in automotive care.',
  },
  {
    icon: FaHeart,
    title: 'Integrity',
    description: 'Honest pricing, transparent service, and trustworthy recommendations always.',
  },
];

const timeline = [
  { year: '2015', event: 'Company Founded', description: 'Started with a vision to revolutionize car service' },
  { year: '2017', event: 'Expanded Services', description: 'Added mobile service and online booking' },
  { year: '2019', event: '10,000 Customers', description: 'Reached milestone of serving 10,000 happy customers' },
  { year: '2023', event: 'Industry Leader', description: 'Recognized as top car service provider in the region' },
];

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeInUp" className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About GloCar
            </h1>
            <p className="text-xl text-blue-100">
              Your trusted partner in professional car care and maintenance since 2015.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ScrollReveal animation="slideInLeft">
              <div className="bg-blue-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To provide exceptional car service and maintenance solutions that exceed customer 
                  expectations through innovation, expertise, and unwavering commitment to quality. 
                  We aim to make car care convenient, transparent, and accessible to everyone.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slideInRight">
              <div className="bg-blue-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To become the most trusted and preferred car service provider, setting new standards 
                  in automotive care through technology, customer service, and sustainable practices. 
                  We envision a future where car maintenance is effortless and reliable.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to industry leadership.
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <ScrollReveal key={index} animation="fadeInUp" delay={index * 0.1}>
                <div className="flex gap-8 mb-12 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-200 mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.event}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid md:grid-cols-4 gap-8 text-center">
            <StaggerItem>
              <h3 className="text-5xl font-bold mb-2">10K+</h3>
              <p className="text-blue-100 text-lg">Happy Customers</p>
            </StaggerItem>
            <StaggerItem>
              <h3 className="text-5xl font-bold mb-2">50+</h3>
              <p className="text-blue-100 text-lg">Expert Technicians</p>
            </StaggerItem>
            <StaggerItem>
              <h3 className="text-5xl font-bold mb-2">25+</h3>
              <p className="text-blue-100 text-lg">Service Locations</p>
            </StaggerItem>
            <StaggerItem>
              <h3 className="text-5xl font-bold mb-2">99%</h3>
              <p className="text-blue-100 text-lg">Satisfaction Rate</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their vehicles.
            </p>
            <motion.a
              href="/booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Book Your Service Now
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
