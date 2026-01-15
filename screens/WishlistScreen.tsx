
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface WishlistScreenProps {
  wishlistItems: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onRemove: (id: string) => void;
}

const WishlistScreen: React.FC<WishlistScreenProps> = ({ wishlistItems, onAddToCart, onRemove }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <h2 className="text-xl font-bold">প্রিয় তালিকা</h2>
          </div>
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
             <span className="material-symbols-outlined text-6xl mb-4">favorite_border</span>
             <p className="text-lg">পছন্দের তালিকায় কিছু নেই</p>
          </div>
        ) : (
          wishlistItems.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-900/50 rounded-2xl p-4 shadow-sm border border-black/5 dark:border-white/5 overflow-hidden">
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base leading-tight line-clamp-2">{product.name}</h3>
                    <button onClick={() => onRemove(product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div>
                    <p className="text-primary font-bold text-lg">৳ {product.price}</p>
                    {product.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">৳ {product.originalPrice}</p>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onAddToCart(product, 1)}
                className="w-full py-3 bg-primary text-background-dark font-bold rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                কার্টে যোগ করুন
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default WishlistScreen;
