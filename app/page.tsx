"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Navigation from "@/components/Navigation"
import CustomerTestimonials from "@/components/CustomerTestimonials"
import FeaturedProducts from "@/components/FeaturedProducts"
import { Sparkles, Heart, Leaf, Award, Star, Shield, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full opacity-20 blur-xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-secondary-200 to-primary-200 rounded-full opacity-20 blur-xl"
          />
          <motion.div
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-10 blur-lg"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-6 py-2 rounded-full text-sm font-medium mb-8 border border-primary-200"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Trusted by 10,000+ Happy Customers
            </motion.div>

            {/* Main Heading with Gradient Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Transform Your Hair
              </span>
              <motion.span
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
                className="inline-block ml-4 text-6xl"
              >
                ✨
              </motion.span>
            </motion.h1>

            {/* Subtitle with Typewriter Effect */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Discover premium hair care products that <span className="text-primary-600 font-semibold">nourish</span>,{" "}
              <span className="text-secondary-600 font-semibold">strengthen</span>, and{" "}
              <span className="text-primary-600 font-semibold">beautify</span> your hair naturally.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <Link
                  href="/products"
                  className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Shop Now
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

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            >
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "500+", label: "Products" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1 }} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Enhanced Why Choose Us Section with Fixed Hover Colors */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 transform rotate-12 scale-150"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
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
              <Award className="w-4 h-4 mr-2" />
              Why Choose Tress Muse?
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent">
                Premium Quality
              </span>
              <br />
              <span className="text-gray-800">Hair Care Solutions</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to providing the highest quality hair care products with natural ingredients that deliver
              exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Natural Ingredients",
                description: "Made with premium natural extracts and essential oils for healthy hair growth",
                bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
                iconBg: "bg-gradient-to-br from-green-100 to-emerald-100",
                hoverBg: "hover:bg-green-500",
                hoverIconBg: "group-hover:bg-white",
                hoverText: "group-hover:text-white",
                hoverIcon: "group-hover:text-green-500",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Premium Quality",
                description: "Carefully crafted products that deliver exceptional and long-lasting results",
                bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
                iconBg: "bg-gradient-to-br from-purple-100 to-violet-100",
                hoverBg: "hover:bg-purple-500",
                hoverIconBg: "group-hover:bg-white",
                hoverText: "group-hover:text-white",
                hoverIcon: "group-hover:text-purple-500",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Hair Health",
                description: "Nourish and strengthen your hair from root to tip with our specialized formulas",
                bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
                iconBg: "bg-gradient-to-br from-pink-100 to-rose-100",
                hoverBg: "hover:bg-pink-500",
                hoverIconBg: "group-hover:bg-white",
                hoverText: "group-hover:text-white",
                hoverIcon: "group-hover:text-pink-500",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Beautiful Results",
                description: "Transform your hair with visible, lasting improvements in texture and shine",
                bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
                iconBg: "bg-gradient-to-br from-yellow-100 to-orange-100",
                hoverBg: "hover:bg-orange-500",
                hoverIconBg: "group-hover:bg-white",
                hoverText: "group-hover:text-white",
                hoverIcon: "group-hover:text-orange-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`group relative p-8 rounded-3xl ${feature.bgColor} border border-white shadow-lg hover:shadow-2xl ${feature.hoverBg} transition-all duration-500 cursor-pointer overflow-hidden`}
              >
                {/* Icon with Enhanced Animation */}
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`inline-flex items-center justify-center w-20 h-20 ${feature.iconBg} ${feature.hoverIconBg} rounded-3xl mb-6 shadow-lg transition-all duration-500`}
                >
                  <span className={`text-gray-700 ${feature.hoverIcon} transition-colors duration-500`}>
                    {feature.icon}
                  </span>
                </motion.div>

                {/* Content */}
                <div>
                  <h3
                    className={`text-xl font-bold mb-4 text-gray-800 ${feature.hoverText} transition-colors duration-500`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-gray-600 ${feature.hoverText} leading-relaxed transition-colors duration-500 text-sm`}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Hover overlay for smooth color transition */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              </motion.div>
            ))}
          </div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "100% Safe",
                description: "Dermatologist tested and approved",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Expert Support",
                description: "Professional hair care guidance",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Fast Results",
                description: "Visible improvements in weeks",
                color: "from-amber-500 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
                className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mr-4 shadow-lg`}
                >
                  <span className="text-white">{item.icon}</span>
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <CustomerTestimonials />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
              {/* Direct Add Product Link */}
              <div className="mt-4">
                <a
                  href="/add-product"
                  className="text-primary-400 hover:text-primary-300 transition-colors text-sm underline"
                >
                  Add Product (Admin)
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-white transition-colors">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
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
