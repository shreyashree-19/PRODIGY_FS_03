import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  Coins,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
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
    setIsCheckoutOpen,
    user
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (codeToApply: string) => {
    if (!codeToApply.trim()) return;
    setCouponLoading(true);
    await applyCouponCode(codeToApply.trim().toUpperCase());
    setCouponInput('');
    setCouponLoading(false);
  };

  const availableCoupons = ["WELCOME50", "LOCALMART20", "FREEDEL", "SUPER100"];
  const progressPercent = Math.min(100, Math.round((cartTotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slide-left">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Your Shopping Basket
                </h2>
                <p className="text-xs text-slate-400">
                  {cart.length} {cart.length === 1 ? 'unique item' : 'unique items'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Your basket is empty
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Explore fresh harvest, artisan sourdough, and local groceries from nearby stores!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Meter */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      {freeDeliveryRemaining > 0 ? (
                        <>Add <strong className="text-slate-900 dark:text-white">₹{freeDeliveryRemaining}</strong> more for FREE delivery!</>
                      ) : (
                        <>🎉 You've unlocked FREE 15-min delivery!</>
                      )}
                    </span>
                    <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 truncate">
                          {product.storeName}
                        </p>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{product.unit}</p>

                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                            ₹{product.price * quantity}
                          </span>
                          {quantity > 1 && (
                            <span className="text-[10px] text-slate-400">
                              (₹{product.price} each)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 shadow-sm shrink-0">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 rounded-lg text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800 dark:text-slate-200">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 rounded-lg text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Section */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-500" />
                      Apply Promo Coupon
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-xs font-black">{appliedCoupon.code}</p>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            Saved ₹{appliedCoupon.discountAmount}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={removeCouponCode}
                        className="text-[11px] font-bold text-rose-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code (e.g. WELCOME50)"
                          className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={() => handleApplyCoupon(couponInput)}
                          disabled={couponLoading || !couponInput.trim()}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-50"
                        >
                          Apply
                        </button>
                      </div>

                      {/* Quick Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {availableCoupons.map((code) => (
                          <button
                            key={code}
                            onClick={() => handleApplyCoupon(code)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-dashed border-emerald-500/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50"
                          >
                            +{code}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Digital Loyalty Coins Slider */}
                {user && user.coins > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Redeem LocalCoins
                        </span>
                      </div>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        {user.coins} available
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max={Math.min(user.coins, cartTotal * 10)}
                        step="10"
                        value={coinsToRedeem}
                        onChange={(e) => setCoinsToRedeem(Number(e.target.value))}
                        className="flex-1 accent-amber-500"
                      />
                      <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 shrink-0">
                        -₹{Math.floor(coinsToRedeem / 10)}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">10 Coins = ₹1 instant discount</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Bill Breakdown */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>15-Min Delivery Fee</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                        FREE
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                {coinsToRedeem > 0 && (
                  <div className="flex justify-between text-amber-600 dark:text-amber-400 font-semibold">
                    <span>Coins Redeemed</span>
                    <span>-₹{Math.floor(coinsToRedeem / 10)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-slate-900 dark:text-slate-100">Total Payable</span>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Earn +{Math.round(finalPayable * 0.05)} Coins on this order!
                    </p>
                  </div>
                  <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                    ₹{finalPayable}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-between shadow-xl shadow-emerald-600/30 active:scale-98 transition-all"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-1">
                  <span>₹{finalPayable}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

