"use client"

import { useState } from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, Search, User } from "lucide-react"
import { AdminToggle } from "./admin-toggle"

export function Header() {
  const { cart, isAdmin } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Buzos", href: "/category/hoodies" },
    { name: "Remeras", href: "/category/tshirts" },
    { name: "Pantalones", href: "/category/pants" },
    { name: "Accesorios", href: "/category/accessories" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="font-bold text-xl text-foreground">ROSWELL</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <Button variant="ghost" size="sm" className="h-9 px-3">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-9 px-3 relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-9 px-3">
              <User className="h-4 w-4" />
              <span className="sr-only">Perfil</span>
            </Button>
          </div>

          {/* Actions - Mobile */}
          <div className="flex lg:hidden items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Navigation */}
                  <nav className="flex flex-col space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Navegación
                    </h3>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* User Actions */}
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Cuenta
                    </h3>
                    <Button variant="outline" className="justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Mi Perfil
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Mi Carrito ({cartItemsCount})
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AdminToggle />
    </header>
  )
}
