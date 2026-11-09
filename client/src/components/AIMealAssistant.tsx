import React, { useState, useEffect } from 'react';
import { Sparkles, ChefHat, Clock, Users, ArrowRight, Check, Plus, Search, Wand2 } from 'lucide-react';
import { MealKit, Product } from '../types';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

export const AIMealAssistant: React.FC = () => {
  const { addToCart, addToast } = useApp();
  const [mealKits, setMealKits] = useState<MealKit[]>([]);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<Product[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    api.getMealKits()
      .then(res => setMealKits(res))
      .catch(err => console.error(err));
  }, []);

  const handleAddKit = (kit: MealKit) => {
    if (kit.products && kit.products.length > 0) {
      kit.products.forEach(p => addToCart(p, 1));
      addToast(`Meal Kit Added!`, `${kit.title} (${kit.products.length} items added)`, 'success');
    }
  };

  const handleAiAsk = async (promptText: string) => {
    if (!promptText.trim()) return;
    setIsSearching(true);
    try {
      const res = await api.getAiRecommendations(promptText);
      setAiSuggestions(res.data);
      setAiInsight(`AI Chef: Selected the best matching ingredients available right now in Indiranagar!`);
    } catch {
      addToast('AI Chef busy', 'Please try again in a moment', 'info');
    } finally {
      setIsSearching(false);
    }
  };

  const quickPrompts = [
    "High Protein Breakfast",
    "Italian Sourdough Brunch",
    "Authentic Filter Kaapi Moment",
    "Keto & Healthy Fats"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl bg-gradient-to-br from-teal-900/90 via-slate-900 to-emerald-950 text-white p-6 sm:p-9 shadow-2xl relative overflow-hidden border border-teal-500/20">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Title & Badge */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI CHEF & SMART GROCERY MEAL KITS</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">
              What do you want to cook today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Get all exact ingredients from your nearest neighborhood stores delivered together in 15 minutes.
            </p>
          </div>

          {/* Interactive AI Prompt Input */}
          <div className="w-full md:w-96 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-emerald-300 ml-2" />
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiAsk(customPrompt)}
                placeholder="Ask AI: e.g. Paneer salad, detox tea..."
                className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none flex-1 py-1"
              />
              <button
                onClick={() => handleAiAsk(customPrompt)}
                disabled={isSearching}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
              >
                {isSearching ? 'Thinking...' : 'Curate'}
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-white/10">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCustomPrompt(qp);
                    handleAiAsk(qp);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 hover:bg-emerald-500/30 text-slate-200 transition-colors"
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Custom Search Results if any */}
        {aiSuggestions.length > 0 && (
          <div className="mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/30">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" /> {aiInsight}
              </p>
              <button
                onClick={() => {
                  aiSuggestions.forEach(p => addToCart(p, 1));
                  addToast('Bundle Added!', `Added ${aiSuggestions.length} curated items to basket`, 'success');
                }}
                className="px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add All Ingredients to Basket</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {aiSuggestions.map(prod => (
                <div key={prod.id} className="bg-slate-900/60 p-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                  <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-bold truncate">{prod.name}</p>
                    <p className="text-xs text-emerald-400 font-extrabold">₹{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curated Pre-made Meal Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealKits.map((kit) => (
            <div
              key={kit.id}
              className="rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10 overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
            >
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                    {kit.badge}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> {kit.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-400" /> Serves {kit.servings}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{kit.title}</h3>
                <p className="text-xs text-slate-300 mb-4">{kit.subtitle}</p>

                {/* Ingredients Thumbnail Checklist */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Ingredients Included ({kit.products?.length || 0} items)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {kit.products?.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 text-xs font-medium text-slate-200 border border-white/10"
                      >
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="truncate max-w-[140px]">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipe preview bullets */}
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Quick Cooking Guide:
                  </p>
                  {kit.recipeSteps.slice(0, 2).map((step, idx) => (
                    <p key={idx} className="text-xs text-slate-300 leading-snug">
                      • {step}
                    </p>
                  ))}
                </div>
              </div>

              {/* Price & 1-Click Action Bar */}
              <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-white">₹{kit.discountedPrice}</span>
                    <span className="text-xs text-slate-400 line-through">₹{kit.originalPrice}</span>
                  </div>
                  <p className="text-[10px] text-emerald-300 font-semibold">
                    Bundle saves ₹{kit.originalPrice - kit.discountedPrice}!
                  </p>
                </div>

                <button
                  onClick={() => handleAddKit(kit)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Meal Kit to Basket</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

