import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { ProductTagManager } from "@/components/admin/product-tag-manager"

export const dynamic = "force-dynamic"

export default async function AdminProductPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Fetch the product
  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Error</h1>
        <p className="text-red-600">Failed to load product: {error.message}</p>
        <Link href="/admin/products" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    )
  }

  // Extract metadata or provide defaults
  const metadata = product.metadata || {}
  const initialTags = {
    isPremium: !!metadata.isPremium,
    isBestSeller: !!metadata.isBestSeller,
    isFeatured: !!metadata.isFeatured,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product: {product.name}</h1>
        <Link href="/admin/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Preview */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Product Preview</h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              {product.image_url ? (
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 mt-4">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Product Tags */}
        <div className="md:col-span-1">
          <ProductTagManager productId={product.id} initialTags={initialTags} />
        </div>
      </div>
    </div>
  )
}
