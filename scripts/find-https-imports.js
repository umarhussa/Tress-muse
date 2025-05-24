const fs = require("fs")
const path = require("path")

// Patterns that might cause the https: package error
const problematicPatterns = [
  'import * from "https:',
  'import from "https:',
  'require("https:',
  '"dependencies": {[\\s\\S]*?"https:',
  '"devDependencies": {[\\s\\S]*?"https:',
  'from "https:',
  "from 'https:",
  'url: "https:',
  "url: 'https:",
  'href="https:',
  "href='https:",
  'src="https:',
  "src='https:",
]

// File extensions to check
const extensions = [".js", ".jsx", ".ts", ".tsx", ".json", ".html", ".css"]

// Directories to ignore
const ignoreDirs = ["node_modules", ".next", "out", ".git", ".vercel"]

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
        checkFile(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error)
  }
}

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    for (const pattern of problematicPatterns) {
      const regex = new RegExp(pattern, "i")
      if (regex.test(content)) {
        console.log(`Found problematic pattern in ${filePath}:`)
        console.log(`  Pattern: ${pattern}`)

        // Extract the context around the match
        const lines = content.split("\n")
        for (let i = 0; i < lines.length; i++) {
          if (regex.test(lines[i])) {
            console.log(`  Line ${i + 1}: ${lines[i].trim()}`)
          }
        }
        console.log()
      }
    }
  } catch (error) {
    console.error(`Error checking file ${filePath}:`, error)
  }
}

// Start scanning from the current directory
console.log("Scanning for problematic imports...")
scanDirectory(".")
console.log("Scan complete.")
