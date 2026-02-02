
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductDetailsScreenProps {
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getProduct() {
      if (!id) return;
      try {
        const { data } = await supabase.from('products').select('*').eq('id', id).single();
        if (data) {
          const fetched = { ...data, image: data.image_url, originalPrice: data.original_price, discount: data.discount_label, inStock: data.is_in_stock };
          setProduct(fetched);
          if (fetched.sizes?.length) setSelectedSize(fetched.sizes[0]);
          if (fetched.colors?.length) setSelectedColor(fetched.colors[0]);
        } else {
          const mock = PRODUCTS.find(p => p.id === id);
          if (mock) { setProduct(mock); setSelectedSize(mock.sizes?.[0]); setSelectedColor(mock.colors?.[0]); }
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    getProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505]" />;
  if (!product) return <div>Not Found</div>;

  const handleAddToCart = () => {
    if ((product.sizes?.length && !selectedSize) || (product.colors?.length && !selectedColor)) {
      alert('Please select options'); return;
    }
    onAddToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const isLiked = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-zinc-900 dark:text-white pb-32">
      {/* Floating Header */}
      <nav className="fixed top-0 inset-x-0 z-50 p-4 flex justify-between items-center pointer-events-none">
        <button onClick={() => navigate(-1)} className="pointer-events-auto size-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="pointer-events-auto flex gap-3">
           <button onClick={() => onToggleWishlist(product.id)} className="size-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
             <span className={`material-symbols-outlined ${isLiked ? 'text-red-500 material-symbols-fill' : ''}`}>favorite</span>
           </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        
        {/* Visual Column (Sticky & Tactile) */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-screen lg:sticky lg:top-0 p-4 lg:p-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900/50">
           <div className="relative w-full h-full max-h-[800px] group perspective-1000">
              <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden flex items-center justify-center relative transition-transform duration-700 ease-out group-hover:rotate-x-2 group-hover:rotate-y-2 border border-black/5 dark:border-white/5">
                 {/* Background Elements for depth */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 
                 <img 
                   src={product.image} 
                   alt={product.name} 
                   className="w-[80%] h-[80%] object-contain z-10 transition-transform duration-700 group-hover:scale-110 group-hover:translate-z-10 drop-shadow-2xl"
                   style={{ transformStyle: 'preserve-3d' }}
                 />
                 
                 {product.is_digital_tool && (
                   <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="bg-black/80 dark:bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-white dark:text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">view_in_ar</span>
                        Interactive Preview
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Content Column */}
        <div className="w-full lg:w-[45%] p-6 lg:p-12 lg:pt-32 flex flex-col gap-8">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest">
                    {product.is_digital_tool ? 'Digital Asset' : 'Physical Good'}
                 </span>
                 {product.inStock && <span className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-1"><span className="size-2 rounded-full bg-primary animate-pulse"></span> In Stock</span>}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-4">
                 <span className="text-3xl font-medium tracking-tight">৳{product.price}</span>
                 {product.originalPrice && <span className="text-zinc-400 line-through decoration-zinc-500">৳{product.originalPrice}</span>}
              </div>
           </div>

           {/* Minimalist Divider */}
           <div className="w-12 h-1 bg-primary"></div>

           <div className="prose prose-zinc dark:prose-invert">
              <p className="text-lg leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">{product.description}</p>
           </div>

           {/* Configurator (Glass/Pills) */}
           {!product.is_digital_tool && (product.sizes?.length || product.colors?.length) && (
             <div className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                {product.sizes && (
                   <div>
                     <span className="text-xs font-black uppercase text-zinc-400 mb-3 block">Size</span>
                     <div className="flex flex-wrap gap-2">
                        {product.sizes.map(s => (
                           <button 
                             key={s} 
                             onClick={() => setSelectedSize(s)}
                             className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold transition-all ${selectedSize === s ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200'}`}
                           >
                             {s}
                           </button>
                        ))}
                     </div>
                   </div>
                )}
             </div>
           )}

           {product.is_digital_tool && (
              <div className="grid grid-cols-2 gap-4">
                 {['Instant Download', 'Lifetime Updates', 'Commercial License', '24/7 Support'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                       <span className="material-symbols-outlined text-primary">verified</span>
                       <span className="text-xs font-bold uppercase tracking-wide">{feat}</span>
                    </div>
                 ))}
              </div>
           )}
        </div>
      </div>

      {/* Floating Action Bar (Glassmorphism) */}
      <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-96 z-40">
        <div className="bg-black/90 dark:bg-white/90 backdrop-blur-xl p-2 rounded-[2rem] shadow-2xl border border-white/10 flex items-center justify-between pl-6">
           <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">Total</span>
              <span className="text-xl font-black text-white dark:text-black">৳{product.price}</span>
           </div>
           <button 
             onClick={handleAddToCart}
             className="bg-primary hover:bg-primary-dark text-black h-14 px-8 rounded-[1.5rem] font-black uppercase tracking-wide transition-all active:scale-95 flex items-center gap-2"
           >
             {product.is_digital_tool ? 'Get Access' : 'Add to Cart'}
             <span className="material-symbols-outlined">arrow_forward</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;