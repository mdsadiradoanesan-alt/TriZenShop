
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const FlashSaleScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-primary/10">
        <div onClick={() => navigate(-1)} className="text-primary flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center">ফ্ল্যাশ সেল</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-primary">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 pb-2">
        <div className="bg-primary rounded-xl p-6 shadow-lg shadow-primary/20 relative overflow-hidden">
          <p className="text-white/90 text-sm font-medium text-center mb-3">ধামাকা অফার শেষ হতে বাকি</p>
          <div className="flex gap-3 justify-center">
            {[
              { val: '০০', unit: 'ঘণ্টা' },
              { val: '৪৫', unit: 'মিনিট' },
              { val: '১২', unit: 'সেকেন্ড' }
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                    <p className="text-white text-xl font-bold">{item.val}</p>
                  </div>
                  <p className="text-white/80 text-[10px] uppercase tracking-wider">{item.unit}</p>
                </div>
                {i < 2 && <div className="text-white text-xl font-bold flex items-center pt-1">:</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 flex-1 overflow-y-auto no-scrollbar">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white dark:bg-[#2d1a16] rounded-xl p-2 shadow-sm flex flex-col gap-2 relative cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="absolute top-3 left-3 z-10 bg-primary text-background-dark text-[10px] font-bold px-2 py-1 rounded-full">
              {product.discount || '৫০% ছাড়'}
            </div>
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="px-1 flex flex-col gap-1">
              <h3 className="text-sm font-semibold truncate">{product.name}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-primary text-lg font-bold">৳ {product.price}</p>
                {product.originalPrice && <p className="text-gray-400 text-xs line-through">৳ {product.originalPrice}</p>}
              </div>
              <div className="mt-1">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-gray-500">স্টক সীমিত</span>
                  <span className="text-primary font-bold">৮৫% বিক্রি</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-primary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <button className="mt-2 w-full bg-primary text-background-dark text-xs font-bold py-2 rounded-full active:scale-95 transition-transform">
                এখনই কিনুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleScreen;
