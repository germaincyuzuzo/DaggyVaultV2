import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { openWhatsAppWithOrder } from '../utils/whatsapp.js'
import { FadeIn } from '../components/FadeIn.jsx'

const inputClass =
  'w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm text-[#111111] transition-colors focus:border-[#E10600] focus:outline-none focus:ring-1 focus:ring-[#E10600]/20'

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
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <FadeIn>
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#E10600]">
              WhatsApp checkout
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111111]">
              Checkout
            </h1>
          </div>
          <Link
            to="/cart"
            className="text-xs font-medium text-neutral-400 underline underline-offset-4 transition-colors hover:text-[#E10600]"
          >
            Back to cart
          </Link>
        </header>
      </FadeIn>

      {!hasItems ? (
        <FadeIn delay={100}>
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center">
            <p className="text-sm text-neutral-500">
              Your cart is empty. Add a few pieces to your cart before checking out.
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
          <FadeIn>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100"
            >
              {/* Contact details */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E10600]">
                  Contact details
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-neutral-600">
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-medium text-neutral-600">
                      Phone number (WhatsApp) *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery options */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-neutral-600">
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-600">
                    Delivery or pickup
                  </label>
                  <div className="flex gap-3 text-xs">
                    {['delivery', 'pickup'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, pickupOption: opt }))}
                        className={`flex-1 rounded-xl border px-3 py-2.5 font-bold capitalize transition-all duration-200 ${
                          form.pickupOption === opt
                            ? 'border-[#E10600] bg-[#E10600] text-white'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#E10600] hover:text-[#E10600]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {form.pickupOption === 'delivery' && (
                <div className="space-y-1.5">
                  <label htmlFor="address" className="text-xs font-medium text-neutral-600">
                    Delivery address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className={inputClass}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="notes" className="text-xs font-medium text-neutral-600">
                  Additional notes (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Preferred timing, fit questions, colour preferences..."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#128C7E] hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
              >
                {submitting ? 'Opening WhatsApp…' : 'Send order via WhatsApp'}
              </button>
              <p className="text-xs text-neutral-400">
                Tapping &ldquo;Send order&rdquo; will open WhatsApp with a pre-filled message
                containing your order details. You can review and edit before sending.
              </p>
            </form>
          </FadeIn>

          <FadeIn delay={120}>
            <aside className="sticky top-24 space-y-5 rounded-xl bg-[#111111] p-6 shadow-sm">
              <h2 className="text-sm font-bold tracking-tight text-white">Order summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize ?? 'nosize'}`}
                    className="flex gap-3"
                  >
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      {item.selectedSize && (
                        <p className="text-[11px] text-neutral-500">Size {item.selectedSize}</p>
                      )}
                      <p className="mt-1 text-xs text-neutral-400">
                        Qty {item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                <span className="text-sm text-neutral-400">Total</span>
                <span className="text-2xl font-bold text-[#E10600]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </aside>
          </FadeIn>
        </div>
      )}
    </div>
  )
}
