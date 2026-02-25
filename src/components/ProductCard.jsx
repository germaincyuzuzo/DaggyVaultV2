import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

export function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70 transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.inStore && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
            In Store
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        <div>
          <h3 className="font-medium tracking-tight text-neutral-900">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
            {product.category}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="font-semibold text-neutral-900">${product.price.toFixed(2)}</p>
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-800"
          >
            <span className="text-base leading-none">+</span>
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </article>
  )
}
