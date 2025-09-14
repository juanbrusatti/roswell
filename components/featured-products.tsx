"use client"

import { useProducts } from "@/hooks/use-products"
import { ProductCard } from "./product-card-improved"

export function FeaturedProducts() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <p>Cargando productos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-red-500">Error al cargar los productos: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="featured-products" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Nuestra Colección</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubrí nuestra selección completa de prendas urbanas que definen la cultura de la calle.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay productos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
