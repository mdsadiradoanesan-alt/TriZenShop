
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPScreen: React.FC = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(52);

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <div className="flex items-center p-4 justify-between sticky top-0 z-10">
        <div onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-12 items-center cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">ওটিপি যাচাইকরণ</h2>
      </div>

      <main className="flex-1 flex flex-col px-6 pt-10">
        <h3 className="tracking-tight text-3xl font-bold text-center mb-2">ওটিপি যাচাইকরণ</h3>
        <p className="text-slate-600 dark:text-slate-400 text-base text-center mb-8">আপনার মোবাইল নম্বরে একটি ৬-সংখ্যার কোড পাঠানো হয়েছে</p>

        <div className="flex justify-center py-6 gap-2 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <input 
              key={i}
              maxLength={1}
              className="flex h-14 w-11 sm:w-12 text-center rounded-lg border-0 border-b-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xl font-bold focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 font-bold">00</div>
              <p className="text-xs text-slate-500">মিনিট</p>
            </div>
            <div className="text-slate-400 font-bold pb-4">:</div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 font-bold">
                {timer.toString().padStart(2, '0')}
              </div>
              <p className="text-xs text-slate-500">সেকেন্ড</p>
            </div>
          </div>
          <button 
            disabled={timer > 0}
            className={`mt-2 font-bold text-sm flex items-center gap-1 ${timer > 0 ? 'text-slate-300' : 'text-primary underline'}`}
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            কোডটি আবার পাঠান
          </button>
        </div>

        <div className="mt-auto pb-10">
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            যাচাই করুন
          </button>
        </div>
      </main>
    </div>
  );
};

export default OTPScreen;
