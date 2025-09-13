"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { Package, Plus, List, BarChart3, Users, Settings } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { products, cart } = useStore()

  const menuItems = [
    {
      id: "products",
      label: "Productos",
      icon: Package,
      count: products.length,
    },
    {
      id: "add-product",
      label: "Agregar Producto",
      icon: Plus,
    },
    {
      id: "orders",
      label: "Pedidos",
      icon: List,
      count: cart.length,
    },
    {
      id: "analytics",
      label: "Análisis",
      icon: BarChart3,
    },
    {
      id: "customers",
      label: "Clientes",
      icon: Users,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: Settings,
    },
  ]

  return (
    <Card className="w-64 h-full border-r rounded-none">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Gestión</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
                {item.count !== undefined && (
                  <Badge variant="outline" className="ml-auto">
                    {item.count}
                  </Badge>
                )}
              </Button>
            )
          })}
        </nav>
      </div>
    </Card>
  )
}
