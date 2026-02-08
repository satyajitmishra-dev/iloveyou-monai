import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm sm:text-base";
  
  const variants = {
    primary: "bg-valentine-500 text-white hover:bg-valentine-600 shadow-valentine-300/50",
    secondary: "bg-white text-valentine-600 border-2 border-valentine-100 hover:bg-valentine-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
