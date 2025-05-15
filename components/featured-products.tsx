import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface FeaturedProductsProps {
  title?: string
  subtitle?: string
}

export async function FeaturedProducts({
  title = "Featured Products",
  subtitle = "Discover our most popular hair care solutions",
}: FeaturedProductsProps) {
  // Fetch products with premium or best seller tags
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .or("metadata->isPremium.eq.true,metadata->isBestSeller.eq.true")
    .limit(4)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const isPremium = product.metadata?.isPremium
            const isBestSeller = product.metadata?.isBestSeller

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={`group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
                  isPremium ? "border border-amber-300" : isBestSeller ? "border border-blue-300" : ""
                }`}
              >
                <div className="relative aspect-square bg-gray-200">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Premium Badge */}
                  {isPremium && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                      PREMIUM
                    </div>
                  )}

                  {/* Best Seller Badge */}
                  {isBestSeller && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      BEST SELLER
                    </div>
                  )}
                </div>

                <div
                  className={`p-4 ${
                    isPremium
                      ? "bg-gradient-to-b from-amber-50 to-white"
                      : isBestSeller
                        ? "bg-gradient-to-b from-blue-50 to-white"
                        : ""
                  }`}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`font-bold ${
                        isPremium ? "text-amber-600" : isBestSeller ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      ${product.price.toFixed(2)}
                    </span>

                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">View Details →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
