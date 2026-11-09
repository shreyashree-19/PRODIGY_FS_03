import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Layers, Star, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    compareList,
    removeFromCompare,
    clearCompare,
    addToCart
  } = useApp();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
                Compare Products Side-by-Side
              </h2>
              <p className="text-xs text-slate-400">
                {compareList.length} {compareList.length === 1 ? 'item' : 'items'} selected (Max 4)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-2.5 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-auto p-6">
          {compareList.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Layers className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No items to compare yet</p>
              <p className="text-xs mt-1">Click the comparison icon on any product card to evaluate prices and features.</p>
            </div>
          ) : (
            <div className="min-w-[600px] grid grid-cols-5 gap-4 text-xs">
              {/* Feature Labels Column */}
              <div className="col-span-1 space-y-6 pt-40 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                <div className="h-8 flex items-center">Price & Unit</div>
                <div className="h-8 flex items-center">Customer Rating</div>
                <div className="h-8 flex items-center">Neighborhood Store</div>
                <div className="h-8 flex items-center">Stock Availability</div>
                <div className="h-14 flex items-center">Origin / Source</div>
                <div className="h-10 flex items-center">Action</div>
              </div>

              {/* Product Columns */}
              {compareList.map(prod => (
                <div
                  key={prod.id}
                  className="col-span-1 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative group"
                >
                  <button
                    onClick={() => removeFromCompare(prod.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-rose-500 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Thumbnail & Title */}
                  <div className="mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full aspect-square rounded-xl object-cover bg-white mb-2 shadow-sm"
                    />
                    <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-2 h-8">
                      {prod.name}
                    </h3>
                  </div>

                  {/* Values */}
                  <div className="space-y-6">
                    <div className="h-8 flex flex-col justify-center">
                      <span className="font-black text-sm text-slate-900 dark:text-slate-100">
                        ₹{prod.price}
                      </span>
                      <span className="text-[10px] text-slate-400">{prod.unit}</span>
                    </div>

                    <div className="h-8 flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{prod.rating}</span>
                      <span className="text-[10px] text-slate-400">({prod.reviewsCount})</span>
                    </div>

                    <div className="h-8 flex items-center text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                      {prod.storeName}
                    </div>

                    <div className="h-8 flex items-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        In Stock ({prod.stock})
                      </span>
                    </div>

                    <div className="h-14 flex items-center text-slate-600 dark:text-slate-300 text-[11px]">
                      {prod.specifications?.['Origin'] || prod.specifications?.['Farming'] || 'Verified Local Producer'}
                    </div>

                    <div className="h-10 flex items-center">
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

