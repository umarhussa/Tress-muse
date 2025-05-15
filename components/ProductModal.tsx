"use client"

import { useState } from "react"

export default function ProductModal({ product, onClose, addToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  if (!product) return null

  // Get image URLs
  const imageUrls = product._parsedImageUrls || [product.image_url]

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

  // Extract metadata and clean description
  const metadata = extractMetadata(product.description)
  const cleanedDescription = cleanDescription(product.description)
  const isPremium = metadata?.premium === true
  const isBestSeller = metadata?.bestSeller === true

  const updateQuantity = (amount) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    setIsAnimating(true)
    setTimeout(() => {
      addToCart(product, quantity)
      onClose()
    }, 600)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300 p-4 md:p-0">
      {/* Fullscreen container with responsive sizing */}
      <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 modal-content">
        {/* Premium badge */}
        {isPremium && (
          <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            PREMIUM
          </div>
        )}

        {/* Best Seller badge */}
        {isBestSeller && (
          <div
            className={`absolute ${isPremium ? "top-14" : "top-4"} left-4 z-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg`}
          >
            BEST SELLER
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:scale-110 focus:outline-none group transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 group-hover:text-gray-700 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content container */}
        <div className="w-full flex flex-col lg:flex-row">
          {/* Product Image Gallery (responsive width) */}
          <div className="lg:w-1/2 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white">
            {/* Main Image Container */}
            <div className="relative bg-white rounded-lg overflow-hidden mb-4 group shadow-inner">
              {/* Main Image */}
              <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center p-4">
                <img
                  src={imageUrls[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Image overlay with zoom effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Navigation Arrows */}
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 focus:outline-none transition-all duration-300 hover:scale-110 shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 focus:outline-none transition-all duration-300 hover:scale-110 shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Container - Horizontally Scrollable */}
            {imageUrls.length > 1 && (
              <div className="relative">
                <div className="flex space-x-2 overflow-x-auto pb-2 snap-x scrollbar-hide">
                  {imageUrls.map((url, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border-2 rounded-lg overflow-hidden cursor-pointer snap-start transition-all duration-300 transform hover:scale-105 ${
                        index === currentImageIndex
                          ? "border-pink-500 shadow-md"
                          : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details (responsive width, scrollable) */}
          <div className="lg:w-1/2 p-4 sm:p-6 overflow-y-auto max-h-[60vh] lg:max-h-[90vh] bg-white">
            {/* Product Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center mb-2">
                {isPremium && (
                  <span className="hidden lg:inline-flex mr-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    PREMIUM
                  </span>
                )}
                {isBestSeller && (
                  <span className="hidden lg:inline-flex mr-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    BEST SELLER
                  </span>
                )}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
                  {product.name}
                </h2>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-500 text-sm">(128 reviews)</span>
              </div>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{cleanedDescription}</p>
            </div>

            {/* Price and Quantity */}
            <div className="flex justify-between items-center mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm border border-gray-100">
              <div>
                <strong className={`text-xl sm:text-2xl ${isPremium ? "text-amber-500" : "text-pink-500"} font-bold`}>
                  {product.price}
                </strong>
                {isPremium && (
                  <div className="text-xs text-gray-500 mt-1">Premium pricing includes exclusive benefits</div>
                )}
                {isBestSeller && !isPremium && (
                  <div className="text-xs text-gray-500 mt-1">Our most popular choice</div>
                )}
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(-1)}
                  className="bg-gray-100 hover:bg-gray-200 px-3 sm:px-4 py-1 sm:py-2 rounded-l-lg transition-all text-lg sm:text-xl focus:outline-none ripple"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-10 sm:w-14 text-center text-base sm:text-lg font-medium border-y border-gray-200 focus:outline-none py-1 sm:py-2"
                />
                <button
                  onClick={() => updateQuantity(1)}
                  className="bg-gray-100 hover:bg-gray-200 px-3 sm:px-4 py-1 sm:py-2 rounded-r-lg transition-all text-lg sm:text-xl focus:outline-none ripple"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              {product.phone && (
                <a
                  href={`tel:${product.phone}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-center transition-all flex flex-col items-center justify-center hover:scale-105 shadow-md group"
                >
                  <span className="text-xl sm:text-2xl group-hover:animate-wiggle">📞</span>
                  <span className="text-xs sm:text-sm font-medium">Call</span>
                </a>
              )}

              {product.whatsapp && (
                <a
                  href={`https://wa.me/${product.whatsapp}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-center transition-all flex flex-col items-center justify-center hover:scale-105 shadow-md group"
                >
                  <span className="text-xl sm:text-2xl group-hover:animate-wiggle">💬</span>
                  <span className="text-xs sm:text-sm font-medium">WhatsApp</span>
                </a>
              )}

              {product.phone && (
                <a
                  href={`sms:${product.phone}`}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-center transition-all flex flex-col items-center justify-center hover:scale-105 shadow-md group"
                >
                  <span className="text-xl sm:text-2xl group-hover:animate-wiggle">📩</span>
                  <span className="text-xs sm:text-sm font-medium">SMS</span>
                </a>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full btn-hover ${
                isPremium
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
                  : "bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
              } text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-base sm:text-lg mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 group ${
                isAnimating ? "animate-bounce" : ""
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                <span>ADD TO CART</span>
              </span>
            </button>

            {/* Benefits */}
            <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-gray-200">
              {metadata?.benefits && metadata.benefits.length > 0 ? (
                metadata.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${isPremium ? "text-amber-500" : "text-green-500"} mr-2 sm:mr-3 mt-1 flex-shrink-0`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 font-medium text-sm sm:text-md">{benefit}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 font-medium text-sm sm:text-md">Free worldwide shipping</span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 font-medium text-sm sm:text-md">60-day money back guarantee</span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 font-medium text-sm sm:text-md">Certified organic ingredients</span>
                  </div>
                </>
              )}
            </div>

            {/* Additional Details */}
            <div className="mt-4 sm:mt-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Product Details</h3>
              <div className="prose text-sm sm:text-base text-gray-600">
                <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  {metadata ? (
                    <>
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
                      {isPremium && (
                        <li className="flex items-center text-amber-600 font-medium mt-2 pt-2 border-t border-gray-200">
                          <span className="w-32">Premium:</span>
                          <span>This is a premium product with exclusive benefits</span>
                        </li>
                      )}
                      {isBestSeller && (
                        <li className="flex items-center text-blue-600 font-medium mt-2 pt-2 border-t border-gray-200">
                          <span className="w-32">Best Seller:</span>
                          <span>Our customers' favorite choice</span>
                        </li>
                      )}
                    </>
                  ) : (
                    <>
                      <li className="flex items-center">
                        <span className="w-32 font-medium text-gray-700">Category:</span>
                        <span>Hair Care</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-32 font-medium text-gray-700">Weight:</span>
                        <span>250ml</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-32 font-medium text-gray-700">Ingredients:</span>
                        <span>Natural extracts, Essential oils</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
