
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

const ToolAccessScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock validity data (In a real app, calculate from purchase_date)
  const totalDays = 60;
  const daysPassed = 15;
  const daysRemaining = totalDays - daysPassed;
  const progressPercent = (daysRemaining / totalDays) * 100;
  const strokeDasharray = 440; // Approx for r=70 (2 * pi * r)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercent) / 100;

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
        <p className="font-black text-zinc-500 uppercase tracking-widest text-xs">অ্যাক্সেস যাচাই করা হচ্ছে...</p>
      </div>
    </div>
  );

  if (!product || !product.is_digital_tool) return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-sm">
        <span className="material-symbols-outlined text-red-500 text-8xl material-symbols-fill opacity-20">error</span>
        <h2 className="text-3xl font-black">অ্যাক্সেস অনুমোদিত নয়</h2>
        <p className="text-zinc-500 font-medium">এই টুলটির অ্যাক্সেস আপনার নেই অথবা এটি সঠিক লিংক নয়। দয়া করে আপনার অর্ডার হিস্ট্রি চেক করুন।</p>
        <button onClick={() => navigate('/')} className="w-full bg-primary py-4 rounded-2xl font-black text-background-dark shadow-xl shadow-primary/20 transition-transform active:scale-95">হোমে ফিরে যান</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between p-4 h-16 max-w-screen-xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center size-11 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-black leading-tight tracking-tight flex-1 text-center pr-11">টুল অ্যাক্সেস</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto w-full px-4 pb-24 pt-8">
        {/* Tool Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-5 mb-6 rounded-[2.5rem] bg-primary/10 border border-primary/20 shadow-2xl shadow-primary/10">
            <img src={product.image} alt="" className="size-16 object-contain" />
          </div>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">{product.name}</h2>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">সাবস্ক্রিপশন আইডি: #TOOL-{product.id.slice(0, 6)}</p>
        </div>

        {/* Validity Progress Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 mb-10 relative overflow-hidden shadow-2xl border border-black/5 group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="relative flex flex-col items-center justify-center">
            {/* Circular Progress Ring */}
            <div className="relative flex items-center justify-center mb-10">
              <svg className="size-48 md:size-56 -rotate-90">
                <circle className="text-zinc-100 dark:text-zinc-800" cx="50%" cy="50%" fill="transparent" r="70" stroke="currentColor" strokeWidth="10" />
                <circle 
                  className="text-primary transition-all duration-1000 ease-out" 
                  cx="50%" cy="50%" fill="transparent" r="70" 
                  stroke="currentColor" strokeWidth="10" 
                  strokeDasharray={strokeDasharray} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black text-zinc-900 dark:text-white">{daysRemaining}</span>
                <span className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-1">দিন বাকি</span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-zinc-600 dark:text-zinc-300 font-black text-lg">মোট মেয়াদ: {totalDays} দিন</p>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 px-4 py-2 rounded-xl">পরবর্তী রিনিউয়াল: ২৪ জুন, ২০২৪</p>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="mb-12">
          <a 
            href={product.tool_external_url || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-[2rem] bg-zinc-900 dark:bg-primary py-6 text-xl font-black text-white dark:text-background-dark shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span className="material-symbols-outlined text-3xl">bolt</span>
            টুলটি ব্যবহার করুন
          </a>
          <p className="text-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-5 italic">এক ক্লিকে ড্যাশবোর্ডে প্রবেশ করুন</p>
        </div>

        {/* Usage Guidelines - Timeline Style */}
        <div className="bg-zinc-100/50 dark:bg-zinc-800/30 rounded-[2.5rem] p-8 md:p-10 border border-black/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-8 bg-primary rounded-full"></div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">ব্যবহারের নিয়মাবলী</h3>
          </div>
          <div className="space-y-0">
            {[
              { icon: 'link', title: 'লিংকে ক্লিক করুন', desc: 'আমাদের ডিরেক্ট এক্সেস পোর্টালে যেতে উপরের বাটনে ক্লিক করুন।' },
              { icon: 'login', title: 'আইডি দিয়ে লগইন করুন', desc: 'আপনার নিবন্ধিত ইমেইল ও পাসওয়ার্ড বা প্রোভাইড করা কি (Key) ব্যবহার করুন।' },
              { icon: 'verified_user', title: 'নিরাপদ ব্যবহার', desc: 'একই সাথে একাধিক ডিভাইসে ব্যবহার থেকে বিরত থাকুন, অন্যথায় অ্যাকাউন্ট সাসপেন্ড হতে পারে।' }
            ].map((step, idx, arr) => (
              <div key={idx} className="grid grid-cols-[48px_1fr] gap-x-6">
                <div className="flex flex-col items-center">
                  <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/10 shadow-lg">
                    <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                  </div>
                  {idx < arr.length - 1 && <div className="w-[3px] bg-zinc-200 dark:bg-zinc-700 h-14 my-1"></div>}
                </div>
                <div className="pt-1 pb-6">
                  <p className="text-zinc-900 dark:text-white font-black text-lg">{step.title}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 flex flex-col items-center gap-4 py-8 border-t border-black/5">
          <p className="text-zinc-500 font-bold text-sm">কোনো সমস্যা হচ্ছে?</p>
          <button onClick={() => navigate('/help-center')} className="text-primary font-black text-lg hover:underline decoration-2 underline-offset-8">সাপোর্ট টিমের সাথে কথা বলুন</button>
        </div>
      </main>
    </div>
  );
};

export default ToolAccessScreen;
