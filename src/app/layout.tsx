import type { Metadata, Viewport } from "next";
import React, { Suspense } from "react";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import OrigamiCartDrawer from "@/components/OrigamiCartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import SearchModal from "@/components/SearchModal";
import ToastContainer from "@/components/ToastContainer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BlushCart — Premium Pink & White Modern Retail Experience",
  description: "An original mobile-first e-commerce house crafting daily rituals in beauty, cloud cashmere, home sanctuary, and hand-folded origami gift packaging.",
  keywords: ["blushcart", "clean beauty", "cashmere", "origami gifts", "sustainable lifestyle", "pink aesthetic"],
  openGraph: {
    title: "BlushCart — Premium Pink & White Modern Retail Experience",
    description: "Curated rituals in beauty, soft-touch fashion, home living, and signature origami packaging.",
    siteName: "BlushCart",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFCFA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FFFCFA] text-[#332A2E] antialiased selection:bg-[#F9DDE5] selection:text-[#59263D]">
        <StoreProvider>
          <Suspense fallback={<div className="h-16 w-full bg-[#FFFCFA]" />}>
            <Navbar />
            <MobileMenu />
          </Suspense>
          <OrigamiCartDrawer />
          <QuickViewModal />
          <SearchModal />
          <ToastContainer />

          <main className="flex-1 w-full">{children}</main>

          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
