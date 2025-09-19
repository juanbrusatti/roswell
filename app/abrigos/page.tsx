"use client"

import { ProductGrid } from '@/components/product-grid'
import { useProductsByCategory } from '@/hooks/use-products-by-category'
import { CategoryLayout } from '@/components/category-layout'

export default function CoatsPage() {
  const { products, loading, error } = useProductsByCategory('coats')

  return (
    <CategoryLayout>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        title="Abrigos Roswell"
        description="Descubrí nuestra colección completa de abrigos. Diseños únicos que definen tu personalidad."
      />
    </CategoryLayout>
  )
}
