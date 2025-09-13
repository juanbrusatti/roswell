"use client"

import { useStore } from "@/lib/store"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  const { products } = useStore()
  const featuredProducts = products.filter((product) => product.featured)

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Featured Collection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our handpicked selection of the hottest streetwear pieces that define urban culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
