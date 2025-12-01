'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaCar } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render on admin pages
  if (isAdminRoute) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="GloCar Logo" 
              className="h-14 w-auto object-contain max-w-full"
              style={{ maxHeight: '56px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Book Now
              </motion.button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2">
                Book Now
              </button>
            </Link>
          </motion.nav>
        )}
      </div>
    </header>
  );
};
