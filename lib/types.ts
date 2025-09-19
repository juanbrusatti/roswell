export interface Product {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  category: "hoodies" | "tshirts" | "pants" | "coats" | "accessories" | "shoes"
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  createdAt: Date
}

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

export interface AdminUser {
  id: string
  email: string
  isAdmin: boolean
}
