"use client"

import { useProducts } from './use-products'
import type { Product } from '@/lib/types'

export function useProductsByCategory(category: string) {
  const { products, loading, error } = useProducts()
  
  const filteredProducts = products.filter(product => product.category === category)
  
  return {
    products: filteredProducts,
    loading,
    error,
    totalCount: filteredProducts.length
  }
}
