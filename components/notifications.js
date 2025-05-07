// Notification function
function showNotification(message, type = "info") {
  // Remove any existing notifications
  const existingNotification = document.getElementById("notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.id = "notification"
  notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 translate-y-20 opacity-0 flex items-center backdrop-blur-md`

  // Set icon and color based on type
  let icon = ""
  if (type === "success") {
    notification.classList.add("bg-green-500", "bg-opacity-90", "text-white")
    icon = `<svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>`
  } else if (type === "error") {
    notification.classList.add("bg-red-500", "bg-opacity-90", "text-white")
    icon = `<svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>`
  } else {
    notification.classList.add("bg-blue-500", "bg-opacity-90", "text-white")
    icon = `<svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>`
  }

  notification.innerHTML = `
    ${icon}
    <span>${message}</span>
    <button class="ml-4 text-white hover:text-gray-200 focus:outline-none" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-y-20", "opacity-0")
  }, 10)

  // Animate out after 3 seconds
  setTimeout(() => {
    notification.classList.add("translate-y-20", "opacity-0")
    setTimeout(() => {
      notification.remove()
    }, 500)
  }, 5000)
}

// Function to show a toast notification
function showToast(message, type = "info", duration = 3000) {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.id = "toast-container"
    toastContainer.className = "fixed top-4 right-4 z-50 flex flex-col gap-2"
    document.body.appendChild(toastContainer)
  }

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `transform translate-x-full opacity-0 transition-all duration-300 flex items-center p-3 rounded-lg shadow-lg backdrop-blur-md max-w-xs`

  // Set background and icon based on type
  let bgColor, icon
  switch (type) {
    case "success":
      bgColor = "bg-green-500 bg-opacity-90"
      icon = `<svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>`
      break
    case "error":
      bgColor = "bg-red-500 bg-opacity-90"
      icon = `<svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>`
      break
    case "warning":
      bgColor = "bg-yellow-500 bg-opacity-90"
      icon = `<svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>`
      break
    default:
      bgColor = "bg-blue-500 bg-opacity-90"
      icon = `<svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>`
  }

  toast.classList.add(bgColor)
  toast.innerHTML = `
    ${icon}
    <span class="text-white text-sm">${message}</span>
  `

  // Add to container
  toastContainer.appendChild(toast)

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-x-full", "opacity-0")
  }, 10)

  // Animate out after duration
  setTimeout(() => {
    toast.classList.add("translate-x-full", "opacity-0")
    setTimeout(() => {
      toast.remove()
    }, 300)
  }, duration)
}

// Function to show a confirmation dialog
function showConfirmDialog(message, confirmCallback, cancelCallback = null) {
  // Create overlay
  const overlay = document.createElement("div")
  overlay.className = "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"

  // Create dialog
  const dialog = document.createElement("div")
  dialog.className =
    "bg-white rounded-lg shadow-xl max-w-md w-full transform scale-95 opacity-0 transition-all duration-300"

  dialog.innerHTML = `
    <div class="p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">${message}</h3>
      <div class="flex justify-end space-x-3 mt-6">
        <button id="cancel-btn" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors">
          Cancel
        </button>
        <button id="confirm-btn" class="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-medium transition-colors">
          Confirm
        </button>
      </div>
    </div>
  `

  overlay.appendChild(dialog)
  document.body.appendChild(overlay)

  // Animate in
  setTimeout(() => {
    dialog.classList.remove("scale-95", "opacity-0")
    dialog.classList.add("scale-100", "opacity-100")
  }, 10)

  // Add event listeners
  const confirmBtn = dialog.querySelector("#confirm-btn")
  const cancelBtn = dialog.querySelector("#cancel-btn")

  confirmBtn.addEventListener("click", () => {
    closeDialog()
    if (confirmCallback) confirmCallback()
  })

  cancelBtn.addEventListener("click", () => {
    closeDialog()
    if (cancelCallback) cancelCallback()
  })

  // Close dialog when clicking outside
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeDialog()
      if (cancelCallback) cancelCallback()
    }
  })

  function closeDialog() {
    dialog.classList.add("scale-95", "opacity-0")
    overlay.classList.add("opacity-0")
    setTimeout(() => {
      overlay.remove()
    }, 300)
  }
}

// Export functions to make them available to other modules
window.showNotification = showNotification
window.showToast = showToast
window.showConfirmDialog = showConfirmDialog
