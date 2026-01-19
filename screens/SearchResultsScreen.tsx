
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';

interface SearchResultsScreenProps {
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({ onToggleWishlist, wishlist }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  const searchQuery = searchParams.get('q');

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');

  useEffect(() => {
    async function fetchFilteredProducts() {
      setLoading(true);
      try {
        let query = supabase.from('products').select('*');

        // If category slug is provided
        if (categorySlug) {
          // First get category details to get the ID
          const { data: catData } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', categorySlug)
            .single();
          
          if (catData) {
            setCategoryInfo(catData);
            query = query.eq('category_id', catData.id);
          }
        }

        // If search term is provided
        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }

        const { data: prodData, error } = await query;

        if (prodData) {
          const mapped: Product[] = prodData.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.original_price,
            image: p.image_url,
            category: p.category_id,
            rating: p.rating,
            reviews: p.review_count,
            discount: p.discount_label,
            inStock: p.is_in_stock,
            is_digital_tool: p.is_digital_tool
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredProducts();
  }, [categorySlug, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}${categorySlug ? `&category=${categorySlug}` : ''}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 pt-6 pb-4 border-b border-black/5 dark:border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
            </button>
            <div className="flex-1">
              <h1 className="text-xl md:text-3xl font-black truncate">
                {categoryInfo ? categoryInfo.name : (searchQuery ? `"${searchQuery}" এর ফলাফল` : 'সব পণ্য')}
              </h1>
              <p className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-widest mt-1">
                {loading ? 'লোড হচ্ছে...' : `${products.length}টি পণ্য পাওয়া গেছে`}
              </p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary group-focus-within:scale-110 transition-transform">search</span>
            </div>
            <input 
              type="text"
              className="block w-full pl-12 pr-12 py-4 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl text-base shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
              placeholder="পণ্য বা টুলস খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">cancel</span>
              </button>
            )}
          </form>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto w-full px-4 pt-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-3xl"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-3/4"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary text-7xl opacity-50">search_off</span>
            </div>
            <h3 className="text-2xl font-black mb-2">দুঃখিত, কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-zinc-500 max-w-xs">অন্য কোনো শব্দ বা ক্যাটেগরি দিয়ে চেষ্টা করুন।</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 px-8 py-3 bg-primary text-background-dark font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              হোম পেজে ফিরে যান
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {products.map(product => {
              const isLiked = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id} 
                  className="bg-white dark:bg-white/5 rounded-[2.5rem] p-3 md:p-5 shadow-sm border border-black/5 dark:border-white/5 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl mb-5 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                      className="absolute top-4 right-4 size-10 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-all z-10"
                    >
                      <span className={`material-symbols-outlined text-xl ${isLiked ? 'text-red-500 material-symbols-fill' : 'text-zinc-400'}`}>favorite</span>
                    </button>

                    {product.discount && <div className="absolute top-4 left-4 bg-primary text-background-dark text-[10px] md:text-xs font-black px-3 py-1.5 rounded-xl">{product.discount}</div>}
                    {product.is_digital_tool && <div className="absolute top-4 right-14 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter shadow-lg">ডিজিটাল টুল</div>}
                  </div>
                  <h3 className="text-sm md:text-lg font-black truncate mb-1">{product.name}</h3>
                  <p className="text-[10px] md:text-xs text-gray-500 mb-3">{product.is_digital_tool ? 'ইনস্ট্যান্ট অ্যাক্সেস' : (product.inStock ? 'স্টক আছে' : 'স্টক শেষ')}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-primary font-black text-lg md:text-2xl">৳ {product.price}</span>
                      {product.originalPrice && <span className="text-[10px] md:text-sm text-gray-400 line-through">৳ {product.originalPrice}</span>}
                    </div>
                    <button className="w-10 h-10 md:w-14 md:h-14 bg-background-dark dark:bg-primary text-white dark:text-background-dark rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-lg active:scale-95">
                      <span className="material-symbols-outlined text-xl md:text-3xl font-black">{product.is_digital_tool ? 'bolt' : 'add'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResultsScreen;
