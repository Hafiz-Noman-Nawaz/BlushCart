'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  Package,
  Sparkles,
  ChevronRight,
  Truck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/context/StoreContext';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();

  const [formData, setFormData] = useState({
    email: 'elena.patron@example.com',
    firstName: 'Elena',
    lastName: 'Rostova',
    address: '450 Rosewater Promenade, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10012',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = formData.deliveryMethod === 'express' ? 12.0 : 0.0;
  const estimatedTax = Math.round(cartTotal * 0.08 * 100) / 100;
  const orderFinalTotal = cartTotal + shippingCost + estimatedTax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = 'BC-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setOrderComplete(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EFA8BE', '#D95F87', '#59263D', '#FFFCFA'],
      });

      // Clear cart
      clearCart();
    }, 1200);
  };

  // Order Confirmation Screen
  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-8 animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-[#FFF2F6] mx-auto flex items-center justify-center text-emerald-600 border border-[#F0E6E9] shadow-md">
          <CheckCircle2 size={40} />
        </div>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#FFF2F6] text-[#D95F87] text-xs font-bold uppercase tracking-wider border border-[#EFA8BE]">
            Origami Packing in Progress
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#332A2E]">
            Thank You For Your Order!
          </h1>
          <p className="text-sm text-[#59263D]/80 max-w-md mx-auto leading-relaxed">
            Order <strong className="text-[#332A2E]">#{orderId}</strong> has been received and confirmed. A receipt and carbon-neutral tracking link have been sent to <strong>{formData.email}</strong>.
          </p>
        </div>

        {/* Order Fulfillment Timeline */}
        <div className="bg-[#FFF7F9] p-6 rounded-3xl border border-[#F0E6E9] text-left max-w-md mx-auto space-y-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-[#F0E6E9]">
            <span className="font-bold text-[#332A2E]">Estimated Delivery</span>
            <span className="text-[#D95F87] font-semibold">October 21 – October 23</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              <div>
                <p className="font-semibold text-[#332A2E]">Order Confirmed</p>
                <p className="text-[10px] text-[#59263D]/60">Payment processed successfully</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#EFA8BE]" />
              <div>
                <p className="font-semibold text-[#332A2E]">Origami Workshop Assembly</p>
                <p className="text-[10px] text-[#59263D]/60">Hand-folding geometric box & tying silk ribbon</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-gray-300" />
              <div>
                <p className="font-semibold text-gray-500">Shipped with Carbon Offset</p>
                <p className="text-[10px] text-gray-400">Carrier dispatch</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/account"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs font-semibold shadow-md active:scale-95 transition-all"
          >
            View in My Account
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#332A2E] border border-[#F0E6E9] hover:bg-[#FFF7F9] text-xs font-semibold active:scale-95 transition-all"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
            Secure Checkout
          </h1>
          <p className="text-xs text-[#59263D]/70 mt-1">
            Complimentary hand-folded packaging applied to all orders
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock size={12} />
          <span>256-Bit SSL Encryption</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Contact, Delivery, Payment (Spans 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Contact Information */}
          <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#332A2E]">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                  Phone (for courier updates)
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 392-1084"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Destination */}
          <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#332A2E]">
              2. Delivery Address
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                Street Address & Apartment
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#59263D]/70 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#59263D]/70 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#59263D]/70 mb-1">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Delivery Method */}
          <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#332A2E]">
              3. Delivery Service
            </h2>
            <div className="grid gap-2.5">
              <label
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.deliveryMethod === 'standard'
                    ? 'border-[#59263D] bg-[#FFF7F9]'
                    : 'border-[#F0E6E9] bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={formData.deliveryMethod === 'standard'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                    className="accent-[#D95F87]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#332A2E]">
                      Standard Origami Delivery (3-5 Business Days)
                    </p>
                    <p className="text-[11px] text-[#59263D]/60">Hand-folded packaging included</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">FREE</span>
              </label>

              <label
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.deliveryMethod === 'express'
                    ? 'border-[#59263D] bg-[#FFF7F9]'
                    : 'border-[#F0E6E9] bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={formData.deliveryMethod === 'express'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                    className="accent-[#D95F87]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#332A2E]">
                      Blush Express Courier (1-2 Business Days)
                    </p>
                    <p className="text-[11px] text-[#59263D]/60">Priority handcraft packaging dispatch</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#332A2E]">$12.00</span>
              </label>
            </div>
          </div>

          {/* Step 4: Payment Simulation */}
          <div className="bg-white rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#332A2E]">
              4. Payment Method
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#59263D] bg-[#59263D] text-[#FFFCFA]'
                    : 'border-[#F0E6E9] bg-white text-[#332A2E]'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  formData.paymentMethod === 'applepay'
                    ? 'border-[#59263D] bg-[#59263D] text-[#FFFCFA]'
                    : 'border-[#F0E6E9] bg-white text-[#332A2E]'
                }`}
              >
                Apple Pay / Google Pay
              </button>
            </div>

            {formData.paymentMethod === 'card' ? (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                    />
                    <CreditCard size={16} className="absolute right-3.5 top-3 text-[#59263D]/40" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#59263D]/70 mb-1">
                      Security CVC
                    </label>
                    <input
                      type="password"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FFF7F9] border border-[#F0E6E9] text-center text-xs text-[#59263D]/80">
                Express 1-tap checkout enabled. Click Complete Order below to authorize.
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary Sidebar (Spans 5) */}
        <div className="lg:col-span-5 bg-[#FFF7F9] rounded-3xl border border-[#F0E6E9] p-5 sm:p-6 shadow-xs space-y-5 sticky top-24">
          <h2 className="font-serif text-lg font-semibold text-[#332A2E]">
            Order Review ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </h2>

          {/* Cart items list preview */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#F0E6E9]">
            {cart.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-xl overflow-hidden bg-white border border-[#F0E6E9] flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#332A2E] line-clamp-1">{item.product.name}</p>
                    <p className="text-[11px] text-[#59263D]/60">Qty {item.quantity}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#332A2E]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing totals */}
          <div className="space-y-2 text-xs text-[#59263D]/80 pt-3 border-t border-[#F0E6E9]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#332A2E]">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping ({formData.deliveryMethod})</span>
              <span className="font-semibold text-[#332A2E]">
                {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax</span>
              <span className="font-semibold text-[#332A2E]">${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#F0E6E9] text-base font-bold text-[#332A2E]">
              <span>Total</span>
              <span className="text-xl text-[#59263D]">${orderFinalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full py-4 rounded-2xl bg-[#59263D] hover:bg-[#481e31] disabled:opacity-50 text-[#FFFCFA] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Confirming Order...</span>
            ) : (
              <span>Complete Order • ${orderFinalTotal.toFixed(2)}</span>
            )}
          </button>

          <p className="text-[10px] text-center text-[#59263D]/60">
            Encrypted checkout • Complimentary hand-folded origami packaging included
          </p>
        </div>
      </form>
    </div>
  );
}
