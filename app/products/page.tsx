"use client"

import { useProducts } from "@/lib/hooks/useProducts"
import Link from "next/link"

export default function ProductsPage() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌸</span>
              <h1 className="text-2xl font-bold text-gray-800">Tress Muse</h1>
            </Link>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌸</span>
              <h1 className="text-2xl font-bold text-gray-800">Tress Muse</h1>
            </Link>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌸</span>
            <h1 className="text-2xl font-bold text-gray-800">Tress Muse</h1>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>

        {products.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No products available yet.</p>
            <Link href="/add-product" className="text-purple-600 hover:underline">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-100"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                    <div className="flex space-x-2">
                      {product.phone && (
                        <a
                          href={`tel:${product.phone}`}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Call
                        </a>
                      )}
                      {product.whatsapp && (
                        <a
                          href={`https://wa.me/${product.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
