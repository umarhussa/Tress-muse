"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = "https://yvnsgflmivcotvmklzvw.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ProductList({ showProductDetails, showQuickView, addToCart, showNotification }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All Products")
  const [visibleProducts, setVisibleProducts] = useState(4)
  const [hasMoreProducts, setHasMoreProducts] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    // Check if there are more products to load
    setHasMoreProducts(products.length > visibleProducts)
  }, [products, visibleProducts])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("products").select("*")

      if (error) throw error

      setProducts(data || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error.message)
      setLoading(false)
    }
  }

  // Helper function to parse image URLs
  const parseImageUrls = (product) => {
    try {
      // Check if image_url is a JSON string containing multiple URLs
      if (product.image_url && product.image_url.startsWith("[")) {
        return JSON.parse(product.image_url)
      }
    } catch (e) {
      console.error("Error parsing image URLs:", e)
    }

    // Fallback to single image URL
    return [product.image_url]
  }

  // Helper function to extract metadata from description
  const extractMetadata = (description) => {
    if (!description) return null

    const metadataMatch = description.match(/<!-- METADATA:(.*?) -->/)
    if (metadataMatch && metadataMatch[1]) {
      try {
        return JSON.parse(metadataMatch[1])
      } catch (e) {
        console.error("Error parsing metadata:", e)
      }
    }
    return null
  }

  // Helper function to clean description (remove metadata)
  const cleanDescription = (description) => {
    if (!description) return ""
    return description.replace(/<!-- METADATA:.*? -->/, "").trim()
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    // Reset visible products when changing filter
    setVisibleProducts(4)
    // In a real app, you would filter products here
    showNotification("Products filtered", `Category selected: ${filter}`, "info")
  }

  const loadMore = () => {
    showNotification("Loading More", "Loading additional products...", "info")

    // Increase the number of visible products
    setVisibleProducts((prev) => prev + 4)

    // Simulate loading delay
    setTimeout(() => {
      showNotification("Products Loaded", "New products have been loaded!", "success")
    }, 1000)
  }

  // Get the products to display based on the current filter and visible count
  const getDisplayedProducts = () => {
    let filteredProducts = products

    // Apply category filter if not "All Products"
    if (activeFilter !== "All Products") {
      filteredProducts = products.filter((product) => {
        const metadata = extractMetadata(product.description)
        return metadata?.category === activeFilter
      })
    }

    // Return only the visible number of products
    return filteredProducts.slice(0, visibleProducts)
  }

  const displayedProducts = getDisplayedProducts()

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-conic from-pink-100 via-transparent to-orange-100 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 inline-block relative mx-auto">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
            Featured Products
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded"></span>
        </h2>

        {/* Product filter tabs */}
        <div className="flex justify-center mb-8 mt-6 overflow-x-auto scrollbar-hide">
          <div className="inline-flex rounded-full shadow-md bg-white p-1">
            {["All Products", "Shampoo", "Conditioner", "Styling", "Treatment"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeFilter === filter
                    ? "text-white bg-gradient-to-r from-pink-500 to-orange-400"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid with animation stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="animate-pulse bg-white rounded-2xl shadow-sm p-4 h-80"
                style={{ animationDelay: `${index * 0.1}s` }}
              ></div>
            ))
          ) : displayedProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          ) : (
            // Product cards
            displayedProducts.map((product, index) => {
              // Parse image URLs
              const imageUrls = parseImageUrls(product)
              const hasMultipleImages = imageUrls.length > 1
              const mainImageUrl = imageUrls[0]

              // Extract metadata
              const metadata = extractMetadata(product.description)
              const cleanedDescription = cleanDescription(product.description)

              // Get category from metadata
              const category = metadata?.category || "Hair Care"
              const isPremium = metadata?.premium === true
              const isBestSeller = metadata?.bestSeller === true

              return (
                <div
                  key={product.id || index}
                  className="product-card group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full overflow-hidden border border-gray-100 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => showProductDetails({ ...product, _parsedImageUrls: imageUrls })}
                >
                  {/* Premium badge */}
                  {isPremium && (
                    <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
                      PREMIUM
                    </div>
                  )}

                  {/* Best Seller badge */}
                  {isBestSeller && (
                    <div
                      className={`absolute ${isPremium ? "top-8" : "top-2"} left-2 z-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm`}
                    >
                      BEST SELLER
                    </div>
                  )}

                  {/* Shimmer effect overlay */}
                  <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                  {/* Product image */}
                  <div className="overflow-hidden relative group-hover:shadow-md transition-all duration-300">
                    <img
                      src={mainImageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="product-image w-full h-48 sm:h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {hasMultipleImages && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                        +{imageUrls.length - 1} more
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/0 to-orange-400/0 group-hover:from-pink-500/10 group-hover:to-orange-400/10 transition-all duration-300"></div>
                  </div>

                  {/* Product info */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-pink-500 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base flex-grow">
                      {cleanedDescription || "No description available."}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <span
                        className={`text-base sm:text-lg font-bold ${isPremium ? "text-amber-500" : "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400"}`}
                      >
                        {product.price}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          className="quick-view-btn bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-pink-500 p-2 rounded-full transition-colors duration-300 transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            showQuickView({ ...product, _parsedImageUrls: imageUrls })
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          className="add-to-cart-btn bg-pink-100 hover:bg-pink-200 text-pink-700 hover:text-pink-800 p-2 rounded-full transition-colors duration-300 transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart({ ...product, _parsedImageUrls: imageUrls })
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover reveal details */}
                  <div
                    className={`product-overlay absolute inset-x-0 bottom-0 ${isPremium ? "bg-gradient-to-t from-amber-500 to-yellow-400" : "bg-gradient-to-t from-pink-500 to-orange-400"} text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">{product.name}</h4>
                      <span className="font-bold">{product.price}</span>
                    </div>
                    <div className="flex space-x-2 mb-2">
                      <button
                        className="bg-white text-pink-500 hover:text-pink-600 p-2 rounded-full transition-colors duration-300 transform hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation()
                          showProductDetails({ ...product, _parsedImageUrls: imageUrls })
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        className="bg-white text-pink-500 hover:text-pink-600 p-2 rounded-full transition-colors duration-300 transform hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart({ ...product, _parsedImageUrls: imageUrls })
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Load more button - only show if there are more products to load */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="btn-hover px-6 py-3 bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium border border-gray-200 hover:border-pink-300 group"
            >
              <span className="relative z-10 flex items-center">
                <span>Load More</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
