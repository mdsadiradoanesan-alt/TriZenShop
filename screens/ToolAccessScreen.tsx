
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

const ToolAccessScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToolDetails = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
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
            is_digital_tool: data.is_digital_tool
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

  if (loading) return <div className="p-20 text-center animate-pulse">অ্যাক্সেস যাচাই করা হচ্ছে...</div>;
  if (!product || !product.is_digital_tool) return <div className="p-20 text-center text-red-500 font-bold">এই টুলটির অ্যাক্সেস আপনার নেই অথবা এটি সঠিক লিংক নয়।</div>;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20">
      <header className="p-4 flex items-center gap-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-black/5 dark:border-white/5">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">টুল অ্যাক্সেস</h1>
      </header>

      <main className="max-w-2xl mx-auto p-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <h2 className="text-3xl font-black text-center mb-2">{product.name}</h2>
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-8">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          অ্যাক্সেস ভেরিফাইড
        </div>

        <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-black/5 dark:border-white/5 shadow-xl space-y-6">
          <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-2xl border border-primary/20">
             <span className="material-symbols-outlined text-primary text-3xl">info</span>
             <p className="text-sm font-medium leading-relaxed">নিচের বাটনে ক্লিক করে আপনি সরাসরি টুলটি ব্যবহার করতে পারবেন। এটি আপনার জন্য সুরক্ষিত লিংক।</p>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-lg">কিভাবে ব্যবহার করবেন?</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-3"><span className="text-primary font-bold">১.</span> নিচের লিংকে ক্লিক করে অফিসিয়াল সাইটে যান।</li>
              <li className="flex gap-3"><span className="text-primary font-bold">২.</span> আমাদের প্রদান করা প্যানেল থেকে অটো-লগইন হবে।</li>
              <li className="flex gap-3"><span className="text-primary font-bold">৩.</span> কোনো সমস্যা হলে সাপোর্ট সেন্টারে যোগাযোগ করুন।</li>
            </ul>
          </div>

          <a 
            href={product.tool_external_url || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-5 bg-primary text-background-dark text-center font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            সরাসরি টুলটি ওপেন করুন
          </a>
        </div>

        <button 
          onClick={() => navigate('/help-center')}
          className="mt-10 text-zinc-500 hover:text-primary font-bold flex items-center gap-2"
        >
          <span className="material-symbols-outlined">support_agent</span>
          সাহায্য প্রয়োজন?
        </button>
      </main>
    </div>
  );
};

export default ToolAccessScreen;
