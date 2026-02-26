import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { FadeIn } from './FadeIn.jsx'

export function ProductCard({ product, delay = 0 }) {
  const { addToCart } = useCart()

  return (
    <FadeIn delay={delay}>
      <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        <Link to={`/products/${product.id}`} className="relative block overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          {product.inStore && (
            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#E10600] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-sm">
              In Store
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col gap-3 px-4 py-4">
          <div>
            <h3 className="font-medium tracking-tight text-[#111111]">
              <Link
                to={`/products/${product.id}`}
                className="transition-colors hover:text-[#E10600]"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
              {product.category}
            </p>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <p className="font-bold text-[#111111]">${product.price.toFixed(2)}</p>
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center gap-1 rounded-full bg-[#E10600] px-3 py-1.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#c20000] hover:scale-105 active:scale-95"
            >
              <span className="text-base leading-none">+</span>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}
