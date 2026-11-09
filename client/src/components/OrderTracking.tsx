import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Order } from '../types';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Bike,
  Package,
  Store,
  RotateCcw,
  Download,
  AlertCircle,
  Play
} from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const {
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    reorderItems,
    addToast
  } = useApp();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = () => {
    if (!activeTrackingOrderId) return;
    setLoading(true);
    api.getOrderById(activeTrackingOrderId)
      .then(res => setOrder(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000); // Poll status periodically
    return () => clearInterval(interval);
  }, [activeTrackingOrderId]);

  if (!activeTrackingOrderId || !order) return null;

  const handleAdvanceStatus = async () => {
    const nextStatus =
      order.status === 'Confirmed' ? 'Packed' :
      order.status === 'Packed' ? 'Out for Delivery' :
      order.status === 'Out for Delivery' ? 'Delivered' : 'Delivered';

    try {
      const updated = await api.updateOrderStatus(order.id, nextStatus);
      setOrder(updated);
      addToast('Status Updated!', `Order is now: ${nextStatus}`, 'success');
    } catch {
      addToast('Update Failed', '', 'error');
    }
  };

  const handleCancel = async () => {
    try {
      await api.cancelOrder(order.id);
      setOrder(prev => prev ? { ...prev, status: 'Cancelled' } : null);
      addToast('Order Cancelled', 'Your order was cancelled', 'info');
    } catch (err: any) {
      addToast('Cannot cancel', err.message, 'error');
    }
  };

  const isDelivered = order.status === 'Delivered';
  const isCancelled = order.status === 'Cancelled';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Live Order Tracker
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {order.id}
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
              {isCancelled ? 'Order Cancelled' : isDelivered ? 'Order Delivered! 🎉' : 'Arriving in ~14 mins ⚡'}
            </h2>
          </div>

          <button
            onClick={() => setActiveTrackingOrderId(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Animated Status Stepper */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Progress Status
              </span>
              {!isDelivered && !isCancelled && (
                <button
                  onClick={handleAdvanceStatus}
                  className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                  title="Simulate driver movement & store packing"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Simulate Next Step</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {order.timeline?.map((step, idx) => {
                const isStepCompleted = step.completed || isDelivered;

                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                          isStepCompleted
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}
                      >
                        {isStepCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      {idx < order.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-6 ${
                            isStepCompleted ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        />
                      )}
                    </div>

                    <div className="pt-1">
                      <p
                        className={`text-xs font-bold ${
                          isStepCompleted
                            ? 'text-slate-900 dark:text-slate-100'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.step}
                      </p>
                      <p className="text-[10px] text-slate-400">{step.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Partner Card */}
          {order.deliveryPartner && !isCancelled && (
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                      {order.deliveryPartner.name}
                    </p>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      ★ {order.deliveryPartner.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{order.deliveryPartner.vehicle}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Assigned 15-Min LocalMart Hero
                  </p>
                </div>
              </div>

              <a
                href={`tel:${order.deliveryPartner.phone}`}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 shadow-sm border border-emerald-500/20 transition-colors"
                title={`Call ${order.deliveryPartner.name}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Store & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1">
                <Store className="w-3 h-3 text-emerald-500" /> Dispatching From
              </span>
              <p className="font-bold text-slate-900 dark:text-slate-100">{order.storeName}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Bengaluru Local Fulfillment Hub</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3 text-emerald-500" /> Delivering To
              </span>
              <p className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                {order.customerName}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          {/* Items Summary & Total */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Basket Items ({order.items.length})
            </span>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900 dark:text-slate-100">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs flex justify-between font-black">
              <span>Total Paid ({order.paymentMethod})</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3">
          {/* Quick Reorder Button */}
          <button
            onClick={() => {
              reorderItems(order.items);
              setActiveTrackingOrderId(null);
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reorder This Basket (1-Click)</span>
          </button>

          {!isDelivered && !isCancelled && (
            <button
              onClick={handleCancel}
              className="py-3 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

