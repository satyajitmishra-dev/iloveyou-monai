import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HeartHandshake } from 'lucide-react';

export const Success: React.FC = () => {
  useEffect(() => {
    // Fire confetti immediately
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'backOut' },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 sm:space-y-6 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <HeartHandshake className="w-24 sm:w-32 h-24 sm:h-32 text-valentine-600" />
        </motion.div>
      </motion.div>
      
      <motion.h1
        className="text-4xl sm:text-5xl md:text-7xl font-script text-valentine-600"
        variants={itemVariants}
      >
        Yay! I knew it!
      </motion.h1>
      
      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-gray-700 font-sans max-w-lg"
        variants={itemVariants}
      >
        Best Valentine's Day Ever. <br className="hidden sm:block" />
        I love you so much! ❤️
      </motion.p>

      <motion.div
        className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white rounded-xl shadow-inner max-w-md w-full"
        variants={itemVariants}
      >
        <p className="text-gray-500 text-xs sm:text-sm">
          Dinner date details coming to your DMs soon... 😉
        </p>
      </motion.div>
    </motion.div>
  );
};
