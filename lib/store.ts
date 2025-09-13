"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, CartItem } from "./types"

// Datos de productos de demostración
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Buzo Oversized Urbano",
    description: "Buzo de algodón premium con gráficos inspirados en la calle. Perfecto para usar en capas y para el día a día.",
    price: 89999,
    images: ["/urban-oversized-hoodie-streetwear.jpg"],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Blanco", "Gris"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Remera Gráfica Street",
    description: "Remera con diseño gráfico audaz inspirado en el arte callejero. Hecha de algodón orgánico sustentable.",
    price: 34999,
    images: ["/street-graphic-tee-urban-design.jpg"],
    category: "tshirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Azul Marino"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Jogging Cargo",
    description: "Jogging cargo cómodo con múltiples bolsillos. Perfecta combinación de estilo y funcionalidad.",
    price: 79999,
    images: ["/cargo-joggers-streetwear-pants.jpg"],
    category: "pants",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Verde Oliva", "Gris"],
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
  password: "roswell2025" // Cambia esto por una contraseña segura
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
