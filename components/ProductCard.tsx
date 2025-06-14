"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Phone, MessageCircle, Star, Heart, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/supabase"
import ProductModal from "./ProductModal"

interface ProductCardProps {
  product: Product
  index: number
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, index, viewMode = "grid" }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Parse image URLs
  const getImageUrls = (imageUrl: string) => {
    try {
      if (imageUrl.startsWith("[")) {
        return JSON.parse(imageUrl)
      }
    } catch (e) {
      console.error("Error parsing image URLs:", e)
    }
    return [imageUrl]
  }

  // Extract metadata from description
  const extractMetadata = (description: string) => {
    const metadataMatch = description?.match(/<!-- METADATA:(.*?) -->/)
    if (metadataMatch && metadataMatch[1]) {
      try {
        return JSON.parse(metadataMatch[1])
      } catch (e) {
        console.error("Error parsing metadata:", e)
      }
    }
    return null
  }

  // Clean description (remove metadata)
  const cleanDescription = (description: string) => {
    if (!description) return ""
    return description.replace(/<!-- METADATA:.*? -->/, "").trim()
  }

  const imageUrls = getImageUrls(product.image_url)
  const metadata = extractMetadata(product.description)
  const cleanedDescription = cleanDescription(product.description)
  const category = metadata?.category || "Hair Care"

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  // Fallback image if no image is available
  const displayImage =
    imageUrls[0] || "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center"

  if (viewMode === "list") {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
              <Image
                src={displayImage || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 256px"
              />
              {imageUrls.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                  +{imageUrls.length - 1} more
                </div>
              )}

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-grow p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 hover:text-primary-600 transition-colors mt-2">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                    ))}
                  <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">{cleanedDescription || "No description available."}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQuickView}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary-600 p-2 rounded-full transition-colors duration-300"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-primary-100 hover:bg-primary-200 text-primary-700 hover:text-primary-800 p-2 rounded-full transition-colors duration-300"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </motion.button>

                  {product.phone && (
                    <motion.a
                      href={`tel:${product.phone}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 p-2 rounded-full transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-5 h-5" />
                    </motion.a>
                  )}

                  {product.whatsapp && (
                    <motion.a
                      href={`https://wa.me/${product.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 p-2 rounded-full transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full overflow-hidden border border-gray-100 relative"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </motion.button>

        {/* Image container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-64">
          <Image
            src={displayImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transform transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {imageUrls.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              +{imageUrls.length - 1} more
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-medium px-2 py-1 rounded-full">
              {category}
            </span>
          </div>

          {/* Overlay Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickView}
              className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                ))}
              <span className="text-sm text-gray-600 ml-1">(4.5)</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 mb-2">
            {product.name}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
            {cleanedDescription || "No description available."}
          </p>

          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              ${product.price}
            </span>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickView}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary-600 p-2 rounded-full transition-colors duration-300"
              >
                <Eye className="w-5 h-5" />
              </motion.button>

              {product.phone && (
                <motion.a
                  href={`tel:${product.phone}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 p-2 rounded-full transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-5 h-5" />
                </motion.a>
              )}

              {product.whatsapp && (
                <motion.a
                  href={`https://wa.me/${product.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 p-2 rounded-full transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Product Modal */}
      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
