const fs = require("fs")
const path = require("path")

// Directories to ignore
const ignoreDirs = ["node_modules", ".next", "out", ".git", ".vercel", "dist"]

// File extensions to check
const extensions = [".js", ".jsx", ".ts", ".tsx", ".mjs"]

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

      const ext = path.extname(entry.name).toLowerCase()
      if (extensions.includes(ext)) {
        convertFile(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message)
  }
}

// Function to convert ES module imports to CommonJS
function convertFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8")
    let modified = false

    // Replace ES module imports with CommonJS requires
    const esImportRegex = /import\s+(?:{[^}]*}\s+from\s+)?["']([^"']*)["'];?/g
    let match
    while ((match = esImportRegex.exec(content)) !== null) {
      const importStatement = match[0]
      const moduleName = match[1]

      // Skip relative imports
      if (moduleName.startsWith("./") || moduleName.startsWith("../")) {
        continue
      }

      // Skip https imports (we'll handle them separately)
      if (moduleName.startsWith("https:")) {
        continue
      }

      const requireStatement = `const ${moduleName.split("/").pop().replace(/-/g, "_")} = require("${moduleName}");`
      content = content.replace(importStatement, requireStatement)
      modified = true
    }

    // Replace https imports with proper requires
    const httpsImportRegex = /import\s+(?:{[^}]*}\s+from\s+)?["'](https:\/\/[^"']*)["'];?/g
    while ((match = httpsImportRegex.exec(content)) !== null) {
      const importStatement = match[0]
      const url = match[1]

      let packageName = ""
      if (url.includes("supabase-js")) {
        packageName = "@supabase/supabase-js"
      } else {
        // Extract package name from URL
        const urlParts = url.split("/")
        const npmIndex = urlParts.indexOf("npm")
        if (npmIndex !== -1 && npmIndex + 1 < urlParts.length) {
          packageName = urlParts[npmIndex + 1]
        }
      }

      if (packageName) {
        const requireStatement = `const { createClient } = require("${packageName}");`
        content = content.replace(importStatement, requireStatement)
        modified = true
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8")
      console.log(`Converted imports in ${filePath}`)
    }
  } catch (error) {
    console.error(`Error converting file ${filePath}:`, error.message)
  }
}

// Start scanning from the current directory
console.log("Converting ES module imports to CommonJS...")
scanDirectory(".")
console.log("Conversion complete.")
