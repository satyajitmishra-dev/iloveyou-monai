import React, { useState } from 'react';
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
  const [noButtonPos, setNoButtonPos] = useState<React.CSSProperties>({ top: 'auto', left: 'auto', position: 'static' });
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
    setYesScale(prev => Math.min(prev + 0.2, 2.5));

    // Move the no button randomly
    // Constrain to window bounds with some padding
    const x = Math.random() * (window.innerWidth - 120); 
    const y = Math.random() * (window.innerHeight - 80);
    
    setNoButtonPos({
      position: 'fixed',
      top: `${Math.max(20, y)}px`, // Avoid very top
      left: `${Math.max(10, x)}px`,
      transition: 'all 0.2s ease',
      zIndex: 50
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 text-center min-h-[50vh] relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-xl z-[60] animate-bounce font-bold text-lg whitespace-nowrap border-2 border-white">
          {toastMessage}
        </div>
      )}

      <div className="relative">
         <Heart className="w-32 h-32 text-red-500 animate-heartbeat fill-red-200 drop-shadow-xl" />
      </div>

      <h1 className="text-4xl md:text-6xl font-script text-valentine-700 leading-tight">
        Will you be my Valentine?
      </h1>

      <div className="flex items-center gap-8 mt-8">
        <button
          onClick={onYes}
          className="bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-all z-10"
          style={{
            transform: `scale(${yesScale})`,
            padding: '1rem 3rem',
            fontSize: '1.25rem'
          }}
        >
          YES! ❤️
        </button>

        <button
          onMouseEnter={moveButton}
          onClick={moveButton} // Handle tap on mobile
          className="bg-gray-400 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-500 transition-all z-20"
          style={noButtonPos}
        >
          No 😢
        </button>
      </div>
      
      {yesScale > 1.2 && (
        <p className="text-sm text-gray-500 animate-bounce mt-4">
          (You know you want to click Yes!)
        </p>
      )}
    </div>
  );
};