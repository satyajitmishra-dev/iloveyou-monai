import React, { useEffect } from 'react';
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
      <HeartHandshake className="w-32 h-32 text-valentine-600 animate-bounce" />
      
      <h1 className="text-5xl md:text-7xl font-script text-valentine-600">
        Yay! I knew it!
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-700 font-sans max-w-lg">
        Best Valentine's Day Ever. <br/>
        I love you so much! ❤️
      </p>

      <div className="mt-12 p-6 bg-white rounded-xl shadow-inner max-w-md">
        <p className="text-gray-500 text-sm">
          Dinner date details coming to your DMs soon... 😉
        </p>
      </div>
    </div>
  );
};
