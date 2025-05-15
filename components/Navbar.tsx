"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: "", email: "" })
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("tressmuse_user")
    if (userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }

    // Update cart count
    updateCartCount()

    // Add event listener for window resize to close mobile menu on desktop
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    setCartCount(totalItems)
  }

  const handleLogout = () => {
    localStorage.removeItem("tressmuse_user")
    setIsLoggedIn(false)
    setUser({ name: "", email: "" })
    setIsUserMenuOpen(false)
    // Show notification (would need to be implemented)
    // showNotification('Logged out successfully', 'success')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-orange-400 text-white p-4 shadow-lg sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold flex items-center">
          <span className="mr-2 animate-pulse-slow">🌸</span>
          <span className="relative">
            Tress Muse
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white opacity-70 rounded"></span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="relative font-medium hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300"></span>
          </Link>
          <Link
            href="#products"
            className="relative font-medium hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 group"
          >
            Products
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300"></span>
          </Link>
          <Link
            href="#"
            className="relative font-medium hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300"></span>
          </Link>

          {/* Auth Buttons (shown when logged out) */}
          {!isLoggedIn && (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="font-medium hover:text-white transition-colors duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link
                href="/register"
                className="glass px-4 py-2 rounded-full transition-all hover:bg-white hover:bg-opacity-20 font-medium hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></span>
              </Link>
            </div>
          )}

          {/* User Menu (shown when logged in) */}
          {isLoggedIn && (
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none group" onClick={toggleUserMenu}>
                <div className="w-8 h-8 rounded-full bg-white text-pink-500 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="group-hover:text-white transition-colors duration-300">{user.name || "Account"}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 glass-dark rounded-lg shadow-lg py-2 transform origin-top transition-all duration-200 border border-gray-700">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white transition-colors duration-200"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white transition-colors duration-200"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white transition-colors duration-200"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 hover:text-red-300 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="cart">
            <button
              onClick={() => {
                /* viewCart function */
              }}
              className="glass px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:scale-105 font-medium group"
            >
              <span className="mr-1 group-hover:rotate-12 transition-transform duration-300">🛒</span>
              <span>
                Cart (<span className="transition-all duration-300">{cartCount}</span>)
              </span>
              <span className="ml-1 w-2 h-2 bg-white rounded-full animate-pulse hidden" id="cart-notification"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button - FIXED */}
        <button
          className="md:hidden text-white focus:outline-none ripple z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - FIXED with proper transitions */}
      <div
        className={`md:hidden w-full mt-4 glass rounded-xl p-4 transition-all duration-300 transform ${
          isMobileMenuOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        } ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col space-y-3">
          <Link
            href="/"
            className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors ripple"
          >
            Home
          </Link>
          <Link
            href="#products"
            className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors ripple"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors ripple"
          >
            About
          </Link>

          {/* Mobile Auth Buttons */}
          {!isLoggedIn && (
            <div className="flex flex-col space-y-2 pt-2 border-t border-white border-opacity-20">
              <Link
                href="/login"
                className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors ripple"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-white bg-opacity-20 text-white py-2 px-4 rounded-lg font-medium text-center hover:bg-opacity-30 transition-colors ripple"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile User Menu */}
          {isLoggedIn && (
            <div className="flex flex-col space-y-2 pt-2 border-t border-white border-opacity-20">
              <Link
                href="#"
                className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors ripple"
              >
                My Profile
              </Link>
              <Link
                href="#"
                className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors ripple"
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors text-left ripple"
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            onClick={() => {
              /* viewCart function */
            }}
            className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors flex items-center ripple"
          >
            <span className="mr-2">🛒</span>
            <span>
              Cart (<span>{cartCount}</span>)
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
