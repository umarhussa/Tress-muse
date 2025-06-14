"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, ShoppingCart, Phone, MessageCircle } from "lucide-react"
import type { Product } from "@/lib/supabase"
import { useCart } from "@/lib/hooks/useCart"
import ProductModal from "./ProductModal"

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      name: product.name,
      price: product.price,
      quantity: 1,
      image: imageUrls[0],
    })
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full overflow-hidden border border-gray-100 hover-lift card-3d relative"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Image container */}
        <div className="overflow-hidden relative group-hover:shadow-md transition-all duration-300">
          <div className="relative w-full h-48 sm:h-64">
            <Image
              src={imageUrls[0] || "/placeholder.svg?height=256&width=256"}
              alt={product.name}
              fill
              className="object-cover transform transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {imageUrls.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              +{imageUrls.length - 1} more
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
              {product.name}
            </h3>
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {category}
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base flex-grow">
            {cleanedDescription || "No description available."}
          </p>

          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <span className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
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

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-primary-100 hover:bg-primary-200 text-primary-700 hover:text-primary-800 p-2 rounded-full transition-colors duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Hover reveal details */}
        <motion.div
          initial={{ y: "100%" }}
          whileHover={{ y: 0 }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-600 to-secondary-600 text-white p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">{product.name}</h4>
            <span className="font-bold">${product.price}</span>
          </div>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickView}
              className="bg-white text-primary-600 hover:text-primary-700 p-2 rounded-full transition-colors duration-300"
            >
              <Eye className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-white text-primary-600 hover:text-primary-700 p-2 rounded-full transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>

            {product.phone && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${product.phone}`}
                className="bg-white text-primary-600 hover:text-primary-700 p-2 rounded-full transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
              </motion.a>
            )}

            {product.whatsapp && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${product.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:text-primary-700 p-2 rounded-full transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Product Modal */}
      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
