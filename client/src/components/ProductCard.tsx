import React from 'react';
import { Heart, Layers, Star, Plus, Minus, Store, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isWishlisted,
    addToCompare,
    setActiveProductId
  } = useApp();

  const cartItem = cart.find(c => c.product.id === product.id);
  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Top badges */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 cursor-pointer">
        {/* Floating Discount Tag */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-extrabold text-[10px] tracking-wide shadow-sm">
            {discountPercent}% OFF
          </div>
        )}

        {/* Special Badge if any */}
        {product.badge && discountPercent === 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wide shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Quick actions (Wishlist & Compare) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              wishlisted
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
            }`}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product);
            }}
            className="w-7 h-7 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-indigo-600 flex items-center justify-center transition-all shadow-sm"
            title="Compare with other products"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          onClick={() => setActiveProductId(product.id)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            isOutOfStock ? 'grayscale opacity-60' : ''
          }`}
          loading="lazy"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col">
        {/* Store badge & distance */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Store className="w-3 h-3 shrink-0" />
          <span className="truncate">{product.storeName}</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => setActiveProductId(product.id)}
          className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors leading-snug mb-1"
        >
          {product.name}
        </h3>

        {/* Unit & Rating */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <span>{product.unit}</span>
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Stock urgency indicator */}
        {isLowStock && (
          <div className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
            <AlertCircle className="w-3 h-3" />
            <span>Only {product.stock} left in stock!</span>
          </div>
        )}
      </div>

      {/* Price & Add to Cart button */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            ⚡ 15-min delivery
          </p>
        </div>

        {/* Stepper or Add button */}
        {isOutOfStock ? (
          <button
            disabled
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold text-xs cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : cartItem ? (
          <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/30 rounded-xl p-0.5 shadow-sm">
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-extrabold text-xs text-emerald-800 dark:text-emerald-200">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        )}
      </div>
    </div>
  );
};

