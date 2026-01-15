
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { REVIEWS } from '../constants';

const ReviewsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[#0d1b12] dark:text-white">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <h2 className="text-lg font-bold leading-tight">রিভিউ ও রেটিং</h2>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full">
        {/* Rating Summary Section */}
        <section className="p-6 bg-white dark:bg-background-dark/50 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-1">
                <p className="text-5xl font-black leading-tight tracking-tight">4.8</p>
                <p className="text-gray-500 text-sm font-medium">/ 5</p>
              </div>
              <div className="flex gap-0.5 my-1">
                {[1, 2, 3, 4].map(i => <span key={i} className="material-symbols-outlined material-symbols-fill text-primary">star</span>)}
                <span className="material-symbols-outlined text-primary">star</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">১২৫টি রিভিউ ও রেটিং</p>
            </div>
            
            {/* Progress Bars */}
            <div className="grid min-w-[180px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-2">
              {[5, 4, 3, 2, 1].map((rating, idx) => (
                <React.Fragment key={rating}>
                  <p className="text-sm font-semibold">{rating}</p>
                  <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-primary/10">
                    <div className="rounded-full bg-primary" style={{ width: `${[75, 15, 5, 3, 2][idx]}%` }}></div>
                  </div>
                  <p className="text-gray-500 text-xs font-medium text-right">{[75, 15, 5, 3, 2][idx]}%</p>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* List Header */}
        <div className="flex items-center justify-between px-4 pt-6 pb-2">
          <h3 className="text-[#0d1b12] dark:text-white text-lg font-bold">সব রিভিউ</h3>
          <button className="flex items-center gap-1 text-primary text-sm font-bold hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            ফিল্টার
          </button>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-6 p-4">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex flex-col gap-3 bg-white dark:bg-gray-900/40 p-4 rounded-xl shadow-sm border border-gray-50 dark:border-gray-800 transition-transform active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex items-center justify-center rounded-full size-10 border-2 border-primary/20 font-black">
                  {review.userName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[#0d1b12] dark:text-white text-base font-bold leading-none">{review.userName}</p>
                    {review.isVerified && (
                      <span className="flex items-center gap-0.5 bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[12px] material-symbols-fill">verified</span> ভেরিফাইড
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} className={`material-symbols-outlined text-primary text-lg ${s <= review.rating ? 'material-symbols-fill' : ''}`}>star</span>
                ))}
              </div>
              <p className="text-[#0d1b12] dark:text-gray-200 text-sm leading-relaxed">{review.comment}</p>
              
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="shrink-0 size-20 rounded-lg object-cover border border-gray-100 dark:border-gray-800" />
                  ))}
                </div>
              )}

              <div className="flex gap-6 mt-2 text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                  ১২ জন সাহায্য পেয়েছেন
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">reply</span>
                  রিপ্লাই
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center py-6 mb-12">
          <button className="text-gray-500 dark:text-gray-400 text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors">
            আরো দেখুন
            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
          </button>
        </div>
      </main>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 z-50">
        <button className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-[#0d1b12] flex items-center justify-center gap-2 h-14 rounded-xl text-lg font-extrabold shadow-lg shadow-primary/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined font-bold">edit_square</span>
          <span>রিভিউ লিখুন</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewsScreen;
