import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://yvnsgflmivcotvmklzvw.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bnNnZmxtaXZjb3R2bWtsenZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDMzOTksImV4cCI6MjA1NjIxOTM5OX0.14RyvvWvfoOvQQGjzebucBPX_foVOD18z_E_-oeNtoU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: number
  name: string
  description: string
  price: number
  phone: string
  whatsapp: string
  images: string
  created_at: string
}

export type Review = {
  id: number
  name: string
  rating: number
  comment: string
  created_at: string
}
