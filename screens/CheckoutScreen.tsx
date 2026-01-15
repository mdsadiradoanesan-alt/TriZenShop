
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { supabase } from '../lib/supabase';

interface CheckoutScreenProps {
  cart: CartItem[];
  onOrderSuccess: () => void;
  user: any;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ cart, onOrderSuccess, user }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = 60;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('অর্ডার করার জন্য আগে লগইন করুন।');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          payment_method: paymentMethod,
          status: 'Pending',
          delivery_address: {
            name: 'আরিফ আহমেদ', // In real app, get from selected address
            phone: '০১৭০০-০০০০০০',
            details: 'বাসা নং ১২, রোড নং ৫, ব্লক বি, বনানী, ঢাকা-১২১৩'
          }
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
        selected_size: item.selectedSize,
        selected_color: item.selectedColor
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      onOrderSuccess();
      navigate('/order-confirmation');
    } catch (err: any) {
      alert('অর্ডার সম্পন্ন করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32 overflow-y-auto no-scrollbar">
      <div className="sticky top-0 z-20 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-3 justify-between">
        <button onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white flex size-10 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">চেকআউট</h2>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Delivery Address */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary material-symbols-fill">location_on</span>
              ডেলিভারি ঠিকানা
            </h3>
            <button className="text-primary text-sm font-semibold">এডিট করুন</button>
          </div>
          <div className="bg-white dark:bg-[#152b1d] p-4 rounded-2xl border border-[#cfe7d7] dark:border-[#1a3a24] shadow-sm">
            <div className="flex flex-col gap-1">
              <p className="font-bold">আরিফ আহমেদ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">০১৭০০-০০০০০০</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">বাসা নং ১২, রোড নং ৫, ব্লক বি, বনানী, ঢাকা-১২১৩</p>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary material-symbols-fill">payments</span>
            পেমেন্ট পদ্ধতি
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { id: 'bkash', name: 'বিকাশ (bKash)', icon: 'bkash', color: '#E2136E' },
              { id: 'nagad', name: 'নগদ (Nagad)', icon: 'Nagad', color: '#f7941d' },
              { id: 'cod', name: 'ক্যাশ অন ডেলিভারি', icon: 'local_shipping', color: 'gray' }
            ].map(method => (
              <label 
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`relative flex items-center justify-between bg-white dark:bg-[#152b1d] p-4 rounded-2xl border shadow-sm cursor-pointer transition-all ${paymentMethod === method.id ? 'border-primary ring-1 ring-primary' : 'border-[#cfe7d7] dark:border-[#1a3a24]'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 font-bold" style={{ color: method.color }}>
                    {method.id === 'cod' ? <span className="material-symbols-outlined">local_shipping</span> : method.icon[0].toUpperCase()}
                  </div>
                  <span className="font-bold text-sm">{method.name}</span>
                </div>
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                  {paymentMethod === method.id && <div className="size-2.5 bg-primary rounded-full"></div>}
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Price Details */}
        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary material-symbols-fill">receipt_long</span>
            মূল্য বিবরণ
          </h3>
          <div className="bg-white dark:bg-[#152b1d] p-5 rounded-2xl border border-[#cfe7d7] dark:border-[#1a3a24] shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">মোট মূল্য</span>
              <span className="font-semibold">৳ {subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">ডেলিভারি ফি</span>
              <span className="font-semibold">৳ {deliveryCharge}</span>
            </div>
            <div className="h-px bg-gray-100 dark:bg-[#1a3a24] my-1"></div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">সর্বমোট</span>
              <span className="text-lg font-bold text-primary">৳ {total}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-[#cfe7d7] dark:border-[#1a3a24] z-50">
        <button 
          onClick={handlePlaceOrder}
          disabled={loading || cart.length === 0}
          className={`w-full bg-primary hover:brightness-105 active:scale-[0.98] transition-all text-[#0d1b12] py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 ${loading ? 'opacity-70 animate-pulse' : ''}`}
        >
          {loading ? 'অর্ডারটি সাবমিট হচ্ছে...' : 'অর্ডার সম্পন্ন করুন'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutScreen;
