import React from 'react';
import { Star, ShieldCheck, Quote, Store, ThumbsUp, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Sneha Mukherjee",
      area: "Defence Colony, Indiranagar",
      role: "Verified LocalMart Shopper",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      quote: "The 36-hr artisan sourdough loaf and fresh hydroponic spinach reached my door in exactly 14 minutes. Knowing my money directly supports our neighborhood bakeries instead of dark stores is priceless!"
    },
    {
      id: 2,
      name: "Vikram Sengupta",
      area: "Koramangala 4th Block",
      role: "Cook & Foodie",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      quote: "The AI Chef Dinner Kits are pure genius. I clicked 'Paneer Butter Masala Kit' and every single ingredient plus pure A2 Ghee was in my basket with a ₹86 bundle discount. Flawless experience."
    },
    {
      id: 3,
      name: "Ananya Deshmukh",
      area: "Domlur, Old Airport Rd",
      role: "Working Mother & Subscriber",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      quote: "LocalCoins cashback actually saves me ₹40–50 on every weekly restock. The live order tracking with Ramesh our local runner gave complete peace of mind."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>NEIGHBORHOOD TRUST & REVIEWS</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
          Loved by Bangalore Residents & Local Shopkeepers
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Real stories from everyday shoppers and family-run merchants thriving together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map(item => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-4">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-emerald-500"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="text-[10px] text-slate-400">{item.area}</p>
              </div>
              <span title="Verified Customer" className="ml-auto shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Retailer Spotlight Banner */}
      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-500/20 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
            <Store className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Merchant Spotlight • Green Grocers Indiranagar
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              "LocalMart gave our 22-year family grocery store digital reach to 12,000 households without predatory commission fees."
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">– Rajesh Kumar, Founder & Partner Merchant</p>
          </div>
        </div>

        <span className="shrink-0 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 shadow">
          100% Fair Local Commerce
        </span>
      </div>
    </section>
  );
};
