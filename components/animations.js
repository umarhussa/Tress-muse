// Animation utilities
document.addEventListener("DOMContentLoaded", () => {
  initAnimations()
})

function initAnimations() {
  // Initialize intersection observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    },
  )

  // Observe elements with scroll-animate class
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el)
  })

  // Initialize hover animations
  initHoverEffects()

  // Initialize parallax effects
  initParallax()

  // Initialize floating elements
  initFloatingElements()
}

function initHoverEffects() {
  // Add hover effects to buttons
  document.querySelectorAll(".btn-hover-effect").forEach((button) => {
    button.addEventListener("mouseenter", (e) => {
      createRippleEffect(e)
    })
  })

  // Add hover effects to product cards
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("scale-105", "shadow-xl")
      card.classList.remove("shadow-md")
    })

    card.addEventListener("mouseleave", () => {
      card.classList.remove("scale-105", "shadow-xl")
      card.classList.add("shadow-md")
    })
  })
}

function createRippleEffect(e) {
  const button = e.currentTarget

  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  const rect = button.getBoundingClientRect()

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${e.clientX - rect.left - radius}px`
  circle.style.top = `${e.clientY - rect.top - radius}px`
  circle.classList.add("ripple")

  const ripple = button.querySelector(".ripple")
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)

  // Remove the ripple after animation completes
  setTimeout(() => {
    if (circle) {
      circle.remove()
    }
  }, 600)
}

function initParallax() {
  // Simple parallax effect for background elements
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    document.querySelectorAll(".parallax-bg").forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.2
      element.style.transform = `translateY(${scrollY * speed}px)`
    })
  })
}

function initFloatingElements() {
  // Add subtle floating animation to elements with floating class
  const floatingElements = document.querySelectorAll(".floating")

  floatingElements.forEach((element, index) => {
    // Create different animation timing for each element
    const delay = index * 0.2
    const duration = 3 + Math.random() * 2

    element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`
  })
}

// Add futuristic cursor effect
function initFuturisticCursor() {
  const cursor = document.createElement("div")
  cursor.classList.add("futuristic-cursor")
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
  })

  // Add special effects when hovering over interactive elements
  document.querySelectorAll("button, a, .product-card").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-expanded")
    })

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-expanded")
    })
  })
}

// Initialize theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")

      // Save preference to localStorage
      const isDarkTheme = document.body.classList.contains("dark-theme")
      localStorage.setItem("dark-theme", isDarkTheme)

      // Update toggle icon
      const toggleIcon = themeToggle.querySelector("i")
      if (toggleIcon) {
        toggleIcon.classList.toggle("fa-moon")
        toggleIcon.classList.toggle("fa-sun")
      }
    })

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("dark-theme")
    if (savedTheme === "true") {
      document.body.classList.add("dark-theme")
      const toggleIcon = themeToggle.querySelector("i")
      if (toggleIcon) {
        toggleIcon.classList.add("fa-sun")
        toggleIcon.classList.remove("fa-moon")
      }
    }
  }
}

// Call additional initializations
document.addEventListener("DOMContentLoaded", () => {
  initFuturisticCursor()
  initThemeToggle()
})
