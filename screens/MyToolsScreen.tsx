
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const MyToolsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyTools() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Fetch orders that have digital tools
        // This query finds order_items that are digital tools for the user
        const { data, error } = await supabase
          .from('order_items')
          .select(`
            *,
            orders!inner (
               user_id,
               created_at,
               status
            ),
            products!inner (
               is_digital_tool,
               image_url,
               name
            )
          `)
          .eq('orders.user_id', session.user.id)
          .eq('products.is_digital_tool', true)
          .neq('orders.status', 'Cancelled');

        if (error) throw error;
        setTools(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMyTools();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
       <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 flex items-center justify-between border-b border-black/5 dark:border-white/5">
        <h2 className="text-xl font-black text-[#0d1b12] dark:text-white">আমার টুলস</h2>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
          {tools.length} টি কেনা হয়েছে
        </div>
      </div>

      <div className="p-4 grid gap-4">
        {tools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-24 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-6">
               <span className="material-symbols-outlined text-4xl text-zinc-400">construction</span>
            </div>
            <h3 className="text-xl font-bold mb-2">কোনো টুল কেনা হয়নি</h3>
            <p className="text-sm text-zinc-500 mb-6">আমাদের অনলাইন টুলস কালেকশন থেকে আপনার প্রয়োজনীয় টুলটি কিনুন।</p>
            <button onClick={() => navigate('/search?category=seo-tools')} className="bg-primary text-background-dark px-6 py-3 rounded-xl font-bold shadow-lg">টুলস ব্রাউজ করুন</button>
          </div>
        ) : (
          tools.map((item) => {
            const purchaseDate = new Date(item.orders.created_at);
            const today = new Date();
            const daysPassed = Math.floor((today.getTime() - purchaseDate.getTime()) / (1000 * 3600 * 24));
            const validity = 30; // Assuming 30 days
            const daysLeft = Math.max(0, validity - daysPassed);
            const isExpired = daysLeft === 0;

            return (
              <div 
                key={item.id}
                onClick={() => navigate(`/tool-access/${item.product_id}`)}
                className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 shadow-lg border border-black/5 dark:border-white/5 relative overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform"
              >
                {/* Background Glow */}
                <div className={`absolute -right-10 -top-10 size-32 rounded-full blur-3xl opacity-20 ${isExpired ? 'bg-red-500' : 'bg-primary'}`}></div>

                <div className="flex gap-4 relative z-10">
                  <div className="size-16 bg-white dark:bg-black rounded-2xl p-2 shadow-sm flex items-center justify-center shrink-0">
                     <img src={item.product_image || item.products.image_url} className="size-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg truncate mb-1">{item.product_name || item.products.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className={`size-2 rounded-full ${isExpired ? 'bg-red-500' : 'bg-primary animate-pulse'}`}></span>
                       <p className={`text-xs font-bold uppercase tracking-wide ${isExpired ? 'text-red-500' : 'text-primary'}`}>
                         {isExpired ? 'মেয়াদ শেষ' : `${daysLeft} দিন বাকি`}
                       </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="size-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-colors">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
                   <p className="text-[10px] text-zinc-400 font-bold uppercase">অর্ডার: #{item.orders.user_id.slice(0,4)}...{item.id.slice(0,4)}</p>
                   <p className="text-[10px] font-bold text-zinc-500">কেনা হয়েছে: {purchaseDate.toLocaleDateString('bn-BD')}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyToolsScreen;