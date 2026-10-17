'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, X, Check, ArrowUpDown, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-40' | '40-80' | 'over-80'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Price filter
      if (priceFilter === 'under-40' && p.price >= 40) return false;
      if (priceFilter === '40-80' && (p.price < 40 || p.price > 80)) return false;
      if (priceFilter === 'over-80' && p.price <= 80) return false;

      // In-stock filter
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, priceFilter, inStockOnly, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceFilter !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceFilter('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-[#D95F87]">
          The Complete Catalog
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#332A2E]">
          Explore All Curations
        </h1>
        <p className="text-xs sm:text-sm text-[#59263D]/80 leading-relaxed">
          From French damask rose skincare to Mongolian cashmere and Portuguese stoneware. Every item is packed in hand-folded origami paper.
        </p>
      </div>

      {/* Control Bar: Categories Pills + Filters Trigger + Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-[#F0E6E9]">
        
        {/* Category Pills (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#59263D] text-[#FFFCFA] shadow-xs'
                : 'bg-white text-[#332A2E] border border-[#F0E6E9] hover:border-[#EFA8BE]'
            }`}
          >
            All Items ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#59263D] text-[#FFFCFA] shadow-xs'
                  : 'bg-white text-[#332A2E] border border-[#F0E6E9] hover:border-[#EFA8BE]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Right: Filter Drawer Trigger & Sort Dropdown */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#F0E6E9] text-xs font-semibold text-[#332A2E] hover:border-[#EFA8BE] active:scale-95 transition-all shadow-2xs"
          >
            <SlidersHorizontal size={14} className="text-[#D95F87]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#59263D] text-white text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-[#F0E6E9] rounded-xl px-4 py-2 pr-8 text-xs font-semibold text-[#332A2E] hover:border-[#EFA8BE] focus:outline-none focus:border-[#D95F87] shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 pointer-events-none text-[#59263D]/60" />
          </div>
        </div>

      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[#59263D]/60 font-medium">Active filters:</span>

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2F6] text-[#59263D] border border-[#EFA8BE]">
              <span>Category: {selectedCategory}</span>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="hover:text-black"
                aria-label="Remove category filter"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {priceFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2F6] text-[#59263D] border border-[#EFA8BE]">
              <span>Price: {priceFilter.replace('-', ' ')}</span>
              <button
                type="button"
                onClick={() => setPriceFilter('all')}
                className="hover:text-black"
                aria-label="Remove price filter"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2F6] text-[#59263D] border border-[#EFA8BE]">
              <span>In stock only</span>
              <button
                type="button"
                onClick={() => setInStockOnly(false)}
                className="hover:text-black"
                aria-label="Remove in stock filter"
              >
                <X size={12} />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-[#D95F87] hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#FFF7F9] rounded-3xl border border-[#F0E6E9] p-8">
          <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-[#D95F87] shadow-sm">
            <SlidersHorizontal size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-[#332A2E]">
              No products found matching your filters
            </h3>
            <p className="text-xs text-[#59263D]/70">
              Try adjusting your price range or category criteria to see more items.
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-full bg-[#59263D] text-[#FFFCFA] text-xs font-semibold hover:bg-[#481e31] active:scale-95 transition-all shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Filter Modal / Sheet Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-[#332A2E]/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
            className="relative w-full sm:w-96 bg-[#FFFCFA] h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200 p-6 overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E6E9]">
                <h3 className="font-serif text-xl font-semibold text-[#332A2E]">Filter Products</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#332A2E] hover:bg-[#F9DDE5]/40"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#59263D]/70 mb-3">
                  Category
                </p>
                <div className="grid gap-2">
                  <label className="flex items-center gap-2.5 text-xs text-[#332A2E] cursor-pointer">
                    <input
                      type="radio"
                      name="filterCategory"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="accent-[#D95F87]"
                    />
                    <span>All Categories</span>
                  </label>
                  {CATEGORIES.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2.5 text-xs text-[#332A2E] cursor-pointer">
                      <input
                        type="radio"
                        name="filterCategory"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="accent-[#D95F87]"
                      />
                      <span>{cat.name} ({cat.itemCount})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#59263D]/70 mb-3">
                  Price Range
                </p>
                <div className="grid gap-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-40', label: 'Under $40' },
                    { id: '40-80', label: '$40 to $80' },
                    { id: 'over-80', label: 'Over $80' },
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2.5 text-xs text-[#332A2E] cursor-pointer">
                      <input
                        type="radio"
                        name="filterPrice"
                        checked={priceFilter === p.id}
                        onChange={() => setPriceFilter(p.id as any)}
                        className="accent-[#D95F87]"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-2 border-t border-[#F0E6E9]">
                <label className="flex items-center justify-between text-xs font-semibold text-[#332A2E] cursor-pointer">
                  <span>Show In-Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#D95F87] rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#F0E6E9] space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#59263D] text-[#FFFCFA] text-xs font-semibold shadow-md active:scale-95 transition-all"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 text-xs font-semibold text-[#59263D] hover:underline"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
