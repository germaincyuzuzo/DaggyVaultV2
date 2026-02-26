import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'

const SLIDE_INTERVAL = 4000

// One item per category for the slideshow
const slideItems = ['Clothing', 'Shoes', 'Accessories'].map((cat) =>
  products.find((p) => p.category === cat),
)

function CategorySlideshow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(
    () => setActive((i) => (i + 1) % slideItems.length),
    [],
  )
  const prev = () => setActive((i) => (i - 1 + slideItems.length) % slideItems.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  const slide = slideItems[active]

  return (
    <section
      className="overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex min-h-[520px] flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-72 w-full overflow-hidden sm:h-auto sm:w-1/2">
          {slideItems.map((item, i) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Red overlay strip */}
          <div className="absolute inset-y-0 right-0 w-1 bg-red-600" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
          {/* Top badge */}
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-red-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-red-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            {slide.category}
          </span>

          {/* Slide text */}
          <div className="mt-6">
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {slide.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {slide.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-bold text-red-500">${slide.price}</span>
              <Link
                to={`/products/${slide.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                View piece <span>→</span>
              </Link>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center gap-4">
            {/* Dots */}
            <div className="flex gap-2">
              {slideItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-6 bg-red-600' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="ml-auto flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition hover:border-red-600 hover:text-red-500"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition hover:border-red-600 hover:text-red-500"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  const featured = products.filter((p) => p.featured)

  return (
    <div>
      <CategorySlideshow />

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
    </div>
  )
}
