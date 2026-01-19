
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

const OrderHistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ডিজিটাল টুলস');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['ডিজিটাল টুলস', 'ভৌত পণ্য', 'বাতিল'];

  useEffect(() => {
    async function fetchOrders() {
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
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          // Map database structure to UI structure
          const formattedOrders = data.map(order => ({
            id: order.id,
            date: new Date(order.created_at).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
            status: order.status,
            total: order.total_amount,
            items: order.order_items.map((item: any) => ({
              id: item.product_id,
              name: item.product_name || item.products?.name || 'Product',
              image: item.product_image || item.products?.image_url,
              price: item.price_at_purchase,
              quantity: item.quantity,
              is_digital_tool: item.products?.is_digital_tool
            }))
          }));
          setOrders(formattedOrders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [navigate]);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'বাতিল') return order.status === 'Cancelled';
    
    const hasDigital = order.items.some((i: any) => i.is_digital_tool);
    if (activeTab === 'ডিজিটাল টুলস') return hasDigital && order.status !== 'Cancelled';
    if (activeTab === 'ভৌত পণ্য') return !hasDigital && order.status !== 'Cancelled';
    
    return true;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div className="flex items-center p-4 justify-between max-w-screen-xl mx-auto h-16 w-full">
          <button onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-11 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            <span className="material-symbols-outlined text-2xl font-bold">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg md:text-xl font-black flex-1 text-center pr-11">অর্ডার হিস্ট্রি</h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto w-full px-4 pt-6">
        {/* Tab Switcher */}
        <div className="bg-zinc-200/50 dark:bg-white/5 p-1.5 rounded-2xl flex mb-10">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs md:text-sm font-black rounded-xl transition-all ${activeTab === tab ? 'bg-white dark:bg-zinc-800 shadow-xl text-primary' : 'text-zinc-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-zinc-300 mb-4">inventory_2</span>
              <p className="text-zinc-500 font-bold">এই ক্যাটাগরিতে কোনো অর্ডার নেই</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 md:p-6 shadow-xl border border-black/5 flex flex-col gap-6 hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/5">
                      {order.items[0]?.image ? (
                        <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2">
                         <p className={`text-[10px] font-black uppercase tracking-widest ${
                           order.status === 'Delivered' ? 'text-primary' : 
                           order.status === 'Cancelled' ? 'text-red-500' : 'text-orange-500'
                         }`}>
                           {order.status === 'Delivered' ? 'সম্পন্ন' : 
                            order.status === 'Cancelled' ? 'বাতিল' : 
                            order.status === 'Shipped' ? 'ডেলিভারি পথে' : 'প্রক্রিয়াধীন'}
                         </p>
                         {order.status === 'Delivered' && (
                           <span className="material-symbols-outlined text-primary text-xs material-symbols-fill">verified</span>
                         )}
                      </div>
                      <h3 className="text-base md:text-lg font-black leading-tight mt-1 truncate max-w-[150px] md:max-w-[200px]">
                        {order.items[0]?.name} {order.items.length > 1 && `+ ${order.items.length - 1}টি`}
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">অর্ডার আইডি: #{order.id.slice(0,8)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">৳ {order.total}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-black/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">ক্রয়কাল</span>
                    <span className="text-sm font-bold mt-0.5">{order.date}</span>
                  </div>
                  
                  {/* Action Button Logic */}
                  {order.status === 'Delivered' ? (
                    <button 
                      onClick={() => {
                        const digitalItem = order.items.find((i: any) => i.is_digital_tool);
                        if (digitalItem) navigate(`/tool-access/${digitalItem.id}`);
                        else navigate(`/product/${order.items[0].id}/reviews`);
                      }}
                      className="flex items-center gap-2 bg-primary hover:bg-opacity-90 text-background-dark px-6 py-3 rounded-xl transition-all active:scale-95 shadow-xl shadow-primary/20"
                    >
                      <span className="text-xs md:text-sm font-black uppercase tracking-widest">
                        {order.items.some((i: any) => i.is_digital_tool) ? 'অ্যাক্সেস করুন' : 'রিভিউ দিন'}
                      </span>
                      <span className="material-symbols-outlined text-lg md:text-xl font-bold">
                        {order.items.some((i: any) => i.is_digital_tool) ? 'bolt' : 'rate_review'}
                      </span>
                    </button>
                  ) : order.status !== 'Cancelled' ? (
                    <button 
                      onClick={() => navigate(`/order-tracking/${order.id}`)}
                      className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-6 py-3 rounded-xl transition-all active:scale-95"
                    >
                      <span className="text-xs md:text-sm font-black uppercase tracking-widest">ট্র্যাক করুন</span>
                      <span className="material-symbols-outlined text-lg md:text-xl font-bold">local_shipping</span>
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderHistoryScreen;