'use client';

import React from 'react';
import { CheckCircle2, Info, ShoppingBag, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ToastContainer() {
  const { toasts, removeToast, setIsCartOpen } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#FFFCFA] border border-[#F0E6E9] rounded-2xl shadow-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 toast-anim backdrop-blur-md"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {toast.productImage ? (
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#F0E6E9] flex-shrink-0 border border-[#F0E6E9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={toast.productImage} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#FFF2F6] flex items-center justify-center text-[#D95F87] flex-shrink-0">
                {toast.type === 'cart' ? (
                  <ShoppingBag size={18} />
                ) : toast.type === 'info' ? (
                  <Info size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )}
              </div>
            )}

            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-[#332A2E] leading-tight truncate">
                {toast.productName || 'Success'}
              </p>
              <p className="text-[11px] text-[#59263D]/70 truncate">{toast.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {toast.type === 'cart' && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-[#59263D] text-[#FFFCFA] text-[10px] font-semibold hover:bg-[#481e31] active:scale-95 transition-all shadow-2xs"
              >
                View
              </button>
            )}

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-[#59263D]/40 hover:text-[#332A2E] p-1 transition-colors"
              aria-label="Dismiss toast"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
