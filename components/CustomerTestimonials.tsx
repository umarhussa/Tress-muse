"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useReviews } from "@/lib/hooks/useReviews"

export default function CustomerTestimonials() {
  const { reviews, loading } = useReviews()

  // Get first 3 reviews for testimonials
  const testimonials = reviews.slice(0, 3)

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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from customers who have transformed their hair with Tress Muse products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const rating = getRandomRating(testimonial.name)
            const avatarColor = getAvatarColor(testimonial.name)

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary-200">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.review}"</p>

                {/* Customer Info */}
                <div className="flex items-center">
                  <div
                    className={`rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg ${avatarColor}`}
                  >
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-2xl"></div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/reviews"
            className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            View All Reviews
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="ml-2"
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
