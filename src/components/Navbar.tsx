'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES } from '@/data/products';

export default function Navbar() {
  const pathname = usePathname();
  const {
    cartItemCount,
    wishlist,
    isCartOpen,
    setIsCartOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [categoriesHovered, setCategoriesHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Announcement Bar */}
      <div className="bg-[#59263D] text-[#FFFCFA] text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 overflow-hidden">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EFA8BE] animate-ping flex-shrink-0" />
        <span className="truncate">
          Complimentary Hand-Folded Packaging on orders $60+ • Free 30-Day Returns
        </span>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-200 border-b border-[#F0E6E9] ${
          isScrolled ? 'glass-blush shadow-xs py-2.5 sm:py-3' : 'bg-[#FFFCFA] py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left: Mobile Hamburger & Desktop Links */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Animated Hamburger Icon for Mobile (Accessible 44x44px touch target) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-11 h-11 -ml-1 rounded-full text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-95 transition-transform flex items-center justify-center touch-target"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-5 h-4 relative flex flex-col justify-between items-center pointer-events-none">
                  <span
                    className={`h-0.5 w-5 bg-[#332A2E] rounded-full transition-all duration-200 transform origin-left ${
                      isMobileMenuOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 w-5 bg-[#332A2E] rounded-full transition-opacity duration-150 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`h-0.5 w-5 bg-[#332A2E] rounded-full transition-all duration-200 transform origin-left ${
                      isMobileMenuOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Desktop Main Links */}
              <div className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-[#332A2E]">
                <Link
                  href="/shop"
                  className={`hover:text-[#D95F87] transition-colors py-1 ${
                    pathname === '/shop' ? 'text-[#D95F87] font-semibold border-b-2 border-[#D95F87]' : ''
                  }`}
                >
                  All Products
                </Link>

                {/* Categories Dropdown */}
                <div
                  className="relative group py-1"
                  onMouseEnter={() => setCategoriesHovered(true)}
                  onMouseLeave={() => setCategoriesHovered(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-[#D95F87] transition-colors cursor-pointer"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${categoriesHovered ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Mega dropdown menu */}
                  {categoriesHovered && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-[#FFFCFA] rounded-2xl shadow-xl border border-[#F0E6E9] p-4 grid gap-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/shop/${cat.slug}`}
                          onClick={() => setCategoriesHovered(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F9DDE5]/30 transition-colors group/item"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F0E6E9] flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-xs text-[#332A2E] group-hover/item:text-[#D95F87] transition-colors">
                              {cat.name}
                            </p>
                            <p className="text-[11px] text-[#59263D]/70 line-clamp-1">{cat.headline}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  className={`hover:text-[#D95F87] transition-colors py-1 ${
                    pathname === '/about' ? 'text-[#D95F87] font-semibold border-b-2 border-[#D95F87]' : ''
                  }`}
                >
                  Our Story
                </Link>

                <Link
                  href="/ai-shopping-assistant"
                  className={`hover:text-[#D95F87] transition-colors py-1 ${
                    pathname === '/ai-shopping-assistant' ? 'text-[#D95F87] font-semibold border-b-2 border-[#D95F87]' : ''
                  }`}
                >
                  Concierge
                </Link>
              </div>
            </div>

            {/* Center: Brand Identity */}
            <div className="text-center">
              <Link href="/" className="inline-block group focus:outline-none">
                <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#332A2E] group-hover:text-[#59263D] transition-colors font-medium">
                  Blush<span className="text-[#D95F87] font-normal italic">Cart</span>
                </span>
                <span className="block text-[7.5px] sm:text-[9px] tracking-[0.24em] text-[#59263D]/60 uppercase font-sans -mt-1">
                  TOKYO • PARIS • NEW YORK
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-0.5 sm:gap-2">
              {/* Search Button (44x44px touch target) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="w-11 h-11 rounded-full flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-95 transition-all touch-target"
                aria-label="Search catalog"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>

              {/* Wishlist Button (44x44px touch target) */}
              <Link
                href="/wishlist"
                className="w-11 h-11 rounded-full flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-95 transition-all relative touch-target"
                aria-label={`Wishlist (${wishlist.length} items)`}
              >
                <Heart size={19} strokeWidth={1.8} className={wishlist.length > 0 ? 'text-[#D95F87]' : ''} />
                {wishlist.length > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-[#D95F87] text-white text-[10px] font-bold rounded-full flex items-center justify-center badge-pop">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account Button (Desktop) */}
              <Link
                href="/account"
                className="hidden sm:flex w-11 h-11 rounded-full items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40 active:scale-95 transition-all touch-target"
                aria-label="My Account"
              >
                <User size={19} strokeWidth={1.8} />
              </Link>

              {/* Signature Origami Shopping Bag Button (44px min touch height) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative h-10 sm:h-11 pl-3 pr-3.5 rounded-full bg-[#59263D] text-[#FFFCFA] hover:bg-[#481e31] active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 shadow-xs group"
                aria-label={`Shopping Bag (${cartItemCount} items)`}
              >
                <ShoppingBag size={17} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">{cartItemCount}</span>
                {/* Visual origami fold tip */}
                <span className="w-1.5 h-1.5 bg-[#EFA8BE] rounded-xs rotate-45" />
              </button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}
