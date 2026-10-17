'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';

const TRENDING_SEARCHES = [
  'Petal Dew Serum',
  'Cashmere Cardigan',
  'Origami Gift Box',
  'Ceramic Mug',
  'MagSafe Stand',
  'Cheek Soufflé',
];

export default function SearchModal() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 p-4">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#332A2E]/40 backdrop-blur-xs transition-opacity duration-150"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      {/* Search Modal Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search BlushCart"
        className="relative w-full max-w-2xl bg-[#FFFCFA] rounded-3xl shadow-2xl border border-[#F0E6E9] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="p-4 sm:p-5 border-b border-[#F0E6E9] flex items-center gap-3 bg-[#FFF7F9]"
        >
          <Search size={22} className="text-[#D95F87] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search beauty, cloud knits, ceramics, gifts..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#59263D]/40 hover:text-[#332A2E] p-1"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/60 active:scale-90 transition-all cursor-pointer"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </form>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Live Matching Results */}
          {query.trim() && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#59263D]/60 mb-3">
                Matching Products ({filteredProducts.length})
              </p>
              {filteredProducts.length === 0 ? (
                <div className="py-6 text-center text-sm text-[#59263D]/70 space-y-2">
                  <p>No products directly matching &ldquo;{query}&rdquo;.</p>
                  <p className="text-xs text-[#59263D]/50">
                    Try searching for &ldquo;serum&rdquo;, &ldquo;cashmere&rdquo;, or &ldquo;candle&rdquo;
                  </p>
                </div>
              ) : (
                <div className="grid gap-2">
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F9DDE5]/30 transition-all group border border-transparent hover:border-[#F0E6E9]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F0E6E9] flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#332A2E] group-hover:text-[#D95F87] transition-colors">
                            {p.name}
                          </p>
                          <p className="text-xs text-[#59263D]/60 line-clamp-1">{p.tagline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#59263D]">${p.price.toFixed(2)}</span>
                        <ArrowRight size={15} className="text-[#D95F87]/60 group-hover:text-[#D95F87] transition-colors" />
                      </div>
                    </Link>
                  ))}

                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full text-center py-2.5 mt-2 rounded-xl bg-[#59263D] text-[#FFFCFA] text-xs font-semibold hover:bg-[#481e31] active:scale-95 transition-all"
                  >
                    View all results for &ldquo;{query}&rdquo;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#59263D]/60 mb-2.5">
              <TrendingUp size={13} className="text-[#D95F87]" />
              <span>Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#FFF2F6] hover:bg-[#F9DDE5] text-xs font-medium text-[#332A2E] border border-[#F0E6E9] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={11} className="text-[#D95F87]" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
