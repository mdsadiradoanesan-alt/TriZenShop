
import React from 'react';

const SkeletonHomeScreen: React.FC = () => {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-background-light dark:bg-background-dark shadow-2xl relative flex flex-col">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
      </header>

      <div className="px-4 py-2">
        <div className="relative w-full h-12 flex items-center bg-gray-200/50 dark:bg-gray-800/50 rounded-xl px-4 animate-pulse">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>

      <div className="flex gap-3 px-4 py-4 overflow-x-hidden">
        {[64, 96, 80, 112].map((w, i) => (
          <div key={i} className={`h-9 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0 animate-pulse`} style={{ width: w }}></div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-24">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
              <div className="h-5 w-1/3 bg-primary/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
};

export default SkeletonHomeScreen;
