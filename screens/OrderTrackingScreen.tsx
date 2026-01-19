
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const OrderTrackingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              product_id,
              quantity,
              product_name,
              product_image,
              products (
                name,
                image_url
              )
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order for tracking:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-6">
      <span className="material-symbols-outlined text-6xl text-gray-300">search_off</span>
      <h2 className="text-xl font-bold">অর্ডারটি পাওয়া যায়নি</h2>
      <button onClick={() => navigate('/')} className="text-primary font-bold">হোমে ফিরে যান</button>
    </div>
  );

  // Status Logic
  const statusSteps = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
  let currentStepIndex = 0;
  if (order.status === 'Pending') currentStepIndex = 1;
  if (order.status === 'Shipped') currentStepIndex = 2;
  if (order.status === 'Delivered') currentStepIndex = 3;
  if (order.status === 'Cancelled') currentStepIndex = -1;

  // Dates
  const createdDate = new Date(order.created_at);
  const estimatedDate = new Date(createdDate);
  estimatedDate.setDate(createdDate.getDate() + 3);

  const steps = [
    { title: 'অর্ডার করা হয়েছে', time: createdDate.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' }), status: currentStepIndex >= 0 ? 'done' : 'inactive' },
    { title: 'নিশ্চিত করা হয়েছে', time: 'প্রসেসিং হচ্ছে...', status: currentStepIndex >= 1 ? 'done' : 'pending' },
    { title: 'পাঠানো হয়েছে', time: 'শিগগিরই বের হবে', status: currentStepIndex >= 2 ? 'done' : (currentStepIndex === 1 ? 'pending' : 'inactive') },
    { title: 'পৌঁছেছে', time: `প্রত্যাশিত: ${estimatedDate.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long' })}`, status: currentStepIndex >= 3 ? 'done' : 'inactive' },
  ];

  if (order.status === 'Cancelled') {
      steps[1] = { title: 'অর্ডার বাতিল হয়েছে', time: 'দুঃখিত', status: 'cancelled' };
  }

  // Address
  const address = order.delivery_address || {};

  // Display Item
  const displayItem = order.order_items[0];
  const itemImage = displayItem?.product_image || displayItem?.products?.image_url;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
            </button>
            <h2 className="text-lg font-bold">অর্ডার ট্র্যাকিং</h2>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">help_outline</span>
          </button>
        </div>
      </header>

      <main className="overflow-y-auto no-scrollbar">
        {/* Order Info Header */}
        <section className="px-4 py-6 border-b border-black/5 dark:border-white/5 bg-white dark:bg-white/5">
          <div className="flex justify-between items-start">
             <div>
                <h3 className="text-xl font-bold mb-1">অর্ডার আইডি: #{order.id.slice(0, 8)}</h3>
                <p className={`font-bold text-sm flex items-center gap-1 ${order.status === 'Cancelled' ? 'text-red-500' : 'text-primary'}`}>
                  {order.status === 'Cancelled' ? 'বাতিল করা হয়েছে' : `প্রত্যাশিত ডেলিভারি: ${estimatedDate.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long' })}`}
                </p>
             </div>
             {itemImage && (
               <div className="size-16 rounded-xl overflow-hidden border border-black/10">
                 <img src={itemImage} className="w-full h-full object-cover" />
               </div>
             )}
          </div>
          <p className="text-xs text-zinc-500 mt-2">
             {address.name}, {address.area}
          </p>
        </section>

        {/* Timeline */}
        <section className="px-4 py-8">
          <div className="grid grid-cols-[40px_1fr] gap-x-3">
            {steps.map((step, i, arr) => {
              let icon = 'check';
              let bgColor = 'bg-primary';
              let iconColor = 'text-white';
              
              if (step.status === 'pending') {
                  bgColor = 'bg-primary/20';
                  iconColor = 'text-primary';
                  icon = 'schedule';
              } else if (step.status === 'inactive') {
                  bgColor = 'bg-gray-200 dark:bg-gray-800';
                  iconColor = 'text-gray-400';
                  icon = 'radio_button_unchecked';
              } else if (step.status === 'cancelled') {
                  bgColor = 'bg-red-100';
                  iconColor = 'text-red-500';
                  icon = 'close';
              }

              return (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div className={`size-8 rounded-full flex items-center justify-center ${bgColor} ${i === arr.length -1 ? '' : ''} z-10`}>
                    <span className={`material-symbols-outlined text-[18px] ${iconColor} font-bold`}>{icon}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`w-[3px] h-12 ${step.status === 'done' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  )}
                </div>
                <div className={`${i < arr.length - 1 ? 'pb-8' : ''}`}>
                  <p className={`text-base font-bold ${step.status === 'done' || step.status === 'pending' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>{step.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{step.time}</p>
                </div>
              </React.Fragment>
            )})}
          </div>
        </section>

        {/* Live Map (Visual Only) */}
        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
        <section className="px-4 mt-4">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-bold">লাইভ ট্র্যাকিং</h3>
             <span className="text-xs font-bold text-primary animate-pulse">● লাইভ আপডেট</span>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5">
            <img 
              alt="Delivery Map" 
              className="w-full h-full object-cover grayscale-[0.3] contrast-[1.1]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQhRLBHHcwKXEHASCwHH59dCs7ncefRIxvT6_Xb1f-B9jLwgGOx6nFout6f6f0SoAqL4v1sCA-HlqIxK8i2xEQKpfP6BIrZtgsgecVIGNhMvG9-skTPHR3An2NqgrVu5OjSDlrzqamVPf5iocw-f-d9tNyVsQtz03el3wux61pRJoiliUKdSdlneLgrofoqRkP6X8CtxlGbBzEuHG_vVXwWVq7STLc1obDWkB6HLvsKopK2YyNkvQfiOeWXzY147MiSgsW59IAtL7k" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex flex-col items-center">
                <div className="bg-primary text-white p-2.5 rounded-full shadow-lg border-4 border-white dark:border-zinc-800 animate-bounce">
                  <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 px-3 py-1 rounded-full shadow-md mt-2">
                    <p className="text-[10px] font-bold">বর্তমান অবস্থান: তেজগাঁও</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <div className="bg-white/95 dark:bg-background-dark/95 px-4 py-3 rounded-xl text-xs font-semibold shadow-lg w-full flex items-center justify-between">
                 <div>
                    <p className="text-zinc-400 uppercase text-[10px] tracking-wider">গন্তব্য</p>
                    <p className="font-bold text-sm truncate max-w-[200px]">{address.area || 'ঢাকা'}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-zinc-400 uppercase text-[10px] tracking-wider">সময় বাকি</p>
                    <p className="font-bold text-primary">~ ১ দিন</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Rider Info (Conditional) */}
        {order.status === 'Shipped' && (
        <section className="px-4 mt-6">
          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-black/5 dark:border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full overflow-hidden bg-gray-200 border-2 border-primary">
                  <img src="https://picsum.photos/100/100?random=8" alt="Rider" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-base">করিম মিয়া</p>
                  <p className="text-xs text-zinc-500">ডেলিভারি হিরো</p>
                  <div className="flex items-center gap-1 text-orange-500 mt-0.5">
                    <span className="material-symbols-outlined text-[12px] material-symbols-fill">star</span>
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">৪.৮</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="size-10 rounded-full bg-primary text-background-dark flex items-center justify-center shadow-lg active:scale-90 transition-transform"><span className="material-symbols-outlined">call</span></button>
              </div>
            </div>
          </div>
        </section>
        )}
      </main>
    </div>
  );
};

export default OrderTrackingScreen;