"use client"

import { ProductGrid } from '@/components/product-grid'
import { useProductsByCategory } from '@/hooks/use-products-by-category'
import { CategoryLayout } from '@/components/category-layout'

export default function TshirtsPage() {
  const { products, loading, error } = useProductsByCategory('tshirts')

  return (
    <CategoryLayout>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        title="Remeras Roswell"
        description="Remeras con diseños audaces. Algodón premium para máxima comodidad."
      />
    </CategoryLayout>
  )
}
