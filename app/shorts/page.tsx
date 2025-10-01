"use client"

import { ProductGrid } from '@/components/product-grid'
import { useProductsByCategory } from '@/hooks/use-products-by-category'
import { CategoryLayout } from '@/components/category-layout'

export default function ShortsPage() {
  const { products, loading, error } = useProductsByCategory('shorts')

  return (
    <CategoryLayout>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        title="Shorts Roswell"
        description="Shorts cómodos y urbanos para todos los días."
      />
    </CategoryLayout>
  )
}


