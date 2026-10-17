'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Package,
  Gift,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartItemCount,
    freeShippingThreshold,
    remainingForFreeShipping,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [giftWrapEnabled, setGiftWrapEnabled] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [ribbonColor, setRibbonColor] = useState('rose');

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'BLUSH10' || code === 'WELCOME10') {
      setPromoDiscount(10);
      setPromoMessage('$10 welcome discount successfully applied!');
    } else if (code === 'ROSE15') {
      const discount = Math.round(cartTotal * 0.15);
      setPromoDiscount(discount);
      setPromoMessage(`15% ($${discount}) discount applied!`);
    } else {
      setPromoMessage('Invalid promo code. Try "BLUSH10" or "ROSE15"');
    }
  };

  const finalTotal = Math.max(0, cartTotal - promoDiscount);
  const shippingPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#FFF2F6] mx-auto flex items-center justify-center text-[#D95F87] border border-[#F0E6E9]">
          <ShoppingBag size={42} strokeWidth={1.5} />
        </div>
        <div className="space-y-2 max-w-sm mx-auto">
          <h1 className="font-serif text-3xl font-semibold text-[#332A2E]">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#59263D]/70 leading-relaxed">
            Fill your bag with botanical skincare, cashmere knits, or handmade ceramics to unlock complimentary origami gifting.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-all"
        >
          <span>Discover The Catalog</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#332A2E]">
          Your Shopping Bag
        </h1>
        <p className="text-xs sm:text-sm text-[#59263D]/70 mt-1">
          {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} • Eligible for complimentary hand-folded origami packaging
        </p>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-gradient-to-r from-[#FFF7F9] via-[#F9DDE5]/30 to-[#FFF7F9] p-4 sm:p-5 rounded-3xl border border-[#F0E6E9]">
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-2 text-[#332A2E]">
          <span className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#D95F87]" />
            {remainingForFreeShipping === 0 ? (
              <strong className="text-[#59263D]">
                You have unlocked FREE Worldwide Shipping & Origami Gift Box!
              </strong>
            ) : (
              <span>
                Add <strong className="text-[#D95F87]">${remainingForFreeShipping.toFixed(2)}</strong> more to receive free express shipping.
              </span>
            )}
          </span>
          <span className="font-bold text-[#59263D]">{shippingPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#F0E6E9]">
          <div
            className="h-full bg-gradient-to-r from-[#EFA8BE] to-[#D95F87] rounded-full transition-all duration-300"
            style={{ width: `${shippingPercent}%` }}
          />
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List & Gift Customization (Spans 8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-[#F0E6E9] shadow-xs divide-y divide-[#F0E6E9] p-4 sm:p-6">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedVariant || 'def'}-${idx}`}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="w-20 h-24 rounded-2xl overflow-hidden bg-[#F0E6E9] flex-shrink-0 border border-[#F0E6E9]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95F87]">
                      {item.product.categoryLabel.split('&')[0]}
                    </span>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="block text-sm sm:text-base font-semibold text-[#332A2E] hover:text-[#D95F87] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedVariant && (
                      <p className="text-xs text-[#59263D]/70 capitalize mt-0.5">
                        Selected: <span className="font-semibold text-[#332A2E]">{item.selectedVariant}</span>
                      </p>
                    )}
                    <p className="text-xs font-bold text-[#59263D] mt-1 sm:hidden">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0E6E9]/60">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#F0E6E9] rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant)
                      }
                      className="w-8 h-8 flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-90"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#332A2E]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant)
                      }
                      className="w-8 h-8 flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-90"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm sm:text-base font-bold text-[#332A2E]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-[11px] text-[#59263D]/50 hidden sm:block">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                    className="text-[#59263D]/40 hover:text-red-500 p-1.5 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Complimentary Origami Gift Wrapping Options */}
          <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87]">
                  <Gift size={20} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[#332A2E]">
                    Hand-Folded Origami Gift Packaging
                  </h3>
                  <p className="text-xs text-[#59263D]/70">
                    Complimentary for this order. Includes wax seal and cotton ribbon.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={giftWrapEnabled}
                onChange={(e) => setGiftWrapEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#D95F87] rounded cursor-pointer mt-1"
              />
            </div>

            {giftWrapEnabled && (
              <div className="space-y-4 pt-3 border-t border-[#F0E6E9] animate-in fade-in">
                <div>
                  <label className="block text-xs font-semibold text-[#332A2E] mb-1.5">
                    Select Silk Ribbon Tone:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'rose', label: 'Soft Rose (#EFA8BE)', hex: '#EFA8BE' },
                      { id: 'berry', label: 'Deep Berry (#59263D)', hex: '#59263D' },
                      { id: 'cream', label: 'Warm Cream (#FFFCFA)', hex: '#F0E6E9' },
                    ].map((rib) => (
                      <button
                        key={rib.id}
                        type="button"
                        onClick={() => setRibbonColor(rib.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                          ribbonColor === rib.id
                            ? 'border-[#59263D] bg-[#FFF7F9] text-[#59263D] font-bold shadow-2xs'
                            : 'border-[#F0E6E9] bg-white text-[#332A2E]'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: rib.hex }} />
                        <span>{rib.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#332A2E] mb-1.5">
                    Personalized Handwritten Calligraphy Note (Complimentary):
                  </label>
                  <textarea
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your custom message (e.g., 'Happy Birthday Elena, wishing you gentle radiance...')"
                    className="w-full text-xs p-3 rounded-2xl border border-[#F0E6E9] bg-[#FFF7F9] text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none focus:border-[#D95F87]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary Sidebar (Spans 4) */}
        <div className="lg:col-span-4 bg-[#FFF7F9] rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-5 sticky top-24">
          <h2 className="font-serif text-xl font-semibold text-[#332A2E]">
            Order Summary
          </h2>

          {/* Promo code */}
          <form onSubmit={applyPromo} className="space-y-1.5">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code (BLUSH10)"
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none focus:border-[#D95F87]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-white border border-[#EFA8BE] text-xs font-semibold text-[#59263D] hover:bg-[#F9DDE5]/40 active:scale-95 transition-all"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className="text-[11px] text-[#59263D] font-medium pt-1">{promoMessage}</p>
            )}
          </form>

          {/* Breakdown */}
          <div className="space-y-2.5 text-xs text-[#59263D]/80 pt-2 border-t border-[#F0E6E9]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#332A2E]">${cartTotal.toFixed(2)}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Special Origami Discount</span>
                <span>-${promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium text-[#332A2E]">
                {remainingForFreeShipping === 0 ? 'FREE' : '$4.95'}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Origami Gift Packaging</span>
              <span className="font-semibold text-emerald-700">COMPLIMENTARY</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-[#F0E6E9] text-base font-bold text-[#332A2E]">
              <span>Estimated Total</span>
              <span className="text-xl text-[#59263D]">
                ${(finalTotal + (remainingForFreeShipping === 0 ? 0 : 4.95)).toFixed(2)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 rounded-2xl bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#59263D]/70 pt-2">
            <ShieldCheck size={14} className="text-[#D95F87]" />
            <span>Encrypted 256-bit checkout • Free returns</span>
          </div>
        </div>

      </div>
    </div>
  );
}
