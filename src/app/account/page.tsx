'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  MapPin,
  CreditCard,
  Settings,
  Clock,
  CheckCircle2,
  Truck,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  User,
  Heart,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';

const MOCK_ORDERS = [
  {
    id: 'BC-892104',
    date: 'October 12, 2026',
    status: 'Delivered',
    total: 126.0,
    itemsCount: 3,
    trackingNumber: '1Z9999999999999999',
    items: [
      {
        name: 'Petal Dew Multi-Peptide Serum',
        price: 48.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Velvet Cloud Cheek & Lip Soufflé',
        price: 32.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Rosewater Mulberry Silk Hair Ribbon',
        price: 26.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80',
      },
    ],
  },
  {
    id: 'BC-774912',
    date: 'September 28, 2026',
    status: 'Delivered',
    total: 185.0,
    itemsCount: 1,
    trackingNumber: '1Z8888888888888888',
    items: [
      {
        name: 'Petal Cashmere Soft-Knit Cardigan',
        price: 185.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=300&q=80',
      },
    ],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments' | 'settings'>('orders');
  const { wishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Profile Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF7F9] via-[#F9DDE5]/30 to-[#FFF7F9] border border-[#F0E6E9] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-[#F0E6E9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Elena Rostova"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
                Elena Rostova
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#59263D] text-[#FFFCFA] text-[10px] font-bold uppercase tracking-wider">
                Patron VIP
              </span>
            </div>
            <p className="text-xs text-[#59263D]/70 mt-1">
              Member since 2025 • elena.rostova@example.com
            </p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              ✓ Eligible for free express origami shipping on every order
            </p>
          </div>
        </div>

        <Link
          href="/wishlist"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#EFA8BE] text-xs font-semibold text-[#59263D] shadow-2xs hover:bg-[#FFF7F9]"
        >
          <Heart size={14} className="text-[#D95F87]" />
          <span>Wishlist ({wishlist.length})</span>
        </Link>
      </div>

      {/* Tabs & Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-[#F0E6E9] p-3 shadow-2xs space-y-1">
          {[
            { id: 'orders', label: 'Order History', icon: Package, count: '2' },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'payments', label: 'Payment Methods', icon: CreditCard },
            { id: 'settings', label: 'Origami & Preferences', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#59263D] text-[#FFFCFA] shadow-xs'
                    : 'text-[#332A2E] hover:bg-[#FFF7F9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </div>
                {tab.count && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === tab.id ? 'bg-[#FFFCFA] text-[#59263D]' : 'bg-[#FFF2F6] text-[#D95F87]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-6">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#332A2E]">
                Recent Orders
              </h2>

              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0E6E9]">
                      <div>
                        <span className="text-xs font-bold text-[#332A2E]">{order.id}</span>
                        <p className="text-[11px] text-[#59263D]/60">Placed on {order.date}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                          <CheckCircle2 size={12} />
                          <span>{order.status}</span>
                        </span>
                        <span className="text-sm font-bold text-[#332A2E]">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#F0E6E9] flex-shrink-0 border border-[#F0E6E9]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#332A2E]">{item.name}</p>
                              <p className="text-[11px] text-[#59263D]/60">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#332A2E]">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#F0E6E9] flex items-center justify-between text-xs">
                      <span className="text-[#59263D]/70 font-mono text-[11px]">
                        Tracking: {order.trackingNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`Tracking simulated: Package for ${order.id} was hand-delivered with signature.`)}
                        className="text-[#D95F87] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Track Package</span>
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#332A2E]">
                Saved Shipping Addresses
              </h2>
              <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2F6] text-[#D95F87] text-[10px] font-bold uppercase tracking-wider">
                    Primary Default
                  </span>
                  <button type="button" className="text-xs font-semibold text-[#59263D] hover:underline">
                    Edit
                  </button>
                </div>
                <div className="text-xs text-[#332A2E] space-y-1">
                  <p className="font-bold">Elena Rostova</p>
                  <p>450 Rosewater Promenade, Apt 4B</p>
                  <p>New York, NY 10012, United States</p>
                  <p className="text-[#59263D]/70">Phone: +1 (555) 392-1084</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#332A2E]">
                Saved Payment Methods
              </h2>
              <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF2F6] flex items-center justify-center text-[#D95F87]">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#332A2E]">Visa ending in 4242</p>
                    <p className="text-[11px] text-[#59263D]/60">Expires 12/28 • Default</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-700 font-semibold">Active</span>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#332A2E]">
                Origami & Gifting Preferences
              </h2>
              <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#F0E6E9]">
                  <div>
                    <p className="font-bold text-[#332A2E]">Automatic Origami Packaging</p>
                    <p className="text-[#59263D]/70">Wrap all eligible orders in folded paper boxes by default</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#D95F87]" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-bold text-[#332A2E]">Blush Circle Journal Newsletter</p>
                    <p className="text-[#59263D]/70">Receive monthly essays on slow design and botanical recipes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#D95F87]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
