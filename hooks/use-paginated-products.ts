"use client"

import { useState, useMemo } from 'react'
import { useProducts } from './use-products'
import type { Product } from '@/lib/types'

interface UsePaginatedProductsProps {
  itemsPerPage?: number
  filterFeatured?: boolean
  category?: string
}

export function usePaginatedProducts({ 
  itemsPerPage = 8, 
  filterFeatured = false,
  category 
}: UsePaginatedProductsProps = {}) {
  const { products, loading, error } = useProducts()
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (filterFeatured) {
      filtered = filtered.filter(product => product.featured)
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category)
    }

    return filtered
  }, [products, filterFeatured, category])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    
    return {
      products: paginatedProducts,
      totalItems: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
      currentPage,
      hasNextPage: endIndex < filteredProducts.length,
      hasPrevPage: currentPage > 1
    }
  }, [filteredProducts, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, paginatedData.totalPages)))
  }

  const nextPage = () => {
    if (paginatedData.hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (paginatedData.hasPrevPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  return {
    ...paginatedData,
    loading,
    error,
    goToPage,
    nextPage,
    prevPage,
    itemsPerPage
  }
}
