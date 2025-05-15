"use client"

export default function QuickViewModal({ product, onClose, addToCart, showDetails }) {
  if (!product) return null

  // Helper function to clean description (remove metadata)
  const cleanDescription = (description) => {
    if (!description) return ""
    return description.replace(/<!-- METADATA:.*? -->/, "").trim()
  }

  // Get image URL
  const imageUrl =
    Array.isArray(product._parsedImageUrls) && product._parsedImageUrls.length > 0
      ? product._parsedImageUrls[0]
      : product.image_url

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale animate-scale">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-lg font-bold text-indigo-600 mb-2">{product.price}</p>
            <p className="text-gray-600 mb-4 line-clamp-3">{cleanDescription(product.description)}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => addToCart(product)}
                className="btn-hover bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={showDetails}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
