import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Product, Order } from '../types';
import { AdminLogin } from './AdminLogin';
import {
  TrendingUp,
  ShoppingBag,
  Store,
  Clock,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Tag,
  LogOut,
  ShieldCheck,
  User as UserIcon
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, logout, setIsAdminView, addToast } = useApp();
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'coupons'>('overview');
  const [loading, setLoading] = useState(false);

  // New product form — ALL hooks must be declared before any conditional return
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('produce');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('');
  const [newProdUnit, setNewProdUnit] = useState('1 pack');
  const [newProdStock, setNewProdStock] = useState('20');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('Local Fresh');

  const isAuthorized = !!user && (user.role === 'admin' || user.role === 'store_owner');

  const loadAll = async () => {
    setLoading(true);
    try {
      const [m, o, p] = await Promise.all([
        api.getAdminMetrics(),
        api.getOrders(),
        api.getProducts()
      ]);
      setMetrics(m);
      setOrders(o);
      setProducts(p);
    } catch (err) {
      // Backend may not be reachable — show fallback data
      console.warn('Admin API fetch failed — using offline fallback data', err);
      setMetrics({
        totalRevenue: 181300, totalOrders: 475, activeStores: 5,
        avgDeliveryMinutes: 17,
        revenueHistory: [
          { day: 'Mon', revenue: 22000 }, { day: 'Tue', revenue: 31000 },
          { day: 'Wed', revenue: 27500 }, { day: 'Thu', revenue: 38000 },
          { day: 'Fri', revenue: 42000 }, { day: 'Sat', revenue: 44500 },
          { day: 'Sun', revenue: 29800 }
        ]
      });
      setOrders([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) loadAll();
  }, [isAuthorized]);

  // Auth guard — MUST come after all hooks
  if (!isAuthorized) {
    return <AdminLogin />;
  }

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      const updated = await api.updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      addToast('Status Updated', `${orderId} is now ${status}`, 'success');
    } catch {
      addToast('Status update failed', '', 'error');
    }
  };

  const handleToggleStock = async (prodId: string) => {
    try {
      const updated = await api.toggleProductStock(prodId);
      setProducts(prev => prev.map(p => p.id === prodId ? updated : p));
      addToast('Stock Toggled', `${updated.name} stock: ${updated.stock}`, 'info');
    } catch {
      addToast('Failed to toggle stock', '', 'error');
    }
  };

  const handleDeleteProduct = async (prodId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(prodId);
      setProducts(prev => prev.filter(p => p.id !== prodId));
      addToast('Product Removed', '', 'info');
    } catch {
      addToast('Failed to delete', '', 'error');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    try {
      const added = await api.addAdminProduct({
        name: newProdName,
        category: newProdCategory,
        price: Number(newProdPrice),
        originalPrice: Number(newProdOriginalPrice || newProdPrice),
        unit: newProdUnit,
        stock: Number(newProdStock),
        image: newProdImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
        badge: newProdBadge
      });
      setProducts(prev => [added, ...prev]);
      setShowAddProductModal(false);
      setNewProdName('');
      setNewProdPrice('');
      addToast('Product Created!', `${added.name} is now live in store catalog`, 'success');
    } catch {
      addToast('Creation failed', '', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Admin Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminView(false)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-purple-600" />
              <span>LocalMart Command Center</span>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Authenticated Admin Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover border border-purple-500"
              />
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {user.name}
                </p>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {user.role === 'admin' ? 'Root Admin' : 'Store Partner'}
                </span>
              </div>
            </div>

            <button
              onClick={loadAll}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => {
                logout();
                addToast('Logged Out', 'Signed out of administrator console', 'info');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors"
              title="Log out of admin portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 text-xs font-extrabold border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview & Analytics
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Live Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'coupons'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Coupons & Promotions
          </button>
        </div>
      </div>

      {/* Main Tab Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Revenue</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  ₹{metrics?.totalRevenue ? metrics.totalRevenue.toLocaleString() : '1,81,300'}
                </p>
                <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +24.8% vs last week</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {metrics?.totalOrders || 475}
                </p>
                <p className="text-[11px] text-blue-600 font-bold mt-1">98.2% on-time 15m delivery</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Stores</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                    <Store className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {metrics?.activeStores || 5}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Verified Indiranagar network</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Avg Delivery ETA</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {metrics?.avgDeliveryMinutes || 17} mins
                </p>
                <p className="text-[11px] text-amber-600 font-bold mt-1">★ 4.88 / 5.0 satisfaction</p>
              </div>
            </div>

            {/* Weekly Revenue Graph Visualization */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    Weekly Sales Velocity (Bengaluru Cluster)
                  </h3>
                  <p className="text-xs text-slate-400">Daily gross turnover & dispatched baskets</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                  Live Sync
                </span>
              </div>

              {/* Bar charts */}
              <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-48 pt-6">
                {metrics?.revenueHistory?.map((day: any, i: number) => {
                  const maxRev = 45000;
                  const barHeight = Math.round((day.revenue / maxRev) * 100);

                  return (
                    <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] font-bold text-slate-500 group-hover:text-purple-600 transition-colors">
                        ₹{(day.revenue / 1000).toFixed(1)}k
                      </div>
                      <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden h-full flex items-end">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-xl group-hover:from-purple-500 group-hover:to-indigo-400 transition-all duration-300"
                          style={{ height: `${barHeight}%` }}
                        />
                      </div>
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        {day.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Live Fulfillment Queue
                </h3>
                <p className="text-xs text-slate-400">
                  Update order status to trigger real-time rider dispatch and push notifications
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-extrabold uppercase tracking-wider">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Partner Store</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Current Status</th>
                    <th className="py-3 px-3">Update Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">
                        {order.id}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900 dark:text-slate-100">{order.customerName}</p>
                        <p className="text-[10px] text-slate-400">{order.customerPhone}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium truncate max-w-[150px]">
                        {order.storeName}
                      </td>
                      <td className="py-3 px-3 font-extrabold text-slate-900 dark:text-slate-100">
                        ₹{order.total}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-purple-500"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed">Packed</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Catalog & Inventory Master
                </h3>
                <p className="text-xs text-slate-400">
                  Manage store items, prices, and stock availability switches
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3 justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-emerald-600 truncate">{product.storeName}</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{product.name}</h4>
                    <p className="text-xs font-black text-slate-900 dark:text-slate-100 mt-0.5">₹{product.price}</p>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                      product.stock > 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggleStock(product.id)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[10px] font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100"
                    >
                      {product.stock > 0 ? 'Mark OOS' : 'Restock'}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 self-end"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-fade-in space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              Active Promotional Coupons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-xs font-black font-mono px-2 py-1 rounded bg-emerald-600 text-white">
                  WELCOME50
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                  ₹50 Flat Discount for new customers
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Min Order: ₹249 • 100% active</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30">
                <span className="text-xs font-black font-mono px-2 py-1 rounded bg-amber-600 text-white">
                  LOCALMART20
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                  20% OFF on fresh local produce
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Min Order: ₹399 • Max savings ₹120</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/30">
                <span className="text-xs font-black font-mono px-2 py-1 rounded bg-blue-600 text-white">
                  FREEDEL
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                  Zero Delivery Charge voucher
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Min Order: ₹199</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-500/30">
                <span className="text-xs font-black font-mono px-2 py-1 rounded bg-purple-600 text-white">
                  SUPER100
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                  Flat ₹100 OFF Neighborhood Grocery Festival
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Min Order: ₹699</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Add New Product to Local Catalog
              </h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-slate-600">
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Strawberries (Mahabaleshwar)"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="120"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  >
                    <option value="produce">Fresh Produce</option>
                    <option value="bakery-dairy">Dairy & Bakery</option>
                    <option value="gourmet">Gourmet & Pantry</option>
                    <option value="snacks">Snacks & Drinks</option>
                    <option value="wellness">Personal & Wellness</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Unit / Pack Size</label>
                  <input
                    type="text"
                    placeholder="250 g pack"
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Image URL (Unsplash / Direct)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-purple-600 text-white font-extrabold text-xs shadow-lg mt-2"
              >
                Publish to Local Store Shelf
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

