
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center p-4 border-b border-black/5 dark:border-white/5">
        <div onClick={() => navigate('/')} className="text-gray-800 dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">অর্ডার কনফার্মেশন</h2>
      </div>

      <div className="flex flex-col items-center justify-center pt-10 pb-6 px-4">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-6 animate-bounce">
          <span className="material-symbols-outlined text-white text-6xl material-symbols-fill">check_circle</span>
        </div>
        <h1 className="tracking-tight text-[32px] font-bold text-center pb-2">অর্ডার সফল হয়েছে!</h1>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal px-8 text-center">আপনার অর্ডারের জন্য ধন্যবাদ। শীঘ্রই আপনি একটি কনফার্মেশন ইমেল পাবেন।</p>
      </div>

      {orderId && (
      <div className="px-4 py-2">
        <div className="bg-white dark:bg-background-dark/50 border border-gray-100 dark:border-white/10 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold uppercase tracking-wide">অর্ডার আইডি: #{orderId.slice(0, 8)}</p>
              <p className="text-primary font-medium text-sm">স্ট্যাটাস: পেন্ডিং</p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">shopping_bag</span>
            </div>
          </div>
          <div className="h-[1px] bg-gray-100 dark:bg-white/10 w-full mb-4"></div>
          <div className="flex gap-3">
            <div className="text-primary">
              <span className="material-symbols-outlined material-symbols-fill">location_on</span>
            </div>
            <div>
              <p className="text-sm font-bold mb-1">ডেলিভারি</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">আপনার ডিফল্ট ঠিকানায় পাঠানো হবে</p>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className="mt-auto p-4 flex flex-col gap-3">
        {orderId && (
          <button 
            onClick={() => navigate(`/order-tracking/${orderId}`)}
            className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">local_shipping</span>
            অর্ডার ট্র্যাক করুন
          </button>
        )}
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-transparent border-2 border-primary/30 dark:border-primary/20 hover:bg-primary/5 text-primary font-bold py-4 rounded-xl transition-all"
        >
          কেনাকাটা চালিয়ে যান
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;