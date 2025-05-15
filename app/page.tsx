"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import ProductList from "@/components/ProductList"
import FeaturedProduct from "@/components/FeaturedProduct"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"
import ProductModal from "@/components/ProductModal"
import QuickViewModal from "@/components/QuickViewModal"
import NotificationToast from "@/components/NotificationToast"
import ConfirmDialog from "@/components/ConfirmDialog"
import BackToTop from "@/components/BackToTop"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import CursorFollower from "@/components/CursorFollower"

export default function Home() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [notification, setNotification] = useState({ show: false, title: "", message: "", type: "info" })
  const [confirmDialog, setConfirmDialog] = useState({ show: false, title: "", message: "", onConfirm: () => {} })

  // Function to show product details
  const showProductDetails = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  // Function to show quick view
  const showQuickView = (product) => {
    setSelectedProduct(product)
    setIsQuickViewModalOpen(true)
  }

  // Function to show notification
  const showNotification = (title, message, type = "info") => {
    setNotification({ show: true, title, message, type })
    setTimeout(() => {
      setNotification({ ...notification, show: false })
    }, 3000)
  }

  // Function to show confirm dialog
  const showConfirmDialog = (title, message, onConfirm) => {
    setConfirmDialog({ show: true, title, message, onConfirm })
  }

  // Add to cart function
  const addToCart = (product, quantity = 1) => {
    // Get existing cart or initialize new one
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex((item) => item.name === product.name)

    if (existingProductIndex !== -1) {
      // Update quantity if product already exists
      cart[existingProductIndex].quantity += quantity
    } else {
      // Add item to cart
      cart.push({
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: Array.isArray(product.image_url) ? product.image_url[0] : product.image_url,
      })
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart))

    // Show notification
    showNotification("Added to Cart", `${quantity} × ${product.name} added to cart!`, "success")
  }

  return (
    <main className="bg-gradient-to-br from-gray-50 to-gray-100 antialiased text-gray-800 overflow-x-hidden">
      <CursorFollower />
      <Navbar />
      <Hero />
      <Features />
      <ProductList
        showProductDetails={showProductDetails}
        showQuickView={showQuickView}
        addToCart={addToCart}
        showNotification={showNotification}
      />
      <FeaturedProduct addToCart={addToCart} />
      <Testimonials />
      <Footer />

      {isProductModalOpen && (
        <ProductModal product={selectedProduct} onClose={() => setIsProductModalOpen(false)} addToCart={addToCart} />
      )}

      {isQuickViewModalOpen && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setIsQuickViewModalOpen(false)}
          addToCart={addToCart}
          showDetails={() => {
            setIsQuickViewModalOpen(false)
            setIsProductModalOpen(true)
          }}
        />
      )}

      <NotificationToast
        show={notification.show}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, show: false })}
      />

      {confirmDialog.show && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={() => {
            confirmDialog.onConfirm()
            setConfirmDialog({ ...confirmDialog, show: false })
          }}
          onCancel={() => setConfirmDialog({ ...confirmDialog, show: false })}
        />
      )}

      <BackToTop />
      <ThemeSwitcher />
    </main>
  )
}
