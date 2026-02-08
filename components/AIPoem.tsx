import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { generateRomanticPoem } from '../services/geminiService';

interface AIPoemProps {
  onNext: () => void;
}

export const AIPoem: React.FC<AIPoemProps> = ({ onNext }) => {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [formData, setFormData] = useState({
    name: '',
    favoriteMemory: '',
    trait: ''
  });
  const [poem, setPoem] = useState('');

  const handleGenerate = async () => {
    if (!formData.name || !formData.favoriteMemory || !formData.trait) return;
    
    setStep('generating');
    const result = await generateRomanticPoem({
      name: formData.name,
      favoriteMemory: formData.favoriteMemory,
      trait: formData.trait
    });
    setPoem(result);
    setStep('result');
  };

  if (step === 'input') {
    return (
      <motion.div
        className="flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-script text-valentine-600 text-center mb-2 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Let's Make Some Magic
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I want to write you a poem, but I need a little help from our AI Cupid.
        </motion.p>

        <motion.div
          className="w-full space-y-3 sm:space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Your Name (or nickname)</label>
            <input 
              type="text"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-valentine-200 focus:ring-2 focus:ring-valentine-400 focus:border-transparent outline-none bg-white/80 text-gray-900 placeholder-gray-400 text-sm"
              placeholder="e.g. Cutie"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Favorite Shared Memory</label>
            <input 
              type="text"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-valentine-200 focus:ring-2 focus:ring-valentine-400 focus:border-transparent outline-none bg-white/80 text-gray-900 placeholder-gray-400 text-sm"
              placeholder="e.g. The beach trip"
              value={formData.favoriteMemory}
              onChange={(e) => setFormData({...formData, favoriteMemory: e.target.value})}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">One thing I love about you</label>
            <input 
              type="text"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-valentine-200 focus:ring-2 focus:ring-valentine-400 focus:border-transparent outline-none bg-white/80 text-gray-900 placeholder-gray-400 text-sm"
              placeholder="e.g. Your laugh"
              value={formData.trait}
              onChange={(e) => setFormData({...formData, trait: e.target.value})}
            />
          </motion.div>
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button 
            onClick={handleGenerate} 
            disabled={!formData.name || !formData.favoriteMemory || !formData.trait}
            className="w-full mt-2 sm:mt-4 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Wand2 size={18} /> Create Poem
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  if (step === 'generating') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-3 sm:space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <Sparkles className="w-12 sm:w-16 h-12 sm:h-16 text-valentine-500" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-medium text-valentine-700">Consulting Cupid...</h3>
        <p className="text-sm sm:text-base text-gray-500">Writing the perfect words for you.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-lg mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-script text-valentine-600 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        For You, {formData.name}
      </motion.h2>
      
      <motion.div
        className="bg-white/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-lg border border-valentine-100 relative w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-3 sm:text-4xl text-valentine-200 absolute top-2 left-4 font-serif">"</div>
        <motion.p
          className="text-base sm:text-lg text-gray-800 italic text-center font-serif leading-loose whitespace-pre-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {poem}
        </motion.p>
        <div className="text-3 sm:text-4xl text-valentine-200 absolute bottom-2 right-4 font-serif">"</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Button onClick={onNext} className="mt-4 sm:mt-8">
          One Last Thing...
        </Button>
      </motion.div>
    </motion.div>
  );
};