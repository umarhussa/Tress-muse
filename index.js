// This file ensures that all necessary modules are properly exported
const { createClient } = require("@supabase/supabase-js")

// Export the modules
module.exports = {
  createClient,
}

// Log a message to confirm the file is loaded
console.log("Tress Muse modules loaded successfully")
