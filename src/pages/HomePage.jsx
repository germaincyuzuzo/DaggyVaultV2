import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { FadeIn } from '../components/FadeIn.jsx'

const SLIDE_INTERVAL = 4500

const slideItems = ['Clothing', 'Shoes', 'Accessories'].map((cat) =>
  products.find((p) => p.category === cat),
)

function CategorySlideshow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setActive((i) => (i + 1) % slideItems.length), [])
  const prev = () => setActive((i) => (i - 1 + slideItems.length) % slideItems.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  const slide = slideItems[active]

  return (
    <section
      className="overflow-hidden bg-[#111111]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex min-h-[560px] flex-col sm:flex-row">
        {/* Image panel */}
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
          <div className="absolute inset-y-0 right-0 w-1 bg-[#E10600]" />
        </div>

        {/* Content panel */}
        <div className="flex flex-1 flex-col justify-between p-8 sm:p-12">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#E10600]/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#E10600]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
            {slide.category}
          </span>

          <div className="mt-6">
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              {slide.name}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {slide.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold text-white">${slide.price}</span>
              <Link
                to={`/products/${slide.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#E10600] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-[#c20000] hover:scale-105 active:scale-95"
              >
                View piece <span>→</span>
              </Link>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex gap-2">
              {slideItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-[#E10600]' : 'w-1.5 bg-neutral-600 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-all duration-200 hover:border-[#E10600] hover:text-[#E10600]"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-all duration-200 hover:border-[#E10600] hover:text-[#E10600]"
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

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-14">
        {/* ── Hero ── */}
        <section className="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div>
            <FadeIn delay={0}>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#E10600]">
                In-store curated pieces
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className="mt-3 font-display text-4xl tracking-tight text-[#111111] sm:text-5xl">
                A modern showroom for{' '}
                <span className="bg-gradient-to-r from-[#E10600] to-[#111111] bg-clip-text text-transparent">
                  effortless style
                </span>
                .
              </h1>
            </FadeIn>
            <FadeIn delay={160}>
              <p className="mt-4 max-w-xl text-sm text-neutral-600 sm:text-base">
                Discover a rotating selection of clothing, shoes, and accessories available to try
                on in-store. Browse the pieces on our rails and place your order directly via
                WhatsApp.
              </p>
            </FadeIn>
            <FadeIn delay={240}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-full bg-[#E10600] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#c20000] hover:scale-105 active:scale-95"
                >
                  Browse the collection
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-[#111111] transition-all duration-200 hover:border-[#E10600] hover:text-[#E10600]"
                >
                  Explore categories
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>All pieces are available in-store</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#25D366]/10 px-2 py-1 text-[11px] font-semibold text-[#128C7E]">
                  WhatsApp-only checkout
                </span>
              </div>
            </FadeIn>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── Categories ── */}
        <section id="categories" className="mt-20">
          <FadeIn>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#111111]">
                Explore by category
              </h2>
              <Link
                to="/products"
                className="text-sm font-bold text-[#E10600] underline underline-offset-4 transition-colors hover:text-[#c20000]"
              >
                View full collection
              </Link>
            </div>
          </FadeIn>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.filter((c) => c !== 'All').map((category, i) => (
              <FadeIn key={category} delay={i * 100}>
                <Link
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="group flex flex-col gap-3 overflow-hidden rounded-xl bg-[#111111] px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                    Category
                  </p>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">
                    {category}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Curated {category.toLowerCase()} pieces, ready to try in-store.
                  </p>
                  <span className="mt-auto inline-flex items-center text-xs font-bold text-[#E10600]">
                    Browse {category.toLowerCase()}
                    <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
