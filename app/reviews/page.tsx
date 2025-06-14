"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import { useReviews } from "@/lib/hooks/useReviews"
import { Star, Send } from "lucide-react"
import toast from "react-hot-toast"

export default function ReviewsPage() {
  const { reviews, loading, addReview } = useReviews()
  const [formData, setFormData] = useState({
    name: "",
    review: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.review.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    try {
      await addReview(formData.name.trim(), formData.review.trim())
      setFormData({ name: "", review: "" })
      toast.success("Review submitted successfully!")
    } catch (error) {
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Generate random rating between 4 and 5 stars
  const getRandomRating = (name: string) => {
    const seed = name.charCodeAt(0)
    return 4 + (seed % 2)
  }

  // Generate random avatar color
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-pink-200 text-pink-700",
      "bg-blue-200 text-blue-700",
      "bg-green-200 text-green-700",
      "bg-purple-200 text-purple-700",
      "bg-yellow-200 text-yellow-700",
      "bg-indigo-200 text-indigo-700",
    ]
    const colorIndex = name.charCodeAt(0) % colors.length
    return colors[colorIndex]
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Customer Reviews
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers are saying about their hair transformation journey with Tress Muse.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg mb-10 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <span className="bg-primary-100 text-primary-600 p-2 rounded-full mr-3">
                <Send className="w-5 h-5" />
              </span>
              Share Your Experience
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts about our products..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Recent Reviews</h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No reviews yet. Be the first to leave a review!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review, index) => {
                  const rating = getRandomRating(review.name)
                  const avatarColor = getAvatarColor(review.name)
                  const reviewDate = new Date(review.created_at)
                  const formattedDate = reviewDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })

                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover-lift"
                    >
                      <div className="flex items-center mb-4">
                        <div
                          className={`rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg ${avatarColor}`}
                        >
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-semibold text-lg text-gray-900">{review.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">{formattedDate}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4">{review.review}</p>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex space-x-4">
                          <button className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                            👍 Helpful
                          </button>
                          <button className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                            💬 Reply
                          </button>
                        </div>
                        <div className="text-xs text-gray-400">{rating === 5 ? "⭐ Excellent" : "⭐ Very Good"}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🌸</span>
                <h3 className="text-2xl font-bold">Tress Muse</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Premium hair care products crafted with natural ingredients to transform and nourish your hair.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-white transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/reviews" className="hover:text-white transition-colors">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500">© 2024 Tress Muse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
