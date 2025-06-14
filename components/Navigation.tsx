"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/useAuth"
import { useCart } from "@/lib/hooks/useCart"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { totalItems } = useCart()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  return (
    <nav className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center hover:scale-105 transition-transform">
          <motion.span
            className="mr-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          >
            🌸
          </motion.span>
          <span>Tress Muse</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium hover:text-white/80 transition-colors">
            Home
          </Link>
          <Link href="/products" className="font-medium hover:text-white/80 transition-colors">
            Products
          </Link>
          <Link href="/reviews" className="font-medium hover:text-white/80 transition-colors">
            Reviews
          </Link>

          {/* Cart */}
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 hover:bg-white/10 rounded-full p-2 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white text-primary-500 flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:block">{user.name}</span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800"
                  >
                    <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="font-medium hover:text-white/80 transition-colors">
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-white/20 px-4 py-2 rounded-full transition-all hover:bg-white/30 font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full mt-4 bg-white/10 rounded-xl p-4"
          >
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/reviews"
                className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </Link>

              {user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                  <Link
                    href="/profile"
                    className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                  <Link
                    href="/login"
                    className="text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-white/20 text-white py-2 px-4 rounded-lg font-medium text-center hover:bg-white/30 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
