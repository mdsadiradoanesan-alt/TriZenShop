
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  user: any;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, cartCount, user }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'হোম স্ক্রিন', icon: 'home', path: '/' },
    { label: 'আমার প্রোফাইল', icon: 'person', path: '/profile', fill: true },
    { label: 'অর্ডারের তালিকা', icon: 'package_2', path: '/order-history' },
    { label: 'শপিং কার্ট', icon: 'shopping_cart', path: '/cart', badge: cartCount > 0 ? `${cartCount}টি` : undefined },
    { label: 'প্রিয় তালিকা', icon: 'favorite', path: '/wishlist' },
    { divider: true },
    { label: 'অফার এবং প্রোমো', icon: 'sell', path: '/flash-sale' },
    { label: 'সাহায্য কেন্দ্র', icon: 'help', path: '/help-center' },
    { label: 'রেফার এবং আর্ন', icon: 'redeem', path: '/refer-earn' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed left-0 top-0 z-[101] h-full w-[85%] max-w-sm bg-white dark:bg-background-dark shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* User Profile Header */}
        <div className="pt-14 pb-8 px-6 bg-gradient-to-br from-primary/10 to-transparent">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  alt="User Profile" 
                  className="size-16 rounded-full border-2 border-primary object-cover shadow-lg" 
                  src={user?.user_metadata?.avatar_url || "https://picsum.photos/100/100?random=50"}
                />
                <div className="absolute bottom-0 right-0 size-4 bg-primary border-2 border-white dark:border-background-dark rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">{user?.user_metadata?.full_name || "ইউজার"}</h2>
                <span className="px-2 py-0.5 bg-primary/20 text-[10px] font-black text-primary-dark dark:text-primary rounded-full uppercase tracking-wider">সদস্য</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">account_circle</span>
                </div>
                <div>
                   <h2 className="text-lg font-bold text-gray-900 dark:text-white">স্বাগতম, অতিথি!</h2>
                   <p className="text-xs text-gray-500">আপনার শপিং প্রোফাইলে লগইন করুন</p>
                </div>
              </div>
              <button 
                onClick={() => handleNavigate('/login')}
                className="w-full py-3 bg-primary text-background-dark rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                লগইন / সাইনআপ
              </button>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              item.divider ? (
                <hr key={`div-${idx}`} className="my-4 border-gray-100 dark:border-white/5 mx-4" />
              ) : (
                <li key={item.label}>
                  <button 
                    onClick={() => handleNavigate(item.path!)}
                    className="w-full flex h-12 items-center gap-4 rounded-xl px-4 transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <span className={`material-symbols-outlined ${item.fill ? 'material-symbols-fill' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="text-base font-semibold truncate flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-primary/20 text-[10px] px-2 py-1 rounded-full text-primary font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              )
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-white/5 pb-10">
          {user ? (
            <button 
              onClick={handleLogout}
              className="w-full flex h-12 items-center gap-4 rounded-xl px-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <span className="material-symbols-outlined font-bold">logout</span>
              <span className="text-base font-bold truncate">লগআউট</span>
            </button>
          ) : (
            <div className="px-4 py-2">
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">TriZen Shop v1.0</p>
            </div>
          )}
          <div className="w-24 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mx-auto mt-6"></div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
