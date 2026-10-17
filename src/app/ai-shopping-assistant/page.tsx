'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Send,
  User,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Package,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

interface Message {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  recommendedProducts?: Product[];
}

const CONSULTATION_PROMPTS = [
  'Curate a hand-folded gift under $50',
  'Morning dewy skincare ritual',
  'Aesthetic bedroom sanctuary pieces',
  'Pairing suggestions for the Cashmere Cardigan',
];

export default function ConciergeConsultationPage() {
  const { addToCart, setIsCartOpen } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: 'Welcome to the BlushCart Private Concierge. It is our pleasure to assist you with bespoke gift assembly, clean skincare rituals, and refined everyday accents. How may we assist your curation today?',
      recommendedProducts: [PRODUCTS[0], PRODUCTS[16]],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      let products: Product[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('gift') || lower.includes('50') || lower.includes('birthday') || lower.includes('under')) {
        replyText =
          'For an exquisite gesture under $50, we recommend our Fig & Wild Peony Botanical Candle or our hand-thrown Frosted Rose Stoneware Mug. Both are hand-nestled in our bespoke origami paper carton with complimentary wax seal and handwritten calligraphy note.';
        products = [PRODUCTS[7], PRODUCTS[6], PRODUCTS[18]];
      } else if (lower.includes('skin') || lower.includes('routine') || lower.includes('serum') || lower.includes('glow')) {
        replyText =
          'Here is our signature three-step radiance ritual: melt impurities with the Camellia Silk Cleansing Balm, deeply hydrate cellular layers with the multi-peptide Petal Dew Serum, and finish with a sheer cloud of Velvet Soufflé.';
        products = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[3]];
      } else if (lower.includes('desk') || lower.includes('tech') || lower.includes('keyboard') || lower.includes('setup') || lower.includes('bedroom')) {
        replyText =
          'To bring quiet beauty and warmth to your sanctuary, we recommend pairing the sculptural 3-in-1 MagSafe charging stand with our tactile mechanical wireless keyboard in cream and pale blush.';
        products = [PRODUCTS[11], PRODUCTS[14], PRODUCTS[13]];
      } else if (lower.includes('cashmere') || lower.includes('cardigan') || lower.includes('pair') || lower.includes('wear')) {
        replyText =
          'The Petal Cashmere Cardigan pairs gracefully with our Baroque Freshwater Pearl Huggies and our soft nappa origami wallet for effortless, refined modern luxury.';
        products = [PRODUCTS[9], PRODUCTS[10], PRODUCTS[8]];
      } else {
        replyText =
          `We have selected these cherished pieces to complement "${text}". Each creation is crafted with sustainable materials and delivered in our signature hand-folded origami presentation.`;
        products = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[16]];
      }

      const conciergeMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'concierge',
        text: replyText,
        recommendedProducts: products,
      };

      setMessages((prev) => [...prev, conciergeMessage]);
    }, 450);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2F6] text-[#D95F87] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#EFA8BE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D95F87]" />
          <span>Client Concierge & Stylist</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-medium tracking-tight text-[#332A2E]">
          Personal Ritual Consultation
        </h1>
        <p className="text-xs text-[#59263D]/70 max-w-md mx-auto leading-relaxed">
          Inquire regarding personalized curations, gift packaging, and shade matching.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-[#F0E6E9] shadow-lg flex flex-col h-[650px] overflow-hidden">
        {/* Top Status Bar */}
        <div className="p-4 sm:p-5 bg-[#FFF7F9] border-b border-[#F0E6E9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#59263D] text-[#FFFCFA] font-serif font-semibold text-sm flex items-center justify-center shadow-xs">
              BC
            </div>
            <div>
              <p className="text-xs font-bold text-[#332A2E]">BlushCart Concierge</p>
              <p className="text-[10px] text-[#59263D]/60 font-medium">Atelier Private Services</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setMessages([
                {
                  id: 'welcome',
                  sender: 'concierge',
                  text: 'Welcome to the BlushCart Private Concierge. How may we assist your curation today?',
                  recommendedProducts: [PRODUCTS[0], PRODUCTS[16]],
                },
              ])
            }
            className="text-xs text-[#59263D]/70 hover:text-[#332A2E] flex items-center gap-1 p-1 transition-colors"
          >
            <RefreshCw size={12} />
            <span>New Consultation</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FFFCFA]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-xl ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                  m.sender === 'user'
                    ? 'bg-[#EFA8BE] text-[#332A2E]'
                    : 'bg-[#59263D] text-[#FFFCFA] font-serif text-[11px]'
                }`}
              >
                {m.sender === 'user' ? <User size={14} /> : 'BC'}
              </div>

              <div className="space-y-3">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-[#59263D] text-[#FFFCFA] rounded-tr-none'
                      : 'bg-white text-[#332A2E] border border-[#F0E6E9] rounded-tl-none font-normal'
                  }`}
                >
                  {m.text}
                </div>

                {/* Inline Product Recommendations */}
                {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {m.recommendedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-2xl bg-white border border-[#F0E6E9] hover:border-[#D95F87] transition-all flex items-center gap-3 shadow-2xs group"
                      >
                        <Link
                          href={`/product/${prod.slug}`}
                          className="w-14 h-16 rounded-xl overflow-hidden bg-[#F0E6E9] flex-shrink-0 border border-[#F0E6E9]"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </Link>

                        <div className="flex-1 overflow-hidden">
                          <Link
                            href={`/product/${prod.slug}`}
                            className="block font-semibold text-xs text-[#332A2E] group-hover:text-[#D95F87] transition-colors truncate"
                          >
                            {prod.name}
                          </Link>
                          <p className="text-xs font-bold text-[#59263D] mt-0.5">
                            ${prod.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(prod, 1);
                                setIsCartOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#59263D] text-[#FFFCFA] text-[10px] font-semibold hover:bg-[#481e31] active:scale-95 transition-all flex items-center gap-1"
                            >
                              <ShoppingBag size={11} />
                              <span>Select</span>
                            </button>
                            <Link
                              href={`/product/${prod.slug}`}
                              className="text-[10px] font-medium text-[#D95F87] hover:underline"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-xs mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-[#59263D] text-[#FFFCFA] font-serif text-[11px] flex items-center justify-center flex-shrink-0">
                BC
              </div>
              <div className="px-4 py-3 bg-white rounded-2xl rounded-tl-none border border-[#F0E6E9] text-xs text-[#59263D]/60 flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95F87] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95F87] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95F87] animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px]">Curating your ritual...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Inquiries */}
        <div className="p-3 bg-[#FFF7F9] border-t border-[#F0E6E9] overflow-x-auto flex gap-2 scrollbar-none">
          {CONSULTATION_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F9DDE5] text-xs font-medium text-[#332A2E] border border-[#EFA8BE] transition-all whitespace-nowrap active:scale-95 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white flex gap-2 border-t border-[#F0E6E9]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your inquiry or aesthetic preference..."
            className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#F0E6E9] bg-[#FFF7F9] text-[#332A2E] placeholder:text-[#59263D]/40 focus:outline-none focus:border-[#D95F87]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-12 h-11 rounded-2xl bg-[#59263D] hover:bg-[#481e31] disabled:opacity-40 text-[#FFFCFA] flex items-center justify-center active:scale-95 transition-all shadow-xs cursor-pointer"
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      <p className="text-[11px] text-center text-[#59263D]/60 tracking-wide uppercase">
        BlushCart Atelier Client Services • Tokyo • Paris • New York
      </p>
    </div>
  );
}
