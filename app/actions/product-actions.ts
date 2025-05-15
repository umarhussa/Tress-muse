"use server"

import { revalidatePath } from "next/cache"
import { updateProductMetadata } from "@/lib/supabase"

export async function toggleProductTag(id: string, tag: "premium" | "bestSeller" | "featured", value: boolean) {
  try {
    const metadata = {
      [tag]: value,
    }

    await updateProductMetadata(id, metadata)

    // Revalidate the products page and the specific product page
    revalidatePath("/products")
    revalidatePath(`/products/${id}`)

    return { success: true }
  } catch (error) {
    console.error(`Error toggling ${tag} tag:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function updateProductTags(
  id: string,
  tags: {
    premium?: boolean
    bestSeller?: boolean
    featured?: boolean
  },
) {
  try {
    await updateProductMetadata(id, tags)

    // Revalidate the products page and the specific product page
    revalidatePath("/products")
    revalidatePath(`/products/${id}`)

    return { success: true }
  } catch (error) {
    console.error("Error updating product tags:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
