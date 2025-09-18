"use client"

import { ProductCard } from './product-card-modern'
import type { Product } from '@/lib/types'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  error?: string | null
  title?: string
  description?: string
}

export function ProductGrid({ 
  products, 
  loading = false, 
  error = null, 
  title,
  description 
}: ProductGridProps) {
  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              ))}
            </div>
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
            <p className="text-red-500 text-lg">Error al cargar los productos: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Header con animación */}
        {(title || description) && (
          <div className="text-center mb-12 animate-fade-in">
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                {description}
              </p>
            )}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold mb-2">No hay productos disponibles</h3>
            <p className="text-muted-foreground">
              Pronto agregaremos más productos a esta categoría.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-slide-up-stagger opacity-0"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
