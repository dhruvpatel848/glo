'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeIn, fadeInUp, scaleIn, slideInLeft, slideInRight } from '@/utils/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const animations = {
    fadeIn,
    fadeInUp,
    scaleIn,
    slideInLeft,
    slideInRight,
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedAnimation}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};
