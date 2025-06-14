"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, Eye, Phone, MessageCircle, ShoppingBag, Heart } from "lucide-react"
import { useState } from "react"
import ProductModal from "./ProductModal"

// Sample product images - you can replace these with actual product images
const productImages = [
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop&crop=center",
]

// Updated product data with better images
const featuredProducts = [
  {
    id: 1,
    name: "Argan Oil Nourishing Shampoo",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 156,
    image: productImages[0],
    badge: "Best Seller",
    description:
      "Premium argan oil formula for deep nourishment and natural shine. Suitable for all hair types with organic ingredients.",
    phone: "+1-555-0123",
    whatsapp: "+1-555-0123",
    image_url: productImages[0],
    created_at: new Date().toISOString(),
    category: "Shampoo",
    inStock: true,
  },
  {
    id: 2,
    name: "Keratin Repair Treatment",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviews: 203,
    image: productImages[1],
    badge: "New",
    description:
      "Professional keratin treatment for smooth, frizz-free hair with long-lasting results and heat protection.",
    phone: "+1-555-0124",
    whatsapp: "+1-555-0124",
    image_url: productImages[1],
    created_at: new Date().toISOString(),
    category: "Treatment",
    inStock: true,
  },
  {
    id: 3,
    name: "Hair Growth Activating Serum",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviews: 89,
    image: productImages[2],
    badge: "Popular",
    description:
      "Advanced formula with natural ingredients to promote healthy hair growth and thickness with visible results.",
    phone: "+1-555-0125",
    whatsapp: "+1-555-0125",
    image_url: productImages[2],
    created_at: new Date().toISOString(),
    category: "Serum",
    inStock: true,
  },
  {
    id: 4,
    name: "Deep Conditioning Hair Mask",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.6,
    reviews: 127,
    image: productImages[3],
    badge: "Sale",
    description: "Intensive repair mask for damaged and dry hair with natural moisturizing ingredients and vitamins.",
    phone: "+1-555-0126",
    whatsapp: "+1-555-0126",
    image_url: productImages[3],
    created_at: new Date().toISOString(),
    category: "Mask",
    inStock: true,
  },
]

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      case "New":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
      case "Popular":
        return "bg-gradient-to-r from-purple-400 to-violet-500 text-white"
      case "Sale":
        return "bg-gradient-to-r from-red-400 to-pink-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleQuickView = (e: React.MouseEvent, product: any) => {
    e.stopPropagation()
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-6 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Featured Products
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent">
                Premium Collection
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our premium hair care collection, featuring advanced formulas for professional results at home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {/* Badge */}
                <div
                  className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(product.badge)} shadow-lg`}
                >
                  {product.badge}
                </div>

                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </motion.button>

                {/* Image Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-64">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  {/* Stock Status */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
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
                      onClick={(e) => handleQuickView(e, product)}
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

                    {product.phone && (
                      <motion.a
                        href={`tel:${product.phone}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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
                        onClick={(e) => e.stopPropagation()}
                        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>

                    {product.originalPrice && (
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleProductClick(product)
                    }}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
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
            ))}
          </div>

          {/* View All Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
              >
                View All Products
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </>
  )
}
