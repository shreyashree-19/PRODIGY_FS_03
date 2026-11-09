import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-500 shrink-0" />
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-premium border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-start justify-between gap-3 transform transition-all duration-300 animate-slide-up"
          >
            <div className="flex items-start gap-2.5">
              {icons[toast.type || 'info']}
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {toast.message}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

