import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  MapPin,
  Clock,
  CreditCard,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Plus,
  QrCode,
  Smartphone
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    deliveryFee,
    discountAmount,
    appliedCoupon,
    coinsToRedeem,
    finalPayable,
    clearCart,
    user,
    currentLocation,
    setActiveTrackingOrderId,
    addToast
  } = useApp();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("Instant (15-25 mins)");
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpaySheet, setShowRazorpaySheet] = useState(false);
  const [upiId, setUpiId] = useState('user@okaxis');

  // New address state
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newFlat, setNewFlat] = useState('');
  const [newArea, setNewArea] = useState('Indiranagar');

  if (!isCheckoutOpen) return null;

  const savedAddresses = user?.savedAddresses || [
    {
      id: 'addr-default',
      label: 'Home',
      name: user?.name || 'Aarav Sharma',
      phone: user?.phone || '+91 98201 44552',
      flat: 'Flat 402, Lotus Orchid Apts',
      area: '100ft Road, HAL 2nd Stage, Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      isDefault: true
    }
  ];

  const deliverySlots = [
    { id: "instant", label: "⚡ Instant 15-25 mins", desc: "Fastest runner from nearby store" },
    { id: "evening", label: "🕒 Today Evening (6 PM - 8 PM)", desc: "Scheduled evening drop" },
    { id: "morning", label: "📅 Tomorrow Morning (7 AM - 9 AM)", desc: "Fresh milk & produce slot" }
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    const activeAddress = savedAddresses[selectedAddressIndex] || savedAddresses[0];
    const fullAddress = `${activeAddress.flat}, ${activeAddress.area}, ${activeAddress.city} - ${activeAddress.pincode}`;

    const orderPayload = {
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      storeId: cart[0]?.product.storeId || 'store-1',
      storeName: cart[0]?.product.storeName || 'Green Grocers & Farm Fresh',
      itemTotal: cartTotal,
      deliveryFee,
      discount: discountAmount,
      couponApplied: appliedCoupon ? appliedCoupon.code : null,
      coinsRedeemed: coinsToRedeem,
      total: finalPayable,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online / Razorpay',
      deliveryAddress: fullAddress,
      slot: selectedSlot
    };

    try {
      const res = await api.createOrder(orderPayload);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }

      clearCart();
      setIsCheckoutOpen(false);
      setShowRazorpaySheet(false);
      setActiveTrackingOrderId(res.data.id);
      addToast('Order Placed Successfully! 🎉', `Order ID: ${res.data.id}`, 'success');
    } catch (err: any) {
      addToast('Checkout Failed', err.message || 'Please try again', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Secure Checkout
            </h2>
            <p className="text-xs text-slate-400">100% Encrypted & Verified Local Order</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Step 1: Delivery Address */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                1. Select Delivery Address
              </h3>
              <button
                onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>{isAddingNewAddress ? 'Cancel' : 'Add New'}</span>
              </button>
            </div>

            {/* Address cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedAddresses.map((addr, idx) => (
                <div
                  key={addr.id || idx}
                  onClick={() => setSelectedAddressIndex(idx)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedAddressIndex === idx
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                      {addr.label}
                    </span>
                    {selectedAddressIndex === idx && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {addr.name} • {addr.phone}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {addr.flat}, {addr.area}, {addr.city} - {addr.pincode}
                  </p>
                </div>
              ))}
            </div>

            {isAddingNewAddress && (
              <div className="mt-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 space-y-2 animate-slide-up">
                <input
                  type="text"
                  placeholder="Flat / House / Apartment No."
                  value={newFlat}
                  onChange={(e) => setNewFlat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                />
                <input
                  type="text"
                  placeholder="Street / Area Name"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                />
                <button
                  onClick={() => {
                    if (newFlat) {
                      savedAddresses.push({
                        id: `addr-${Date.now()}`,
                        label: 'Other',
                        name: user?.name || 'Customer',
                        phone: user?.phone || '+91 98201 44552',
                        flat: newFlat,
                        area: newArea,
                        city: 'Bengaluru',
                        pincode: '560038',
                        isDefault: false
                      });
                      setSelectedAddressIndex(savedAddresses.length - 1);
                      setIsAddingNewAddress(false);
                      setNewFlat('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Save & Deliver Here
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Delivery Slot */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              2. Delivery Speed & Slot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {deliverySlots.map(slot => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.label)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedSlot === slot.label
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{slot.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{slot.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Payment Options */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
              3. Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'razorpay'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-slate-100">Online / UPI / Razorpay</p>
                    <p className="text-[10px] text-slate-500">GooglePay, PhonePe, Paytm, Cards</p>
                  </div>
                </div>
                {paymentMethod === 'razorpay' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>

              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-slate-100">Cash on Delivery</p>
                    <p className="text-[10px] text-slate-500">Pay cash or UPI to runner</p>
                  </div>
                </div>
                {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
            </div>
          </div>

          {/* Interactive Razorpay / UPI Simulator Sheet */}
          {paymentMethod === 'razorpay' && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  Razorpay Express UPI Payment
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                  Live Test Mode
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter your VPA / UPI ID (e.g. name@okhdfc)"
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-blue-500"
                />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                  Verified ✓
                </span>
              </div>
            </div>
          )}

          {/* Bill Overview */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Items Total ({cart.length} items)</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Applied</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}
            {coinsToRedeem > 0 && (
              <div className="flex justify-between text-amber-600 font-semibold">
                <span>Coins Discount</span>
                <span>-₹{Math.floor(coinsToRedeem / 10)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-black text-sm text-slate-900 dark:text-slate-100">
              <span>Total Payable</span>
              <span>₹{finalPayable}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400">Total Amount</p>
            <p className="text-xl font-black text-slate-900 dark:text-slate-100">₹{finalPayable}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-98 transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Confirming with Store...</span>
            ) : (
              <>
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

