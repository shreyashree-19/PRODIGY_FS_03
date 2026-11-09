import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  Search,
  RotateCcw,
  Sparkles,
  Store as StoreIcon
} from 'lucide-react';

export const ProductDiscovery: React.FC<{ products: Product[]; loading: boolean }> = ({
  products,
  loading
}) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedStoreId,
    setSelectedStoreId,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under100' | '100to300' | 'above300'>('all');
  const [minRating, setMinRating] = useState<number>(0);

  // Filter products
  const filteredProducts = products.filter(product => {
    // Category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Store filter
    if (selectedStoreId && product.storeId !== selectedStoreId) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.storeName.toLowerCase().includes(q) ||
        product.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    // In Stock Only
    if (inStockOnly && product.stock <= 0) {
      return false;
    }

    // Price Range
    if (priceRange === 'under100' && product.price >= 100) return false;
    if (priceRange === '100to300' && (product.price < 100 || product.price > 300)) return false;
    if (priceRange === 'above300' && product.price <= 300) return false;

    // Rating
    if (minRating > 0 && product.rating < minRating) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popular
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedStoreId(null);
    setSearchQuery('');
    setSortOption('popular');
    setInStockOnly(false);
    setPriceRange('all');
    setMinRating(0);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedStoreId !== null ||
    searchQuery !== '' ||
    inStockOnly ||
    priceRange !== 'all' ||
    minRating > 0;

  return (
    <section id="products-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Title & Filter Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Neighborhood Shelf & Fresh Arrivals'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Showing {sortedProducts.length} certified items available for 15-minute dispatch
          </p>
        </div>

        {/* Sort & Quick Filter Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* In Stock Switch */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              inStockOnly
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {inStockOnly && <Check className="w-3.5 h-3.5" />}
            <span>In Stock Only</span>
          </button>

          {/* Price Range Filter */}
          <select
            value={priceRange}
            onChange={(e: any) => setPriceRange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Prices</option>
            <option value="under100">Under ₹100</option>
            <option value="100to300">₹100 - ₹300</option>
            <option value="above300">Above ₹300</option>
          </select>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortOption}
              onChange={(e: any) => setSortOption(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated (★)</option>
            </select>
          </div>

          {/* Reset Filters button if any active */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No matching items found
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search keywords, price filter, or clear active store filter.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

