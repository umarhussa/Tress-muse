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

  // Initialize futuristic cursor
  initFuturisticCursor()

  // Initialize theme toggle
  initThemeToggle()
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
    if (circle && circle.parentNode) {
      circle.remove()
    }
  }, 600)
}

function initParallax() {
  // Simple parallax effect for background elements
  let ticking = false

  function updateParallax() {
    const scrollY = window.scrollY

    document.querySelectorAll(".parallax-bg").forEach((element) => {
      const speed = Number.parseFloat(element.getAttribute("data-speed")) || 0.2
      element.style.transform = `translateY(${scrollY * speed}px)`
    })

    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
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
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #ff6b6b;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    mix-blend-mode: difference;
  `
  document.body.appendChild(cursor)

  let mouseX = 0
  let mouseY = 0
  let cursorX = 0
  let cursorY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1
    cursorY += (mouseY - cursorY) * 0.1

    cursor.style.left = `${cursorX - 10}px`
    cursor.style.top = `${cursorY - 10}px`

    requestAnimationFrame(animateCursor)
  }
  animateCursor()

  // Add special effects when hovering over interactive elements
  document.querySelectorAll("button, a, .product-card, .clickable").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)"
      cursor.style.backgroundColor = "rgba(255, 107, 107, 0.2)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
      cursor.style.backgroundColor = "transparent"
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

      // Trigger theme change event
      document.dispatchEvent(
        new CustomEvent("themeChanged", {
          detail: { isDark: isDarkTheme },
        }),
      )
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

// Smooth scroll functionality
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Initialize page transitions
function initPageTransitions() {
  // Add fade-in effect to page load
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.3s ease-in-out"

  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
}

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Initialize all animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initAnimations()
  initSmoothScroll()
  initPageTransitions()
})

// Export functions for external use
window.AnimationUtils = {
  initAnimations,
  initHoverEffects,
  initParallax,
  initFloatingElements,
  initFuturisticCursor,
  initThemeToggle,
  createRippleEffect,
  debounce,
}
