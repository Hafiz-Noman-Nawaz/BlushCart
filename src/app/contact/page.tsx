'use client';

import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Phone,
} from 'lucide-react';

const FAQS = [
  {
    q: 'How does the signature origami packaging work?',
    a: 'Every order over $60 includes complimentary hand-folded origami box presentation. Our studio uses thick, FSC-certified cotton rag paper engineered with geometric creases that bloom open like petals upon untying the silk ribbon. You can also add a handwritten calligraphy note at checkout for free.',
  },
  {
    q: 'What are your delivery times and shipping costs?',
    a: 'Standard Carbon-Neutral Delivery takes 3 to 5 business days and is FREE on all orders over $60 (or $4.95 for smaller orders). Blush Express Courier takes 1 to 2 business days ($12.00). International delivery to Canada, Europe, Japan, and Australia takes 5 to 8 business days.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer 30-day effortless returns on all unused items in original packaging. Every shipment includes a prepaid return shipping label. Simply repack the items, peel the label, and hand it to your local postal carrier.',
  },
  {
    q: 'Are your formulations suitable for ultra-sensitive skin?',
    a: 'Yes. All BlushCart beauty products are dermatologically formulated, fragrance-free or scented only with pure botanical hydrosols, and tested for hyper-sensitive and rosacea-prone skin barriers.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'concierge',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', topic: 'concierge', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-[#FFF2F6] text-[#D95F87] text-xs font-bold uppercase tracking-wider border border-[#EFA8BE]">
          Client Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#332A2E]">
          We Are Here For You
        </h1>
        <p className="text-xs sm:text-sm text-[#59263D]/80 leading-relaxed">
          Whether you need bespoke gift recommendations, ingredient guidance, or order status assistance, our concierge team responds within 2 business hours.
        </p>
      </div>

      {/* Grid: Contact Form + Studio Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Contact Form (Spans 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F0E6E9] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5">
            <MessageSquare size={18} className="text-[#D95F87]" />
            <h2 className="font-serif text-xl font-semibold text-[#332A2E]">
              Send A Message
            </h2>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-[#FFF7F9] rounded-2xl border border-[#EFA8BE] text-center space-y-3 animate-in fade-in">
              <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-semibold text-[#332A2E]">
                Thank you for contacting us!
              </h3>
              <p className="text-xs text-[#59263D]/80 max-w-sm mx-auto leading-relaxed">
                Your message has been assigned to a BlushCart concierge specialist. Expect our personal reply in your inbox shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#332A2E] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Elena Rostova"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#332A2E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#332A2E] mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] focus:outline-none focus:border-[#D95F87] cursor-pointer"
                >
                  <option value="concierge">Gifting & Custom Origami Consultation</option>
                  <option value="order">Order Tracking & Delivery Status</option>
                  <option value="skincare">Skincare & Shade Consultation</option>
                  <option value="press">Press, Collaborations & Wholesale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#332A2E] mb-1">
                  How May We Help?
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share the details of your inquiry..."
                  className="w-full text-xs p-3.5 rounded-xl border border-[#F0E6E9] bg-white text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none focus:border-[#D95F87]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#59263D] hover:bg-[#481e31] text-[#FFFCFA] text-xs font-semibold shadow-md active:scale-95 transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right: Studio Details (Spans 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFF7F9] rounded-3xl border border-[#F0E6E9] p-6 sm:p-7 shadow-xs space-y-6">
            <h2 className="font-serif text-lg font-semibold text-[#332A2E]">
              Studio & Concierge Hours
            </h2>

            <div className="space-y-4 text-xs text-[#59263D]/80">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[#D95F87] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#332A2E]">Concierge Live Hours</p>
                  <p>Monday – Friday: 9:00 AM – 7:00 PM EST</p>
                  <p>Saturday – Sunday: 10:00 AM – 5:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#D95F87] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#332A2E]">Direct Inquiries</p>
                  <p>concierge@blushcart.com</p>
                  <p>press@blushcart.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D95F87] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#332A2E]">Studio Flagships</p>
                  <p>Omotesando, Shibuya-ku, Tokyo</p>
                  <p>Rue de Passy, 16th Arr., Paris</p>
                  <p>Mercer Street, SoHo, New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div id="faq" className="space-y-6 max-w-3xl mx-auto pt-6">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D95F87]">
            Answers to Common Questions
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332A2E]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#F0E6E9] rounded-2xl overflow-hidden bg-white shadow-2xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[#332A2E] hover:bg-[#FFF7F9] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 text-[#59263D]/60 ${
                    openFaq === idx ? 'rotate-180 text-[#D95F87]' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 border-t border-[#F0E6E9]/50 text-xs sm:text-sm text-[#59263D]/80 leading-relaxed animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
