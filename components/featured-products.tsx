"use client"

import { usePaginatedProducts } from "@/hooks/use-paginated-products"
import { ProductCard } from "./product-card-modern"
import { Pagination } from "./ui/pagination"

export function FeaturedProducts() {
  const { 
    products, 
    loading, 
    error, 
    totalPages, 
    currentPage, 
    goToPage,
    totalItems 
  } = usePaginatedProducts({ 
    itemsPerPage: 8, 
    filterFeatured: true 
  })

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
            <p className="text-red-500">Error al cargar los productos: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="featured-products" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Productos Destacados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubrí nuestra selección de prendas urbanas más populares.
          </p>
          {totalItems > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Mostrando {products.length} de {totalItems} productos destacados
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">No hay productos destacados</h3>
            <p className="text-muted-foreground">
              Pronto agregaremos productos destacados a nuestra colección.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-slide-up-stagger opacity-0"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 animate-fade-in">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
