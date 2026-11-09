import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, loginDemo, addToast } = useApp();
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      loginDemo('customer');
      setIsAuthOpen(false);
      addToast('Welcome back!', `Signed in as ${email || 'Customer'}`, 'success');
    } else if (tab === 'register') {
      loginDemo('customer');
      setIsAuthOpen(false);
      addToast('Account Created!', `Welcome to LocalMart, ${name || 'Neighbor'}! +100 bonus coins added!`, 'success');
    } else if (tab === 'forgot') {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setTab('login');
        setIsAuthOpen(false);
        addToast('Password Reset Sent', 'Check your inbox for the reset link', 'info');
      }, 2000);
    }
  };

  const handleGoogleSignIn = () => {
    loginDemo('customer');
    setIsAuthOpen(false);
    addToast('Google Sign-In Successful', 'Authenticated securely via Google Identity', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col p-6 sm:p-8 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 mx-auto flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 mb-3">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
            {tab === 'login' ? 'Welcome to LocalMart' : tab === 'register' ? 'Join LocalMart Community' : 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {tab === 'login' ? 'Access 15-min delivery & earn LocalCoins' : tab === 'register' ? 'Get flat ₹50 off + 100 bonus coins' : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* Google One-Click Auth */}
        {tab !== 'forgot' && (
          <div className="space-y-3 mb-5">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2.5 shadow-sm transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">or email</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {tab === 'register' && (
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
          </div>

          {tab === 'register' && (
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
          )}

          {tab !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[10px] font-bold text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}

          {forgotSent && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Password recovery link dispatched to {email}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all mt-2"
          >
            <span>{tab === 'login' ? 'Sign In to LocalMart' : tab === 'register' ? 'Create Account & Claim Coins' : 'Send Reset Link'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch tab footer */}
        <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          {tab === 'login' ? (
            <p>
              New to LocalMart?{' '}
              <button
                type="button"
                onClick={() => setTab('register')}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('login')}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

