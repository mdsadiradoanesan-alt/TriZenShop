
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartScreenProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number, size?: string, color?: string) => void;
  removeFromCart: (id: string, size?: string, color?: string) => void;
  onClearAll?: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ cart, updateQuantity, removeFromCart, onClearAll }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = cart.length > 0 ? 60 : 0;
  const total = subtotal + deliveryCharge;

  const menuActions = [
    { label: 'কার্ট খালি করুন', icon: 'delete_sweep', action: () => { onClearAll?.(); setShowMenu(false); }, color: 'text-red-500' },
    { label: 'শপিং শেয়ার করুন', icon: 'share', action: () => setShowMenu(false) },
    { label: 'সেভ করুন', icon: 'bookmark', action: () => setShowMenu(false) },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden pb-40">
      <div className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-12 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl md:text-2xl font-black">শপিং কার্ট ({cart.length})</h2>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`size-12 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${showMenu ? 'bg-black/5 dark:bg-white/10' : ''}`}
          >
            <span className="material-symbols-outlined text-2xl">more_horiz</span>
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-[60]" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden z-[61] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="py-2">
                  {menuActions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                    >
                      <span className={`material-symbols-outlined text-xl ${item.color || 'text-zinc-500'}`}>
                        {item.icon}
                      </span>
                      <span className={`text-sm font-bold ${item.color || 'text-zinc-700 dark:text-zinc-200'}`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8">
        {/* Cart Items List */}
        <div className="flex-1 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="relative w-64 h-64 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/5 mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="material-symbols-outlined text-primary opacity-80" style={{ fontSize: '120px' }}>shopping_bag</span>
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border-2 border-primary/20">
                    <span className="material-symbols-outlined text-primary !text-3xl">search</span>
                  </div>
                </div>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight mb-3">আপনার কার্টটি বর্তমানে খালি</h3>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed max-w-[280px] mb-8">আপনার ব্যাগে কোনো পণ্য যোগ করা হয়নি। এখনই কেনাকাটা শুরু করুন এবং আপনার পছন্দের পণ্যগুলি খুঁজুন।</p>
              <button onClick={() => navigate('/')} className="w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-primary text-slate-900 text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                এখনই কেনাকাটা শুরু করুন
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-white/5 p-6 rounded-[2.5rem] shadow-sm border border-black/5 dark:border-white/5 hover:shadow-xl transition-shadow group">
                <div className="h-40 w-full sm:w-40 rounded-3xl bg-center bg-cover bg-no-repeat shrink-0 overflow-hidden relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)} style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black leading-tight mb-1 group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {item.selectedSize && (
                          <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400">সাইজ: {item.selectedSize}</span>
                        )}
                        {item.selectedColor && (
                          <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400">রঙ: {item.selectedColor}</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-zinc-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl">
                      <span className="material-symbols-outlined text-2xl">delete</span>
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-6">
                    <div>
                       <p className="text-xs font-bold text-zinc-400 uppercase mb-1">মূল্য</p>
                       <p className="text-2xl font-black text-primary">৳ {item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-2 border border-zinc-100 dark:border-zinc-700">
                      <button 
                        onClick={() => updateQuantity(item.id, -1, item.selectedSize, item.selectedColor)}
                        className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined font-bold">remove</span>
                      </button>
                      <span className="text-lg font-black w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1, item.selectedSize, item.selectedColor)}
                        className="size-10 flex items-center justify-center rounded-xl bg-primary text-background-dark shadow-sm hover:scale-105 transition-transform"
                      >
                        <span className="material-symbols-outlined font-bold">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="w-full lg:w-96">
            <div className="sticky top-28 bg-white dark:bg-white/5 rounded-[2.5rem] border border-black/5 dark:border-white/5 p-8 shadow-xl">
              <h3 className="text-2xl font-black mb-8">অর্ডার সামারি</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-sm">সাবটোটাল</p>
                  <p className="text-xl font-bold">৳ {subtotal}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-sm">ডেলিভারি চার্জ</p>
                  <p className="text-xl font-bold">৳ {deliveryCharge}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">সর্বমোট পরিশোধযোগ্য</p>
                      <p className="text-4xl font-black text-primary leading-none">৳ {total}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 space-y-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full py-5 bg-primary text-background-dark rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all group active:scale-95"
                >
                  চেকআউট করুন
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                   <span className="material-symbols-outlined text-sm">shield</span>
                   নিরাপদ পেমেন্ট গ্যারান্টি
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
