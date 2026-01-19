
export enum Screen {
  HOME = 'home',
  PRODUCT_DETAILS = 'product-details',
  CART = 'cart',
  PROFILE = 'profile',
  WISHLIST = 'wishlist',
  CHECKOUT = 'checkout',
  ORDER_CONFIRMATION = 'order-confirmation',
  ORDER_TRACKING = 'order-tracking',
  FLASH_SALE = 'flash-sale',
  HELP_CENTER = 'help-center',
  SEARCH_RESULTS = 'search-results',
  REFER_EARN = 'refer-earn',
  LOGIN = 'login',
  SIGNUP = 'signup',
  OTP = 'otp',
  RESET_PASSWORD = 'reset-password',
  ADDRESSES = 'addresses',
  EDIT_ADDRESS = 'edit-address',
  ORDER_HISTORY = 'order-history',
  EDIT_PROFILE = 'edit-profile',
  REVIEWS = 'reviews',
  TOOL_ACCESS = 'tool-access'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: string;
  inStock?: boolean;
  is_digital_tool?: boolean;
  tool_external_url?: string;
  validity_days?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  color?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  area: string;
  details: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
  expiry_date?: string;
}
