"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return
    addToCart(product, selectedSize, selectedColor, 1)
    setSelectedSize("")
    setSelectedColor("")
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.featured && <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Destacado</Badge>}
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-3 left-24">Sin Stock</Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 h-8 w-8 p-0 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-balance">{product.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${product.price.toLocaleString('es-AR')}</span>
            <Badge variant="outline" className="capitalize">
              {product.category === 'hoodies' ? 'Buzos' : 
               product.category === 'tshirts' ? 'Remeras' : 
               product.category === 'pants' ? 'Pantalones' : 
               product.category === 'accessories' ? 'Accesorios' : 
               product.category === 'shoes' ? 'Zapatillas' : product.category}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger>
              <SelectValue placeholder="Talle" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger>
              <SelectValue placeholder="Color" />
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

        <Button
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor || !product.inStock}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
        </Button>
      </CardFooter>
    </Card>
  )
}
