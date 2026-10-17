'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Package,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
  ChevronDown,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS, MOCK_REVIEWS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.options[0]?.value || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping' | 'reviews'>('details');
  const [copiedLink, setCopiedLink] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const saved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant || undefined);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setIsCartOpen(true);
    }, 400);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#59263D]/70 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#D95F87] transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-[#D95F87] transition-colors">
          Shop
        </Link>
        <ChevronRight size={12} />
        <Link href={`/shop/${product.category}`} className="hover:text-[#D95F87] transition-colors">
          {product.categoryLabel}
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-[#332A2E] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        
        {/* Left Column: Gallery & Thumbnails (Spans 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image Stage */}
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#FFF7F9] border border-[#F0E6E9] shadow-sm relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.isBestseller && (
                <span className="px-3 py-1 rounded-full bg-[#59263D] text-[#FFFCFA] text-xs font-bold uppercase tracking-wider shadow-xs">
                  Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 rounded-full bg-[#EFA8BE] text-[#332A2E] text-xs font-bold uppercase tracking-wider shadow-xs">
                  New Arrival
                </span>
              )}
            </div>

            {/* Floating Share & Wishlist quick action */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  saved
                    ? 'bg-[#59263D] text-white heart-pop'
                    : 'bg-white/95 text-[#332A2E] hover:text-[#D95F87]'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart size={18} fill={saved ? '#ffffff' : 'none'} />
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/95 text-[#332A2E] hover:text-[#D95F87] flex items-center justify-center shadow-md active:scale-95 transition-all"
                aria-label="Share link"
              >
                {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
              </button>
            </div>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === idx
                      ? 'border-[#D95F87] scale-105 shadow-xs'
                      : 'border-[#F0E6E9] opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchasing Actions & Details (Spans 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#59263D]/70">
              <span className="uppercase tracking-wider font-bold text-[#D95F87]">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5 text-[#332A2E]">
                <div className="flex text-[#D95F87]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-[#D95F87]" />
                  ))}
                </div>
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#59263D]/50">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#332A2E] leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#59263D]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#59263D]/50 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFF2F6] text-[#D95F87] font-semibold border border-[#EFA8BE]">
                Origami Packaged
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#59263D]/80 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Variants Selector */}
          {product.variants && (
            <div className="space-y-2.5 pt-2 border-t border-[#F0E6E9]">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#332A2E]">
                  {product.variants.name}:
                </span>
                <span className="text-[#59263D]/70 capitalize font-medium">
                  {product.variants.options.find((o) => o.value === selectedVariant)?.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.variants.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedVariant(option.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                      selectedVariant === option.value
                        ? 'border-[#59263D] bg-[#59263D] text-[#FFFCFA] shadow-xs'
                        : 'border-[#F0E6E9] bg-white text-[#332A2E] hover:border-[#EFA8BE]'
                    }`}
                  >
                    {option.colorHex && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: option.colorHex }}
                      />
                    )}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Bag */}
          <div className="space-y-3 pt-3 border-t border-[#F0E6E9]">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#F0E6E9] rounded-2xl bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-90 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#332A2E]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-90 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to Bag Primary Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added To Origami Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-[#FFF7F9] rounded-2xl p-4 border border-[#F0E6E9] grid grid-cols-2 gap-3 text-xs text-[#59263D]/80">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-[#D95F87] flex-shrink-0" />
                <span>Complimentary Origami Box</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-[#D95F87] flex-shrink-0" />
                <span>30-Day Effortless Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#D95F87] flex-shrink-0" />
                <span>100% Authentic Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#D95F87] flex-shrink-0" />
                <span>Cruelty-Free Standard</span>
              </div>
            </div>
          </div>

          {/* Accordion Specification Tabs */}
          <div className="pt-2 border-t border-[#F0E6E9] space-y-2">
            {[
              {
                id: 'details',
                title: 'Key Details & Features',
                content: (
                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-[#59263D]/80">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                ),
              },
              {
                id: 'materials',
                title: 'Materials, Origin & Dimensions',
                content: (
                  <div className="space-y-2 text-xs text-[#59263D]/80">
                    {product.details.origin && (
                      <p><strong>Origin:</strong> {product.details.origin}</p>
                    )}
                    {product.details.materials && (
                      <p><strong>Materials:</strong> {product.details.materials}</p>
                    )}
                    {product.details.dimensions && (
                      <p><strong>Dimensions / Volume:</strong> {product.details.dimensions}</p>
                    )}
                  </div>
                ),
              },
              {
                id: 'shipping',
                title: 'Shipping, Free Returns & Origami Wrap',
                content: (
                  <p className="text-xs text-[#59263D]/80 leading-relaxed">
                    Complimentary express carbon-neutral delivery on all orders over $60. Each item is hand-folded inside our signature blush origami gift packaging with embossed wax seal and calligraphy gift card upon request.
                  </p>
                ),
              },
            ].map((tab) => (
              <div key={tab.id} className="border border-[#F0E6E9] rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === tab.id ? ('' as any) : (tab.id as any))}
                  className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-[#332A2E] hover:bg-[#FFF7F9] transition-colors"
                >
                  <span>{tab.title}</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 text-[#59263D]/60 ${
                      activeTab === tab.id ? 'rotate-180 text-[#D95F87]' : ''
                    }`}
                  />
                </button>
                {activeTab === tab.id && (
                  <div className="p-3.5 pt-0 border-t border-[#F0E6E9]/50 animate-in fade-in duration-150">
                    {tab.content}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-10 border-t border-[#F0E6E9] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#332A2E]">
              Client Reviews & Impressions
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#59263D]/70">
              <div className="flex text-[#D95F87]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#D95F87]" />
                ))}
              </div>
              <span className="font-bold text-[#332A2E]">{product.rating} out of 5</span>
              <span>• Based on {product.reviewsCount} customer experiences</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Review submitted! Thank you for sharing your thoughts.')}
            className="px-5 py-2.5 rounded-full bg-white border border-[#EFA8BE] text-[#59263D] hover:bg-[#FFF7F9] text-xs font-semibold active:scale-95 transition-all shadow-2xs self-start"
          >
            Write a Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl bg-white border border-[#F0E6E9] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex text-[#D95F87]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#D95F87]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#59263D]/60">{rev.date}</span>
              </div>
              <p className="text-xs font-bold text-[#332A2E]">&ldquo;{rev.title}&rdquo;</p>
              <p className="text-xs text-[#59263D]/80 leading-relaxed">{rev.comment}</p>
              <p className="text-[10px] text-emerald-700 font-semibold pt-1">
                ✓ Verified Purchaser • {rev.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-[#F0E6E9] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-[#332A2E]">
              Complete Your Ritual
            </h2>
            <Link
              href={`/shop/${product.category}`}
              className="text-xs font-semibold text-[#D95F87] hover:underline"
            >
              See all {product.categoryLabel}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Add-to-Cart Bar (Only on phones) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#F0E6E9] p-3 px-4 z-30 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs font-bold text-[#332A2E] truncate max-w-[140px]">{product.name}</p>
          <p className="text-xs font-extrabold text-[#59263D]">${(product.price * quantity).toFixed(2)}</p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl bg-[#59263D] text-[#FFFCFA] text-xs font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <ShoppingBag size={14} />
          <span>Add to Bag</span>
        </button>
      </div>

    </div>
  );
}
