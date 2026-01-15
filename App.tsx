
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Product, CartItem, Address } from './types';
import { MOCK_ADDRESSES } from './constants';
import { supabase } from './lib/supabase';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import WishlistScreen from './screens/WishlistScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import FlashSaleScreen from './screens/FlashSaleScreen';
import HelpCenterScreen from './screens/HelpCenterScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import ReferEarnScreen from './screens/ReferEarnScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OTPScreen from './screens/OTPScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ToolAccessScreen from './screens/ToolAccessScreen';

// New recommended screens
import AddressScreen from './screens/AddressScreen';
import EditAddressScreen from './screens/EditAddressScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ReviewsScreen from './screens/ReviewsScreen';

// Components
import BottomNav from './components/BottomNav';
import SideDrawer from './components/SideDrawer';

const ProtectedRoute: React.FC<{ user: any; loading: boolean; children: React.ReactElement }> = ({ user, loading, children }) => {
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Session check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const addToCart = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (id: string, size?: string, color?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: string, delta: number, size?: string, color?: string) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);
  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-primary">
         <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
         <p className="font-black text-xs uppercase tracking-widest">TriZen Shop Loading...</p>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen relative bg-background-light dark:bg-background-dark overflow-x-hidden">
        <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} cartCount={cart.length} user={user} />
        
        <div className={`flex-1 transition-transform duration-300 ${isDrawerOpen ? 'translate-x-[15%] scale-[0.98] blur-[2px] pointer-events-none' : ''}`}>
          <div className="max-w-screen-2xl mx-auto md:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomeScreen onMenuClick={toggleDrawer} />} />
              <Route path="/product/:id" element={<ProductDetailsScreen onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
              <Route path="/product/:id/reviews" element={<ReviewsScreen />} />
              <Route path="/cart" element={<CartScreen cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} onClearAll={clearCart} />} />
              <Route path="/search" element={<SearchResultsScreen onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
              <Route path="/flash-sale" element={<FlashSaleScreen />} />
              <Route path="/help-center" element={<HelpCenterScreen />} />
              <Route path="/refer-earn" element={<ReferEarnScreen />} />
              <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginScreen />} />
              <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignupScreen />} />
              <Route path="/otp" element={<OTPScreen />} />
              <Route path="/reset-password" element={<ResetPasswordScreen />} />
              <Route path="/profile" element={<ProtectedRoute user={user} loading={loading}><ProfileScreen user={user} /></ProtectedRoute>} />
              <Route path="/edit-profile" element={<ProtectedRoute user={user} loading={loading}><EditProfileScreen user={user} /></ProtectedRoute>} />
              <Route path="/addresses" element={<ProtectedRoute user={user} loading={loading}><AddressScreen addresses={addresses} /></ProtectedRoute>} />
              <Route path="/edit-address" element={<ProtectedRoute user={user} loading={loading}><EditAddressScreen /></ProtectedRoute>} />
              <Route path="/order-history" element={<ProtectedRoute user={user} loading={loading}><OrderHistoryScreen /></ProtectedRoute>} />
              <Route path="/wishlist" element={<WishlistScreen wishlistItems={[]} onAddToCart={addToCart} onRemove={toggleWishlist} />} />
              <Route path="/checkout" element={<ProtectedRoute user={user} loading={loading}><CheckoutScreen cart={cart} onOrderSuccess={clearCart} user={user} /></ProtectedRoute>} />
              <Route path="/order-confirmation" element={<ProtectedRoute user={user} loading={loading}><OrderConfirmationScreen /></ProtectedRoute>} />
              <Route path="/order-tracking" element={<ProtectedRoute user={user} loading={loading}><OrderTrackingScreen /></ProtectedRoute>} />
              <Route path="/tool-access/:id" element={<ProtectedRoute user={user} loading={loading}><ToolAccessScreen /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
        <NavWrapper cartCount={cartCount} />
      </div>
    </HashRouter>
  );
};

const NavWrapper: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const location = useLocation();
  const hideNavOn = ['/login', '/signup', '/otp', '/reset-password', '/checkout', '/order-confirmation', '/order-tracking', '/tool-access'];
  const shouldHide = hideNavOn.some(path => location.pathname.startsWith(path));
  if (shouldHide) return null;
  return <BottomNav cartCount={cartCount} activePath={location.pathname} />;
};

export default App;
