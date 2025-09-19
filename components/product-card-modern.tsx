"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Zap, ShoppingCart } from "lucide-react"
import { useStore } from "@/lib/store"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  const { addToCart } = useStore()

  const handleViewDetails = () => {
    console.log('Botón Ver detalles clickeado para producto:', product.id)
    router.push(`/product/${product.id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Botón Agregar al carrito clickeado')
    
    if (isAnimating || !product.inStock) return
    
    setIsAnimating(true)
    
    // Agregar al carrito (usando el primer talle y color disponible)
    const defaultSize = product.sizes[0] || 'M'
    const defaultColor = product.colors[0] || 'Negro'
    addToCart(product, defaultSize, defaultColor, 1)
    
    // Secuencia de animaciones: wheelie -> crash -> reset
    setTimeout(() => {
      // Cambiar a animación de crash después del wheelie
      const cartIcon = document.querySelector('.cart-animation')
      if (cartIcon) {
        cartIcon.classList.remove('cart-animation')
        cartIcon.classList.add('cart-crash')
      }
    }, 600) // Después del wheelie
    
    // Resetear la animación después de que termine todo
    setTimeout(() => {
      setIsAnimating(false)
      const cartIcon = document.querySelector('.cart-crash')
      if (cartIcon) {
        cartIcon.classList.remove('cart-crash')
      }
    }, 1000) // Duración total de la animación
  }

  return (
    <Card 
      className="group relative overflow-hidden border border-border/20 bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-sm hover:from-card hover:via-card/90 hover:to-card/80 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-accent/10 cursor-pointer"
      onClick={() => {
        console.log('Card clickeada para producto:', product.id)
        router.push(`/product/${product.id}`)
      }}
    >
      {/* Bordes animados */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg pointer-events-none" />
      
      {/* Imagen del producto con overlay */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/20">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Overlay gradiente en la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges flotantes */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.featured && (
            <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white border-0 shadow-lg backdrop-blur-sm animate-pulse">
              <Star className="w-3 h-3 mr-1" />
              Destacado
            </Badge>
          )}
        </div>

        {/* Botón de favoritos flotante */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-4 right-4 h-10 w-10 p-0 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 transition-all duration-300 ${
            isLiked ? "text-red-500 bg-red-500/20" : "text-white hover:text-red-400"
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
        >
          <Heart className={`h-4 w-4 transition-all duration-300 ${isLiked ? "fill-current scale-110" : ""}`} />
        </Button>

        {/* Información superpuesta en la imagen */}
        <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Talles:</span>
              <span className="font-semibold text-foreground">{product.sizes.join(", ")}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground font-medium">Colores:</span>
              <span className="font-semibold text-foreground">{product.colors.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal con layout asimétrico */}
      <CardContent className="p-6 space-y-4 relative z-10">
        {/* Título y categoría con jerarquía clara */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-xl text-foreground line-clamp-2 leading-tight">
              {product.title}
            </h3>
            <Badge 
              variant="outline" 
              className="ml-3 capitalize text-xs font-semibold bg-gradient-to-r from-accent/10 to-accent/5 border-accent/30 text-accent"
            >
              {product.category === 'hoodies' ? 'Buzos' : 
               product.category === 'tshirts' ? 'Remeras' : 
               product.category === 'pants' ? 'Pantalones' : 
               product.category === 'coats' ? 'Abrigos' :
               product.category === 'accessories' ? 'Accesorios' : 
               product.category === 'shoes' ? 'Zapatillas' : product.category}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Precio y estado con layout asimétrico */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <span className="text-2xl font-black text-foreground bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              ${product.price.toLocaleString('es-AR')}
            </span>
            <div className="text-xs text-muted-foreground font-medium">
              {product.sizes.length} talles • {product.colors.length} colores
            </div>
          </div>
          
          <Badge 
            variant={product.inStock ? "default" : "destructive"} 
            className={`text-xs font-semibold px-3 py-1 ${
              product.inStock 
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" 
                : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
            }`}
          >
            {product.inStock ? "Disponible" : "Sin Stock"}
          </Badge>
        </div>

        {/* Acciones primarias */}
        <div className="pt-4 border-t border-border/50"> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0"> 
            <Button 
              className={`w-full h-11 md:h-12 px-2 justify-center gap-1.5 shadow-sm text-xs relative overflow-hidden ${
                isAnimating ? 'button-shake' : ''
              } ${
                !product.inStock 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'text-white bg-white hover:bg-gray-100'
              }`}
              onClick={handleAddToCart}
              disabled={isAnimating || !product.inStock}
            >
              <ShoppingCart className={`w-3.5 h-3.5 shrink-0 ${isAnimating ? 'cart-animation' : ''}`} />
              <span className={`truncate ${isAnimating ? 'text-bounce' : ''}`}>
                {!product.inStock ? 'Sin Stock' : 'Agregar al carrito'}
              </span>
            </Button>


            <Button 
              variant="outline" 
              className="w-full h-11 md:h-12 px-4 justify-center gap-2 text-xs md:text-sm relative z-10"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleViewDetails()
              }}
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
