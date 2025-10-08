import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { scale: 1.02, y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  );
}