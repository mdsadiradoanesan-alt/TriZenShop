
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10">
        <div onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-lg font-bold flex-1">পাসওয়ার্ড রিসেট করুন</h2>
      </div>

      <div className="flex-1 px-4 pt-8 pb-4">
        <h2 className="tracking-light text-[28px] font-bold leading-tight">আপনার নতুন পাসওয়ার্ডটি লিখুন</h2>
        <p className="text-[#4c9a66] text-sm mt-2 font-medium">নিরাপত্তার জন্য একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করুন</p>

        <div className="space-y-6 mt-8">
          <div>
            <p className="text-base font-medium pb-2">নতুন পাসওয়ার্ড</p>
            <div className="flex items-stretch rounded-lg overflow-hidden border border-[#cfe7d7] dark:border-[#2a4d36] bg-[#f8fcf9] dark:bg-[#1a2e21]">
              <input className="w-full border-none bg-transparent h-14 p-4 focus:ring-0" placeholder="••••••••" type="password" />
              <div className="flex items-center pr-4">
                <span className="material-symbols-outlined text-[#4c9a66]">visibility</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-base font-medium pb-2">পাসওয়ার্ড নিশ্চিত করুন</p>
            <div className="flex items-stretch rounded-lg overflow-hidden border border-[#cfe7d7] dark:border-[#2a4d36] bg-[#f8fcf9] dark:bg-[#1a2e21]">
              <input className="w-full border-none bg-transparent h-14 p-4 focus:ring-0" placeholder="••••••••" type="password" />
              <div className="flex items-center pr-4">
                <span className="material-symbols-outlined text-[#4c9a66]">visibility</span>
              </div>
            </div>
          </div>
        </div>

        <ul className="text-xs text-[#4c9a66] space-y-1 mt-4">
          <li className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> কমপক্ষে ৮টি অক্ষর</li>
          <li className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> অক্ষর এবং সংখ্যা উভয়ই থাকতে হবে</li>
        </ul>
      </div>

      <div className="p-4 border-t border-[#cfe7d7] dark:border-[#2a4d36]">
        <button onClick={() => navigate('/login')} className="w-full bg-primary text-[#0d1b12] text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98]">
          পাসওয়ার্ড আপডেট করুন
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
