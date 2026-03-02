import { useState, useEffect } from 'react'
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

const mobileNavLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-white/10 text-[#E10600]' : 'text-neutral-300 hover:bg-white/10 hover:text-white'
  }`

export function Layout() {
  const { itemCount } = useCart()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastSlideshow, setPastSlideshow] = useState(false)

  useEffect(() => {
    const threshold = window.innerHeight * 0.65
    const handleScroll = () => setPastSlideshow(window.scrollY > threshold)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-[#111111] border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="h-9 w-9 rounded-full bg-[#E10600] text-white flex items-center justify-center font-bold text-sm tracking-tight">
              DV
            </span>
            <div
              className="hidden md:block leading-none overflow-hidden"
              style={{
                opacity: pastSlideshow ? 0 : 1,
                maxWidth: pastSlideshow ? '0px' : '200px',
                transform: pastSlideshow ? 'translateX(-12px)' : 'translateX(0px)',
                transition: 'opacity 0.4s ease, max-width 0.4s ease, transform 0.4s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <div className="font-display text-lg tracking-tight text-white">Daggy Vault</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em]">
                Boutique Showroom
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
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

          {/* Mobile: hamburger with cart badge overlay */}
          <div className="relative md:hidden">
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 z-10 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E10600] px-1 text-[9px] font-bold text-white pointer-events-none">
                {itemCount}
              </span>
            )}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#111111] px-4 pb-4">
            <nav className="flex flex-col gap-1 pt-2">
              <NavLink to="/" end className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/products" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
                Collection
              </NavLink>
              <NavLink to="/cart" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
                <span className="flex items-center gap-2">
                  Cart
                  {itemCount > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E10600] px-1 text-[10px] font-bold text-white">
                      {itemCount}
                    </span>
                  )}
                </span>
              </NavLink>
            </nav>
          </div>
        )}
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
