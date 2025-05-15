"use client"

import { useState } from "react"

export default function Features() {
  // State to track hover state for each card
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: "🌸",
      title: "Natural Ingredients",
      description: "Our products are made with 100% natural ingredients, free from harmful chemicals.",
      bgColor: "bg-pink-100",
      textColor: "text-pink-500",
      hoverBg: "from-pink-50 to-pink-100",
      details: ["Organic certified extracts", "No parabens or sulfates", "Cruelty-free formulations"],
    },
    {
      icon: "💧",
      title: "Hydration & Care",
      description: "Special formulas to keep your hair hydrated, healthy, and shining all day long.",
      bgColor: "bg-orange-100",
      textColor: "text-orange-500",
      hoverBg: "from-orange-50 to-orange-100",
      details: ["Deep moisturizing complex", "Anti-frizz technology", "UV protection ingredients"],
    },
    {
      icon: "✨",
      title: "Styling Solutions",
      description: "Achieve your desired look with our professional-grade styling products.",
      bgColor: "bg-pink-100",
      textColor: "text-pink-500",
      hoverBg: "from-pink-50 to-pink-100",
      details: ["Long-lasting hold", "Heat protection formulas", "Flexible, natural finish"],
    },
  ]

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full filter blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto text-center px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 inline-block relative">
          Why Choose Us?
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded"></span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Our products are crafted with care to give your hair the nourishment it deserves.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-card-hover relative overflow-hidden"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.hoverBg} opacity-0 transition-opacity duration-300 rounded-2xl ${hoveredCard === index ? "opacity-100" : ""}`}
              ></div>
              <div
                className={`feature-icon ${feature.bgColor} w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 relative z-10 shadow-md`}
              >
                <span className={`${feature.textColor} text-3xl`}>{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mt-2 text-gray-800 relative z-10 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 font-medium relative z-10">{feature.description}</p>

              {/* Hover reveal details */}
              <div
                className={`mt-4 transition-all duration-300 feature-details relative z-10 ${hoveredCard === index ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"}`}
              >
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className={`w-4 h-4 mr-2 ${feature.textColor}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
