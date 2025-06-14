"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import type { CartItem } from "@/lib/supabase"
import toast from "react-hot-toast"

type CartContextType = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "id">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("tressmuse_cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("tressmuse_cart", JSON.stringify(items))
  }, [items])

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === newItem.name)

      if (existingItem) {
        return prevItems.map((item) =>
          item.name === newItem.name ? { ...item, quantity: item.quantity + newItem.quantity } : item,
        )
      } else {
        const id = Date.now() + Math.random()
        return [...prevItems, { ...newItem, id }]
      }
    })

    toast.success(`${newItem.quantity} × ${newItem.name} added to cart!`)
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    toast.success("Item removed from cart")
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    toast.success("Cart cleared")
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
