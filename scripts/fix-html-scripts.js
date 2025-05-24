const fs = require("fs")
const path = require("path")

// Directories to ignore
const ignoreDirs = ["node_modules", ".next", "out", ".git", ".vercel", "dist"]

// Function to scan a directory recursively
function scanDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        if (!ignoreDirs.includes(entry.name)) {
          scanDirectory(fullPath)
        }
        continue
      }

      if (entry.name.endsWith(".html")) {
        fixHtmlFile(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message)
  }
}

// Function to fix HTML files with CDN script tags
function fixHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8")
    let modified = false

    // Replace script tags with CDN URLs
    const scriptTagRegex = /<script[^>]*src=["']https:\/\/cdn\.jsdelivr\.net\/npm\/[^"']*["'][^>]*><\/script>/g
    if (scriptTagRegex.test(content)) {
      content = content.replace(scriptTagRegex, "<!-- CDN script tag removed -->")
      modified = true
    }

    // Add local script tags for common libraries
    if (content.includes("<!-- CDN script tag removed -->")) {
      const localScriptTags = `
    <script src="node_modules/@supabase/supabase-js/dist/umd/supabase.min.js"></script>
    <!-- Add other local script tags as needed -->
      `

      content = content.replace("</head>", `${localScriptTags}\n</head>`)
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8")
      console.log(`Fixed script tags in ${filePath}`)
    }
  } catch (error) {
    console.error(`Error fixing HTML file ${filePath}:`, error.message)
  }
}

// Start scanning from the current directory
console.log("Fixing HTML script tags...")
scanDirectory(".")
console.log("Fix complete.")
