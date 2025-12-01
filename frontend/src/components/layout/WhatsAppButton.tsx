'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/utils/constants';
import { usePathname } from 'next/navigation';

export const WhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Don't render on admin pages
  if (isAdminRoute) {
    return null;
  }

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
    </motion.button>
  );
};
