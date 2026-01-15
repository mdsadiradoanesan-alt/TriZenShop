
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileScreenProps {
  user: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
  const navigate = useNavigate();

  const sections = [
    { title: 'আমার অর্ডার', icon: 'shopping_bag', color: 'primary', path: '/order-history' },
    { title: 'প্রিয় তালিকা', icon: 'favorite', color: 'primary', path: '/wishlist' },
    { title: 'ডেলিভারি ঠিকানা', icon: 'location_on', color: 'primary', path: '/addresses' },
    { title: 'রিভিউ সমূহ', icon: 'rate_review', color: 'primary', path: '/profile' },
  ];

  const settings = [
    { title: 'প্রোফাইল এডিট', icon: 'person_edit', path: '/edit-profile' },
    { title: 'ভাষা পরিবর্তন', icon: 'language', extra: 'বাংলা' },
    { title: 'সহায়তা কেন্দ্র', icon: 'help', path: '/help-center' },
    { title: 'আমাদের সম্পর্কে', icon: 'info' },
  ];

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-x-hidden pb-32">
      <div className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-xl md:text-2xl font-black flex-1 text-center pr-12">আমার প্রোফাইল</h2>
      </div>

      <div className="flex p-8 flex-col gap-6 items-center">
        <div className="relative group">
          <div className="aspect-square rounded-[2.5rem] min-h-32 w-32 border-4 border-white dark:border-[#1a3a24] shadow-2xl overflow-hidden bg-gray-200">
             <img src={user?.user_metadata?.avatar_url || "https://picsum.photos/200/200?random=10"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button 
            onClick={() => navigate('/edit-profile')}
            className="absolute -bottom-2 -right-2 size-10 bg-primary text-background-dark rounded-2xl border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined text-xl font-bold">edit</span>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-2xl font-black tracking-tight">{user?.user_metadata?.full_name || 'আরিফ আহমেদ'}</p>
          <p className="text-zinc-500 text-sm font-bold">{user?.email || 'arif@bazaar.com'}</p>
          <div className="mt-4 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            <p className="text-primary text-xs font-black uppercase tracking-widest">প্রিমিয়াম মেম্বার: গোল্ড</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-8">
        {sections.map(sec => (
          <div 
            key={sec.title}
            onClick={() => navigate(sec.path)}
            className="flex flex-col gap-3 rounded-[2.5rem] border border-[#cfe7d7] dark:border-[#1a3a24] bg-white dark:bg-[#152b1d] p-6 items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="text-primary bg-primary/10 p-3 rounded-2xl">
              <span className="material-symbols-outlined text-3xl">{sec.icon}</span>
            </div>
            <h2 className="text-sm font-black leading-tight uppercase tracking-tight">{sec.title}</h2>
          </div>
        ))}
      </div>

      <div className="px-4 md:px-8 mt-10">
        <h3 className="text-lg font-black uppercase tracking-tight px-2 mb-4">অ্যাকাউন্ট সেটিংস</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {settings.map(item => (
            <div 
              key={item.title} 
              onClick={() => item.path && navigate(item.path)}
              className="flex items-center gap-4 bg-white dark:bg-[#152b1d] p-4 rounded-3xl justify-between shadow-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors border border-black/5"
            >
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-2xl bg-primary/10 shrink-0 size-12">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <p className="text-base font-bold text-zinc-700 dark:text-zinc-200">{item.title}</p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {item.extra && <p className="text-primary text-xs font-black">{item.extra}</p>}
                <span className="material-symbols-outlined text-zinc-400 text-xl">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 mt-6">
        <button 
          onClick={() => navigate('/login')}
          className="w-full py-5 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-colors"
        >
          <span className="material-symbols-outlined font-bold">logout</span>
          লগ আউট করুন
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
