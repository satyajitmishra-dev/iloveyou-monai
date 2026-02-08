import React from 'react';
import { AppStep } from '../types';
import { motion } from 'framer-motion';

interface ProgressProps {
  currentStep: AppStep;
}

const STEPS = [
  { key: AppStep.WELCOME, label: 'Welcome', number: 1 },
  { key: AppStep.VALENTINES_WEEK, label: 'Valentine\'s Week', number: 2 },
  { key: AppStep.MEMORIES, label: 'Memories', number: 3 },
  { key: AppStep.REASONS, label: 'Reasons', number: 4 },
  { key: AppStep.AI_POEM, label: 'Poem', number: 5 },
  { key: AppStep.THE_QUESTION, label: 'Question', number: 6 },
  { key: AppStep.SUCCESS, label: 'Success', number: 7 },
];

export const Progress: React.FC<ProgressProps> = ({ currentStep }) => {
  const currentIndex = STEPS.findIndex(step => step.key === currentStep);

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-40 py-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Stepper */}
        <div className="hidden md:flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  index <= currentIndex
                    ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
                animate={{
                  scale: index === currentIndex ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {step.number}
              </motion.div>
              <motion.p
                className={`text-xs mt-2 text-center transition-colors ${
                  index <= currentIndex ? 'text-rose-500' : 'text-gray-400'
                }`}
                animate={{ opacity: index <= currentIndex ? 1 : 0.5 }}
              >
                {step.label}
              </motion.p>

              {index < STEPS.length - 1 && (
                <div className="absolute w-full h-1 bg-gray-200 top-5 left-1/2 translate-y-0 -z-10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{
                      width: index < currentIndex ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-rose-500">
              {STEPS[currentIndex]?.label}
            </span>
            <span className="text-xs text-gray-500">
              {currentIndex + 1} of {STEPS.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentIndex + 1) / STEPS.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
