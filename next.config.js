// This file is not needed for static deployment but keeping for compatibility
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
