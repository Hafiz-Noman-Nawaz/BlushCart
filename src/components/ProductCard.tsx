'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const saved = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.variants ? product.variants.options[0].value : undefined);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-[#F0E6E9] overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-[#EFA8BE]/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FFF7F9]">
        {/* Main Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-full bg-[#59263D] text-[#FFFCFA] text-[10px] font-bold tracking-wider uppercase shadow-2xs">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-[#EFA8BE] text-[#332A2E] text-[10px] font-bold tracking-wider uppercase shadow-2xs">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#D95F87] text-white text-[10px] font-bold tracking-wider uppercase shadow-2xs">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-150 z-10 shadow-2xs ${
            saved
              ? 'bg-[#59263D] text-[#FFFCFA] heart-pop'
              : 'bg-white/90 text-[#332A2E] hover:bg-white hover:text-[#D95F87]'
          }`}
        >
          <Heart size={16} fill={saved ? '#FFFCFA' : 'none'} strokeWidth={saved ? 2 : 1.8} />
        </button>

        {/* Quick View (Desktop floating overlay) */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-2 z-10">
          <button
            type="button"
            onClick={handleQuickView}
            className="flex-1 py-2 rounded-xl bg-white/95 backdrop-blur-xs text-[#332A2E] hover:text-[#D95F87] text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#59263D]/60 mb-1">
            <span className="uppercase tracking-wider font-semibold truncate max-w-[65%]">
              {product.categoryLabel.split('&')[0]}
            </span>
            <div className="flex items-center gap-1 text-[#332A2E]">
              <Star size={11} className="fill-[#D95F87] text-[#D95F87]" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-[10px] text-[#59263D]/50">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="font-medium text-xs sm:text-sm text-[#332A2E] hover:text-[#D95F87] transition-colors line-clamp-1 block mb-1"
          >
            {product.name}
          </Link>

          {/* Tagline */}
          <p className="text-[11px] text-[#59263D]/70 line-clamp-1 mb-2">
            {product.tagline}
          </p>
        </div>

        {/* Bottom: Price & Add-To-Cart Action */}
        <div className="pt-2 border-t border-[#F0E6E9]/60 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm sm:text-base text-[#332A2E]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-[#59263D]/50 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Tactile Add to Bag CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 touch-press shadow-2xs ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] active:scale-90'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {justAdded ? (
              <>
                <Check size={14} className="animate-bounce" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
