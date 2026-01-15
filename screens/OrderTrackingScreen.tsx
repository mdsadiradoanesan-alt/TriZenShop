
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTrackingScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
            </button>
            <h2 className="text-lg font-bold">অর্ডার ট্র্যাকিং</h2>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">help_outline</span>
          </button>
        </div>
      </header>

      <main className="overflow-y-auto no-scrollbar">
        <section className="px-4 py-6 border-b border-black/5 dark:border-white/5">
          <h3 className="text-2xl font-bold mb-1">অর্ডার আইডি: #১২৩৪৫</h3>
          <p className="text-primary font-medium text-sm">প্রত্যাশিত ডেলিভারি: ১২ জুন, ২০২৪</p>
        </section>

        <section className="px-4 py-8">
          <div className="grid grid-cols-[40px_1fr] gap-x-3">
            {[
              { title: 'অর্ডার করা হয়েছে', time: '১০ জুন, ১০:৩০ AM', status: 'done' },
              { title: 'নিশ্চিত করা হয়েছে', time: '১০ জুন, ১১:০০ AM', status: 'done' },
              { title: 'পাঠানো হয়েছে', time: '১১ জুন, ০৯:০০ AM', status: 'active', icon: 'local_shipping' },
              { title: 'পৌঁছেছে', time: 'প্রত্যাশিত: ১২ জুন', status: 'pending', icon: 'inventory_2' },
            ].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div className={`size-8 rounded-full flex items-center justify-center ${step.status === 'done' || step.status === 'active' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`}>
                    {step.status === 'done' ? (
                      <span className="material-symbols-outlined text-white text-[20px]">check</span>
                    ) : (
                      <span className={`material-symbols-outlined text-[20px] ${step.status === 'active' ? 'text-white' : 'text-gray-400'}`}>{step.icon || 'check'}</span>
                    )}
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`w-[3px] h-12 ${step.status === 'done' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  )}
                </div>
                <div className={`${i < arr.length - 1 ? 'pb-8' : ''}`}>
                  <p className={`text-base font-bold ${step.status === 'active' ? 'text-primary' : step.status === 'pending' ? 'text-gray-400' : ''}`}>{step.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{step.time}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="px-4 mt-4">
          <h3 className="text-lg font-bold mb-4">লাইভ ট্র্যাকিং</h3>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5">
            <img 
              alt="Delivery Map" 
              className="w-full h-full object-cover grayscale-[0.5] contrast-[1.1]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQhRLBHHcwKXEHASCwHH59dCs7ncefRIxvT6_Xb1f-B9jLwgGOx6nFout6f6f0SoAqL4v1sCA-HlqIxK8i2xEQKpfP6BIrZtgsgecVIGNhMvG9-skTPHR3An2NqgrVu5OjSDlrzqamVPf5iocw-f-d9tNyVsQtz03el3wux61pRJoiliUKdSdlneLgrofoqRkP6X8CtxlGbBzEuHG_vVXwWVq7STLc1obDWkB6HLvsKopK2YyNkvQfiOeWXzY147MiSgsW59IAtL7k" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex flex-col items-center animate-bounce">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                  <span className="material-symbols-outlined text-[24px]">moped</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <span className="bg-white/90 dark:bg-background-dark/90 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-2">
                <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                আপনার কাছে পৌঁছাতে ১০ মিনিট বাকি
              </span>
            </div>
          </div>
        </section>

        <section className="px-4 mt-6">
          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-black/5 dark:border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full overflow-hidden bg-gray-200">
                  <img src="https://picsum.photos/100/100?random=8" alt="Rider" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-base">রাহাত আহমেদ</p>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px] material-symbols-fill">star</span>
                    <span className="text-xs font-semibold">৪.৯ রেটিং</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined">call</span></button>
                <button className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined">message</span></button>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-background-dark font-bold rounded-xl shadow-lg shadow-primary/20">
              রাইডারের সাথে যোগাযোগ করুন
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrderTrackingScreen;
