import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Coins, Store, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroBanner: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const { setSelectedCategory, applyCouponCode } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "⚡ 15-Minute Hyperlocal",
      title: "Fresh from Neighborhood Farms to Your Kitchen",
      subtitle: "Handpicked Ratnagiri Alphonso mangoes, crisp hydroponic greens, and country eggs delivered within minutes.",
      primaryCta: "Shop Fresh Produce",
      categoryTarget: "produce",
      accentTag: "Zero Preservatives",
      bgGradient: "from-emerald-950/90 via-slate-900/80 to-transparent",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 2,
      badge: "🥖 Local Artisan Bakeries",
      title: "Slow-Fermented Sourdough & Pure A2 Gir Cow Dairy",
      subtitle: "Freshly baked every morning at 7:00 AM by local Bengaluru bakeries and farm-fresh dairy crafters.",
      primaryCta: "Explore Bakery & Dairy",
      categoryTarget: "bakery-dairy",
      accentTag: "Baked Fresh Today",
      bgGradient: "from-amber-950/90 via-slate-900/80 to-transparent",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: 3,
      badge: "🎉 Neighborhood Grocery Festival",
      title: "Get Flat ₹100 Off + Earn 5% Back in LocalCoins",
      subtitle: "Support your local family-owned stores with modern ultra-convenient doorstep delivery.",
      primaryCta: "Claim Offer Code",
      categoryTarget: "all",
      accentTag: "Code: SUPER100",
      bgGradient: "from-teal-950/90 via-slate-900/80 to-transparent",
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1400&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* Main Banner Slide Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[360px] sm:h-[420px] md:h-[460px] group border border-slate-200/50 dark:border-slate-800">
        {/* Background Image */}
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay for high readability */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Box */}
        <div className="relative h-full max-w-2xl flex flex-col justify-center p-6 sm:p-10 md:p-14 text-white z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-emerald-500/90 backdrop-blur-md text-white shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {slide.badge}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-amber-300">
              {slide.accentTag}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-base text-slate-200 font-medium mb-6 line-clamp-2 sm:line-clamp-none max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (slide.categoryTarget !== 'all') {
                  setSelectedCategory(slide.categoryTarget);
                }
                if (slide.id === 3) {
                  applyCouponCode('SUPER100');
                }
                onExploreClick();
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/30 transform active:scale-95 transition-all"
            >
              <span>{slide.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreClick}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-sm border border-white/20 transition-all"
            >
              Explore All Stores
            </button>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trust & Guarantee Highlights Bar */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">15-Min Delivery</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Neighborhood runner dispatch</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Verified Local Stores</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Authentic neighborhood shops</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">5% LocalCoins</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Cashback on every purchase</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Freshness Guarantee</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">100% no-questions refund</p>
          </div>
        </div>
      </div>
    </div>
  );
};

