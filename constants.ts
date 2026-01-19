
import { Product, Category, Review, Address, Order } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'পোশাক', icon: 'checkroom', slug: 'clothing' },
  { id: '2', name: 'ইলেকট্রনিক্স', icon: 'devices', slug: 'electronics' },
  { id: '3', name: 'আসবাবপত্র', icon: 'weekend', slug: 'furniture' },
  { id: '4', name: 'রূপচর্চা', icon: 'self_care', slug: 'beauty' },
  { id: '5', name: 'গেম', icon: 'sports_esports', slug: 'games' },
  { id: '6', name: 'অনলাইন টুলস', icon: 'bolt', slug: 'seo-tools' },
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
    id: 'p5',
    name: 'SEMRush Premium',
    price: 499,
    originalPrice: 1200,
    discount: '৫৮% ছাড়',
    image: 'https://cdn.worldvectorlogo.com/logos/semrush-1.svg',
    category: 'অনলাইন টুলস',
    rating: 4.9,
    reviews: 450,
    inStock: true,
    is_digital_tool: true,
    tool_external_url: 'https://www.semrush.com',
    validity_days: 30
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
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'BK-88291',
    date: '২০ মে, ২০২৪',
    status: 'Delivered',
    total: 2450,
    items: [
      { ...PRODUCTS[0], quantity: 1 }
    ]
  }
];
