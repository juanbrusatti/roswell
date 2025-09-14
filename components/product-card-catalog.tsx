"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-accent text-accent-foreground text-xs">
              Destacado
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="text-xs">
              Sin Stock
            </Badge>
          )}
        </div>

        {/* Botón de favoritos */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background/90 ${
            isLiked ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>
      </div>

      {/* Contenido del producto */}
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-balance line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toLocaleString('es-AR')}
          </span>
          <Badge variant="outline" className="capitalize text-xs">
            {product.category === 'hoodies' ? 'Buzos' : 
             product.category === 'tshirts' ? 'Remeras' : 
             product.category === 'pants' ? 'Pantalones' : 
             product.category === 'accessories' ? 'Accesorios' : 
             product.category === 'shoes' ? 'Zapatillas' : product.category}
          </Badge>
        </div>

        {/* Información de talles y colores */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Talles:</span>
            <span className="font-medium">{product.sizes.join(", ")}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Colores:</span>
            <span className="font-medium">{product.colors.join(", ")}</span>
          </div>
        </div>

        {/* Estado del producto */}
        <div className="flex items-center justify-center pt-2">
          <Badge 
            variant={product.inStock ? "default" : "destructive"} 
            className="text-xs"
          >
            {product.inStock ? "Disponible" : "Sin Stock"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
