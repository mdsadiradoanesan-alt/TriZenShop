
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EditProfileScreenProps {
  user: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-[#0d1b12] dark:text-white text-lg font-bold flex-1 text-center font-display">প্রোফাইল এডিট করুন</h2>
        <div className="w-12 flex justify-end">
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="relative group cursor-pointer">
            <img 
              src={user?.user_metadata?.avatar_url || "https://picsum.photos/200/200?random=10"} 
              alt="Profile" 
              className="size-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl" 
            />
            <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-white dark:border-gray-800 shadow-lg hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white text-sm">photo_camera</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[#0d1b12] dark:text-white text-2xl font-bold font-display">{user?.user_metadata?.full_name || "উম্মে কুলসুম"}</p>
            <p className="text-primary font-bold text-sm cursor-pointer hover:underline mt-1">ছবি পরিবর্তন করুন</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#0d1b12] dark:text-gray-200 text-sm font-bold ml-1">নাম</label>
            <input 
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/50 transition-all" 
              placeholder="আপনার নাম লিখুন" 
              defaultValue={user?.user_metadata?.full_name || "উম্মে কুলসুম"} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#0d1b12] dark:text-gray-200 text-sm font-bold ml-1">ইমেইল</label>
            <input 
              type="email"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/50 transition-all" 
              placeholder="আপনার ইমেইল এড্রেস" 
              defaultValue={user?.email || "umme.kulsum@example.com"} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#0d1b12] dark:text-gray-200 text-sm font-bold ml-1">ফোন নম্বর</label>
            <div className="relative">
              <input 
                type="tel"
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/50 transition-all" 
                placeholder="০১৭XXXXXXXX" 
                defaultValue={user?.user_metadata?.phone || "+৮৮০ ১৭XXXX-XXXXXX"} 
              />
              <span className="material-symbols-outlined text-primary absolute right-4 top-1/2 -translate-y-1/2">check_circle</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-50">
        <button 
          onClick={() => navigate('/profile')}
          className="w-full bg-primary hover:opacity-90 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          পরিবর্তন সংরক্ষণ করুন
        </button>
      </footer>
    </div>
  );
};

export default EditProfileScreen;
