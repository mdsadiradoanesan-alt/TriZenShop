
import React from 'react';

const SkeletonHomeScreen: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark pb-32 animate-pulse pt-2 md:pt-6">
      {/* Header Skeleton */}
      <header className="px-4 py-3 md:py-5 flex items-center justify-between mx-2 md:mx-0">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
        </div>
        <div className="flex gap-3">
          <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
        </div>
      </header>

      {/* Search Bar Skeleton */}
      <div className="px-4 mt-4 md:hidden">
         <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
      </div>

      {/* Banner Skeleton */}
      <div className="px-4 mt-4 overflow-hidden">
        <div className="flex gap-3">
           <div className="w-[85%] md:w-[300px] h-36 md:h-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl shrink-0"></div>
           <div className="w-[85%] md:w-[300px] h-36 md:h-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl shrink-0 opacity-50"></div>
        </div>
      </div>

      {/* Tools Skeleton */}
      <div className="mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-[150px] h-48 bg-zinc-200 dark:bg-zinc-800 rounded-[2rem] shrink-0"></div>
          ))}
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="mt-8 px-4">
         <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6"></div>
         <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
               <div key={i} className="flex flex-col items-center gap-2">
                  <div className="size-16 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div>
                  <div className="h-2 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
               </div>
            ))}
         </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="mt-10 px-4">
        <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-[2.5rem]"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonHomeScreen;