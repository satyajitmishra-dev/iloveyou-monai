import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from './Button';

interface TheQuestionProps {
  onYes: () => void;
}

const PLEA_MESSAGES = [
  "No? My heart is breaking! 💔",
  "But I made this website for you! 🥺",
  "Don't do this to me...",
  "I'll cry if you click no... 😭",
  "Pretty please? 🥺",
  "Error: 'No' is not an option! 🚫",
  "Think about our memories... 💭",
  "Just click Yes already! ❤️",
  "You're breaking my heart! 💘",
  "I'm gonna tell your mom! 😠",
  "Are you really sure? 😢",
  "Don't be mean... 😿"
];

export const TheQuestion: React.FC<TheQuestionProps> = ({ onYes }) => {
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [yesScale, setYesScale] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = () => {
    const randomMsg = PLEA_MESSAGES[Math.floor(Math.random() * PLEA_MESSAGES.length)];
    setToastMessage(randomMsg);
    // Auto hide after 2 seconds
    setTimeout(() => setToastMessage(null), 2000);
  };

  const moveButton = () => {
    // Show toast
    showToast();

    // Make the yes button bigger every time they try to click no
    setYesScale(prev => Math.min(prev + 0.15, 2.5));

    // Move the no button randomly
    // Constrain to window bounds with some padding
    const x = Math.random() * (window.innerWidth - 100); 
    const y = Math.random() * (window.innerHeight - 100);
    
    setNoButtonPos({
      x: Math.max(10, x),
      y: Math.max(20, y),
    });
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-8 sm:space-y-12 text-center min-h-[50vh] relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="fixed top-20 sm:top-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl z-[60] font-bold text-sm sm:text-lg whitespace-nowrap border-2 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart className="w-24 sm:w-32 h-24 sm:h-32 text-red-500 fill-red-200 drop-shadow-xl" />
      </motion.div>

      <motion.h1
        className="text-3xl sm:text-4xl md:text-6xl font-script text-valentine-700 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Will you be my Valentine?
      </motion.h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-6 sm:mt-8 relative">
        <motion.button
          onClick={onYes}
          className="bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 px-6 sm:px-12 py-2 sm:py-3 text-base sm:text-lg z-10 w-32 sm:w-auto"
          style={{
            transform: `scale(${yesScale})`,
            transformOrigin: 'center',
          }}
          whileHover={{ scale: yesScale * 1.05 }}
          whileTap={{ scale: yesScale * 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          YES! ❤️
        </motion.button>

        <motion.button
          onMouseEnter={moveButton}
          onClick={moveButton}
          className="bg-gray-400 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-gray-500 text-base sm:text-lg z-20"
          animate={noButtonPos ? { x: noButtonPos.x, y: noButtonPos.y } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          layout
        >
          No 😢
        </motion.button>
      </div>
      
      <AnimatePresence>
        {yesScale > 1.2 && (
          <motion.p
            className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            (You know you want to click Yes!)
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};