const fs = require("fs")
const path = require("path")

// Directories to ignore
const ignoreDirs = ["node_modules", ".next", "out", ".git", ".vercel", "dist"]

// Function to scan a directory recursively
function scanDirectory(dir) {
  const results = []

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        if (!ignoreDirs.includes(entry.name)) {
          results.push(...scanDirectory(fullPath))
        }
        continue
      }

      // Skip binary files and very large files
      const stats = fs.statSync(fullPath)
      if (stats.size > 1024 * 1024) {
        // Skip files larger than 1MB
        continue
      }

      try {
        const content = fs.readFileSync(fullPath, "utf8")
        if (content.includes("https:")) {
          results.push({
            file: fullPath,
            lines: content
              .split("\n")
              .map((line, i) => ({ lineNumber: i + 1, content: line }))
              .filter((line) => line.content.includes("https:")),
          })
        }
      } catch (error) {
        console.error(`Error reading file ${fullPath}:`, error.message)
      }
    }

    return results
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message)
    return results
  }
}

// Start scanning from the current directory
console.log('Scanning for all "https:" references...')
const results = scanDirectory(".")

if (results.length === 0) {
  console.log('No "https:" references found!')
} else {
  console.log(`Found "https:" references in ${results.length} files:`)

  results.forEach((result) => {
    console.log(`\nFile: ${result.file}`)
    result.lines.forEach((line) => {
      console.log(`  Line ${line.lineNumber}: ${line.content.trim()}`)
    })
  })
}
