import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { FREE_SHIPPING_FROM, PRODUCTS, SHIPPING_METHODS } from '../data'

const STORAGE_KEY = 'matu.cart.v1'
const MAX_QTY = 99

const CartContext = createContext(null)

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // drop anything that no longer exists in the catalogue
    return parsed
      .filter((line) => PRODUCTS.some((p) => p.id === line.id))
      .map((line) => ({ id: line.id, qty: Math.min(MAX_QTY, Math.max(1, ~~line.qty)) }))
  } catch {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const found = state.find((line) => line.id === action.id)
      if (!found) return [...state, { id: action.id, qty: action.qty }]
      return state.map((line) =>
        line.id === action.id
          ? { ...line, qty: Math.min(MAX_QTY, line.qty + action.qty) }
          : line,
      )
    }
    case 'setQty': {
      if (action.qty <= 0) return state.filter((line) => line.id !== action.id)
      return state.map((line) =>
        line.id === action.id ? { ...line, qty: Math.min(MAX_QTY, action.qty) } : line,
      )
    }
    case 'remove':
      return state.filter((line) => line.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, read)
  const [open, setOpen] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* private mode — the cart just won't survive a reload */
    }
  }, [lines])

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = PRODUCTS.find((p) => p.id === line.id)
          return product ? { ...product, qty: line.qty, total: product.price * line.qty } : null
        })
        .filter(Boolean),
    [lines],
  )

  const count = useMemo(() => items.reduce((n, item) => n + item.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((n, item) => n + item.total, 0), [items])

  const add = useCallback((id, qty = 1) => {
    dispatch({ type: 'add', id, qty })
    setLastAdded({ id, at: Date.now() })
    setOpen(true)
  }, [])

  const setQty = useCallback((id, qty) => dispatch({ type: 'setQty', id, qty }), [])
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const shippingFor = useCallback(
    (methodId) => {
      if (subtotal >= FREE_SHIPPING_FROM) return 0
      return SHIPPING_METHODS.find((m) => m.id === methodId)?.price ?? 0
    },
    [subtotal],
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      lastAdded,
      add,
      setQty,
      remove,
      clear,
      shippingFor,
      freeShippingFrom: FREE_SHIPPING_FROM,
      missingForFreeShipping: Math.max(0, FREE_SHIPPING_FROM - subtotal),
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      checkingOut,
      startCheckout: () => {
        setOpen(false)
        setCheckingOut(true)
      },
      endCheckout: () => setCheckingOut(false),
    }),
    [items, count, subtotal, lastAdded, add, setQty, remove, clear, shippingFor, open, checkingOut],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
