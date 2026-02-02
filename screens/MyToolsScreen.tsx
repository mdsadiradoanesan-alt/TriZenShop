
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
        const { data } = await supabase
          .from('order_items')
          .select(`*, orders!inner(user_id, created_at, status), products!inner(is_digital_tool, image_url, name)`)
          .eq('orders.user_id', session.user.id)
          .eq('products.is_digital_tool', true)
          .neq('orders.status', 'Cancelled');
        setTools(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchMyTools();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-zinc-900 dark:text-white pb-32">
       <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tighter">Library<span className="text-primary">.</span></h1>
        <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs border border-black/5">
           {tools.length}
        </div>
      </header>

      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-50">
            <span className="material-symbols-outlined text-6xl mb-4">apps</span>
            <p className="font-bold">No digital assets found.</p>
          </div>
        ) : (
          tools.map((item) => {
            const purchaseDate = new Date(item.orders.created_at);
            const daysLeft = Math.max(0, 30 - Math.floor((new Date().getTime() - purchaseDate.getTime()) / (1000 * 3600 * 24)));
            const isExpired = daysLeft === 0;

            return (
              <div 
                key={item.id}
                onClick={() => navigate(`/tool-access/${item.product_id}`)}
                className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] p-6 shadow-sm border border-black/5 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
              >
                <div className="flex items-start gap-5">
                   <div className="size-20 bg-zinc-100 dark:bg-black rounded-2xl p-3 flex items-center justify-center border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-500">
                      <img src={item.product_image || item.products.image_url} className="w-full h-full object-contain" />
                   </div>
                   <div className="flex-1 min-w-0 pt-1">
                      <h3 className="font-bold text-lg leading-tight truncate">{item.product_name || item.products.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wide">
                         Lic: {item.orders.user_id.slice(0,6)}
                      </p>
                      
                      <div className="mt-3 flex items-center gap-2">
                         <span className={`flex size-2 rounded-full ${isExpired ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
                         <span className={`text-[10px] font-black uppercase tracking-widest ${isExpired ? 'text-zinc-500' : 'text-green-600 dark:text-green-400'}`}>
                           {isExpired ? 'Updates Expired' : 'Active Support'}
                         </span>
                      </div>
                   </div>
                </div>

                {/* Hover Action */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                   <button className="size-10 rounded-full bg-primary text-black flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined font-bold">arrow_forward</span>
                   </button>
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