
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';

// Added missing prop types for onToggleWishlist and wishlist to resolve TypeScript error in App.tsx
interface SearchResultsScreenProps {
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({ onToggleWishlist, wishlist }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const recentSearches = ['পাঞ্জাবি', 'মোবাইল ফোন', 'হেডফোন'];
  const trendingSearches = ['শার্ট', 'স্মার্টওয়াচ', 'জুতো', 'বই', 'ল্যাপটপ', 'ব্যাগ', 'শাড়ি'];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-50 bg-background-light dark:bg-background-dark px-4 pt-6 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#0d1b12] dark:text-white">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <h2 className="text-xl font-bold leading-tight tracking-tight">সার্চ</h2>
          </div>
          <button onClick={() => setSearchTerm('')} className="text-primary font-bold">বাতিল</button>
        </div>
        
        <div className="pb-2">
          <div className="flex w-full h-12 items-stretch rounded-xl shadow-sm border border-black/5 dark:border-white/5 overflow-hidden">
            <div className="text-[#4c9a66] dark:text-primary flex bg-white dark:bg-[#1a2e21] items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              autoFocus
              className="w-full bg-white dark:bg-[#1a2e21] border-none focus:ring-0 text-[#0d1b12] dark:text-white px-3 text-base" 
              placeholder="পণ্য খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className="flex items-center justify-center bg-white dark:bg-[#1a2e21] pr-2">
                <button onClick={() => setSearchTerm('')} className="text-[#4c9a66]"><span className="material-symbols-outlined">cancel</span></button>
              </div>
            )}
            <div className="flex items-center justify-center rounded-r-xl bg-white dark:bg-[#1a2e21] pr-4 border-l border-gray-100 dark:border-gray-800">
              <button className="text-[#0d1b12] dark:text-primary"><span className="material-symbols-outlined">mic</span></button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto w-full overflow-y-auto no-scrollbar">
        {!searchTerm ? (
          <>
            {/* Recent Search */}
            <div className="pt-6">
              <div className="flex items-center justify-between px-4 pb-2">
                <h3 className="text-[#0d1b12] dark:text-white text-lg font-bold leading-tight tracking-tight">সাম্প্রতিক সার্চ</h3>
                <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">সব মুছুন</button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((s) => (
                  <div 
                    key={s} 
                    onClick={() => setSearchTerm(s)}
                    className="flex items-center gap-4 px-4 min-h-14 justify-between active:bg-primary/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                        <span className="material-symbols-outlined">history</span>
                      </div>
                      <p className="text-[#0d1b12] dark:text-white/90 text-base font-medium flex-1 truncate">{s}</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 flex size-8 items-center justify-center rounded-full hover:bg-red-50">
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Section */}
            <div className="pt-8 px-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-orange-500">trending_up</span>
                <h3 className="text-[#0d1b12] dark:text-white text-lg font-bold leading-tight tracking-tight">ট্রেন্ডিং সার্চ</h3>
              </div>
              <div className="flex flex-wrap gap-2 pb-10">
                {trendingSearches.map(t => (
                  <button 
                    key={t}
                    onClick={() => setSearchTerm(t)}
                    className="px-4 py-2 bg-white dark:bg-[#1a2e21] border border-gray-200 dark:border-primary/20 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div className="px-4 pb-20">
              <h3 className="text-[#0d1b12] dark:text-white text-lg font-bold mb-4">জনপ্রিয় ক্যাটাগরি</h3>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.slice(0, 2).map((cat, idx) => (
                  <div key={cat.id} className={`relative overflow-hidden h-24 rounded-xl flex flex-col items-center justify-center p-4 border transition-transform active:scale-95 cursor-pointer ${idx === 0 ? 'bg-primary/20 border-primary/10' : 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'}`}>
                    <span className={`material-symbols-outlined text-3xl mb-1 ${idx === 0 ? 'text-primary' : 'text-blue-500'}`}>{cat.icon}</span>
                    <span className="font-bold text-sm">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4">
            {PRODUCTS.filter(p => p.name.includes(searchTerm)).map(product => {
              // Functional wishlist heart logic added for consistency and correctness
              const isLiked = wishlist.includes(product.id);
              return (
                <div key={product.id} className="bg-white dark:bg-zinc-900 rounded-xl p-2 border border-black/5 dark:border-white/5 relative" onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.image} alt="" className="aspect-square w-full rounded-lg object-cover mb-2" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <span className={`material-symbols-outlined text-lg ${isLiked ? 'text-red-500 material-symbols-fill' : 'text-gray-400'}`}>favorite</span>
                  </button>
                  <h4 className="text-sm font-bold truncate">{product.name}</h4>
                  <p className="text-primary font-bold">৳ {product.price}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 flex justify-center z-50">
        <button className="w-full max-w-sm h-12 bg-primary text-background-dark font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">search</span>
          অনুসন্ধান করুন
        </button>
      </div>
    </div>
  );
};

export default SearchResultsScreen;
