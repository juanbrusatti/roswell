"use client"

import { ProductGrid } from '@/components/product-grid'
import { useProductsByCategory } from '@/hooks/use-products-by-category'
import { CategoryLayout } from '@/components/category-layout'

export default function PantsPage() {
  const { products, loading, error } = useProductsByCategory('pants')

  return (
    <CategoryLayout>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        title="Pantalones Roswell"
        description="Joggings, cargos y pantalones con estilo. Perfecta combinación de comodidad y diseño."
      />
    </CategoryLayout>
  )
}
