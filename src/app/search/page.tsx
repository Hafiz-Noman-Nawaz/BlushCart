'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const results = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (!query.trim()) return true;

      const q = query.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Search Header and Input */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#332A2E]">
          Search BlushCart
        </h1>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search serums, cashmere, ceramics, desk accessories..."
            className="w-full py-3.5 pl-12 pr-10 rounded-2xl bg-white border border-[#F0E6E9] shadow-sm text-sm text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none focus:border-[#D95F87]"
          />
          <Search size={18} className="absolute left-4 top-4 text-[#D95F87]" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 top-4 text-[#59263D]/40 hover:text-[#332A2E]"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#59263D] text-[#FFFCFA] shadow-xs'
              : 'bg-white text-[#332A2E] border border-[#F0E6E9] hover:border-[#EFA8BE]'
          }`}
        >
          All Universes
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.slug
                ? 'bg-[#59263D] text-[#FFFCFA] shadow-xs'
                : 'bg-white text-[#332A2E] border border-[#F0E6E9] hover:border-[#EFA8BE]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#59263D]/70 pb-2 border-b border-[#F0E6E9]">
        <span>
          Showing <strong>{results.length}</strong> {results.length === 1 ? 'item' : 'items'}
          {query && <span> for &ldquo;{query}&rdquo;</span>}
        </span>
      </div>

      {/* Results Grid */}
      {results.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-[#FFF7F9] rounded-3xl border border-[#F0E6E9] p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-[#D95F87] shadow-xs">
            <Sparkles size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-[#332A2E]">
              No exact matches found
            </h3>
            <p className="text-xs text-[#59263D]/70">
              Try searching for &ldquo;cashmere&rdquo;, &ldquo;serum&rdquo;, &ldquo;candle&rdquo; or &ldquo;tea&rdquo;.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-full bg-[#59263D] text-[#FFFCFA] text-xs font-semibold active:scale-95 transition-all shadow-xs"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#59263D]/60">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
