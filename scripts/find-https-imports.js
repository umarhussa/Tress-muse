const fs = require("fs")
const path = require("path")

// Directories to ignore
const ignoreDirs = ["node_modules", ".next", "out", ".git", ".vercel"]

// File extensions to check
const extensions = [".js", ".jsx", ".ts", ".tsx", ".json", ".html"]

// Function to scan a directory recursively
function scanDirectory(dir) {
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
      checkFile(fullPath)
    }
  }
}

// Function to check a file for problematic imports
function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    // Check for imports from https: URLs
    const importRegex = /import\s+.*\s+from\s+["']https:/g
    const requireRegex = /require\s*\(\s*["']https:/g
    const cdnRegex = /from\s+["']https:\/\/cdn\.jsdelivr\.net/g

    let match
    let found = false

    if (importRegex.test(content) || requireRegex.test(content) || cdnRegex.test(content)) {
      console.log(`Found problematic imports in ${filePath}:`)
      found = true

      // Get the lines with the problematic imports
      const lines = content.split("\n")
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.match(importRegex) || line.match(requireRegex) || line.match(cdnRegex)) {
          console.log(`  Line ${i + 1}: ${line.trim()}`)
        }
      }
    }

    if (found) {
      console.log("")
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`)
  }
}

console.log("Scanning for problematic imports...")
scanDirectory(".")
console.log("Scan complete.")
