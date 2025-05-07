document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})

function addToCart() {
  const productName = document.getElementById("detail-name").textContent
  const productPrice = document.getElementById("detail-price").textContent
  const quantity = document.getElementById("quantity-input").value
  const productImage = document.getElementById("current-main-image").src

  // Get existing cart or initialize new one
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")

  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex((item) => item.name === productName)

  if (existingProductIndex !== -1) {
    // Update quantity if product already exists
    cart[existingProductIndex].quantity += Number.parseInt(quantity)
  } else {
    // Add item to cart
    cart.push({
      name: productName,
      price: productPrice,
      quantity: Number.parseInt(quantity),
      image: productImage,
    })
  }

  // Save cart
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show notification
  if (window.showToast) {
    window.showToast(`✅ ${quantity} × ${productName} added to cart!`, "success")
  } else {
    window.showNotification(`✅ ${quantity} × ${productName} added to cart!`, "success")
  }

  // Add floating animation effect
  addFloatingEffect()

  // Close modal
  setTimeout(() => window.closeModal(), 1000)
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  const mobileCartCount = document.getElementById("mobile-cart-count")

  if (!cartCount && !mobileCartCount) return

  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  if (cartCount) cartCount.textContent = totalItems
  if (mobileCartCount) mobileCartCount.textContent = totalItems
}

function addFloatingEffect() {
  const productImage = document.getElementById("current-main-image")
  if (!productImage) return

  // Create floating element
  const floatingEl = document.createElement("div")
  floatingEl.className = "fixed z-50 pointer-events-none"
  floatingEl.style.transition = "all 1s cubic-bezier(0.19, 1, 0.22, 1)"

  // Get image position
  const rect = productImage.getBoundingClientRect()
  floatingEl.style.left = `${rect.left + rect.width / 2}px`
  floatingEl.style.top = `${rect.top + rect.height / 2}px`
  floatingEl.style.transform = "translate(-50%, -50%) scale(0.3)"
  floatingEl.style.opacity = "0.9"

  // Create image clone
  const imgClone = document.createElement("img")
  imgClone.src = productImage.src
  imgClone.className = "w-16 h-16 object-cover rounded-full shadow-lg"
  floatingEl.appendChild(imgClone)

  document.body.appendChild(floatingEl)

  // Get cart button position
  const cartBtn = document.querySelector(".cart")
  const cartRect = cartBtn ? cartBtn.getBoundingClientRect() : { right: 20, top: 20 }

  // Animate to cart
  setTimeout(() => {
    floatingEl.style.left = `${cartRect.left}px`
    floatingEl.style.top = `${cartRect.top}px`
    floatingEl.style.transform = "translate(-50%, -50%) scale(0.1)"
    floatingEl.style.opacity = "0"

    // Remove element after animation
    setTimeout(() => {
      floatingEl.remove()
    }, 1000)
  }, 10)
}

function viewCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")

  if (cart.length === 0) {
    window.showToast("Your cart is empty", "info")
    return
  }

  // Create cart modal
  const modal = document.createElement("div")
  modal.className = "fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"

  // Calculate total
  const total = cart.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
    return sum + price * item.quantity
  }, 0)

  modal.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300 scale-95 opacity-0">
      <div class="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex justify-between items-center">
        <h2 class="text-xl font-bold">Your Cart</h2>
        <button id="close-cart" class="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="overflow-y-auto flex-grow p-4">
        ${
          cart.length === 0
            ? `<div class="text-center py-8">
            <p class="text-gray-500">Your cart is empty</p>
          </div>`
            : `<div class="space-y-4">
            ${cart
              .map(
                (item) => `
              <div class="flex items-center border-b border-gray-200 pb-4">
                <img src="${item.image || "/placeholder.svg?height=80&width=80"}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                <div class="flex-grow">
                  <h3 class="font-medium text-gray-800">${item.name}</h3>
                  <div class="flex justify-between items-center mt-1">
                    <span class="text-gray-600">${item.price} × ${item.quantity}</span>
                    <button class="text-red-500 hover:text-red-700 transition-colors" data-remove="${item.name}">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>`
        }
      </div>
      
      <div class="p-4 border-t border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold text-gray-800">Total:</span>
          <span class="font-bold text-primary-600">$${total.toFixed(2)}</span>
        </div>
        <div class="flex space-x-2">
          <button id="clear-cart" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors flex-grow">
            Clear Cart
          </button>
          <button id="checkout" class="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-lg text-white font-medium transition-colors flex-grow">
            Checkout
          </button>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  // Animate in
  setTimeout(() => {
    const modalContent = modal.querySelector("div")
    modalContent.classList.remove("scale-95", "opacity-0")
    modalContent.classList.add("scale-100", "opacity-100")
  }, 10)

  // Close button
  modal.querySelector("#close-cart").addEventListener("click", () => {
    closeCartModal()
  })

  // Clear cart button
  modal.querySelector("#clear-cart").addEventListener("click", () => {
    window.showConfirmDialog("Are you sure you want to clear your cart?", () => {
      localStorage.setItem("cart", "[]")
      updateCartCount()
      closeCartModal()
      window.showToast("Cart cleared", "info")
    })
  })

  // Checkout button
  modal.querySelector("#checkout").addEventListener("click", () => {
    closeCartModal()
    window.showToast("Checkout functionality coming soon!", "info")
  })

  // Remove item buttons
  const removeButtons = modal.querySelectorAll("[data-remove]")
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.getAttribute("data-remove")
      removeFromCart(productName)
      button.closest(".flex.items-center").remove()

      // Update total
      const newCart = JSON.parse(localStorage.getItem("cart") || "[]")
      const newTotal = newCart.reduce((sum, item) => {
        const price = Number.parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
        return sum + price * item.quantity
      }, 0)

      modal.querySelector(".text-primary-600").textContent = `$${newTotal.toFixed(2)}`

      // Show empty message if cart is empty
      if (newCart.length === 0) {
        modal.querySelector(".overflow-y-auto").innerHTML = `
          <div class="text-center py-8">
            <p class="text-gray-500">Your cart is empty</p>
          </div>
        `
      }

      updateCartCount()
    })
  })

  // Close when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCartModal()
    }
  })

  function closeCartModal() {
    const modalContent = modal.querySelector("div")
    modalContent.classList.add("scale-95", "opacity-0")
    setTimeout(() => {
      modal.remove()
    }, 300)
  }
}

function removeFromCart(productName) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const updatedCart = cart.filter((item) => item.name !== productName)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  updateCartCount()
  window.showToast(`Removed ${productName} from cart`, "info")
}

// Export functions to make them available to other modules
window.addToCart = addToCart
window.updateCartCount = updateCartCount
window.viewCart = viewCart
window.removeFromCart = removeFromCart
