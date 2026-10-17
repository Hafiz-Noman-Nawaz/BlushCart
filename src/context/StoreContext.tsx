'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem } from '@/types';
import { PRODUCTS } from '@/data/products';

interface ToastData {
  id: string;
  message: string;
  productName?: string;
  productImage?: string;
  type?: 'success' | 'info' | 'cart';
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toasts: ToastData[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string, selectedVariant?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedVariant?: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'blushcart_cart_v1';
const WISHLIST_STORAGE_KEY = 'blushcart_wishlist_v1';
const FREE_SHIPPING_THRESHOLD = 60;

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        // Pre-populate with 2 delicate starter items for demo delight if empty
        const defaultItems: CartItem[] = [
          { product: PRODUCTS[0], quantity: 1, selectedVariant: '50ml' },
          { product: PRODUCTS[6], quantity: 1, selectedVariant: 's' },
        ];
        setCart(defaultItems);
      }

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist(['b-2', 'h-1']);
      }
    } catch {
      // Graceful fallback for privacy/incognito mode
    }
    setIsLoaded(true);
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart, isLoaded]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist, isLoaded]);

  // Toast dispatch
  const showToast = (message: string, options?: { productName?: string; productImage?: string; type?: 'success' | 'info' | 'cart' }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastData = {
      id,
      message,
      productName: options?.productName,
      productImage: options?.productImage,
      type: options?.type || 'success',
    };
    setToasts((prev) => [...prev.slice(-2), newToast]); // Keep at most 3 toasts

    // Auto dismiss after 2.6s
    setTimeout(() => {
      removeToast(id);
    }, 2600);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant }];
    });

    showToast('Added to your shopping bag', {
      productName: product.name,
      productImage: product.images[0],
      type: 'cart',
    });
  };

  const removeFromCart = (productId: string, selectedVariant?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedVariant === selectedVariant))
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedVariant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariant);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant === selectedVariant) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const product = PRODUCTS.find((p) => p.id === productId);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from wishlist', {
        productName: product?.name,
        type: 'info',
      });
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to your wishlist', {
        productName: product?.name,
        productImage: product?.images[0],
        type: 'success',
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Cart Calculations
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const remainingForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  }, [cartTotal]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        cartTotal,
        cartItemCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
