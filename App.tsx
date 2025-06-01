
import React, { useState, useEffect, useCallback } from 'react';
import { SafetyTip } from './types';
import { PREDEFINED_SAFETY_TIPS, APP_TITLE } from './constants';
import SafetyTipCard from './components/SafetyTipCard';
import RefreshIcon from './components/icons/RefreshIcon';

const App: React.FC = () => {
  const [currentTip, setCurrentTip] = useState<SafetyTip | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // For potential async operations

  const getRandomTip = useCallback(() => {
    setIsLoading(true);
    // Simulate a slight delay for a better UX, as if fetching from an API
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PREDEFINED_SAFETY_TIPS.length);
      const newTip = PREDEFINED_SAFETY_TIPS[randomIndex];
      // Ensure we don't show the same tip twice in a row if possible (for small lists)
      if (PREDEFINED_SAFETY_TIPS.length > 1 && newTip.id === currentTip?.id) {
        getRandomTip(); // Recurse to get a different tip
      } else {
        setCurrentTip(newTip);
      }
      setIsLoading(false);
    }, 300);
  }, [currentTip]); // Dependency on currentTip is okay here for the re-roll logic.

  useEffect(() => {
    // Load an initial tip when the component mounts
    getRandomTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount.

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4 selection:bg-pink-500 selection:text-white">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-pink-600 mb-2 tracking-tight">
          {APP_TITLE}
        </h1>
        <p className="text-lg text-gray-600">
          Your daily dose of wisdom for safer travels.
        </p>
      </header>

      <main className="w-full max-w-2xl mx-auto">
        <div className="mb-8 min-h-[200px] flex items-center">
          {isLoading && !currentTip ? (
             <div className="w-full bg-white shadow-xl rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <p className="text-gray-500 text-lg animate-pulse">Loading your first tip...</p>
             </div>
          ) : (
            <SafetyTipCard tip={currentTip} />
          )}
        </div>

        <div className="text-center">
          <button
            onClick={getRandomTip}
            disabled={isLoading}
            className={`
              px-8 py-4 bg-pink-600 text-white font-semibold rounded-lg shadow-md 
              hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 
              transition-all duration-150 ease-in-out transform hover:scale-105
              disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none
              flex items-center justify-center mx-auto group
            `}
          >
            <RefreshIcon className={`w-5 h-5 mr-2 transition-transform duration-500 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            {isLoading ? 'Getting Tip...' : 'Get New Safety Tip'}
          </button>
        </div>
      </main>

      <footer className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Stay safe & explore confidently.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Platform Concept for Women's Safety
        </p>
      </footer>
    </div>
  );
};

export default App;
