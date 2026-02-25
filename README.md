## Daggy Vault – Boutique Showroom (React + Vite)

A lightweight, **frontend-only** showroom for in-store clothing and shoes, built with **React, Vite, React Router, and Tailwind CSS**. Customers can browse products, manage a cart stored in `localStorage`, and send their order via **WhatsApp** to the store admin. No backend, no database, no authentication, and no payments are included.

### Tech stack

- **React (Vite)**
- **React Router** for page navigation
- **Tailwind CSS** for styling
- **localStorage** for cart persistence

### Project structure

- `src/components/` – shared UI components (e.g. `Layout`, `ProductCard`)
- `src/pages/` – route-level pages:
  - `HomePage` – hero, featured products, categories
  - `ProductsPage` – grid view with category filters
  - `ProductDetailPage` – large image, description, sizes, add to cart
  - `CartPage` – cart items, quantity controls, remove, totals
  - `CheckoutPage` – customer form and WhatsApp checkout
- `src/context/` – `CartContext` provider for global cart state
- `src/hooks/` – `useCart` hook
- `src/data/` – `products.js` sample product dataset
- `src/utils/` – `whatsapp.js` helper to build and open the WhatsApp order URL

### Changing the admin WhatsApp number

1. Open `src/utils/whatsapp.js`.
2. Update the `ADMIN_PHONE` constant:

```js
const ADMIN_PHONE = '1234567890' // no + sign, spaces, or dashes
```

- Use your full international number without `+` (e.g. `2348012345678`).
- The app will automatically use this number when opening `https://wa.me/<ADMIN_PHONE>?text=<ENCODED_MESSAGE>`.

### WhatsApp order format

When the user submits checkout, the app generates a message like:

```text
Hello, I would like to place an order:

Name: Jane Doe
Phone: +2348012345678
Address: 123 Boutique Street, Lagos

Order:
1. Velvet Midnight Midi Dress | Size: M - Qty: 2 - Price: $240
2. Nude Strappy Block Heels | Size: 39 - Qty: 1 - Price: $80

Total: $320

Please confirm availability.
```

The message is **URL-encoded** and opened in a new tab/window via:

```js
https://wa.me/<ADMIN_PHONE>?text=<ENCODED_MESSAGE>
```

### Cart behaviour

- Cart items are stored in `localStorage` under the key `daggyvault_cart`.
- Cart is **auto-loaded** when the app starts.
- Quantities can be adjusted on the `Cart` page.
- When checkout is submitted and WhatsApp is opened, the cart is **cleared**.

### Running locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Building for production

```bash
npm run build
```

This creates a static production bundle in the `dist/` folder that can be deployed to any static host (Netlify, Vercel, etc.).

### Deploying as a static site

#### Netlify

1. Push this project to GitHub (or any Git provider).
2. In Netlify, create a **New site from Git**.
3. Select your repo.
4. Use:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy.

#### Vercel

1. Push this project to GitHub (or GitLab/Bitbucket).
2. In Vercel, click **New Project** and import the repo.
3. Framework preset: **Vite** (or auto-detected).
4. Use:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
5. Deploy.

No extra server configuration is required – the app is completely static.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
