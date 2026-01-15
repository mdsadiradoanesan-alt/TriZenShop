
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ORDERS } from '../constants';

const OrderHistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('সব অর্ডার');
  const tabs = ['সব অর্ডার', 'চলমান', 'সম্পন্ন', 'বাতিল'];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-screen-xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg md:text-2xl font-black flex-1 text-center pr-10">অর্ডার হিস্ট্রি</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 pt-6">
        <div className="flex border-b border-[#cfe7d7] dark:border-gray-800 gap-8 overflow-x-auto no-scrollbar mb-8">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center pb-4 pt-4 whitespace-nowrap transition-all border-b-[4px] font-black text-sm md:text-base ${activeTab === tab ? 'border-b-primary text-primary' : 'border-b-transparent text-gray-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="flex flex-col gap-6 rounded-[2.5rem] bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className={`inline-flex items-center rounded-xl px-4 py-1.5 text-xs font-black uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-primary/20 text-emerald-700 dark:text-primary' : 
                    order.status === 'Cancelled' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    {order.status === 'Delivered' ? 'সম্পন্ন' : order.status === 'Cancelled' ? 'বাতিল' : 'প্রক্রিয়াধীন'}
                  </span>
                  <h3 className="text-xl font-black">অর্ডার #{order.id}</h3>
                  <p className="text-gray-400 text-sm font-medium">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary">৳{order.total}</p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{order.items.length}টি পণ্য</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-black/5">
                    <img src={item.image} alt="" className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover shadow-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-base md:text-lg font-black truncate">{item.name}</p>
                      <div className="flex gap-4 mt-2">
                        {item.is_digital_tool ? (
                          <button 
                            onClick={() => navigate(`/tool-access/${item.id}`)}
                            className="bg-primary text-background-dark px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-1 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                          >
                            <span className="material-symbols-outlined text-sm">key</span>
                            টুল অ্যাক্সেস করুন
                          </button>
                        ) : (
                          <p className="text-zinc-500 text-sm font-bold">৳{item.price} × {item.quantity}</p>
                        )}
                      </div>
                    </div>
                    <button onClick={() => navigate(`/product/${item.id}`)} className="size-12 rounded-full flex items-center justify-center bg-white dark:bg-zinc-800 shadow-sm text-zinc-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-2xl">chevron_right</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OrderHistoryScreen;
