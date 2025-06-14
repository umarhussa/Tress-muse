"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import { supabase } from "@/lib/supabase"
import { Upload, Package, DollarSign, Phone, MessageCircle, Tag, Weight, Leaf } from "lucide-react"
import toast from "react-hot-toast"

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    phone: "",
    whatsapp: "",
    category: "",
    weight: "",
    ingredients: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Limit to 5 images
    const selectedFiles = files.slice(0, 5)
    setImages(selectedFiles)

    // Create previews
    const previews = selectedFiles.map((file) => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImages(newImages)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim() || !formData.price || !formData.phone || !formData.whatsapp || images.length === 0) {
      toast.error("Please fill in all required fields and select at least one image")
      return
    }

    const price = Number.parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    setIsSubmitting(true)

    try {
      // Upload images
      const imageUrls: string[] = []

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        const fileName = `products/${Date.now()}_${i}_${image.name}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, image, { cacheControl: "3600", upsert: false })

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
        imageUrls.push(data.publicUrl)
      }

      // Create metadata object
      const metadata = {
        category: formData.category || "Hair Care",
        weight: formData.weight || "250ml",
        ingredients: formData.ingredients || "Natural extracts, Essential oils",
      }

      // Enhanced description with metadata
      const enhancedDescription = formData.description + "\n\n<!-- METADATA:" + JSON.stringify(metadata) + " -->"

      // Insert product
      const { error: insertError } = await supabase.from("products").insert([
        {
          name: formData.name,
          description: enhancedDescription,
          price: price,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          image_url: JSON.stringify(imageUrls),
        },
      ])

      if (insertError) throw insertError

      toast.success("Product added successfully!")

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        phone: "",
        whatsapp: "",
        category: "",
        weight: "",
        ingredients: "",
      })
      setImages([])
      setImagePreviews([])
    } catch (error) {
      console.error("Error adding product:", error)
      toast.error("Failed to add product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Add New Product
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your amazing hair care products with our community and help others discover their perfect hair care
              solution.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center">
              <span className="bg-primary-100 text-primary-600 p-3 rounded-full mr-4">
                <Package className="w-6 h-6" />
              </span>
              Product Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-primary-500" />
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product, its benefits, and how to use it..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-500" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-purple-500" />
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    disabled={isSubmitting}
                  >
                    <option value="">Select category</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Shampoo">Shampoo</option>
                    <option value="Conditioner">Conditioner</option>
                    <option value="Hair Oil">Hair Oil</option>
                    <option value="Hair Mask">Hair Mask</option>
                    <option value="Styling">Styling</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Weight className="w-4 h-4 mr-2 text-orange-500" />
                    Weight/Volume
                  </label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="e.g., 250ml, 100g"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="ingredients"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                  >
                    <Leaf className="w-4 h-4 mr-2 text-green-500" />
                    Key Ingredients
                  </label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    placeholder="e.g., Argan oil, Keratin"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <Upload className="w-4 h-4 mr-2 text-primary-500" />
                  Product Images * (Max 5 images)
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <div className="text-gray-500 flex flex-col items-center">
                      <Upload className="w-12 h-12 mb-4 text-gray-400" />
                      <span className="text-lg font-medium">Click to upload images</span>
                      <span className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</span>
                    </div>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5 mr-2" />
                      Add Product
                    </>
                  )}
                </motion.button>
              </div>
            </form>
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
