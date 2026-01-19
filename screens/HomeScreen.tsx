
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';
import SkeletonHomeScreen from '../components/SkeletonHomeScreen';

interface HomeScreenProps {
  onMenuClick: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, prodRes, bannerRes] = await Promise.all([
          supabase.from('categories').select('*'),
          supabase.from('products').select('*'),
          supabase.from('banners_events').select('*').eq('is_active', true).order('priority', { ascending: false })
        ]);

        if (catRes.data) setCategories(catRes.data);
        if (prodRes.data) {
          const mappedProducts: Product[] = prodRes.data.map(p => ({
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
            is_digital_tool: p.is_digital_tool,
            tool_external_url: p.tool_external_url,
            validity_days: p.validity_days
          }));
          setProducts(mappedProducts);
        }
        if (bannerRes.data) setBanners(bannerRes.data);
      } catch (err) {
        console.error('Data fetching error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const digitalTools = products.filter(p => p.is_digital_tool);
  const physicalProducts = products.filter(p => !p.is_digital_tool);

  const handleBannerClick = (link: string | null) => {
    if (!link) return;
    
    let target = link.trim();
    if (target.startsWith('http')) {
      window.open(target, '_blank');
      return;
    }

    if (target.startsWith('/category/')) {
      target = target.replace('/category/', '');
    } else if (target.startsWith('/search?category=')) {
      target = target.replace('/search?category=', '');
    } else if (target.startsWith('/')) {
       navigate(target);
       return;
    }

    navigate(`/search?category=${target}`);
  };

  if (loading) return <SkeletonHomeScreen />;

  return (
    <main className="pb-32 overflow-y-auto no-scrollbar pt-2 md:pt-6">
      <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 md:py-5 flex items-center justify-between rounded-2xl border border-black/5 dark:border-white/5 mx-2 md:mx-0">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={onMenuClick} className="material-symbols-outlined text-2xl cursor-pointer p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">menu</button>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight cursor-pointer" onClick={() => navigate('/')}>TriZen Shop</h1>
            <p className="hidden md:block text-[10px] text-primary uppercase font-bold tracking-widest">Premium Store</p>
          </div>
        </div>
        
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
           <div className="relative w-full" onClick={() => navigate('/search')}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary">search</span>
            </div>
            <input readOnly className="block w-full pl-12 pr-12 py-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl text-base placeholder:text-gray-400 cursor-pointer" placeholder="পণ্য বা সার্ভিস খুঁজুন..." />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" onClick={() => navigate('/order-status')}>
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background-light dark:ring-background-dark"></span>
          </button>
          <button className="p-2 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform" onClick={() => navigate('/cart')}>
            <span className="material-symbols-outlined text-2xl font-bold">shopping_cart</span>
          </button>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="px-4 py-4 md:hidden">
        <div className="relative" onClick={() => navigate('/search')}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-primary">search</span>
          </div>
          <input readOnly className="block w-full pl-10 pr-12 py-3 bg-white dark:bg-white/5 border border-black/5 rounded-xl text-sm placeholder:text-gray-400" placeholder="টুলস বা সার্ভিস অনুসন্ধান করুন..." />
        </div>
      </div>

      {/* Super Compact Slim Banners - Reduced by 75% in visual weight */}
      {banners.length > 0 && (
        <section className="px-4 mt-1">
          <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
            {banners.map((banner, idx) => (
              <div 
                key={idx} 
                onClick={() => handleBannerClick(banner.target_url)}
                className="w-32 md:w-48 h-16 md:h-24 rounded-lg md:rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-sm cursor-pointer hover:scale-[1.05] active:scale-95 transition-all flex-shrink-0 border border-black/5 dark:border-white/5"
              >
                <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Online Tools Highlight */}
      <section className="mt-6 md:mt-10">
        <div className="flex items-center justify-between px-4 mb-4 md:mb-6">
          <div>
            <h2 className="text-lg md:text-2xl font-black">অনলাইন টুলস</h2>
            <p className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest mt-0.5">ডিজিটাল সার্ভিসসমূহ</p>
          </div>
          <button onClick={() => navigate('/search?category=seo-tools')} className="text-primary text-xs md:text-base font-black hover:underline">সব দেখুন</button>
        </div>
        <div className="flex overflow-x-auto px-4 gap-3 md:gap-6 no-scrollbar">
          {digitalTools.map(product => (
            <div key={product.id} className="min-w-[150px] md:min-w-[200px] bg-white dark:bg-zinc-900 p-4 rounded-[2rem] shadow-sm border border-black/5 dark:border-white/5 flex flex-col items-center text-center group cursor-pointer hover:shadow-xl transition-all" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <img src={product.image} alt="" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
              </div>
              <h4 className="font-black text-xs md:text-base mb-1 truncate w-full">{product.name}</h4>
              <p className="text-primary font-black text-sm md:text-xl mb-3">৳ {product.price}</p>
              <button className="w-full bg-zinc-900 dark:bg-primary text-white dark:text-background-dark py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-md active:scale-95 transition-all">কিনুন</button>
            </div>
          ))}
        </div>
      </section>

      {/* Traditional Categories */}
      <section className="mt-8 md:mt-16 px-4">
        <h2 className="text-lg md:text-2xl font-black mb-6">টপ ক্যাটেগরি</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {categories.map(cat => (
            <div key={cat.id} className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={() => navigate(`/search?category=${cat.slug}`)}>
              <div className="w-full aspect-square rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center border border-black/5 group-hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-xl md:text-3xl group-hover:text-background-dark">{cat.icon}</span>
              </div>
              <span className="text-[9px] md:text-xs font-bold truncate group-hover:text-primary transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Physical Products */}
      <section className="mt-10 md:mt-20">
        <div className="flex items-center justify-between px-4 mb-6">
          <h2 className="text-lg md:text-2xl font-black">আমাদের বিশেষ পণ্যসমূহ</h2>
          <button onClick={() => navigate('/search')} className="px-4 py-1.5 rounded-full border border-black/5 text-[10px] font-bold bg-white dark:bg-zinc-900">আরো দেখুন</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 px-4">
          {physicalProducts.map(product => (
            <div key={product.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-3 md:p-4 shadow-sm border border-black/5 cursor-pointer hover:shadow-xl transition-all group" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-800 rounded-2xl mb-4 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xs md:text-base font-black truncate mb-1">{product.name}</h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-primary font-black text-sm md:text-lg">৳ {product.price}</span>
                <button className="size-8 md:size-10 bg-zinc-900 dark:bg-primary text-white dark:text-background-dark rounded-xl flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
