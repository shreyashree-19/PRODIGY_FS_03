import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Apple, Croissant, Utensils, Coffee, HeartPulse } from 'lucide-react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  const { selectedCategory, setSelectedCategory, setSelectedStoreId } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple className="w-5 h-5" />;
      case 'Croissant':
        return <Croissant className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Explore Categories</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Handcrafted, harvested and curated by neighborhood sellers</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedStoreId(null);
              }}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all text-center group ${
                isSelected
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-sm'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {getIcon(cat.icon)}
              </div>
              <div>
                <p className="text-xs font-bold leading-tight truncate max-w-[100px]">{cat.name}</p>
                <p
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {cat.count} items
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

