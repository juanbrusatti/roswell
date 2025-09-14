"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Zap } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-sm hover:from-white/90 hover:via-white/70 hover:to-white/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-accent/20">
      {/* Bordes animados */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
      
      {/* Imagen del producto con overlay */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30">
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
          {!product.inStock && (
            <Badge variant="destructive" className="shadow-lg backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-1" />
              Sin Stock
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
          onClick={() => setIsLiked(!isLiked)}
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
      <CardContent className="p-6 space-y-4">
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

        {/* Información adicional en capas */}
        <div className="pt-3 border-t border-gradient-to-r from-transparent via-muted to-transparent">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
                Envío gratis
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Stock disponible
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
