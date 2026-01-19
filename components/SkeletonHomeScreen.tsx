
import React from 'react';

const SkeletonHomeScreen: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark pb-32 animate-pulse">
      {/* Header Skeleton */}
      <header className="px-4 py-3 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
        </div>
        <div className="flex gap-3">
          <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
        </div>
      </header>

      {/* Hero Banner Skeleton */}
      <div className="px-4 mt-4 overflow-hidden">
        <div className="w-full md:w-3/4 h-48 md:h-80 bg-zinc-200 dark:bg-zinc-800 rounded-[3rem] mx-auto"></div>
      </div>

      {/* Categories Skeleton */}
      <div className="mt-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
        </div>
        <div className="flex gap-6 md:gap-12 overflow-x-hidden justify-start md:justify-center">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="size-16 md:size-24 bg-zinc-200 dark:bg-zinc-800 rounded-3xl"></div>
              <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="mt-16 px-4">
        <div className="h-8 w-56 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-10"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className="bg-white dark:bg-zinc-900/40 p-4 rounded-[2.5rem] border border-black/5 flex flex-col gap-4">
              <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-3xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                <div className="flex justify-between items-center pt-2">
                   <div className="h-6 w-20 bg-primary/20 rounded-full"></div>
                   <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .animate-pulse {
          animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.6; filter: brightness(0.9); }
        }
      `}</style>
    </div>
  );
};

export default SkeletonHomeScreen;
