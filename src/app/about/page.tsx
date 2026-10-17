'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Box, ShieldCheck, Flower2, Scissors } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-5">
        <span className="px-3 py-1 rounded-full bg-[#FFF2F6] text-[#D95F87] text-xs font-bold uppercase tracking-wider border border-[#EFA8BE]">
          Our Manifesto
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#332A2E] leading-tight">
          Where mindful rituals meet the art of <span className="italic text-[#D95F87]">unfolding</span>.
        </h1>
        <p className="text-sm sm:text-base text-[#59263D]/80 leading-relaxed max-w-xl mx-auto">
          BlushCart was conceived as an antidote to fast, disposable commerce. We create and curate objects that invite pause—grounded in warm white and subtle blush.
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#F0E6E9] relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
            alt="BlushCart Studio Notes"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D95F87]">
            The Genesis
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
            Born Between Tokyo & Paris
          </h2>
          <p className="text-xs sm:text-sm text-[#59263D]/80 leading-relaxed">
            In 2024, our founders traveled between traditional paper craft ateliers in Kyoto and independent skincare laboratories in Grasse. They observed a shared secret: true luxury is never rushed, noisy, or synthetic. It is tactile, gentle, and intentional.
          </p>
          <p className="text-xs sm:text-sm text-[#59263D]/80 leading-relaxed">
            BlushCart was born from this balance. We paired clean scientific formulas with the timeless geometric elegance of Japanese folded paper.
          </p>
        </div>
      </div>

      {/* The Origami Craft Feature */}
      <div id="craftsmanship" className="rounded-3xl bg-[#59263D] text-[#FFFCFA] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFA8BE]/20 text-[#F9DDE5] text-xs font-semibold border border-[#EFA8BE]/30">
              <Scissors size={14} />
              <span>Signature Paper Architecture</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
              Why We Fold Every Box by Hand
            </h2>
            <p className="text-xs sm:text-sm text-[#F9DDE5]/90 leading-relaxed max-w-lg">
              In an era of generic plastic tape and bubble mailers, we wanted the act of receiving an order to feel like a ceremonial gift. Our packaging team folds FSC-certified cotton rag paper along scored geometric vectors that bloom outward like petals when opened.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <p className="font-bold text-white text-base">Zero Adhesive</p>
                <p className="text-[#F9DDE5]/70">Constructed via interlocked structural origami tabs</p>
              </div>
              <div>
                <p className="font-bold text-white text-base">Re-usable Art</p>
                <p className="text-[#F9DDE5]/70">Customers keep our boxes for vanity storage & stationery</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 sm:w-80 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80"
                alt="Origami Art"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Three Sourcing Pillars */}
      <div id="sustainability" className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D95F87]">
            Our Guiding Ethics
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
            Integrity in Every Material
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#F0E6E9] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87]">
              <Flower2 size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#332A2E]">Clean Formulations</h3>
            <p className="text-xs text-[#59263D]/80 leading-relaxed">
              Every skincare extract is clinically vetted, dermatologist-approved, and completely free of artificial dyes, phthalates, parabens, and micro-plastics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F0E6E9] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87]">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#332A2E]">Heritage Artisans</h3>
            <p className="text-xs text-[#59263D]/80 leading-relaxed">
              We commission generational makers: stone ceramicists in Porto, flax linen weavers in Normandy, and cashmere knitters across Mongolia.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F0E6E9] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87]">
              <Box size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#332A2E]">Circular Packaging</h3>
            <p className="text-xs text-[#59263D]/80 leading-relaxed">
              Every shipment is carbon-offset at checkout. All boxes, packing crinkle, and cotton ribbons are 100% home compostable and biodegradable.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-[#FFF7F9] border border-[#F0E6E9] space-y-4">
        <h3 className="font-serif text-2xl font-semibold text-[#332A2E]">
          Experience The BlushCart Touch
        </h3>
        <p className="text-xs sm:text-sm text-[#59263D]/80 max-w-md mx-auto">
          Explore our autumn release and receive complimentary origami presentation on your next order.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs font-semibold shadow-md active:scale-95 transition-all"
        >
          <span>Shop The Collection</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
