import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'daggyvault_cart'

function getInitialCart() {
  if (typeof window === 'undefined') return []
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart)

  // Persist to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('Failed to save cart to storage', err)
    }
  }, [items])

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      )
      if (existingIndex !== -1) {
        const copy = [...prev]
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity,
        }
        return copy
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedSize,
          quantity,
        },
      ]
    })
  }

  const removeFromCart = (id, selectedSize = null) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === selectedSize)))
  }

  const updateQuantity = (id, selectedSize, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => setItems([])

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { itemCount, totalPrice }
  }, [items])

  const value = {
    items,
    ...totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return ctx
}
