"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface ProductFilterProps {
  categories: string[]
  initialFilters?: {
    category?: string
    premium?: boolean
    bestSeller?: boolean
    featured?: boolean
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }
  onFilterChange: (filters: any) => void
}

export function ProductFilter({ categories, initialFilters = {}, onFilterChange }: ProductFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    category: initialFilters.category || undefined,
    premium: initialFilters.premium,
    bestSeller: initialFilters.bestSeller,
    featured: initialFilters.featured,
    sortBy: initialFilters.sortBy || "created_at",
    sortOrder: initialFilters.sortOrder || "desc",
  })

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.category) params.set("category", filters.category)
    if (filters.premium !== undefined) params.set("premium", String(filters.premium))
    if (filters.bestSeller !== undefined) params.set("bestSeller", String(filters.bestSeller))
    if (filters.featured !== undefined) params.set("featured", String(filters.featured))
    if (filters.sortBy) params.set("sortBy", filters.sortBy)
    if (filters.sortOrder) params.set("sortOrder", filters.sortOrder)

    router.push(`?${params.toString()}`, { scroll: false })
    onFilterChange(filters)
  }, [filters, router, onFilterChange])

  // Initialize filters from URL on first load
  useEffect(() => {
    const category = searchParams.get("category") || undefined
    const premium =
      searchParams.get("premium") === "true" ? true : searchParams.get("premium") === "false" ? false : undefined
    const bestSeller =
      searchParams.get("bestSeller") === "true" ? true : searchParams.get("bestSeller") === "false" ? false : undefined
    const featured =
      searchParams.get("featured") === "true" ? true : searchParams.get("featured") === "false" ? false : undefined
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc"

    setFilters({
      category,
      premium,
      bestSeller,
      featured,
      sortBy,
      sortOrder,
    })
  }, [searchParams])

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: value === "all" ? undefined : value,
    }))
  }

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked ? true : undefined,
    }))
  }

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-") as [string, "asc" | "desc"]
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }))
  }

  const resetFilters = () => {
    setFilters({
      category: undefined,
      premium: undefined,
      bestSeller: undefined,
      featured: undefined,
      sortBy: "created_at",
      sortOrder: "desc",
    })
  }

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <div>
        <h3 className="text-lg font-medium mb-3">Filters</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={filters.category || "all"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <p className="block text-sm font-medium text-gray-700">Product Type</p>

            <div className="flex items-center">
              <input
                id="premium"
                type="checkbox"
                checked={filters.premium === true}
                onChange={(e) => handleCheckboxChange("premium", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="premium" className="ml-2 block text-sm text-gray-700">
                Premium Products
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="bestSeller"
                type="checkbox"
                checked={filters.bestSeller === true}
                onChange={(e) => handleCheckboxChange("bestSeller", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="bestSeller" className="ml-2 block text-sm text-gray-700">
                Best Sellers
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="featured"
                type="checkbox"
                checked={filters.featured === true}
                onChange={(e) => handleCheckboxChange("featured", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Products
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
          Sort By
        </label>
        <select
          id="sort"
          value={`${filters.sortBy || "created_at"}-${filters.sortOrder || "desc"}`}
          onChange={(e) => handleSortChange(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="created_at-desc">Newest First</option>
          <option value="created_at-asc">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Reset Filters
      </button>
    </div>
  )
}
