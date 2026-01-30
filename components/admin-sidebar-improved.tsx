"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { Package, Plus, Home, ExternalLink } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { products } = useStore()
  const router = useRouter()

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Vista general"
    },
    {
      id: "products",
      label: "Productos",
      icon: Package,
      count: products.length,
      description: "Gestionar productos"
    },
    {
      id: "add-product",
      label: "Agregar Producto",
      icon: Plus,
      description: "Nuevo producto"
    },
    {
      id: "view-store",
      label: "Ver Tienda",
      icon: ExternalLink,
      description: "Ver como usuario",
      action: "redirect"
    },
  ]

  return (
    <div className="h-full bg-card border-r">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Panel Admin</h2>
          <p className="text-sm text-muted-foreground">Gestión de productos</p>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  isActive 
                    ? "bg-accent/10 text-accent border-accent/20" 
                    : "hover:bg-muted/50"
                }`}
                onClick={() => {
                  if (item.action === "redirect") {
                    // Para administradores, redirigir a la página principal pero manteniendo la sesión
                    router.push("/")
                  } else {
                    onTabChange(item.id)
                  }
                }}
              >
                <div className="flex items-center w-full">
                  <Icon className={`h-4 w-4 mr-3 ${
                    isActive ? "text-accent" : "text-muted-foreground"
                  }`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                  {item.count !== undefined && (
                    <Badge 
                      variant={isActive ? "default" : "outline"} 
                      className="ml-2 text-xs"
                    >
                      {item.count}
                    </Badge>
                  )}
                </div>
              </Button>
            )
          })}
        </nav>

        {/* Información adicional */}
        <div className="mt-8 p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Total productos:</span>
              <span className="font-medium">{products.length}</span>
            </div>
            <div className="flex justify-between">
              <span>En stock:</span>
              <span className="font-medium">
                {products.filter(p => p.inStock).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Destacados:</span>
              <span className="font-medium">
                {products.filter(p => p.featured).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
