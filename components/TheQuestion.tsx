import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from './Button';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface TheQuestionProps {
  onYes: () => void;
}

const PLEA_MESSAGES = [
  "Please... I can't stop smiling when I'm with you. 💔",
  "Remember our first kiss? It felt like home — please say Yes. 🥺",
  "You make every ordinary day extraordinary. Don't make this a 'no'.",
  "I put my heart into this — I hope you feel it. 😭",
  "Pretty please? I planned this just for you. 🥺",
  "I promise more hugs, more laughter, and more late-night chai together.",
  "Think about that time we laughed until we cried — choose more of that.",
  "I love you a little more every day — be my Valentine? ❤️",
  "You are my favorite person — say Yes and make my day. 💘",
  "I'll keep trying forever, but I hope today is our day. 😢",
  "If you say Yes, I'll plan something unforgettable just for you.",
  "Please don't break my heart — say you'll be mine. 🫶"
];

export const TheQuestion: React.FC<TheQuestionProps> = ({ onYes }) => {
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [yesScale, setYesScale] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { playHeartbeat, playClick } = useSoundEffects();

  const showToast = () => {
    const randomMsg = PLEA_MESSAGES[Math.floor(Math.random() * PLEA_MESSAGES.length)];
    // play a soft heartbeat for emotional effect
    try { playHeartbeat?.(); } catch (e) {}
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
    // Constrain to window bounds with some padding so it stays visible on mobile
    const paddingX = 20; // px from left/right
    const paddingY = 90; // px from top/bottom to avoid nav bars
    const btnWidth = 120; // approximate button width
    const btnHeight = 56; // approximate button height

    const maxX = Math.max(paddingX, window.innerWidth - btnWidth - paddingX);
    const maxY = Math.max(paddingY, window.innerHeight - btnHeight - paddingY);

    const x = Math.floor(Math.random() * (maxX - paddingX + 1)) + paddingX;
    const y = Math.floor(Math.random() * (maxY - paddingY + 1)) + paddingY;

    setNoButtonPos({ x, y });
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
            role="status"
            aria-live="polite"
            className="fixed top-12 sm:top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl z-[9999] font-bold text-sm sm:text-lg whitespace-nowrap border-2 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.28 }}
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

        {/* Render 'No' as a normal inline button initially. After first move, render it fixed so it cannot be clipped on small screens. */}
        {noButtonPos ? (
          <motion.button
            onClick={moveButton}
            onMouseEnter={moveButton}
            className="bg-gray-400 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-gray-500 text-base sm:text-lg z-[100]"
            style={{ position: 'fixed', left: noButtonPos.x, top: noButtonPos.y }}
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1], rotate: [0, 4, -4, 0] }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            No 😢
          </motion.button>
        ) : (
          <motion.button
            onMouseEnter={moveButton}
            onClick={moveButton}
            className="bg-gray-400 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-gray-500 text-base sm:text-lg z-20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            No 😢
          </motion.button>
        )}
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