import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Search,
  MapPin,
  Moon,
  Sun,
  User as UserIcon,
  ChevronDown,
  Sparkles,
  Layers,
  Store as StoreIcon,
  ShieldCheck,
  Coins,
  LogOut,
  X,
  History,
  TrendingUp,
  SlidersHorizontal,
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    isDark,
    toggleTheme,
    user,
    loginDemo,
    logout,
    cart,
    cartTotal,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    currentLocation,
    setCurrentLocation,
    compareList,
    setIsCompareOpen,
    wishlist,
    setIsWishlistOpen,
    isAuthOpen,
    setIsAuthOpen,
    setIsProfileOpen,
    isAdminView,
    setIsAdminView,
    setActiveProductId
  } = useApp();

  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const locations = [
    { name: "Indiranagar, Bengaluru", pincode: "560038", time: "12-15 mins" },
    { name: "Koramangala 4th Block", pincode: "560034", time: "15-20 mins" },
    { name: "Domlur / Old Airport Rd", pincode: "560008", time: "10-14 mins" },
    { name: "HSR Layout Sector 1", pincode: "560102", time: "20-25 mins" },
    { name: "Whitefield Inner Circle", pincode: "560066", time: "25-30 mins" }
  ];

  const popularKeywords = ["Alphonso Mango", "Paneer", "Sourdough", "A2 Ghee", "Filter Coffee", "Makhana", "Baby Spinach"];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
          <Sparkles className="w-3 h-3 text-amber-300" /> LOCAL DEALS
        </span>
        <span>
          ⚡ Ultra-Fast 15-Min Delivery from Verified Neighborhood Stores in Bengaluru!
        </span>
        <span className="hidden sm:inline opacity-80">| Use code <strong>WELCOME50</strong> for ₹50 off</span>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2.5 flex items-center justify-between gap-3 md:gap-6">
        {/* Left: Brand & Location */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div
            onClick={() => {
              setIsAdminView(false);
              setSearchQuery('');
            }}
            className="cursor-pointer group flex items-center gap-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <StoreIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  LocalMart
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  NextGen
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                15-Min Hyperlocal
              </p>
            </div>
          </div>

          {/* Location Selector Pill */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-colors text-left border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Deliver to
                </p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                  {currentLocation}
                </p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isLocationMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLocationMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-premium border border-slate-200 dark:border-slate-800 p-2 z-50 animate-slide-up">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Select Delivery Cluster</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Instant delivery available in these zones</p>
                </div>
                <div className="py-1">
                  {locations.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentLocation(`${loc.name} - ${loc.pincode}`);
                        setIsLocationMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {loc.name}
                        </p>
                        <p className="text-[10px] text-slate-400">PIN: {loc.pincode}</p>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300">
                        ⚡ {loc.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Smart Search */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xl mx-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search 'Alphonso Mango', 'Sourdough', 'A2 Ghee'..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete / Suggestions dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-premium border border-slate-200 dark:border-slate-800 p-3 z-50 animate-slide-up">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Popular in Indiranagar
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Verified Fresh</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchQuery(kw);
                      setIsSearchFocused(false);
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 font-medium transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Admin Switcher indicator */}
          <button
            onClick={() => setIsAdminView(!isAdminView)}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isAdminView
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600'
            }`}
            title="Toggle Admin / Merchant Portal"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isAdminView ? 'Storefront View' : 'Admin Portal'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Compare Button */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Compare Products"
          >
            <Layers className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Saved Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Loyalty Coins Pill */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:scale-105 transition-transform"
            title="Your LocalMart Coins balance"
          >
            <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{user?.coins ?? 380} Coins</span>
          </button>

          {/* User Profile / Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
              )}
              <span className="hidden xl:inline text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                {user?.name || "Sign In"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-premium border border-slate-200 dark:border-slate-800 p-2 z-50 animate-slide-up">
                {user ? (
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                ) : (
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Welcome to LocalMart</p>
                    <p className="text-[11px] text-slate-500">Sign in to track orders & rewards</p>
                  </div>
                )}

                {/* Quick Demo Switcher Section */}
                <div className="py-2 px-1 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                    ⚡ Quick Demo Login
                  </p>
                  <button
                    onClick={() => {
                      loginDemo('customer');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between"
                  >
                    <span>1. Regular Shopper (Aarav)</span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">User</span>
                  </button>
                  <button
                    onClick={() => {
                      loginDemo('store_owner');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between"
                  >
                    <span>2. Store Partner (Green Grocers)</span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">Merchant</span>
                  </button>
                  <button
                    onClick={() => {
                      loginDemo('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between"
                  >
                    <span>3. Platform Administrator</span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">Admin</span>
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <span>My Profile & Saved Addresses</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAdminView(!isAdminView);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-purple-500" />
                    <span>{isAdminView ? 'Switch to Storefront' : 'Admin & Merchant Dashboard'}</span>
                  </button>

                  {user && (
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 text-slate-900 rounded-full text-[10px] font-extrabold flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {totalCartCount > 0 ? `₹${cartTotal}` : 'Basket'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

