import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products.js'
import { useCart } from '../hooks/useCart.js'

export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = useMemo(() => products.find((p) => p.id === id), [id])
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? '')

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-16 text-center">
        <p className="text-sm text-neutral-500">This piece is no longer on our rails.</p>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Back to collection
        </button>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product, 1, selectedSize || null)
    navigate('/cart')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-3xl bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Link
              to="/products"
              className="inline-flex items-center text-xs font-medium text-neutral-500 hover:text-neutral-800"
            >
              <span className="mr-1 text-sm">←</span> Back to collection
            </Link>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              {product.category}
            </p>
            <h1 className="font-display text-3xl tracking-tight text-neutral-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <p className="max-w-xl text-sm text-neutral-600">{product.description}</p>

          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold text-neutral-900">
              ${product.price.toFixed(2)}
            </p>
            {product.inStore && (
              <span className="inline-flex items-center rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
                In Store
              </span>
            )}
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Available sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      size === selectedSize
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-700 hover:text-brand-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:border-brand-700 hover:text-brand-800"
            >
              View cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
