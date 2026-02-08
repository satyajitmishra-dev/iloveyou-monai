import React, { useState, useRef } from 'react';
import { ChevronRight, RotateCcw, Hand } from 'lucide-react';
import { Button } from './Button';

interface ValentinesWeekProps {
  onNext: () => void;
}

const WEEK_DATA = [
  { 
    day: "Rose Day", 
    date: "Feb 7", 
    quote: "Like a rose, my love for you blooms more beautiful every single day.",
    // Placeholder for cute cat image - replace with your sweet couple cat images!
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1770570708/IMG_20251118_130313_cgeyk1.jpg" 
  },
  { 
    day: "Propose Day", 
    date: "Feb 8", 
    quote: "I don't need a special day to choose you, but today I'm asking you to be mine forever.",
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1770570193/IMG_20251118_131906_hi0kjr.jpg"
  },
  { 
    day: "Chocolate Day", 
    date: "Feb 9", 
    quote: "You are sweeter than any chocolate in this world. Life with you is a treat.",
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1761835752/chat-app/avatars/h8td23yypvc87r7kcqf9.jpg"
  },
  { 
    day: "Teddy Day", 
    date: "Feb 10", 
    quote: "Sending you a big bear hug! I'm ready to be your teddy bear for life.",
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1770570705/IMG_20250925_164023_vxeqfo.jpg"
  },
  { 
    day: "Promise Day", 
    date: "Feb 11", 
    quote: "I promise to stick by your side, through all the ups, downs, and lazy Sundays.",
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1770568326/IMG_20240110_150955_qmcdx6.jpg"
  },
  { 
    day: "Hug Day", 
    date: "Feb 12", 
    quote: "My favorite place in the entire world is wrapped up in your arms.",
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1770570704/IMG_20250323_181334_crrzuc.jpg"
  },
  { 
    day: "Kiss Day", 
    date: "Feb 13", 
    quote: "A kiss to seal our bond, today and always.",
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1770570703/IMG_20250925_125816_fj98qv.jpg"
  },
  { 
    day: "Valentine's Day", 
    date: "Feb 14", 
    quote: "Of all the people in the world, I'm so glad you're my Valentine.",
    imageUrl: "https://res.cloudinary.com/satyajitserver/image/upload/v1770568333/IMG-20241003-WA0020_u3lvtt.jpg"
  }
];

export const ValentinesWeek: React.FC<ValentinesWeekProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  const handleNextCard = () => {
    if (currentIndex < WEEK_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // If we are at the end, maybe loop or just do nothing? 
      // User likely wants to proceed after seeing all.
      // Let's loop for fun or stay at end. 
      // Let's loop.
      setCurrentIndex(0);
    }
  };

  const handleReset = () => {
      setCurrentIndex(0);
  };

  // Stack logic
  const VISIBLE_COUNT = 3;
  const stackItems = Array.from({ length: VISIBLE_COUNT }).map((_, i) => {
      const offset = i; 
      const index = (currentIndex + offset) % WEEK_DATA.length;
      return { 
          ...WEEK_DATA[index], 
          offset,
          key: `${WEEK_DATA[index].day}-${index}` 
      };
  }).reverse();

  // Progress logic
  const isLastSlide = currentIndex === WEEK_DATA.length - 1;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto min-h-[70vh] px-4">
      <h2 className="text-3xl font-script text-valentine-600 mb-2 animate-fade-in">The Week of Love</h2>
      <p className="text-gray-500 mb-8 text-sm">Counting down the days to you...</p>
      
      {/* Card Stack Container */}
      <div 
        className="relative w-full max-w-[320px] aspect-[3/4.5] mb-8 perspective-1000"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {stackItems.map((item) => {
           const isFront = item.offset === 0;
           
           // Stack Styles
           const translateY = item.offset * 12; 
           const scale = 1 - (item.offset * 0.05);
           const zIndex = VISIBLE_COUNT - item.offset;
           const opacity = 1 - (item.offset * 0.2); 
           const rotation = isFront ? 0 : (item.offset % 2 === 0 ? 3 : -3);

           return (
             <div
               key={item.key}
               onClick={isFront ? handleNextCard : undefined}
               className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out origin-bottom
                 ${isFront ? 'cursor-pointer hover:-translate-y-2' : ''}`}
               style={{
                 zIndex,
                 transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
                 opacity
               }}
             >
                {/* Card Content */}
                <div className="w-full h-full bg-white rounded-2xl shadow-xl border-4 border-valentine-100 overflow-hidden flex flex-col relative">
                    
                    {/* Day Badge */}
                    <div className="absolute top-4 right-4 bg-valentine-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md">
                      {item.date}
                    </div>

                    {/* Image Area */}
                    <div className="h-[60%] w-full bg-valentine-50 overflow-hidden">
                        <img 
                            src={item.imageUrl} 
                            alt={item.day} 
                            className="w-full h-full object-cover pointer-events-none" 
                        />
                    </div>
                    
                    {/* Text Area */}
                    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center bg-white">
                        <h3 className="font-script text-3xl text-valentine-600 mb-2">{item.day}</h3>
                        <p className="font-sans text-gray-600 text-sm leading-relaxed">
                            "{item.quote}"
                        </p>
                    </div>

                    {/* Cat Decoration (simulated) */}
                    <div className="absolute bottom-2 right-2 text-2xl opacity-50">
                       🐾
                    </div>
                </div>
             </div>
           );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-5 z-10 w-full">
         {!isLastSlide ? (
            <div className="flex items-center text-valentine-400 text-sm font-medium animate-pulse gap-2">
                <Hand size={16} /> Swipe or Tap to see next
            </div>
         ) : (
            <div className="h-5"></div>
         )}
         
         <div className="flex gap-4">
             <Button onClick={handleReset} variant="secondary" className="px-4 py-2 text-sm">
                 <RotateCcw size={18} />
             </Button>
             <Button onClick={onNext} className="px-8 shadow-valentine-400/40">
                Continue Journey <ChevronRight className="inline ml-1 w-4 h-4" />
             </Button>
         </div>
      </div>
    </div>
  );
};