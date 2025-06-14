"use client"

import { useState, useEffect } from "react"
import { supabase, type Review } from "@/lib/supabase"

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reviews")
    } finally {
      setLoading(false)
    }
  }

  const addReview = async (name: string, review: string) => {
    try {
      const { error } = await supabase.from("reviews").insert([{ name, review }])

      if (error) throw error
      await fetchReviews() // Refresh reviews
      return true
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to add review")
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return { reviews, loading, error, addReview, refetch: fetchReviews }
}
