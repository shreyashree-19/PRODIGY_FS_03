import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Coupon, Order, Address } from '../types';
import { api } from '../services/api';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // User & Auth
  user: User | null;
  loginDemo: (role: 'customer' | 'store_owner' | 'admin') => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserAddress: (address: Partial<Address>) => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  freeDeliveryRemaining: number;
  discountAmount: number;
  appliedCoupon: { code: string; discountAmount: number; description: string } | null;
  applyCouponCode: (code: string) => Promise<boolean>;
  removeCouponCode: () => void;
  coinsToRedeem: number;
  setCoinsToRedeem: (coins: number) => void;
  finalPayable: number;

  // Save For Later
  savedForLater: CartItem[];
  saveForLater: (productId: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  removeFromSavedForLater: (productId: string) => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;

  // Compare
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;

  // Navigation & Search
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedStoreId: string | null;
  setSelectedStoreId: (storeId: string | null) => void;
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;

  // UI Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isAdminView: boolean;
  setIsAdminView: (admin: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Quick Reorder
  reorderItems: (items: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('lm_theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lm_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // User state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedAdmin = localStorage.getItem('lm_admin_session');
      if (savedAdmin) return JSON.parse(savedAdmin);
    } catch {}
    return null;
  });

  useEffect(() => {
    if (!user) {
      api.getCurrentUser()
        .then(u => setUser(u))
        .catch(() => {
          // Fallback user
          setUser({
            id: 'user-1',
            name: 'Aarav Sharma',
            email: 'aarav.customer@localmart.in',
            role: 'customer',
            phone: '+91 98201 44552',
            coins: 380,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            savedAddresses: [
              {
                id: 'addr-1',
                label: 'Home',
                name: 'Aarav Sharma',
                phone: '+91 98201 44552',
                flat: 'Flat 402, Lotus Orchid Apts',
                area: '100ft Road, HAL 2nd Stage, Indiranagar',
                city: 'Bengaluru',
                pincode: '560038',
                isDefault: true
              }
            ]
          });
        });
    }
  }, []);

  const loginAdmin = async (emailInput: string, passwordInput: string): Promise<boolean> => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    let authUser: User | null = null;

    // Check credentials locally first — works even when backend is offline
    if (
      (cleanEmail === 'admin@localmart.in' || cleanEmail === 'admin') &&
      (cleanPass === 'admin123' || cleanPass === 'admin')
    ) {
      authUser = {
        id: 'user-3',
        name: 'Admin Team (HQ)',
        email: 'admin@localmart.in',
        role: 'admin',
        phone: '+91 80 4000 8888',
        coins: 9999,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
      };
    } else if (
      (cleanEmail === 'rajesh.store@localmart.in' || cleanEmail === 'store@localmart.in' || cleanEmail === 'store') &&
      (cleanPass === 'store123' || cleanPass === 'store')
    ) {
      authUser = {
        id: 'user-2',
        name: 'Rajesh Kumar (Store Partner)',
        email: 'rajesh.store@localmart.in',
        role: 'store_owner',
        phone: '+91 98450 12890',
        storeId: 'store-1',
        coins: 500,
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
      };
    }

    // If local check matched, log in immediately — no server round-trip needed
    if (authUser) {
      setUser(authUser);
      localStorage.setItem('lm_admin_session', JSON.stringify(authUser));
      setIsAdminView(true);
      addToast('Admin Access Granted', `Welcome back, ${authUser.name}`, 'success');
      // Also sync backend session in background (best-effort)
      api.adminLogin(authUser.email, cleanPass).catch(() => {});
      return true;
    }

    // If not matched locally, try the backend
    try {
      const u = await api.adminLogin(emailInput, passwordInput);
      authUser = u;
      setUser(authUser);
      localStorage.setItem('lm_admin_session', JSON.stringify(authUser));
      setIsAdminView(true);
      addToast('Admin Access Granted', `Welcome back, ${authUser.name}`, 'success');
      return true;
    } catch (err: any) {
      addToast('Access Denied', 'Invalid credentials. Use admin@localmart.in / admin123', 'error');
      return false;
    }
  };

  const loginDemo = async (role: 'customer' | 'store_owner' | 'admin') => {
    try {
      const u = await api.login(undefined, role);
      setUser(u);
      if (role === 'admin' || role === 'store_owner') {
        localStorage.setItem('lm_admin_session', JSON.stringify(u));
        setIsAdminView(true);
      } else {
        localStorage.removeItem('lm_admin_session');
        setIsAdminView(false);
      }
      addToast(`Logged in as ${u.name}`, `Role: ${role.replace('_', ' ').toUpperCase()}`, 'success');
    } catch (err) {
      addToast('Login Failed', 'Could not authenticate demo user', 'error');
    }
  };

  const logout = () => {
    localStorage.removeItem('lm_admin_session');
    setUser(null);
    setIsAdminView(false);
    addToast('Logged Out', 'Signed out successfully', 'info');
  };

  const updateUserAddress = async (address: Partial<Address>) => {
    try {
      const updated = await api.updateProfile({ address });
      setUser(updated);
      addToast('Address Saved', 'New delivery location added', 'success');
    } catch {
      addToast('Address update failed', '', 'error');
    }
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lm_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save for Later state
  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lm_saved_for_later');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lm_saved_for_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lm_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lm_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const saveForLater = (productId: string) => {
    const item = cart.find(c => c.product.id === productId);
    if (!item) return;
    setCart(prev => prev.filter(c => c.product.id !== productId));
    setSavedForLater(prev => {
      const exists = prev.find(s => s.product.id === productId);
      if (exists) return prev;
      return [...prev, item];
    });
    addToast('Saved for Later', `${item.product.name} moved to saved section`, 'info');
  };

  const moveToCartFromSaved = (productId: string) => {
    const item = savedForLater.find(s => s.product.id === productId);
    if (!item) return;
    setSavedForLater(prev => prev.filter(s => s.product.id !== productId));
    addToCart(item.product, item.quantity);
  };

  const removeFromSavedForLater = (productId: string) => {
    setSavedForLater(prev => prev.filter(s => s.product.id !== productId));
    addToast('Removed from saved items', '', 'info');
  };

  // Compare state
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Search, Category, Store & Location
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('Indiranagar, Bengaluru - 560038');

  // Coupon & Coins
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number; description: string } | null>(null);
  const [coinsToRedeem, setCoinsToRedeem] = useState<number>(0);

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: ToastMessage['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added to Basket`, `${product.name} (${quantity})`, 'success');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item removed from basket', '', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCoinsToRedeem(0);
  };

  const reorderItems = (items: any[]) => {
    items.forEach(item => {
      const mockProd: Product = {
        id: item.productId,
        name: item.name,
        price: item.price,
        originalPrice: item.price + 30,
        category: 'produce',
        storeId: 'store-1',
        storeName: 'Green Grocers & Farm Fresh',
        unit: '1 pack',
        rating: 4.8,
        reviewsCount: 150,
        stock: 20,
        image: item.image,
        tags: ['Reordered'],
        description: item.name,
        specifications: {}
      };
      addToCart(mockProd, item.quantity || 1);
    });
    setIsCartOpen(true);
    addToast('Reorder Loaded!', `${items.length} items added to your basket`, 'success');
  };

  // Calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 249;
  const deliveryFee = cartTotal === 0 ? 0 : cartTotal >= freeDeliveryThreshold ? 0 : 35;
  const freeDeliveryRemaining = Math.max(0, freeDeliveryThreshold - cartTotal);

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const coinsDiscount = Math.min(Math.floor(coinsToRedeem / 10), cartTotal); // 10 coins = ₹1
  const finalPayable = Math.max(0, cartTotal + deliveryFee - discountAmount - coinsDiscount);

  const applyCouponCode = async (code: string): Promise<boolean> => {
    try {
      const res = await api.validateCoupon(code, cartTotal);
      setAppliedCoupon(res);
      addToast(`Coupon "${res.code}" applied!`, `Saved ₹${res.discountAmount}`, 'success');
      return true;
    } catch (err: any) {
      addToast('Coupon Error', err.message || 'Cannot apply coupon', 'error');
      return false;
    }
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', '', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast('Removed from Wishlist', product.name, 'info');
        return prev.filter(id => id !== product.id);
      } else {
        addToast('Saved to Wishlist', product.name, 'success');
        return [...prev, product.id];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Compare operations
  const addToCompare = (product: Product) => {
    if (compareList.length >= 4) {
      addToast('Compare Limit Reached', 'You can compare up to 4 items simultaneously', 'warning');
      return;
    }
    if (!compareList.some(p => p.id === product.id)) {
      setCompareList(prev => [...prev, product]);
      addToast('Added to Compare', product.name, 'info');
    }
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        user,
        loginDemo,
        loginAdmin,
        logout,
        updateUserAddress,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        deliveryFee,
        freeDeliveryThreshold,
        freeDeliveryRemaining,
        discountAmount,
        appliedCoupon,
        applyCouponCode,
        removeCouponCode,
        coinsToRedeem,
        setCoinsToRedeem,
        finalPayable,
        savedForLater,
        saveForLater,
        moveToCartFromSaved,
        removeFromSavedForLater,
        recentlyViewed,
        addToRecentlyViewed,
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedStoreId,
        setSelectedStoreId,
        currentLocation,
        setCurrentLocation,
        isCartOpen,
        setIsCartOpen,
        activeProductId,
        setActiveProductId,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCompareOpen,
        setIsCompareOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        isAuthOpen,
        setIsAuthOpen,
        isProfileOpen,
        setIsProfileOpen,
        isAdminView,
        setIsAdminView,
        toasts,
        addToast,
        removeToast,
        reorderItems
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

