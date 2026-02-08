import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from './Button';

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
      <div className="relative">
        <Heart className="w-24 h-24 text-valentine-500 animate-heartbeat fill-valentine-200" />
        <div className="absolute top-0 left-0 w-full h-full animate-ping opacity-20 bg-valentine-400 rounded-full" />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-script text-valentine-600">
          Hey, Beautiful...
        </h1>
        <p className="text-lg text-gray-600 font-sans max-w-md mx-auto">
          I made something special just for you. <br/>
          Are you ready to see it?
        </p>
      </div>

      <Button onClick={onNext} className="text-xl px-12 py-4 mt-8">
        Start The Surprise ✨
      </Button>
    </div>
  );
};
