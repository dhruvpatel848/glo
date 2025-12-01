'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt,
  FaCog,
  FaMapMarkerAlt,
  FaClipboardList,
  FaSignOutAlt,
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/admin/services', label: 'Services', icon: FaCog },
  { href: '/admin/locations', label: 'Locations', icon: FaMapMarkerAlt },
  { href: '/admin/orders', label: 'Orders', icon: FaClipboardList },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminUser = localStorage.getItem('adminUser');
      if (adminUser) {
        try {
          const user = JSON.parse(adminUser);
          setAdminName(user.name || 'Admin');
        } catch (e) {
          setAdminName('Admin');
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hamburger Menu Button - 3 Lines */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-6 z-50 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <motion.span
            animate={isSidebarOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={isSidebarOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-full h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={isSidebarOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-white rounded-full"
          />
        </div>
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? { x: 0 } : { x: -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full bg-white shadow-xl z-40 w-64"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 mt-16">
          <div className="flex flex-col space-y-2">
            <img 
              src="/logo.png" 
              alt="GloCar Logo" 
              className="h-12 w-auto object-contain max-w-full"
            />
            <p className="text-xs text-gray-600">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Admin Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{adminName}</p>
            <p className="text-xs text-gray-600">Administrator</p>
          </div>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <FaSignOutAlt size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content - No header/footer */}
      <div className="min-h-screen">
        {/* Page Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 ml-0">
          <div className="flex items-center justify-between">
            <div className="ml-16">
              <h1 className="text-2xl font-bold text-gray-900">
                {navItems.find((item) => item.href === pathname)?.label || 'Admin Panel'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {adminName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{adminName}</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6 pl-24">{children}</main>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </div>
  );
};
