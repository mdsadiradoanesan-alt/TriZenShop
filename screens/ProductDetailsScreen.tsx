
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

  // Initial state is undefined, we set it once product loads
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getProduct() {
      if (!id) return;
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        
        if (data) {
          const fetchedProduct = {
            id: data.id,
            name: data.name,
            price: data.price,
            originalPrice: data.original_price,
            image: data.image_url,
            category: data.category_id,
            rating: data.rating,
            reviews: data.review_count,
            discount: data.discount_label,
            inStock: data.is_in_stock,
            is_digital_tool: data.is_digital_tool,
            validity_days: data.validity_days || 30,
            description: data.description,
            features: data.features,
            sizes: data.sizes,
            colors: data.colors
          };
          setProduct(fetchedProduct);
          
          // Auto-select first option if available
          if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
            setSelectedSize(fetchedProduct.sizes[0]);
          }
          if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
            setSelectedColor(fetchedProduct.colors[0]);
          }

        } else {
          // Fallback to mock data if not found in Supabase (for demo purposes)
          const mockProduct = PRODUCTS.find(p => p.id === id);
          if (mockProduct) {
             setProduct(mockProduct);
             if (mockProduct.sizes?.length) setSelectedSize(mockProduct.sizes[0]);
             if (mockProduct.colors?.length) setSelectedColor(mockProduct.colors[0]);
          }
        }
      } catch (err) {
        console.error(err);
        const mockProduct = PRODUCTS.find(p => p.id === id);
        if (mockProduct) {
           setProduct(mockProduct);
           if (mockProduct.sizes?.length) setSelectedSize(mockProduct.sizes[0]);
           if (mockProduct.colors?.length) setSelectedColor(mockProduct.colors[0]);
        }
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }
    getProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return <div className="p-20 text-center font-black">প্রোডাক্ট পাওয়া যায়নি</div>;

  const handleAddToCart = () => {
    // Validation check if options exist but aren't selected (though auto-select handles most cases)
    if (product.sizes?.length && !selectedSize) {
      alert('দয়া করে একটি সাইজ নির্বাচন করুন');
      return;
    }
    if (product.colors?.length && !selectedColor) {
      alert('দয়া করে একটি রঙ নির্বাচন করুন');
      return;
    }

    onAddToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const isLiked = wishlist.includes(product.id);

  return (
    <div className="pb-32 min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 max-w-screen-xl mx-auto backdrop-blur-md bg-white/10">
        <button onClick={() => navigate(-1)} className="size-11 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-xl active:scale-90 transition-all">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="flex gap-3">
          <button className="size-11 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-xl"><span className="material-symbols-outlined">share</span></button>
          <button onClick={() => onToggleWishlist(product.id)} className="size-11 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-xl">
            <span className={`material-symbols-outlined ${isLiked ? 'text-red-500 material-symbols-fill' : ''}`}>favorite</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto md:pt-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 p-4 md:p-8 lg:sticky lg:top-12 h-fit">
          <div className="aspect-[4/3] md:aspect-square bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-12" />
            {product.discount && <div className="absolute top-8 left-8 bg-primary text-background-dark px-5 py-2 rounded-2xl font-black text-sm shadow-xl">{product.discount}</div>}
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/2 p-6 md:p-12">
          <div className="flex flex-col gap-4">
            <span className={`w-fit rounded-full px-5 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest ${product.is_digital_tool ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-primary text-background-dark shadow-lg shadow-primary/20'}`}>
              {product.is_digital_tool ? 'অনলাইন টুল' : 'নতুন কালেকশন'}
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <p className="text-primary text-3xl md:text-5xl font-black">৳ {product.price}</p>
              {product.originalPrice && <p className="text-xl md:text-2xl text-zinc-400 line-through">৳ {product.originalPrice}</p>}
            </div>
          </div>

          {/* Feature Badges for Digital */}
          {product.is_digital_tool && (
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl border border-black/5 shadow-sm">
                <span className="material-symbols-outlined text-primary text-xl">bolt</span>
                <span className="text-xs md:text-sm font-black">ইনস্ট্যান্ট ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl border border-black/5 shadow-sm">
                <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                <span className="text-xs md:text-sm font-black">১০০% সুরক্ষিত</span>
              </div>
            </div>
          )}

          {/* Validity Cards for Digital */}
          {product.is_digital_tool ? (
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-zinc-100/50 dark:bg-zinc-800/30 p-6 rounded-3xl border border-black/5">
                <span className="material-symbols-outlined text-zinc-400 mb-3">calendar_today</span>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">মেয়াদকাল</p>
                <p className="text-xl font-black">{product.validity_days || 30} দিন</p>
              </div>
              <div className="bg-zinc-100/50 dark:bg-zinc-800/30 p-6 rounded-3xl border border-black/5">
                <span className="material-symbols-outlined text-zinc-400 mb-3">vpn_key</span>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">অ্যাক্সেস</p>
                <p className="text-xl font-black">সরাসরি লগইন</p>
              </div>
            </div>
          ) : (
            <div className="mt-10 space-y-8">
              {/* Dynamic Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black uppercase tracking-tight">সাইজ নির্বাচন করুন</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)} 
                        className={`h-14 min-w-[64px] px-4 rounded-2xl border-2 font-black transition-all flex items-center justify-center ${selectedSize === size ? 'border-primary bg-primary/10 text-primary scale-105' : 'border-zinc-100 dark:border-zinc-800 hover:border-primary/50'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black uppercase tracking-tight">রঙ নির্বাচন করুন</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button 
                        key={color} 
                        onClick={() => setSelectedColor(color)} 
                        className={`h-12 px-5 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${selectedColor === color ? 'border-primary bg-primary/10 text-primary' : 'border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-primary/50'}`}
                      >
                        {/* Optional: Add a small color dot if needed, for now using text for robustness */}
                        <span className="text-sm">{color}</span>
                        {selectedColor === color && <span className="material-symbols-outlined text-base">check</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description & Features */}
          <div className="mt-12 space-y-6">
            <h3 className="text-xl font-black">{product.is_digital_tool ? 'টুলের বৈশিষ্ট্যসমূহ' : 'বিস্তারিত বিবরণ'}</h3>
            
            <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-base font-medium">
              {product.description || (
                <span className="italic text-zinc-400">এই প্রোডাক্টের জন্য কোনো বিস্তারিত বিবরণ দেওয়া হয়নি।</span>
              )}
            </div>

            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-sm font-bold">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            
            {(!product.features || product.features.length === 0) && (
              <div className="space-y-6 mt-4">
                 {[
                  { icon: product.is_digital_tool ? 'verified_user' : 'verified', title: 'গ্যারান্টিযুক্ত সার্ভিস', desc: 'আমরা দিচ্ছি ১০০% অথেনটিক পণ্য ও সেবার নিশ্চয়তা।' }
                ].map((f, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined">{f.icon}</span>
                    </div>
                    <div>
                      <p className="font-black text-lg leading-tight">{f.title}</p>
                      <p className="text-zinc-500 font-medium text-sm mt-1">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Smart Notice */}
          <div className="mt-12 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex gap-4">
            <span className="material-symbols-outlined text-primary">info</span>
            <p className="text-xs md:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
              {product.is_digital_tool 
                ? 'ক্রয় করার ৫ মিনিটের মধ্যে আপনার ইমেইলে অ্যাক্সেস ডিটেইলস পৌঁছে যাবে। পেমেন্ট করার পর অর্ডার হিস্ট্রি চেক করুন।' 
                : 'পণ্যটি পছন্দ না হলে ৭ দিনের মধ্যে রিটার্ন করার সুবিধা রয়েছে। যেকোনো সমস্যায় আমাদের সাপোর্ট টিমের সাথে কথা বলুন।'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border-t border-black/5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">মোট মূল্য</p>
            <p className="text-2xl md:text-3xl font-black text-primary">৳ {product.price}</p>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex-1 max-w-md h-16 md:h-20 bg-primary text-background-dark rounded-[2.5rem] font-black text-lg md:text-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined text-3xl">{product.is_digital_tool ? 'bolt' : 'shopping_bag'}</span>
            এখনই কিনুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;