import React, { useState } from 'react';
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
      <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto">
        <h2 className="text-3xl font-script text-valentine-600 text-center mb-4">
          Let's Make Some Magic
        </h2>
        <p className="text-gray-600 text-center mb-6">
          I want to write you a poem, but I need a little help from our AI Cupid.
        </p>

        <div className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (or nickname)</label>
            <input 
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-valentine-200 focus:ring-2 focus:ring-valentine-400 focus:border-transparent outline-none bg-white/80 text-gray-900 placeholder-gray-400"
              placeholder="e.g. Cutie"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Shared Memory</label>
            <input 
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-valentine-200 focus:ring-2 focus:ring-valentine-400 focus:border-transparent outline-none bg-white/80 text-gray-900 placeholder-gray-400"
              placeholder="e.g. The beach trip"
              value={formData.favoriteMemory}
              onChange={(e) => setFormData({...formData, favoriteMemory: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">One thing I love about you</label>
            <input 
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-valentine-200 focus:ring-2 focus:ring-valentine-400 focus:border-transparent outline-none bg-white/80 text-gray-900 placeholder-gray-400"
              placeholder="e.g. Your laugh"
              value={formData.trait}
              onChange={(e) => setFormData({...formData, trait: e.target.value})}
            />
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={!formData.name || !formData.favoriteMemory || !formData.trait}
          className="w-full mt-4 flex items-center justify-center gap-2"
        >
          <Wand2 size={18} /> Create Poem
        </Button>
      </div>
    );
  }

  if (step === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
        <Sparkles className="w-16 h-16 text-valentine-500 animate-spin" />
        <h3 className="text-xl font-medium text-valentine-700">Consulting Cupid...</h3>
        <p className="text-gray-500">Writing the perfect words for you.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-script text-valentine-600 text-center">
        For You, {formData.name}
      </h2>
      
      <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-valentine-100 relative">
        <div className="text-4xl text-valentine-200 absolute top-2 left-4 font-serif">"</div>
        <p className="text-lg text-gray-800 italic text-center font-serif leading-loose whitespace-pre-wrap">
          {poem}
        </p>
        <div className="text-4xl text-valentine-200 absolute bottom-2 right-4 font-serif">"</div>
      </div>

      <Button onClick={onNext} className="mt-8">
        One Last Thing...
      </Button>
    </div>
  );
};