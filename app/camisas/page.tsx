"use client"

import { ProductGrid } from '@/components/product-grid'
import { useProductsByCategory } from '@/hooks/use-products-by-category'
import { CategoryLayout } from '@/components/category-layout'

export default function ShirtsPage() {
  const { products, loading, error } = useProductsByCategory('shirts')

  return (
    <CategoryLayout>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        title="Camisas Roswell"
        description="Camisas para completar tu outfit urbano con estilo."
      />
    </CategoryLayout>
  )
}


