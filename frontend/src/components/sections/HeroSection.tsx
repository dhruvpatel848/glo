'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { fadeIn, fadeInUp } from '@/utils/animations';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 -mt-20 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div variants={fadeIn} className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                🚗 Professional Car Service
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Your Car Deserves
              <span className="text-blue-600"> Expert Care</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Premium car service and maintenance at your doorstep. Book online, 
              pay securely, and get your car serviced by certified professionals.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Book Now</span>
                  <FaArrowRight />
                </motion.button>
              </Link>

              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Services</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200"
            >
              <div>
                <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
                <p className="text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600">50+</h3>
                <p className="text-gray-600 mt-1">Expert Technicians</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600">99%</h3>
                <p className="text-gray-600 mt-1">Satisfaction Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for hero image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      className="w-48 h-48 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </motion.div>
                  <p className="text-2xl font-bold mt-4">Professional Car Service</p>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-4 right-4 bg-white rounded-full p-4 shadow-lg"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">4.9</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-300 rounded-full opacity-50 blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
