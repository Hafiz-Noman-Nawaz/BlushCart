# BlushCart — Mobile-First, Premium Pink & White E-Commerce Experience

**BlushCart** is an original, mobile-first retail house and frontend e-commerce experience crafted with intentional art direction, tactile micro-animations, and a signature origami-inspired shopping bag interaction.

Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**, BlushCart delivers a calm aesthetic centered around warm white and delicate blush accents, accompanied by rich client-side interactivity, fast non-blocking transitions, and full localStorage persistence.

---

## 🌸 The BlushCart Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Warm White | `#FFFCFA` | Primary background canvas |
| Pale Blush | `#F9DDE5` | Secondary surfaces, pill indicators |
| Soft Rose | `#EFA8BE` | Active accents, origami crease details |
| Rose Accent | `#D95F87` | Action highlights, star ratings |
| Deep Berry | `#59263D` | Primary typography and CTAs |
| Dark Text | `#332A2E` | Editorial body and titles |

---

## 📱 Mobile-First Interactions & Core Features

1. **Origami Paper-Unfolding Navigation Menu**:
   - Compact header with a hamburger icon that morphs into an **×**.
   - Side drawer enters with a 3D paper-unfolding animation (210ms) with layered crease shadows.
   - Dismissible via outside tap, keyboard ESC, or navigation.

2. **Signature Origami Shopping Cart Drawer**:
   - Unfolds from the right with layered 3D perspective folding geometry.
   - Interactive quantity counter, item removal, and live subtotal recalculation.
   - Real-time **Free Shipping & Origami Gift Box** progress bar ($60 threshold).
   - Instant promo code redemption (e.g. `BLUSH10` for $10 off, `ROSE15` for 15% off).
   - LocalStorage persistence across sessions.

3. **Multi-Page App Router Architecture**:
   - `/` — Homepage: Hero imagery, mood & ritual categories, bestsellers tabs, origami feature banner, and customer testimonials.
   - `/shop` — Full catalog with category filtering, price tiers, in-stock toggle, and sorting.
   - `/shop/[category]` — Category pages with editorial banners for beauty, fashion, home, tech, and gifts.
   - `/product/[slug]` — Product detail with multi-angle gallery, variant selection, accordion tabs, reviews, and sticky mobile add-to-bag bar.
   - `/cart` — Shopping bag with complimentary calligraphy gift note and ribbon choice.
   - `/checkout` — Checkout with contact info, shipping tiers, payment card simulator, and celebratory confetti.
   - `/account` — Patron VIP portal with order tracking, saved addresses, and gifting preferences.
   - `/about` — The story of Tokyo paper folding traditions meeting Parisian clean beauty.
   - `/contact` — Client concierge inquiry form with interactive FAQ accordion.
   - `/ai-shopping-assistant` — Private concierge consultation with bespoke product recommendations and styling guidance.

4. **Tactile Micro-Interactions**:
   - Heart pop animations on wishlist toggle.
   - Quick View modal for rapid product inspection.
   - Live Search with auto-completion and trending chips.
   - Non-intrusive toast notifications with smooth entrance.

---

## 🚀 Running Locally

Ensure you have **Node.js 18+** installed.

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# Navigate to http://localhost:3000
```

To create an optimized production build:

```bash
npm run build
npm start
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS & Vanilla CSS Design Tokens |
| Icons | Lucide React |
| Celebration Effects | Canvas Confetti |
| State Management | React Context with LocalStorage |

---

## 📐 Design Principles

- **Mobile-first** — Every component designed for 360px–390px first, then scaled up.
- **Touch-optimized** — Minimum 44×44px touch targets throughout.
- **Performance-first animations** — GPU-accelerated 3D transforms, 180–260ms transitions.
- **Accessibility** — High contrast ratios, focus-visible outlines, reduced-motion support.
- **No backend required** — Fully functional frontend prototype with mock data and client-side state.

---

## 📄 License

This project is a frontend design prototype.
