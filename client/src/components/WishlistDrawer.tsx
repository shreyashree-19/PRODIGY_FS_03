import React from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { X, Heart, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
}> = ({ isOpen, onClose, allProducts }) => {
  const { wishlist, toggleWishlist, addToCart, addToast } = useApp();

  if (!isOpen) return null;

  const wishlistedProducts = allProducts.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(p => addToCart(p, 1));
    addToast('All Moved to Basket!', `${wishlistedProducts.length} items added to your basket`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slide-left">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Your Saved Wishlist
                </h2>
                <p className="text-xs text-slate-400">
                  {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'saved item' : 'saved items'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Tap the heart icon on any neighborhood product to save it for your next order!
                </p>
              </div>
            ) : (
              wishlistedProducts.map(product => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3 justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-emerald-600 truncate">{product.storeName}</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{product.unit}</p>
                    <p className="text-xs font-black text-slate-900 dark:text-slate-100 mt-0.5">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Move</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 self-end"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer action */}
          {wishlistedProducts.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <button
                onClick={handleAddAllToCart}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Basket ({wishlistedProducts.length} items)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

