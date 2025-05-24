const fs = require("fs")
const path = require("path")

// Directories to ignore
const ignoreDirs = ["node_modules", ".next", "out", ".git", ".vercel", "dist"]

// File extensions to check
const extensions = [".js", ".jsx", ".ts", ".tsx", ".json", ".html", ".mjs", ".cjs"]

// Patterns to look for
const patterns = [
  { regex: /import\s+.*\s+from\s+["']https:\/\//, description: "ES6 import from https URL" },
  { regex: /import\s*\(["']https:\/\//, description: "Dynamic import from https URL" },
  { regex: /require\s*\(\s*["']https:\/\//, description: "CommonJS require from https URL" },
  { regex: /from\s+["']https:\/\//, description: "from clause with https URL" },
  { regex: /"dependencies"\s*:\s*{[^}]*"https:/, description: "https URL in dependencies" },
  { regex: /"devDependencies"\s*:\s*{[^}]*"https:/, description: "https URL in devDependencies" },
  { regex: /cdn\.jsdelivr\.net/, description: "jsdelivr CDN reference" },
  { regex: /unpkg\.com/, description: "unpkg CDN reference" },
  { regex: /cdnjs\.cloudflare\.com/, description: "cdnjs CDN reference" },
  { regex: /esm\.sh/, description: "esm.sh CDN reference" },
  { regex: /skypack\.dev/, description: "skypack.dev CDN reference" },
]

// Results storage
const results = []

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
        checkFile(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error)
  }
}

// Function to check a file for problematic imports
function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split("\n")
    let fileHasIssues = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      for (const pattern of patterns) {
        if (pattern.regex.test(line)) {
          if (!fileHasIssues) {
            results.push({ file: filePath, issues: [] })
            fileHasIssues = true
          }

          results[results.length - 1].issues.push({
            line: i + 1,
            content: line.trim(),
            description: pattern.description,
          })

          break // Only report one pattern per line
        }
      }
    }
  } catch (error) {
    console.error(`Error checking file ${filePath}:`, error)
  }
}

// Start scanning from the current directory
console.log("Scanning for problematic imports...")
scanDirectory(".")

// Print results
if (results.length === 0) {
  console.log("No problematic imports found!")
} else {
  console.log(`Found problematic imports in ${results.length} files:`)

  results.forEach((result) => {
    console.log(`\nFile: ${result.file}`)
    result.issues.forEach((issue) => {
      console.log(`  Line ${issue.line}: ${issue.description}`)
      console.log(`    ${issue.content}`)
    })
  })

  console.log("\nPlease fix these imports to avoid deployment errors.")
}
