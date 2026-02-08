import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from './Button';

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 sm:space-y-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative"
        variants={itemVariants}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-20 sm:w-24 h-20 sm:h-24 text-valentine-500 fill-valentine-200" />
        </motion.div>
      </motion.div>
      
      <motion.div className="space-y-3 sm:space-y-4" variants={itemVariants}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-script text-valentine-600">
          Hey, Beautiful...
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-sans max-w-md mx-auto">
          I made something special just for you. <br className="hidden sm:block" />
          Are you ready to see it?
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button onClick={onNext} className="text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 mt-6 sm:mt-8">
          Start The Surprise ✨
        </Button>
      </motion.div>
    </motion.div>
  );
};
