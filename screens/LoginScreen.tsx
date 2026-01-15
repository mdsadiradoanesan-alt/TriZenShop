
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('দয়া করে ইমেইল এবং পাসওয়ার্ড দিন।');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'লগইন করতে সমস্যা হয়েছে। ইমেইল বা পাসওয়ার্ড চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      {/* Header */}
      <div className="flex items-center p-4 justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-white bg-blue-600 size-10 flex items-center justify-center rounded-sm shadow-md active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-2xl font-bold">chevron_left</span>
        </button>
        <h2 className="text-base font-bold flex-1 text-center pr-10">লগইন</h2>
      </div>

      <div className="flex flex-col flex-1 px-6 pt-12 max-w-[480px] mx-auto w-full">
        {/* Welcome Text */}
        <div className="mb-10 text-center">
          <h1 className="tracking-tight text-4xl font-black text-slate-900 dark:text-white pb-3">স্বাগতম!</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">আপনার অ্যাকাউন্টে লগইন করে কেনাকাটা শুরু করুন</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 text-red-500 text-xs rounded-xl border border-red-100 dark:border-red-900/30 font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        <div className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-bold ml-1">ইমেইল</label>
            <div className="relative">
              <input 
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-16 px-5 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                placeholder="আপনার ইমেইল লিখুন" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-bold ml-1">পাসওয়ার্ড</label>
            <div className="relative flex items-center">
              <input 
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-16 px-5 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                placeholder="পাসওয়ার্ড" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button onClick={() => navigate('/reset-password')} className="text-primary text-sm font-bold hover:underline">পাসওয়ার্ড ভুলে গেছেন?</button>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col gap-4">
          <button 
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-primary hover:brightness-105 text-slate-900 text-lg font-black py-4.5 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? (
              <span className="size-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></span>
            ) : null}
            লগইন করুন
          </button>

          {/* New Guest Button */}
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            অতিথি হিসেবে ব্রাউজ করুন
          </button>
        </div>

        {/* Separator */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
            <span className="bg-background-light dark:bg-background-dark px-4 text-slate-400">অথবা এটি দিয়ে প্রবেশ করুন</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] shadow-sm">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="size-5" />
            <span className="font-bold text-slate-700 dark:text-slate-200">গুগল দিয়ে প্রবেশ করুন</span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-auto py-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            আপনার কি অ্যাকাউন্ট নেই? 
            <button onClick={() => navigate('/signup')} className="text-primary font-black ml-2 hover:underline">নিবন্ধন করুন</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
