// Use CommonJS require instead of ES module import
const { createClient } = require("@supabase/supabase-js")

const SUPABASE_URL = "https://yvnsgflmivcotvmklzvw.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener("DOMContentLoaded", async () => {
  await displayProducts()
  initProductInteractions()
})

// Helper function to parse image URLs
function parseImageUrls(product) {
  try {
    // Check if image_url is a JSON string containing multiple URLs
    if (product.image_url && product.image_url.startsWith("[")) {
      return JSON.parse(product.image_url)
    }
  } catch (e) {
    console.error("Error parsing image URLs:", e)
  }

  // Fallback to single image URL
  return [product.image_url]
}

// Helper function to extract metadata from description
function extractMetadata(description) {
  if (!description) return null

  const metadataMatch = description.match(/<!-- METADATA:(.*?) -->/)
  if (metadataMatch && metadataMatch[1]) {
    try {
      return JSON.parse(metadataMatch[1])
    } catch (e) {
      console.error("Error parsing metadata:", e)
    }
  }
  return null
}

// Helper function to clean description (remove metadata)
function cleanDescription(description) {
  if (!description) return ""
  return description.replace(/<!-- METADATA:.*? -->/, "").trim()
}

async function displayProducts() {
  const productContainer = document.getElementById("product-list")
  if (!productContainer) return

  // Show loading state
  productContainer.innerHTML = `
    <div class="col-span-full flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  `

  try {
    const { data: products, error } = await supabase.from("products").select("*")
    if (error) throw error

    productContainer.innerHTML = "" // Clear loading state

    if (products.length === 0) {
      productContainer.innerHTML = `
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500 text-lg">No products found.</p>
        </div>
      `
      return
    }

    products.forEach((product, index) => {
      // Parse image URLs
      const imageUrls = parseImageUrls(product)
      const hasMultipleImages = imageUrls.length > 1
      const mainImageUrl = imageUrls[0]

      // Extract metadata
      const metadata = extractMetadata(product.description)
      const cleanedDescription = cleanDescription(product.description)

      // Create product element with enhanced styling
      const productElement = document.createElement("div")
      productElement.classList.add(
        "group",
        "bg-white",
        "rounded-2xl",
        "shadow-sm",
        "hover:shadow-xl",
        "transition-all",
        "duration-500",
        "transform",
        "hover:-translate-y-2",
        "cursor-pointer",
        "flex",
        "flex-col",
        "h-full",
        "overflow-hidden",
        "border",
        "border-gray-100",
        "animate-fade-in",
        "card-3d",
        "relative",
      )

      // Add animation delay based on index for staggered appearance
      productElement.style.animationDelay = `${index * 0.1}s`

      // Create a shimmer effect overlay
      const shimmerOverlay = document.createElement("div")
      shimmerOverlay.classList.add(
        "absolute",
        "inset-0",
        "animate-shimmer",
        "pointer-events-none",
        "opacity-0",
        "group-hover:opacity-100",
        "transition-opacity",
        "duration-300",
        "z-10",
      )
      productElement.appendChild(shimmerOverlay)

      let imageHTML = ""

      if (hasMultipleImages) {
        // Show indicator for multiple images
        imageHTML = `
          <div class="overflow-hidden relative group-hover:shadow-md transition-all duration-300">
            <img src="${mainImageUrl}" alt="${product.name}" 
                 class="w-full h-48 sm:h-64 object-cover transform transition-transform duration-700 group-hover:scale-110">
            <div class="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              +${imageUrls.length - 1} more
            </div>
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300"></div>
          </div>
        `
      } else {
        // Single image display
        imageHTML = `
          <div class="overflow-hidden relative group-hover:shadow-md transition-all duration-300">
            <img src="${mainImageUrl}" alt="${product.name}" 
                 class="w-full h-48 sm:h-64 object-cover transform transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300"></div>
          </div>
        `
      }

      // Get category from metadata
      const category = metadata?.category || "Hair Care"

      productElement.innerHTML = `
        ${imageHTML}
        <div class="p-4 sm:p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">${product.name}</h3>
            <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">${category}</span>
          </div>
          <p class="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base flex-grow">${cleanedDescription || "No description available."}</p>
          <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <span class="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">${product.price}</span>
            <div class="flex space-x-2">
              <button class="quick-view-btn bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary-600 p-2 rounded-full transition-colors duration-300 transform hover:scale-110"
                      data-name="${product.name}"
                      data-price="${product.price}"
                      data-description="${cleanedDescription || "No description available."}"
                      data-image="${mainImageUrl}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button class="add-to-cart-btn bg-primary-100 hover:bg-primary-200 text-primary-700 hover:text-primary-800 p-2 rounded-full transition-colors duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Hover reveal details -->
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-600 to-secondary-600 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-bold">${product.name}</h4>
            <span class="font-bold">${product.price}</span>
          </div>
          <div class="flex space-x-2 mb-2">
            <button class="bg-white text-primary-600 hover:text-primary-700 p-2 rounded-full transition-colors duration-300 transform hover:scale-110 view-details-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button class="bg-white text-primary-600 hover:text-primary-700 p-2 rounded-full transition-colors duration-300 transform hover:scale-110 add-to-cart-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-white/80 line-clamp-2">${cleanedDescription || "No description available."}</p>
        </div>
      `

      // Add image URLs to the product object for the modal
      product._parsedImageUrls = imageUrls

      productElement.addEventListener("click", () => window.showProductDetails(product))
      productContainer.appendChild(productElement)
    })

    console.log("✅ Products displayed successfully!")
  } catch (err) {
    console.error("❌ Error fetching products:", err.message)
    productContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-red-500">Error loading products. Please try again.</p>
      </div>
    `
  }
}

// Dummy function for showProductDetails
function showProductDetails(product) {
  console.log("Product details:", product)
  alert(`Clicked on product: ${product.name}`)
}

// Export functions to make them available to other modules
if (typeof window !== "undefined") {
  window.displayProducts = displayProducts
  window.showProductDetails = showProductDetails
  window.initProductInteractions = initProductInteractions
}

function initProductInteractions() {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("quick-view-btn")) {
      const productCard = event.target.closest(".group")
      if (productCard) {
        const name = event.target.dataset.name
        const price = event.target.dataset.price
        const description = event.target.dataset.description
        const image = event.target.dataset.image
        showQuickViewModal(name, price, description, image)
      }
    }
  })
}

function showQuickViewModal(name, price, description, image) {
  // Create the modal dynamically
  const modal = document.createElement("div")
  modal.id = "quickViewModal"
  modal.classList.add(
    "fixed",
    "inset-0",
    "bg-black",
    "bg-opacity-50",
    "z-50",
    "overflow-y-auto",
    "flex",
    "items-center",
    "justify-center",
    "p-4",
  )

  const modalContent = document.createElement("div")
  modalContent.classList.add("bg-white", "rounded-lg", "max-w-2xl", "mx-auto", "p-6")

  modalContent.innerHTML = `
    <div class="relative">
      <button id="closeModalBtn" class="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src="${image}" alt="${name}" class="w-full h-auto rounded-md">
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-2">${name}</h2>
          <p class="text-gray-700 mb-4">${description}</p>
          <p class="text-xl font-semibold text-primary-600">${price}</p>
          <button class="mt-4 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `

  modal.appendChild(modalContent)
  document.body.appendChild(modal)

  // Add event listener to close button
  const closeModalBtn = modal.querySelector("#closeModalBtn")
  closeModalBtn.addEventListener("click", () => {
    modal.remove()
  })

  // Close the modal if the user clicks outside the modal content
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove()
    }
  })
}

// Export for CommonJS
module.exports = {
  displayProducts,
  showProductDetails,
  initProductInteractions,
  showQuickViewModal,
}
