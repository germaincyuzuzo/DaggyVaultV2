import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products.js'
import { useCart } from '../hooks/useCart.js'
import { FadeIn } from '../components/FadeIn.jsx'

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
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#E10600] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#c20000]"
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
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <FadeIn delay={0}>
          <div className="overflow-hidden rounded-2xl bg-neutral-100 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Link
                to="/products"
                className="inline-flex items-center text-xs font-medium text-neutral-400 transition-colors hover:text-[#E10600]"
              >
                <span className="mr-1 text-sm">←</span> Back to collection
              </Link>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E10600]">
                {product.category}
              </p>
              <h1 className="font-display text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <p className="max-w-xl text-sm text-neutral-600">{product.description}</p>

            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-[#111111]">${product.price.toFixed(2)}</p>
              {product.inStore && (
                <span className="inline-flex items-center rounded-full bg-[#E10600] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  In Store
                </span>
              )}
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Available sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                        size === selectedSize
                          ? 'border-[#E10600] bg-[#E10600] text-white'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#E10600] hover:text-[#E10600]'
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
                className="inline-flex items-center justify-center rounded-full bg-[#E10600] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#c20000] hover:scale-105 active:scale-95"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-[#111111] transition-all duration-200 hover:border-[#E10600] hover:text-[#E10600]"
              >
                View cart
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
