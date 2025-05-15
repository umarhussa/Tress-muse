import { getProducts } from "@/lib/supabase"
import { ProductsClient } from "./client"

export const dynamic = "force-dynamic"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Convert search params to filter format
  const filters = {
    category: searchParams.category as string,
    premium: searchParams.premium === "true",
    bestSeller: searchParams.bestSeller === "true",
    featured: searchParams.featured === "true",
    sortBy: searchParams.sortBy as string,
    sortOrder: (searchParams.sortOrder as "asc" | "desc") || "desc",
  }

  // Fetch products with filters
  const products = await getProducts(filters)

  // Extract unique categories for filter dropdown
  const categories = Array.from(new Set(products.map((product) => product.category))).filter(Boolean) as string[]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

      <ProductsClient initialProducts={products} categories={categories} initialFilters={filters} />
    </div>
  )
}
