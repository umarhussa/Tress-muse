// Authentication component functionality
document.addEventListener("DOMContentLoaded", () => {
  initAuth()
})

function initAuth() {
  // Check if user is already logged in from localStorage
  checkAuthState()

  // Initialize login form
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Initialize register form
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }

  // Initialize logout buttons
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout)
  }

  const mobileLogoutBtn = document.getElementById("mobile-logout-btn")
  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener("click", handleLogout)
  }
}

function checkAuthState() {
  try {
    // Get user data from localStorage
    const userData = localStorage.getItem("tressmuse_user")

    // Update UI based on authentication state
    updateAuthUI(!!userData)

    if (userData) {
      console.log("User is logged in:", JSON.parse(userData).email)
    } else {
      console.log("No user logged in")
    }
  } catch (error) {
    console.error("Error checking auth state:", error.message)
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

function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const loginBtn = document.getElementById("login-btn")

  // Validate inputs
  if (!email || !password) {
    showNotification("Please fill in all fields", "error")
    return
  }

  // Disable button and show loading state
  loginBtn.disabled = true
  loginBtn.textContent = "Signing in..."

  try {
    // Simulate authentication (in a real app, this would be a server request)
    setTimeout(() => {
      // Store user data in localStorage
      const userData = {
        email: email,
        name: email.split("@")[0],
        isLoggedIn: true,
      }

      localStorage.setItem("tressmuse_user", JSON.stringify(userData))

      showNotification("Login successful!", "success")

      // Redirect to home page after successful login
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 1000)
  } catch (error) {
    console.error("Login error:", error.message)
    showNotification(error.message, "error")

    // Reset button state
    loginBtn.disabled = false
    loginBtn.textContent = "Sign In"
  }
}

function handleRegister(event) {
  event.preventDefault()

  const firstName = document.getElementById("first-name")?.value || ""
  const lastName = document.getElementById("last-name")?.value || ""
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirm-password")?.value
  const termsAccepted = document.getElementById("terms")?.checked
  const registerBtn = document.getElementById("register-btn")

  // Validate inputs
  if (!email || !password) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  if (confirmPassword && password !== confirmPassword) {
    showNotification("Passwords do not match", "error")
    return
  }

  if (password.length < 8) {
    showNotification("Password must be at least 8 characters long", "error")
    return
  }

  if (termsAccepted === false) {
    showNotification("You must accept the Terms of Service", "error")
    return
  }

  // Disable button and show loading state
  registerBtn.disabled = true
  registerBtn.textContent = "Creating account..."

  try {
    // Simulate registration (in a real app, this would be a server request)
    setTimeout(() => {
      // Store user data in localStorage
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`.trim() || email.split("@")[0],
        isLoggedIn: true,
      }

      localStorage.setItem("tressmuse_user", JSON.stringify(userData))

      showNotification("Registration successful!", "success")

      // Redirect to home page after successful registration
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 1000)
  } catch (error) {
    console.error("Registration error:", error.message)
    showNotification(error.message, "error")

    // Reset button state
    registerBtn.disabled = false
    registerBtn.textContent = "Create Account"
  }
}

function handleLogout() {
  try {
    // Remove user data from localStorage
    localStorage.removeItem("tressmuse_user")

    showNotification("Logged out successfully", "success")

    // Update UI
    updateAuthUI(false)

    // Redirect to home page
    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  } catch (error) {
    console.error("Logout error:", error.message)
    showNotification(error.message, "error")
  }
}

function showNotification(message, type = "info") {
  // Check if window.showNotification exists (from notifications.js)
  if (window.showNotification) {
    window.showNotification(message, type)
    return
  }

  // Fallback notification if the global function is not available
  const notificationDiv = document.createElement("div")
  notificationDiv.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
  }`

  notificationDiv.textContent = message
  document.body.appendChild(notificationDiv)

  // Animate in
  setTimeout(() => {
    notificationDiv.classList.remove("translate-y-20", "opacity-0")
  }, 10)

  // Remove after 3 seconds
  setTimeout(() => {
    notificationDiv.classList.add("translate-y-20", "opacity-0")
    setTimeout(() => {
      notificationDiv.remove()
    }, 500)
  }, 3000)
}

// Export functions to make them available to other modules
window.checkAuthState = checkAuthState
window.handleLogin = handleLogin
window.handleRegister = handleRegister
window.handleLogout = handleLogout
