
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      });

      if (error) throw error;
      
      // Navigate to home after successful signup
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'নিবন্ধন সম্পন্ন করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <div className="flex items-center p-4 justify-between sticky top-0 z-10">
        <div onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-12 items-center cursor-pointer">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">নিবন্ধন করুন</h2>
      </div>

      <div className="flex flex-col flex-1 px-6 pt-6 max-w-[480px] mx-auto w-full">
        <div className="mb-6">
          <h1 className="tracking-tight text-[28px] font-extrabold text-center pb-2">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm">সেরা অফার ও শপিং অভিজ্ঞতার জন্য নিবন্ধন করুন</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100 font-bold">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-base font-medium pb-2 block">পুরো নাম</label>
            <input 
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 p-4 focus:ring-primary focus:border-primary transition-all" 
              placeholder="আপনার পুরো নাম লিখুন" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="text-base font-medium pb-2 block">ইমেইল</label>
            <input 
              type="email"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 p-4 focus:ring-primary focus:border-primary transition-all" 
              placeholder="আপনার ইমেইল এড্রেস" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="text-base font-medium pb-2 block">মোবাইল নম্বর</label>
            <input 
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 p-4 focus:ring-primary focus:border-primary transition-all" 
              placeholder="আপনার মোবাইল নম্বর লিখুন" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="text-base font-medium pb-2 block">পাসওয়ার্ড</label>
            <div className="flex items-stretch rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <input 
                className="w-full border-none bg-white dark:bg-slate-800 h-14 p-4 focus:ring-0" 
                placeholder="পাসওয়ার্ড দিন" 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="bg-white dark:bg-slate-800 flex items-center pr-4">
                <span className="material-symbols-outlined">visibility</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <input type="checkbox" id="terms" className="size-5 rounded border-slate-300 text-primary focus:ring-primary/50" />
            <label htmlFor="terms" className="text-slate-600 dark:text-slate-400 text-sm">আমি <span className="text-primary font-semibold underline">শর্তাবলীতে রাজি</span></label>
          </div>

          <button 
            onClick={handleSignup} 
            disabled={loading}
            className={`bg-primary hover:bg-opacity-90 text-slate-900 text-lg font-bold py-4 mt-4 rounded-xl shadow-lg shadow-primary/20 transition-all ${loading ? 'opacity-70 animate-pulse' : ''}`}
          >
            {loading ? 'প্রক্রিয়াধীন...' : 'নিবন্ধন সম্পন্ন করুন'}
          </button>
        </div>

        <div className="mt-auto py-10 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-base">
            আপনার কি অ্যাকাউন্ট আছে? 
            <button onClick={() => navigate('/login')} className="text-primary font-bold ml-1 hover:underline">লগইন করুন</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
