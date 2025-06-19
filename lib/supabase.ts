import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          images: string
          phone: string
          whatsapp: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          images: string
          phone: string
          whatsapp: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          images?: string
          phone?: string
          whatsapp?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: number
          name: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          rating?: number
          comment?: string
          created_at?: string
        }
      }
    }
  }
}
