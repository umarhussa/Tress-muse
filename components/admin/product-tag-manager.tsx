"use client"

import { useState } from "react"
import { updateProductTags } from "@/app/actions/product-actions"

interface ProductTagManagerProps {
  productId: string
  initialTags: {
    premium?: boolean
    bestSeller?: boolean
    featured?: boolean
  }
}

export function ProductTagManager({ productId, initialTags }: ProductTagManagerProps) {
  const [tags, setTags] = useState(initialTags)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleToggleTag = (tag: keyof typeof tags) => {
    setTags((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }))
  }

  const handleSaveChanges = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const result = await updateProductTags(productId, tags)

      if (result.success) {
        setMessage("Tags updated successfully!")
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage("An unexpected error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium">Product Tags</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="premium-toggle" className="font-medium text-gray-700">
            Premium Product
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="premium-toggle"
              checked={tags.premium || false}
              onChange={() => handleToggleTag("premium")}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="premium-toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                tags.premium ? "bg-amber-500" : "bg-gray-300"
              }`}
            ></label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="bestseller-toggle" className="font-medium text-gray-700">
            Best Seller
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="bestseller-toggle"
              checked={tags.bestSeller || false}
              onChange={() => handleToggleTag("bestSeller")}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="bestseller-toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                tags.bestSeller ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="featured-toggle" className="font-medium text-gray-700">
            Featured Product
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="featured-toggle"
              checked={tags.featured || false}
              onChange={() => handleToggleTag("featured")}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="featured-toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                tags.featured ? "bg-purple-500" : "bg-gray-300"
              }`}
            ></label>
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save All Changes"}
      </button>

      {message && (
        <div
          className={`p-2 text-sm rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message}
        </div>
      )}

      <style jsx>{`
        .toggle-checkbox:checked + .toggle-label {
          transition: background-color 0.3s ease-in;
        }
        .toggle-checkbox:checked {
          right: 0;
          border-color: white;
          transition: right 0.3s ease-in, border-color 0.3s ease-in;
        }
        .toggle-checkbox {
          right: 4px;
          transition: right 0.3s ease-in, border-color 0.3s ease-in;
        }
        .toggle-label {
          transition: background-color 0.3s ease-in;
        }
      `}</style>
    </div>
  )
}
