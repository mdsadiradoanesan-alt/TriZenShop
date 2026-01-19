
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const OrderStatusSummaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Pending' | 'Shipped' | 'Delivered'>('Pending');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              product_id,
              quantity,
              product_name,
              product_image,
              products (*)
            )
          `)
          .eq('user_id', session.user.id)
          .eq('status', activeTab)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching status orders:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [activeTab, navigate]);

  const tabs = [
    { key: 'Pending', label: 'প্রক্রিয়াধীন', icon: 'pending_actions' },
    { key: 'Shipped', label: 'পথে আছে', icon: 'local_shipping' },
    { key: 'Delivered', label: 'সম্পন্ন', icon: 'task_alt' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 h-16 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-black/5">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-black">অর্ডারের অবস্থা</h1>
      </header>

      <main className="p-4 max-w-xl mx-auto w-full">
        {/* Tab Switcher */}
        <div className="flex bg-zinc-200/50 dark:bg-white/5 p-1 rounded-2xl mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 rounded-xl transition-all ${activeTab === tab.key ? 'bg-white dark:bg-zinc-800 shadow-lg text-primary' : 'text-zinc-500'}`}
            >
              <span className={`material-symbols-outlined text-xl ${activeTab === tab.key ? 'material-symbols-fill' : ''}`}>{tab.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-3xl animate-pulse"></div>)}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center">
            <span className="material-symbols-outlined text-8xl mb-4">inventory</span>
            <p className="font-black">এই মুহূর্তে কোনো অর্ডার নেই</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map(order => {
               const item = order.order_items[0];
               const itemName = item?.product_name || item?.products?.name || 'Product';
               const itemImage = item?.product_image || item?.products?.image_url;
               
               return (
              <div 
                key={order.id} 
                className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/order-tracking/${order.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">অর্ডার আইডি</p>
                    <p className="text-sm font-black">#{order.id.slice(0, 8)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">তারিখ</p>
                    <p className="text-xs font-bold">{new Date(order.created_at).toLocaleDateString('bn-BD')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 py-3 border-t border-black/5">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                    {itemImage ? (
                      <img src={itemImage} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-primary">shopping_bag</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate text-sm">{itemName}</p>
                    <p className="text-primary font-black">৳ {order.total_amount}</p>
                  </div>
                  <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
                </div>
              </div>
            )})}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderStatusSummaryScreen;