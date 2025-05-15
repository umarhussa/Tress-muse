import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Product-related functions
export async function getProducts(filters?: any) {
  let query = supabase.from("products").select("*")

  // Apply filters if provided
  if (filters) {
    if (filters.category) {
      query = query.eq("category", filters.category)
    }

    if (filters.premium === true) {
      query = query.contains("metadata", { premium: true })
    }

    if (filters.bestSeller === true) {
      query = query.contains("metadata", { bestSeller: true })
    }
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getProductById(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function updateProductMetadata(id: string, metadata: any) {
  // First get the current metadata
  const { data: product, error: fetchError } = await supabase.from("products").select("metadata").eq("id", id).single()

  if (fetchError) {
    console.error("Error fetching product metadata:", fetchError)
    throw fetchError
  }

  // Merge the current metadata with the new metadata
  const updatedMetadata = {
    ...(product?.metadata || {}),
    ...metadata,
  }

  // Update the product with the new metadata
  const { error: updateError } = await supabase.from("products").update({ metadata: updatedMetadata }).eq("id", id)

  if (updateError) {
    console.error("Error updating product metadata:", updateError)
    throw updateError
  }

  return { success: true }
}
