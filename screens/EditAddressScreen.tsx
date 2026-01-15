
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAddressScreen: React.FC = () => {
  const navigate = useNavigate();
  const [label, setLabel] = useState('Home');

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <div className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-12 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl md:text-2xl font-black">ঠিকানা পরিবর্তন</h2>
        <div className="size-12"></div>
      </div>

      <div className="p-6 space-y-6 max-w-xl mx-auto w-full">
        <div className="flex gap-3">
          {['Home', 'Office', 'Other'].map(l => (
            <button 
              key={l}
              onClick={() => setLabel(l)}
              className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${label === l ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'bg-white dark:bg-white/5 border border-black/5'}`}
            >
              {l === 'Home' ? 'বাসা' : l === 'Office' ? 'অফিস' : 'অন্যান্য'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-400 ml-2">পুরো নাম</label>
            <input className="w-full bg-white dark:bg-white/5 border-none rounded-2xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/50" placeholder="আপনার নাম" defaultValue="আরিফ আহমেদ" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-400 ml-2">ফোন নম্বর</label>
            <input className="w-full bg-white dark:bg-white/5 border-none rounded-2xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/50" placeholder="০১৭xxxxxxxx" defaultValue="০১৭০০-০০০০০০" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-400 ml-2">এলাকা / শহর</label>
            <input className="w-full bg-white dark:bg-white/5 border-none rounded-2xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/50" placeholder="যেমন: উত্তরা, ঢাকা" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-400 ml-2">বিস্তারিত ঠিকানা</label>
            <textarea className="w-full bg-white dark:bg-white/5 border-none rounded-2xl h-32 p-6 font-bold focus:ring-2 focus:ring-primary/50 resize-none" placeholder="বাসা নং, রোড নং, ল্যান্ডমার্ক..." />
          </div>
        </div>

        <div className="flex items-center gap-4 py-4">
          <input type="checkbox" id="default-addr" className="size-6 rounded-lg text-primary focus:ring-primary/50 border-none bg-white dark:bg-white/10" defaultChecked />
          <label htmlFor="default-addr" className="font-bold text-sm">ডিফল্ট ঠিকানা হিসেবে সেট করুন</label>
        </div>

        <button onClick={() => navigate(-1)} className="w-full py-5 bg-primary text-background-dark rounded-[2.5rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
          ঠিকানা সংরক্ষণ করুন
        </button>
      </div>
    </div>
  );
};

export default EditAddressScreen;
