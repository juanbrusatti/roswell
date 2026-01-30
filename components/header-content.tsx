"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, Settings } from "lucide-react"
import { SecretAdminAccess } from "./secret-admin-access"
import { AdminLogoutButton } from "./admin-logout-button"
import { CartSidebar } from "./cart-sidebar"
import { useSearchParams } from "next/navigation"
import { useState, memo, useMemo, useCallback } from "react"
import Link from "next/link"

const HeaderContent = memo(function HeaderContent() {
  const { cart, isAdmin } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const viewMode = searchParams.get('view')

  const cartItemsCount = useStore((state) => state.getCartItemsCount())

  const navigation = useMemo(() => [
    { name: "Inicio", href: "/" },
    { name: "Abrigos", href: "/abrigos" },
    { name: "Remeras", href: "/remeras" },
    { name: "Pantalones", href: "/pantalones" },
    { name: "Camisas", href: "/camisas" },
    { name: "Shorts", href: "/shorts" },
    { name: "Accesorios", href: "/accesorios" },
  ], [])

  const handleNavClick = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-accent to-accent/60 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Roswell
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
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
          {/* Botón para volver al admin si está viendo la tienda */}
          {isAdmin && viewMode === 'store' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 px-3"
              onClick={() => window.location.href = "/"}
            >
              <Settings className="h-4 w-4 mr-2" />
              Panel Admin
            </Button>
          )}
          
          <CartSidebar>
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
          </CartSidebar>

          <SecretAdminAccess>
            <Button variant="ghost" size="sm" className="h-9 px-3">
              <User className="h-4 w-4" />
              <span className="sr-only">Perfil</span>
            </Button>
          </SecretAdminAccess>
          <AdminLogoutButton />
        </div>

        {/* Actions - Mobile */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Botón para volver al admin si está viendo la tienda (móvil) */}
          {isAdmin && viewMode === 'store' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0"
              onClick={() => window.location.href = "/"}
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Panel Admin</span>
            </Button>
          )}
          
          <CartSidebar>
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
          </CartSidebar>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] sm:w-[400px] bg-transparent border-none p-0"
            >
              <div className="glass-sidebar h-full w-full flex flex-col space-y-6 p-6">
                {/* Navigation */}
                <nav className="flex flex-col space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Navegación
                  </h3>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-accent transition-all duration-300 hover:translate-x-2 px-3 py-2 rounded-lg hover:bg-white/5"
                      onClick={handleNavClick}
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
                  <SecretAdminAccess>
                    <Button variant="outline" className="justify-start rounded-xl bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm">
                      <User className="h-4 w-4 mr-2" />
                      Mi Perfil
                    </Button>
                  </SecretAdminAccess>
                  <AdminLogoutButton />
                  <Button variant="outline" className="justify-start rounded-xl bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Mi Carrito ({cartItemsCount})
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
})

export { HeaderContent }
