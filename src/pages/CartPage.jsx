import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { FadeIn } from '../components/FadeIn.jsx'

export function CartPage() {
  const navigate = useNavigate()
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart()

  const hasItems = items.length > 0

  const handleQuantityChange = (id, size, value) => {
    const qty = Number(value)
    if (Number.isNaN(qty) || qty < 1) return
    updateQuantity(id, size, qty)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <FadeIn>
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#E10600]">
              Your selection
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111111]">
              Cart
            </h1>
          </div>
          {hasItems && (
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="inline-flex items-center justify-center rounded-full bg-[#E10600] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#c20000] hover:scale-105 active:scale-95"
            >
              Proceed to checkout
            </button>
          )}
        </header>
      </FadeIn>

      {!hasItems ? (
        <FadeIn delay={100}>
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center">
            <p className="text-sm text-neutral-500">
              Your cart is empty. Explore the collection to discover your next piece.
            </p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#E10600] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#c20000]"
            >
              Browse collection
            </Link>
          </div>
        </FadeIn>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-4">
            {items.map((item, i) => (
              <FadeIn key={`${item.id}-${item.selectedSize ?? 'nosize'}`} delay={i * 70}>
                <div className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-neutral-100 transition-shadow hover:shadow-md">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-2 text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-[#111111]">{item.name}</p>
                        {item.selectedSize && (
                          <p className="mt-0.5 text-xs text-neutral-500">
                            Size:{' '}
                            <span className="font-medium text-[#111111]">{item.selectedSize}</span>
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-xs text-neutral-400 transition-colors hover:text-[#E10600]"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-neutral-500" htmlFor={`qty-${item.id}`}>
                          Qty
                        </label>
                        <input
                          id={`qty-${item.id}`}
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, item.selectedSize, e.target.value)
                          }
                          className="w-16 rounded-full border border-neutral-200 px-3 py-1 text-xs text-[#111111] focus:border-[#E10600] focus:outline-none"
                        />
                      </div>
                      <p className="font-bold text-[#111111]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={80}>
            <aside className="space-y-5 rounded-xl bg-[#111111] p-6 shadow-sm">
              <h2 className="text-sm font-bold tracking-tight text-white">Summary</h2>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Total</span>
                <span className="text-2xl font-bold text-[#E10600]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Checkout happens via WhatsApp. We&apos;ll confirm availability and pickup or
                delivery details with you.
              </p>
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#E10600] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#c20000] hover:scale-[1.02] active:scale-95"
              >
                Proceed to checkout
              </button>
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-700 px-5 py-2.5 text-xs font-medium text-neutral-300 transition-all duration-200 hover:border-[#E10600] hover:text-[#E10600]"
              >
                Continue browsing
              </Link>
            </aside>
          </FadeIn>
        </div>
      )}
    </div>
  )
}
