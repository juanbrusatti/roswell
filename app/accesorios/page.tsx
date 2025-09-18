"use client"

import { ProductGrid } from '@/components/product-grid'
import { useProductsByCategory } from '@/hooks/use-products-by-category'
import { CategoryLayout } from '@/components/category-layout'

export default function AccessoriesPage() {
  const { products, loading, error } = useProductsByCategory('accessories')

  return (
    <CategoryLayout>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        title="Accesorios Roswell"
        description="Completa tu look con nuestros accesorios exclusivos."
      />
    </CategoryLayout>
  )
}
