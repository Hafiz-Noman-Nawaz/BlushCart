'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist, setIsCartOpen } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    savedProducts.forEach((product) => {
      addToCart(product, 1, product.variants ? product.variants.options[0].value : undefined);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0E6E9]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#332A2E]">
            Your Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#59263D]/70 mt-1">
            {savedProducts.length} {savedProducts.length === 1 ? 'ritual' : 'rituals'} saved for later
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            type="button"
            onClick={handleMoveAllToCart}
            className="px-6 py-3 rounded-full bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <ShoppingBag size={15} />
            <span>Move All to Shopping Bag</span>
          </button>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-5 bg-[#FFF7F9] rounded-3xl border border-[#F0E6E9] p-8 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center text-[#D95F87] shadow-sm">
            <Heart size={36} strokeWidth={1.5} />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-xl font-semibold text-[#332A2E]">
              Your wishlist is currently waiting
            </h2>
            <p className="text-xs text-[#59263D]/70 max-w-xs mx-auto leading-relaxed">
              Tap the heart icon on any product to save it here while you curate your personal sanctuary.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#59263D] text-[#FFFCFA] text-xs font-semibold hover:bg-[#481e31] active:scale-95 transition-all shadow-xs"
          >
            <span>Explore Bestsellers</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
