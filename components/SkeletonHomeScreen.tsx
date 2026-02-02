
import React from 'react';

const SkeletonHomeScreen: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#050505] pb-32 animate-pulse pt-6">
      
      {/* Header Skeleton */}
      <div className="mx-2 md:mx-auto max-w-[1600px] mb-8 px-2 md:px-6">
        <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="size-8 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
             <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          </div>
          <div className="flex gap-2">
             <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
             <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 space-y-10">
        
        {/* Bento Grid Skeleton - Reduced Height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 h-auto md:h-64">
           <div className="md:col-span-2 md:row-span-2 bg-zinc-200 dark:bg-zinc-900 rounded-[1.5rem] h-40 md:h-full"></div>
           <div className="hidden md:flex flex-col gap-3 md:gap-4 h-full">
              <div className="flex-1 bg-zinc-200 dark:bg-zinc-900 rounded-[1.5rem]"></div>
              <div className="flex-1 bg-zinc-200 dark:bg-zinc-900 rounded-[1.5rem]"></div>
           </div>
        </div>

        {/* Digital Tools Skeleton - Grid Layout */}
        <div>
           <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-900 rounded-full"></div>
              <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-900 rounded-full"></div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                 <div key={i}>
                    <div className="aspect-square bg-zinc-200 dark:bg-zinc-900 rounded-[1.5rem] mb-3"></div>
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-900 rounded-full mb-2"></div>
                    <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-900 rounded-full"></div>
                 </div>
              ))}
           </div>
        </div>

        {/* Categories Pills Skeleton */}
        <div className="flex gap-2 overflow-hidden">
           {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-10 w-28 bg-zinc-200 dark:bg-zinc-900 rounded-xl shrink-0"></div>
           ))}
        </div>

        {/* Physical Products Grid Skeleton */}
        <div>
           <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-900 rounded-full mb-6"></div>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                 <div key={i}>
                    <div className="aspect-square bg-zinc-200 dark:bg-zinc-900 rounded-[1.5rem] mb-3"></div>
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-900 rounded-full mb-2"></div>
                    <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-900 rounded-full"></div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default SkeletonHomeScreen;
