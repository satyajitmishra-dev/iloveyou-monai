import React from 'react';
import { Smile, Sun, Coffee } from 'lucide-react';
import { Button } from './Button';

interface ReasonsProps {
  onNext: () => void;
}

export const Reasons: React.FC<ReasonsProps> = ({ onNext }) => {
  const reasons = [
    {
      icon: <Smile className="w-8 h-8 text-yellow-500" />,
      title: "Your Smile",
      desc: "It literally lights up my entire world whenever you walk into the room."
    },
    {
      icon: <Sun className="w-8 h-8 text-orange-500" />,
      title: "Your Warmth",
      desc: "You have the kindest heart I've ever known."
    },
    {
      icon: <Coffee className="w-8 h-8 text-brown-500" />,
      title: "Our Moments",
      desc: "Even doing nothing with you is my favorite thing to do."
    }
  ];

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-xl mx-auto">
      <h2 className="text-3xl font-script text-valentine-600 text-center">
        Why I Love You
      </h2>

      <div className="grid gap-4 w-full">
        {reasons.map((reason, idx) => (
          <div 
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg border border-valentine-50"
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <div className="bg-valentine-50 p-3 rounded-full">
              {reason.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{reason.title}</h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onNext} className="mt-4">
        And there's more...
      </Button>
    </div>
  );
};
