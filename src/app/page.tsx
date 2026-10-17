'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Package, ShieldCheck, Heart, ShoppingBag } from 'lucide-react';
import { PRODUCTS, CATEGORIES, MOCK_REVIEWS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';

export default function HomePage() {
  const { setIsCartOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'beauty' | 'fashion' | 'home'>('all');

  const filteredBestsellers = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return p.isBestseller;
    return p.isBestseller && p.category === activeTab;
  }).slice(0, 8);

  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-12 overflow-hidden">
      
      {/* 1. HERO SECTION: Mobile-First Asymmetric Editorial */}
      <section className="relative pt-4 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#FFF7F9] via-[#F9DDE5]/30 to-[#FFFCFA] border border-[#F0E6E9] p-6 sm:p-10 lg:p-14 overflow-hidden relative shadow-xs">
          
          {/* Subtle Origami Crease Decorative Corner */}
          <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-20">
            <div className="w-48 h-48 bg-[#EFA8BE] -rotate-45 transform origin-top-right border border-[#D95F87]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy: Expressive Typography & Immediate Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFA8BE] text-[#59263D] text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#D95F87] animate-pulse" />
                <span>The Autumn Bloom Collection • 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#332A2E] leading-[1.12]">
                Tactile rituals in <br />
                <span className="italic font-normal text-[#D95F87] relative">
                  blush & warm white.
                  <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#F9DDE5] rounded-full -z-10" />
                </span>
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-sm sm:text-base text-[#59263D]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Curated everyday treasures—from cellular peptide serums and cloud-soft cashmere to hand-thrown ceramics—delivered in our signature hand-folded origami gift packaging.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-sm font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore The Catalog</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop/gifts"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#FFF7F9] text-[#332A2E] border border-[#EFA8BE] text-sm font-semibold active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Package size={16} className="text-[#D95F87]" />
                  <span>Origami Gift Sets</span>
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#59263D]/70 border-t border-[#F0E6E9]/80">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="fill-[#D95F87] text-[#D95F87]" />
                  <span><strong>4.9 / 5.0</strong> from 1,200+ clients</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#D95F87]" />
                  <span>Carbon-neutral delivery</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Curated Product Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Main Hero Image */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
                    alt="BlushCart Petal Ritual"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#59263D]/40 via-transparent to-transparent" />
                  
                  {/* Floating Micro Product Card */}
                  <div className="absolute bottom-4 inset-x-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#F0E6E9] shadow-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#F0E6E9] flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80"
                          alt="Petal Dew Serum"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#332A2E]">Petal Dew Serum</p>
                        <p className="text-[11px] text-[#59263D]/70">$48.00 • Restocked</p>
                      </div>
                    </div>
                    <Link
                      href="/product/petal-dew-peptide-serum"
                      className="p-2 rounded-xl bg-[#59263D] text-white hover:bg-[#481e31] active:scale-95 transition-all text-xs"
                      aria-label="View product"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Floating Origami Paper Accent Badge */}
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-white p-3 rounded-2xl shadow-xl border border-[#EFA8BE] flex items-center gap-2.5 animate-bounce duration-1000">
                  <div className="w-7 h-7 rounded-lg bg-[#F9DDE5] flex items-center justify-center text-[#D95F87] rotate-6">
                    <Sparkles size={15} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#D95F87]">Origami Unbox</p>
                    <p className="text-xs font-semibold text-[#332A2E]">Folded with Care</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ART-DIRECTED CATEGORY TILES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#D95F87] mb-1">
              Curated Universes
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
              Shop By Mood & Ritual
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#59263D] hover:text-[#D95F87] transition-colors group"
          >
            <span>View all 5 collections</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#F0E6E9] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#FFF7F9] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#332A2E]/70 via-[#332A2E]/10 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <p className="text-[11px] font-medium text-[#F9DDE5] tracking-wide uppercase">
                    {category.itemCount} Items
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-semibold leading-tight drop-shadow-xs">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS & CLIENT FAVORITES WITH FAST TABS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#D95F87] mb-1">
              Client Favorites
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
              Most Cherished Items
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Bestsellers' },
              { id: 'beauty', label: 'Beauty' },
              { id: 'fashion', label: 'Fashion & Knits' },
              { id: 'home', label: 'Home Living' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'bg-[#59263D] text-[#FFFCFA] shadow-xs'
                    : 'bg-white text-[#332A2E] border border-[#F0E6E9] hover:border-[#EFA8BE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Mobile, 4-Column Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredBestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. THE SIGNATURE ORIGAMI EXPERIENCE EDITORIAL BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#59263D] text-[#FFFCFA] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Layered Paper Origami Silhouette Background Pattern */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-[#EFA8BE]/10 pointer-events-none blur-2xl" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D95F87]/15 rounded-full pointer-events-none blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFA8BE]/20 text-[#F9DDE5] text-xs font-medium border border-[#EFA8BE]/30">
                <Package size={14} className="text-[#EFA8BE]" />
                <span>The BlushCart Signature</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
                An unboxing inspired by the Japanese art of origami.
              </h2>

              <p className="text-xs sm:text-sm text-[#F9DDE5]/90 leading-relaxed max-w-lg">
                We believe anticipation is half the delight. Every order over $60 is nestled inside a bespoke geometric paper carton hand-folded petal by petal, wrapped in blush cotton cord and personalized with your custom calligraphy note.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/shop/gifts"
                  className="px-6 py-3 rounded-full bg-[#EFA8BE] hover:bg-[#e792ab] text-[#332A2E] text-xs font-bold tracking-wide uppercase shadow-md active:scale-95 transition-all"
                >
                  Shop Origami Sets
                </Link>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFCFA] border border-white/30 text-xs font-bold tracking-wide uppercase active:scale-95 transition-all flex items-center gap-2"
                >
                  <ShoppingBag size={14} />
                  <span>Preview In Bag</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-[#332A2E] rotate-2 hover:rotate-0 transition-transform duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80"
                  alt="Origami Gift Box Experience"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CURATED SPOTLIGHT: "THE BLUSH PHILOSOPHY" */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="space-y-5 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D95F87]">
              Crafted With Intention
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#332A2E] leading-tight">
              Quiet luxury designed for everyday touch.
            </h2>
            <p className="text-xs sm:text-sm text-[#59263D]/80 leading-relaxed">
              We reject fleeting micro-trends and plastic surplus. Each BlushCart formula is tested for sensitive skin barriers, each cashmere yarn is ethically sourced from free-roaming herds in Mongolia, and every piece of stoneware is wheel-turned by master Portuguese artisans.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FFF7F9] border border-[#F0E6E9]">
                <p className="text-lg font-bold text-[#59263D]">100%</p>
                <p className="text-xs text-[#59263D]/70 mt-0.5">Cruelty-free & clean botanical ingredients</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFF7F9] border border-[#F0E6E9]">
                <p className="text-lg font-bold text-[#59263D]">0% Plastic</p>
                <p className="text-xs text-[#59263D]/70 mt-0.5">Compostable paper & recyclable frosted glass</p>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D95F87] hover:underline pt-2"
            >
              <span>Read our complete sourcing standards</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                alt="Ceramics Artisan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md mt-6 sm:mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
                alt="Cashmere Knit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CLIENT LOVE / REVIEWS CAROUSEL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D95F87] mb-1">
            Community Love
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
            What Our Patrons Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-white border border-[#F0E6E9] shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#D95F87]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D95F87]" />
                  ))}
                </div>
                <h3 className="font-serif text-base font-semibold text-[#332A2E] leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-xs text-[#59263D]/80 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#F0E6E9]">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F0E6E9] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#332A2E]">{review.author}</p>
                  <p className="text-[10px] text-emerald-700 font-medium">Verified Patron • {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRIVATE CLIENT CONCIERGE & RITUAL CONSULTATION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#FFF7F9] via-[#F9DDE5]/30 to-[#FFF7F9] border border-[#EFA8BE] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-[#D95F87] uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D95F87]" />
              <span>Private Client Concierge</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#332A2E]">
              Seeking bespoke gift curation or personal ritual advice?
            </h3>
            <p className="text-xs sm:text-sm text-[#59263D]/80 max-w-xl leading-relaxed">
              Our studio concierge is delighted to assist with personal shade matching, bridal gift boxes, and bespoke origami calligraphy.
            </p>
          </div>

          <Link
            href="/ai-shopping-assistant"
            className="px-7 py-3.5 rounded-full bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Begin Consultation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
