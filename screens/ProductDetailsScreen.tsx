
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

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

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Navy');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getProduct() {
      if (!id) return;
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (data) {
          setProduct({
            id: data.id,
            name: data.name,
            price: data.price,
            originalPrice: data.original_price,
            image: data.image_url,
            category: data.category_id,
            rating: data.rating,
            reviews: data.review_count,
            discount: data.discount_label,
            inStock: data.is_in_stock
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center animate-pulse">প্রোডাক্ট লোড হচ্ছে...</div>;
  if (!product) return <div className="p-20 text-center text-red-500">প্রোডাক্ট খুঁজে পাওয়া যায়নি</div>;

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Navy', hex: '#1a237e' },
    { name: 'Maroon', hex: '#b71c1c' },
    { name: 'Green', hex: '#1b5e20' },
    { name: 'Black', hex: '#212121' },
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const isLiked = wishlist.includes(product.id);

  return (
    <div className="pb-32 overflow-y-auto no-scrollbar min-h-screen">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between p-4 max-w-screen-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex size-11 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-lg hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <div className="flex gap-3">
          <button className="flex size-11 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">share</span>
          </button>
          <button 
            onClick={() => onToggleWishlist(product.id)}
            className="flex size-11 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-lg hover:scale-110 transition-transform"
          >
            <span className={`material-symbols-outlined text-2xl ${isLiked ? 'text-red-500 material-symbols-fill' : ''}`}>favorite</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 pt-0 lg:pt-12 px-0 lg:px-4">
        {/* Left Column: Image */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-12 lg:h-[calc(100vh-120px)]">
          <div className="bg-zinc-200 dark:bg-zinc-800 h-[450px] md:h-[600px] lg:h-full lg:rounded-[3rem] overflow-hidden relative shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="w-full lg:w-1/2 px-4 lg:px-0 pt-8 lg:pt-4">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black text-primary uppercase tracking-widest">নতুন আগমন</span>
            <h1 className="text-[#0d1b12] dark:text-white tracking-tight text-3xl md:text-5xl font-black leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-primary text-3xl md:text-4xl font-black tracking-tight">৳ {product.price}</p>
              {product.originalPrice && (
                <p className="text-xl text-zinc-400 line-through">৳ {product.originalPrice}</p>
              )}
            </div>
          </div>

          <div 
            onClick={() => navigate(`/product/${product.id}/reviews`)}
            className="flex items-center gap-6 py-8 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer group"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[#0d1b12] dark:text-white text-3xl font-black">{product.rating}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} className={`material-symbols-outlined text-yellow-400 text-[22px] ${s <= Math.floor(product.rating) ? 'material-symbols-fill' : ''}`}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-wider group-hover:text-primary transition-colors">{product.reviews}টি রিভিউ দেখুন</p>
            </div>
            <div className="h-12 w-[2px] bg-zinc-100 dark:bg-zinc-800"></div>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 font-medium flex-1">৯৫% ক্রেতা এই পণ্যটি পছন্দ করেছেন।</p>
            <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
          </div>

          <div className="py-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black uppercase tracking-tight">আকার নির্বাচন করুন</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-14 min-w-[64px] items-center justify-center rounded-2xl border-2 transition-all font-black text-base ${selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-black uppercase tracking-tight">রঙ নির্বাচন করুন</h3>
              <div className="flex gap-4">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`size-12 rounded-full border-2 p-1 transition-all ${selectedColor === color.name ? 'border-primary' : 'border-transparent'}`}
                  >
                    <div className="h-full w-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-4">
          <div className="flex flex-1 md:flex-none gap-3 md:w-fit">
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-3 mr-2">
               <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="size-10 flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined">remove</span></button>
               <span className="w-10 text-center font-black">{quantity}</span>
               <button onClick={() => setQuantity(q => q + 1)} className="size-10 flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined">add</span></button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 md:w-64 flex items-center justify-center gap-2 rounded-2xl border-2 border-primary py-4 text-base font-black text-primary hover:bg-primary/5 transition-all"
            >
              কার্টে যোগ করুন
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-[1.5] md:w-64 flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-black text-background-dark hover:shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              এখনই কিনুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
