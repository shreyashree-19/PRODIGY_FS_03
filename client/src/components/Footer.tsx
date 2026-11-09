import React from 'react';
import { Store, ShieldCheck, Heart, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setSelectedStoreId } = useApp();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                LocalMart
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Next-generation hyperlocal commerce empowering family-run stores, artisan bakeries, and organic farms with 15-minute ultra-fast doorstep delivery.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Local Sellers</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Explore Neighborhood
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => { setSelectedCategory('produce'); setSelectedStoreId(null); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Fresh Hydroponic & Organic Produce
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('bakery-dairy'); setSelectedStoreId(null); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Daily Artisan Sourdough & A2 Dairy
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('gourmet'); setSelectedStoreId(null); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Cold-Pressed Oils & Single-Origin Spices
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('wellness'); setSelectedStoreId(null); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Ayurvedic Wellness & First Aid Chemist
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery Hubs */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              15-Min Delivery Zones
            </h4>
            <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Indiranagar (100ft & CMH Road)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Koramangala 3rd & 4th Block</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Domlur & Old Airport Road</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>HSR Layout & Whitefield Cluster</span>
              </div>
            </div>
          </div>

          {/* Contact & Partner */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Retailer Partnerships
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              Are you a local retailer or farmer in Bengaluru? Digitize your storefront in under 24 hours.
            </p>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>+91 80 4000 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span>partner@localmart.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 LocalMart Technologies India Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Neighborhood Commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

