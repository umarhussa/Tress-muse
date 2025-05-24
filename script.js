import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
const SUPABASE_URL = "https://yvnsgflmivcotvmklzvw.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener("DOMContentLoaded", async () => {
  const addButton = document.getElementById("add-product-btn")
  if (addButton) addButton.addEventListener("click", addProduct)

  await displayProducts() // Products display function
  await fetchReviews() // Reviews display function
})

async function addProduct() {
  const name = document.getElementById("product-name").value.trim()
  const price = Number.parseFloat(document.getElementById("product-price").value)
  const description = document.getElementById("product-description").value.trim()
  const phone = document.getElementById("product-phone").value.trim()
  const whatsapp = document.getElementById("product-whatsapp").value.trim()
  const imageFile = document.getElementById("product-image").files[0]

  if (!name || isNaN(price) || !imageFile || !phone || !whatsapp) {
    alert("❌ Please fill in all fields.")
    return
  }

  try {
    // Upload Image
    const fileName = `products/${Date.now()}_${imageFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile, { cacheControl: "3600", upsert: false })

    if (uploadError) throw uploadError

    // Get Public URL
    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
    const imageUrl = data.publicUrl

    // Insert Product
    const { error: insertError } = await supabase
      .from("products")
      .insert([{ name, description, price, phone, whatsapp, image_url: imageUrl }])

    if (insertError) throw insertError

    alert("✅ Product added successfully!")
    window.location.href = "index.html"
  } catch (err) {
    console.error("❌ Error:", err.message)
    alert("❌ Error: " + err.message)
  }
}

async function displayProducts() {
  const productContainer = document.getElementById("product-list")
  if (!productContainer) return

  try {
    const { data: products, error } = await supabase.from("products").select("*")
    if (error) throw error

    productContainer.innerHTML = "" // Clear existing products

    products.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.classList.add(
        "bg-white",
        "p-6",
        "rounded-2xl",
        "shadow-lg",
        "hover:shadow-xl",
        "transition-all",
        "duration-300",
        "transform",
        "hover:-translate-y-1",
        "cursor-pointer",
      )

      productElement.innerHTML = `
                <div class="overflow-hidden rounded-xl mb-4">
                    <img src="${product.image_url}" alt="${product.name}" 
                         class="w-full h-64 object-cover hover:scale-105 transition-transform duration-500">
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-3 line-clamp-2">${product.description || "No description available."}</p>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-pink-600">$${product.price}</span>
                    <span class="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">New</span>
                </div>
            `

      productElement.addEventListener("click", () => showProductDetails(product))
      productContainer.appendChild(productElement)
    })

    console.log("✅ Products displayed successfully!")
  } catch (err) {
    console.error("❌ Error fetching products:", err.message)
  }
}

function showProductDetails(product) {
  document.getElementById("product-details").classList.remove("hidden")
  document.getElementById("detail-image").src = product.image_url
  document.getElementById("detail-name").textContent = product.name
  document.getElementById("detail-description").textContent = product.description || "No description available."
  document.getElementById("detail-price").textContent = `$${product.price}`

  // Phone, WhatsApp, SMS buttons
  const callButton = document.getElementById("call-button")
  const whatsappButton = document.getElementById("whatsapp-button")
  const smsButton = document.getElementById("sms-button")

  if (product.phone) {
    callButton.href = `tel:${product.phone}`
    callButton.classList.remove("hidden")
  } else {
    callButton.classList.add("hidden")
  }

  if (product.whatsapp) {
    whatsappButton.href = `https://wa.me/${product.whatsapp}`
    whatsappButton.classList.remove("hidden")
  } else {
    whatsappButton.classList.add("hidden")
  }

  if (product.phone) {
    smsButton.href = `sms:${product.phone}`
    smsButton.classList.remove("hidden")
  } else {
    smsButton.classList.add("hidden")
  }

  // Add product specifications
  const extendedDetails = document.getElementById("extended-details")
  extendedDetails.innerHTML = `
        <ul class="space-y-2">
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
        </ul>
    `
}

document.getElementById("close-product")?.addEventListener("click", () => {
  document.getElementById("product-details").classList.add("hidden")
})

async function submitReview(event) {
  event.preventDefault()
  const name = document.getElementById("customer-name").value
  const review = document.getElementById("customer-review").value

  if (!name || !review) return alert("Please fill in all fields!")

  try {
    const { data, error } = await supabase.from("reviews").insert([{ name, review }])
    if (error) throw error

    alert("Review submitted successfully!")
    document.getElementById("customer-name").value = ""
    document.getElementById("customer-review").value = ""
    await fetchReviews()
  } catch (err) {
    console.error("Error submitting review:", err)
    alert("Error submitting review: " + err.message)
  }
}

const submitButton = document.getElementById("submitReview")
if (submitButton) {
  submitButton.addEventListener("click", submitReview)
}

async function fetchReviews() {
  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    const reviewsContainer = document.getElementById("reviewsContainer")
    if (!reviewsContainer) return

    reviewsContainer.innerHTML = ""

    if (reviews.length === 0) {
      reviewsContainer.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                </div>
            `
      return
    }

    reviews.forEach((review) => {
      const date = new Date(review.created_at).toLocaleString()
      const initial = review.name.charAt(0).toUpperCase()

      const reviewElement = document.createElement("div")
      reviewElement.className =
        "bg-white shadow-lg rounded-2xl p-6 border border-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

      reviewElement.innerHTML = `
                <div class="flex items-center mb-3">
                    <div class="bg-gradient-to-r from-pink-500 to-orange-400 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold text-lg">
                        ${initial}
                    </div>
                    <div class="ml-3">
                        <h4 class="font-semibold text-lg text-gray-900">${review.name}</h4>
                        <small class="text-gray-500">${date}</small>
                    </div>
                </div>
                <p class="text-gray-600 leading-relaxed">${review.review}</p>
            `

      reviewsContainer.appendChild(reviewElement)
    })
  } catch (err) {
    console.error("Error fetching reviews:", err)
  }
}

document.getElementById("review-form")?.addEventListener("submit", submitReview)

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })
}
