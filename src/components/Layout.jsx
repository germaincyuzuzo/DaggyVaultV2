import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

export function Layout() {
  const { itemCount } = useCart()

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-brand-800 text-white flex items-center justify-center font-semibold tracking-tight">
              DV
            </span>
            <div className="leading-none">
              <div className="font-display text-lg tracking-tight">Daggy Vault</div>
              <div className="text-xs text-neutral-500 uppercase tracking-[0.2em]">
                Boutique Showroom
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-brand-700 transition-colors ${isActive ? 'text-brand-700' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `hover:text-brand-700 transition-colors ${isActive ? 'text-brand-700' : ''}`
              }
            >
              Collection
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-1 hover:text-brand-700 transition-colors ${
                  isActive ? 'text-brand-700' : ''
                }`
              }
            >
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-800 px-1 text-[11px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-neutral-200 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Daggy Vault. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="font-medium text-neutral-700">WhatsApp Orders Only</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/10 px-2 py-1 text-[11px] font-semibold text-[#128C7E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              Online
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
