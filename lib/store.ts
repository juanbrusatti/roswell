"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, CartItem } from "./types"

// Mock product data for demonstration
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Urban Oversized Hoodie",
    description: "Premium cotton blend hoodie with street-inspired graphics. Perfect for layering and everyday wear.",
    price: 89.99,
    images: ["/urban-oversized-hoodie-streetwear.jpg"],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Street Graphic Tee",
    description: "Bold graphic tee with original street art design. Made from sustainable organic cotton.",
    price: 34.99,
    images: ["/street-graphic-tee-urban-design.jpg"],
    category: "tshirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Cargo Joggers",
    description: "Comfortable cargo joggers with multiple pockets. Perfect blend of style and functionality.",
    price: 79.99,
    images: ["/cargo-joggers-streetwear-pants.jpg"],
    category: "pants",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive", "Gray"],
    inStock: true,
    featured: false,
    createdAt: new Date(),
  },
]

interface ProductStore {
  products: Product[]
  cart: CartItem[]
  isAdmin: boolean
  isAuthenticated: boolean
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addToCart: (product: Product, size: string, color: string, quantity: number) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Credenciales de administrador (en producción esto debería estar en variables de entorno)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "roswell2024" // Cambia esto por una contraseña segura
}

export const useStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      cart: [],
      isAdmin: false,
      isAuthenticated: false,

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: Date.now().toString(),
          createdAt: new Date(),
        }
        set((state) => ({
          products: [...state.products, newProduct],
        }))
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) => (product.id === id ? { ...product, ...updates } : product)),
        }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }))
      },

      addToCart: (product, size, color, quantity) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.size === size && item.color === color,
          )

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item === existingItem ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }

          return {
            cart: [...state.cart, { product, size, color, quantity }],
          }
        })
      },

      removeFromCart: (productId, size, color) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.size === size && item.color === color),
          ),
        }))
      },

      updateCartQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size, color)
          return
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart: () => {
        set({ cart: [] })
      },

      login: (username, password) => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          set({ isAuthenticated: true, isAdmin: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ isAuthenticated: false, isAdmin: false })
      },
    }),
    {
      name: "street-store",
    },
  ),
)
