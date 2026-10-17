'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Package } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function OrigamiCartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartItemCount,
    freeShippingThreshold,
    remainingForFreeShipping,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'BLUSH10' || code === 'WELCOME10') {
      setPromoDiscount(10);
      setPromoSuccess('$10 welcome courtesy applied');
    } else if (code === 'ROSE15') {
      const discount = Math.round(cartTotal * 0.15);
      setPromoDiscount(discount);
      setPromoSuccess(`15% ($${discount}) courtesy applied`);
    } else {
      setPromoError('Please check code (e.g. BLUSH10 or ROSE15)');
    }
  };

  const finalTotal = Math.max(0, cartTotal - promoDiscount);
  const shippingPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#332A2E]/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Origami Paper-Unfolding Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        className="relative w-full sm:w-[460px] h-full bg-[#FFFCFA] shadow-2xl flex flex-col z-10 origami-cart-panel border-l border-[#F0E6E9] overflow-hidden"
      >
        {/* Paper crease sweep overlay */}
        <div className="absolute inset-0 crease-overlay" />

        {/* Origami Paper Fold Decorative Accent Header */}
        <div className="relative bg-gradient-to-r from-[#FFF7F9] via-[#F9DDE5]/30 to-[#FFF7F9] border-b border-[#F0E6E9] p-4 sm:p-5 z-10">
          {/* Geometric origami fold crease motif */}
          <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden opacity-25">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#EFA8BE] -rotate-45 transform origin-top-right border border-[#D95F87]/40 shadow-xs" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#59263D] flex items-center justify-center text-[#FFFCFA] shadow-2xs rotate-3">
                <Package size={16} />
              </div>
              <div>
                <h2 className="text-lg font-serif font-semibold text-[#332A2E] leading-tight">
                  Shopping Bag
                </h2>
                <p className="text-[11px] text-[#59263D]/70 font-medium">
                  {cartItemCount} {cartItemCount === 1 ? 'selection' : 'selections'} • Hand-Folded Packaging
                </p>
              </div>
            </div>

            {/* 44x44px accessible touch target */}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/60 active:scale-90 transition-all cursor-pointer touch-target -mr-1"
              aria-label="Close shopping bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping & Gift Progress Bar */}
          <div className="mt-3.5 bg-white/95 p-3 rounded-2xl border border-[#F0E6E9] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5 text-[#332A2E]">
              <span>
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-[#59263D]">Complimentary Express Shipping Unlocked</strong>
                ) : (
                  <span>
                    Add <strong className="text-[#D95F87]">${remainingForFreeShipping.toFixed(2)}</strong> for free shipping
                  </span>
                )}
              </span>
              <span className="text-[11px] font-semibold text-[#59263D]">{shippingPercent}%</span>
            </div>

            <div className="w-full h-1.5 bg-[#F0E6E9] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#EFA8BE] to-[#D95F87] transition-all duration-300 rounded-full"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#F0E6E9] relative z-10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFF2F6] flex items-center justify-center text-[#D95F87] border border-[#F0E6E9]">
                <Package size={28} strokeWidth={1.5} />
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="font-serif text-lg text-[#332A2E] font-medium">Your bag is empty</h3>
                <p className="text-xs text-[#59263D]/70 leading-relaxed">
                  Explore our curated rituals, cashmere knits, and hand-folded gifts.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#59263D] text-[#FFFCFA] text-xs font-semibold hover:bg-[#481e31] active:scale-95 transition-all shadow-xs"
              >
                <span>Browse The Collection</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant || 'default'}-${idx}`}
                  className="pt-4 first:pt-0 flex gap-3.5 group"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-24 rounded-2xl overflow-hidden bg-[#F0E6E9] flex-shrink-0 relative border border-[#F0E6E9]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </Link>

                  {/* Info & Quantity controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs sm:text-sm font-semibold text-[#332A2E] hover:text-[#D95F87] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        {/* Accessible 36x36px trash button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#59263D]/40 hover:text-red-500 hover:bg-red-50 active:scale-90 transition-all -mr-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-[#59263D]/70 capitalize mt-0.5">
                          Selection: <span className="font-medium text-[#332A2E]">{item.selectedVariant}</span>
                        </p>
                      )}

                      <p className="text-xs font-bold text-[#59263D] mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Touch-Friendly Quantity Selector (40px height, comfortably sized) */}
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-[#F0E6E9] rounded-xl bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant)
                          }
                          className="w-9 h-9 flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-90 transition-all cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-9 text-center text-xs font-semibold text-[#332A2E]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant)
                          }
                          className="w-9 h-9 flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-90 transition-all cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#332A2E]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Drawer Summary & Checkout CTAs with Safe Area Padding */}
        {cart.length > 0 && (
          <div className="border-t border-[#F0E6E9] p-4 sm:p-5 bg-[#FFF7F9]/95 space-y-3 relative z-10 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Offer code (e.g. BLUSH10)"
                  className="w-full text-xs px-3.5 h-10 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none focus:border-[#D95F87]"
                />
                <Tag size={13} className="absolute right-3 top-3.5 text-[#59263D]/40" />
              </div>
              <button
                type="submit"
                className="px-4 h-10 rounded-xl bg-white border border-[#EFA8BE] text-xs font-semibold text-[#59263D] hover:bg-[#F9DDE5]/40 active:scale-95 transition-all"
              >
                Apply
              </button>
            </form>

            {promoSuccess && <p className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</p>}
            {promoError && <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>}

            {/* Subtotal & Breakdown */}
            <div className="space-y-1.5 pt-1 text-xs text-[#59263D]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#332A2E]">${cartTotal.toFixed(2)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Courtesy Discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="font-medium text-[#332A2E]">
                  {remainingForFreeShipping === 0 ? 'Complimentary' : '$4.95'}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#F0E6E9] text-sm font-bold text-[#332A2E]">
                <span>Total</span>
                <span>
                  $
                  {(
                    finalTotal + (remainingForFreeShipping === 0 ? 0 : 4.95)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid gap-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#59263D] text-[#FFFCFA] text-xs font-semibold uppercase tracking-wider hover:bg-[#481e31] active:scale-[0.98] transition-all shadow-md group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center py-2 text-xs font-medium text-[#59263D] hover:underline transition-all"
              >
                View Full Bag & Gift Message Options
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
