"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Package, BarChart3, Settings, Bell, User } from "lucide-react"
import { AdminLogoutButton } from "./admin-logout-button"

export function AdminHeader() {
  const { products } = useStore()

  const inStockProducts = products.filter(p => p.inStock).length
  const featuredProducts = products.filter(p => p.featured).length

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Panel Admin</h1>
                <p className="text-xs text-muted-foreground">Roswell Indumentaria</p>
              </div>
            </div>
            
            {/* Stats rápidas */}
            <div className="hidden md:flex items-center space-x-3">
              <Badge variant="outline" className="text-xs">
                {products.length} productos
              </Badge>
              <Badge variant="outline" className="text-xs">
                {inStockProducts} en stock
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {featuredProducts} destacados
              </Badge>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="flex items-center space-x-2">
            {/* Notificaciones */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* Acciones rápidas */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="text-sm">Análisis</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Settings className="h-4 w-4 mr-2" />
              <span className="text-sm">Config</span>
            </Button>

            {/* Logout */}
            <AdminLogoutButton />
          </div>
        </div>

        {/* Barra de información móvil */}
        <div className="md:hidden pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {products.length} productos
              </Badge>
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {inStockProducts} stock
              </Badge>
            </div>
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {featuredProducts} destacados
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
