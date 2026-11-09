import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { api } from './services/api';
import { Product, Store, Category } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { SmartDeals } from './components/SmartDeals';
import { AIMealAssistant } from './components/AIMealAssistant';
import { LocalStoreFinder } from './components/LocalStoreFinder';
import { ProductDiscovery } from './components/ProductDiscovery';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracking } from './components/OrderTracking';
import { CompareModal } from './components/CompareModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ToastContainer } from './components/ToastContainer';
import { AdminDashboard } from './components/AdminDashboard';
import { Testimonials } from './components/Testimonials';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { isAdminView, selectedStoreId, setSelectedStoreId, isWishlistOpen, setIsWishlistOpen } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [prods, strList, cats] = await Promise.all([
          api.getProducts(),
          api.getStores(),
          api.getCategories()
        ]);
        setProducts(prods);
        setStores(strList);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // If Admin View is toggled, render the Admin Portal
  if (isAdminView) {
    return (
      <>
        <AdminDashboard />
        <ToastContainer />
      </>
    );
  }

  const handleExploreClick = () => {
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStore = (store: Store) => {
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Promotional Hero Carousel */}
        <HeroBanner onExploreClick={handleExploreClick} />

        {/* Category Visual Badges */}
        <CategoryNav categories={categories} />

        {/* Flash Deals with Countdown */}
        <SmartDeals products={products} />

        {/* AI Chef & Recipe Kit Assistant */}
        <AIMealAssistant />

        {/* Neighborhood Store Finder */}
        <LocalStoreFinder stores={stores} onSelectStore={handleSelectStore} />

        {/* Advanced Product Discovery & Filters */}
        <ProductDiscovery products={products} loading={loading} />

        {/* Customer Testimonials & Local Merchant Stories */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <ProductDetailModal />
      <CheckoutModal />
      <OrderTracking />
      <CompareModal />
      <UserProfileModal />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        allProducts={products}
      />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

