'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '@/utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  onClick,
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md p-6 transition-shadow duration-200';
  const hoverStyles = hover ? 'hover:shadow-xl cursor-pointer' : '';

  return (
    <motion.div
      whileHover={hover ? cardHover : undefined}
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
