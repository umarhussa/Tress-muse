"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, MessageCircle, Mail, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/supabase"
import { useCart } from "@/lib/hooks/useCart"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      quantity,
      image: imageUrls[0],
    })
    onClose()
  }

  const updateQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">Product Details</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrls[currentImageIndex] || "/placeholder.svg?height=400&width=400"}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Navigation arrows */}
                  {imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {imageUrls.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {imageUrls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border rounded-lg overflow-hidden ${
                          index === currentImageIndex ? "border-primary-500" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={url || "/placeholder.svg?height=80&width=80"}
                          alt={`${product.name} - Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-2xl font-bold text-primary-600">${product.price}</p>
                </div>

                <p className="text-gray-600 leading-relaxed">{cleanedDescription || "No description available."}</p>

                {/* Product Details */}
                {metadata && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                    <ul className="space-y-2">
                      {metadata.category && (
                        <li className="flex items-center">
                          <span className="w-32 font-medium text-gray-700">Category:</span>
                          <span>{metadata.category}</span>
                        </li>
                      )}
                      {metadata.weight && (
                        <li className="flex items-center">
                          <span className="w-32 font-medium text-gray-700">Weight:</span>
                          <span>{metadata.weight}</span>
                        </li>
                      )}
                      {metadata.ingredients && (
                        <li className="flex items-center">
                          <span className="w-32 font-medium text-gray-700">Ingredients:</span>
                          <span>{metadata.ingredients}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => updateQuantity(-1)} className="p-2 hover:bg-gray-100 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button onClick={() => updateQuantity(1)} className="p-2 hover:bg-gray-100 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Add to Cart
                  </motion.button>

                  {/* Contact Buttons */}
                  <div className="flex space-x-2">
                    {product.phone && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`tel:${product.phone}`}
                        className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </motion.a>
                    )}

                    {product.whatsapp && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`https://wa.me/${product.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </motion.a>
                    )}

                    {product.phone && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`sms:${product.phone}`}
                        className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        SMS
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
