import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Store,
  Sparkles,
  ArrowLeft,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const AdminLogin: React.FC<{ onLoginSuccess?: () => void }> = ({ onLoginSuccess }) => {
  const { user, loginAdmin, setIsAdminView, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);

    const success = await loginAdmin(email, password);
    setLoading(false);
    if (!success) {
      setErrorMsg('Invalid administrator credentials. Try admin@localmart.in / admin123 or rajesh.store@localmart.in / store123');
    } else {
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const handleFillCredentials = (role: 'admin' | 'store') => {
    if (role === 'admin') {
      setEmail('admin@localmart.in');
      setPassword('admin123');
      setErrorMsg(null);
    } else {
      setEmail('rajesh.store@localmart.in');
      setPassword('store123');
      setErrorMsg(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Return to Storefront button */}
      <button
        onClick={() => setIsAdminView(false)}
        className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold backdrop-blur-md transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Customer Storefront</span>
      </button>

      {/* Login Card Container */}
      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-9">
          {/* Logo & Portal Branding */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-emerald-500 mx-auto flex items-center justify-center text-white shadow-xl shadow-purple-600/30 mb-3.5">
              <SlidersHorizontal className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                LocalMart Command
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Console
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Authorized Administrator & Store Partner Portal
            </p>
          </div>

          {/* Quick Credential Pre-fill Chips */}
          <div className="mb-6 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              1-Click Demo Credentials:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillCredentials('admin')}
                className="px-2.5 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-700/40 text-purple-300 font-bold text-[11px] text-left transition-colors flex items-center justify-between"
              >
                <span>Platform Admin</span>
                <span className="text-[9px] bg-purple-800/60 px-1 py-0.2 rounded text-white">Fill</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillCredentials('store')}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/40 text-emerald-300 font-bold text-[11px] text-left transition-colors flex items-center justify-between"
              >
                <span>Store Partner</span>
                <span className="text-[9px] bg-emerald-800/60 px-1 py-0.2 rounded text-white">Fill</span>
              </button>
            </div>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1.5">
                Admin / Store Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@localmart.in"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1.5">
                Access Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[10px] font-bold text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-purple-400 font-semibold cursor-default">
                2FA Protected
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Authenticating console...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Features Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              256-Bit TLS
            </span>
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              Role-Based RBAC
            </span>
            <span className="flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-blue-400" />
              Indiranagar Hub
            </span>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-400 mt-4">
          LocalMart Operating System v2.4 • Bengaluru Hyperlocal Network
        </p>
      </div>
    </div>
  );
};

