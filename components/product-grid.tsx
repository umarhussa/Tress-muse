import { ProductCard } from "./product-card"

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

interface ProductGridProps {
  products: Product[]
  onQuickView?: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

export function ProductGrid({ products, onQuickView, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
