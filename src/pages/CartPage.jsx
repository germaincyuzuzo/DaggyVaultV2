import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

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
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Your selection</p>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-neutral-900">Cart</h1>
        </div>
        {hasItems && (
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
          >
            Proceed to checkout
          </button>
        )}
      </header>

      {!hasItems ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-white p-8 text-center">
          <p className="text-sm text-neutral-500">
            Your cart is empty. Explore the collection to discover your next piece.
          </p>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Browse collection
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize ?? 'nosize'}`}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200/70"
              >
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
                      <p className="font-medium text-neutral-900">{item.name}</p>
                      {item.selectedSize && (
                        <p className="mt-0.5 text-xs text-neutral-500">
                          Size: <span className="font-medium text-neutral-800">{item.selectedSize}</span>
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-xs text-neutral-400 hover:text-neutral-700"
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
                        className="w-16 rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-800 focus:border-brand-700 focus:outline-none"
                      />
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/80">
            <h2 className="text-sm font-semibold tracking-tight text-neutral-900">Summary</h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Total</span>
              <span className="text-lg font-semibold text-neutral-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Checkout happens via WhatsApp. We&apos;ll confirm availability and pickup or delivery
              details with you.
            </p>
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
            >
              Proceed to checkout
            </button>
            <Link
              to="/products"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-xs font-medium text-neutral-800 hover:border-brand-700 hover:text-brand-800"
            >
              Continue browsing
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
