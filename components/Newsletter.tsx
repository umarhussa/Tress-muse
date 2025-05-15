"use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would submit the email to your backend
    alert(`Thank you for subscribing with: ${email}`)
    setEmail("")
  }

  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-orange-50 relative overflow-hidden">
      <div className="absolute -top-24 right-0 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-50 animate-float"></div>
      <div
        className="absolute -bottom-24 left-0 w-64 h-64 bg-orange-200 rounded-full filter blur-3xl opacity-50 animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 gradient-border transform transition-all duration-500 hover:rotate-y-3 hover:rotate-x-2 card-3d">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl transform -z-10"></div>

          <h2 className="text-3xl font-bold mb-4 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6 font-medium">
            Subscribe to our newsletter for exclusive offers and hair care tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 flex-grow max-w-md font-medium shadow-sm transition-all duration-300 focus:shadow-md"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:scale-105 btn-hover"
            >
              <span className="relative z-10 flex items-center">
                <span>Subscribe</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15"></path>
                </svg>
              </span>
            </button>
          </form>

          {/* Animated benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <svg
                className="w-5 h-5 text-pink-500 mr-2 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                Weekly Updates
              </span>
            </div>
            <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <svg
                className="w-5 h-5 text-orange-400 mr-2 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                Exclusive Discounts
              </span>
            </div>
            <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <svg
                className="w-5 h-5 text-pink-500 mr-2 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                Hair Care Tips
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
