
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  cartCount: number;
  activePath: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ cartCount, activePath }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'হোম', icon: 'home', path: '/' },
    { label: 'সার্চ', icon: 'search', path: '/search' },
    { label: 'কার্ট', icon: 'shopping_cart', path: '/cart', badge: cartCount },
    { label: 'অ্যাকাউন্ট', icon: 'person', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-4 md:pb-8">
      <div className="bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border border-black/5 dark:border-white/10 px-6 py-3 md:py-4 flex justify-between items-center gap-8 md:gap-16 pointer-events-auto rounded-3xl shadow-2xl transition-all">
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all group ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            >
              <div className="relative">
                <span className={`material-symbols-outlined text-2xl transition-transform group-active:scale-90 ${isActive ? 'material-symbols-fill' : ''}`}>
                  {item.icon}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] md:text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
