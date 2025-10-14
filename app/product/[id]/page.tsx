"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Heart, Share2, Plus, Minus, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useProducts } from '@/hooks/use-products'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { products, loading } = useProducts()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  const product = products.find(p => p.id === params.id)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsAnimating(false), 100)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  const images = product.images || [product.image]

  return (
    <div className="min-h-screen bg-background">
      {/* Header con navegación */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="animate-slide-in-left"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-colors ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className={`space-y-4 ${isAnimating ? 'animate-slide-in-left opacity-0' : 'animate-slide-in-left opacity-100'}`}>
            {/* Imagen principal */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-muted/30 to-muted/20">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-accent text-accent-foreground animate-bounce">
                    ⭐ Destacado
                  </Badge>
                )}
                {product.inStock ? (
                  <Badge className="bg-green-600 text-white">
                    En Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Sin Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-accent scale-105' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className={`space-y-6 ${isAnimating ? 'animate-slide-in-right opacity-0' : 'animate-slide-in-right opacity-100'}`}>
            {/* Título y precio */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-balance">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-accent">
                  ${product.price.toLocaleString()}
                </span>
                <Badge variant="outline" className="text-sm">
                  {product.category}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.8)</span>
              </div>
            </div>

            <Separator />

            {/* Descripción */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Descubre este increíble producto de nuestra colección urbana. Diseñado con los más altos estándares de calidad y estilo, perfecto para expresar tu personalidad única."}
              </p>
            </div>

            {/* Especificaciones */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Material:</span>
                  <p className="font-medium">100% Algodón Premium</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Origen:</span>
                  <p className="font-medium">Argentina</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Garantía:</span>
                  <p className="font-medium">30 días</p>
                </div>
              </div>
            </Card>

            {/* Cantidad y acciones */}
            <div className="space-y-6">
              {/* Selector de cantidad */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Botón de acción */}
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </Button>

              {!product.inStock && (
                <p className="text-sm text-muted-foreground text-center">
                  Este producto no está disponible en este momento
                </p>
              )}
            </div>

            {/* Información adicional */}
            <Card className="p-6 bg-card/30 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl mb-2">↩️</div>
                  <p className="font-medium">Devolución</p>
                  <p className="text-muted-foreground">30 días garantía</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="font-medium">Pago Seguro</p>
                  <p className="text-muted-foreground">100% protegido</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
