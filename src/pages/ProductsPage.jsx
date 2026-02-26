import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CATEGORIES, products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { FadeIn } from '../components/FadeIn.jsx'

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
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <FadeIn>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#E10600]">
              Collection
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
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
                className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                  cat === category
                    ? 'border-[#E10600] bg-[#E10600] text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#E10600] hover:text-[#E10600]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>
      </FadeIn>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 80} />
        ))}
      </section>
    </div>
  )
}
