const fs = require("fs")
const path = require("path")

// Directories to ignore
const ignoreDirs = ["node_modules", ".next", "out", ".git", ".vercel", "dist"]

// File extensions to check
const extensions = [".js", ".jsx", ".ts", ".tsx", ".json", ".html", ".mjs", ".cjs"]

// Patterns to look for and their replacements
const replacements = [
  {
    pattern: /import\s+.*\s+from\s+["']https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js\/\+esm["']/g,
    replacement: 'import { createClient } from "@supabase/supabase-js"',
  },
  {
    pattern: /import\s+.*\s+from\s+["']https:\/\/cdn\.jsdelivr\.net\/npm\/.*["']/g,
    replacement: "// Import replaced with npm package - please check the correct import",
  },
  {
    pattern: /require\s*$$\s*["']https:\/\/.*["']\s*$$/g,
    replacement: "// Require replaced with npm package - please check the correct import",
  },
]

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
        fixFile(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error)
  }
}

// Function to fix a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8")
    let modified = false

    for (const { pattern, replacement } of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement)
        modified = true
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8")
      console.log(`Fixed imports in ${filePath}`)
    }
  } catch (error) {
    console.error(`Error fixing file ${filePath}:`, error)
  }
}

// Start scanning from the current directory
console.log("Fixing problematic imports...")
scanDirectory(".")
console.log("Fix complete.")
