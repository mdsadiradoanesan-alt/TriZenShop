
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Address } from '../types';

interface AddressScreenProps {
  addresses: Address[];
}

const AddressScreen: React.FC<AddressScreenProps> = ({ addresses }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <span className="material-symbols-outlined text-zinc-900 dark:text-white">arrow_back_ios_new</span>
        </button>
        <h1 className="text-zinc-900 dark:text-white text-lg font-bold leading-tight">আমার ঠিকানা</h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 text-emerald-700 dark:text-primary p-1.5 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">
                      {addr.label === 'বাসা' ? 'house' : addr.label === 'অফিস' ? 'work' : 'location_on'}
                    </span>
                  </div>
                  <span className="text-zinc-900 dark:text-white font-semibold text-base">{addr.label}</span>
                  {addr.isDefault && <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-bold uppercase">ডিফল্ট</span>}
                </div>
                <button onClick={() => navigate('/edit-address')} className="p-2 text-zinc-500 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-zinc-800 dark:text-zinc-100 font-medium">{addr.name}</p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{addr.phone}</p>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mt-2">{addr.details}, {addr.area}</p>
              </div>
            </div>
            <div className="border-t border-zinc-50 dark:border-zinc-800 px-4 py-3 flex justify-end bg-zinc-50/50 dark:bg-zinc-800/30">
              <button className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm font-medium hover:opacity-80">
                <span className="material-symbols-outlined text-base">delete</span>
                মুছে ফেলুন
              </button>
            </div>
          </div>
        ))}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 z-50">
        <button 
          onClick={() => navigate('/edit-address')}
          className="w-full bg-primary hover:bg-primary/90 text-zinc-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined font-bold">add_location_alt</span>
          <span>নতুন ঠিকানা যোগ করুন</span>
        </button>
      </div>
    </div>
  );
};

export default AddressScreen;
