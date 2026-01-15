
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
            is_digital_tool: p.is_digital_tool
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

  if (loading) return <SkeletonHomeScreen />;

  return (
    <main className="pb-32 overflow-y-auto no-scrollbar pt-2 md:pt-6">
      <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 md:py-5 flex items-center justify-between rounded-2xl border border-black/5 dark:border-white/5 mx-2 md:mx-0">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={onMenuClick} className="material-symbols-outlined text-2xl cursor-pointer p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">menu</button>
          <h1 className="text-xl md:text-2xl font-black tracking-tight cursor-pointer" onClick={() => navigate('/')}>TriZen Shop</h1>
        </div>
        
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
           <div className="relative w-full" onClick={() => navigate('/search')}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary">search</span>
            </div>
            <input readOnly className="block w-full pl-12 pr-12 py-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl text-base placeholder:text-gray-400 cursor-pointer" placeholder="পণ্য বা এসইও টুলস খুঁজুন..." />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" onClick={() => navigate('/help-center')}>
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background-light dark:ring-background-dark"></span>
          </button>
          <button className="p-2 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform" onClick={() => navigate('/cart')}>
            <span className="material-symbols-outlined text-2xl font-bold">shopping_cart</span>
          </button>
        </div>
      </header>

      <div className="px-4 py-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="relative flex-1" onClick={() => navigate('/search')}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary">search</span>
            </div>
            <input readOnly className="block w-full pl-10 pr-12 py-3 bg-white dark:bg-white/5 border border-black/5 rounded-xl text-base placeholder:text-gray-400 cursor-pointer" placeholder="খুঁজুন..." />
          </div>
        </div>
      </div>

      <section className="mt-2 md:mt-8">
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 gap-4 md:gap-8">
          {banners.map(banner => (
            <div key={banner.id} className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-44 md:h-80 rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-center text-white relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all" onClick={() => banner.target_link && navigate(banner.target_link)} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${banner.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="z-10 relative">
                <h3 className="text-2xl md:text-5xl font-black mb-1 md:mb-3">{banner.title}</h3>
                <p className="text-sm md:text-xl opacity-90 mb-4 md:mb-8">{banner.subtitle}</p>
                <button className="bg-primary text-background-dark px-8 py-3 rounded-2xl text-sm md:text-lg font-black hover:bg-white transition-all">বিস্তারিত দেখুন</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 md:mt-20">
        <div className="flex items-center justify-between px-4 mb-6 md:mb-10">
          <h2 className="text-xl md:text-3xl font-black">টপ ক্যাটেগরি</h2>
          <button className="text-primary text-sm md:text-lg font-black hover:underline">সব দেখুন</button>
        </div>
        <div className="flex overflow-x-auto px-4 gap-6 md:gap-12 no-scrollbar justify-start lg:justify-center">
          {categories.map(cat => (
            <div key={cat.id} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group" onClick={() => navigate(`/search?category=${cat.slug}`)}>
              <div className="w-16 h-16 md:w-28 md:h-28 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                <span className="material-symbols-outlined text-3xl md:text-6xl">{cat.icon || 'category'}</span>
              </div>
              <span className="text-xs md:text-lg font-bold group-hover:text-primary transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 md:mt-24">
        <div className="flex items-center justify-between px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-black">আমাদের বিশেষ পণ্যসমূহ</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full border border-primary text-primary text-xs md:text-sm font-bold bg-primary/5 hover:bg-primary hover:text-background-dark transition-all">এসইও টুলস</button>
            <button className="px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-xs md:text-sm font-bold">অন্যান্য</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 px-4">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-white/5 rounded-[2.5rem] p-3 md:p-5 shadow-sm border border-black/5 dark:border-white/5 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl mb-5 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {product.discount && <div className="absolute top-4 left-4 bg-primary text-background-dark text-[10px] md:text-xs font-black px-3 py-1.5 rounded-xl">{product.discount}</div>}
                {product.is_digital_tool && <div className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter shadow-lg">ডিজিটাল টুল</div>}
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
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-32 px-4" onClick={() => navigate('/refer-earn')}>
        <div className="w-full h-48 md:h-80 bg-primary/10 dark:bg-primary/5 rounded-[3rem] flex items-center px-8 md:px-20 overflow-hidden relative cursor-pointer group border border-primary/20">
          <div className="z-10 max-w-2xl">
            <h2 className="text-2xl md:text-5xl font-black mb-3 md:mb-5">বন্ধু রেফার করুন</h2>
            <p className="text-sm md:text-2xl text-emerald-700 dark:text-primary mb-6 md:mb-10 font-medium">প্রতিটি সফল রেফারেল-এ জিতে নিন বিশেষ ক্যাশব্যাক অফার!</p>
            <span className="bg-primary text-background-dark px-8 py-3.5 rounded-2xl text-xs md:text-xl font-black shadow-xl shadow-primary/20 group-hover:scale-110 transition-all inline-block">বিস্তারিত জানুন</span>
          </div>
          <span className="material-symbols-outlined absolute right-12 md:right-24 text-[120px] md:text-[240px] text-primary/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">loyalty</span>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
