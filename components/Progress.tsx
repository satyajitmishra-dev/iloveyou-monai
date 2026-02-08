import React from 'react';
import { AppStep } from '../types';
import { motion } from 'framer-motion';
import { Heart, Gift, Sparkles, Zap, Pen, HelpCircle, Trophy } from 'lucide-react';

interface ProgressProps {
  currentStep: AppStep;
}

const STEPS: Array<{ key: AppStep; label: string; number: number; icon: any }> = [
  { key: AppStep.WELCOME, label: 'Welcome', number: 1, icon: Heart },
  { key: AppStep.VALENTINES_WEEK, label: "Valentine's Week", number: 2, icon: Gift },
  { key: AppStep.MEMORIES, label: 'Memories', number: 3, icon: Sparkles },
  { key: AppStep.REASONS, label: 'Reasons', number: 4, icon: Zap },
  { key: AppStep.AI_POEM, label: 'Poem', number: 5, icon: Pen },
  { key: AppStep.THE_QUESTION, label: 'Question', number: 6, icon: HelpCircle },
  { key: AppStep.SUCCESS, label: 'Success', number: 7, icon: Trophy },
];

export const Progress: React.FC<ProgressProps> = ({ currentStep }) => {
  const currentIndex = STEPS.findIndex(step => step.key === currentStep);

  return (
    <motion.div
      className="w-full bg-white/95 backdrop-blur-md border-b-2 border-rose-200 sticky top-0 z-40 py-3 shadow-sm"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Stepper */}
        <div className="hidden md:flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const done = index <= currentIndex;
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center relative">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${done ? 'text-white' : 'text-gray-400'}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: index === currentIndex ? 1.08 : 1 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: done ? undefined : undefined,
                  }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? 'bg-gradient-to-r from-rose-400 to-pink-500' : 'bg-gray-100'}`}>
                    <Icon size={14} />
                  </div>
                </motion.div>

                <motion.p
                  className={`text-xs mt-2 text-center ${done ? 'text-rose-500' : 'text-gray-400'}`}
                  animate={{ opacity: done ? 1 : 0.6 }}
                >
                  {step.label}
                </motion.p>

                {index < STEPS.length - 1 && (
                  <div className="absolute left-1/2 top-5 w-full -translate-x-1/2 -z-10">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
                        initial={{ width: '0%' }}
                        animate={{ width: index < currentIndex ? '100%' : index === currentIndex ? '50%' : '0%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-rose-500">{STEPS[currentIndex]?.label}</span>
            <span className="text-xs text-gray-500">{currentIndex + 1} of {STEPS.length}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Progress;
