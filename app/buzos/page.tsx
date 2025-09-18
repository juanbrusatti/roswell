"use client"

import { ProductGrid } from '@/components/product-grid'
import { useProductsByCategory } from '@/hooks/use-products-by-category'
import { CategoryLayout } from '@/components/category-layout'

export default function HoodiesPage() {
  const { products, loading, error } = useProductsByCategory('hoodies')

  return (
    <CategoryLayout>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        title="Buzos Roswell"
        description="Descubrí nuestra colección completa de buzos. Diseños únicos que definen tu personalidad."
      />
    </CategoryLayout>
  )
}
