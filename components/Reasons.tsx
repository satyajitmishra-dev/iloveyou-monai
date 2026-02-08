import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Sun, Coffee } from 'lucide-react';
import { Button } from './Button';

interface ReasonsProps {
  onNext: () => void;
}

export const Reasons: React.FC<ReasonsProps> = ({ onNext }) => {
  const reasons = [
    {
      icon: <Smile className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500" />,
      title: "Your Smile",
      desc: "It literally lights up my entire world whenever you walk into the room."
    },
    {
      icon: <Sun className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />,
      title: "Your Warmth",
      desc: "You have the kindest heart I've ever known."
    },
    {
      icon: <Coffee className="w-6 sm:w-8 h-6 sm:h-8 text-amber-600" />,
      title: "Our Moments",
      desc: "Even doing nothing with you is my favorite thing to do."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center space-y-6 sm:space-y-8 w-full max-w-xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-script text-valentine-600 text-center"
        variants={itemVariants}
      >
        Why I Love You
      </motion.h2>

      <motion.div className="grid gap-3 sm:gap-4 w-full" variants={containerVariants}>
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex items-start space-x-3 sm:space-x-4 border border-valentine-50"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="bg-valentine-50 p-2 sm:p-3 rounded-full flex-shrink-0"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
            >
              {reason.icon}
            </motion.div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-800 text-base sm:text-lg">{reason.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button onClick={onNext} className="mt-2 sm:mt-4">
          And there's more...
        </Button>
      </motion.div>
    </motion.div>
  );
};
