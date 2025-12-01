'use client';

import React from 'react';
import Link from 'next/link';
import { FaCar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const currentYear = new Date().getFullYear();

  // Don't render on admin pages
  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="GloCar Logo"
                className="h-12 w-auto object-contain max-w-full"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Professional car service and maintenance solutions for all your automotive needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Book Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Oil Change</li>
              <li className="text-gray-400">Brake Service</li>
              <li className="text-gray-400">Engine Repair</li>
              <li className="text-gray-400">Tire Service</li>
              <li className="text-gray-400">AC Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Surat, Gujarat
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-400">info@glocar.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} GloCar. All rights reserved. |
            <Link href="/privacy" className="hover:text-blue-600 transition-colors ml-2">
              Privacy Policy
            </Link> |
            <Link href="/terms" className="hover:text-blue-600 transition-colors ml-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
