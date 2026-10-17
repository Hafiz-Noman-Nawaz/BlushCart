'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Search, Heart, User, ChevronRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES } from '@/data/products';

export default function MobileMenu() {
  const pathname = usePathname();
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
    setIsCartOpen,
    wishlist,
    cartItemCount,
  } = useStore();

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Dimmed tactile backdrop */}
      <div
        className="fixed inset-0 bg-[#332A2E]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Origami Paper-Unfolding Navigation Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className="relative w-full max-w-[340px] bg-[#FFFCFA] h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 origami-menu-panel border-r border-[#F0E6E9]"
      >
        {/* Origami Crease Corner Flourish */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden opacity-25 z-20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EFA8BE] -rotate-45 transform origin-top-right border border-[#D95F87]/40 shadow-xs" />
        </div>

        {/* Paper fold ambient crease overlay */}
        <div className="absolute inset-0 crease-overlay" />

        {/* Top Header */}
        <div className="p-5 border-b border-[#F0E6E9] flex items-center justify-between bg-[#FFF7F9]/80 relative z-10">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-2xl tracking-tight text-[#332A2E]"
          >
            Blush<span className="text-[#D95F87] italic font-normal">Cart</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-90 transition-all cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="px-5 pt-4 relative z-10">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#FFF2F6] border border-[#F0E6E9] text-left text-xs font-medium text-[#59263D]/70 active:scale-[0.98] transition-all"
          >
            <Search size={15} className="text-[#D95F87]" />
            <span>Search curations, knits, serums...</span>
          </button>
        </div>

        {/* Nav Links & Categories */}
        <div className="px-5 py-4 flex-1 space-y-6 relative z-10">
          {/* Main Collection Links */}
          <div className="space-y-1">
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between py-2.5 px-3 rounded-2xl font-medium text-sm transition-colors ${
                pathname === '/shop'
                  ? 'bg-[#F9DDE5]/60 text-[#59263D] font-semibold'
                  : 'text-[#332A2E] hover:bg-[#FFF7F9]'
              }`}
            >
              <span>The Complete Collection</span>
              <ChevronRight size={15} className="text-[#D95F87]" />
            </Link>

            <Link
              href="/ai-shopping-assistant"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-2xl font-medium text-sm text-[#59263D] bg-gradient-to-r from-[#F9DDE5]/40 to-[#FFF7F9] border border-[#EFA8BE]/40 shadow-2xs active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95F87]" />
                <span className="font-serif">Bespoke Ritual Consultation</span>
              </div>
              <ChevronRight size={15} className="text-[#D95F87]" />
            </Link>
          </div>

          {/* Curated Universes */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#59263D]/60 px-3 mb-2.5">
              Curated Universes
            </p>
            <div className="grid gap-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F9DDE5]/30 active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#F0E6E9] border border-[#F0E6E9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#332A2E] group-hover:text-[#D95F87] transition-colors">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-[#59263D]/60">{cat.itemCount} pieces</p>
                    </div>
                  </div>
                  <ChevronRight size={13} className="text-[#D95F87]/60 group-hover:text-[#D95F87] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Editorial Links */}
          <div className="pt-2 border-t border-[#F0E6E9] space-y-1">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-xl text-xs font-medium text-[#332A2E] hover:bg-[#FFF7F9] transition-colors"
            >
              The Brand Story & Sourcing
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-xl text-xs font-medium text-[#332A2E] hover:bg-[#FFF7F9] transition-colors"
            >
              Client Concierge & Inquiries
            </Link>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-5 border-t border-[#F0E6E9] bg-[#FFF7F9]/80 space-y-3 relative z-10">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white border border-[#F0E6E9] text-xs font-semibold text-[#332A2E] shadow-2xs active:scale-95 transition-all"
            >
              <Heart size={14} className="text-[#D95F87]" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>

            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white border border-[#F0E6E9] text-xs font-semibold text-[#332A2E] shadow-2xs active:scale-95 transition-all"
            >
              <User size={14} className="text-[#59263D]" />
              <span>Account</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#59263D] text-[#FFFCFA] text-xs font-semibold uppercase tracking-wider shadow-xs active:scale-95 transition-all"
          >
            <ShoppingBag size={15} />
            <span>Open Shopping Bag ({cartItemCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
