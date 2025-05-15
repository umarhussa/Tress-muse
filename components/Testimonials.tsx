"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

// Initialize Supabase client
const supabaseUrl = "https://yvnsgflmivcotvmklzvw.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setReviews(data || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching reviews:", error.message)
      setLoading(false)
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(reviews.length / 3) - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(reviews.length / 3) - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-50 to-transparent opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 inline-block relative mx-auto">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            What Our Customers Say
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded"></span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
          Real experiences from our satisfied customers who have transformed their hair care routine.
        </p>

        {/* Testimonial slider controls */}
        <div className="flex justify-center mb-8">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center mr-4 hover:bg-gray-50 transition-colors btn-hover"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors btn-hover"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        {/* Testimonial slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {loading ? (
              <div className="w-full flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="w-full text-center py-6">
                <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto w-full">
                {reviews.map((review, index) => {
                  // Create a random pastel color for the avatar
                  const colors = [
                    "bg-indigo-200 text-indigo-700",
                    "bg-blue-200 text-blue-700",
                    "bg-green-200 text-green-700",
                    "bg-purple-200 text-purple-700",
                    "bg-yellow-200 text-yellow-700",
                  ]
                  const colorIndex = review.name.charCodeAt(0) % colors.length
                  const [bgColor, textColor] = colors[colorIndex].split(" ")

                  // Generate random rating between 4 and 5 stars
                  const rating = Math.floor(Math.random() * 2) + 4

                  // Format date nicely
                  const reviewDate = new Date(review.created_at)
                  const formattedDate = reviewDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })

                  return (
                    <div
                      key={review.id || index}
                      className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 animate-fade-in hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center mb-3">
                        <div
                          className={`${bgColor} rounded-full h-12 w-12 flex items-center justify-center ${textColor} font-bold text-lg`}
                        >
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold text-lg text-gray-900">{review.name}</h4>
                          <div className="flex items-center">
                            <small className="text-gray-500 mr-2">{formattedDate}</small>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.review}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-indigo-500 transition-colors">
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
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-indigo-500 transition-colors">
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
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                              />
                            </svg>
                          </button>
                        </div>
                        <span className="text-xs text-gray-400">Verified Purchase</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Testimonial pagination dots */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(Math.ceil(reviews.length / 3))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? "bg-indigo-500" : "bg-gray-300 hover:bg-indigo-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-hover group"
          >
            <span className="relative z-10 flex items-center">
              <span>Write a Review</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
