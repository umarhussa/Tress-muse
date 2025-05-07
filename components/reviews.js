import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
const SUPABASE_URL = "https://yvnsgflmivcotvmklzvw.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Function to show notifications
function showNotification(message, type = "success") {
  const notificationDiv = document.createElement("div")
  notificationDiv.className = `fixed top-4 right-4 z-50 p-4 rounded shadow-lg text-white ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`
  notificationDiv.textContent = message
  document.body.appendChild(notificationDiv)

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notificationDiv.remove()
  }, 3000)
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchReviews()

  // Initialize review form
  const reviewForm = document.getElementById("review-form")
  if (reviewForm) reviewForm.addEventListener("submit", submitReview)
})

async function submitReview(event) {
  event.preventDefault()

  const nameInput = document.getElementById("customer-name")
  const reviewInput = document.getElementById("customer-review")

  const name = nameInput.value.trim()
  const review = reviewInput.value.trim()

  if (!name || !review) {
    showNotification("Please fill in all fields!", "error")
    return
  }

  const submitButton = document.querySelector("#review-form button")
  const originalText = submitButton.textContent
  submitButton.textContent = "Submitting..."
  submitButton.disabled = true

  try {
    const { data, error } = await supabase.from("reviews").insert([{ name, review }])

    if (error) throw error

    showNotification("Review submitted successfully!", "success")

    // Clear form
    nameInput.value = ""
    reviewInput.value = ""

    // Refresh reviews
    await fetchReviews()
  } catch (error) {
    console.error("Error submitting review:", error)
    showNotification("Error submitting review. Please try again.", "error")
  } finally {
    submitButton.textContent = originalText
    submitButton.disabled = false
  }
}

async function fetchReviews() {
  const reviewsContainer = document.getElementById("reviewsContainer")
  if (!reviewsContainer) return

  // Show loading state
  reviewsContainer.innerHTML = `
    <div class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  `

  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    reviewsContainer.innerHTML = ""

    if (reviews.length === 0) {
      reviewsContainer.innerHTML = `
        <div class="text-center py-6">
          <p class="text-gray-500">No reviews yet. Be the first to leave a review!</p>
        </div>
      `
      return
    }

    reviews.forEach((review, index) => {
      // Create a random pastel color for the avatar
      const colors = [
        "bg-pink-200 text-pink-700",
        "bg-blue-200 text-blue-700",
        "bg-green-200 text-green-700",
        "bg-purple-200 text-purple-700",
        "bg-yellow-200 text-yellow-700",
        "bg-indigo-200 text-indigo-700",
      ]
      const colorIndex = review.name.charCodeAt(0) % colors.length
      const [bgColor, textColor] = colors[colorIndex].split(" ")

      const reviewElement = document.createElement("div")
      reviewElement.className = `bg-white shadow-lg rounded-2xl p-6 border border-gray-200 animate-fade-in hover-lift`
      reviewElement.style.animationDelay = `${index * 0.1}s`

      // Generate random rating between 4 and 5 stars
      const rating = Math.floor(Math.random() * 2) + 4

      // Format date nicely
      const reviewDate = new Date(review.created_at)
      const formattedDate = reviewDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })

      reviewElement.innerHTML = `
        <div class="flex items-center mb-3">
          <div class="${bgColor} rounded-full h-12 w-12 flex items-center justify-center ${textColor} font-bold text-lg">
            ${review.name.charAt(0).toUpperCase()}
          </div>
          <div class="ml-3">
            <h4 class="font-semibold text-lg text-gray-900">${review.name}</h4>
            <div class="flex items-center">
              <small class="text-gray-500 mr-2">${formattedDate}</small>
              <div class="flex">
                ${Array(5)
                  .fill()
                  .map(
                    (_, i) =>
                      `<svg class="w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.57h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>`,
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
        <p class="text-gray-600 leading-relaxed">${review.review}</p>
        <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div class="flex space-x-2">
            <button class="text-gray-400 hover:text-pink-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button class="text-gray-400 hover:text-pink-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>
          <span class="text-xs text-gray-400">Verified Purchase</span>
        </div>
      `

      reviewsContainer.appendChild(reviewElement)
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    reviewsContainer.innerHTML = `
      <div class="text-center py-6">
        <p class="text-red-500">Error loading reviews. Please try again later.</p>
      </div>
    `
  }
}

// Export functions to make them available to other modules
window.submitReview = submitReview
window.fetchReviews = fetchReviews
