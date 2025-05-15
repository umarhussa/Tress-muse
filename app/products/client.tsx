"use client"

import { useState } from "react"
import { ProductFilter } from "@/components/product-filter"
import { ProductGrid } from "@/components/product-grid"
import { QuickViewModal } from "@/components/quick-view-modal"

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

interface ProductsClientProps {
  initialProducts: Product[]
  categories: string[]
  initialFilters: any
}

export function ProductsClient({ initialProducts, categories, initialFilters }: ProductsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product)
    setQuickViewOpen(true)
  }

  const handleAddToCart = (product: Product) => {
    // In a real app, this would add the product to the cart
    console.log("Added to cart:", product.name)
    // You could show a toast notification here
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar with filters */}
      <div className="md:col-span-1">
        <ProductFilter categories={categories} initialFilters={initialFilters} onFilterChange={() => {}} />
      </div>

      {/* Main content with products */}
      <div className="md:col-span-3">
        <ProductGrid products={initialProducts} onQuickView={handleQuickView} onAddToCart={handleAddToCart} />
      </div>

      {/* Quick view modal */}
      <QuickViewModal
        product={selectedProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
