
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReferEarnScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10 overflow-y-auto no-scrollbar">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <div onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center">রেফার করুন এবং আয় করুন</h2>
        <div className="flex w-12 items-center justify-end">
          <p className="text-primary text-sm font-bold shrink-0 cursor-pointer">হিস্ট্রি</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="w-full h-64 bg-primary/10 rounded-xl relative border border-primary/20 overflow-hidden">
           <img src="https://picsum.photos/600/400?random=12" alt="Refer Illustration" className="w-full h-full object-cover opacity-60" />
           <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-7xl material-symbols-fill">card_giftcard</span>
           </div>
        </div>
      </div>

      <div className="px-4 text-center">
        <h3 className="tracking-tight text-2xl font-extrabold pb-2">বন্ধুকে রেফার করুন এবং ১০০ টাকা পান</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm px-6">আপনার বন্ধুদের আমন্ত্রণ জানান এবং তারা কেনাকাটা করলে আপনার ওয়ালেটে বোনাস গ্রহণ করুন।</p>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-primary/50 rounded-xl p-6 flex flex-col items-center gap-4">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">আপনার রেফারেল কোড</p>
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 bg-background-light dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-14 flex items-center justify-center">
              <span className="text-xl font-bold tracking-widest uppercase">SHOP123K</span>
            </div>
            <button className="bg-primary text-background-dark font-bold h-14 px-6 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined text-lg">content_copy</span>
              কপি
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <h4 className="text-gray-600 text-xs font-bold text-center mb-4 uppercase tracking-widest">বন্ধুদের সাথে শেয়ার করুন</h4>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#25D366]/20">
            <span className="material-symbols-outlined">chat</span> WhatsApp
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#0084FF] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#0084FF]/20">
            <span className="material-symbols-outlined">send</span> Messenger
          </button>
        </div>
        <button className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300">
          <span className="material-symbols-outlined">share</span> অন্যান্য মাধ্যমে শেয়ার করুন
        </button>
      </div>

      <div className="px-4 bg-primary/5 py-8 rounded-t-[2.5rem]">
        <h4 className="text-lg font-bold text-center mb-8">কিভাবে কাজ করে?</h4>
        <div className="space-y-8 px-4">
          {[
            { id: '১', title: 'আপনার লিংক শেয়ার করুন', desc: 'আপনার রেফারেল লিংকটি বন্ধুদের সাথে বিভিন্ন মাধ্যমে শেয়ার করুন।' },
            { id: '২', title: 'বন্ধু প্রথম অর্ডার করলে', desc: 'আপনার লিংকের মাধ্যমে বন্ধু প্রথম কোনো পন্য অর্ডার করলে আপনি পয়েন্ট পাবেন।' },
            { id: '৩', title: '১০০ টাকা ওয়ালেটে পান', desc: 'অর্ডারটি সফলভাবে ডেলিভারি হওয়ার পর আপনার ওয়ালেটে ১০০ টাকা যোগ হবে।' }
          ].map(step => (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold text-lg">{step.id}</div>
                {step.id !== '৩' && <div className="w-0.5 h-12 bg-primary/30 my-1"></div>}
              </div>
              <div className="pt-1">
                <p className="font-bold text-base">{step.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferEarnScreen;
