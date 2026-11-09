import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Order } from '../types';
import {
  X,
  User,
  Coins,
  MapPin,
  Clock,
  RotateCcw,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Package
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    user,
    setActiveTrackingOrderId,
    reorderItems,
    loginDemo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (isProfileOpen) {
      api.getOrders()
        .then(res => setOrders(res))
        .catch(err => console.error(err));
    }
  }, [isProfileOpen]);

  if (!isProfileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
              alt="User"
              className="w-10 h-10 rounded-2xl object-cover border-2 border-emerald-500"
            />
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
                {user?.name || "Customer Account"}
              </h2>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LocalCoins Wallet Strip */}
        <div className="px-6 py-3 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500 fill-amber-400" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Digital Loyalty Balance:
              </span>
              <strong className="text-xs text-amber-600 dark:text-amber-400 ml-1.5 font-black">
                {user?.coins || 380} LocalCoins (₹{Math.floor((user?.coins || 380) / 10)} savings)
              </strong>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
            5% Cashback Active
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b border-slate-100 dark:border-slate-800 flex gap-6 text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Order History & Reorder ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'addresses'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Saved Delivery Addresses
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Account Details & Switcher
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-4">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Package className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-xs">No orders placed yet</p>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {order.id}
                        </span>
                        <span className="text-slate-400 ml-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Store & items */}
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      Dispatched from: <strong>{order.storeName}</strong>
                    </p>

                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shrink-0"
                        >
                          <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover" />
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                            {item.name}
                          </span>
                          <span className="text-slate-400 text-[10px]">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total & Action Buttons */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                        Total: ₹{order.total} ({order.paymentMethod})
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveTrackingOrderId(order.id);
                            setIsProfileOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-300"
                        >
                          Track Status
                        </button>
                        <button
                          onClick={() => {
                            reorderItems(order.items);
                            setIsProfileOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>1-Click Reorder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              {user?.savedAddresses?.map((addr, idx) => (
                <div
                  key={addr.id || idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        {addr.flat}, {addr.area}, {addr.city} - {addr.pincode}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">Phone: {addr.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE / SWITCHER TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Role:</strong> <span className="capitalize">{user?.role}</span></p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Switch Active Persona
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => loginDemo('customer')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Customer</p>
                    <p className="text-[10px] text-slate-400">Aarav Sharma</p>
                  </button>
                  <button
                    onClick={() => loginDemo('store_owner')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Store Partner</p>
                    <p className="text-[10px] text-slate-400">Green Grocers Indiranagar</p>
                  </button>
                  <button
                    onClick={() => loginDemo('admin')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Platform Admin</p>
                    <p className="text-[10px] text-slate-400">Full control & analytics</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

