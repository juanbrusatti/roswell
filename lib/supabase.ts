import { createClient } from '@supabase/supabase-js'

// Estas son las credenciales de ejemplo. En producción deberías usar variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tu-proyecto.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tu-clave-publica'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          category: 'hoodies' | 'tshirts' | 'pants' | 'accessories' | 'shoes'
          sizes: string[]
          colors: string[]
          images: string[]
          in_stock: boolean
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          category: 'hoodies' | 'tshirts' | 'pants' | 'accessories' | 'shoes'
          sizes: string[]
          colors: string[]
          images: string[]
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          category?: 'hoodies' | 'tshirts' | 'pants' | 'accessories' | 'shoes'
          sizes?: string[]
          colors?: string[]
          images?: string[]
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
