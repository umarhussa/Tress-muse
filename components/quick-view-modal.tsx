"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  metadata?: {
    premium?: boolean
    bestSeller?: boolean
    featured?: boolean
  }
}

interface QuickViewModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart?: (product: Product, quantity: number) => void
}

export function QuickViewModal({ product, open, onOpenChange, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)

  if (!product || !open) return null

  const { id, name, description, price, image_url, metadata } = product
  const isPremium = metadata?.premium || false
  const isBestSeller = metadata?.bestSeller || false

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (onAddToCart && product) {
      onAddToCart(product, quantity)
      onOpenChange(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={image_url || "/placeholder.svg?height=500&width=500"}
              alt={name}
              fill
              className="object-cover"
            />

            {/* Premium Badge */}
            {isPremium && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-bold px-3 py-1 rounded-full">
                PREMIUM
              </div>
            )}

            {/* Best Seller Badge */}
            {isBestSeller && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-3 py-1 rounded-full">
                BEST SELLER
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>

            <div className="mb-4">
              <span className={`text-xl font-bold ${isPremium ? "text-amber-600" : "text-gray-900"}`}>
                ${price.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{description}</p>

            {/* Premium Features */}
            {isPremium && (
              <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-700 mb-2">Premium Product Benefits:</h3>
                <ul className="list-disc list-inside text-amber-700 space-y-1">
                  <li>Exclusive formulation</li>
                  <li>Premium ingredients</li>
                  <li>Extended warranty</li>
                  <li>Priority customer support</li>
                </ul>
              </div>
            )}

            {/* Best Seller Features */}
            {isBestSeller && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-700 mb-2">Why This Is a Best Seller:</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>Highly rated by customers</li>
                  <li>Consistent quality</li>
                  <li>Excellent value for money</li>
                  <li>Proven results</li>
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-3 text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`py-3 px-6 rounded-lg font-bold text-white ${
                isPremium
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
                  : isBestSeller
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Add to Cart
            </button>

            {/* View Full Details Link */}
            <div className="text-center mt-4">
              <Link href={`/products/${id}`} className="text-blue-600 hover:underline">
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
