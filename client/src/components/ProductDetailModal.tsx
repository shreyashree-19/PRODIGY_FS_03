import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Product } from '../types';
import {
  X,
  Star,
  Plus,
  Minus,
  Check,
  Store,
  ShieldCheck,
  Clock,
  Heart,
  Layers,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductId,
    setActiveProductId,
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isWishlisted,
    addToCompare
  } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'nutrition' | 'reviews'>('specs');

  useEffect(() => {
    if (!activeProductId) {
      setProduct(null);
      return;
    }
    setLoading(true);
    api.getProductById(activeProductId)
      .then(res => {
        setProduct(res.data);
        setRelated(res.related);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [activeProductId]);

  if (!activeProductId || !product) return null;

  const cartItem = cart.find(c => c.product.id === product.id);
  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              {product.category.toUpperCase()}
            </span>
            {product.badge && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-full border transition-colors ${
                wishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => addToCompare(product)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveProductId(null)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Product Media Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 relative shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discountPercent > 0 && (
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow">
                    {discountPercent}% OFF
                  </div>
                )}
              </div>

              {/* Verified Neighborhood Store Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{product.storeName}</p>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Verified Neighborhood Merchant</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" /> 15 mins
                  </span>
                  <span className="text-[10px] text-slate-400">Doorstep Delivery</span>
                </div>
              </div>
            </div>

            {/* Right: Info, Price, Add & Tabs */}
            <div className="flex flex-col">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mb-2 leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{product.unit}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  ({product.reviewsCount} verified customer reviews)
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold ml-auto flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> High in Demand
                </span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 mb-5 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Inclusive of all taxes & local freshness guarantee
                  </p>
                </div>

                {/* Add to Basket Action */}
                {cartItem ? (
                  <div className="flex items-center bg-emerald-50 dark:bg-emerald-950 border border-emerald-500/40 rounded-2xl p-1 shadow">
                    <button
                      onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                      className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold hover:bg-emerald-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-extrabold text-sm text-emerald-800 dark:text-emerald-200">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                      className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-700 shadow"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket</span>
                  </button>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Tabs: Specifications / Nutrition / Reviews */}
              <div className="border-b border-slate-200 dark:border-slate-800 flex gap-4 mb-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Specifications
                </button>
                {product.nutrition && (
                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'nutrition'
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Nutritional Highlights
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Customer Reviews
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'specs' && (
                <div className="space-y-2">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800/60"
                    >
                      <span className="text-slate-500 dark:text-slate-400">{key}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'nutrition' && product.nutrition && (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.nutrition).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <p className="text-[10px] uppercase font-bold text-slate-400">{key}</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">{val}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                        "Super fresh and fragrant!"
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Arrived in just 14 mins by Ramesh. Highly recommended! – Priyank M.
                      </p>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          {related.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Frequently Bought Together
                  </h3>
                  <p className="text-xs text-slate-400">Customers also paired with these neighborhood favorites</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {related.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => setActiveProductId(rel.id)}
                    className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 cursor-pointer transition-colors group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-white mb-2">
                      <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{rel.name}</p>
                    <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">₹{rel.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

