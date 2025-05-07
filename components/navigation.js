// Navigation component functionality
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu()
  initUserMenu()
})

function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (menuBtn && mobileMenu) {
    menuBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    `

    menuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden")

      if (isOpen) {
        // Close menu with animation
        mobileMenu.classList.add("opacity-0", "scale-95")
        mobileMenu.classList.remove("opacity-100", "scale-100")

        // Wait for animation to complete
        setTimeout(() => {
          mobileMenu.classList.add("hidden")
        }, 300)

        // Change icon to hamburger
        menuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        `
      } else {
        // Open menu with animation
        mobileMenu.classList.remove("hidden")

        // Trigger reflow
        void mobileMenu.offsetWidth

        mobileMenu.classList.add("opacity-100", "scale-100")
        mobileMenu.classList.remove("opacity-0", "scale-95")

        // Change icon to X
        menuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `
      }
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.classList.contains("hidden") && !mobileMenu.contains(e.target) && e.target !== menuBtn) {
        // Close menu with animation
        mobileMenu.classList.add("opacity-0", "scale-95")
        mobileMenu.classList.remove("opacity-100", "scale-100")

        // Wait for animation to complete
        setTimeout(() => {
          mobileMenu.classList.add("hidden")
        }, 300)

        // Change icon to hamburger
        menuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        `
      }
    })

    // Close menu when window is resized to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768 && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden")

        // Change icon to hamburger
        menuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        `
      }
    })
  }
}

function initUserMenu() {
  // Check if auth state is available
  if (window.checkAuthState) {
    window.checkAuthState()
  } else {
    // Fallback to check localStorage directly
    const userData = localStorage.getItem("tressmuse_user")
    updateAuthUI(!!userData)
  }

  // User menu dropdown toggle
  const userMenuButton = document.getElementById("user-menu-button")
  const userDropdown = document.getElementById("user-dropdown")

  if (userMenuButton && userDropdown) {
    userMenuButton.addEventListener("click", () => {
      const isOpen = !userDropdown.classList.contains("hidden")

      if (isOpen) {
        // Close dropdown with animation
        userDropdown.classList.add("scale-95", "opacity-0")
        userDropdown.classList.remove("scale-100", "opacity-100")

        // Wait for animation to complete
        setTimeout(() => {
          userDropdown.classList.add("hidden")
        }, 200)
      } else {
        // Open dropdown with animation
        userDropdown.classList.remove("hidden")

        // Trigger reflow
        void userDropdown.offsetWidth

        userDropdown.classList.add("scale-100", "opacity-100")
        userDropdown.classList.remove("scale-95", "opacity-0")
      }
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
        // Close dropdown with animation
        userDropdown.classList.add("scale-95", "opacity-0")
        userDropdown.classList.remove("scale-100", "opacity-100")

        // Wait for animation to complete
        setTimeout(() => {
          userDropdown.classList.add("hidden")
        }, 200)
      }
    })
  }
}

function updateAuthUI(isLoggedIn) {
  const authButtons = document.getElementById("auth-buttons")
  const userMenu = document.getElementById("user-menu")
  const mobileAuthButtons = document.getElementById("mobile-auth-buttons")
  const mobileUserMenu = document.getElementById("mobile-user-menu")

  // Update desktop UI
  if (authButtons && userMenu) {
    if (isLoggedIn) {
      authButtons.classList.add("hidden")
      userMenu.classList.remove("hidden")
    } else {
      authButtons.classList.remove("hidden")
      userMenu.classList.add("hidden")
    }
  }

  // Update mobile UI
  if (mobileAuthButtons && mobileUserMenu) {
    if (isLoggedIn) {
      mobileAuthButtons.classList.add("hidden")
      mobileUserMenu.classList.remove("hidden")
    } else {
      mobileAuthButtons.classList.remove("hidden")
      mobileUserMenu.classList.add("hidden")
    }
  }
}

// Export functions to make them available to other modules
window.initMobileMenu = initMobileMenu
window.updateAuthUI = updateAuthUI
