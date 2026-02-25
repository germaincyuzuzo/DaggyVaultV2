import { Link } from 'react-router-dom'
import { CATEGORIES, products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'

export function HomePage() {
  const featured = products.filter((p) => p.featured)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <section className="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            In-store curated pieces
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-neutral-900 sm:text-5xl">
            A modern showroom for{' '}
            <span className="bg-gradient-to-r from-brand-700 to-neutral-900 bg-clip-text text-transparent">
              effortless style
            </span>
            .
          </h1>
          <p className="mt-4 max-w-xl text-sm text-neutral-600 sm:text-base">
            Discover a rotating selection of clothing, shoes, and accessories available to try on
            in-store. Browse the pieces that are currently on our rails and place your order
            directly via WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
            >
              Browse the collection
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:border-brand-700 hover:text-brand-800"
            >
              Explore categories
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>All pieces are available in-store</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-[#25D366]/10 px-2 py-1 text-[11px] font-semibold text-[#128C7E]">
                WhatsApp-only checkout
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="categories" className="mt-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl tracking-tight text-neutral-900">Explore by focus</h2>
          <Link
            to="/products"
            className="text-sm font-medium text-brand-800 hover:text-brand-700 underline underline-offset-4"
          >
            View full collection
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.filter((c) => c !== 'All').map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="group relative overflow-hidden rounded-2xl bg-white px-4 py-6 shadow-sm ring-1 ring-neutral-200/80 transition hover:-translate-y-1 hover:ring-brand-200"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Category
              </p>
              <h3 className="mt-2 font-display text-lg tracking-tight text-neutral-900">
                {category}
              </h3>
              <p className="mt-2 text-xs text-neutral-500">
                Curated pieces within our {category.toLowerCase()} selection, ready to try in-store.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand-800">
                Browse {category.toLowerCase()}
                <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
