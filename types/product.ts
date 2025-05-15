export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category?: string
  metadata?: ProductMetadata
  created_at?: string
  updated_at?: string
}

export interface ProductMetadata {
  premium?: boolean
  bestSeller?: boolean
  featured?: boolean
}

export interface ProductFilter {
  category?: string
  premium?: boolean
  bestSeller?: boolean
  featured?: boolean
  sortBy?: "created_at" | "price" | "name"
  sortOrder?: "asc" | "desc"
}
