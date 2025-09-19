"use client"

import { useState } from "react"
import Image from "next/image"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ChevronDown } from "lucide-react"

interface CartSidebarProps {
  children: React.ReactNode
}

export function CartSidebar({ children }: CartSidebarProps) {
  const { cart, removeFromCart, updateCartQuantity, clearCart, addToCart } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  const handleQuantityChange = (productId: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size, color)
    } else {
      updateCartQuantity(productId, size, color, newQuantity)
    }
  }

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    removeFromCart(productId, size, color)
  }

  const handleUpdateItemSize = (productId: string, oldSize: string, oldColor: string, newSize: string) => {
    // Buscar el item actual
    const currentItem = cart.find(item => 
      item.product.id === productId && item.size === oldSize && item.color === oldColor
    )
    
    if (currentItem) {
      // Remover el item actual
      removeFromCart(productId, oldSize, oldColor)
      // Agregar el item con el nuevo talle
      addToCart(currentItem.product, newSize, oldColor, currentItem.quantity)
    }
  }

  const handleUpdateItemColor = (productId: string, oldSize: string, oldColor: string, newColor: string) => {
    // Buscar el item actual
    const currentItem = cart.find(item => 
      item.product.id === productId && item.size === oldSize && item.color === oldColor
    )
    
    if (currentItem) {
      // Remover el item actual
      removeFromCart(productId, oldSize, oldColor)
      // Agregar el item con el nuevo color
      addToCart(currentItem.product, oldSize, newColor, currentItem.quantity)
    }
  }

  const handleCheckout = () => {
    // Generar mensaje personalizado para WhatsApp
    const generateWhatsAppMessage = () => {
      let message = "¡Hola! 👋\n\nQuiero hacer un pedido de los siguientes productos:\n\n"
      
      cart.forEach((item, index) => {
        message += `🛍️ *${item.product.title}*\n`
        message += `   📏 Talle: ${item.size}\n`
        message += `   🎨 Color: ${item.color}\n`
        message += `   📦 Cantidad: ${item.quantity}\n\n`
      })
      
      message += "¿Están disponibles estos productos? ¿Cómo puedo proceder con el pedido?\n\n¡Gracias! 🙏"
      
      return message
    }

    const message = generateWhatsAppMessage()
    const phoneNumber = "543584388196" // Número sin el + para WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank')
    
    // Cerrar el carrito después de enviar
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card/95 backdrop-blur-sm border-l border-border/20">
        <SheetHeader className="space-y-3">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Mi Carrito
            {totalItems > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalItems}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Tu carrito está vacío</h3>
                <p className="text-sm text-muted-foreground">
                  Agregá algunos productos para comenzar tu compra
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Lista de productos */}
              <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0">
                {cart.map((item, index) => (
                  <Card key={`${item.product.id}-${item.size}-${item.color}`} className="bg-card/50 border-border/20">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        {/* Imagen del producto */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Información del producto */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div>
                            <h4 className="font-medium text-sm leading-tight line-clamp-2">
                              {item.product.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Select 
                                value={item.size} 
                                onValueChange={(newSize) => handleUpdateItemSize(item.product.id, item.size, item.color, newSize)}
                              >
                                <SelectTrigger className="h-6 w-16 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {item.product.sizes.map((size) => (
                                    <SelectItem key={size} value={size} className="text-xs">
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Select 
                                value={item.color} 
                                onValueChange={(newColor) => handleUpdateItemColor(item.product.id, item.size, item.color, newColor)}
                              >
                                <SelectTrigger className="h-6 w-20 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {item.product.colors.map((color) => (
                                    <SelectItem key={color} value={color} className="text-xs">
                                      {color}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Controles de cantidad y precio */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleQuantityChange(item.product.id, item.size, item.color, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleQuantityChange(item.product.id, item.size, item.color, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-semibold">
                                ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-xs text-muted-foreground">
                                  ${item.product.price.toLocaleString('es-AR')} c/u
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Botón eliminar */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(item.product.id, item.size, item.color)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Resumen y checkout */}
              <div className="space-y-4 pt-4 border-t border-border/20 flex-shrink-0">
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total ({totalItems} productos)</span>
                    <span className="text-lg font-bold">
                      ${totalPrice.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={clearCart}
                    >
                      Vaciar Carrito
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleCheckout}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Pedir por WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
