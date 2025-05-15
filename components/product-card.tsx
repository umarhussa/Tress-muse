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

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onQuickView, onAddToCart }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  const { id, name, description, price, image_url, metadata } = product
  const isPremium = metadata?.premium || false
  const isBestSeller = metadata?.bestSeller || false

  // Handle image URLs
  const imageUrl = image_url || "/placeholder.svg?height=400&width=400"

  // Truncate description for card display
  const shortDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description

  return (
    <div
      className={`group overflow-hidden transition-all duration-300 hover:shadow-lg border rounded-lg ${
        isPremium ? "border-amber-200" : isBestSeller ? "border-purple-200" : "border-gray-200"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        {/* Product image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            {onQuickView && (
              <button
                className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
                onClick={() => onQuickView(product)}
              >
                Quick View
              </button>
            )}
            {onAddToCart && (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isPremium && (
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
              PREMIUM
            </span>
          )}
          {isBestSeller && (
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              BEST SELLER
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${id}`} className="hover:underline">
          <h3
            className={`font-semibold text-lg ${
              isPremium ? "text-amber-700" : isBestSeller ? "text-purple-700" : "text-gray-900"
            }`}
          >
            {name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{shortDescription}</p>

        <div className="mt-3 flex justify-between items-center">
          <div
            className={`font-bold ${isPremium ? "text-amber-600" : isBestSeller ? "text-purple-600" : "text-gray-900"}`}
          >
            ${price.toFixed(2)}
          </div>

          {onAddToCart && (
            <button
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                isPremium
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-white"
                  : isBestSeller
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-blue-600 text-white"
              }`}
              onClick={() => onAddToCart(product)}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
