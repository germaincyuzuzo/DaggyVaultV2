import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

const navLinkClass = ({ isActive }) =>
  `group relative py-1 text-sm font-medium transition-colors ${
    isActive ? 'text-[#E10600]' : 'text-neutral-300 hover:text-white'
  }`

const underline = (isActive) =>
  `absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-[#E10600] origin-left transition-transform duration-300 ${
    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
  }`

export function Layout() {
  const { itemCount } = useCart()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-[#111111] border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-[#E10600] text-white flex items-center justify-center font-bold text-sm tracking-tight">
              DV
            </span>
            <div className="leading-none">
              <div className="font-display text-lg tracking-tight text-white">Daggy Vault</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em]">
                Boutique Showroom
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Home
                  <span className={underline(isActive)} />
                </>
              )}
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Collection
                  <span className={underline(isActive)} />
                </>
              )}
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-1.5">
                    Cart
                    {itemCount > 0 && (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E10600] px-1 text-[10px] font-bold text-white">
                        {itemCount}
                      </span>
                    )}
                  </span>
                  <span className={underline(isActive)} />
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </header>

      {/* ── Page content with route fade transition ── */}
      <main className="flex-1">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#111111] border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-[#E10600] text-white flex items-center justify-center font-bold text-xs">
                DV
              </span>
              <div>
                <p className="text-white font-display font-medium">Daggy Vault</p>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest">
                  Boutique Showroom
                </p>
              </div>
            </div>
            <p className="text-neutral-500">
              © {new Date().getFullYear()} Daggy Vault. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">WhatsApp Orders Only</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/15 px-2 py-1 text-[10px] font-semibold text-[#25D366]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                Online
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
