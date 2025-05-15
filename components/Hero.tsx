import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-dark-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-no-repeat bg-cover opacity-10"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`particle absolute w-${Math.floor(Math.random() * 3) + 2} h-${Math.floor(Math.random() * 3) + 2} rounded-full ${
              index % 2 === 0 ? "bg-pink-300" : "bg-orange-300"
            } opacity-${Math.floor(Math.random() * 4) + 4}0 top-${Math.floor(Math.random() * 100)}% left-${Math.floor(Math.random() * 100)}% animate-float`}
            style={{ animationDelay: `${index * 0.3}s` }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Hero content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in">
              Discover Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 text-shadow-neon">
                Hair's True Potential
              </span>
            </h1>
            <p
              className="text-gray-300 text-lg md:text-xl font-medium mb-8 animate-fade-in max-w-xl"
              style={{ animationDelay: "0.2s" }}
            >
              Premium hair care products designed to nourish, strengthen, and beautify all hair types. Experience the
              transformation today.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                href="#products"
                className="btn-futuristic bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-block hover:scale-105 font-medium group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Shop Now</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute inset-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300"></span>
                <span className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              </Link>
              <Link
                href="#featured"
                className="btn-futuristic bg-transparent border-2 border-pink-500 text-white hover:bg-pink-500 hover:bg-opacity-10 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-block hover:scale-105 font-medium group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Premium Products</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="md:w-1/2 relative perspective">
            <div className="relative transform transition-all duration-500 hover:rotate-y-12 hover:rotate-x-6">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-r from-pink-400 to-orange-300 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Hair Care Products"
                  className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full"
                />
              </div>

              {/* Floating product cards */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg animate-float">
                <div className="text-pink-500 font-bold">New</div>
                <div className="text-sm">Silk Infusion</div>
              </div>
              <div
                className="absolute -left-4 bottom-4 bg-white p-4 rounded-lg shadow-lg animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-orange-500 font-bold">Best Seller</div>
                <div className="text-sm">Repair Mask</div>
              </div>
              <div
                className="absolute -top-4 left-1/4 bg-white p-4 rounded-lg shadow-lg animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="text-pink-500 font-bold">Premium</div>
                <div className="text-sm">Hair Serum</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <svg
            className="w-6 h-6 text-white opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
