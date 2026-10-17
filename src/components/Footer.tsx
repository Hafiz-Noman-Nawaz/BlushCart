'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, Sparkles, Shield, RefreshCw, Box, Heart } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2500);
    }
  };

  return (
    <footer className="bg-[#FFF7F9] border-t border-[#F0E6E9] text-[#332A2E] mt-20">
      {/* Brand Guarantees Ticker Bar */}
      <div className="border-b border-[#F0E6E9] bg-[#FFFCFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87] flex-shrink-0">
              <Box size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#332A2E] uppercase tracking-wider">Origami Packaging</p>
              <p className="text-[11px] text-[#59263D]/70 mt-0.5">Complimentary hand-folded paper boxes on $60+</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87] flex-shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#332A2E] uppercase tracking-wider">30-Day Easy Returns</p>
              <p className="text-[11px] text-[#59263D]/70 mt-0.5">Prepaid labels included with every shipment</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87] flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#332A2E] uppercase tracking-wider">Clean & Conscious</p>
              <p className="text-[11px] text-[#59263D]/70 mt-0.5">100% cruelty-free & sustainable materials</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87] flex-shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#332A2E] uppercase tracking-wider">Secure Checkout</p>
              <p className="text-[11px] text-[#59263D]/70 mt-0.5">256-bit encrypted SSL buyer protection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Newsletter Column (Spans 2 on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-tight text-[#332A2E] font-medium">
                Blush<span className="text-[#D95F87] italic">Cart</span>
              </span>
            </Link>
            <p className="text-xs text-[#59263D]/80 leading-relaxed max-w-sm">
              An original retail house crafting daily rituals in pink and warm white. From cellular hydration serums to pure cashmere knits and origami gifts, our curation elevates quiet moments.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#332A2E] uppercase tracking-wider mb-2">
                Join The Blush Circle
              </p>
              <p className="text-[11px] text-[#59263D]/70 mb-3">
                Receive 15% off your first order, private product releases, and editorial essays.
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none focus:border-[#D95F87]"
                  />
                  <Mail size={15} className="absolute right-3.5 top-3 text-[#59263D]/40" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                >
                  {subscribed ? (
                    <>
                      <Check size={14} />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <span>Join</span>
                  )}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-700 font-medium mt-1.5 animate-in fade-in">
                  Welcome to our circle! Check your inbox for your 15% code.
                </p>
              )}
            </div>
          </div>

          {/* Column 2: Curated Collections */}
          <div>
            <h4 className="text-xs font-bold text-[#332A2E] uppercase tracking-wider mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#59263D]/80">
              <li>
                <Link href="/shop" className="hover:text-[#D95F87] transition-colors">
                  All Products
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/shop/${cat.slug}`} className="hover:text-[#D95F87] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop?filter=bestseller" className="hover:text-[#D95F87] transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Brand */}
          <div>
            <h4 className="text-xs font-bold text-[#332A2E] uppercase tracking-wider mb-4">
              About BlushCart
            </h4>
            <ul className="space-y-2.5 text-xs text-[#59263D]/80">
              <li>
                <Link href="/about" className="hover:text-[#D95F87] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about#craftsmanship" className="hover:text-[#D95F87] transition-colors">
                  The Origami Philosophy
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="hover:text-[#D95F87] transition-colors">
                  Sustainability Standards
                </Link>
              </li>
              <li>
                <Link href="/ai-shopping-assistant" className="hover:text-[#D95F87] transition-colors font-semibold text-[#D95F87]">
                  Private Concierge Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D95F87] transition-colors">
                  Press & Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div>
            <h4 className="text-xs font-bold text-[#332A2E] uppercase tracking-wider mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#59263D]/80">
              <li>
                <Link href="/contact" className="hover:text-[#D95F87] transition-colors">
                  Customer Concierge
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#D95F87] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#D95F87] transition-colors">
                  Gift Wrapping Options
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-[#D95F87] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#D95F87] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-10 mt-10 border-t border-[#F0E6E9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#59263D]/60">
          <p>© 2026 BlushCart Retail Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart size={12} className="text-[#D95F87] fill-[#D95F87]" /> for mindful living
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Currency: USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
