import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
const SUPABASE_URL = "https://yvnsgflmivcotvmklzvw.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Function to show notification messages
function showNotification(message, type) {
  const notificationDiv = document.createElement("div")
  notificationDiv.classList.add("notification", type)
  notificationDiv.textContent = message

  document.body.appendChild(notificationDiv)

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notificationDiv.remove()
  }, 3000)
}

document.addEventListener("DOMContentLoaded", () => {
  // Add product button event listener
  const addButton = document.getElementById("add-product-btn")
  if (addButton) addButton.addEventListener("click", addProduct)

  // Initialize image preview
  displaySelectedImages()
})

async function addProduct() {
  const name = document.getElementById("product-name").value.trim()
  const price = Number.parseFloat(document.getElementById("product-price").value)
  const description = document.getElementById("product-description").value.trim()
  const phone = document.getElementById("product-phone").value.trim()
  const whatsapp = document.getElementById("product-whatsapp").value.trim()
  const imageFiles = document.getElementById("product-image").files

  // Get additional details
  const category = document.getElementById("product-category").value.trim()
  const weight = document.getElementById("product-weight").value.trim()
  const ingredients = document.getElementById("product-ingredients").value.trim()

  // Form validation
  if (!name || isNaN(price) || imageFiles.length === 0 || !phone || !whatsapp) {
    showNotification("❌ Please fill in all required fields and select at least one image.", "error")
    return
  }

  // Show loading state
  const addButton = document.getElementById("add-product-btn")
  const originalText = addButton.textContent
  addButton.textContent = "Adding..."
  addButton.disabled = true

  try {
    // Upload all images and collect their URLs
    const imageUrls = []

    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i]
      const fileName = `products/${Date.now()}_${i}_${imageFile.name}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile, { cacheControl: "3600", upsert: false })

      if (uploadError) throw uploadError

      // Get Public URL
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
      imageUrls.push(data.publicUrl)
    }

    // Create a metadata object for additional details
    const metadata = {
      category: category || "Hair Care",
      weight: weight || "250ml",
      ingredients: ingredients || "Natural extracts, Essential oils",
    }

    // Include metadata in the description field
    const enhancedDescription = description + "\n\n<!-- METADATA:" + JSON.stringify(metadata) + " -->"

    // Store the first image URL in image_url and all URLs as a JSON string in the same field
    const { error: insertError } = await supabase.from("products").insert([
      {
        name,
        description: enhancedDescription, // Store metadata in description
        price,
        phone,
        whatsapp,
        image_url: JSON.stringify(imageUrls),
      },
    ])

    if (insertError) throw insertError

    showNotification("✅ Product added successfully!", "success")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  } catch (err) {
    console.error("❌ Error:", err.message)
    showNotification("❌ Error: " + err.message, "error")
  } finally {
    // Reset button state
    addButton.textContent = originalText
    addButton.disabled = false
  }
}

// Add a function to display selected images preview
function displaySelectedImages() {
  const fileInput = document.getElementById("product-image")
  const previewContainer = document.getElementById("selected-images")

  if (!fileInput || !previewContainer) return

  fileInput.addEventListener("change", function () {
    previewContainer.innerHTML = ""

    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        const reader = new FileReader()

        reader.onload = (e) => {
          const preview = document.createElement("div")
          preview.className = "relative"
          preview.innerHTML = `
            <img src="${e.target.result}" alt="Preview" class="w-20 h-20 object-cover rounded-lg border border-gray-200">
            <span class="absolute top-0 right-0 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center -mt-2 -mr-2">${i + 1}</span>
          `
          previewContainer.appendChild(preview)
        }

        reader.readAsDataURL(file)
      }
    }
  })
}

// Export functions to make them available to other modules
window.addProduct = addProduct
