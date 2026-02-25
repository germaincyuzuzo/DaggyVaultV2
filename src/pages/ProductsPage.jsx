import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CATEGORIES, products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'

function useCategoryFromQuery() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  return params.get('category') || 'All'
}

export function ProductsPage() {
  const initialCategory = useCategoryFromQuery()
  const [category, setCategory] = useState(initialCategory)

  const filtered = useMemo(() => {
    if (!category || category === 'All') return products
    return products.filter((p) => p.category === category)
  }, [category])

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Collection</p>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-neutral-900 sm:text-4xl">
            In-store selection
          </h1>
          <p className="mt-2 max-w-xl text-sm text-neutral-600">
            All pieces shown here are currently available in our physical showroom. Add favourites
            to your cart and send your order via WhatsApp to confirm availability.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                cat === category
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-700 hover:text-brand-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
