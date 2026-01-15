
import { Product, Category, Review, Address, Order } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'পোশাক', icon: 'checkroom', slug: 'clothing' },
  { id: '2', name: 'ইলেকট্রনিক্স', icon: 'devices', slug: 'electronics' },
  { id: '3', name: 'আসবাবপত্র', icon: 'weekend', slug: 'furniture' },
  { id: '4', name: 'রূপচর্চা', icon: 'self_care', slug: 'beauty' },
  { id: '5', name: 'গেম', icon: 'sports_esports', slug: 'games' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ওয়ারলেস হেডফোন',
    price: 1250,
    originalPrice: 1500,
    discount: '২০% ছাড়',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOvAwabcOFwxAtJIGkYxpO84EDU07vXEbODollYYdMWEpIEVMM_v0s8Bl8N40Lj7eMqynf2o2KldPZ-yZuk1vaA8oR6FGOgkDSKO_MODqWtAhe-wk2-n131-wIWSPJq9VZ7kWf2akNY2zWZttf5I6v0KERtC8vMraB6HiX6WA1H70PG-Sof8X_uWZQBCjNrHiJYTBd5m5cjPNR7mHjzUMdiT2sI7NvVqDzXZIEao5qph5i3mSRX4EEa9i_JxL_LtyNksfW_iiOH924',
    category: 'ইলেকট্রনিক্স',
    rating: 4.8,
    reviews: 120,
    inStock: true
  },
  {
    id: 'p2',
    name: 'প্রিমিয়াম কটন পোলো',
    price: 850,
    originalPrice: 1000,
    discount: '১৫% ছাড়',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASQaH8Z_ioYQ5r_Q2bdz9t91rK_4nCyoHB7k3JbqMW1NvgxXk_nmzrlJfBVz43H96PFQjGge3n9aH8hhU3N3dWdgXlHS9balnpjRnvSnh9DfbIN8axurrFAHE-Hpmoaw6PtBsO6WIx31U5ii_DIk5emdYbiCEuo5-HayVGGLzZO8NWmPrZD7SsHkjjD_vJgCC8r7JaT7ahWO2OQ35bFgS-NAJ88tLqf6msbMDJ8n2K8B1uYzFiyUAUy7AWJaT4osxL1AU_9YM3UZDe',
    category: 'পোশাক',
    rating: 4.5,
    reviews: 85,
    inStock: true
  },
  {
    id: 'p3',
    name: 'স্মার্ট ওয়াচ সিরিজ ৭',
    price: 4500,
    originalPrice: 5000,
    discount: '১০% ছাড়',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvobsDUFf0jT_cb2SVLM1HmP5tN0R-NUW2sa6_26bh2r6zu1JCqunJASH4Na3OIMuSIWRbxJdpAxDDP8gqtrYdA8zh2W0NJ7oPHeOQlxUnzl8lKMzMZLddH6C4bxm_lI-boQG28ezLcFVDfrATTm1H8VIjeDfda0xEL9ZyArXYTuAFffifaRfyEzi6Z6_c2s1oEdjccxvtCh1KF-bqeoRkLKA4iQ1_3sOtfa9zJhhwwJNB9ykuTRUxLn17M8bHShis937rCPinIPLO',
    category: 'ইলেকট্রনিক্স',
    rating: 4.9,
    reviews: 210,
    inStock: true
  },
  {
    id: 'p4',
    name: 'স্কিন কেয়ার সিরাম',
    price: 1200,
    originalPrice: 1600,
    discount: '২৫% ছাড়',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TNV3a5HsAkEIXed0vMz6CiT8qCNP0c0txTe03_n986PFBeoWSzRkMPkX7_x38GB95oTQYt0vHaxUq_GZ92-xvGTqIo4Z-Ft2opEql88FbqKEIOtgc9uz7ZJwW9UdPGPFMJTQkByJJYBuuWxFdai69JjiZtcfgwWAnazEo1oxfwfB7tao-P5oNEuDWNeRHlBkYmOJ0beg5Jy45PF2V5WjdCAH21gqYFz25hxQWC70UMs6qUYzwzsfuRUCkO00deiSOwZzjmB5O8B5',
    category: 'রূপচর্চা',
    rating: 4.7,
    reviews: 64,
    inStock: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'আরিফ হোসেন',
    rating: 5,
    date: '১০ জুন, ২০২৪',
    comment: 'পণ্যটি অসাধারণ! একদম ছবির মতো ছিল এবং ডেলিভারি খুব দ্রুত হয়েছে। প্যাকেজিংও খুব ভালো ছিল। ধন্যবাদ!',
    isVerified: true,
    images: ['https://picsum.photos/200/200?random=1', 'https://picsum.photos/200/200?random=2']
  },
  {
    id: 'r2',
    userName: 'নুসরাত জাহান',
    rating: 4,
    date: '০৮ জুন, ২০২৪',
    comment: 'খুব ভালো পণ্য। সাইজ এবং রঙ একদম ঠিক ছিল। তবে কাপড়ের মান আরও একটু ভালো হতে পারতো।',
    isVerified: true
  }
];

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr1',
    label: 'বাসা',
    name: 'আরিফ আহমেদ',
    phone: '০১৭০০-০০০০০০',
    area: 'উত্তরা, ঢাকা',
    details: 'বাড়ি নং ১২, রোড নং ৫, সেক্টর ৪',
    isDefault: true
  },
  {
    id: 'addr2',
    label: 'অফিস',
    name: 'আরিফ আহমেদ',
    phone: '০১৭০০-০০০০০০',
    area: 'বনানী, ঢাকা',
    details: 'সফ্টওয়্যার পার্ক, লেভেল ৮',
    isDefault: false
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'BK-88291',
    date: '২০ মে, ২০২৪',
    status: 'Delivered',
    total: 2450,
    items: [
      { ...PRODUCTS[0], quantity: 1 },
      { ...PRODUCTS[1], quantity: 1 }
    ]
  },
  {
    id: 'BK-77123',
    date: '০৫ মে, ২০২৪',
    status: 'Cancelled',
    total: 1200,
    items: [{ ...PRODUCTS[3], quantity: 1 }]
  }
];
