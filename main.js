// Main entry point for the application
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Application initialized")

  // Initialize cart count
  if (window.updateCartCount) {
    window.updateCartCount()
  }

  // Initialize mobile menu
  if (window.initMobileMenu) {
    window.initMobileMenu()
  }

  // Load products if on index page
  if (document.getElementById("product-list") && window.displayProducts) {
    await window.displayProducts()
  }

  // Load reviews if on reviews page or index page with reviews container
  if (document.getElementById("reviewsContainer") && window.fetchReviews) {
    await window.fetchReviews()
  }

  console.log("Application fully loaded")
})
