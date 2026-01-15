
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpCenterScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32">
      <div className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">সাহায্য কেন্দ্র</h2>
      </div>

      <div className="px-4 py-3">
        <div className="flex w-full h-12 rounded-lg overflow-hidden bg-primary/10 dark:bg-primary/5">
          <div className="text-[#4c9a66] flex items-center justify-center pl-4">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input className="w-full bg-transparent border-none focus:ring-0 text-base placeholder:text-[#4c9a66] px-4 pl-2" placeholder="আপনার সমস্যাটি সার্চ করুন" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        {[
          { icon: 'package_2', label: 'অর্ডার সংক্রান্ত' },
          { icon: 'payments', label: 'পেমেন্ট' },
          { icon: 'keyboard_return', label: 'রিটার্ন' },
          { icon: 'account_circle', label: 'অ্যাকাউন্ট' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white dark:bg-background-dark/50 p-4 items-center justify-center text-center cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="text-primary p-2 bg-primary/10 rounded-full">
              <span className="material-symbols-outlined text-3xl">{item.icon}</span>
            </div>
            <h2 className="text-sm font-bold leading-tight">{item.label}</h2>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold px-4 pb-2 pt-4">সাধারণ জিজ্ঞাসা (FAQ)</h3>
      <div className="flex flex-col p-4 pt-0">
        {[
          { q: 'আমার অর্ডারটি কোথায়?', a: "আপনি আপনার প্রোফাইল থেকে 'আমার অর্ডার' সেকশনে গিয়ে অর্ডারের বর্তমান অবস্থা জানতে পারবেন।", open: true },
          { q: 'পেমেন্ট কিভাবে ফেরত পাবো?', a: 'রিটার্ন অ্যাপ্রুভ হওয়ার ৭-১০ কার্যদিবসের মধ্যে আপনার অরিজিনাল পেমেন্ট মেথডে টাকা ফেরত দেওয়া হবে।' },
          { q: 'কিভাবে পাসওয়ার্ড পরিবর্তন করবো?', a: "অ্যাকাউন্ট সেটিংস থেকে 'সিকিউরিটি' অপশনে গিয়ে আপনি আপনার পাসওয়ার্ড পরিবর্তন করতে পারেন।" },
          { q: 'ডেলিভারি চার্জ কত?', a: 'ঢাকার ভেতরে ৬০ টাকা এবং ঢাকার বাইরে ১২০ টাকা ডেলিভারি চার্জ প্রযোজ্য।' }
        ].map((faq, i) => (
          <details key={i} className="flex flex-col border-b border-primary/10 py-3 group" open={faq.open}>
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
              <p className="text-sm font-medium leading-normal">{faq.q}</p>
              <div className="text-[#4c9a66] group-open:rotate-180 transition-transform">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </summary>
            <p className="text-[#4c9a66] dark:text-primary/80 text-sm font-normal leading-relaxed pb-2">{faq.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-auto p-4 space-y-3 pb-10">
        <h3 className="text-md font-bold mb-4">আমাদের সাথে যোগাযোগ করুন</h3>
        <button className="flex items-center justify-center gap-3 w-full bg-primary py-4 rounded-xl text-background-dark font-bold text-base shadow-lg shadow-primary/20 active:scale-95 transition-transform">
          <span className="material-symbols-outlined material-symbols-fill">chat</span>
          লাইভ চ্যাট
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 w-full bg-white dark:bg-background-dark border border-primary py-3 rounded-xl text-primary font-bold text-sm">
            <span className="material-symbols-outlined text-lg">call</span> কল করুন
          </button>
          <button className="flex items-center justify-center gap-2 w-full bg-white dark:bg-background-dark border border-primary py-3 rounded-xl text-primary font-bold text-sm">
            <span className="material-symbols-outlined text-lg">mail</span> ইমেইল পাঠান
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterScreen;
