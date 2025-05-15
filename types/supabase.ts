export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          metadata: Json | null
          name: string | null
          price: number | null
          phone: string | null
          whatsapp: string | null
        }
        Insert: {
          category: string | null
          created_at?: string
          description: string | null
          id?: string
          image_url: string | null
          metadata: Json | null
          name: string | null
          price: number | null
          phone: string | null
          whatsapp: string | null
        }
        Update: {
          category: string | null
          created_at?: string
          description: string | null
          id?: string
          image_url: string | null
          metadata: Json | null
          name: string | null
          price: number | null
          phone: string | null
          whatsapp: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          review: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string | null
          review: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name: string | null
          review: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
