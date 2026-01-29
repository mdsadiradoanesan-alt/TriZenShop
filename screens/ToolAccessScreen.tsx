
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

const ToolAccessScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'download' | 'live'>('live');

  // Business Logic: Simulating subscription dates
  // In a real app, fetch purchase_date from 'orders' table. For now, mocking.
  const purchaseDate = new Date('2024-01-22'); // Example date
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - purchaseDate.getTime());
  const daysPassed = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  const validityPeriod = 30; // 30 days of free updates
  const daysRemaining = Math.max(0, validityPeriod - daysPassed);
  const isExpired = daysRemaining === 0;

  // Mock Versions
  const latestVersion = "v2.1.0";
  const userVersion = isExpired ? "v1.5.0" : latestVersion;

  useEffect(() => {
    const fetchToolDetails = async () => {
      if (!id) return;
      try {
        const { data } = await supabase.from('products').select('*').eq('id', id).single();
        if (data) {
          setProduct({
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image_url,
            category: data.category_id,
            rating: data.rating,
            reviews: data.review_count,
            tool_external_url: data.tool_external_url,
            is_digital_tool: data.is_digital_tool,
            validity_days: data.validity_days || 30
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchToolDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="size-24 border-[6px] border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <p className="font-black text-zinc-500 uppercase tracking-widest text-xs">লাইসেন্স ও টুল লোড হচ্ছে...</p>
      </div>
    </div>
  );

  if (!product || !product.is_digital_tool) return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-sm">
        <span className="material-symbols-outlined text-red-500 text-8xl material-symbols-fill opacity-20">error</span>
        <h2 className="text-3xl font-black">অ্যাক্সেস অনুমোদিত নয়</h2>
        <button onClick={() => navigate('/')} className="w-full bg-primary py-4 rounded-2xl font-black text-background-dark shadow-xl shadow-primary/20 transition-transform active:scale-95">হোমে ফিরে যান</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col h-screen overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white dark:bg-zinc-900 border-b border-black/5 dark:border-white/5 shrink-0 z-50">
        <div className="flex items-center justify-between p-3 h-16 max-w-screen-xl mx-auto w-full">
          <button onClick={() => navigate('/my-tools')} className="flex items-center justify-center size-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
          </button>
          
          <div className="flex items-center gap-2">
            <img src={product.image} className="size-8 rounded-lg object-cover" />
            <h1 className="text-sm font-black hidden md:block">{product.name}</h1>
          </div>

          <div className="flex gap-2">
            {/* Status Indicator */}
             <div className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${isExpired ? 'bg-red-50 border-red-100 text-red-600' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                <span className={`size-2 rounded-full ${isExpired ? 'bg-red-500' : 'bg-primary animate-pulse'}`}></span>
                <span className="text-[10px] font-black uppercase tracking-wide">{isExpired ? 'Expired' : 'Active'}</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
        
        {/* Tab Switcher */}
        <div className="flex justify-center py-6 px-4 shrink-0">
          <div className="bg-white dark:bg-zinc-900 p-1 rounded-2xl shadow-sm border border-black/5 inline-flex relative z-10">
            <button 
              onClick={() => setActiveTab('live')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'live' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow-md' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
            >
              <span className="material-symbols-outlined text-base">preview</span>
              লাইভ টুল
            </button>
            <button 
              onClick={() => setActiveTab('download')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'download' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow-md' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
            >
              <span className="material-symbols-outlined text-base">code</span>
              সোর্স কোড
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 px-4 pb-24 max-w-4xl mx-auto w-full">
           
           {/* If Expired, Show Banner */}
           {isExpired && (
             <div className="bg-red-500 text-white p-4 rounded-2xl mb-6 shadow-lg shadow-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4">
                <div className="flex items-center gap-3">
                   <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
                     <span className="material-symbols-outlined font-bold">lock_clock</span>
                   </div>
                   <div>
                     <p className="font-black text-sm uppercase tracking-wide opacity-90">আপডেট মেয়াদ শেষ</p>
                     <p className="text-xs opacity-80">আপনি লেটেস্ট ফিচারগুলো মিস করছেন</p>
                   </div>
                </div>
                <button className="bg-white text-red-600 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-colors w-full md:w-auto">
                  রিনিউ করুন
                </button>
             </div>
           )}

           {activeTab === 'live' ? (
             <div className="w-full h-[60vh] bg-zinc-100 dark:bg-zinc-800 rounded-[2rem] border-4 border-white dark:border-zinc-700 shadow-xl overflow-hidden relative">
                {isExpired && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500 z-20"></div>
                )}
                {/* Iframe for Live Tool */}
                <iframe 
                  src={product.tool_external_url} 
                  className="w-full h-full bg-white"
                  title="Live Tool Preview"
                />
                <div className="absolute bottom-4 right-4 z-10">
                   <a href={product.tool_external_url} target="_blank" className="bg-black/80 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-md hover:bg-black">
                     <span className="material-symbols-outlined text-sm">open_in_new</span>
                     ব্রাউজারে খুলুন
                   </a>
                </div>
             </div>
           ) : (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                {/* Version Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 text-center border border-black/5 dark:border-white/5 relative overflow-hidden">
                   <div className={`absolute top-0 left-0 w-full h-2 ${isExpired ? 'bg-zinc-200' : 'bg-primary'}`}></div>
                   <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">আপনার ভার্সন</p>
                   <h2 className="text-6xl font-black tracking-tighter text-zinc-800 dark:text-white mb-6">{userVersion}</h2>
                   
                   {!isExpired ? (
                     <a href="#" className="inline-flex items-center gap-3 bg-primary text-background-dark px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-2xl">cloud_download</span>
                        ডাউনলোড কোড
                     </a>
                   ) : (
                     <div className="flex flex-col gap-3">
                       <button disabled className="inline-flex items-center justify-center gap-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-400 px-8 py-4 rounded-2xl font-bold text-lg cursor-not-allowed">
                          <span className="material-symbols-outlined">lock</span>
                          আপডেট লক করা হয়েছে
                       </button>
                       <p className="text-xs text-red-500 font-bold">নতুন ভার্সন {latestVersion} ডাউনলোড করতে রিনিউ করুন</p>
                     </div>
                   )}
                </div>

                {/* Changelog */}
                <div className="bg-zinc-50 dark:bg-white/5 rounded-[2rem] p-6 border border-black/5">
                   <h3 className="text-sm font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                     <span className="material-symbols-outlined">history</span>
                     আপডেট হিস্ট্রি
                   </h3>
                   <div className="space-y-4">
                      <div className="flex gap-4 opacity-50 grayscale">
                         <div className="flex flex-col items-center gap-1">
                            <div className="size-3 bg-zinc-300 rounded-full"></div>
                            <div className="w-0.5 h-full bg-zinc-200"></div>
                         </div>
                         <div className="pb-4">
                            <p className="font-bold text-sm">v1.5.0</p>
                            <p className="text-xs text-zinc-500"> ইনিশিয়াল রিলিজ</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex flex-col items-center gap-1">
                            <div className="size-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                         </div>
                         <div>
                            <p className="font-bold text-sm flex items-center gap-2">
                               {latestVersion} 
                               {isExpired && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 rounded uppercase">Locked</span>}
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">বাগ ফিক্স এবং ডার্ক মোড ইমপ্রুভমেন্ট</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ToolAccessScreen;