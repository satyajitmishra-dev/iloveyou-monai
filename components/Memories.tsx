import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, RotateCcw, Hand } from 'lucide-react';
import { Button } from './Button';
import { Memory } from '../types';

interface MemoriesProps {
  onNext: () => void;
}

const MEMORIES_DATA: Memory[] = [
  { id: 1, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568333/IMG-20241003-WA0020_u3lvtt.jpg', caption: "Remember our first adventure?" },
  { id: 2, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568334/IMG_20250518_175140_ikslhq.jpg', caption: "That time we couldn't stop laughing..." },
  { id: 3, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770570193/IMG_20251118_131906_hi0kjr.jpg', caption: "Just a random perfect day with you." },
  { id: 4, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568334/IMG-20241001-WA0047_nqid3h.jpg', caption: "The way you looked at me here..." },
  { id: 5, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568332/IMG_20250918_135746_chnpse.jpg', caption: "One of my absolute favorite photos of us." },
  { id: 6, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568330/IMG_20250911_115350_yaa8gm.jpg', caption: "Can't wait to make more memories like this." },
  { id: 7, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1761835752/chat-app/avatars/h8td23yypvc87r7kcqf9.jpg', caption: "You light up every room." },
  { id: 8, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568333/IMG_20241221_195618_iyhgeg.jpg', caption: "My favorite travel buddy." },
  { id: 9, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568333/IMG_20250517_172213_ohlllv.jpg', caption: "Simple moments are the best moments." },
  { id: 10, imageUrl: 'https://res.cloudinary.com/satyajitserver/image/upload/v1770568326/IMG_20240110_150955_qmcdx6.jpg', caption: "Forever grateful for you." },
];

export const Memories: React.FC<MemoriesProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMORIES_DATA.length);
  };
  
  const handleReset = () => {
      setCurrentIndex(0);
  };

  // Swipe logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      handleNextCard();
    }
  };

  const VISIBLE_COUNT = 3;
  
  const stackItems = Array.from({ length: VISIBLE_COUNT }).map((_, i) => {
      const offset = i; 
      const index = (currentIndex + offset) % MEMORIES_DATA.length;
      return { 
          ...MEMORIES_DATA[index], 
          offset,
          key: `${MEMORIES_DATA[index].id}` 
      };
  }).reverse();

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full max-w-lg mx-auto min-h-[60vh] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-script text-valentine-600 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Memories
      </motion.h2>
      
      {/* Card Stack Container */}
      <div 
        className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] mb-8 sm:mb-12 perspective-1000"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {stackItems.map((item) => {
           const isFront = item.offset === 0;
           
           const translateY = item.offset * 15; 
           const scale = 1 - (item.offset * 0.05); 
           const zIndex = VISIBLE_COUNT - item.offset;
           const opacity = 1 - (item.offset * 0.15); 
           const rotation = isFront ? 0 : (item.offset % 2 === 0 ? 2 : -2); 

           return (
             <motion.div
               key={item.key}
               onClick={isFront ? handleNextCard : undefined}
               className={`absolute top-0 left-0 w-full h-full origin-bottom
                 ${isFront ? 'cursor-pointer' : ''}`}
               animate={{
                 y: translateY,
                 scale,
                 rotate: rotation,
                 opacity,
                 zIndex,
               }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
               whileHover={isFront ? { y: translateY - 8 } : {}}
             >
                {/* Polaroid Frame */}
                <div className="w-full h-full bg-white p-3 sm:p-4 pb-16 sm:pb-20 shadow-xl rounded-sm border border-gray-200 flex flex-col">
                    <div className="flex-grow w-full relative overflow-hidden bg-gray-50 border border-gray-100">
                        <img 
                            src={item.imageUrl} 
                            alt="Memory" 
                            className="w-full h-full object-cover pointer-events-none select-none" 
                        />
                    </div>
                    {/* Caption Area */}
                    <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 flex items-center justify-center px-2 sm:px-4">
                        <p className="font-script text-lg sm:text-2xl text-gray-700 text-center leading-tight">
                            {item.caption}
                        </p>
                    </div>
                </div>
             </motion.div>
           );
        })}
      </div>

      {/* Controls */}
      <motion.div
        className="flex flex-col items-center space-y-4 sm:space-y-5 z-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
         <motion.p
           className="text-valentine-400 text-xs sm:text-sm font-medium flex items-center gap-2"
           animate={{ opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 1.5, repeat: Infinity }}
         >
            <Hand size={16} /> Tap or Swipe to see next
         </motion.p>
         
         <div className="flex gap-3 sm:gap-4 w-full">
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
               <Button onClick={handleReset} variant="secondary" className="w-full min-w-[96px] px-2 sm:px-4 py-2 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                   <RotateCcw size={16} />
                   <span className="text-valentine-600">Replay</span>
               </Button>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
               <Button onClick={onNext} className="w-full px-2 sm:px-4 py-2 text-xs sm:text-base">
                   Continue <ChevronRight className="inline ml-1 w-3 sm:w-4 h-3 sm:h-4" />
               </Button>
             </motion.div>
         </div>
      </motion.div>
    </motion.div>
  );
};