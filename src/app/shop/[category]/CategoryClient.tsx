'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Product, CategoryInfo } from '@/types';
import ProductCard from '@/components/ProductCard';

interface Props {
  category: CategoryInfo;
  categoryProducts: Product[];
  otherCategories: CategoryInfo[];
}

export default function CategoryClient({ category, categoryProducts, otherCategories }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#59263D]/70">
        <Link href="/" className="hover:text-[#D95F87] transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-[#D95F87] transition-colors">
          Shop
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-[#332A2E]">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF7F9] via-[#F9DDE5]/30 to-[#FFF7F9] border border-[#F0E6E9] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#D95F87] text-xs font-bold uppercase tracking-wider border border-[#EFA8BE]">
              <Sparkles size={12} />
              <span>{category.itemCount} Curated Pieces</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#332A2E]">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-[#59263D]/80 max-w-xl leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#332A2E]">
            All {category.name}
          </h2>
          <span className="text-xs text-[#59263D]/70 font-medium">
            Showing {categoryProducts.length} items
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Explore Other Universes */}
      <div className="pt-12 border-t border-[#F0E6E9]">
        <p className="text-xs font-bold uppercase tracking-wider text-[#59263D]/60 mb-4">
          Explore Other Universes
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {otherCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="p-3.5 rounded-2xl bg-white border border-[#F0E6E9] hover:border-[#D95F87] hover:shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F0E6E9] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#332A2E] group-hover:text-[#D95F87] transition-colors truncate">
                  {cat.name}
                </p>
                <p className="text-[10px] text-[#59263D]/60">{cat.itemCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
