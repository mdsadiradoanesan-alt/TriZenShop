
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';
import SkeletonHomeScreen from '../components/SkeletonHomeScreen';

interface HomeScreenProps {
  onMenuClick: () => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
  user: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onMenuClick, onToggleWishlist, wishlist, user }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ownedProductIds, setOwnedProductIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, prodRes, bannerRes] = await Promise.all([
          supabase.from('categories').select('*'),
          supabase.from('products').select('*'),
          supabase.from('banners_events').select('*').eq('is_active', true).order('priority', { ascending: false })
        ]);

        if (user) {
           const { data: ownedData } = await supabase
             .from('order_items')
             .select('product_id, orders!inner(status)')
             .eq('orders.user_id', user.id)
             .neq('orders.status', 'Cancelled');
           
           if (ownedData) {
             setOwnedProductIds(ownedData.map((item: any) => item.product_id));
           }
        }

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
            validity_days: p.validity_days,
            description: p.description,
            features: p.features,
            sizes: p.sizes,
            colors: p.colors
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
  }, [user]);

  const digitalTools = products.filter(p => p.is_digital_tool);
  const physicalProducts = products.filter(p => !p.is_digital_tool);

  const handleProductClick = (product: Product) => {
    if (product.is_digital_tool && ownedProductIds.includes(product.id)) {
      navigate(`/tool-access/${product.id}`);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const handleBannerClick = (url?: string) => {
    if (!url) return;
    if (url.startsWith('http')) window.open(url, '_blank');
    else navigate(url);
  };

  if (loading) return <SkeletonHomeScreen />;

  return (
    <main className="pb-32 overflow-y-auto no-scrollbar min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-slate-900 dark:text-white selection:bg-primary/30">
      
      {/* 2026 Minimalist Header (Glassmorphism) - Expanded Width */}
      <header className="sticky top-4 z-40 mx-2 md:mx-auto max-w-[1600px] px-2 md:px-6">
        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-full px-4 py-2.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="text-lg font-black tracking-tighter cursor-pointer" onClick={() => navigate('/')}>TriZen.</span>
          </div>

          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <div className="relative group" onClick={() => navigate('/search')}>
               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                 <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors text-[20px]">search</span>
               </div>
               {/* Fixed: Added pl-10 to prevent text overlapping icon */}
               <input readOnly className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 pl-10 placeholder:text-zinc-400 cursor-pointer" placeholder="Search tools, assets..." />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" onClick={() => navigate('/search')}>
               <span className="material-symbols-outlined md:hidden text-[20px]">search</span>
            </button>
            <button className="size-9 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105 transition-transform shadow-lg" onClick={() => navigate('/cart')}>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Expanded Width */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6 md:pt-8 space-y-10">
        
        {/* Bento Grid Hero Section - Size Reduced by 50% */}
        {banners.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 h-auto md:h-64">
            {/* Primary Hero */}
            <div 
              onClick={() => handleBannerClick(banners[0].target_url)} 
              className="md:col-span-2 md:row-span-2 relative rounded-[1.5rem] overflow-hidden group cursor-pointer h-40 md:h-full shadow-sm"
            >
              <img 
                src={banners[0].image_url} 
                alt="Hero" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager" 
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                <span className="bg-primary/90 text-black text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md w-fit mb-1.5 backdrop-blur-md">Featured</span>
                <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter leading-none mb-0.5">{banners[0].title || "Next Gen Tools"}</h2>
                <p className="text-zinc-300 text-xs font-medium line-clamp-1 max-w-lg">{banners[0].description}</p>
              </div>
            </div>

            {/* Secondary Bento Cells */}
            <div className="hidden md:flex flex-col gap-3 md:gap-4 h-full">
              {banners.slice(1, 3).map((banner, i) => (
                 <div 
                   key={i} 
                   onClick={() => handleBannerClick(banner.target_url)}
                   className="flex-1 relative rounded-[1.5rem] overflow-hidden group cursor-pointer bg-zinc-100 dark:bg-zinc-800 shadow-sm"
                 >
                    <img src={banner.image_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                    <div className="absolute bottom-0 left-0 p-4">
                       <h3 className="text-base font-black text-white tracking-tight leading-none">{banner.title}</h3>
                    </div>
                 </div>
              ))}
            </div>
          </section>
        )}

        {/* Digital Tools (Grid Layout - Matches Curated Section) */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-black tracking-tighter">Digital Tools<span className="text-primary">.</span></h2>
            <button onClick={() => navigate('/search?category=seo-tools')} className="text-xs font-bold underline decoration-2 decoration-primary underline-offset-4 uppercase tracking-wider">View All</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
            {digitalTools.map(tool => {
              const isOwned = ownedProductIds.includes(tool.id);
              return (
                <div 
                  key={tool.id} 
                  onClick={() => handleProductClick(tool)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-white dark:bg-zinc-900 rounded-[1.5rem] p-3 relative border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                     <img src={tool.image} className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                     {isOwned && (
                       <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur text-primary p-1 rounded-full shadow-lg z-10">
                         <span className="material-symbols-outlined text-xs font-bold">check</span>
                       </div>
                     )}
                  </div>
                  <div className="mt-2.5 px-1">
                     <h3 className="font-bold truncate text-sm leading-tight group-hover:text-primary transition-colors">{tool.name}</h3>
                     <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-zinc-900 dark:text-white font-black text-sm">
                          {isOwned ? 'OWNED' : `৳${tool.price}`}
                        </span>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Category Pills (Glassmorphism) */}
        <section className="overflow-x-auto no-scrollbar">
           <div className="flex gap-2">
             {categories.map(cat => (
               <button 
                 key={cat.id}
                 onClick={() => navigate(`/search?category=${cat.slug}`)}
                 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 whitespace-nowrap hover:border-primary transition-colors group shadow-sm"
               >
                 <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors text-base">{cat.icon}</span>
                 <span className="font-bold text-xs">{cat.name}</span>
               </button>
             ))}
           </div>
        </section>

        {/* Physical Products (Grid) */}
        <section>
          <h2 className="text-xl md:text-2xl font-black tracking-tighter mb-6">Curated for You<span className="text-primary">.</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
            {physicalProducts.map(product => {
              const isLiked = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-white dark:bg-zinc-900 rounded-[1.5rem] p-4 relative border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                     <img src={product.image} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" loading="lazy" />
                     
                     <button 
                        onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                        className="absolute top-3 right-3 size-8 rounded-full flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white"
                     >
                        <span className={`material-symbols-outlined text-sm ${isLiked ? 'material-symbols-fill text-red-500' : ''}`}>favorite</span>
                     </button>
                  </div>
                  <div className="mt-2.5 px-1">
                     <h3 className="font-bold truncate text-sm">{product.name}</h3>
                     <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-zinc-900 dark:text-white font-black text-sm">৳{product.price}</span>
                        {product.originalPrice && <span className="text-zinc-400 text-[10px] line-through">৳{product.originalPrice}</span>}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Brand */}
        <div className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
           <h1 className="text-[12vw] font-black text-zinc-100 dark:text-zinc-900 tracking-tighter leading-none select-none">TRIZEN</h1>
           <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.5em] -mt-2 md:-mt-6 relative z-10">Digital Ecosystem</p>
        </div>

      </div>
    </main>
  );
};

export default HomeScreen;
