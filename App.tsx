import React, { useState, useEffect, useRef } from 'react';
import { AppStep } from './types';
import { Welcome } from './components/Welcome';
import { ValentinesWeek } from './components/ValentinesWeek';
import { Memories } from './components/Memories';
import { Reasons } from './components/Reasons';
import { AIPoem } from './components/AIPoem';
import { TheQuestion } from './components/TheQuestion';
import { Success } from './components/Success';
import { Music, Volume2, VolumeX } from 'lucide-react';

// Romantic background music - Chopin's Nocturne Op. 9 No. 2
const MUSIC_URL = "/bg.mp3";

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.WELCOME);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Try to play immediately (might be blocked, but worth a try)
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Autoplay prevented. Music will start on user interaction."));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleStart = () => {
    // Attempt to play music on first interaction (browser policy)
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log("Auto-play blocked, waiting for manual toggle", e);
      });
    }
    setCurrentStep(AppStep.VALENTINES_WEEK);
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.WELCOME:
        return <Welcome onNext={handleStart} />;
      case AppStep.VALENTINES_WEEK:
        return <ValentinesWeek onNext={() => setCurrentStep(AppStep.MEMORIES)} />;
      case AppStep.MEMORIES:
        return <Memories onNext={() => setCurrentStep(AppStep.REASONS)} />;
      case AppStep.REASONS:
        return <Reasons onNext={() => setCurrentStep(AppStep.AI_POEM)} />;
      case AppStep.AI_POEM:
        return <AIPoem onNext={() => setCurrentStep(AppStep.THE_QUESTION)} />;
      case AppStep.THE_QUESTION:
        return <TheQuestion onYes={() => setCurrentStep(AppStep.SUCCESS)} />;
      case AppStep.SUCCESS:
        return <Success />;
      default:
        return <Welcome onNext={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-50 via-pink-100 to-valentine-200 flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-valentine-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute top-20 right-20 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Container */}
      <main className="z-10 w-full max-w-4xl px-4 py-8 md:py-16 min-h-screen flex flex-col">
        {/* Progress Dots (Hidden on Welcome/Success) */}
        {currentStep !== AppStep.WELCOME && currentStep !== AppStep.SUCCESS && (
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {Object.values(AppStep).filter(s => s !== AppStep.WELCOME && s !== AppStep.SUCCESS).map((step, idx) => (
              <div 
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  Object.values(AppStep).indexOf(currentStep) >= Object.values(AppStep).indexOf(step)
                    ? 'w-6 md:w-8 bg-valentine-600'
                    : 'w-2 bg-valentine-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-grow flex items-center justify-center">
          {renderStep()}
        </div>
      </main>

      {/* Floating Music Control */}
      <button 
        onClick={toggleMusic}
        className={`fixed bottom-12 right-4 md:bottom-8 md:right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-valentine-500 text-white animate-pulse shadow-valentine-400/50' 
            : 'bg-white text-gray-400 hover:text-valentine-500'
        }`}
        title={isPlaying ? "Pause Music" : "Play Romantic Music"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <footer className="fixed bottom-2 w-full text-center text-valentine-800/60 text-xs font-sans pointer-events-none pb-2">
        Made with ❤️ by your dear husbie
      </footer>
    </div>
  );
};

export default App;