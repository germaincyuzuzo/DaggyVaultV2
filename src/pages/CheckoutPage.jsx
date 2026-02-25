import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { openWhatsAppWithOrder } from '../utils/whatsapp.js'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pickupOption: 'delivery',
    notes: '',
  })

  const hasItems = items.length > 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!hasItems) return
    if (!form.name || !form.phone || (form.pickupOption === 'delivery' && !form.address)) {
      return
    }
    setSubmitting(true)

    const payload = {
      customer: form,
      cart: items,
      total: totalPrice,
    }

    openWhatsAppWithOrder(payload)
    clearCart()
    setSubmitting(false)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">WhatsApp checkout</p>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-neutral-900">Checkout</h1>
        </div>
        <Link
          to="/cart"
          className="text-xs font-medium text-neutral-500 hover:text-neutral-800 underline underline-offset-4"
        >
          Back to cart
        </Link>
      </header>

      {!hasItems ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-white p-8 text-center">
          <p className="text-sm text-neutral-500">
            Your cart is empty. Add a few pieces to your cart before checking out.
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
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200/80"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Contact details
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs text-neutral-600">
                    Full name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-800 focus:border-brand-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs text-neutral-600">
                    Phone number (WhatsApp) *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-800 focus:border-brand-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs text-neutral-600">
                  Email (optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-800 focus:border-brand-700 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-600">Delivery or pickup</label>
                <div className="flex gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, pickupOption: 'delivery' }))}
                    className={`flex-1 rounded-xl border px-3 py-2 font-medium transition ${
                      form.pickupOption === 'delivery'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-700 hover:text-brand-800'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, pickupOption: 'pickup' }))}
                    className={`flex-1 rounded-xl border px-3 py-2 font-medium transition ${
                      form.pickupOption === 'pickup'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-700 hover:text-brand-800'
                    }`}
                  >
                    Pickup
                  </button>
                </div>
              </div>
            </div>

            {form.pickupOption === 'delivery' && (
              <div className="space-y-1.5">
                <label htmlFor="address" className="text-xs text-neutral-600">
                  Delivery address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-800 focus:border-brand-700 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="notes" className="text-xs text-neutral-600">
                Additional notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Preferred timing, fit questions, colour preferences..."
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-800 focus:border-brand-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#128C7E] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Opening WhatsApp…' : 'Send order via WhatsApp'}
            </button>
            <p className="text-xs text-neutral-500">
              Tapping &ldquo;Send order&rdquo; will open WhatsApp with a pre-filled message
              containing your order details. You can review and edit the message before sending.
            </p>
          </form>

          <aside className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/80">
            <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
              Order summary
            </h2>
            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize ?? 'nosize'}`} className="flex gap-3">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-neutral-900">{item.name}</p>
                    {item.selectedSize && (
                      <p className="text-[11px] text-neutral-500">Size {item.selectedSize}</p>
                    )}
                    <p className="mt-1 text-xs text-neutral-600">
                      Qty {item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-neutral-500">Total</span>
              <span className="text-lg font-semibold text-neutral-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
