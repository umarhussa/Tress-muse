// Use regular npm package import instead of CDN URL
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://yvnsgflmivcotvmklzvw.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }

  // Check if user is already logged in
  checkUser()
})

async function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    alert("Login successful!")
    window.location.href = "index.html"
  } catch (error) {
    alert("Error logging in: " + error.message)
  }
}

async function handleRegister(event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirm-password").value

  if (password !== confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    alert("Registration successful! Please check your email for verification.")
    window.location.href = "login.html"
  } catch (error) {
    alert("Error registering: " + error.message)
  }
}

async function checkUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    // User is logged in
    const authLinks = document.querySelectorAll(".auth-link")
    const profileLinks = document.querySelectorAll(".profile-link")

    authLinks.forEach((link) => (link.style.display = "none"))
    profileLinks.forEach((link) => (link.style.display = "block"))

    // Set user email in profile
    const userEmail = document.querySelectorAll(".user-email")
    userEmail.forEach((el) => {
      if (el) el.textContent = user.email
    })
  }
}

// Logout function
window.handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    alert("Logged out successfully!")
    window.location.href = "index.html"
  } catch (error) {
    alert("Error logging out: " + error.message)
  }
}
