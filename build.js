const fs = require("fs")
const path = require("path")

// Create public directory if it doesn't exist
if (!fs.existsSync("public")) {
  fs.mkdirSync("public", { recursive: true })
}

// Copy static files to public directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// Copy static directory to public
copyDir("static", "public")

console.log("Build completed successfully!")
