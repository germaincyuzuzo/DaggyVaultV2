# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with HMR
npm run build    # Production build to dist/
npm run lint     # ESLint static analysis
npm run preview  # Preview production build locally
```

No test framework is configured.

## Project Overview

**DaggyVault V2** is a frontend-only boutique fashion showroom. Customers browse products, manage a cart, and submit orders via WhatsApp. There is no backend, no database, and no payment processing.

## Architecture

**Stack**: React 19 + Vite 7, React Router v7, Tailwind CSS v4, React Context API, browser localStorage.

### Routing (React Router v7)

All routes are wrapped by `Layout` (header with cart badge + footer):

```
/ → HomePage         (hero + featured products)
/products → ProductsPage   (filterable grid)
/products/:id → ProductDetailPage
/cart → CartPage
/checkout → CheckoutPage
```

### State Management

Global cart state lives in `CartContext.jsx` and persists to localStorage under the key `daggyvault_cart`. The context exposes: `addToCart(product, quantity, selectedSize)`, `removeFromCart(id, selectedSize)`, `updateQuantity(id, selectedSize, quantity)`, `clearCart()`, and computed `itemCount` / `totalPrice`.

Cart items are keyed by `id + selectedSize` — the same product in different sizes is treated as distinct line items.

### Data Layer

All product data is static in `src/data/products.js`. Product shape:

```js
{
  id, name, category, price, inStore, image,
  description, sizes, featured
}
```

Categories: `'Clothing'`, `'Shoes'`, `'Accessories'`.

### Checkout / WhatsApp Integration

`src/utils/whatsapp.js` builds and encodes an order message, then opens `https://wa.me/<ADMIN_PHONE>?text=<message>` in a new tab. The admin phone number (`ADMIN_PHONE`) is defined at the top of that file and is the only value that needs changing per-deployment. The cart is cleared after a successful checkout form submission.

### Styling

Tailwind CSS v4 with a custom brand palette (`brand-50` through `brand-900`, purple tones) defined in `tailwind.config.js`. Display headings use "Playfair Display" (serif); body uses system-ui. WhatsApp accent colors (`#25D366`, `#128C7E`) are used in the checkout flow.

ESLint uses the v9 flat config format (`eslint.config.js`).
