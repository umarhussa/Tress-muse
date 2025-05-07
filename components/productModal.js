document.addEventListener("DOMContentLoaded", () => {
  initProductModal()
})

function initProductModal() {
  const closeBtn = document.getElementById("close-product")
  const modal = document.getElementById("product-details")

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      closeModal()
    })

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal()
      }
    })

    // Close modal with escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal()
      }
    })
  }
}

// Helper function to parse image URLs
function getImageUrls(product) {
  if (product._parsedImageUrls) {
    return product._parsedImageUrls
  }

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

function showProductDetails(product) {
  if (!product) return

  // Extract metadata from description if available
  const metadata = extractMetadata(product.description)
  const cleanedDescription = cleanDescription(product.description)

  // Set the main product details
  document.getElementById("detail-name").textContent = product.name || "Product Name"
  document.getElementById("detail-description").textContent = cleanedDescription || "No description available."
  document.getElementById("detail-price").textContent = `$${product.price || "0.00"}`
  document.getElementById("quantity-input").value = 1

  // Get image URLs
  const imageUrls = getImageUrls(product)
  let currentImageIndex = 0

  // Set up main image
  const mainImageContainer = document.getElementById("main-image-container")
  const currentMainImage = document.getElementById("current-main-image")

  if (currentMainImage) {
    currentMainImage.src = imageUrls[0]
    currentMainImage.alt = product.name
  }

  // Set up thumbnails
  const thumbnailsContainer = document.getElementById("thumbnails-container")
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = ""

    imageUrls.forEach((url, index) => {
      const thumbnail = document.createElement("div")
      thumbnail.className = `flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border rounded-lg overflow-hidden ${
        index === 0 ? "border-pink-500" : "border-gray-200"
      } cursor-pointer snap-start`

      thumbnail.innerHTML = `<img src="${url}" alt="${product.name} - Image ${index + 1}" class="w-full h-full object-cover">`

      thumbnail.addEventListener("click", () => {
        // Update main image
        currentMainImage.src = url
        currentMainImage.alt = `${product.name} - Image ${index + 1}`
        currentImageIndex = index

        // Update active thumbnail
        thumbnailsContainer.querySelectorAll("div").forEach((thumb, i) => {
          if (i === index) {
            thumb.classList.remove("border-gray-200")
            thumb.classList.add("border-pink-500")
          } else {
            thumb.classList.remove("border-pink-500")
            thumb.classList.add("border-gray-200")
          }
        })
      })

      thumbnailsContainer.appendChild(thumbnail)
    })
  }

  // Set up navigation buttons
  const prevButton = document.getElementById("prev-image")
  const nextButton = document.getElementById("next-image")

  if (prevButton && nextButton) {
    // Only show navigation buttons if there are multiple images
    if (imageUrls.length <= 1) {
      prevButton.classList.add("hidden")
      nextButton.classList.add("hidden")
    } else {
      prevButton.classList.remove("hidden")
      nextButton.classList.remove("hidden")

      prevButton.onclick = () => {
        currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length
        updateMainImage(currentImageIndex)
      }

      nextButton.onclick = () => {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length
        updateMainImage(currentImageIndex)
      }
    }
  }

  function updateMainImage(index) {
    if (currentMainImage) {
      currentMainImage.src = imageUrls[index]
      currentMainImage.alt = `${product.name} - Image ${index + 1}`
    }

    // Update active thumbnail
    thumbnailsContainer.querySelectorAll("div").forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.remove("border-gray-200")
        thumb.classList.add("border-pink-500")
      } else {
        thumb.classList.remove("border-pink-500")
        thumb.classList.add("border-gray-200")
      }
    })
  }

  // Phone, WhatsApp, SMS buttons
  const callButton = document.getElementById("call-button")
  const whatsappButton = document.getElementById("whatsapp-button")
  const smsButton = document.getElementById("sms-button")

  if (product.phone) {
    callButton.href = `tel:${product.phone}`
    callButton.classList.remove("hidden")
    smsButton.href = `sms:${product.phone}`
    smsButton.classList.remove("hidden")
  } else {
    callButton.classList.add("hidden")
    smsButton.classList.add("hidden")
  }

  if (product.whatsapp) {
    whatsappButton.href = `https://wa.me/${product.whatsapp}`
    whatsappButton.classList.remove("hidden")
  } else {
    whatsappButton.classList.add("hidden")
  }

  // Set extended details
  const extendedDetails = document.getElementById("extended-details")
  if (extendedDetails) {
    let detailsHTML = `<ul class="space-y-2">`

    if (metadata) {
      // Add category if available
      if (metadata.category) {
        detailsHTML += `
          <li class="flex items-center">
            <span class="w-32 font-medium text-gray-700">Category:</span>
            <span>${metadata.category}</span>
          </li>
        `
      }

      // Add weight if available
      if (metadata.weight) {
        detailsHTML += `
          <li class="flex items-center">
            <span class="w-32 font-medium text-gray-700">Weight:</span>
            <span>${metadata.weight}</span>
          </li>
        `
      }

      // Add ingredients if available
      if (metadata.ingredients) {
        detailsHTML += `
          <li class="flex items-center">
            <span class="w-32 font-medium text-gray-700">Ingredients:</span>
            <span>${metadata.ingredients}</span>
          </li>
        `
      }
    } else {
      // Fallback for products without metadata
      detailsHTML += `
        <li class="flex items-center">
          <span class="w-32 font-medium text-gray-700">Category:</span>
          <span>Hair Care</span>
        </li>
        <li class="flex items-center">
          <span class="w-32 font-medium text-gray-700">Weight:</span>
          <span>250ml</span>
        </li>
        <li class="flex items-center">
          <span class="w-32 font-medium text-gray-700">Ingredients:</span>
          <span>Natural extracts, Essential oils</span>
        </li>
      `
    }

    detailsHTML += `</ul>`
    extendedDetails.innerHTML = detailsHTML
  }

  openModal()
}

function openModal() {
  const modal = document.getElementById("product-details")
  if (modal) {
    modal.classList.remove("hidden")
    document.body.style.overflow = "hidden" // Prevent scrolling

    // Add animation class
    const modalContent = modal.querySelector(".modal-content")
    if (modalContent) {
      modalContent.classList.add("animate-modal")
    }
  }
}

function closeModal() {
  const modal = document.getElementById("product-details")
  if (modal) {
    // Add fade-out animation
    const modalContent = modal.querySelector(".modal-content")
    if (modalContent) {
      modalContent.classList.add("animate-modal-out")

      // Wait for animation to complete before hiding
      setTimeout(() => {
        modal.classList.add("hidden")
        document.body.style.overflow = "" // Re-enable scrolling
        modalContent.classList.remove("animate-modal-out")
      }, 300)
    } else {
      modal.classList.add("hidden")
      document.body.style.overflow = "" // Re-enable scrolling
    }
  }
}

function updateQuantity(amount) {
  const input = document.getElementById("quantity-input")
  if (!input) return

  const currentValue = Number.parseInt(input.value) || 1
  let newValue = currentValue + amount

  if (newValue < 1) newValue = 1 // Prevent negative or zero quantity
  input.value = newValue
}

// Export functions to make them available to other modules
window.showProductDetails = showProductDetails
window.openModal = openModal
window.closeModal = closeModal
window.updateQuantity = updateQuantity
