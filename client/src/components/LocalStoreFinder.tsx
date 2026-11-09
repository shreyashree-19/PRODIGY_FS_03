import React, { useState } from 'react';
import { Store as StoreType } from '../types';
import { useApp } from '../context/AppContext';
import {
  Store,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const LocalStoreFinder: React.FC<{ stores: StoreType[]; onSelectStore: (store: StoreType) => void }> = ({
  stores,
  onSelectStore
}) => {
  const { selectedStoreId, setSelectedStoreId, addToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Neighborhood Stores' },
    { id: 'produce', name: 'Farm Produce' },
    { id: 'bakery', name: 'Bakery & Dairy' },
    { id: 'gourmet', name: 'Gourmet & Pantry' },
    { id: 'supermarket', name: 'Supermarket' },
    { id: 'wellness', name: 'Chemist & Wellness' }
  ];

  const filteredStores = stores.filter(s => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'produce') return s.category.includes('Produce');
    if (activeCategory === 'bakery') return s.category.includes('Bakery');
    if (activeCategory === 'gourmet') return s.category.includes('Gourmet');
    if (activeCategory === 'supermarket') return s.category.includes('Supermarket');
    if (activeCategory === 'wellness') return s.category.includes('Wellness');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="local-stores">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Store className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Local Retailer Network
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
            Certified Neighborhood Partner Stores
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Direct inventory integration with authentic family-run shops and organic collectives.
          </p>
        </div>

        {/* Selected Store indicator if active */}
        {selectedStoreId && (
          <button
            onClick={() => setSelectedStoreId(null)}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
          >
            Clear Store Filter (Show All)
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeCategory === cat.id
                ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStores.map(store => {
          const isSelected = selectedStoreId === store.id;

          return (
            <div
              key={store.id}
              className={`rounded-3xl bg-white dark:bg-slate-900 border overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col justify-between group ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {/* Store Banner & Thumbnail */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={store.bannerImage}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow">
                    Open Now
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-white/20 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    {store.rating} ({store.reviewsCount})
                  </span>
                </div>

                {/* Distance pill */}
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white shadow flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-500" />
                  <span>{store.deliveryTimeMins} mins</span>
                </div>

                {/* Store logo thumbnail overlapping */}
                <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-900 shadow-md">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Store Details Body */}
              <div className="pt-6 px-4 pb-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {store.name}
                    </h3>
                    {store.isVerified && (
                      <span title="Verified Merchant">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                    {store.tagline}
                  </p>

                  {/* Address and timing info */}
                  <div className="space-y-1 mb-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{store.address} ({store.distanceKm} km away)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Hours: {store.openingHours}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {store.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${store.phone}`}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
                    title={`Call store: ${store.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setSelectedStoreId(isSelected ? null : store.id);
                      onSelectStore(store);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    <span>{isSelected ? 'Viewing Store Shelf' : 'Shop This Store'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
