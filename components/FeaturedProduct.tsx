"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = "https://yvnsgflmivcotvmklzvw.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function FeaturedProduct({ addToCart }) {
  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    fetchFeaturedProduct()
  }, [])

  const fetchFeaturedProduct = async () => {
    try {
      setLoading(true)
      // Query for premium products first
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      if (error) throw error

      // Find a premium product if available
      let featured = null

      if (data && data.length > 0) {
        // Try to find a best seller product first
        for (const product of data) {
          try {
            const metadata = extractMetadata(product.description)
            if (metadata && metadata.bestSeller === true) {
              featured = product
              break
            }
          } catch (e) {
            console.error("Error parsing metadata:", e)
          }
        }

        // If no best seller found, try to find a premium product
        if (!featured) {
          for (const product of data) {
            try {
              const metadata = extractMetadata(product.description)
              if (metadata && metadata.premium === true) {
                featured = product
                break
              }
            } catch (e) {
              console.error("Error parsing metadata:", e)
            }
          }
        }

        // If no premium product found, use the first product
        if (!featured) {
          featured = data[0]
        }

        // Parse image URLs
        if (featured) {
          try {
            if (featured.image_url && featured.image_url.startsWith("[")) {
              featured._parsedImageUrls = JSON.parse(featured.image_url)
            } else {
              featured._parsedImageUrls = [featured.image_url]
            }
          } catch (e) {
            console.error("Error parsing image URLs:", e)
            featured._parsedImageUrls = [featured.image_url]
          }
        }
      }

      setFeaturedProduct(featured)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching featured product:", error.message)
      setLoading(false)
    }
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

  // If no featured product is found, use a default one
  const defaultProduct = {
    name: "Revitalizing Hair Serum",
    price: "$49.99",
    image_url: "/placeholder.svg?height=600&width=600",
    description:
      "Our revolutionary hair serum combines the power of natural oils and advanced technology to transform dry, damaged hair into silky, vibrant locks. Experience the difference with just a few drops daily.",
    _parsedImageUrls: ["/placeholder.svg?height=600&width=600"],
  }

  const product = featuredProduct || defaultProduct
  const metadata = product ? extractMetadata(product.description) : null
  const cleanedDescription = product ? cleanDescription(product.description) : defaultProduct.description
  const isPremium = metadata?.premium === true
  const isBestSeller = metadata?.bestSeller === true
  const mainImage = product._parsedImageUrls ? product._parsedImageUrls[0] : product.image_url

  return (
    <section id="featured" className="py-16 bg-dark-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-orange-900/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 inline-block relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
              {isPremium && isBestSeller
                ? "Premium Best Seller"
                : isPremium
                  ? "Premium Featured Product"
                  : isBestSeller
                    ? "Best Seller Product"
                    : "Featured Product"}
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our most popular hair care solution, loved by customers worldwide.
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2 bg-gray-800 h-96 rounded-2xl"></div>
            <div className="lg:w-1/2 space-y-6">
              <div className="h-10 bg-gray-800 rounded-lg w-3/4"></div>
              <div className="h-6 bg-gray-800 rounded-lg w-1/2"></div>
              <div className="h-24 bg-gray-800 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-800 rounded-lg"></div>
                <div className="h-8 bg-gray-800 rounded-lg"></div>
                <div className="h-8 bg-gray-800 rounded-lg"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Product Image with 3D effect */}
            <div className="lg:w-1/2 relative perspective">
              <div
                className="relative transform transition-all duration-500 hover:rotate-y-12 hover:rotate-x-6"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img
                  src={mainImage || "/placeholder.svg"}
                  alt={product.name}
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-orange-400/20 rounded-2xl pointer-events-none"></div>

                {/* Floating badges */}
                {isPremium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-float">
                    PREMIUM
                  </div>
                )}
                {isBestSeller && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-float">
                    BEST SELLER
                  </div>
                )}
                <div
                  className="absolute bottom-4 left-4 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  Limited Edition
                </div>

                {/* Image gallery dots for multiple images */}
                {product._parsedImageUrls && product._parsedImageUrls.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product._parsedImageUrls.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"}`}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-pink-400 mb-2 tracking-wider">
                  {isPremium && isBestSeller
                    ? "PREMIUM BEST SELLER"
                    : isPremium
                      ? "PREMIUM PRODUCT"
                      : isBestSeller
                        ? "BEST SELLER"
                        : "FEATURED PRODUCT"}
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{product.name}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-300">(128 reviews)</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{cleanedDescription}</p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-900 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    {metadata?.benefits?.[0] || "Repairs split ends and prevents breakage"}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-900 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    {metadata?.benefits?.[1] || "Infused with argan oil and vitamin E"}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-900 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    {metadata?.benefits?.[2] || "Lightweight formula, no greasy residue"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <span className="text-3xl font-bold text-white">{product.price}</span>
                {isPremium ? (
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-2 py-1 rounded text-sm font-bold">
                    PREMIUM
                  </span>
                ) : (
                  <>
                    <span className="text-xl line-through text-gray-500">$69.99</span>
                    <span className="bg-pink-500 text-white px-2 py-1 rounded text-sm font-bold">SAVE 30%</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => addToCart(product)}
                  className={`btn-hover bg-gradient-to-r ${
                    isPremium
                      ? "from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
                      : isBestSeller
                        ? "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        : "from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
                  } text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium group ${
                    isHovering ? "animate-pulse" : ""
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    <span>Add to Cart</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button className="btn-hover glass px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-white hover:bg-white hover:bg-opacity-10">
                  <span className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    <span>Wishlist</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
