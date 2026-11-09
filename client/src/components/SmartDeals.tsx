import React, { useState, useEffect } from 'react';
import { Flame, Clock, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

export const SmartDeals: React.FC<{ products: Product[] }> = ({ products }) => {
  const { addToCart, cart, setActiveProductId } = useApp();

  // Flash Sale countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 }; // reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 p-5 sm:p-7">
        {/* Header with countdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                  Smart Deals & Flash Discounts
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white">
                  Up to 30% Off
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Fresh daily stock surplus from certified neighborhood merchants
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-500/30">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Ends in:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-xs text-amber-600 dark:text-amber-400">
              <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {dealProducts.map(product => {
            const inCart = cart.find(c => c.product.id === product.id);
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

            return (
              <div
                key={product.id}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all"
              >
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-amber-500 text-white font-black text-[10px] tracking-wide shadow-sm">
                  {discountPercent}% OFF
                </div>

                {/* Image */}
                <div
                  onClick={() => setActiveProductId(product.id)}
                  className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2.5 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="mb-2">
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                    {product.storeName}
                  </p>
                  <h3
                    onClick={() => setActiveProductId(product.id)}
                    className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">{product.unit}</p>
                </div>

                {/* Price and Add button */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                      ₹{product.price}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through ml-1.5">
                      ₹{product.originalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                      inCart
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    {inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{inCart ? `${inCart.quantity}` : 'Add'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

