// Simple JavaScript file with no imports
document.addEventListener("DOMContentLoaded", () => {
  console.log("Tress Muse static site loaded")

  // Initialize any UI elements
  initUI()
})

function initUI() {
  // Add event listeners to buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Button clicked! This is a static demo version.")
    })
  })

  // Add event listeners to links
  const links = document.querySelectorAll("a")
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href") === "#") {
        e.preventDefault()
        alert("Link clicked! This is a static demo version.")
      }
    })
  })
}

// Simple product display function
function displayProducts() {
  const productContainer = document.getElementById("product-list")
  if (!productContainer) return

  // Sample product data
  const products = [
    {
      name: "Revitalizing Shampoo",
      description: "A gentle, nourishing shampoo for all hair types.",
      price: 24.99,
      image_url: "images/product1.jpg",
    },
    {
      name: "Hydrating Conditioner",
      description: "Deep conditioning treatment for dry and damaged hair.",
      price: 22.99,
      image_url: "images/product2.jpg",
    },
    {
      name: "Hair Growth Serum",
      description: "Promotes healthy hair growth and prevents breakage.",
      price: 34.99,
      image_url: "images/product3.jpg",
    },
  ]

  // Clear existing products
  productContainer.innerHTML = ""

  // Add products to the container
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
      <p class="text-gray-600 mb-3 line-clamp-2">${product.description}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-pink-600">$${product.price}</span>
        <span class="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">New</span>
      </div>
    `

    productElement.addEventListener("click", () => {
      alert(`You clicked on ${product.name}. This is a static demo version.`)
    })

    productContainer.appendChild(productElement)
  })
}

// Call displayProducts when the page loads
document.addEventListener("DOMContentLoaded", () => {
  displayProducts()
})
