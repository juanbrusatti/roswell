"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Heart, Check } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) return
    
    setIsAddingToCart(true)
    try {
      addToCart(product, selectedSize, selectedColor, 1)
      // Mostrar feedback visual
      setTimeout(() => {
        setSelectedSize("")
        setSelectedColor("")
        setIsAddingToCart(false)
      }, 1000)
    } catch (error) {
      setIsAddingToCart(false)
    }
  }

  const isReadyToAdd = selectedSize && selectedColor && product.inStock

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
      </CardContent>

      {/* Footer con controles */}
      <CardFooter className="p-4 pt-0 space-y-3">
        {/* Selectores de talle y color */}
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Talle
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar talle" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Color
            </label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botón de agregar al carrito */}
        <Button
          onClick={handleAddToCart}
          disabled={!isReadyToAdd || isAddingToCart}
          className={`w-full h-11 ${!isReadyToAdd ? "opacity-50" : "hover:bg-accent"}`}
          variant="default"
        >
          <div className="flex items-center justify-center">
            {isAddingToCart ? (
              <Check className="w-4 h-4 mr-2 text-green-600" />
            ) : (
              <ShoppingCart className="w-4 h-4 mr-2" />
            )}
            {isAddingToCart ? "¡Agregado!" : 
             !product.inStock ? "Sin Stock" : 
             !selectedSize || !selectedColor ? "Selecciona talle y color" : 
             "Agregar al Carrito"}
          </div>
        </Button>

        {/* Información adicional */}
        <div className="text-xs text-muted-foreground text-center">
          {product.sizes.length} talles • {product.colors.length} colores disponibles
        </div>
      </CardFooter>
    </Card>
  )
}
