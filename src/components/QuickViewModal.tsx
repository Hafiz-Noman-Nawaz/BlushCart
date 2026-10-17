'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Star, Heart, ShoppingBag, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(0);
      setQuantity(1);
      if (quickViewProduct.variants && quickViewProduct.variants.options.length > 0) {
        setSelectedVariant(quickViewProduct.variants.options[0].value);
      } else {
        setSelectedVariant('');
      }
    }
  }, [quickViewProduct]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const saved = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, selectedVariant || undefined);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setQuickViewProduct(null);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#332A2E]/40 backdrop-blur-xs transition-opacity duration-150"
        onClick={() => setQuickViewProduct(null)}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view ${quickViewProduct.name}`}
        className="relative w-full max-w-3xl bg-[#FFFCFA] rounded-3xl shadow-2xl border border-[#F0E6E9] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#332A2E] hover:bg-white active:scale-90 transition-all z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left: Gallery preview */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#FFF7F9] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#F0E6E9]">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#F0E6E9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={quickViewProduct.images[selectedImage] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === i ? 'border-[#D95F87] scale-105' : 'border-[#F0E6E9] opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product details & actions */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-[#59263D]/60 mb-2">
              <span className="uppercase tracking-wider font-semibold">
                {quickViewProduct.categoryLabel}
              </span>
              <div className="flex items-center gap-1 text-[#332A2E]">
                <Star size={13} className="fill-[#D95F87] text-[#D95F87]" />
                <span className="font-semibold">{quickViewProduct.rating}</span>
                <span>({quickViewProduct.reviewsCount})</span>
              </div>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#332A2E] leading-tight mb-2">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-[#59263D]">
                ${quickViewProduct.price.toFixed(2)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#59263D]/50 line-through">
                  ${quickViewProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#59263D]/80 leading-relaxed line-clamp-3 mb-4">
              {quickViewProduct.description}
            </p>

            {/* Variants */}
            {quickViewProduct.variants && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#332A2E] mb-2">
                  Select {quickViewProduct.variants.name}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedVariant(opt.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedVariant === opt.value
                          ? 'border-[#59263D] bg-[#59263D] text-[#FFFCFA] shadow-xs'
                          : 'border-[#F0E6E9] bg-white text-[#332A2E] hover:border-[#EFA8BE]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#F0E6E9] space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  saved
                    ? 'bg-[#59263D] text-white border-[#59263D]'
                    : 'bg-white border-[#F0E6E9] text-[#332A2E] hover:text-[#D95F87]'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} fill={saved ? '#ffffff' : 'none'} />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-[#59263D] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Full product specifications & reviews</span>
                <ArrowRight size={13} />
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-[#59263D]/70">
                <ShieldCheck size={12} className="text-[#D95F87]" />
                <span>In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
